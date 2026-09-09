import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { ContactMessage } from '../models/index.js'
import { schemas } from '../lib/validate.js'
import { requireAuth } from '../middleware/auth.js'
import { ApiError } from '../middleware/errors.js'

const router = Router()

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'You have sent several messages recently — please email directly instead' },
})

// Public: submit an enquiry.
router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const data = schemas.contactMessage.parse(req.body)
    // Honeypot: bots fill hidden fields.
    if (req.body.company) return res.status(201).json({ ok: true })

    await ContactMessage.create({
      ...data,
      meta: { ip: req.ip, userAgent: req.get('user-agent') || '' },
    })
    res.status(201).json({ ok: true })
  } catch (err) {
    next(err)
  }
})

// Authenticated: inbox management.
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {}
    res.json(await ContactMessage.find(filter).sort({ createdAt: -1 }))
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const status = req.body.status
    if (!['new', 'read', 'archived'].includes(status)) throw new ApiError(400, 'Invalid status')
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!msg) throw new ApiError(404, 'Message not found')
    res.json(msg)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id)
    if (!msg) throw new ApiError(404, 'Message not found')
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router
