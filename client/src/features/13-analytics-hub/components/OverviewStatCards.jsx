export default function OverviewStatCards({ channelData }) {
  if (!channelData || !channelData.stats) return null;
  const { subscribers, totalViews, totalVideos } = channelData.stats;
  const { avgViewsPerVideo, avgLikeRatio, postingFrequencyDays } = channelData.computed || {};

  const stats = [
    { label: 'Subscribers',     value: fmtNum(subscribers) },
    { label: 'Total Views',      value: fmtNum(totalViews) },
    { label: 'Total Videos',     value: totalVideos?.toLocaleString() || 'N/A' },
    { label: 'Avg Views/Video',  value: fmtNum(avgViewsPerVideo) },
    { label: 'Avg Like Ratio',   value: avgLikeRatio ? `${avgLikeRatio}%` : 'N/A' },
    { label: 'Posts Every',      value: postingFrequencyDays ? `${postingFrequencyDays} days` : 'N/A' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm text-center">
          <p className="text-2xl font-bold text-[#4540C8] mb-1">{s.value}</p>
          <p className="text-xs text-gray-500">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function fmtNum(n) {
  if (!n) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}
