import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Clock } from "lucide-react";

export default function VideoDeepDiveDrawer({ video, retentionCurve, trafficSources, isConnected, onClose, onConnect }) {
  if (!video) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-[#F8F7FF] shadow-2xl z-50 overflow-y-auto border-l border-gray-200">
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200 sticky top-0 z-10">
        <h2 className="font-bold text-lg text-[#0E0E1A] line-clamp-1">{video.title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors p-2 -mr-2">✕</button>
      </div>
      
      <div className="p-6">
        <img src={video.thumbnail} alt={video.title} className="w-full rounded-2xl mb-6 shadow-sm border border-gray-100" />
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Clock size={16} />
          <span>Published {new Date(video.publishedAt).toLocaleDateString()}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Stat label="Views" value={video.views?.toLocaleString() || '0'} />
          <Stat label="Likes" value={video.likes?.toLocaleString() || '0'} />
          <Stat label="Comments" value={video.comments?.toLocaleString() || '0'} />
          <Stat label="Like Ratio" value={`${video.likeRatio || 0}%`} />
        </div>

        {isConnected ? (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-[#0E0E1A] mb-4">Audience retention</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={retentionCurve}>
                  <XAxis dataKey="elapsedVideoTimeRatio" tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip formatter={(v) => `${Math.round(v * 100)}%`} />
                  <Area type="monotone" dataKey="audienceWatchRatio" stroke="#4540C8" fill="#4540C820" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-[#0E0E1A] mb-4">Traffic sources</h3>
              <ul className="space-y-2 text-sm">
                {trafficSources?.map((t, i) => (
                  <li key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600">{t.insightTrafficSourceType}</span>
                    <span className="font-semibold text-[#0E0E1A]">{t.views?.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm">
            <p className="text-sm text-gray-500 mb-4">Real retention curves, traffic sources, and watch time need your channel connected.</p>
            <button onClick={onConnect} className="px-5 py-2.5 bg-[#4540C8] text-white rounded-xl text-sm font-semibold hover:bg-[#3730A3] transition-colors shadow-sm">
              Connect my channel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
      <p className="text-xl font-bold text-[#4540C8] mb-1">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
