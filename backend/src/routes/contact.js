import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { ContactMessage } from '../models/index.js'
import { schemas } from '../lib/validate.js'
import { requireAuth } from '../middleware/auth.js'
import { ApiError } from '../middleware/errors.js'
import { sendMail } from '../lib/mailer.js'
import { statusFilter } from '../lib/query.js'

const STATUSES = ['new', 'read', 'archived']

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
    // Honeypot: bots fill hidden fields. Return a fake success.
    if (req.body?.company) return res.status(201).json({ ok: true })
    const data = schemas.contactMessage.parse(req.body)

    await ContactMessage.create({
      ...data,
      meta: { ip: req.ip, userAgent: req.get('user-agent') || '' },
    })
    await sendMail({
      subject: `New enquiry — ${data.name}${data.type ? ` (${data.type})` : ''}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone && `Phone: ${data.phone}`,
        data.type && `Type: ${data.type}`,
        '',
        data.message,
      ]
        .filter(Boolean)
        .join('\n'),
      replyTo: data.email,
    })
    res.status(201).json({ ok: true })
  } catch (err) {
    next(err)
  }
})

// Authenticated: inbox management.
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const rows = await ContactMessage.find(statusFilter(req.query.status, STATUSES))
      .sort({ createdAt: -1 })
      .limit(500)
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const status = req.body?.status
    if (!STATUSES.includes(status)) throw new ApiError(400, 'Invalid status')
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
