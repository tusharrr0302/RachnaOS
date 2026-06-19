// client/src/features/03-audiencelab/components/MomentumOSPanel.jsx

import { motion } from 'framer-motion'

const MOMENTUM_COLORS = {
  Rocket:       { bg: '#ECFDF5', text: '#065F46', dot: '#10B981', emoji: '🚀' },
  Accelerating: { bg: '#EFF6FF', text: '#1E40AF', dot: '#3B82F6', emoji: '⚡' },
  Steady:       { bg: '#FFF7ED', text: '#92400E', dot: '#F59E0B', emoji: '📊' },
  Slowing:      { bg: '#FEF3C7', text: '#78350F', dot: '#D97706', emoji: '🐢' },
  Stalled:      { bg: '#FEF2F2', text: '#991B1B', dot: '#EF4444', emoji: '🛑' },
}

const PRIORITY_CONFIG = {
  High:        { emoji: '🔥', label: 'HIGH PRIORITY',   bg: 'bg-red-900/30',    border: 'border-red-700/50',    text: 'text-red-400' },
  Medium:      { emoji: '⚡', label: 'MEDIUM PRIORITY', bg: 'bg-yellow-900/30', border: 'border-yellow-700/50', text: 'text-yellow-400' },
  Opportunity: { emoji: '💡', label: 'OPPORTUNITY',     bg: 'bg-blue-900/30',   border: 'border-blue-700/50',   text: 'text-blue-400' },
}

const SIGNAL_ICON = { positive: '🟢', negative: '🔴', neutral: '🟡' }
const IMPACT_STYLE = {
  High:   'text-red-400 bg-red-900/30 px-2 py-0.5 rounded text-xs font-bold',
  Medium: 'text-yellow-400 bg-yellow-900/30 px-2 py-0.5 rounded text-xs font-bold',
  Low:    'text-gray-400 bg-white/5 px-2 py-0.5 rounded text-xs font-bold',
}

export default function MomentumOSPanel({ report }) {
  if (!report) return null
  const colors = MOMENTUM_COLORS[report.momentumLabel] || MOMENTUM_COLORS.Steady
  const circumference = 2 * Math.PI * 15.9
  const priority = PRIORITY_CONFIG[report.nextBestAction?.priority] || PRIORITY_CONFIG.Medium

  return (
    <div className="bg-[#0E0E1A] rounded-2xl p-8 text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <img src="/logo.png" alt="RachnaOS" className="h-7 w-auto brightness-200" />
        <div>
          <h2 className="text-xl font-bold">MomentumOS</h2>
          <p className="text-gray-400 text-sm">Your AI growth advisor — not just analytics</p>
        </div>
      </div>

      {/* Momentum Score */}
      <div className="flex items-center gap-6 mb-6 bg-white/5 rounded-2xl p-5">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1F2937" strokeWidth="3.5" />
            <motion.circle
              cx="18" cy="18" r="15.9" fill="none"
              stroke={colors.dot} strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - (report.momentumScore / 100) * circumference }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
            {report.momentumScore}
          </span>
        </div>
        <div>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold mb-2"
            style={{ background: colors.bg, color: colors.text }}
          >
            {colors.emoji} {report.momentumLabel}
          </span>
          <p className="text-gray-300 text-sm max-w-lg">{report.overallVerdict}</p>
        </div>
      </div>

      {/* Why This Score */}
      {report.scoreReasons?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-5"
        >
          <h3 className="text-base font-semibold mb-4 text-[#D4B8E0] flex items-center gap-2">
            🧠 Why This Score?
          </h3>
          <div className="space-y-2.5">
            {report.scoreReasons.map((r, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0">{SIGNAL_ICON[r.signal] || '🟡'}</span>
                <p className="text-gray-300 text-sm flex-1">{r.insight}</p>
                {r.impact && (
                  <span className={IMPACT_STYLE[r.impact] || IMPACT_STYLE.Low}>
                    {r.impact}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Next Best Action */}
      {report.nextBestAction && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mb-8 rounded-2xl p-5 border ${priority.bg} ${priority.border}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{priority.emoji}</span>
            <span className={`text-xs font-black tracking-widest ${priority.text}`}>
              {priority.label}
            </span>
          </div>
          <h3 className="text-base font-semibold mb-3 text-white flex items-center gap-2">
            🎯 Recommended Next Action
          </h3>
          <p className="text-gray-200 text-sm leading-relaxed mb-4">
            {report.nextBestAction.recommendation}
          </p>
          {report.nextBestAction.potentialImpact?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Potential Impact</p>
              <div className="space-y-1.5">
                {report.nextBestAction.potentialImpact.map((impact, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-green-400">📈</span>
                    {impact}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Compared Creators */}
      {report.comparedCreators?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-base font-semibold mb-4 text-[#D4B8E0]">
            📊 Creators who were at your stage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.comparedCreators.map((creator, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-white">{creator.creatorName}</p>
                    <p className="text-gray-400 text-xs">{creator.niche}</p>
                  </div>
                  <span className="text-xs bg-[#4540C8]/30 text-[#9B7FD8] px-2 py-1 rounded-lg whitespace-nowrap">
                    {creator.atSimilarStageStats.subscribersAtThatTime?.toLocaleString()} subs then
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-black/20 rounded-lg p-2 text-center">
                    <p className="text-[#9B7FD8] text-base font-bold">
                      {creator.atSimilarStageStats.avgViewsPerVideo?.toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-xs">Avg Views</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-2 text-center">
                    <p className="text-[#9B7FD8] text-base font-bold">
                      {creator.atSimilarStageStats.postingFrequency}
                    </p>
                    <p className="text-gray-500 text-xs">Post Freq</p>
                  </div>
                </div>
                <div className="bg-[#4540C8]/20 rounded-lg p-3 mb-2">
                  <p className="text-xs text-[#D4B8E0] font-semibold mb-1">How they grew:</p>
                  <p className="text-gray-300 text-xs">{creator.howTheyGrew}</p>
                </div>
                <p className="text-[#9B7FD8] text-xs">💡 {creator.lessonForThisCreator}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Performance vs Benchmark */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Views',       value: report.performanceVsBenchmark?.viewsComparison },
          { label: 'Engagement',  value: report.performanceVsBenchmark?.engagementComparison },
          { label: 'Growth Rate', value: report.performanceVsBenchmark?.growthRateComparison },
        ].map((item, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm mb-2">{item.label}</p>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              item.value === 'Above Average' ? 'bg-green-900/40 text-green-400' :
              item.value === 'Below Average' ? 'bg-red-900/40 text-red-400' :
              'bg-yellow-900/40 text-yellow-400'
            }`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Growth Prediction — richer cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          { period: '6 Months',  data: report.growthPrediction?.at6Months },
          { period: '12 Months', data: report.growthPrediction?.at12Months },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.15 }}
            className="bg-[#4540C8]/20 border border-[#4540C8]/30 rounded-xl p-5"
          >
            <p className="text-[#9B7FD8] font-semibold mb-3 text-sm">📈 {item.period} Projection</p>
            <p className="text-white text-2xl font-bold mb-1">{item.data?.subscribers}</p>
            <p className="text-gray-500 text-xs mb-4">Expected subscriber range</p>

            {item.data?.confidencePercent && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-gray-400">Confidence</span>
                  <span className="text-xs font-bold text-[#9B7FD8]">{item.data.confidencePercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#4540C8] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.data.confidencePercent}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 + i * 0.15 }}
                  />
                </div>
              </div>
            )}

            {item.data?.basedOn?.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Based On</p>
                <ul className="space-y-1">
                  {item.data.basedOn.map((factor, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-gray-400">
                      <span className="text-[#9B7FD8] mt-0.5 flex-shrink-0">›</span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Momentum Signals */}
      {report.momentumSignals?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-base font-semibold mb-4 text-[#D4B8E0]">Momentum Signals</h3>
          <div className="space-y-2">
            {report.momentumSignals.map((s, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
                <span>{SIGNAL_ICON[s.signal] || '🟡'}</span>
                <p className="text-gray-300 text-sm">{s.insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Burnout Risk */}
      {report.burnoutRisk && (
        <div className={`rounded-xl p-5 border ${
          report.burnoutRisk.level === 'High'   ? 'border-red-800 bg-red-900/20' :
          report.burnoutRisk.level === 'Medium' ? 'border-yellow-800 bg-yellow-900/20' :
          'border-green-800 bg-green-900/20'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <span>{report.burnoutRisk.level === 'High' ? '🚨' : report.burnoutRisk.level === 'Medium' ? '⚠️' : '✅'}</span>
            <p className="font-semibold">Burnout Risk: {report.burnoutRisk.level}</p>
          </div>
          <p className="text-gray-400 text-sm mb-2">{report.burnoutRisk.reason}</p>
          <p className="text-gray-300 text-sm">{report.burnoutRisk.advice}</p>
        </div>
      )}
    </div>
  )
}
