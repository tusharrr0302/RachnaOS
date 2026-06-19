import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function VideoDeepDiveDrawer({ video, retentionCurve, trafficSources, isConnected, onClose, onConnect }) {
  if (!video) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto p-6">
      <button onClick={onClose} className="text-gray-400 mb-4 hover:text-gray-800 transition-colors">✕ Close</button>
      <img src={video.thumbnail} alt={video.title} className="w-full rounded-xl mb-4" />
      <h2 className="font-bold text-lg text-[#0E0E1A] mb-4">{video.title}</h2>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Stat label="Views" value={video.views?.toLocaleString()} />
        <Stat label="Likes" value={video.likes?.toLocaleString()} />
        <Stat label="Comments" value={video.comments?.toLocaleString()} />
      </div>

      {isConnected ? (
        <>
          <h3 className="font-semibold mb-2">Audience retention</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={retentionCurve}>
              <XAxis dataKey="elapsedVideoTimeRatio" tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `${Math.round(v * 100)}%`} />
              <Area type="monotone" dataKey="audienceWatchRatio" stroke="#4540C8" fill="#4540C820" />
            </AreaChart>
          </ResponsiveContainer>

          <h3 className="font-semibold mt-6 mb-2">Traffic sources</h3>
          <ul className="space-y-1 text-sm">
            {trafficSources?.map((t, i) => (
              <li key={i} className="flex justify-between border-b border-gray-50 py-1">
                <span>{t.insightTrafficSourceType}</span><span className="font-semibold">{t.views?.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="bg-[#F8F7FF] rounded-xl p-5 text-center">
          <p className="text-sm text-gray-600 mb-3">Real retention curves, traffic sources, and watch time need your channel connected.</p>
          <button onClick={onConnect} className="px-4 py-2 bg-[#4540C8] text-white rounded-xl text-sm font-semibold hover:bg-[#3730A3] transition-colors">Connect my channel</button>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-[#F8F7FF] rounded-xl p-3 text-center">
      <p className="text-[#4540C8] font-bold">{value}</p>
      <p className="text-gray-500 text-xs">{label}</p>
    </div>
  );
}
