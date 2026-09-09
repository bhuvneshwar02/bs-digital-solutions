// Coerce a query param to a plain string (defence in depth: even after
// express-mongo-sanitize, a `?status[x]=y` becomes an object).
export function str(value) {
  return typeof value === 'string' ? value : ''
}

// Build a `{ status }` filter only when the value is one of the allowed strings.
export function statusFilter(value, allowed) {
  const s = str(value)
  return allowed.includes(s) ? { status: s } : {}
}
