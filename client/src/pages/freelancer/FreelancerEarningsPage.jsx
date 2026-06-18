// client/src/pages/freelancer/FreelancerEarningsPage.jsx
import { motion } from 'framer-motion'
import { IndianRupee, TrendingUp, Download } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts'
import { MONTHLY_EARNINGS, PROJECTS, FREELANCER } from './mockData'

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

const PAYOUTS = [
  { date: '15 May 2024', project: '24 Hours Surviving in Delhi', client: 'Rohit Verma',   amount: 25000, status: 'Paid' },
  { date: '10 May 2024', project: 'Travel Vlog: Himachal Series', client: 'Ankit Verma',  amount: 18000, status: 'Paid' },
  { date: '1 May 2024',  project: 'Brand Intro Animation',       client: 'Priya Sharma',  amount: 22000, status: 'Paid' },
  { date: '8 Apr 2024',  project: 'Podcast Editing',             client: 'Rahul Nair',    amount: 15000, status: 'Paid' },
  { date: '2 Apr 2024',  project: 'Mini Documentary Project',    client: 'Meera Kapoor',  amount: 35000, status: 'Pending' },
  { date: '15 Mar 2024', project: 'YouTube Thumbnails Pack',     client: 'Akash Tiwari',  amount: 8000,  status: 'Paid' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-rachna-border rounded-xl px-3 py-2 shadow-card text-xs">
        <p className="text-rachna-muted mb-0.5">{label}</p>
        <p className="font-bold text-rachna-dark">{fmt(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

export default function FreelancerEarningsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-rachna-dark text-xl">Earnings</h1>
          <p className="text-sm text-rachna-muted mt-0.5">Your complete earnings history and payout records</p>
        </div>
        <button className="btn-ghost text-sm flex items-center gap-2">
          <Download size={15} /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Earnings',    value: fmt(FREELANCER.totalEarnings), sub: '+12% vs last month', subCls: 'text-rachna-success', icon: IndianRupee, bg: 'bg-indigo-50', ic: 'text-indigo-600' },
          { label: 'This Month',        value: fmt(58000),                    sub: '3 projects',          subCls: 'text-rachna-muted',   icon: TrendingUp,  bg: 'bg-green-50',  ic: 'text-green-600' },
          { label: 'Pending Payout',    value: fmt(35000),                    sub: '1 project pending',   subCls: 'text-amber-500',      icon: IndianRupee, bg: 'bg-amber-50',  ic: 'text-amber-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -3 }} className="bg-white rounded-2xl border border-rachna-border p-5">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
              <s.icon size={18} className={s.ic} />
            </div>
            <p className="font-display font-extrabold text-rachna-dark text-2xl">{s.value}</p>
            <p className="text-xs text-rachna-muted mt-0.5">{s.label}</p>
            <p className={`text-xs font-semibold mt-1 ${s.subCls}`}>{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-rachna-border p-6">
          <h3 className="font-display font-bold text-rachna-dark mb-4">Earnings Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MONTHLY_EARNINGS}>
              <defs>
                <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#4540C8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4540C8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8B89B0' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8B89B0' }} tickLine={false} axisLine={false}
                tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="amount" stroke="#4540C8" strokeWidth={2.5}
                fill="url(#earningsGrad)" dot={{ fill: '#4540C8', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-rachna-border p-6">
          <h3 className="font-display font-bold text-rachna-dark mb-4">Monthly Comparison</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY_EARNINGS} barSize={28}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8B89B0' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8B89B0' }} tickLine={false} axisLine={false}
                tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="#4540C8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-2xl border border-rachna-border overflow-hidden">
        <div className="px-6 py-4 border-b border-rachna-border">
          <h3 className="font-display font-bold text-rachna-dark">Payout History</h3>
        </div>
        <div className="divide-y divide-rachna-border">
          {PAYOUTS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 px-6 py-4 hover:bg-rachna-surface/60 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-rachna-lavender flex items-center justify-center flex-shrink-0">
                <IndianRupee size={15} className="text-rachna-indigo" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-rachna-dark text-sm truncate">{p.project}</p>
                <p className="text-xs text-rachna-muted">{p.client} · {p.date}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.status === 'Paid' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-600'}`}>
                {p.status}
              </span>
              <p className="font-display font-bold text-rachna-dark text-sm">{fmt(p.amount)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
