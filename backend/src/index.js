import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env.js'
import { connectDb } from './config/db.js'
import { notFound, errorHandler } from './middleware/errors.js'

import authRouter from './routes/auth.js'
import publicRouter from './routes/public.js'
import contactRouter from './routes/contact.js'
import applicationsRouter from './routes/applications.js'
import jobBoardRouter from './routes/jobBoard.js'
import adminRouter from './routes/admin/index.js'

export function createApp() {
  const app = express()

  app.set('trust proxy', 1)
  app.use(helmet())
  app.use(
    cors({
      origin(origin, cb) {
        // Allow same-origin / curl (no origin) and any configured origin.
        if (!origin || env.corsOrigins.includes(origin)) return cb(null, true)
        cb(new Error(`Origin ${origin} not allowed by CORS`))
      },
      credentials: true,
    }),
  )
  app.use(express.json({ limit: '1mb' }))

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'bs-innovation-solutions-backend', time: new Date().toISOString() })
  })

  app.use('/api/auth', authRouter)
  app.use('/api/contact', contactRouter)
  app.use('/api/applications', applicationsRouter)
  app.use('/api/job-board', jobBoardRouter)
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
