// server/index.js — RachnaOS Express Server
require('dotenv').config()

const express     = require('express')
const cors        = require('cors')
const rateLimit   = require('express-rate-limit')

const authRouter             = require('./src/features/auth/auth.router')
const analyticsHubRouter     = require('./src/features/analytics-hub/router')
const audienceLabRouter      = require('./src/features/audiencelab/router')
const freelancerRouter       = require('./src/features/freelancer/freelancer.router')
const publicProfileRouter    = require('./src/features/freelancer/public-profile.router')
const marketplaceRouter      = require('./src/features/marketplace/marketplace.router')

const app  = express()
const PORT = process.env.PORT || 5000

// ── Middleware ───────────────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Rate limit — 100 requests per 15 min per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please slow down.' },
}))

// ── Health check ─────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' }))

// ── Routes ───────────────────────────────────────────────────────────
console.log('Mounting routers...');
console.log('audienceLabRouter typeof:', typeof audienceLabRouter);
console.log('audienceLabRouter stack size:', audienceLabRouter && audienceLabRouter.stack ? audienceLabRouter.stack.length : 'none');

app.use('/api/auth',          authRouter)
app.use('/api/analytics-hub', analyticsHubRouter)
app.use('/api/audiencelab',   audienceLabRouter)
app.use('/api/freelancer',    freelancerRouter)
app.use('/api/freelancer',    publicProfileRouter)
app.use('/api/marketplace',   marketplaceRouter)

// Example of a protected, role-gated route:
// const { authenticate, attachRole } = require('./src/middleware/authenticate')
// const { authorize } = require('./src/middleware/authorize')
// app.get('/api/creator/data',
//   authenticate, attachRole, authorize(['creator']),
//   (req, res) => res.json({ message: 'creator only data' })
// )

// ── 404 handler ──────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` })
})

// ── Error handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[server error]', err)
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' })
})

// ── Start ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ RachnaOS server running on http://localhost:${PORT}`)
  console.log(`   Clerk key loaded: ${process.env.CLERK_SECRET_KEY ? '✓' : '✗ (MISSING!)'}`)
})
