// Base URL of the API. In dev, Vite proxies /api to localhost:4000 (see vite.config.js),
// so an empty base works. In production set VITE_API_URL to the Render URL.
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

const TOKEN_KEY = 'bsis.admin.token'
const ISSUED_KEY = 'bsis.admin.token.at'

// Hard cap on an admin session: 5 minutes after sign-in the token is dropped and
// the panel falls back to the login screen, regardless of activity. The backend
// signs login tokens with the same lifetime, so this is enforced on both ends.
export const SESSION_TTL_MS = 5 * 60 * 1000

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || null
  } catch {
    return null
  }
}

export function setToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(ISSUED_KEY, String(Date.now()))
    } else {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(ISSUED_KEY)
    }
  } catch {
    /* storage unavailable — session-only */
  }
}

// Milliseconds left before the current session hits its 5-minute cap.
// 0 means "no session" or "already expired".
export function sessionRemainingMs() {
  try {
    if (!localStorage.getItem(TOKEN_KEY)) return 0
    const issued = Number(localStorage.getItem(ISSUED_KEY))
    if (!issued) return 0
    return Math.max(0, issued + SESSION_TTL_MS - Date.now())
  } catch {
    return 0
  }
}

const FIELD_LABELS = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  message: 'Message',
  text: 'Review',
  rating: 'Rating',
  state: 'State',
  city: 'City',
  role: 'Role',
  project: 'Project',
  jobTitle: 'Job title',
  location: 'Location',
  description: 'Description',
  posterName: 'Your name',
  posterEmail: 'Your email',
  posterPhone: 'Your phone',
}

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message)
    this.status = status
    this.details = details
  }

  // A readable, user-facing message — turns Zod's { field: [msg] } details into
  // "Review: Please write a little more · State: choose a valid state".
  get userMessage() {
    if (this.details && typeof this.details === 'object') {
      const parts = Object.entries(this.details)
        .flatMap(([field, msgs]) =>
          (Array.isArray(msgs) ? msgs : [msgs]).map((m) => `${FIELD_LABELS[field] || field}: ${m}`),
        )
        .filter(Boolean)
      if (parts.length) return parts.join(' · ')
    }
    return this.message
  }
}

async function request(method, path, { body, auth = false } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (auth) {
    // Session past its 5-minute cap: drop the token and fail fast rather than
    // send a request the server would reject anyway.
    if (getToken() && sessionRemainingMs() === 0) {
      setToken(null)
      throw new ApiError('Session expired — please sign in again', 401)
    }
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let res
  try {
    res = await fetch(`${API_BASE}/api${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('Network error — the server may be unreachable', 0)
  }

  const text = await res.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      if (res.ok) throw new ApiError('Unexpected response from the server', res.status)
    }
  }

  if (!res.ok) {
    // A stale/expired admin token: clear it so the UI drops back to the login screen.
    // (403 = authenticated but not permitted — keep the session.)
    if (res.status === 401 && auth) setToken(null)
    throw new ApiError(data?.error || `Request failed (${res.status})`, res.status, data?.details)
  }
  return data
}

export const api = {
  get: (path, opts) => request('GET', path, opts),
  post: (path, body, opts) => request('POST', path, { ...opts, body }),
  put: (path, body, opts) => request('PUT', path, { ...opts, body }),
  patch: (path, body, opts) => request('PATCH', path, { ...opts, body }),
  del: (path, opts) => request('DELETE', path, opts),
}
