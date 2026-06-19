import { useState } from "react";
import { useChannelPulse } from "./hooks/useChannelPulse";
import ChannelLookupForm from "./components/ChannelLookupForm";
import ChannelPulseScore from "./components/ChannelPulseScore";
import MomentumOSPanel from "./components/MomentumOSPanel";
import OverviewStatCards from "./components/OverviewStatCards";
import ChannelGrowthChart from "./components/ChannelGrowthChart";
import VideoPerformanceTable from "./components/VideoPerformanceTable";
import VideoDeepDiveDrawer from "./components/VideoDeepDiveDrawer";
import EngagementBreakdown from "./components/EngagementBreakdown";
import ConnectChannelButton from "./components/ConnectChannelButton";

const TABS = ["Overview", "Videos", "Channel Pulse (AI)", "MomentumOS"];

export default function AnalyticsHubPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { loading, channelData, analysis, momentumReport, analyzeChannel } = useChannelPulse();

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <div className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="RachnaOS" className="h-8 w-auto" />
          <div>
            <h1 className="text-xl font-bold text-[#0E0E1A]">Analytics Hub</h1>
            <p className="text-sm text-[#6B6B80]">Everything YouTube Studio shows you — plus what it doesn't</p>
          </div>
        </div>
        <ConnectChannelButton />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <ChannelLookupForm onAnalyze={analyzeChannel} loading={loading} />

        <div className="flex gap-2 mt-6 mb-6 border-b border-gray-200">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab ? "border-[#4540C8] text-[#4540C8]" : "border-transparent text-gray-400"
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && channelData && (
          <div className="space-y-6">
            <OverviewStatCards channelData={channelData} />
            <ChannelGrowthChart channelData={channelData} />
            <EngagementBreakdown channelData={channelData} />
          </div>
        )}

        {activeTab === "Videos" && channelData && (
          <VideoPerformanceTable videos={channelData.recentVideos} onSelectVideo={setSelectedVideo} />
        )}

        {activeTab === "Channel Pulse (AI)" && analysis && <ChannelPulseScore analysis={analysis} />}
        {activeTab === "MomentumOS" && momentumReport && <MomentumOSPanel report={momentumReport} channelData={channelData} />}
      </div>

      <VideoDeepDiveDrawer video={selectedVideo} onClose={() => setSelectedVideo(null)} isConnected={false} onConnect={() => {/* trigger OAuth */}} />
    </div>
  );
}
