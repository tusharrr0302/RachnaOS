// client/src/features/03-audiencelab/components/ContentStrategyPanel.jsx

import { Target, Clock, Type, Image, Zap, AlertCircle } from 'lucide-react'

function ScoreBar({ score, color = '#4540C8' }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
      <div
        className="h-2 rounded-full transition-all duration-1000"
        style={{ width: `${score}%`, background: color }}
      />
    </div>
  )
}

export default function ContentStrategyPanel({ strategy }) {
  if (!strategy) return null
  const score = strategy.consistencyScore || 0
  const scoreColor = score >= 70 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-[#0E0E1A]">Content Strategy</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold" style={{ color: scoreColor }}>{score}/100</span>
          <span className="text-xs text-[#6B6B80]">consistency</span>
        </div>
      </div>
      <ScoreBar score={score} color={scoreColor} />

      <div className="mt-5 space-y-4">
        <InfoRow icon={Clock} label="Posting Frequency" value={strategy.postingFrequencyAssessment} />
        <InfoRow icon={Type}  label="Title Patterns"   value={strategy.titlePatterns} />
        <InfoRow icon={Image} label="Thumbnail Style"  value={strategy.thumbnailStyle} />
        <InfoRow icon={Zap}   label="Hook Quality"     value={strategy.hookQuality} />
      </div>

      {strategy.contentGaps?.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={14} className="text-[#EF4444]" />
            <p className="text-sm font-semibold text-[#0E0E1A]">Content Gaps</p>
          </div>
          <div className="space-y-2">
            {strategy.contentGaps.map((gap, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-[#6B6B80] bg-red-50 rounded-lg px-3 py-2">
                <span className="text-red-400 mt-0.5">•</span>
                {gap}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-lg bg-[#F8F7FF] flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={14} className="text-[#4540C8]" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide">{label}</p>
        <p className="text-sm text-[#0E0E1A] mt-0.5 leading-relaxed">{value}</p>
      </div>
    </div>
  )
}
