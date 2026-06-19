export default function EngagementBreakdown({ channelData }) {
  if (!channelData || !channelData.recentVideos) return null;
  
  // Calculate average engagement rate across recent videos
  const videos = channelData.recentVideos;
  const avgLikes = videos.reduce((acc, v) => acc + (v.likes || 0), 0) / (videos.length || 1);
  const avgComments = videos.reduce((acc, v) => acc + (v.comments || 0), 0) / (videos.length || 1);
  const avgViews = videos.reduce((acc, v) => acc + (v.views || 0), 0) / (videos.length || 1);
  
  const likeRate = avgViews > 0 ? ((avgLikes / avgViews) * 100).toFixed(1) : 0;
  const commentRate = avgViews > 0 ? ((avgComments / avgViews) * 100).toFixed(2) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Avg Like Rate</p>
        <p className="text-2xl font-bold text-[#0E0E1A]">{likeRate}%</p>
        <p className="text-xs text-gray-400 mt-1">Based on recent 20 videos</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Avg Comment Rate</p>
        <p className="text-2xl font-bold text-[#0E0E1A]">{commentRate}%</p>
        <p className="text-xs text-gray-400 mt-1">Based on recent 20 videos</p>
      </div>
    </div>
  );
}
