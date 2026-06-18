import { useNavigate } from 'react-router-dom'
import { DollarSign, Briefcase, Star, TrendingUp, ChevronRight } from 'lucide-react'

export default function FreelancerDashboard() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-rachna-surface p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-rachna-indigo flex items-center justify-center">
            <span className="text-white font-bold">र</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-rachna-dark text-2xl">Freelancer Dashboard</h1>
            <p className="text-rachna-muted text-sm">Manage your gigs, proposals, and earnings</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Gigs', value: '3', icon: Briefcase, color: 'text-rachna-indigo' },
            { label: 'Proposals Sent', value: '12', icon: ChevronRight, color: 'text-rachna-warning' },
            { label: 'Total Earnings', value: '₹42,500', icon: DollarSign, color: 'text-rachna-success' },
            { label: 'Avg Rating', value: '4.9 ★', icon: Star, color: 'text-amber-500' },
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
          <p className="text-rachna-muted text-sm mb-4">Complete your freelancer profile to get more clients from the marketplace.</p>
          <button onClick={() => navigate('/creator/marketplace')} className="btn-primary text-sm">
            View Marketplace →
          </button>
        </div>
      </div>
    </div>
  )
}
