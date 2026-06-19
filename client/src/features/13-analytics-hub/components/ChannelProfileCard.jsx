// client/src/features/03-audiencelab/components/ChannelProfileCard.jsx

import { Globe, Calendar } from 'lucide-react'

export default function ChannelProfileCard({ channelData }) {
  const stats = [
    { label: 'Subscribers', value: fmtNum(channelData.stats.subscribers) },
    { label: 'Total Views',  value: fmtNum(channelData.stats.totalViews) },
    { label: 'Videos',       value: channelData.stats.totalVideos.toLocaleString() },
    { label: 'Avg Views',    value: fmtNum(channelData.computed.avgViewsPerVideo) },
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      {channelData.banner && (
        <img src={channelData.banner} alt="Banner" className="w-full h-28 object-cover" />
      )}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-5">
          {channelData.avatar ? (
            <img
              src={channelData.avatar}
              alt={channelData.channelName}
              className="w-16 h-16 rounded-full border-4 border-white shadow-md flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#4540C8]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-[#4540C8]">{channelData.channelName[0]}</span>
            </div>
          )}
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-[#0E0E1A] truncate">{channelData.channelName}</h2>
            <p className="text-[#4540C8] text-sm font-medium">{channelData.handle}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-[#6B6B80] text-xs">
                <Globe size={12} /> {channelData.country}
              </span>
              <span className="flex items-center gap-1 text-[#6B6B80] text-xs">
                <Calendar size={12} /> Since {new Date(channelData.createdAt).getFullYear()}
              </span>
            </div>
          </div>
        </div>

        {channelData.topics?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {channelData.topics.slice(0, 5).map(t => (
              <span key={t} className="text-xs bg-[#F8F7FF] text-[#4540C8] px-2.5 py-1 rounded-full border border-[#4540C8]/20">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#F8F7FF] rounded-xl p-3 text-center">
              <p className="text-[#4540C8] font-bold text-lg">{s.value}</p>
              <p className="text-[#6B6B80] text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function fmtNum(n) {
  if (!n) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`
  return n.toLocaleString()
}
