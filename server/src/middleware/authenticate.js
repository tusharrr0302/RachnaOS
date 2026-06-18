// server/src/middleware/authenticate.js
// Verifies Clerk JWT on every protected API call.
// Attaches req.user = { clerkUserId, role }

const { ClerkExpressRequireAuth, clerkClient } = require('@clerk/clerk-sdk-node')

// Verifies the Bearer token in Authorization header
const authenticate = ClerkExpressRequireAuth()

// After authenticate runs, pull the role from Clerk metadata
async function attachRole(req, res, next) {
  try {
    const { userId } = req.auth
    const user = await clerkClient.users.getUser(userId)
    req.user = {
      clerkUserId: userId,
      role: user.publicMetadata?.role || null,
    }
    next()
  } catch (err) {
    console.error('[attachRole]', err.message)
    res.status(401).json({ error: 'Unauthorized' })
  }
}

module.exports = { authenticate, attachRole }
