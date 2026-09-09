import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { Review } from '../models/index.js'
import { schemas } from '../lib/validate.js'
import { requireAuth } from '../middleware/auth.js'
import { ApiError } from '../middleware/errors.js'
import { sendMail } from '../lib/mailer.js'
import { statusFilter } from '../lib/query.js'

const router = Router()
const STATUSES = ['pending', 'approved', 'rejected']

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 6,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'You have submitted a few reviews recently — please try again later' },
})

const publicShape = (r) => ({
  id: r.id,
  name: r.name,
  role: r.role,
  rating: r.rating,
  project: r.project,
  city: r.city,
  state: r.state,
  text: r.text,
  featured: r.featured,
  date: r.createdAt,
})

// Public: submit a review (goes to a moderation queue).
router.post('/', limiter, async (req, res, next) => {
  try {
    if (req.body?.website) return res.status(201).json({ ok: true }) // honeypot
    const data = schemas.reviewSubmit.parse(req.body)
    const doc = await Review.create({
      ...data,
      meta: { ip: req.ip, userAgent: req.get('user-agent') || '' },
    })
    await sendMail({
      subject: `New review — ${data.name} (${data.rating}★)`,
      text: [
        `Name: ${data.name}`,
        data.role && `Role: ${data.role}`,
        `Rating: ${data.rating}/5`,
        data.project && `Project: ${data.project}`,
        (data.city || data.state) && `Location: ${[data.city, data.state].filter(Boolean).join(', ')}`,
        '',
        data.text,
        '',
        `Approve/reject in the admin panel (id ${doc.id}).`,
      ]
        .filter(Boolean)
        .join('\n'),
    })
    res.status(201).json({ ok: true })
  } catch (err) {
    next(err)
  }
})

// Public: approved reviews + a summary for star ratings.
router.get('/', async (_req, res, next) => {
  try {
    const rows = await Review.find({ status: 'approved' })
      .sort({ featured: -1, createdAt: -1 })
      .limit(200)
    const count = rows.length
    const average = count ? Math.round((rows.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10 : 0
    res.json({ reviews: rows.map(publicShape), count, average })
  } catch (err) {
    next(err)
  }
})

/* ---- admin ---- */

router.get('/admin', requireAuth, async (req, res, next) => {
  try {
    res.json(await Review.find(statusFilter(req.query.status, STATUSES)).sort({ createdAt: -1 }).limit(500))
  } catch (err) {
    next(err)
  }
})

router.post('/admin', requireAuth, async (req, res, next) => {
  try {
    const data = schemas.review.parse(req.body)
    res.status(201).json(await Review.create(data))
  } catch (err) {
    next(err)
  }
})

router.patch('/admin/:id', requireAuth, async (req, res, next) => {
  try {
    const patch = {}
    if (req.body?.status !== undefined) {
      if (!STATUSES.includes(req.body.status)) throw new ApiError(400, 'Invalid status')
      patch.status = req.body.status
    }
    if (req.body?.featured !== undefined) patch.featured = !!req.body.featured
    if (typeof req.body?.text === 'string') patch.text = req.body.text.slice(0, 2000)
    if (typeof req.body?.city === 'string') patch.city = req.body.city.slice(0, 80)
    if (typeof req.body?.state === 'string') patch.state = req.body.state.slice(0, 80)
    const doc = await Review.findByIdAndUpdate(req.params.id, patch, { new: true })
    if (!doc) throw new ApiError(404, 'Review not found')
    res.json(doc)
  } catch (err) {
    next(err)
  }
})

router.delete('/admin/:id', requireAuth, async (req, res, next) => {
  try {
    const doc = await Review.findByIdAndDelete(req.params.id)
    if (!doc) throw new ApiError(404, 'Review not found')
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router
