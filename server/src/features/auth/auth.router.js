// server/src/features/auth/auth.router.js
// Handles:
//   POST /api/auth/set-role  — called from Onboarding to store role in Clerk metadata
//   GET  /api/auth/me        — returns current user's role

const express = require('express')
const { clerkClient } = require('@clerk/clerk-sdk-node')
const { authenticate, attachRole } = require('../../middleware/authenticate')

const router = express.Router()

const VALID_ROLES = ['creator', 'freelancer', 'expert', 'manager']

// ── POST /api/auth/set-role ──────────────────────────────────────────
// Body: { role: 'creator' | 'freelancer' | 'expert' | 'manager', onboarding_done: true }
// Called after OnboardingPage step 3 → writes to Clerk publicMetadata
router.post('/set-role', authenticate, async (req, res) => {
  try {
    const { userId } = req.auth
    const { role, onboarding_done } = req.body

    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}` })
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role,
        onboarding_done: Boolean(onboarding_done),
      },
    })

    console.log(`[auth] Role set: userId=${userId} role=${role}`)
    res.json({ success: true, role })

  } catch (err) {
    console.error('[auth/set-role]', err)
    res.status(500).json({ error: 'Failed to set role. Please try again.' })
  }
})

// ── GET /api/auth/me ─────────────────────────────────────────────────
// Returns current user role + clerkUserId
router.get('/me', authenticate, attachRole, (req, res) => {
  res.json({
    clerkUserId: req.user.clerkUserId,
    role:        req.user.role,
  })
})

module.exports = router
