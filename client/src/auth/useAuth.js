// client/src/auth/useAuth.js
// Single hook for everything auth-related across the whole app.

import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { supabase } from '../config/supabase'

export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser()
  const { getToken, signOut } = useClerkAuth()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Role comes from Clerk public metadata — set during onboarding
  const role = user?.publicMetadata?.role || null

  // onboarding_done flag also in Clerk metadata
  const onboardingDone = user?.publicMetadata?.onboarding_done || false

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      setLoading(false)
      return
    }
    fetchProfile()
  }, [isLoaded, isSignedIn, user?.id])

  async function fetchProfile() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('clerk_user_id', user.id)
        .single()

      if (!error) setProfile(data)
    } catch (err) {
      console.error('[useAuth] Profile fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }

  // Get a fresh Clerk JWT for authenticated API calls
  async function getAuthToken() {
    return await getToken()
  }

  return {
    // Clerk data
    clerkUser:    user,
    isLoaded,
    isSignedIn,

    // Role & onboarding
    role,           // 'creator' | 'freelancer' | 'manager' | null
    onboardingDone,

    // Supabase profile
    profile,
    loading,
    refetchProfile: fetchProfile,

    // Actions
    getAuthToken,
    signOut,
  }
}
