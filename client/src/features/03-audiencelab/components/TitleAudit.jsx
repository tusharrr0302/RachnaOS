// client/src/features/03-audiencelab/components/TitleAudit.jsx

function ScoreBar({ score }) {
  const color = score >= 70 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444'
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-[#6B6B80]">CTR Potential</span>
        <span className="text-sm font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className="h-2 rounded-full transition-all duration-1000" style={{ width: `${score}%`, background: color }} />
      </div>
    </div>
  )
}

const CTR_CONFIG = {
  High:   { color: '#10B981', bg: '#ECFDF5' },
  Medium: { color: '#F59E0B', bg: '#FFF7ED' },
  Low:    { color: '#EF4444', bg: '#FEF2F2' },
}

export default function TitleAudit({ audit }) {
  if (!audit) return null
  const ctr = CTR_CONFIG[audit.ctrPotential] || CTR_CONFIG.Medium

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">✏️</span>
          <h3 className="font-bold text-[#0E0E1A]">Title Audit</h3>
        </div>
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: ctr.bg, color: ctr.color }}
        >
          {audit.ctrPotential} CTR Potential
        </span>
      </div>

      <ScoreBar score={audit.score} />

      <div className="mt-5 space-y-4 text-sm">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-1">Current Pattern</p>
          <p className="text-[#0E0E1A] leading-relaxed">{audit.currentPattern}</p>
        </div>
        <div className="bg-[#F8F7FF] rounded-xl p-3">
          <p className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-1">💡 Recommendation</p>
          <p className="text-[#4540C8] leading-relaxed">{audit.recommendation}</p>
        </div>
      </div>
    </div>
  )
}
