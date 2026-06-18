// client/src/pages/freelancer/FreelancerDashboard.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Briefcase, ArrowLeftRight, CheckCircle2, Coins,
  Calendar, MoreVertical, Star, ChevronRight, Plus
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import clsx from 'clsx'
import {
  FREELANCER, PROJECTS, OPPORTUNITIES, TASKS,
  EARNINGS_CHART, REVIEWS
} from './mockData'

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

const STATS = [
  {
    label: 'Active Projects',
    value: '4',
    sub: '2 due this week',
    subColor: 'text-rachna-indigo',
    icon: Briefcase,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    label: 'In Progress Tasks',
    value: '7',
    sub: '3 high priority',
    subColor: 'text-orange-500',
    icon: ArrowLeftRight,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Completed Tasks',
    value: '23',
    sub: 'This month',
    subColor: 'text-rachna-success',
    icon: CheckCircle2,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    label: 'Total Earnings',
    value: fmt(FREELANCER.totalEarnings),
    sub: '+12% from last month',
    subColor: 'text-rachna-success',
    icon: Coins,
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
  },
]

const categoryColors = {
  'Video Editing':    'bg-indigo-50 text-indigo-700',
  'Color Grading':    'bg-green-50  text-green-700',
  'Motion Graphics':  'bg-amber-50  text-amber-700',
  'Thumbnail Design': 'bg-red-50    text-red-600',
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-rachna-border rounded-xl px-3 py-2 shadow-card text-xs">
        <p className="font-semibold text-rachna-dark">{fmt(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star
        key={i}
        size={12}
        className={i <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
      />
    ))}
  </div>
)

// Circular progress ring
const RingChart = ({ pct }) => {
  const r = 36
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <svg width={90} height={90} className="-rotate-90">
      <circle cx={45} cy={45} r={r} strokeWidth={8} stroke="#EDE9FF" fill="none" />
      <circle
        cx={45} cy={45} r={r} strokeWidth={8}
        stroke="#4540C8" fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
    </svg>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export default function FreelancerDashboard() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('This Month')

  return (
    <div className="p-6 flex gap-5">

      {/* ── Main Column ──────────────────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-6">

        {/* Overview Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <h2 className="font-display font-bold text-rachna-dark text-lg">Overview</h2>
          <div className="flex items-center gap-1 bg-white border border-rachna-border rounded-xl px-3 py-1.5 text-sm text-rachna-dark cursor-pointer hover:border-rachna-indigo transition-colors">
            {filter}
            <ChevronRight size={14} className="text-rachna-muted ml-1 rotate-90" />
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              {...fadeUp}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(69,64,200,0.14)' }}
              className="bg-white rounded-2xl border border-rachna-border p-5 cursor-default"
            >
              <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center mb-4', s.iconBg)}>
                <s.icon size={18} className={s.iconColor} />
              </div>
              <p className="font-display font-extrabold text-rachna-dark text-2xl leading-none mb-1">{s.value}</p>
              <p className="text-xs text-rachna-muted mb-0.5">{s.label}</p>
              <p className={clsx('text-xs font-semibold', s.subColor)}>{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Active Projects Table */}
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.2 }} className="bg-white rounded-2xl border border-rachna-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-rachna-border">
            <h3 className="font-display font-bold text-rachna-dark">Active Projects</h3>
            <button
              onClick={() => navigate('/freelancer/projects')}
              className="text-xs text-rachna-indigo font-semibold hover:underline"
            >
              View All
            </button>
          </div>

          <div className="divide-y divide-rachna-border">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-rachna-surface/60 transition-colors group"
              >
                {/* Thumbnail */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: p.color }}
                >
                  {p.clientAvatar}
                </div>

                {/* Title + Client */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-rachna-dark text-sm truncate">{p.title}</p>
                  <p className="text-xs text-rachna-muted">{p.client}</p>
                </div>

                {/* Category Tag */}
                <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 hidden md:block', categoryColors[p.category])}>
                  {p.category}
                </span>

                {/* Progress Bar */}
                <div className="w-28 flex-shrink-0 hidden lg:block">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-rachna-muted">{p.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-rachna-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                      className="h-full bg-rachna-indigo rounded-full"
                    />
                  </div>
                </div>

                {/* Due Date */}
                <div className="flex items-center gap-1.5 flex-shrink-0 hidden lg:flex">
                  <Calendar size={13} className="text-rachna-muted" />
                  <div>
                    <p className="text-xs text-rachna-muted">Due in {p.dueDaysLeft} days</p>
                    <p className="text-xs font-medium text-rachna-dark">{p.dueDate}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <span className="badge flex-shrink-0 hidden sm:inline-flex">{p.status}</span>

                {/* Kebab Menu */}
                <button className="w-7 h-7 rounded-lg hover:bg-rachna-surface flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <MoreVertical size={14} className="text-rachna-muted" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Available Opportunities */}
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.3 }} className="bg-white rounded-2xl border border-rachna-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-rachna-border">
            <h3 className="font-display font-bold text-rachna-dark">Available Opportunities</h3>
            <button
              onClick={() => navigate('/freelancer/marketplace')}
              className="text-xs text-rachna-indigo font-semibold hover:underline"
            >
              View All Opportunities
            </button>
          </div>

          <div className="divide-y divide-rachna-border">
            {OPPORTUNITIES.slice(0, 3).map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-rachna-surface/60 transition-colors"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-rachna-lavender flex items-center justify-center text-xl flex-shrink-0">
                  {o.categoryIcon}
                </div>

                {/* Title + Tags */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-rachna-dark text-sm">{o.title}</p>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    {o.tags.map(tag => (
                      <span key={tag} className="text-xs bg-rachna-surface text-rachna-muted px-2 py-0.5 rounded-full border border-rachna-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="flex-shrink-0 hidden sm:block text-right">
                  <p className="text-xs text-rachna-muted">Budget</p>
                  <p className="font-display font-bold text-rachna-dark text-sm">
                    {fmt(o.budgetMin)} – {fmt(o.budgetMax)}
                  </p>
                </div>

                {/* Experience */}
                <div className="flex-shrink-0 hidden md:block text-right">
                  <p className="text-xs text-rachna-muted">Experience</p>
                  <p className="text-sm font-medium text-rachna-dark">{o.experience}</p>
                </div>

                {/* Posted */}
                <div className="flex-shrink-0 hidden lg:block text-right">
                  <p className="text-xs text-rachna-muted">Posted</p>
                  <p className="text-xs text-rachna-dark">{o.postedAgo}</p>
                </div>

                {/* View Details */}
                <button className="btn-ghost text-xs px-3 py-1.5 flex-shrink-0">
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right Panel ─────────────────────────────────────── */}
      <div className="w-72 flex-shrink-0 space-y-4">

        {/* Profile Completeness */}
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-2xl border border-rachna-border p-5"
        >
          <h4 className="font-display font-bold text-rachna-dark text-sm mb-4">Profile Completeness</h4>
          <div className="flex items-center gap-4">
            <div className="relative">
              <RingChart pct={FREELANCER.completeness} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-extrabold text-rachna-indigo text-lg">
                  {FREELANCER.completeness}%
                </span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-rachna-dark text-sm">Almost there!</p>
              <p className="text-xs text-rachna-muted mt-1 leading-relaxed">Complete your profile to get more project matches.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/freelancer/portfolio')}
            className="mt-4 flex items-center gap-1.5 text-rachna-indigo text-sm font-semibold hover:underline"
          >
            <Plus size={14} /> Add Portfolio
          </button>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.15 }}
          className="bg-white rounded-2xl border border-rachna-border p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display font-bold text-rachna-dark text-sm">Upcoming Tasks</h4>
            <button onClick={() => navigate('/freelancer/tasks')} className="text-xs text-rachna-indigo font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {TASKS.slice(0, 3).map(task => (
              <div key={task.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rachna-lavender flex items-center justify-center flex-shrink-0">
                  <span className="text-rachna-indigo text-xs font-bold">{task.client[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-rachna-dark truncate">{task.title}</p>
                  <p className="text-[10px] text-rachna-muted truncate">{task.project}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Calendar size={10} className="text-rachna-muted" />
                  <span className="text-[10px] text-rachna-muted">{task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Earnings Summary */}
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-2xl border border-rachna-border p-5"
        >
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-display font-bold text-rachna-dark text-sm">Earnings Summary</h4>
            <button onClick={() => navigate('/freelancer/earnings')} className="text-xs text-rachna-indigo font-semibold hover:underline">View Details</button>
          </div>
          <p className="font-display font-extrabold text-rachna-dark text-xl mb-0.5">{fmt(FREELANCER.totalEarnings)}</p>
          <p className="text-xs text-rachna-success font-semibold mb-3">+12% from last month</p>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={EARNINGS_CHART}>
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#8B89B0' }} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone" dataKey="amount"
                stroke="#4540C8" strokeWidth={2.5}
                dot={{ fill: '#4540C8', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Reviews */}
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.25 }}
          className="bg-white rounded-2xl border border-rachna-border p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display font-bold text-rachna-dark text-sm">Recent Reviews</h4>
            <button onClick={() => navigate('/freelancer/reviews')} className="text-xs text-rachna-indigo font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {REVIEWS.slice(0, 2).map(review => (
              <div key={review.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-rachna-indigo flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {review.reviewerAvatar[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-rachna-dark">{review.reviewer}</p>
                    <p className="text-[10px] text-rachna-muted truncate">{review.project}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarRating rating={review.rating} />
                    <span className="text-xs font-bold text-rachna-dark">{review.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-rachna-muted leading-relaxed line-clamp-2">{review.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
