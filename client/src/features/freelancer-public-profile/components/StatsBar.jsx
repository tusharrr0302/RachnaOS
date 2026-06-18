// client/src/features/freelancer-public-profile/components/StatsBar.jsx
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function StatsBar({ stats }) {
  const items = [
    { label: 'Projects Done',   value: stats.projectsCompleted, suffix: '' },
    { label: 'Total Earnings',  value: stats.totalEarnings,     suffix: '' },
    { label: 'Avg Rating',      value: stats.avgRating,         suffix: '★', isRating: true },
    { label: 'Response Time',   value: stats.responseTime,      suffix: '' },
    { label: 'Repeat Clients',  value: `${stats.repeatClients}%`, suffix: '' },
  ]

  return (
    <div className="bg-white rounded-2xl border border-rachna-border p-5">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-rachna-border">
        {items.map((item, i) => (
          <motion.div key={item.label}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="text-center py-2 sm:py-0 sm:px-4">
            <div className="flex items-center justify-center gap-1">
              <p className="font-display font-extrabold text-rachna-dark text-xl leading-none">
                {item.value}
              </p>
              {item.isRating && <Star size={14} className="text-yellow-400 fill-yellow-400 mt-0.5" />}
            </div>
            <p className="text-xs text-rachna-muted mt-1">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
