import { Router } from 'express'
import bcrypt from 'bcryptjs'
import rateLimit from 'express-rate-limit'
import { User } from '../models/index.js'
import { schemas } from '../lib/validate.js'
import { signToken, requireAuth } from '../middleware/auth.js'
import { ApiError } from '../middleware/errors.js'

const router = Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts — try again in a few minutes' },
})

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = schemas.login.parse(req.body)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash')
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
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
    user.passwordHash = await bcrypt.hash(newPassword, 12)
    await user.save()
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router
