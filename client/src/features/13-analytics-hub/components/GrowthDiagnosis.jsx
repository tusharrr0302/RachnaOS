// client/src/features/03-audiencelab/components/GrowthDiagnosis.jsx

import { motion } from 'framer-motion'
import { AlertTriangle, TrendingUp, XCircle } from 'lucide-react'

const PHASE_CONFIG = {
  Launching:  { color: '#3B82F6', bg: '#EFF6FF', emoji: '🚀' },
  Growing:    { color: '#10B981', bg: '#ECFDF5', emoji: '📈' },
  Plateauing: { color: '#F59E0B', bg: '#FFF7ED', emoji: '📊' },
  Declining:  { color: '#EF4444', bg: '#FEF2F2', emoji: '📉' },
  Scaling:    { color: '#9B7FD8', bg: '#F5F3FF', emoji: '⚡' },
}

export default function GrowthDiagnosis({ diagnosis }) {
  if (!diagnosis) return null
  const phase = PHASE_CONFIG[diagnosis.currentPhase] || PHASE_CONFIG.Plateauing

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-[#0E0E1A]">Growth Diagnosis</h3>
        <span
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold"
          style={{ background: phase.bg, color: phase.color }}
        >
          {phase.emoji} {diagnosis.currentPhase}
        </span>
      </div>

      {/* Primary blocker */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-700 mb-1">Primary Blocker</p>
            <p className="text-sm text-red-600">{diagnosis.primaryBlocker}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Secondary blockers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <XCircle size={14} className="text-[#EF4444]" />
            <p className="text-sm font-semibold text-[#0E0E1A]">Secondary Blockers</p>
          </div>
          <div className="space-y-2">
            {diagnosis.secondaryBlockers?.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm text-[#6B6B80] bg-gray-50 rounded-lg px-3 py-2"
              >
                <span className="text-red-300 mt-0.5">—</span> {b}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Growth opportunities */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} className="text-[#10B981]" />
            <p className="text-sm font-semibold text-[#0E0E1A]">Opportunities</p>
          </div>
          <div className="space-y-2">
            {diagnosis.growthOpportunities?.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm text-[#6B6B80] bg-green-50 rounded-lg px-3 py-2"
              >
                <span className="text-green-400 mt-0.5">✓</span> {o}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
