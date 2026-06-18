// client/src/auth/useAuth.js
// Single hook for everything auth-related across the whole app.
// Seamlessly switches to Mock Auth mode if credentials are placeholders.

import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { supabase } from '../config/supabase'

const isPlaceholder = (val) => {
  if (!val) return true
  return val.includes('your_key_here') || 
         val.includes('your-project') || 
         val.includes('your_anon_key_here') || 
         val.includes('pk_test_your_key_here') ||
         val.includes('sk_test_your_key_here')
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const isMockMode = !PUBLISHABLE_KEY || isPlaceholder(PUBLISHABLE_KEY)

export function useAuth() {
  if (isMockMode) {
    // ── MOCK AUTH FLOW ────────────────────────────────────────────────
    const [profile, setProfileState] = useState(() => {
      const saved = localStorage.getItem('rachna_mock_profile')
      return saved ? JSON.parse(saved) : {
        id: 'mock-id',
        clerk_user_id: 'mock-user-id',
        full_name: 'Dakshh Goel',
        email: 'dakshh.devdash@gmail.com',
        role: 'creator'
      }
    })

    const [isSignedIn, setIsSignedIn] = useState(() => {
      return localStorage.getItem('rachna_mock_signed_in') !== 'false'
    })

    const [onboardingDone, setOnboardingDone] = useState(() => {
      return localStorage.getItem('rachna_mock_onboarding_done') !== 'false'
    })

    const role = profile?.role || 'creator'

    const signOut = () => {
      setIsSignedIn(false)
      localStorage.setItem('rachna_mock_signed_in', 'false')
    }

    const getAuthToken = async () => 'mock-token'

    const refetchProfile = () => {}

    const updateMockProfile = (newProfile) => {
      const updated = { ...profile, ...newProfile }
      setProfileState(updated)
      localStorage.setItem('rachna_mock_profile', JSON.stringify(updated))
    }

    const updateMockOnboarding = (done) => {
      setOnboardingDone(done)
      localStorage.setItem('rachna_mock_onboarding_done', done ? 'true' : 'false')
    }

    return {
      clerkUser: {
        id: 'mock-user-id',
        fullName: profile.full_name,
        firstName: profile.full_name.split(' ')[0],
        primaryEmailAddress: { emailAddress: profile.email },
        imageUrl: null,
        getToken: async () => 'mock-token',
        publicMetadata: { role, onboarding_done: onboardingDone },
      },
      isLoaded: true,
      isSignedIn,
      role,
      onboardingDone,
      profile,
      loading: false,
      refetchProfile,
      getAuthToken,
      signOut,
      // Helper methods for dev mockup interaction
      isMock: true,
      updateMockProfile,
      updateMockOnboarding,
      setIsSignedIn: (val) => {
        setIsSignedIn(val)
        localStorage.setItem('rachna_mock_signed_in', val ? 'true' : 'false')
      }
    }
  }

  // ── ORIGINAL CLERK FLOW ───────────────────────────────────────────
  const { user, isLoaded, isSignedIn } = useUser()
  const { getToken, signOut } = useClerkAuth()

  const [profile, setProfile]   = useState(null)
  const [loading, setLoading]   = useState(false) // default false — only true when fetching

  // Role comes from Clerk public metadata — set during onboarding
  const role = user?.publicMetadata?.role || null

  // onboarding_done flag also in Clerk metadata
  const onboardingDone = user?.publicMetadata?.onboarding_done || false

  useEffect(() => {
    // Not signed in → no fetch needed
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

  async function getAuthToken() {
    return await getToken()
  }

  return {
    clerkUser:      user,
    isLoaded,
    isSignedIn,
    role,
    onboardingDone,
    profile,
    loading,
    refetchProfile: fetchProfile,
    getAuthToken,
    signOut,
  }
}
