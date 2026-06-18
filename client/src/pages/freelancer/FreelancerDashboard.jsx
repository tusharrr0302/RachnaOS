import { UserButton, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { DollarSign, Briefcase, Star, ChevronRight, LogOut } from 'lucide-react'
import { useClerk } from '@clerk/clerk-react'

export default function FreelancerDashboard() {
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
          <span className="text-sm text-rachna-muted font-medium">Freelancer</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Clerk UserButton — click avatar for profile, manage account */}
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{ elements: { avatarBox: { width: 32, height: 32 } } }}
          />

          {/* Explicit sign-out button */}
          <button
            onClick={() => signOut(() => navigate('/sign-in'))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-rachna-muted hover:text-rachna-danger hover:bg-red-50 transition-colors"
            id="freelancer-signout"
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
              Welcome, {user?.firstName || 'Freelancer'} 👋
            </h1>
            <p className="text-rachna-muted text-sm">Manage your gigs, proposals, and earnings</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Active Gigs',     value: '3',       icon: Briefcase,   color: 'text-rachna-indigo'  },
              { label: 'Proposals Sent',  value: '12',      icon: ChevronRight, color: 'text-rachna-warning' },
              { label: 'Total Earnings',  value: '₹42,500', icon: DollarSign,  color: 'text-rachna-success' },
              { label: 'Avg Rating',      value: '4.9 ★',   icon: Star,        color: 'text-amber-500'      },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-rachna-border p-5">
                <s.icon size={18} className={`${s.color} mb-3`} />
                <p className="font-display font-extrabold text-rachna-dark text-2xl mb-0.5">{s.value}</p>
                <p className="text-xs text-rachna-muted">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-rachna-border p-6">
            <h2 className="font-display font-bold text-rachna-dark mb-4">Your Profile</h2>
            <p className="text-rachna-muted text-sm mb-4">
              Complete your freelancer profile to get more clients from the marketplace.
            </p>
            <button
              onClick={() => navigate('/creator/marketplace')}
              className="btn-primary text-sm"
            >
              View Marketplace →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
