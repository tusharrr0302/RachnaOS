// client/src/auth/ProtectedRoute.jsx
// Wraps any route that requires login.
// Not signed in → /sign-in
// Signed in but no onboarding → /onboarding

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'
import { motion } from 'framer-motion'

export function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn, onboardingDone, loading } = useAuth()
  const location = useLocation()

  // Wait for Clerk + profile to load
  if (!isLoaded || loading) {
    return <FullPageLoader />
  }

  // Not logged in → sign in
  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  // Logged in but onboarding not done → force onboarding
  if (!onboardingDone && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />
  }

  return children
}

function FullPageLoader() {
  return (
    <div className="min-h-screen bg-rachna-surface flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-14 h-14 rounded-2xl bg-rachna-indigo flex items-center justify-center shadow-glow">
          <span className="text-white font-display font-bold text-2xl">र</span>
        </div>
        <motion.div
          className="w-8 h-1 bg-rachna-indigo rounded-full"
          animate={{ scaleX: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <p className="text-rachna-muted text-sm font-medium">Loading RachnaOS...</p>
      </motion.div>
    </div>
  )
}
