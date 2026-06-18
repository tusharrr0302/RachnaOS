// server/index.js — RachnaOS Express Server
require('dotenv').config()

const express     = require('express')
const cors        = require('cors')
const rateLimit   = require('express-rate-limit')

const authRouter        = require('./src/features/auth/auth.router')
const audienceLabRouter = require('./src/features/audiencelab/router')

const app  = express()
const PORT = process.env.PORT || 5000

// ── Middleware ───────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    // Allow any localhost origin (any port) + no origin (curl/Postman)
    if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
      callback(null, true)
    } else if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) {
      callback(null, true)
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`))
    }
  },
  credentials: true,
}))

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
app.use('/api/auth',        authRouter)
app.use('/api/audiencelab', audienceLabRouter)

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
