import { Router } from 'express'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { ApiError } from '../middleware/errors.js'
import { schemas } from '../lib/validate.js'
import { uniqueSlug } from '../lib/slug.js'

/**
 * Builds an authenticated CRUD router for a content collection.
 *
 * @param {import('mongoose').Model} Model
 * @param {import('zod').ZodTypeAny} schema  body validator (from schemas)
 * @param {object} [options]
 * @param {boolean} [options.hasSlug]   auto-generate a unique slug from `slugSource`
 * @param {string}  [options.slugSource] field to derive the slug from (default 'title')
 * @param {string[]} [options.adminOnly] HTTP methods restricted to role 'admin'
 */
export function crudRouter(Model, schema, options = {}) {
  const { hasSlug = false, slugSource = 'title', adminOnly = [] } = options
  const router = Router()

  router.use(requireAuth)

  const guard = (method) => (adminOnly.includes(method) ? [requireRole('admin')] : [])

  // List everything (published or not), newest ordering first by `order`.
  router.get('/', async (_req, res, next) => {
    try {
      const items = await Model.find().sort({ order: 1, createdAt: 1 }).limit(1000)
      res.json(items)
    } catch (err) {
      next(err)
    }
  })

  router.get('/:id', async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id)
      if (!item) throw new ApiError(404, 'Not found')
      res.json(item)
    } catch (err) {
      next(err)
    }
  })

  router.post('/', ...guard('POST'), async (req, res, next) => {
    try {
      const data = schema.parse(req.body)
      if (hasSlug) {
        data.slug = await uniqueSlug(Model, data.slug || data[slugSource])
      }
      if (data.order === undefined) {
        const last = await Model.findOne().sort({ order: -1 }).select('order')
        data.order = (last?.order ?? 0) + 1
      }
      const item = await Model.create(data)
      res.status(201).json(item)
    } catch (err) {
      next(err)
    }
  })

  const update = async (req, res, next) => {
    try {
      const partial = req.method === 'PATCH'
      let data = (partial ? schema.partial() : schema).parse(req.body)
      if (partial) {
        // Only touch fields the caller actually sent (zod defaults must not leak
        // into a partial update).
        const sent = new Set(Object.keys(req.body))
        data = Object.fromEntries(Object.entries(data).filter(([k]) => sent.has(k)))
      }
      const item = await Model.findById(req.params.id)
      if (!item) throw new ApiError(404, 'Not found')

      if (hasSlug && (data.slug || data[slugSource])) {
        const wanted = data.slug || data[slugSource]
        if (wanted && wanted !== item.slug) {
          data.slug = await uniqueSlug(Model, wanted, item._id)
        }
      }

      Object.assign(item, data)
      await item.save()
      res.json(item)
    } catch (err) {
      next(err)
    }
  }

  router.put('/:id', ...guard('PUT'), update)
  router.patch('/:id', ...guard('PATCH'), update)

  router.delete('/:id', ...guard('DELETE'), async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id)
      if (!item) throw new ApiError(404, 'Not found')
      res.json({ ok: true })
    } catch (err) {
      next(err)
    }
  })

  // Bulk reorder: body { ids: [...] } in the desired display order.
  router.post('/reorder', async (req, res, next) => {
    try {
      const { ids } = schemas.reorder.parse(req.body)
      await Model.bulkWrite(
        ids.map((id, index) => ({ updateOne: { filter: { _id: id }, update: { $set: { order: index } } } })),
      )
      const items = await Model.find().sort({ order: 1, createdAt: 1 }).limit(1000)
      res.json(items)
    } catch (err) {
      next(err)
    }
  })

  return router
}
