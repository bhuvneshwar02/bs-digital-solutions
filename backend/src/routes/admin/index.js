import { Router } from 'express'
import { collections } from '../registry.js'
import { crudRouter } from '../crud.js'
import usersRouter from './users.js'
import settingsRouter from './settings.js'

const router = Router()

router.use('/users', usersRouter)
router.use('/settings', settingsRouter)

for (const [key, cfg] of Object.entries(collections)) {
  router.use(
    `/${key}`,
    crudRouter(cfg.Model, cfg.schema, {
      hasSlug: cfg.hasSlug,
      slugSource: cfg.slugSource,
      adminOnly: cfg.adminOnly ?? [],
    }),
  )
}

export default router
