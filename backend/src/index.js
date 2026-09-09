import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import { env, isProd } from './config/env.js'
import { connectDb } from './config/db.js'
import { notFound, errorHandler } from './middleware/errors.js'

import authRouter from './routes/auth.js'
import publicRouter from './routes/public.js'
import contactRouter from './routes/contact.js'
import applicationsRouter from './routes/applications.js'
import jobBoardRouter from './routes/jobBoard.js'
import reviewsRouter from './routes/reviews.js'
import adminRouter from './routes/admin/index.js'

// Baseline limiter for the whole API (per IP). Tighter limiters sit on the
// sensitive routes (login, contact, applications, job-board).
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 400,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests — please slow down' },
})

export function createApp() {
  const app = express()

  app.set('trust proxy', 1)
  app.disable('x-powered-by')

  app.use(
    helmet({
      // This is a JSON API, not an HTML host — lock the browser-facing bits down.
      contentSecurityPolicy: { directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] } },
      crossOriginResourcePolicy: { policy: 'same-site' },
      referrerPolicy: { policy: 'no-referrer' },
      hsts: isProd ? { maxAge: 15552000, includeSubDomains: true } : false,
    }),
  )

  app.use(
    cors({
      origin(origin, cb) {
        // Allow same-origin / server-to-server (no Origin header) and any
        // explicitly configured browser origin. Everything else is rejected.
        if (!origin || env.corsOrigins.includes(origin)) return cb(null, true)
        cb(null, false)
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      maxAge: 86400,
    }),
  )

  app.use(express.json({ limit: '512kb' }))
  app.use(mongoSanitize()) // strips $ and . from keys → blocks operator injection
  app.use(hpp()) // collapses duplicated query params to a single value

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'bs-innovation-solutions-backend', time: new Date().toISOString() })
  })

  app.use('/api', globalLimiter)

  app.use('/api/auth', authRouter)
  app.use('/api/contact', contactRouter)
  app.use('/api/applications', applicationsRouter)
  app.use('/api/job-board', jobBoardRouter)
  app.use('/api/reviews', reviewsRouter)
  app.use('/api/admin', adminRouter)
  app.use('/api', publicRouter)

  app.use(notFound)
  app.use(errorHandler)

  return app
}

async function start() {
  await connectDb()
  const app = createApp()
  app.listen(env.port, () => {
    console.log(`Backend listening on http://localhost:${env.port} (${env.nodeEnv})`)
  })
}

// Only auto-start when run directly (not when imported by tests/seed).
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('index.js')) {
  start().catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })
}
