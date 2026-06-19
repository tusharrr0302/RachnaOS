// server/src/features/audiencelab/router.js

/*
 * YOUTUBE DATA API v3 SETUP:
 * 1. Go to https://console.cloud.google.com
 * 2. Create new project → "RachnaOS"
 * 3. Enable "YouTube Data API v3" from Library
 * 4. Create Credentials → API Key
 * 5. Restrict key to: YouTube Data API v3 only
 * 6. Add key to server/.env as YOUTUBE_API_KEY
 * 7. Free tier: 10,000 units/day
 *    - channels.list = 1 unit
 *    - search.list = 100 units
 *    - playlistItems.list = 1 unit
 *    - videos.list = 1 unit
 *    Each full analysis uses ~110 units → ~90 analyses/day free
 */

const express = require('express')
const router  = express.Router()
const { analyzeChannel, getMomentumComparison, getMyAnalyses } = require('./controller')
const { authenticate } = require('../../middleware/authenticate')

// All routes require Clerk auth
router.post('/analyze',  authenticate, analyzeChannel)
router.post('/momentum', authenticate, getMomentumComparison)
router.get('/history',   authenticate, getMyAnalyses)

module.exports = router

const { getOAuthUrl, oauthCallback, getDeepVideoMetrics, analyzeVideo } = require('./controller');

router.get('/oauth/url', authenticate, getOAuthUrl);
router.get('/oauth/callback', oauthCallback); // Public callback
router.get('/deep-metrics', authenticate, getDeepVideoMetrics);
router.post('/analyze-video', authenticate, analyzeVideo);
