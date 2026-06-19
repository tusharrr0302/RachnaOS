import { useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Clock, Sparkles, ThumbsUp, Eye, Type, Target, Users } from "lucide-react";
import { useVideoAnalysis } from "../hooks/useVideoAnalysis";
import FreelancerRecommendation from "./FreelancerRecommendation";

export default function VideoDeepDiveDrawer({ video, retentionCurve, trafficSources, isConnected, onClose, onConnect, channelData }) {
  const { loading: aiLoading, analysis, analyzeVideo, setAnalysis } = useVideoAnalysis();

  useEffect(() => {
    if (video) {
      // Clear previous
      setAnalysis(null);
      // Run analysis
      const channelAverages = channelData?.computed || {};
      analyzeVideo(video, channelAverages);
    }
  }, [video, channelData, analyzeVideo, setAnalysis]);

  if (!video) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-[#F8F7FF] shadow-2xl z-50 overflow-y-auto border-l border-gray-200 flex flex-col">
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200 sticky top-0 z-20">
        <h2 className="font-bold text-lg text-[#0E0E1A] line-clamp-1">{video.title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors p-2 -mr-2">✕</button>
      </div>
      
      <div className="p-6 flex-1 space-y-8">
        {/* Top Header Section */}
        <div>
          <img src={video.thumbnail} alt={video.title} className="w-full rounded-2xl mb-4 shadow-sm border border-gray-100" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            <span>Published {new Date(video.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Views" value={video.views?.toLocaleString() || '0'} />
          <Stat label="Likes" value={video.likes?.toLocaleString() || '0'} />
          <Stat label="Comments" value={video.comments?.toLocaleString() || '0'} />
          <Stat label="Like Ratio" value={`${video.likeRatio || 0}%`} />
        </div>

        {/* AI Deep Dive Section */}
        <div className="bg-gradient-to-br from-white to-[#F8F7FF] rounded-2xl border border-[#4540C8]/20 shadow-sm overflow-hidden">
          <div className="bg-[#4540C8]/5 px-6 py-4 border-b border-[#4540C8]/10 flex items-center gap-2">
            <Sparkles size={18} className="text-[#4540C8]" />
            <h3 className="font-bold text-[#0E0E1A]">AI Performance Analysis</h3>
          </div>
          
          <div className="p-6">
            {aiLoading && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-8 h-8 border-4 border-[#4540C8] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm font-semibold text-[#4540C8]">Analyzing why this video worked...</p>
              </div>
            )}

            {!aiLoading && analysis && (
              <div className="space-y-6">
                {/* Verdict */}
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <p className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide mb-2">Overall Verdict</p>
                  <p className="text-[#0E0E1A] leading-relaxed text-sm">{analysis.overallVerdict}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title & Hook */}
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Type size={16} className="text-[#4540C8]" />
                      <p className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide">Title & Hook</p>
                    </div>
                    <ul className="text-sm space-y-2 text-[#0E0E1A]">
                      <li className="flex justify-between">
                        <span className="text-gray-500">Hook Quality:</span>
                        <span className="font-semibold">{analysis.titleAnalysis.hookQuality}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">CTR Potential:</span>
                        <span className="font-semibold">{analysis.titleAnalysis.ctrPotential}</span>
                      </li>
                    </ul>
                    {analysis.titleAnalysis.psychologicalTriggers?.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-50">
                        <p className="text-xs text-gray-500 mb-2">Psychological Triggers:</p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.titleAnalysis.psychologicalTriggers.map((t, i) => (
                            <span key={i} className="text-[11px] bg-[#F8F7FF] text-[#4540C8] px-2 py-1 rounded border border-[#4540C8]/20">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Prediction */}
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye size={16} className="text-[#10B981]" />
                      <p className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide">Thumbnail Design</p>
                    </div>
                    <p className="text-sm text-[#0E0E1A] leading-relaxed mb-2">{analysis.thumbnailPrediction.likelyDesign}</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200">
                        Effectiveness: {analysis.thumbnailPrediction.effectiveness}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Audience Sentiment */}
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <ThumbsUp size={16} className="text-[#F59E0B]" />
                    <p className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide">Audience Sentiment: {analysis.audienceSentiment.estimatedSentiment}</p>
                  </div>
                  <p className="text-sm text-[#0E0E1A] leading-relaxed">{analysis.audienceSentiment.engagementBreakdown}</p>
                </div>

                {/* What Would Top Creator Do? */}
                {analysis.topCreatorPerspective && (
                  <div className="bg-gradient-to-br from-[#4540C8] to-[#9B7FD8] rounded-xl p-5 border border-[#4540C8]/20 shadow-md text-white">
                    <div className="flex items-center gap-2 mb-3">
                      <Target size={18} className="text-yellow-300" />
                      <p className="text-sm font-bold uppercase tracking-wide">
                        What Would {analysis.topCreatorPerspective.creatorName} Do?
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-white/95">
                      {analysis.topCreatorPerspective.whatTheyWouldDo}
                    </p>
                  </div>
                )}

                {/* What to Repeat */}
                {analysis.replicableElements?.length > 0 && (
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Target size={16} className="text-[#EF4444]" />
                      <p className="text-xs font-semibold text-[#6B6B80] uppercase tracking-wide">What to replicate</p>
                    </div>
                    <ul className="space-y-2">
                      {analysis.replicableElements.map((el, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#0E0E1A]">
                          <span className="text-[#EF4444] mt-0.5">•</span>
                          <span className="leading-relaxed">{el}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Audience Persona Reactions */}
                {analysis.personaReactions?.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-bold text-[#0E0E1A] mb-4 flex items-center gap-2">
                      <Users size={18} className="text-[#4540C8]" />
                      Audience Persona Breakdown
                    </h3>
                    <div className="space-y-4">
                      {analysis.personaReactions.map((p, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                            <span className="font-bold text-[#0E0E1A] text-sm">{p.personaName}</span>
                          </div>
                          <div className="p-4 space-y-4">
                            <div>
                              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">Reaction</p>
                              <p className="text-sm text-gray-700 leading-relaxed">{p.reaction}</p>
                            </div>
                            <div className="bg-[#F8F7FF] rounded-lg p-3 border border-[#4540C8]/10">
                              <p className="text-[11px] font-bold text-[#4540C8] uppercase tracking-wide mb-1">Suggestion for Next Time</p>
                              <p className="text-sm text-[#0E0E1A] leading-relaxed">{p.suggestion}</p>
                              {p.recommendedSkills && p.recommendedSkills.length > 0 && (
                                <FreelancerRecommendation skills={p.recommendedSkills} />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* YT Connected Data (Retention & Traffic) */}
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
