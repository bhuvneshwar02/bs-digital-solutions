import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { User } from '../models/index.js'
import { ApiError } from './errors.js'

export function signToken(user) {
  return jwt.sign({ sub: String(user.id ?? user._id), role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  })
}

// Verifies the Bearer token and attaches req.user (a live DB document).
export async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) throw new ApiError(401, 'Authentication required')

    let payload
    try {
      payload = jwt.verify(token, env.jwtSecret)
    } catch {
      throw new ApiError(401, 'Invalid or expired session')
    }

    const user = await User.findById(payload.sub)
    if (!user) throw new ApiError(401, 'Account no longer exists')

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
