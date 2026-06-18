// server/src/middleware/authorize.js
// Usage: router.get('/secret', authenticate, attachRole, authorize(['creator']), handler)

function authorize(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(403).json({ error: 'No role assigned. Complete onboarding first.' })
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access denied. Required: ${allowedRoles.join(' or ')}. Your role: ${req.user.role}`,
      })
    }
    next()
  }
}

module.exports = { authorize }
