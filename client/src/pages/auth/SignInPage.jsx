import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SignInPage() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel */}
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
            {[
              'AI audience testing before you post',
              'Fair rate calculations for brand deals',
              'Contract protection with CreatorShield',
              'Expert connect for real advice',
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-white/60 flex-shrink-0" />
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-6">
          <p className="text-white/80 text-sm leading-relaxed italic mb-4">
            "FairRate caught that a brand was offering ₹12,000 when I should have been getting ₹28,000. That's ₹16,000 I would have left on the table."
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

      {/* Right Panel */}
      <div className="flex items-center justify-center px-6 py-12 bg-rachna-surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-rachna-indigo flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">र</span>
            </div>
            <span className="font-display font-bold text-rachna-dark text-lg">रचनाOS</span>
          </div>

          <h1 className="font-display font-bold text-rachna-dark text-3xl mb-2">Welcome back</h1>
          <p className="text-rachna-muted mb-8">Sign in to your creator dashboard</p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-rachna-dark block mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="input"
                placeholder="you@example.com"
                id="signin-email"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-rachna-dark">Password</label>
                <a href="#" className="text-xs text-rachna-indigo hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="input pr-11"
                  placeholder="••••••••"
                  id="signin-password"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-rachna-muted hover:text-rachna-dark"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            id="signin-submit"
            onClick={() => navigate('/creator/workspace')}
            className="w-full btn-primary justify-center mt-6 py-3.5 text-base"
          >
            Sign In <ArrowRight size={16} />
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-rachna-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-rachna-surface px-4 text-xs text-rachna-muted">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Google', 'Twitter'].map(provider => (
              <button key={provider} className="btn-ghost justify-center py-2.5 text-sm">
                {provider}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-rachna-muted mt-6">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-rachna-indigo font-semibold hover:underline">
              Sign up free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
