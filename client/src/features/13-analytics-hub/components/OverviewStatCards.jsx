export default function OverviewStatCards({ channelData }) {
  if (!channelData || !channelData.stats) return null;
  const { subscribers, totalViews, videoCount } = channelData.stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Subscribers</p>
        <p className="text-2xl font-bold text-[#0E0E1A]">{subscribers?.toLocaleString() || 'N/A'}</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Total Views</p>
        <p className="text-2xl font-bold text-[#0E0E1A]">{totalViews?.toLocaleString() || 'N/A'}</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Videos</p>
        <p className="text-2xl font-bold text-[#0E0E1A]">{videoCount?.toLocaleString() || 'N/A'}</p>
      </div>
    </div>
  );
}
