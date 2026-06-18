// client/src/features/03-audiencelab/AudienceLabPage.jsx

import { Toaster } from 'react-hot-toast'
import { useAudienceLab } from './hooks/useAudienceLab'
import ChannelInputForm    from './components/ChannelInputForm'
import ChannelProfileCard  from './components/ChannelProfileCard'
import HealthScoreCard     from './components/HealthScoreCard'
import ContentStrategyPanel from './components/ContentStrategyPanel'
import AudiencePersonas    from './components/AudiencePersonas'
import GrowthDiagnosis     from './components/GrowthDiagnosis'
import ThumbnailAudit      from './components/ThumbnailAudit'
import TitleAudit          from './components/TitleAudit'
import MonetizationCard    from './components/MonetizationCard'
import WeeklyActionPlan    from './components/WeeklyActionPlan'
import QuickWins           from './components/QuickWins'
import MomentumOSSection   from './components/MomentumOSSection'

const LOADING_STEPS = [
  'Fetching 20 recent videos...',
  'Analyzing content patterns...',
  'Comparing with creators at your stage...',
]

export default function AudienceLabPage() {
  const {
    loading, loadingStep,
    channelData, analysis, momentumReport,
    analyzeChannel,
  } = useAudienceLab()

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <Toaster position="top-right" />

      {/* ── Page Header ── */}
      <div className="border-b border-gray-200 bg-white px-6 py-4 flex items-center gap-3 sticky top-0 z-10">
        <img src="/logo.png" alt="RachnaOS" className="h-8 w-auto" />
        <div>
          <h1 className="text-xl font-bold text-[#0E0E1A]">AudienceLab</h1>
          <p className="text-sm text-[#6B6B80]">Deep channel analysis powered by Claude AI</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── Input ── */}
        <ChannelInputForm onAnalyze={analyzeChannel} loading={loading} />

        {/* ── Loading State ── */}
        {loading && (
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="relative w-16 h-16">
              <div className="w-16 h-16 border-4 border-[#4540C8]/20 rounded-full absolute" />
              <div className="w-16 h-16 border-4 border-[#4540C8] border-t-transparent rounded-full animate-spin absolute" />
            </div>
            <p className="text-[#4540C8] font-semibold animate-pulse text-center">{loadingStep}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
              {LOADING_STEPS.map((step, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3 shadow-sm">
                  <div
                    className="w-2 h-2 bg-[#4540C8] rounded-full animate-bounce flex-shrink-0"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                  <span className="text-sm text-[#6B6B80]">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {channelData && analysis && (
          <div className="mt-8 space-y-6">

            {/* Row 1: Profile + Health */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ChannelProfileCard channelData={channelData} />
              </div>
              <HealthScoreCard analysis={analysis} />
            </div>

            {/* Quick Wins Banner */}
            <QuickWins wins={analysis.quickWins} />

            {/* Row 2: Content Strategy + Audience Personas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ContentStrategyPanel strategy={analysis.contentStrategy} />
              <AudiencePersonas
                personas={analysis.audienceSignals?.estimatedAudiencePersonas}
                signals={analysis.audienceSignals}
              />
            </div>

            {/* Row 3: Growth Diagnosis */}
            <GrowthDiagnosis diagnosis={analysis.growthDiagnosis} />

            {/* Row 4: Thumbnail + Title Audits */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ThumbnailAudit audit={analysis.thumbnailAudit} />
              <TitleAudit     audit={analysis.titleAudit} />
            </div>

            {/* Row 5: Monetization + Weekly Plan */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MonetizationCard  monetization={analysis.monetizationReadiness} />
              <WeeklyActionPlan  plan={analysis.weeklyActionPlan} />
            </div>

            {/* Top Video Insight */}
            {analysis.topVideoInsight && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-[#0E0E1A] mb-4">🏆 Top Video Insight</h3>
                <p className="font-semibold text-[#4540C8] mb-2">"{analysis.topVideoInsight.title}"</p>
                <p className="text-sm text-[#6B6B80] mb-4">{analysis.topVideoInsight.whyItWorked}</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.topVideoInsight.replicableElements?.map((el, i) => (
                    <span key={i} className="text-xs bg-[#F8F7FF] text-[#4540C8] border border-[#4540C8]/20 px-3 py-1 rounded-full">
                      {el}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* MomentumOS */}
            {momentumReport && (
              <MomentumOSSection report={momentumReport} channelData={channelData} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
