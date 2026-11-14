import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { User } from '../models/index.js'
import { ApiError } from './errors.js'

const ISSUER = 'bs-innovation-solutions'

// Admin sessions are capped at 5 minutes: the signed token stops verifying then,
// so a token lifted from a browser is useless shortly after it was issued. The
// admin panel enforces the same window client-side.
export const ADMIN_SESSION_TTL = '5m'

const pwStamp = (user) => (user.passwordChangedAt ? user.passwordChangedAt.getTime() : 0)

export function signToken(user, { expiresIn = env.jwtExpiresIn } = {}) {
  return jwt.sign({ role: user.role, pca: pwStamp(user) }, env.jwtSecret, {
    subject: String(user.id ?? user._id),
    expiresIn,
    issuer: ISSUER,
    audience: ISSUER,
  })
}

// Verifies the Bearer token and attaches req.user (a live DB document).
export async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7).trim() : null
    if (!token) throw new ApiError(401, 'Authentication required')

    let payload
    try {
      payload = jwt.verify(token, env.jwtSecret, { issuer: ISSUER, audience: ISSUER })
    } catch {
      throw new ApiError(401, 'Invalid or expired session')
    }

    const user = await User.findById(payload.sub)
    if (!user) throw new ApiError(401, 'Account no longer exists')

    // A password change re-stamps the user; tokens carrying the old stamp die.
    if ((payload.pca || 0) !== pwStamp(user)) {
      throw new ApiError(401, 'Session expired — please sign in again')
    }

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

// Route guard: requires one of the given roles. Use after requireAuth.
export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user) return next(new ApiError(401, 'Authentication required'))
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'You do not have permission to do that'))
    }
    next()
  }
}
