// client/src/features/03-audiencelab/components/WeeklyActionPlan.jsx

import { Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const DAY_COLORS = {
  Monday:    { color: '#4540C8', bg: '#F8F7FF' },
  Wednesday: { color: '#10B981', bg: '#ECFDF5' },
  Friday:    { color: '#F59E0B', bg: '#FFF7ED' },
}

export default function WeeklyActionPlan({ plan = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Calendar size={18} className="text-[#4540C8]" />
        <h3 className="font-bold text-[#0E0E1A]">Weekly Action Plan</h3>
      </div>

      <div className="space-y-3">
        {plan.map((item, i) => {
          const dayStyle = DAY_COLORS[item.day] || { color: '#6B6B80', bg: '#F9FAFB' }
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-start gap-4 p-4 rounded-xl"
              style={{ background: dayStyle.bg }}
            >
              <div
                className="text-xs font-bold px-2.5 py-1 rounded-lg whitespace-nowrap flex-shrink-0"
                style={{ background: dayStyle.color, color: '#fff' }}
              >
                {item.day}
              </div>
              <p className="text-sm text-[#0E0E1A] leading-relaxed">{item.action}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
