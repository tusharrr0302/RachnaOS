import { BarChart3, TrendingUp, Eye, Clock, ThumbsUp } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CHART_DATA = [
  { month: 'Jul', views: 42000, subs: 1200 }, { month: 'Aug', views: 58000, subs: 1850 },
  { month: 'Sep', views: 71000, subs: 2100 }, { month: 'Oct', views: 65000, subs: 1900 },
  { month: 'Nov', views: 89000, subs: 3200 }, { month: 'Dec', views: 112000, subs: 4100 },
]

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="font-display font-bold text-rachna-dark text-2xl mb-2">Analytics</h1>
      <p className="text-rachna-muted text-sm mb-8">Your channel performance overview.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Views', value: '437K', change: '+18%', icon: Eye, color: 'text-rachna-indigo' },
          { label: 'Subscribers', value: '14.3K', change: '+24%', icon: TrendingUp, color: 'text-rachna-success' },
          { label: 'Avg Watch Time', value: '4:28', change: '+0:32', icon: Clock, color: 'text-rachna-warning' },
          { label: 'Avg CTR', value: '6.2%', change: '+1.1%', icon: BarChart3, color: 'text-rachna-violet' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-rachna-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-rachna-muted">{s.label}</span>
              <s.icon size={16} className={s.color} />
            </div>
            <p className="font-display font-extrabold text-rachna-dark text-2xl mb-1">{s.value}</p>
            <p className="text-xs text-rachna-success font-semibold">{s.change} this month</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-rachna-border p-6">
          <h3 className="font-display font-semibold text-rachna-dark mb-4">Views Over Time</h3>
          <div className="h-48">
            <ResponsiveContainer>
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4540C8" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#4540C8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E3F8" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8B89B0' }} />
                <YAxis tick={{ fontSize: 11, fill: '#8B89B0' }} />
                <Tooltip />
                <Area type="monotone" dataKey="views" stroke="#4540C8" fill="url(#viewsGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-rachna-border p-6">
          <h3 className="font-display font-semibold text-rachna-dark mb-4">Subscribers Growth</h3>
          <div className="h-48">
            <ResponsiveContainer>
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="subsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D9E75" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1D9E75" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E3F8" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8B89B0' }} />
                <YAxis tick={{ fontSize: 11, fill: '#8B89B0' }} />
                <Tooltip />
                <Area type="monotone" dataKey="subs" stroke="#1D9E75" fill="url(#subsGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
