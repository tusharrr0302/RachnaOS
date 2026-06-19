// client/src/features/03-audiencelab/components/AudiencePersonas.jsx

import { Users, TrendingUp, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const PERSONA_COLORS = ['#4540C8', '#9B7FD8', '#10B981', '#F59E0B', '#EF4444']

export default function AudiencePersonas({ personas = [], signals }) {
  const engagementColor =
    signals?.engagementHealth === 'High'   ? '#10B981' :
    signals?.engagementHealth === 'Medium' ? '#F59E0B' : '#EF4444'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-bold text-[#0E0E1A] mb-1">Audience Signals</h3>
      <p className="text-xs text-[#6B6B80] mb-5">Who's watching and how they engage</p>

      {/* Engagement summary row */}
      {signals && (
        <div className="grid grid-cols-3 gap-3 mb-5">
          <StatChip
            icon={TrendingUp}
            label="Engagement"
            value={signals.engagementHealth}
            color={engagementColor}
          />
          <StatChip
            icon={Users}
            label="Like/View"
            value={signals.likeToViewRatio}
            color="#4540C8"
          />
          <StatChip
            icon={MessageCircle}
            label="Sentiment"
            value={signals.commentSentiment}
            color={signals.commentSentiment === 'Positive' ? '#10B981' : signals.commentSentiment === 'Mixed' ? '#F59E0B' : '#6B6B80'}
          />
        </div>
      )}

      {/* Persona cards */}
      <div className="space-y-3">
        {personas.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-xl bg-gray-50"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
              style={{ background: PERSONA_COLORS[i % PERSONA_COLORS.length] }}
            >
              {p.persona?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-[#0E0E1A]">{p.persona}</p>
                <span className="text-sm font-bold" style={{ color: PERSONA_COLORS[i % PERSONA_COLORS.length] }}>
                  {p.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${p.percentage}%`,
                    background: PERSONA_COLORS[i % PERSONA_COLORS.length]
                  }}
                />
              </div>
              <p className="text-xs text-[#6B6B80] mt-1">{p.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function StatChip({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <Icon size={14} className="mx-auto mb-1" style={{ color }} />
      <p className="text-xs text-[#6B6B80]">{label}</p>
      <p className="text-sm font-bold mt-0.5" style={{ color }}>{value}</p>
    </div>
  )
}
