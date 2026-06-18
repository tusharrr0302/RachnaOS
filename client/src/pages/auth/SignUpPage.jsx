// client/src/pages/auth/SignUpPage.jsx

import { SignUp } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

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
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex bg-rachna-indigo flex-col justify-between p-12">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="text-white font-display font-bold text-base">र</span>
          </div>
          <span className="font-display font-bold text-white text-xl">रचनाOS</span>
        </div>

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

      {/* ── Right panel: Clerk form ── */}
      <div className="flex items-center justify-center px-6 py-12 bg-rachna-surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md flex flex-col items-center gap-6"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden self-start">
            <div className="w-8 h-8 rounded-xl bg-rachna-indigo flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">र</span>
            </div>
            <span className="font-display font-bold text-rachna-dark text-lg">रचनाOS</span>
          </div>

          <div className="w-full text-center mb-2">
            <p className="text-rachna-muted text-sm">
              Already have an account?{' '}
              <Link to="/sign-in" className="text-rachna-indigo font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

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
        </motion.div>
      </div>
    </div>
  )
}
