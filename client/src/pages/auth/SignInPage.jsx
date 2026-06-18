// client/src/pages/auth/SignInPage.jsx

import { SignIn } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const FEATURES = [
  '🧪 AudienceLab — test before posting',
  '💰 FairRate — never get underpaid',
  '🛡 CreatorShield — protect every deal',
  '🎓 Academy — grow your craft',
]

export default function SignInPage() {
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
            The OS for<br />serious creators.
          </h2>
          <p className="text-white/60 text-lg mb-8">Build. Test. Protect. Grow.</p>
          <div className="space-y-3">
            {FEATURES.map(item => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-white/60 flex-shrink-0" />
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-6">
          <p className="text-white/80 text-sm leading-relaxed italic mb-4">
            "FairRate caught that a brand was offering ₹12,000 when I should have been
            getting ₹28,000. That's ₹16,000 I would have left on the table."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Priya Sharma</p>
              <p className="text-white/50 text-xs">Lifestyle Creator, 85K subs</p>
            </div>
          </div>
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
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-rachna-indigo font-semibold hover:underline">
                Sign up free
              </Link>
            </p>
          </div>

          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
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
