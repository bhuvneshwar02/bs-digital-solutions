import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { Application } from '../models/index.js'
import { schemas } from '../lib/validate.js'
import { requireAuth } from '../middleware/auth.js'
import { ApiError } from '../middleware/errors.js'
import { sendMail } from '../lib/mailer.js'

const router = Router()

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'You have sent several applications recently — please email directly instead' },
})

function summarise(a) {
  const lines = [
    `Kind: ${a.kind}`,
    `Name: ${a.name}`,
    `Email: ${a.email}`,
    a.phone && `Phone: ${a.phone}`,
    a.company && `Company/Org: ${a.company}`,
    a.projectType && `Project type: ${a.projectType}`,
    a.budget && `Budget: ${a.budget}`,
    a.timeline && `Timeline: ${a.timeline}`,
    a.role && `Role: ${a.role}`,
    a.skills && `Skills: ${a.skills}`,
    a.portfolioUrl && `Portfolio: ${a.portfolioUrl}`,
    a.availability && `Availability: ${a.availability}`,
    a.jobTitle && `Applying for: ${a.jobTitle}`,
    '',
    a.message,
  ].filter(Boolean)
  return lines.join('\n')
}

// Public: submit a project brief or a collaborator application.
router.post('/', limiter, async (req, res, next) => {
  try {
    if (req.body.company_website) return res.status(201).json({ ok: true }) // honeypot
    const data = schemas.application.parse(req.body)
    const doc = await Application.create({
      ...data,
      meta: { ip: req.ip, userAgent: req.get('user-agent') || '' },
    })
    const label =
      { project: 'New project brief', collaborator: 'New collaborator application', job: 'New job application' }[
        data.kind
      ] || 'New application'
    await sendMail({
      subject: `${label} — ${data.name}`,
      text: summarise(doc),
      replyTo: data.email,
    })
    res.status(201).json({ ok: true })
  } catch (err) {
    next(err)
  }
})

// Authenticated: manage applications.
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const filter = {}
    if (req.query.kind) filter.kind = req.query.kind
    if (req.query.status) filter.status = req.query.status
    res.json(await Application.find(filter).sort({ createdAt: -1 }))
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const status = req.body.status
    if (!['new', 'read', 'archived'].includes(status)) throw new ApiError(400, 'Invalid status')
    const doc = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!doc) throw new ApiError(404, 'Application not found')
    res.json(doc)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const doc = await Application.findByIdAndDelete(req.params.id)
    if (!doc) throw new ApiError(404, 'Application not found')
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router
