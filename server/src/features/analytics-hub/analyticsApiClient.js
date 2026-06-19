const axios = require("axios");

const ANALYTICS_BASE = "https://youtubeanalytics.googleapis.com/v2/reports";

async function fetchChannelDayMetrics({ accessToken, startDate, endDate }) {
  const res = await axios.get(ANALYTICS_BASE, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      ids: "channel==MINE",
      startDate, endDate,
      metrics: "views,estimatedMinutesWatched,averageViewDuration,subscribersGained,subscribersLost,likes,comments,shares",
      dimensions: "day",
      sort: "day",
    },
  });
  return res.data;
}

async function fetchVideoRetentionCurve({ accessToken, videoId, startDate, endDate }) {
  const res = await axios.get(ANALYTICS_BASE, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      ids: "channel==MINE",
      startDate, endDate,
      metrics: "audienceWatchRatio",
      dimensions: "elapsedVideoTimeRatio",
      filters: `video==${videoId}`,
    },
  });
  return res.data; // rows of [elapsedRatio, watchRatio] — this is the real Studio retention graph
}

async function fetchTrafficSources({ accessToken, videoId, startDate, endDate }) {
  const res = await axios.get(ANALYTICS_BASE, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      ids: "channel==MINE",
      startDate, endDate,
      metrics: "views",
      dimensions: "insightTrafficSourceType",
      filters: `video==${videoId}`,
      sort: "-views",
    },
  });
  return res.data;
}

module.exports = { fetchChannelDayMetrics, fetchVideoRetentionCurve, fetchTrafficSources };
