import { Router } from 'express'
import bcrypt from 'bcryptjs'
import rateLimit from 'express-rate-limit'
import { User } from '../models/index.js'
import { schemas } from '../lib/validate.js'
import { signToken, requireAuth, ADMIN_SESSION_TTL } from '../middleware/auth.js'
import { ApiError } from '../middleware/errors.js'
import { sendMail } from '../lib/mailer.js'

const router = Router()

// A pre-computed hash of a random string. Compared against when the account
// doesn't exist so login takes ~the same time either way (no user enumeration).
const DUMMY_HASH = '$2a$12$lYc8gx77/HFYDK6wM8c4yeV5yjeWIRjz6hMYphPk9JS3f674XT0m.'

// After this many consecutive failed attempts the account locks for LOCK_MS.
const MAX_LOGIN_ATTEMPTS = 3
const LOCK_MS = 24 * 60 * 60 * 1000

// A coarse network-level cap on top of the per-account lock, so an attacker
// can't grind many different emails from one host.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts — try again in a few minutes' },
})

function minutesUntil(date) {
  return Math.max(1, Math.ceil((date.getTime() - Date.now()) / 60000))
}

async function notifyLock(user, req, lockedUntil) {
  const when = new Date().toISOString()
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown'
  const ua = req.headers['user-agent'] || 'unknown'
  await sendMail({
    subject: `⚠️ Admin account locked after ${MAX_LOGIN_ATTEMPTS} failed logins — BS Innovation Solutions`,
    text: [
      `The admin account "${user.email}" has been locked for 24 hours after ${MAX_LOGIN_ATTEMPTS} failed login attempts.`,
      ``,
      `Time:        ${when}`,
      `IP address:  ${ip}`,
      `User agent:  ${ua}`,
      `Locked until: ${lockedUntil.toISOString()}`,
      ``,
      `If this was you, wait until the lock expires or reset the account from the database.`,
      `If it was not you, the password is still safe — but consider changing it once the lock lifts.`,
    ].join('\n'),
  })
}

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = schemas.login.parse(req.body)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash')

    // Always run a bcrypt compare so timing doesn't reveal whether the account
    // exists or is locked.
    const passwordOk = await bcrypt.compare(password, user?.passwordHash || DUMMY_HASH)

    // Account currently locked → refuse without touching the counter.
    if (user?.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
      throw new ApiError(
        429,
        `Account locked after ${MAX_LOGIN_ATTEMPTS} failed attempts. Try again in about ${minutesUntil(
          user.lockedUntil,
        )} minute(s).`,
      )
    }

    if (!user || !passwordOk) {
      if (user) {
        user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1
        if (user.failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
          const lockedUntil = new Date(Date.now() + LOCK_MS)
          user.lockedUntil = lockedUntil
          user.failedLoginAttempts = 0
          user.lockNotifiedAt = new Date()
          await user.save()
          // Fire-and-forget: a mail failure must not change the API response.
          notifyLock(user, req, lockedUntil).catch((e) => console.error('[auth] lock mail failed:', e.message))
          throw new ApiError(
            429,
            `Too many failed attempts — this account is now locked for 24 hours. The account owner has been notified by email.`,
          )
        }
        await user.save()
      }
      throw new ApiError(401, 'Incorrect email or password')
    }

    // Success — clear any failure state.
    user.failedLoginAttempts = 0
    user.lockedUntil = undefined
    user.lockNotifiedAt = undefined
    user.lastLoginAt = new Date()
    await user.save()
    res.json({ token: signToken(user, { expiresIn: ADMIN_SESSION_TTL }), user: user.toJSON() })
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
    res.json({ ok: true, token: signToken(user, { expiresIn: ADMIN_SESSION_TTL }) })
  } catch (err) {
    next(err)
  }
})

export default router
