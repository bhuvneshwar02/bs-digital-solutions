import 'dotenv/config'

const nodeEnv = process.env.NODE_ENV || 'development'
export const isProd = nodeEnv === 'production'

const DEV_JWT_FALLBACK = 'dev-only-insecure-secret-change-me'
const DEFAULT_SEED_PASSWORD = 'ChangeMe!2026'

function required(name, fallback) {
  const value = process.env[name] ?? fallback
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

const jwtSecret = required('JWT_SECRET', DEV_JWT_FALLBACK)
const seedPassword = process.env.SEED_ADMIN_PASSWORD || DEFAULT_SEED_PASSWORD

// Fail fast in production on weak / default secrets — a common way sites get owned.
if (isProd) {
  const problems = []
  if (!process.env.JWT_SECRET || jwtSecret === DEV_JWT_FALLBACK) {
    problems.push('JWT_SECRET is not set (or still the dev default)')
  } else if (jwtSecret.length < 32) {
    problems.push('JWT_SECRET is shorter than 32 characters')
  }
  if (!process.env.MONGODB_URI) problems.push('MONGODB_URI is not set')
  if (!process.env.CORS_ORIGIN) problems.push('CORS_ORIGIN is not set')
  if (problems.length) {
    throw new Error(`Refusing to start in production:\n  - ${problems.join('\n  - ')}`)
  }
  if (seedPassword === DEFAULT_SEED_PASSWORD) {
    console.warn('[security] SEED_ADMIN_PASSWORD is the documented default — change it and re-seed.')
  }
}

export const env = {
  nodeEnv,
  port: Number(process.env.PORT || 4000),
  mongoUri: required('MONGODB_URI', 'mongodb://127.0.0.1:27017/bs-innovation'),
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  // Comma-separated list of allowed browser origins for CORS.
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  seedAdmin: {
    name: process.env.SEED_ADMIN_NAME || 'Bhuvneshwar Sharma',
    email: process.env.SEED_ADMIN_EMAIL || 'bhuvneshwarsharma44@gmail.com',
    password: seedPassword,
  },
  // Email notifications via Resend (optional — DB storage always happens).
  resendApiKey: process.env.RESEND_API_KEY || '',
  mailFrom: process.env.MAIL_FROM || '',
  mailTo: process.env.MAIL_TO || process.env.SEED_ADMIN_EMAIL || '',
}
