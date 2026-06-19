export default function AggregatedVerdict({ verdict }) {
  if (!verdict) return null;
  return (
    <div className="bg-[#4540C8] text-white rounded-2xl p-6 shadow-md mb-6">
      <h3 className="font-semibold text-[#FFF8E1] mb-2">Synthesis Verdict</h3>
      <p className="text-sm leading-relaxed">{verdict}</p>
    </div>
  );
}
