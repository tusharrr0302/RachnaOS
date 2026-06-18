// server/src/features/freelancer/freelancer.router.js
// All /api/freelancer/* routes
// Uses authenticate middleware — falls back to rich mock data if token is mock-token

const express = require('express')
const { authenticate } = require('../../middleware/authenticate')
const router = express.Router()

// ── Mock Data ────────────────────────────────────────────────────────
const MOCK_STATS = {
  activeProjects: 4,
  inProgressTasks: 7,
  completedTasks: 23,
  totalEarnings: 124560,
  earningsChange: 12,
}

const MOCK_PROJECTS = [
  { id: '1', title: '24 Hours Surviving in Delhi',   client: 'Rohit Verma',  category: 'Video Editing',    progress: 60, dueDate: '2024-05-20', status: 'In Progress', budget: 25000 },
  { id: '2', title: 'Travel Vlog: Himachal Series',  client: 'Ankit Verma',  category: 'Color Grading',    progress: 40, dueDate: '2024-05-22', status: 'In Progress', budget: 18000 },
  { id: '3', title: 'Mini Documentary Project',      client: 'Meera Kapoor', category: 'Motion Graphics',  progress: 75, dueDate: '2024-05-27', status: 'In Progress', budget: 35000 },
  { id: '4', title: 'YouTube Thumbnails Pack',       client: 'Akash Tiwari', category: 'Thumbnail Design', progress: 30, dueDate: '2024-05-28', status: 'In Progress', budget: 8000  },
  { id: '5', title: 'Brand Intro Animation',         client: 'Priya Sharma', category: 'Motion Graphics',  progress: 100, dueDate: '2024-04-10', status: 'Completed', budget: 22000 },
  { id: '6', title: 'Podcast Editing — 12 Episodes', client: 'Rahul Nair',   category: 'Video Editing',    progress: 100, dueDate: '2024-04-02', status: 'Completed', budget: 15000 },
]

const MOCK_PROPOSALS = [
  { id: '1', title: 'YouTube Travel Vlog Series (10 Episodes)', client: 'Wanderlust India',    budgetMin: 40000, budgetMax: 60000, proposedRate: 48000, status: 'pending',  submittedOn: '2024-05-15' },
  { id: '2', title: 'Corporate Brand Film Edit',               client: 'TechVentures Pvt Ltd', budgetMin: 30000, budgetMax: 50000, proposedRate: 38000, status: 'accepted', submittedOn: '2024-05-10' },
  { id: '3', title: 'Monthly Reels Package (20 reels)',        client: 'FashionForward',       budgetMin: 15000, budgetMax: 20000, proposedRate: 17500, status: 'rejected', submittedOn: '2024-05-05' },
  { id: '4', title: 'Documentary: Startup Stories Season 2',   client: 'IndiaMakers',          budgetMin: 80000, budgetMax: 120000, proposedRate: 95000, status: 'pending', submittedOn: '2024-05-18' },
]

const MOCK_TASKS = [
  { id: '1', title: 'Rough Cut Review',       project: '24 Hours Surviving in Delhi',   priority: 'High',   dueDate: 'Today',   status: 'Pending' },
  { id: '2', title: 'Color Grading',          project: 'Travel Vlog: Himachal Series',  priority: 'High',   dueDate: '21 May',  status: 'In Progress' },
  { id: '3', title: 'Thumbnail Concepts',     project: 'Mini Documentary Project',      priority: 'Medium', dueDate: '22 May',  status: 'Pending' },
  { id: '4', title: 'Final Export & Delivery',project: '24 Hours Surviving in Delhi',   priority: 'High',   dueDate: '23 May',  status: 'Pending' },
  { id: '5', title: 'Sound Design Review',    project: 'Mini Documentary Project',      priority: 'Low',    dueDate: '25 May',  status: 'Pending' },
  { id: '6', title: 'Pack Final Thumbnails',  project: 'YouTube Thumbnails Pack',       priority: 'Medium', dueDate: '27 May',  status: 'Pending' },
]

const MOCK_EARNINGS = {
  total: 124560,
  thisMonth: 58000,
  pending: 35000,
  chartData: [
    { month: 'Jan', amount: 32000 },
    { month: 'Feb', amount: 28000 },
    { month: 'Mar', amount: 45000 },
    { month: 'Apr', amount: 58000 },
    { month: 'May', amount: 124560 },
  ],
  payouts: [
    { date: '2024-05-15', project: '24 Hours Surviving in Delhi', client: 'Rohit Verma',  amount: 25000, status: 'Paid' },
    { date: '2024-05-10', project: 'Travel Vlog: Himachal Series', client: 'Ankit Verma', amount: 18000, status: 'Paid' },
    { date: '2024-05-01', project: 'Brand Intro Animation', client: 'Priya Sharma',       amount: 22000, status: 'Paid' },
    { date: '2024-04-08', project: 'Podcast Editing',       client: 'Rahul Nair',         amount: 15000, status: 'Paid' },
    { date: '2024-04-02', project: 'Mini Documentary Project', client: 'Meera Kapoor',    amount: 35000, status: 'Pending' },
  ],
}

const MOCK_REVIEWS = [
  { id: '1', reviewer: 'Rohit Verma',  project: '24 Hours Surviving in Delhi', rating: 5.0, text: 'Amazing work! High quality edit.', date: '2024-05-15' },
  { id: '2', reviewer: 'Meera Kapoor', project: 'Mini Documentary Project',    rating: 4.8, text: 'Very professional. Color grading was perfect.', date: '2024-05-10' },
  { id: '3', reviewer: 'Priya Sharma', project: 'Brand Intro Animation',       rating: 5.0, text: 'Exceeded expectations!', date: '2024-05-01' },
  { id: '4', reviewer: 'Rahul Nair',   project: 'Podcast Editing',             rating: 4.7, text: 'Clean, crisp audio edits.', date: '2024-04-08' },
]

const MOCK_PORTFOLIO = [
  { id: '1', title: 'Travel Vlog: Leh Ladakh Series',  category: 'Video Editing',    description: 'Cinematic travel vlog with custom color grade.' },
  { id: '2', title: 'Brand Identity Animation',         category: 'Motion Graphics',  description: 'Full logo reveal and brand identity package.' },
  { id: '3', title: 'YouTube Thumbnails — Tech Channel',category: 'Thumbnail Design', description: '50+ thumbnails for a tech education channel.' },
  { id: '4', title: 'Wedding Highlight — Rajasthan',    category: 'Color Grading',   description: 'Cinematic wedding highlight with music sync.' },
]

// ── Middleware to optionally bypass auth in mock mode ─────────────────
function optionalAuth(req, res, next) {
  const header = req.headers.authorization || ''
  if (header === 'Bearer mock-token') {
    req.isMock = true
    return next()
  }
  return authenticate(req, res, next)
}

// ── Routes ────────────────────────────────────────────────────────────

// GET /api/freelancer/dashboard-stats
router.get('/dashboard-stats', optionalAuth, (req, res) => {
  res.json({ data: MOCK_STATS })
})

// GET /api/freelancer/projects
router.get('/projects', optionalAuth, (req, res) => {
  const { status } = req.query
  const data = status
    ? MOCK_PROJECTS.filter(p => p.status.toLowerCase() === status.toLowerCase())
    : MOCK_PROJECTS
  res.json({ data })
})

// GET /api/freelancer/proposals
router.get('/proposals', optionalAuth, (req, res) => {
  const { status } = req.query
  const data = status
    ? MOCK_PROPOSALS.filter(p => p.status === status)
    : MOCK_PROPOSALS
  res.json({ data })
})

// GET /api/freelancer/tasks
router.get('/tasks', optionalAuth, (req, res) => {
  const { priority } = req.query
  const data = priority
    ? MOCK_TASKS.filter(t => t.priority.toLowerCase() === priority.toLowerCase())
    : MOCK_TASKS
  res.json({ data })
})

// GET /api/freelancer/earnings
router.get('/earnings', optionalAuth, (req, res) => {
  res.json({ data: MOCK_EARNINGS })
})

// GET /api/freelancer/reviews
router.get('/reviews', optionalAuth, (req, res) => {
  res.json({ data: MOCK_REVIEWS })
})

// GET /api/freelancer/portfolio
router.get('/portfolio', optionalAuth, (req, res) => {
  res.json({ data: MOCK_PORTFOLIO })
})

// POST /api/freelancer/portfolio
router.post('/portfolio', optionalAuth, (req, res) => {
  const { title, description, category, media_url } = req.body
  if (!title || !category) {
    return res.status(400).json({ error: 'title and category are required' })
  }
  const newItem = {
    id: String(Date.now()),
    title,
    description: description || '',
    category,
    media_url: media_url || null,
    created_at: new Date().toISOString(),
  }
  MOCK_PORTFOLIO.push(newItem)
  res.status(201).json({ data: newItem })
})

module.exports = router
