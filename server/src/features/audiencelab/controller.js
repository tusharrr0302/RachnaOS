// server/src/features/audiencelab/controller.js

const { extractChannelIdentifier, resolveToChannelId, fetchChannelFullData } = require('../../../utils/youtubeParser')
const { runAudienceLabAnalysis, runMomentumAnalysis } = require('./service')
const { supabase } = require('../../../lib/supabase')

exports.analyzeChannel = async (req, res) => {
  try {
    const { youtubeUrl } = req.body
    if (!youtubeUrl) return res.status(400).json({ error: 'YouTube URL is required' })

    // Parse URL
    const identifier = extractChannelIdentifier(youtubeUrl)
    if (!identifier) return res.status(400).json({ error: 'Invalid YouTube URL format' })

    // Resolve to channel ID
    const channelId = await resolveToChannelId(identifier)

    // Check cache (1hr) — avoid burning YouTube quota
    const { data: cached } = await supabase
      .from('channel_cache')
      .select('*')
      .eq('channel_id', channelId)
      .gte('cached_at', new Date(Date.now() - 3600000).toISOString())
      .single()

    let channelData
    if (cached) {
      console.log(`[audiencelab] Cache hit: ${channelId}`)
      channelData = cached.data
    } else {
      channelData = await fetchChannelFullData(channelId)
      await supabase.from('channel_cache').upsert({
        channel_id: channelId,
        data: channelData,
        cached_at: new Date().toISOString(),
      }, { onConflict: 'channel_id' })
    }

    // Run Claude analysis
    const analysis = await runAudienceLabAnalysis(channelData)

    // Save analysis to DB
    const userId = req.auth?.userId
    if (userId) {
      await supabase.from('audiencelab_analyses').insert({
        user_id:      userId,
        channel_id:   channelId,
        channel_name: channelData.channelName,
        channel_data: channelData,
        analysis,
      })
    }

    res.json({ success: true, channelData, analysis })
  } catch (err) {
    console.error('[analyzeChannel]', err.message)
    res.status(500).json({ error: err.message })
  }
}

exports.getMomentumComparison = async (req, res) => {
  try {
    const { channelData } = req.body
    if (!channelData) return res.status(400).json({ error: 'channelData is required' })

    const subscriberCount = channelData.stats.subscribers
    const lowerBound = subscriberCount * 0.5
    const upperBound = subscriberCount * 2.0

    const { data: benchmarks } = await supabase
      .from('creator_benchmarks')
      .select('*')
      .gte('subscriber_count', lowerBound)
      .lte('subscriber_count', upperBound)
      .limit(10)

    const momentumReport = await runMomentumAnalysis(channelData, benchmarks || [])

    // Update saved analysis with momentum report
    const userId = req.auth?.userId
    if (userId) {
      await supabase.from('audiencelab_analyses')
        .update({ momentum_report: momentumReport })
        .eq('user_id', userId)
        .eq('channel_id', channelData.channelId)
        .order('created_at', { ascending: false })
        .limit(1)
    }

    res.json({ success: true, momentumReport })
  } catch (err) {
    console.error('[getMomentumComparison]', err.message)
    res.status(500).json({ error: err.message })
  }
}

exports.getMyAnalyses = async (req, res) => {
  try {
    const userId = req.auth?.userId
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const { data, error } = await supabase
      .from('audiencelab_analyses')
      .select('id, channel_name, channel_id, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error
    res.json({ success: true, analyses: data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
