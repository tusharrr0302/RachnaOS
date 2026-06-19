// client/src/features/03-audiencelab/components/MomentumOSPanel.jsx

import { motion } from 'framer-motion'

const MOMENTUM_COLORS = {
  Rocket:       { bg: '#ECFDF5', text: '#065F46', dot: '#10B981', emoji: '🚀' },
  Accelerating: { bg: '#EFF6FF', text: '#1E40AF', dot: '#3B82F6', emoji: '⚡' },
  Steady:       { bg: '#FFF7ED', text: '#92400E', dot: '#F59E0B', emoji: '📊' },
  Slowing:      { bg: '#FEF3C7', text: '#78350F', dot: '#D97706', emoji: '🐢' },
  Stalled:      { bg: '#FEF2F2', text: '#991B1B', dot: '#EF4444', emoji: '🛑' },
}

export default function MomentumOSPanel({ report }) {
  if (!report) return null
  const colors = MOMENTUM_COLORS[report.momentumLabel] || MOMENTUM_COLORS.Steady
  const circumference = 2 * Math.PI * 15.9

  return (
    <div className="bg-[#0E0E1A] rounded-2xl p-8 text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <img src="/logo.png" alt="RachnaOS" className="h-7 w-auto brightness-200" />
        <div>
          <h2 className="text-xl font-bold">MomentumOS</h2>
          <p className="text-gray-400 text-sm">See how you compare to creators at your exact stage</p>
        </div>
      </div>

      {/* Momentum Score */}
      <div className="flex items-center gap-6 mb-8 bg-white/5 rounded-2xl p-5">
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

      {/* Growth Prediction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          { period: '6 months',  data: report.growthPrediction?.at6Months },
          { period: '12 months', data: report.growthPrediction?.at12Months },
        ].map((item, i) => (
          <div key={i} className="bg-[#4540C8]/20 border border-[#4540C8]/30 rounded-xl p-5">
            <p className="text-[#9B7FD8] font-semibold mb-2">📈 In {item.period}</p>
            <p className="text-white text-2xl font-bold mb-1">{item.data?.subscribers}</p>
            <p className="text-gray-400 text-xs">{item.data?.condition}</p>
          </div>
        ))}
      </div>

      {/* Momentum Signals */}
      {report.momentumSignals?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-base font-semibold mb-4 text-[#D4B8E0]">Momentum Signals</h3>
          <div className="space-y-2">
            {report.momentumSignals.map((s, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
                <span>{s.signal === 'positive' ? '🟢' : s.signal === 'negative' ? '🔴' : '🟡'}</span>
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
