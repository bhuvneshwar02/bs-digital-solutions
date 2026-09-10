import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { collections } from './registry.js'
import { SiteSettings, Review, Metric } from '../models/index.js'

async function visitCount() {
  const doc = await Metric.findOne({ key: 'visits' })
  return doc?.count || 0
}

async function approvedReviews() {
  const rows = await Review.find({ status: 'approved' }).sort({ featured: -1, createdAt: -1 }).limit(60)
  const count = rows.length
  const average = count ? Math.round((rows.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10 : 0
  return {
    count,
    average,
    items: rows.map((r) => ({
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
    })),
  }
}

const router = Router()

const publishedSort = { published: true }
const sortBy = { order: 1, createdAt: 1 }

// Short cache so a burst of traffic (or a scraper) doesn't hammer the DB.
// Admin edits still show within ~30s.
function cache(res) {
  res.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=120')
}

async function settings() {
  let doc = await SiteSettings.findOne({ key: 'site' })
  if (!doc) doc = await SiteSettings.create({ key: 'site' })
  return doc
}

// --- Site visit counter -------------------------------------------------
// The frontend calls this once per browser session; the number is shown in
// the footer. Rate-limited so it can't be inflated by a script.
const visitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests' },
})

router.post('/metrics/hit', visitLimiter, async (_req, res, next) => {
  try {
    const doc = await Metric.findOneAndUpdate(
      { key: 'visits' },
      { $inc: { count: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )
    res.json({ visits: doc.count })
  } catch (err) {
    next(err)
  }
})

router.get('/metrics', async (_req, res, next) => {
  try {
    cache(res)
    res.json({ visits: await visitCount() })
  } catch (err) {
    next(err)
  }
})

router.get('/site', async (_req, res, next) => {
  try {
    cache(res)
    res.json(await settings())
  } catch (err) {
    next(err)
  }
})

// Per-collection list + slug lookup (slug only where the model has one).
for (const [key, cfg] of Object.entries(collections)) {
  router.get(`/${key}`, async (_req, res, next) => {
    try {
      cache(res)
      res.json(await cfg.Model.find(publishedSort).sort(sortBy).limit(500))
    } catch (err) {
      next(err)
    }
  })

  if (cfg.hasSlug) {
    router.get(`/${key}/:slug`, async (req, res, next) => {
      try {
        const slug = String(req.params.slug || '').slice(0, 200)
        const item = await cfg.Model.findOne({ slug, published: true })
        if (!item) return res.status(404).json({ error: 'Not found' })
        cache(res)
        res.json(item)
      } catch (err) {
        next(err)
      }
    })
  }
}

// One call that returns everything the site needs to render.
router.get('/bootstrap', async (_req, res, next) => {
  try {
    const [site, reviews, visits, ...lists] = await Promise.all([
      settings(),
      approvedReviews(),
      visitCount(),
      ...Object.values(collections).map((cfg) => cfg.Model.find(publishedSort).sort(sortBy).limit(500)),
    ])
    const keys = Object.keys(collections)
    const payload = { site, reviews, visits }
    keys.forEach((key, i) => {
      payload[key] = lists[i]
    })
    cache(res)
    res.json(payload)
  } catch (err) {
    next(err)
  }
})

export default router
