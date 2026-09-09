import 'dotenv/config'

function required(name, fallback) {
  const value = process.env[name] ?? fallback
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: required('MONGODB_URI', 'mongodb://127.0.0.1:27017/bs-innovation'),
  jwtSecret: required('JWT_SECRET', 'dev-only-insecure-secret-change-me'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  // Comma-separated list of allowed browser origins for CORS.
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  seedAdmin: {
    name: process.env.SEED_ADMIN_NAME || 'Bhuvneshwar Sharma',
    email: process.env.SEED_ADMIN_EMAIL || 'bhuvneshwarsharma44@gmail.com',
    password: process.env.SEED_ADMIN_PASSWORD || 'ChangeMe!2026',
  },
  // Email notifications via Resend (optional — DB storage always happens).
  resendApiKey: process.env.RESEND_API_KEY || '',
  mailFrom: process.env.MAIL_FROM || '',
  mailTo: process.env.MAIL_TO || process.env.SEED_ADMIN_EMAIL || '',
}

export const isProd = env.nodeEnv === 'production'
