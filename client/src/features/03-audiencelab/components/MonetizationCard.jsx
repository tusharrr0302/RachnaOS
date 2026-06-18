// client/src/features/03-audiencelab/components/MonetizationCard.jsx

import { DollarSign, CheckCircle2, XCircle, TrendingUp } from 'lucide-react'

const POTENTIAL_CONFIG = {
  'Very High': { color: '#10B981', bg: '#ECFDF5' },
  High:        { color: '#3B82F6', bg: '#EFF6FF' },
  Medium:      { color: '#F59E0B', bg: '#FFF7ED' },
  Low:         { color: '#EF4444', bg: '#FEF2F2' },
}

export default function MonetizationCard({ monetization }) {
  if (!monetization) return null
  const potential = POTENTIAL_CONFIG[monetization.brandDealPotential] || POTENTIAL_CONFIG.Medium
  const score = monetization.score || 0
  const scoreColor = score >= 70 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
          <DollarSign size={16} className="text-[#10B981]" />
        </div>
        <h3 className="font-bold text-[#0E0E1A]">Monetization Readiness</h3>
      </div>

      {/* Score + YPP */}
      <div className="flex items-center gap-4 mb-5">
        <div className="text-center">
          <p className="text-3xl font-bold" style={{ color: scoreColor }}>{score}</p>
          <p className="text-xs text-[#6B6B80]">/ 100</p>
        </div>
        <div className="flex-1">
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-1000"
              style={{ width: `${score}%`, background: scoreColor }}
            />
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            {monetization.isYPPEligible
              ? <CheckCircle2 size={14} className="text-green-500" />
              : <XCircle size={14} className="text-red-400" />
            }
            <span className="text-xs text-[#6B6B80]">
              YPP {monetization.isYPPEligible ? 'Eligible ✓' : 'Not Yet Eligible'}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#6B6B80]">Brand Deal Potential</span>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: potential.bg, color: potential.color }}
          >
            {monetization.brandDealPotential}
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 space-y-2">
          <StatRow icon={TrendingUp} label="Est. CPM" value={monetization.estimatedCPM} />
          <StatRow icon={DollarSign} label="Sponsorship Rate" value={monetization.sponsorshipRate} />
        </div>
      </div>
    </div>
  )
}

function StatRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-[#6B6B80]">
        <Icon size={12} /> {label}
      </div>
      <span className="font-semibold text-[#0E0E1A]">{value}</span>
    </div>
  )
}
