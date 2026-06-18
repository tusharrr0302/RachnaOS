import { Users, Calendar, BarChart3, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ManagerDashboard() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-rachna-surface p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-rachna-indigo flex items-center justify-center">
            <span className="text-white font-bold">र</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-rachna-dark text-2xl">Manager Dashboard</h1>
            <p className="text-rachna-muted text-sm">Manage your creators, bookings, and portfolios</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Creators Managed', value: '4', icon: Users, color: 'text-rachna-indigo' },
            { label: 'Active Bookings', value: '7', icon: Calendar, color: 'text-rachna-warning' },
            { label: 'Channel Avg Growth', value: '+24%', icon: BarChart3, color: 'text-rachna-success' },
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
          <button onClick={() => navigate('/creator/expert-connect')} className="btn-primary mt-4 text-sm">
            Book Expert for Creator →
          </button>
        </div>
      </div>
    </div>
  )
}
