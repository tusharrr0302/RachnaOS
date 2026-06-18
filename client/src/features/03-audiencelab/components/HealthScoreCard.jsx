// client/src/features/03-audiencelab/components/HealthScoreCard.jsx

import { motion } from 'framer-motion'

const COLOR_MAP = {
  Excellent:    '#10B981',
  Good:         '#3B82F6',
  Average:      '#F59E0B',
  'Needs Work': '#EF4444',
  Critical:     '#991B1B',
}

export default function HealthScoreCard({ analysis }) {
  const score = analysis.overallHealthScore || 0
  const color = COLOR_MAP[analysis.healthLabel] || '#F59E0B'
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center shadow-sm">
      <h3 className="font-semibold text-[#0E0E1A] mb-1">Channel Health Score</h3>
      <p className="text-xs text-[#6B6B80] mb-5">Overall channel performance</p>

      <div className="relative w-36 h-36">
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#F3F4F6" strokeWidth="10" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke={color} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>{score}</span>
          <span className="text-xs text-[#6B6B80]">/ 100</span>
        </div>
      </div>

      <span
        className="mt-4 px-4 py-1.5 rounded-full text-sm font-semibold"
        style={{ background: `${color}20`, color }}
      >
        {analysis.healthLabel}
      </span>

      {/* Quick engagement stats */}
      <div className="mt-5 w-full space-y-2">
        <StatRow label="Engagement Rate" value={`${analysis.audienceSignals?.engagementRate || 0}%`} color={color} />
        <StatRow label="Like/View Ratio" value={analysis.audienceSignals?.likeToViewRatio || '—'} color={color} />
      </div>
    </div>
  )
}

function StatRow({ label, value, color }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-[#6B6B80]">{label}</span>
      <span className="font-semibold" style={{ color }}>{value}</span>
    </div>
  )
}
