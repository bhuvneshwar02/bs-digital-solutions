import { Router } from 'express'
import bcrypt from 'bcryptjs'
import rateLimit from 'express-rate-limit'
import { User } from '../models/index.js'
import { schemas } from '../lib/validate.js'
import { signToken, requireAuth } from '../middleware/auth.js'
import { ApiError } from '../middleware/errors.js'

const router = Router()

// A pre-computed hash of a random string. Compared against when the account
// doesn't exist so login takes ~the same time either way (no user enumeration).
const DUMMY_HASH = '$2a$12$lYc8gx77/HFYDK6wM8c4yeV5yjeWIRjz6hMYphPk9JS3f674XT0m.'

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts — try again in a few minutes' },
})

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = schemas.login.parse(req.body)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash')
    const ok = await bcrypt.compare(password, user?.passwordHash || DUMMY_HASH)
    if (!user || !ok) {
      throw new ApiError(401, 'Incorrect email or password')
    }
    user.lastLoginAt = new Date()
    await user.save()
    res.json({ token: signToken(user), user: user.toJSON() })
  } catch (err) {
    next(err)
  }
})

router.get('/me', requireAuth, (req, res) => {
  res.json(req.user.toJSON())
})

router.post('/change-password', requireAuth, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = schemas.changePassword.parse(req.body)
    const user = await User.findById(req.user.id).select('+passwordHash')
    if (!(await bcrypt.compare(currentPassword, user.passwordHash))) {
      throw new ApiError(400, 'Current password is incorrect')
    }
    if (await bcrypt.compare(newPassword, user.passwordHash)) {
      throw new ApiError(400, 'New password must be different from the current one')
    }
    user.passwordHash = await bcrypt.hash(newPassword, 12)
    user.passwordChangedAt = new Date()
    await user.save()
    // Issue a fresh token so the current session isn't logged out by its own change.
    res.json({ ok: true, token: signToken(user) })
  } catch (err) {
    next(err)
  }
})

export default router
