import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TierBreakdownChart({ predictedCTR }) {
  const data = [
    { tier: "Tier-1", ctr: parseFloat(predictedCTR?.tier1) || 0 },
    { tier: "Tier-2", ctr: parseFloat(predictedCTR?.tier2) || 0 },
    { tier: "Tier-3", ctr: parseFloat(predictedCTR?.tier3) || 0 },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-semibold text-[#0E0E1A] mb-1">Predicted CTR by city tier</h3>
      <p className="text-sm text-gray-500 mb-4">Blended estimate: {predictedCTR?.blended}</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey="tier" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} unit="%" />
          <Tooltip />
          <Bar dataKey="ctr" fill="#4540C8" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
