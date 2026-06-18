// client/src/pages/auth/SignInPage.jsx

import { SignIn } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../../auth'

const FEATURES = [
  '🧪 AudienceLab — test before posting',
  '💰 FairRate — never get underpaid',
  '🛡 CreatorShield — protect every deal',
  '🎓 Academy — grow your craft',
]

export default function SignInPage() {
  const navigate = useNavigate()
  const { isMock, setIsSignedIn, updateMockProfile, updateMockOnboarding } = useAuth()

  const ROLE_DASHBOARD = {
    creator:    '/creator/workspace',
    freelancer: '/freelancer/dashboard',
    expert:     '/expert/dashboard',
    manager:    '/manager/dashboard',
  }

  const handleMockLogin = (role) => {
    setIsSignedIn(true)
    updateMockProfile({
      role,
      display_name: 'Dakshh Goel',
      username: 'devdash01',
      onboarding_done: true
    })
    updateMockOnboarding(true)
    navigate(ROLE_DASHBOARD[role] || '/')
  }

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

          {!isMock && (
            <div className="w-full text-center mb-2">
              <p className="text-rachna-muted text-sm">
                Don't have an account?{' '}
                <Link to="/sign-up" className="text-rachna-indigo font-semibold hover:underline">
                  Sign up free
                </Link>
              </p>
            </div>
          )}

          {/* Render Mock Auth Card or Clerk form */}
          {isMock ? (
            <div className="w-full bg-white border border-rachna-border rounded-3xl shadow-card p-8 text-center">
              <span className="text-3xl mb-3 block">💡</span>
              <h3 className="font-display font-bold text-rachna-dark text-xl mb-1">Local Mock Authentication</h3>
              <p className="text-xs text-rachna-muted mb-6 leading-relaxed">
                No Clerk credentials configured in <code className="bg-rachna-surface px-1 py-0.5 rounded text-[11px] font-mono">client/.env</code>. You can sign in instantly with any mock role below to test the app.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleMockLogin('creator')}
                  className="w-full bg-rachna-indigo text-white font-medium py-3 rounded-xl hover:bg-indigo-700 hover:shadow-glow transition-all flex items-center justify-center gap-2"
                >
                  🎬 Sign In as Creator
                </button>
                <button
                  onClick={() => handleMockLogin('freelancer')}
                  className="w-full bg-[#1D9E75] text-white font-medium py-3 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                >
                  ✂️ Sign In as Freelancer
                </button>
                <button
                  onClick={() => handleMockLogin('manager')}
                  className="w-full bg-[#9B7FD8] text-white font-medium py-3 rounded-xl hover:bg-violet-700 transition-all flex items-center justify-center gap-2"
                >
                  💼 Sign In as Manager
                </button>
              </div>
              
              <div className="relative flex items-center justify-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-rachna-border"></div>
                </div>
                <span className="relative px-3 bg-white text-xs text-rachna-muted font-medium uppercase">or</span>
              </div>
              
              <button
                onClick={() => {
                  setIsSignedIn(true);
                  updateMockOnboarding(false);
                  navigate('/onboarding');
                }}
                className="w-full bg-rachna-surface border border-rachna-border text-rachna-dark hover:bg-rachna-lavender hover:text-rachna-indigo transition-all font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
              >
                🚀 Start Onboarding Wizard
              </button>
            </div>
          ) : (
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
          )}
        </motion.div>
      </div>
    </div>
  )
}
