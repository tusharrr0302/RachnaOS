import { useNavigate } from 'react-router-dom'
import { Calendar, DollarSign, Star, Users } from 'lucide-react'

export default function ExpertDashboard() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-rachna-surface p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-rachna-indigo flex items-center justify-center">
            <span className="text-white font-bold">र</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-rachna-dark text-2xl">Expert Dashboard</h1>
            <p className="text-rachna-muted text-sm">Manage your bookings, availability, and earnings</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Sessions', value: '342', icon: Calendar, color: 'text-rachna-indigo' },
            { label: 'This Month', value: '28', icon: Users, color: 'text-rachna-violet' },
            { label: 'Total Earnings', value: '₹2.4L', icon: DollarSign, color: 'text-rachna-success' },
            { label: 'Avg Rating', value: '4.9 ★', icon: Star, color: 'text-amber-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-rachna-border p-5">
              <s.icon size={18} className={`${s.color} mb-3`} />
              <p className="font-display font-extrabold text-rachna-dark text-2xl mb-0.5">{s.value}</p>
              <p className="text-xs text-rachna-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-rachna-border p-6">
            <h2 className="font-display font-bold text-rachna-dark mb-4">Upcoming Bookings</h2>
            {[
              { creator: 'Priya S.', time: 'Today, 4:00 PM', type: '30 min', topic: 'YouTube growth strategy' },
              { creator: 'Raj K.', time: 'Tomorrow, 11:00 AM', type: '15 min', topic: 'Brand deal negotiation' },
            ].map(b => (
              <div key={b.creator} className="flex items-center gap-3 p-3 rounded-xl bg-rachna-surface border border-rachna-border mb-2">
                <div className="w-9 h-9 rounded-full bg-rachna-indigo/20 flex items-center justify-center">
                  <span className="text-rachna-indigo font-bold text-sm">{b.creator[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-rachna-dark">{b.creator} · {b.type}</p>
                  <p className="text-[10px] text-rachna-muted">{b.time} · {b.topic}</p>
                </div>
                <button className="text-xs font-semibold text-rachna-indigo hover:underline">Join</button>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-rachna-border p-6">
            <h2 className="font-display font-bold text-rachna-dark mb-4">Availability</h2>
            <p className="text-rachna-muted text-sm mb-4">Set your weekly availability for booking sessions.</p>
            <button onClick={() => navigate('/creator/expert-connect')} className="btn-primary text-sm">
              Manage Availability →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
