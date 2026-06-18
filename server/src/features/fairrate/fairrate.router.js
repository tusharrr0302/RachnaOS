// server/src/features/fairrate/fairrate.router.js
// POST /api/fairrate/calculate

const express = require('express')
const { z }   = require('zod')
const { calculateFairRate } = require('./fairrate.service')

const router = express.Router()

// ── Input schema ─────────────────────────────────────────────────────────────
const CalculateSchema = z.object({
  platform:       z.string().min(1, 'platform is required'),
  followers:      z.number().positive('followers must be a positive number'),
  engagementRate: z.number().min(0).max(100, 'engagementRate must be 0-100'),
  niche:          z.string().min(1, 'niche is required'),
  contentType:    z.string().min(1, 'contentType is required'),
  brandOffer:     z.number().positive().nullable().optional(),
})

// ── POST /api/fairrate/calculate ─────────────────────────────────────────────
router.post('/calculate', async (req, res) => {
  const parsed = CalculateSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      error:  'Invalid input',
      issues: parsed.error.flatten().fieldErrors,
    })
  }

  try {
    const result = await calculateFairRate(parsed.data)
    console.log(`[fairrate] calculated for ${parsed.data.platform}/${parsed.data.niche} — fair=₹${result.fairValue}`)
    return res.json({ success: true, result })
  } catch (err) {
    console.error('[fairrate] calculation error:', err)
    return res.status(500).json({ error: 'Calculation failed. Please try again.' })
  }
})

module.exports = router
