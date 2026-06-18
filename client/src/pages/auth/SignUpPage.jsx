import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SignUpPage() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

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
            Join 2,400+<br />creators growing<br />with RachnaOS.
          </h2>
          <p className="text-white/60 text-lg mb-8">Free forever. No credit card needed.</p>
          <div className="space-y-3">
            {['Free tier with essential tools', 'AudienceLab — 5 tests per month', 'FairRate basic calculations', 'Access to Creator Academy'].map(item => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-white/60 flex-shrink-0" />
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[{ num: '2400+', label: 'Creators' }, { num: '94%', label: 'Accuracy' }, { num: '₹1.2Cr', label: 'Analyzed' }].map(s => (
            <div key={s.label} className="bg-white/10 rounded-2xl p-4 text-center">
              <p className="font-display font-extrabold text-white text-2xl">{s.num}</p>
              <p className="text-white/50 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center px-6 py-12 bg-rachna-surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-rachna-indigo flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">र</span>
            </div>
            <span className="font-display font-bold text-rachna-dark text-lg">रचनाOS</span>
          </div>

          <h1 className="font-display font-bold text-rachna-dark text-3xl mb-2">Create your account</h1>
          <p className="text-rachna-muted mb-8">Start for free. Upgrade anytime.</p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-rachna-dark block mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="input"
                placeholder="Ankit Verma"
                id="signup-name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-rachna-dark block mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="input"
                placeholder="you@example.com"
                id="signup-email"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-rachna-dark block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="input pr-11"
                  placeholder="Min. 8 characters"
                  id="signup-password"
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-rachna-muted hover:text-rachna-dark">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-rachna-muted mt-3 mb-6">
            By signing up, you agree to our{' '}
            <a href="#" className="text-rachna-indigo hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-rachna-indigo hover:underline">Privacy Policy</a>.
          </p>

          <button
            id="signup-submit"
            onClick={() => navigate('/onboarding')}
            className="w-full btn-primary justify-center py-3.5 text-base"
          >
            Create Account <ArrowRight size={16} />
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
              <button key={provider} className="btn-ghost justify-center py-2.5 text-sm">{provider}</button>
            ))}
          </div>

          <p className="text-center text-sm text-rachna-muted mt-6">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-rachna-indigo font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
