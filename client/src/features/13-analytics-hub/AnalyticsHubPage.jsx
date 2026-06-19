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
import ChannelProfileCard from "./components/ChannelProfileCard";
import QuickWins from "./components/QuickWins";
import ContentStrategyPanel from "./components/ContentStrategyPanel";
import GrowthDiagnosis from "./components/GrowthDiagnosis";
import MonetizationCard from "./components/MonetizationCard";
import AudiencePersonas from "./components/AudiencePersonas";
import ThumbnailAudit from "./components/ThumbnailAudit";
import TitleAudit from "./components/TitleAudit";
import WeeklyActionPlan from "./components/WeeklyActionPlan";

const TABS = ["Overview", "Videos", "Channel Pulse (AI)", "MomentumOS"];

function AISection({ analysis }) {
  if (!analysis) return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm">
      <div className="w-8 h-8 border-4 border-[#4540C8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-sm text-[#4540C8] font-semibold">Running AI analysis…</p>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChannelPulseScore analysis={analysis} />
        <div className="lg:col-span-2 space-y-6">
          <QuickWins wins={analysis.quickWins || []} />
          <GrowthDiagnosis diagnosis={analysis.growthDiagnosis} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentStrategyPanel strategy={analysis.contentStrategy} />
        <MonetizationCard monetization={analysis.monetizationReadiness} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThumbnailAudit audit={analysis.thumbnailAudit} />
        <TitleAudit audit={analysis.titleAudit} />
      </div>
      <AudiencePersonas
        personas={analysis.audienceSignals?.estimatedAudiencePersonas || []}
        signals={analysis.audienceSignals}
      />
      <WeeklyActionPlan plan={analysis.weeklyActionPlan || []} />
    </>
  );
}

export default function AnalyticsHubPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { loading, channelData, analysis, momentumReport, analyzeChannel } = useChannelPulse();

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      {/* Header */}
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

        {/* Tabs */}
        <div className="flex gap-2 mt-6 mb-6 border-b border-gray-200">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab ? "border-[#4540C8] text-[#4540C8]" : "border-transparent text-gray-400 hover:text-gray-600"
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-[#4540C8] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-semibold text-[#4540C8]">Fetching channel data & running AI analysis…</p>
          </div>
        )}

        {/* Empty state */}
        {!channelData && !loading && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
            <h2 className="text-lg font-bold text-[#0E0E1A] mb-2">Enter a YouTube channel to get started</h2>
            <p className="text-sm text-gray-400">Paste a channel URL or @handle above to run a full AI analysis.</p>
          </div>
        )}

        {/* ── OVERVIEW TAB ── */}
        {!loading && activeTab === "Overview" && channelData && (
          <div className="space-y-6">
            <ChannelProfileCard channelData={channelData} />
            <OverviewStatCards channelData={channelData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChannelGrowthChart channelData={channelData} />
              <EngagementBreakdown channelData={channelData} />
            </div>
            <AISection analysis={analysis} />
          </div>
        )}

        {/* ── VIDEOS TAB ── */}
        {!loading && activeTab === "Videos" && channelData && (
          <VideoPerformanceTable videos={channelData.recentVideos} onSelectVideo={setSelectedVideo} />
        )}

        {/* ── CHANNEL PULSE TAB ── */}
        {!loading && activeTab === "Channel Pulse (AI)" && (
          <div className="space-y-6">
            <AISection analysis={analysis} />
          </div>
        )}

        {/* ── MOMENTUMOS TAB ── */}
        {!loading && activeTab === "MomentumOS" && momentumReport && (
          <MomentumOSPanel report={momentumReport} channelData={channelData} />
        )}
        {!loading && activeTab === "MomentumOS" && !momentumReport && channelData && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm">
            <div className="w-8 h-8 border-4 border-[#4540C8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-[#4540C8] font-semibold">Loading MomentumOS…</p>
          </div>
        )}
      </div>

      <VideoDeepDiveDrawer
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        isConnected={false}
        onConnect={() => {}}
      />
    </div>
  );
}
