import { ZodError } from 'zod'

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message)
    this.status = status
    this.details = details
  }
}

// 404 for unmatched routes.
export function notFound(_req, res) {
  res.status(404).json({ error: 'Not found' })
}

// Central error handler — keep last in the middleware chain.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(422).json({
      error: 'Validation failed',
      details: err.flatten().fieldErrors,
    })
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message, details: err.details })
  }

  // Mongo duplicate key
  if (err?.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    return res.status(409).json({ error: `That ${field} is already in use` })
  }

  if (err?.name === 'ValidationError') {
    return res.status(422).json({ error: err.message })
  }

  if (err?.name === 'CastError') {
    return res.status(400).json({ error: 'Malformed identifier' })
  }

  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
}
