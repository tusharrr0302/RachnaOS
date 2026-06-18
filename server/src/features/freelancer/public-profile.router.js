// server/src/features/freelancer/public-profile.router.js
// Routes: GET /api/freelancer/public-profile/:username
//          PUT /api/freelancer/public-profile
//          GET /api/freelancer/profile-presets

const express = require('express')
const { authenticate } = require('../../middleware/authenticate')
const router = express.Router()

// ── Cover Preset Definitions ─────────────────────────────────────────
const PROFILE_PRESETS = [
  { key: 'indigo', label: 'Indigo',  gradient: 'linear-gradient(135deg, #4540C8 0%, #9B7FD8 100%)' },
  { key: 'violet', label: 'Violet',  gradient: 'linear-gradient(135deg, #7C3AED 0%, #C4B5FD 100%)' },
  { key: 'dark',   label: 'Dark',    gradient: 'linear-gradient(135deg, #0F0E24 0%, #4540C8 100%)' },
  { key: 'warm',   label: 'Warm',    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)' },
  { key: 'cool',   label: 'Cool',    gradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)' },
  { key: 'earthy', label: 'Earthy',  gradient: 'linear-gradient(135deg, #1D9E75 0%, #34D399 100%)' },
]

// ── In-memory store (replace with Supabase when connected) ──────────
const MOCK_PROFILES = {
  'aditya-singh': {
    username: 'aditya-singh',
    freelancer_id: 'mock-id',
    name: 'Aditya Singh',
    role_title: 'Video Editor & Motion Designer',
    location: 'Delhi, India',
    languages: ['Hindi', 'English'],
    is_available: true,
    bio: 'I help YouTube creators and brands tell better stories through sharp editing, cinematic color grades, and punchy motion graphics.',
    specializations: ['Long-form Editing', 'Color Grading', 'Reels', 'Motion Graphics', 'YouTube Thumbnails'],
    tools: [
      { name: 'Premiere Pro',    icon: '🎬' },
      { name: 'After Effects',   icon: '✨' },
      { name: 'DaVinci Resolve', icon: '🎨' },
      { name: 'Figma',           icon: '🖊️' },
      { name: 'Canva',           icon: '🖼️' },
    ],
    services: [
      { id: '1', name: 'YouTube Video Edit', description: 'Full edit for YouTube videos up to 20 min.', price_from: 8000, delivery_days: 5, tags: ['Video Editing', 'Color Grade'] },
      { id: '2', name: 'Reels Package (10×)', description: 'Short-form content for Instagram/YouTube Shorts.', price_from: 12000, delivery_days: 7, tags: ['Reels', 'Shorts'] },
      { id: '3', name: 'Motion Graphics Pack', description: 'Custom animated intros, lower-thirds, transitions.', price_from: 15000, delivery_days: 10, tags: ['Motion Graphics', 'After Effects'] },
    ],
    skills: [
      { category: 'Editing', items: [{ name: 'Video Editing', level: 'Expert' }, { name: 'Color Grading', level: 'Expert' }] },
      { category: 'Design',  items: [{ name: 'Motion Graphics', level: 'Expert' }, { name: 'Thumbnail Design', level: 'Intermediate' }] },
    ],
    work_style_tags: ['Fast Turnaround ⚡', 'Open to Feedback 🙌', 'Deadline Crusher 🎯'],
    working_with_me: "You send me the footage and a rough idea. I come back with something that hits different.",
    availability_days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    preferred_duration: 'both',
    rate_min: 8000,
    rate_max: 50000,
    social_links: {
      youtube: 'https://youtube.com/@aditya-edits',
      instagram: 'https://instagram.com/aditya.edits',
      linkedin: 'https://linkedin.com/in/aditya-singh-edit',
      behance: 'https://behance.net/adityasingh',
    },
    cover_preset: 'indigo',
    cover_image_url: null,
    stats: {
      projects_completed: 23,
      total_earnings: '₹1.2L+',
      avg_rating: 4.9,
      response_time: '< 2 hrs',
      repeat_clients: 68,
    },
    updated_at: new Date().toISOString(),
  },
}

// ── middleware: optionalAuth ─────────────────────────────────────────
function optionalAuth(req, res, next) {
  const header = req.headers.authorization || ''
  if (header === 'Bearer mock-token') {
    req.isMock = true
    return next()
  }
  return authenticate(req, res, next)
}

// ─────────────────────────────────────────────────────────────────────
// GET /api/freelancer/profile-presets
// Public — no auth required
// ─────────────────────────────────────────────────────────────────────
router.get('/profile-presets', (req, res) => {
  res.json({ data: PROFILE_PRESETS })
})

// ─────────────────────────────────────────────────────────────────────
// GET /api/freelancer/public-profile/:username
// Public — used by creators browsing the marketplace
// ─────────────────────────────────────────────────────────────────────
router.get('/public-profile/:username', (req, res) => {
  const { username } = req.params
  const profile = MOCK_PROFILES[username]

  if (!profile) {
    return res.status(404).json({ error: `No freelancer found with username "${username}"` })
  }

  // When Supabase is connected:
  // const { data, error } = await supabase
  //   .from('freelancer_public_profiles')
  //   .select('*, profiles!inner(full_name)')
  //   .eq('username', username)
  //   .single()

  res.json({ data: profile })
})

// ─────────────────────────────────────────────────────────────────────
// PUT /api/freelancer/public-profile
// Auth required — freelancer saves their own profile
// ─────────────────────────────────────────────────────────────────────
router.put('/public-profile', optionalAuth, (req, res) => {
  const body = req.body

  // Validate required fields
  if (!body.username || typeof body.username !== 'string') {
    return res.status(400).json({ error: 'username is required' })
  }

  const username = body.username.toLowerCase().replace(/[^a-z0-9-]/g, '-')

  // Build update object
  const updated = {
    username,
    name:              body.name              || '',
    role_title:        body.role_title        || body.roleTitle || '',
    location:          body.location          || '',
    languages:         body.languages         || [],
    is_available:      body.is_available      ?? body.isAvailable ?? true,
    bio:               body.bio               || '',
    specializations:   body.specializations   || [],
    tools:             body.tools             || [],
    services:          body.services          || [],
    skills:            body.skills            || [],
    work_style_tags:   body.work_style_tags   || body.workStyleTags || [],
    working_with_me:   body.working_with_me   || body.workingWithMe || '',
    availability_days: body.availability_days || body.availabilityDays || [],
    preferred_duration:body.preferred_duration|| body.preferredDuration || 'both',
    rate_min:          parseInt(body.rate_min || body.rateMin || 0),
    rate_max:          parseInt(body.rate_max || body.rateMax || 0),
    social_links:      body.social_links      || body.socialLinks || {},
    cover_preset:      body.cover_preset      || body.coverPreset || 'indigo',
    cover_image_url:   body.cover_image_url   || body.coverImageUrl || null,
    updated_at:        new Date().toISOString(),
  }

  // Persist in mock store (Supabase upsert when connected)
  MOCK_PROFILES[username] = {
    ...(MOCK_PROFILES[username] || {}),
    ...updated,
    freelancer_id: req.userId || 'mock-id',
  }

  // When Supabase is connected:
  // const { data, error } = await supabase
  //   .from('freelancer_public_profiles')
  //   .upsert({ freelancer_id: req.userId, ...updated }, { onConflict: 'freelancer_id' })
  //   .select()
  //   .single()

  res.json({ data: MOCK_PROFILES[username], message: 'Profile saved successfully' })
})

module.exports = router
