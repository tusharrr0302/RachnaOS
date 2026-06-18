// client/src/auth/AuthProvider.jsx
// Wraps the entire app with ClerkProvider + branded appearance.
// Falls back gracefully if VITE_CLERK_PUBLISHABLE_KEY is not set.

import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export function AuthProvider({ children }) {
  if (!PUBLISHABLE_KEY) {
    console.warn(
      '[RachnaOS] VITE_CLERK_PUBLISHABLE_KEY is not set. ' +
      'Copy client/.env.example to client/.env and fill in your Clerk key.'
    )
    // Render children without Clerk — auth guards will redirect to sign-in
    return <>{children}</>
  }

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        variables: {
          colorPrimary:         '#4540C8',
          colorBackground:      '#FFFFFF',
          colorText:            '#0F0E24',
          colorInputBackground: '#F7F7FD',
          colorInputText:       '#0F0E24',
          borderRadius:         '10px',
          fontFamily:           'Inter, sans-serif',
        },
        elements: {
          card: {
            boxShadow: '0 8px 32px rgba(69, 64, 200, 0.12)',
            border: '1px solid #E5E3F8',
          },
          formButtonPrimary: {
            backgroundColor: '#4540C8',
          },
          socialButtonsBlockButton: {
            border: '1px solid #E5E3F8',
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
