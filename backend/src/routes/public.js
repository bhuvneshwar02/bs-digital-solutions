import { Router } from 'express'
import { collections } from './registry.js'
import { SiteSettings } from '../models/index.js'

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
    const [site, ...lists] = await Promise.all([
      settings(),
      ...Object.values(collections).map((cfg) => cfg.Model.find(publishedSort).sort(sortBy).limit(500)),
    ])
    const keys = Object.keys(collections)
    const payload = { site }
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
