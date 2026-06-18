// client/src/auth/RoleGuard.jsx
// Use inside ProtectedRoute to block wrong roles.
// Example: <RoleGuard allowed={['creator']}> ... </RoleGuard>

import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

const ROLE_HOME = {
  creator:    '/creator/workspace',
  freelancer: '/freelancer/dashboard',
  manager:    '/manager/dashboard',
}

export function RoleGuard({ allowed = [], children }) {
  const { role, isLoaded, loading } = useAuth()

  if (!isLoaded || loading) return null

  if (!allowed.includes(role)) {
    return <Navigate to={ROLE_HOME[role] || '/sign-in'} replace />
  }

  return children
}
