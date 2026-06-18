import { UserButton, useUser, useClerk } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { Users, Calendar, BarChart3, ChevronRight, LogOut } from 'lucide-react'

export default function ManagerDashboard() {
  const navigate    = useNavigate()
  const { user }    = useUser()
  const { signOut } = useClerk()

  return (
    <div className="min-h-screen bg-rachna-surface">

      {/* ── Top navbar ── */}
      <header className="h-14 bg-white border-b border-rachna-border flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rachna-indigo flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">र</span>
          </div>
          <span className="font-display font-bold text-rachna-dark">रचनाOS</span>
          <span className="text-rachna-border mx-2">|</span>
          <span className="text-sm text-rachna-muted font-medium">Manager</span>
        </div>

        <div className="flex items-center gap-3">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{ elements: { avatarBox: { width: 32, height: 32 } } }}
          />
          <button
            onClick={() => signOut(() => navigate('/sign-in'))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-rachna-muted hover:text-rachna-danger hover:bg-red-50 transition-colors"
            id="manager-signout"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </header>

      {/* ── Page content ── */}
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display font-bold text-rachna-dark text-2xl mb-1">
              Welcome, {user?.firstName || 'Manager'} 👋
            </h1>
            <p className="text-rachna-muted text-sm">Manage your creators, bookings, and portfolios</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Creators Managed',  value: '4',    icon: Users,    color: 'text-rachna-indigo'  },
              { label: 'Active Bookings',   value: '7',    icon: Calendar, color: 'text-rachna-warning' },
              { label: 'Channel Avg Growth',value: '+24%', icon: BarChart3,color: 'text-rachna-success' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-rachna-border p-5">
                <s.icon size={18} className={`${s.color} mb-3`} />
                <p className="font-display font-extrabold text-rachna-dark text-2xl mb-0.5">{s.value}</p>
                <p className="text-xs text-rachna-muted">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-rachna-border p-6">
            <h2 className="font-display font-bold text-rachna-dark mb-4">Managed Creators</h2>
            {['@financebyrakesh · 240K subs', '@techguruvlogs · 85K subs', '@lifestylewithananya · 120K subs'].map(c => (
              <div key={c} className="flex items-center gap-3 p-3 rounded-xl hover:bg-rachna-surface transition-colors mb-1 border border-rachna-border">
                <div className="w-9 h-9 rounded-full bg-rachna-indigo/20 flex items-center justify-center">
                  <span className="text-rachna-indigo font-bold text-sm">@</span>
                </div>
                <p className="text-sm text-rachna-dark flex-1">{c}</p>
                <ChevronRight size={14} className="text-rachna-muted" />
              </div>
            ))}
            <button
              onClick={() => navigate('/creator/expert-connect')}
              className="btn-primary mt-4 text-sm"
            >
              Book Expert for Creator →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
