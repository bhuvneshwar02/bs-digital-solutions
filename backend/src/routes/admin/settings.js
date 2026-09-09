import { Router } from 'express'
import { SiteSettings } from '../../models/index.js'
import { siteSettingsSchema } from '../../lib/validate.js'
import { requireAuth, requireRole } from '../../middleware/auth.js'

const router = Router()

router.use(requireAuth)

// Ensures the singleton row always exists.
async function getSettings() {
  let doc = await SiteSettings.findOne({ key: 'site' })
  if (!doc) doc = await SiteSettings.create({ key: 'site' })
  return doc
}

router.get('/', async (_req, res, next) => {
  try {
    res.json(await getSettings())
  } catch (err) {
    next(err)
  }
})

// Deep-merge the incoming partial into the singleton. Admin only.
router.put('/', requireRole('admin'), async (req, res, next) => {
  try {
    const patch = siteSettingsSchema.parse(req.body)
    const doc = await getSettings()
    for (const [key, value] of Object.entries(patch)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        doc[key] = { ...(doc[key]?.toObject?.() ?? doc[key] ?? {}), ...value }
      } else {
        doc[key] = value
      }
      doc.markModified(key)
    }
    await doc.save()
    res.json(doc)
  } catch (err) {
    next(err)
  }
})

export default router
