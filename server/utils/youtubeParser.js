/**
 * RachnaOS — YouTube URL Parser
 * Handles all YouTube URL formats and extracts channel identifier
 */

const axios = require('axios')
const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3'
const API_KEY = process.env.YOUTUBE_API_KEY

// Extract handle or ID from any YouTube URL format
function extractChannelIdentifier(url) {
  const patterns = {
    handle:    /@([\w.-]+)/,
    channelId: /channel\/(UC[\w-]+)/,
    customUrl: /\/c\/([\w.-]+)/,
    userName:  /\/user\/([\w.-]+)/,
  }

  for (const [type, regex] of Object.entries(patterns)) {
    const match = url.match(regex)
    if (match) return { type, value: match[1] }
  }

  if (url.startsWith('@')) return { type: 'handle', value: url.slice(1) }
  return null
}

// Resolve any identifier to a channel ID
async function resolveToChannelId(identifier) {
  if (!identifier) throw new Error('Invalid YouTube URL')

  if (identifier.type === 'channelId') return identifier.value

  const searchQuery = identifier.type === 'handle'
    ? `@${identifier.value}`
    : identifier.value

  const res = await axios.get(`${YOUTUBE_API}/search`, {
    params: {
      part: 'snippet',
      q: searchQuery,
      type: 'channel',
      maxResults: 1,
      key: API_KEY,
    },
  })

  const items = res.data.items
  if (!items || items.length === 0) throw new Error('Channel not found')
  return items[0].snippet.channelId
}

// Fetch full channel profile + recent 20 videos
async function fetchChannelFullData(channelId) {
  const [channelRes, contentRes] = await Promise.all([
    axios.get(`${YOUTUBE_API}/channels`, {
      params: {
        part: 'snippet,statistics,brandingSettings,contentDetails,topicDetails',
        id: channelId,
        key: API_KEY,
      },
    }),
    axios.get(`${YOUTUBE_API}/channels`, {
      params: {
        part: 'contentDetails',
        id: channelId,
        key: API_KEY,
      },
    }),
  ])

  const channel = channelRes.data.items?.[0]
  if (!channel) throw new Error('Channel data not found')

  const uploadsPlaylistId =
    contentRes.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

  let recentVideos = []
  if (uploadsPlaylistId) {
    const playlistRes = await axios.get(`${YOUTUBE_API}/playlistItems`, {
      params: {
        part: 'snippet,contentDetails',
        playlistId: uploadsPlaylistId,
        maxResults: 20,
        key: API_KEY,
      },
    })

    const videoIds = playlistRes.data.items
      .map(item => item.contentDetails.videoId)
      .join(',')

    const videoStatsRes = await axios.get(`${YOUTUBE_API}/videos`, {
      params: {
        part: 'snippet,statistics,contentDetails',
        id: videoIds,
        key: API_KEY,
      },
    })

    recentVideos = videoStatsRes.data.items.map(v => ({
      videoId:     v.id,
      title:       v.snippet.title,
      description: v.snippet.description?.substring(0, 300),
      thumbnail:   v.snippet.thumbnails?.maxres?.url || v.snippet.thumbnails?.high?.url,
      publishedAt: v.snippet.publishedAt,
      duration:    v.contentDetails.duration,
      tags:        v.snippet.tags?.slice(0, 10) || [],
      views:       parseInt(v.statistics.viewCount || 0),
      likes:       parseInt(v.statistics.likeCount || 0),
      comments:    parseInt(v.statistics.commentCount || 0),
      likeRatio:   v.statistics.likeCount && v.statistics.viewCount
        ? ((parseInt(v.statistics.likeCount) / parseInt(v.statistics.viewCount)) * 100).toFixed(2)
        : 0,
    }))
  }

  const sortedByViews = [...recentVideos].sort((a, b) => b.views - a.views)

  return {
    channelId,
    channelName: channel.snippet.title,
    handle:      channel.snippet.customUrl || '',
    description: channel.snippet.description?.substring(0, 500),
    avatar:      channel.snippet.thumbnails?.high?.url,
    banner:      channel.brandingSettings?.image?.bannerExternalUrl,
    country:     channel.snippet.country || 'Unknown',
    createdAt:   channel.snippet.publishedAt,
    keywords:    channel.brandingSettings?.channel?.keywords || '',
    topics:      channel.topicDetails?.topicCategories?.map(t => t.split('/').pop()) || [],
    stats: {
      subscribers: parseInt(channel.statistics.subscriberCount || 0),
      totalViews:  parseInt(channel.statistics.viewCount || 0),
      totalVideos: parseInt(channel.statistics.videoCount || 0),
    },
    recentVideos,
    computed: {
      avgViewsPerVideo: recentVideos.length > 0
        ? Math.round(recentVideos.reduce((sum, v) => sum + v.views, 0) / recentVideos.length)
        : 0,
      avgLikeRatio: recentVideos.length > 0
        ? (recentVideos.reduce((sum, v) => sum + parseFloat(v.likeRatio), 0) / recentVideos.length).toFixed(2)
        : 0,
      topVideo:             sortedByViews[0] || null,
      postingFrequencyDays: computePostingFrequency(recentVideos),
    },
  }
}

function computePostingFrequency(videos) {
  if (videos.length < 2) return null
  const sorted = [...videos].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  const totalDays = (new Date(sorted[0].publishedAt) - new Date(sorted[sorted.length - 1].publishedAt)) / (1000 * 60 * 60 * 24)
  return Math.round(totalDays / videos.length)
}

module.exports = { extractChannelIdentifier, resolveToChannelId, fetchChannelFullData }
