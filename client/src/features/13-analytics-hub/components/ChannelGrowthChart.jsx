import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ChannelGrowthChart({ channelData }) {
  // In a real app, this would use time-series data. We mock it for the UI demo based on the current stat.
  const data = [
    { month: 'Jan', subs: Math.round((channelData?.stats?.subscribers || 0) * 0.8) },
    { month: 'Feb', subs: Math.round((channelData?.stats?.subscribers || 0) * 0.85) },
    { month: 'Mar', subs: Math.round((channelData?.stats?.subscribers || 0) * 0.9) },
    { month: 'Apr', subs: Math.round((channelData?.stats?.subscribers || 0) * 0.95) },
    { month: 'May', subs: channelData?.stats?.subscribers || 0 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mt-6">
      <h3 className="font-semibold text-[#0E0E1A] mb-4">Estimated Channel Growth</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4540C8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4540C8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}k` : val} />
            <Tooltip />
            <Area type="monotone" dataKey="subs" stroke="#4540C8" fillOpacity={1} fill="url(#colorSubs)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
