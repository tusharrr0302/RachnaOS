// client/src/pages/auth/SignUpPage.jsx

import { SignUp } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../auth'

const ROLE_CARDS = [
  { emoji: '🎬', role: 'Creator',    desc: 'Grow your channel' },
  { emoji: '✂️',  role: 'Freelancer', desc: 'Find creator clients' },
  { emoji: '🎯', role: 'Expert',     desc: 'Share your knowledge' },
  { emoji: '💼', role: 'Manager',    desc: 'Manage talent' },
]

const STATS = [
  { num: '2400+', label: 'Creators' },
  { num: '94%',   label: 'Accuracy' },
  { num: '₹1.2Cr', label: 'Analyzed' },
]

export default function SignUpPage() {
  const navigate = useNavigate()
  const { isMock } = useAuth()

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex bg-rachna-indigo flex-col justify-between p-12">
        <img src="/logo.png" alt="RachnaOS Logo" className="h-20 w-auto object-contain drop-shadow-md" />

        <div>
          <h2 className="font-display font-extrabold text-white text-4xl leading-tight mb-4">
            Join 2,400+<br />smart creators.
          </h2>
          <p className="text-white/60 text-lg mb-8">Free to start. No credit card needed.</p>

          <div className="space-y-3">
            {ROLE_CARDS.map(({ emoji, role, desc }) => (
              <div
                key={role}
                className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3"
              >
                <span className="text-xl">{emoji}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{role}</p>
                  <p className="text-white/60 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="bg-white/10 rounded-2xl p-4 text-center">
              <p className="font-display font-extrabold text-white text-2xl">{s.num}</p>
              <p className="text-white/50 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel: Clerk form or Mock ── */}
      <div className="flex items-center justify-center px-6 py-12 bg-rachna-surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md flex flex-col items-center gap-6"
        >
          {/* Mobile logo */}
          <div className="self-start lg:hidden">
            <img src="/logo.png" alt="RachnaOS Logo" className="h-20 w-auto object-contain" />
          </div>

          {!isMock && (
            <div className="w-full text-center mb-2">
              <p className="text-rachna-muted text-sm">
                Already have an account?{' '}
                <Link to="/sign-in" className="text-rachna-indigo font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          )}

          {isMock ? (
            <div className="w-full bg-white border border-rachna-border rounded-3xl shadow-card p-8 text-center">
              <span className="text-3xl mb-3 block">🚀</span>
              <h3 className="font-display font-bold text-rachna-dark text-xl mb-1">Mock Sign Up</h3>
              <p className="text-xs text-rachna-muted mb-6 leading-relaxed">
                No Clerk credentials configured. Skip sign-up and go straight to onboarding.
              </p>
              <button
                onClick={() => navigate('/sign-in')}
                className="w-full bg-rachna-indigo text-white font-medium py-3 rounded-xl hover:bg-indigo-700 transition-all"
              >
                Go to Mock Sign In →
              </button>
            </div>
          ) : (
            <SignUp
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              fallbackRedirectUrl="/auth/redirect"
              forceRedirectUrl="/auth/redirect"
              appearance={{
                elements: {
                  rootBox: { width: '100%' },
                  card: {
                    boxShadow: '0 4px 24px rgba(69,64,200,0.10)',
                    border: '1px solid #E5E3F8',
                    borderRadius: '16px',
                    width: '100%',
                  },
                },
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}
