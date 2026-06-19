// client/src/features/03-audiencelab/components/ThumbnailAudit.jsx

function ScoreBar({ score }) {
  const color = score >= 70 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444'
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-[#6B6B80]">Score</span>
        <span className="text-sm font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className="h-2 rounded-full transition-all duration-1000" style={{ width: `${score}%`, background: color }} />
      </div>
    </div>
  )
}

export default function ThumbnailAudit({ audit }) {
  if (!audit) return null
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🖼</span>
        <h3 className="font-bold text-[#0E0E1A]">Thumbnail Audit</h3>
      </div>

      <ScoreBar score={audit.score} />

      <div className="mt-5 space-y-4 text-sm">
        <InfoBlock label="Dominant Style" value={audit.dominantStyle} />
        <InfoBlock label="✅ What's Working" value={audit.whatWorking} color="text-green-700" bg="bg-green-50" />
        <InfoBlock label="⚠️ Needs Work" value={audit.whatNeedsWork} color="text-amber-700" bg="bg-amber-50" />
        <InfoBlock label="💡 Recommendation" value={audit.recommendation} color="text-[#4540C8]" bg="bg-[#F8F7FF]" />
      </div>
    </div>
  )
}

function InfoBlock({ label, value, color = 'text-[#0E0E1A]', bg = 'bg-gray-50' }) {
  return (
    <div className={`${bg} rounded-xl p-3`}>
      <p className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-1">{label}</p>
      <p className={`${color} leading-relaxed`}>{value}</p>
    </div>
  )
}
