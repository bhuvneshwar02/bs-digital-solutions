import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { JobPost } from '../models/index.js'
import { schemas } from '../lib/validate.js'
import { requireAuth } from '../middleware/auth.js'
import { ApiError } from '../middleware/errors.js'
import { sendMail } from '../lib/mailer.js'
import { statusFilter } from '../lib/query.js'

const STATUSES = ['pending', 'approved', 'rejected']

const router = Router()

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 6,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'You have posted several jobs recently — please try again later' },
})

// Public: submit a job posting (goes to a moderation queue).
router.post('/', limiter, async (req, res, next) => {
  try {
    if (req.body?.website) return res.status(201).json({ ok: true }) // honeypot
    const data = schemas.jobPost.parse(req.body)
    const doc = await JobPost.create({
      ...data,
      meta: { ip: req.ip, userAgent: req.get('user-agent') || '' },
    })
    await sendMail({
      subject: `Job board submission — ${data.jobTitle} (${data.location})`,
      text: [
        `Title: ${data.jobTitle}`,
        data.company && `Company: ${data.company}`,
        `Location: ${data.location} (${data.workMode})`,
        data.budget && `Budget: ${data.budget}`,
        `Posted by: ${data.posterName} <${data.posterEmail}>${data.posterPhone ? ` / ${data.posterPhone}` : ''}`,
        '',
        data.description,
        '',
        `Approve/reject in the admin panel (id ${doc.id}).`,
      ]
        .filter(Boolean)
        .join('\n'),
      replyTo: data.posterEmail,
    })
    res.status(201).json({ ok: true })
  } catch (err) {
    next(err)
  }
})

// Public: approved postings only.
router.get('/', async (_req, res, next) => {
  try {
    const rows = await JobPost.find({ status: 'approved' }).sort({ updatedAt: -1 }).limit(60)
    // Hide the poster's contact details from the public list.
    res.json(
      rows.map((r) => ({
        id: r.id,
        jobTitle: r.jobTitle,
        company: r.company,
        location: r.location,
        workMode: r.workMode,
        budget: r.budget,
        description: r.description,
        postedAt: r.updatedAt,
        posterEmail: r.posterEmail,
      })),
    )
  } catch (err) {
    next(err)
  }
})

// Admin: moderation.
router.get('/admin', requireAuth, async (req, res, next) => {
  try {
    res.json(await JobPost.find(statusFilter(req.query.status, STATUSES)).sort({ createdAt: -1 }).limit(500))
  } catch (err) {
    next(err)
  }
})

router.patch('/admin/:id', requireAuth, async (req, res, next) => {
  try {
    const status = req.body?.status
    if (!STATUSES.includes(status)) throw new ApiError(400, 'Invalid status')
    const doc = await JobPost.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!doc) throw new ApiError(404, 'Not found')
    res.json(doc)
  } catch (err) {
    next(err)
  }
})

router.delete('/admin/:id', requireAuth, async (req, res, next) => {
  try {
    const doc = await JobPost.findByIdAndDelete(req.params.id)
    if (!doc) throw new ApiError(404, 'Not found')
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router
