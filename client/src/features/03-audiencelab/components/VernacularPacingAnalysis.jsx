export default function VernacularPacingAnalysis({ analysis }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-semibold text-[#0E0E1A] mb-1">Vernacular pacing analysis</h3>
      <p className="text-sm text-gray-500 mb-4">{analysis?.verdict}</p>
      <div className="space-y-3">
        {analysis?.riskTimestamps?.map((risk, i) => (
          <div key={i} className="flex gap-3 bg-[#FFF7ED] border border-[#FDE3C7] rounded-xl p-3">
            <span className="text-xs font-bold text-[#9A3412] whitespace-nowrap">{risk.approxPosition}</span>
            <div>
              <p className="text-sm text-[#7C2D12]">{risk.issue}</p>
              <p className="text-xs text-[#9A3412] mt-1">Affects: {risk.affectedTiers?.join(", ")}</p>
            </div>
          </div>
        ))}
        {(!analysis?.riskTimestamps?.length) && <p className="text-sm text-green-600">✅ No major pacing risks detected across tiers.</p>}
      </div>
    </div>
  );
}
