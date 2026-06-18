// client/src/pages/auth/AuthRedirectPage.jsx
// Landing point after Clerk sign-in or sign-up.
// Reads the user's state and sends them to the right place:
//   • No role yet      → /onboarding
//   • creator          → /creator/workspace
//   • freelancer       → /freelancer/dashboard
//   • expert           → /expert/dashboard
//   • manager          → /manager/dashboard

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { FullPageLoader } from '../../auth/ProtectedRoute'

const ROLE_DASHBOARD = {
  creator:    '/creator/workspace',
  freelancer: '/freelancer/dashboard',
  expert:     '/expert/dashboard',
  manager:    '/manager/dashboard',
}

export default function AuthRedirectPage() {
  const { isLoaded, isSignedIn, onboardingDone, role } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      navigate('/sign-in', { replace: true })
      return
    }

    if (!onboardingDone || !role) {
      navigate('/onboarding', { replace: true })
      return
    }

    // Already onboarded — send to their dashboard
    navigate(ROLE_DASHBOARD[role] || '/onboarding', { replace: true })
  }, [isLoaded, isSignedIn, onboardingDone, role])

  return <FullPageLoader />
}
