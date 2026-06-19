export default function BrandValuationImpact({ impact }) {
  if (!impact) return null;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-semibold text-[#0E0E1A] mb-1">Brand Valuation Impact</h3>
      <p className="text-sm text-gray-500 mb-3">{impact.verdict}</p>
      
      <div className="bg-[#F8F7FF] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-bold text-[#4540C8]">Rate Potential:</span>
          <span className="text-sm font-semibold text-[#0E0E1A] px-2 py-0.5 bg-white rounded border border-gray-200">{impact.ratePotential}</span>
        </div>
        <p className="text-sm text-gray-700">{impact.reasoning}</p>
      </div>
    </div>
  );
}
