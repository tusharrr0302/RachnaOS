// server/src/features/audiencelab/service.js
// All Claude claude-sonnet-4-6 AI calls for AudienceLab + MomentumOS

const { OpenAI } = require('openai')

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
})

// ─────────────────────────────────────────────────────────────────────────────
// AUDIENCE LAB — Deep Channel Analysis
// ─────────────────────────────────────────────────────────────────────────────
exports.runAudienceLabAnalysis = async (channelData) => {
  const prompt = buildAudienceLabPrompt(channelData)

  const completion = await openai.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `You are RachnaOS's AudienceLab AI — an expert YouTube channel analyst with deep knowledge of content strategy, audience psychology, thumbnail science, and growth mechanics for Indian and global YouTube creators.

Your job is to analyze YouTube channel data and produce a brutally honest, deeply insightful, actionable analysis. Never give generic advice. Every insight must reference specific data points from the channel.

Always respond with a valid JSON object exactly matching this structure — no markdown fences, no preamble:
{
  "overallHealthScore": <number 0-100>,
  "healthLabel": "Excellent|Good|Average|Needs Work|Critical",
  "quickWins": [<string>, ...],
  "contentStrategy": {
    "consistencyScore": <0-100>,
    "postingFrequencyAssessment": "<string>",
    "titlePatterns": "<analysis of their title style>",
    "thumbnailStyle": "<analysis of thumbnail patterns>",
    "hookQuality": "<assessment based on retention-to-views ratio>",
    "contentGaps": ["<gap1>", "<gap2>", "<gap3>"]
  },
  "audienceSignals": {
    "engagementRate": <percentage>,
    "engagementHealth": "High|Medium|Low",
    "likeToViewRatio": "<value>%",
    "commentSentiment": "Positive|Neutral|Mixed",
    "estimatedAudiencePersonas": [
      { "persona": "<name>", "percentage": <0-100>, "description": "<what this audience segment looks like>" }
    ]
  },
  "growthDiagnosis": {
    "currentPhase": "Launching|Growing|Plateauing|Declining|Scaling",
    "primaryBlocker": "<the single biggest thing stopping growth>",
    "secondaryBlockers": ["<blocker2>", "<blocker3>"],
    "growthOpportunities": ["<opp1>", "<opp2>", "<opp3>"]
  },
  "thumbnailAudit": {
    "score": <0-100>,
    "dominantStyle": "<description of their thumbnail style>",
    "whatWorking": "<what's working in their thumbnails>",
    "whatNeedsWork": "<what needs improvement>",
    "recommendation": "<specific actionable thumbnail advice>"
  },
  "titleAudit": {
    "score": <0-100>,
    "currentPattern": "<their title writing pattern>",
    "ctrPotential": "High|Medium|Low",
    "recommendation": "<specific title improvement advice with examples>"
  },
  "topVideoInsight": {
    "title": "<top video title>",
    "whyItWorked": "<analysis of why this video performed best>",
    "replicableElements": ["<element1>", "<element2>"]
  },
  "weeklyActionPlan": [
    { "day": "Monday", "action": "<specific task>" },
    { "day": "Wednesday", "action": "<specific task>" },
    { "day": "Friday", "action": "<specific task>" }
  ],
  "monetizationReadiness": {
    "score": <0-100>,
    "isYPPEligible": <boolean>,
    "brandDealPotential": "Low|Medium|High|Very High",
    "estimatedCPM": "<range in INR>",
    "sponsorshipRate": "<estimated rate per integration in INR>"
  }
}`
      },
      {
        role: 'user',
        content: prompt
      }
    ]
  })

  const text = completion.choices[0].message.content
  try {
    return JSON.parse(text)
  } catch {
    const match = text.match(/\{[\s\S]*\}/)
    return match ? JSON.parse(match[0]) : { error: 'Parse failed', raw: text }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MOMENTUM OS — Creator Comparison Engine
// ─────────────────────────────────────────────────────────────────────────────
exports.runMomentumAnalysis = async (channelData, benchmarks) => {
  const benchmarkSummary = benchmarks.length > 0
    ? benchmarks.map(b =>
        `- ${b.channel_name}: ${Number(b.subscriber_count).toLocaleString()} subs, ${Number(b.avg_views_per_video).toLocaleString()} avg views, ${b.niche} niche`
      ).join('\n')
    : 'No exact benchmark matches found. Use general industry knowledge for creators at this subscriber tier.'

  const completion = await openai.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `You are RachnaOS's MomentumOS engine. You compare creators with others who were at similar subscriber counts and stats, and tell them how they're doing relative to that benchmark — with specific named creators when possible (e.g., "When CarryMinati had 50K subs, his avg views were...").

Be motivating but honest. Reference real creators from India and globally.

Respond ONLY with valid JSON matching this exact structure:
{
  "momentumScore": <0-100>,
  "momentumLabel": "Rocket|Accelerating|Steady|Slowing|Stalled",
  "overallVerdict": "<2 sentence honest verdict>",
  "comparedCreators": [
    {
      "creatorName": "<real creator name>",
      "platform": "YouTube",
      "niche": "<their niche>",
      "atSimilarStageStats": {
        "subscribersAtThatTime": <number>,
        "avgViewsPerVideo": <number>,
        "postingFrequency": "<X times per week>"
      },
      "howTheyGrew": "<specific strategy they used>",
      "lessonForThisCreator": "<what this creator can learn from them>"
    }
  ],
  "performanceVsBenchmark": {
    "viewsComparison": "Above Average|Average|Below Average",
    "engagementComparison": "Above Average|Average|Below Average",
    "growthRateComparison": "Above Average|Average|Below Average",
    "summary": "<honest comparison summary>"
  },
  "growthPrediction": {
    "at6Months": { "subscribers": "<estimated range>", "condition": "<if they follow this advice>" },
    "at12Months": { "subscribers": "<estimated range>", "condition": "<if they follow this advice>" }
  },
  "momentumSignals": [
    { "signal": "positive|negative|neutral", "insight": "<specific insight>" }
  ],
  "burnoutRisk": {
    "level": "Low|Medium|High",
    "reason": "<why>",
    "advice": "<specific advice to avoid burnout>"
  },
  "weeklyFocusAreas": ["<focus1>", "<focus2>", "<focus3>"]
}`
      },
      {
        role: 'user',
        content: `Analyze this creator's MomentumOS comparison:

CREATOR STATS:
- Channel: ${channelData.channelName}
- Subscribers: ${channelData.stats.subscribers.toLocaleString()}
- Total Views: ${channelData.stats.totalViews.toLocaleString()}
- Total Videos: ${channelData.stats.totalVideos}
- Avg Views/Video: ${channelData.computed.avgViewsPerVideo.toLocaleString()}
- Like Ratio: ${channelData.computed.avgLikeRatio}%
- Posting Frequency: Every ${channelData.computed.postingFrequencyDays} days
- Topics: ${channelData.topics?.join(', ')}

BENCHMARK CREATORS AT SIMILAR STAGE:
${benchmarkSummary}

Generate the MomentumOS comparison report.`
      }
    ]
  })

  const text = completion.choices[0].message.content
  try {
    return JSON.parse(text)
  } catch {
    const match = text.match(/\{[\s\S]*\}/)
    return match ? JSON.parse(match[0]) : { error: 'Parse failed', raw: text }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function buildAudienceLabPrompt(channelData) {
  return `Analyze this YouTube channel in full detail:

CHANNEL OVERVIEW:
- Name: ${channelData.channelName}
- Handle: ${channelData.handle}
- Country: ${channelData.country}
- Created: ${new Date(channelData.createdAt).toLocaleDateString()}
- Description: ${channelData.description}
- Topics: ${channelData.topics?.join(', ')}
- Keywords: ${channelData.keywords}

STATS:
- Subscribers: ${channelData.stats.subscribers.toLocaleString()}
- Total Views: ${channelData.stats.totalViews.toLocaleString()}
- Total Videos: ${channelData.stats.totalVideos}
- Avg Views/Video: ${channelData.computed.avgViewsPerVideo.toLocaleString()}
- Avg Like Ratio: ${channelData.computed.avgLikeRatio}%
- Posting Frequency: Every ${channelData.computed.postingFrequencyDays} days

RECENT 20 VIDEOS (title | views | likes | comments | published):
${channelData.recentVideos.slice(0, 20).map(v =>
  `"${v.title}" | ${v.views.toLocaleString()} views | ${v.likes.toLocaleString()} likes | ${v.comments.toLocaleString()} comments | ${new Date(v.publishedAt).toLocaleDateString()}`
).join('\n')}

TOP VIDEO: "${channelData.computed.topVideo?.title}" with ${channelData.computed.topVideo?.views?.toLocaleString()} views

Provide the complete AudienceLab analysis JSON.`
}

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO DEEP DIVE — Single Video Analysis
// ─────────────────────────────────────────────────────────────────────────────
exports.runVideoDeepDiveAnalysis = async (video, channelAverages) => {
  const completion = await openai.chat.completions.create({
    model: 'llama3-8b-8192', // Using the extremely fast 8B model instead of 70B for instant UI response
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `You are an expert YouTube content strategist. Your goal is to analyze a single video's metadata and performance compared to the channel's average to determine WHY it performed the way it did.

Always respond with a valid JSON object exactly matching this structure:
{
  "overallVerdict": "<1-2 sentence brutal honesty about why this worked or failed>",
  "titleAnalysis": {
    "hookQuality": "Excellent|Good|Average|Poor",
    "psychologicalTriggers": ["<trigger 1>", "<trigger 2>"],
    "ctrPotential": "High|Medium|Low"
  },
  "audienceSentiment": {
    "estimatedSentiment": "Positive|Neutral|Mixed",
    "engagementBreakdown": "<explanation of comment/like ratios relative to views>"
  },
  "thumbnailPrediction": {
    "likelyDesign": "<what the thumbnail likely did based on the title>",
    "effectiveness": "<guess on how effective it was>"
  },
  "replicableElements": ["<what to repeat 1>", "<what to repeat 2>"]
}`
      },
      {
        role: 'user',
        content: `Analyze this video:

VIDEO DATA:
- Title: "${video.title}"
- Views: ${video.views?.toLocaleString()}
- Likes: ${video.likes?.toLocaleString()}
- Comments: ${video.comments?.toLocaleString()}
- Like Ratio: ${video.likeRatio}%

CHANNEL AVERAGES:
- Average Views/Video: ${channelAverages?.avgViewsPerVideo?.toLocaleString() || 'Unknown'}
- Average Like Ratio: ${channelAverages?.avgLikeRatio || 'Unknown'}%

Provide the complete Video Deep Dive JSON.`
      }
    ]
  })

  const text = completion.choices[0].message.content
  try {
    return JSON.parse(text)
  } catch {
    const match = text.match(/\{[\s\S]*\}/)
    return match ? JSON.parse(match[0]) : { error: 'Parse failed', raw: text }
  }
}

