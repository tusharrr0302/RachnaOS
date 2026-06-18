// server/src/features/marketplace/marketplace.router.js
// All /api/marketplace/* routes

const express = require('express')
const router = express.Router()

const MOCK_OPPORTUNITIES = [
  {
    id: '1',
    title: 'Editing for Travel Series (5 Episodes)',
    category: 'Video Editing',
    tags: ['Video Editing', 'Travel'],
    budgetMin: 15000,
    budgetMax: 25000,
    experience: 'Intermediate',
    clientName: 'Ravi Productions',
    description: 'Looking for an experienced video editor for a 5-episode travel series with color grading.',
    postedAgo: '2 hours ago',
    active: true,
  },
  {
    id: '2',
    title: 'Social Media Reels Editor',
    category: 'Video Editing',
    tags: ['Video Editing', 'Reels'],
    budgetMin: 8000,
    budgetMax: 12000,
    experience: 'Beginner',
    clientName: 'DigitalBrand Co.',
    description: 'Need a fast editor for Instagram Reels. 3–5 videos per week.',
    postedAgo: '5 hours ago',
    active: true,
  },
  {
    id: '3',
    title: 'Thumbnail Designer for YouTube Channel',
    category: 'Thumbnail Design',
    tags: ['Thumbnail', 'YouTube'],
    budgetMin: 2000,
    budgetMax: 4000,
    experience: 'Beginner',
    clientName: 'Tech Talks India',
    description: 'Consistent thumbnail style needed for a tech education YouTube channel.',
    postedAgo: '1 day ago',
    active: true,
  },
  {
    id: '4',
    title: 'Motion Graphics for Product Launch',
    category: 'Motion Graphics',
    tags: ['Motion Graphics', 'After Effects'],
    budgetMin: 30000,
    budgetMax: 50000,
    experience: 'Expert',
    clientName: 'StartupWave',
    description: 'High-quality motion graphics for a D2C brand product launch campaign.',
    postedAgo: '2 days ago',
    active: true,
  },
  {
    id: '5',
    title: 'Color Grade Wedding Highlight Reel',
    category: 'Color Grading',
    tags: ['Color Grading', 'Wedding'],
    budgetMin: 12000,
    budgetMax: 18000,
    experience: 'Intermediate',
    clientName: 'Memories Studio',
    description: 'Professional color grading for a wedding highlight reel. LUTs and cinematic look preferred.',
    postedAgo: '3 days ago',
    active: true,
  },
]

const MOCK_PROPOSALS = []

// ── Routes ─────────────────────────────────────────────────────────────

// GET /api/marketplace/opportunities?skill=&budget_min=&budget_max=&experience=
router.get('/opportunities', (req, res) => {
  const { skill, budget_min, budget_max, experience } = req.query
  let data = MOCK_OPPORTUNITIES.filter(o => o.active)

  if (skill)       data = data.filter(o => o.category.toLowerCase().includes(skill.toLowerCase()))
  if (experience)  data = data.filter(o => o.experience.toLowerCase() === experience.toLowerCase())
  if (budget_min)  data = data.filter(o => o.budgetMax >= parseInt(budget_min))
  if (budget_max)  data = data.filter(o => o.budgetMin <= parseInt(budget_max))

  res.json({ data, total: data.length })
})

// POST /api/marketplace/proposals
router.post('/proposals', (req, res) => {
  const { opportunity_id, cover_letter, proposed_rate } = req.body
  if (!opportunity_id || !cover_letter || !proposed_rate) {
    return res.status(400).json({ error: 'opportunity_id, cover_letter, and proposed_rate are required' })
  }
  const proposal = {
    id: String(Date.now()),
    opportunity_id,
    cover_letter,
    proposed_rate: parseFloat(proposed_rate),
    status: 'pending',
    created_at: new Date().toISOString(),
  }
  MOCK_PROPOSALS.push(proposal)
  res.status(201).json({ data: proposal })
})

module.exports = router
