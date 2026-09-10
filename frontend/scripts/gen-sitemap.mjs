// Generates public/sitemap.xml before every build.
//
// It pulls the live content from the API so every service / project / blog
// post has its own URL in the sitemap; if the API is unreachable it falls
// back to the bundled data files (kept in sync with the database).
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://bsinnovationsolutions.com'
const API = (process.env.VITE_API_URL || 'https://bsinnovationsolutions.onrender.com').replace(/\/$/, '')

// path, priority, changefreq
const staticRoutes = [
  ['/', 1.0, 'weekly'],
  ['/about', 0.8, 'monthly'],
  ['/services', 0.9, 'weekly'],
  ['/portfolio', 0.8, 'weekly'],
  ['/pricing', 0.7, 'monthly'],
  ['/blog', 0.7, 'weekly'],
  ['/reviews', 0.7, 'weekly'],
  ['/gallery', 0.5, 'monthly'],
  ['/jobs', 0.8, 'weekly'],
  ['/contact', 0.7, 'monthly'],
  ['/start-project', 0.9, 'monthly'],
  ['/collaborate', 0.5, 'monthly'],
  ['/privacy-policy', 0.2, 'yearly'],
  ['/terms-and-conditions', 0.2, 'yearly'],
]

// Merge two lists of {slug,...} by slug; the API copy wins (it has updatedAt),
// but anything only in the bundled files is still included.
function mergeBySlug(apiList = [], localList = []) {
  const bySlug = new Map()
  for (const item of localList) if (item?.slug) bySlug.set(item.slug, item)
  for (const item of apiList) if (item?.slug) bySlug.set(item.slug, { ...bySlug.get(item.slug), ...item })
  return [...bySlug.values()]
}

async function loadContent() {
  const [{ services: ls }, { portfolio: lp }, { blog: lb }] = await Promise.all([
    import('../src/data/services.js'),
    import('../src/data/portfolio.js'),
    import('../src/data/blog.js'),
  ])
  let api = { services: [], portfolio: [], blog: [] }
  try {
    const res = await fetch(`${API}/api/bootstrap`, { signal: AbortSignal.timeout(15000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const d = await res.json()
    api = { services: d.services || [], portfolio: d.portfolio || [], blog: d.blog || [] }
    console.log('[sitemap] merging live API content with bundled data')
  } catch (err) {
    console.warn(`[sitemap] API unavailable (${err.message}) — using bundled data only`)
  }
  return {
    services: mergeBySlug(api.services, ls),
    portfolio: mergeBySlug(api.portfolio, lp),
    blog: mergeBySlug(api.blog, lb),
  }
}

const iso = (d) => (d ? new Date(d).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10))

function urlNode(path, { priority = 0.6, changefreq = 'monthly', lastmod } = {}) {
  return `  <url><loc>${ORIGIN}${path}</loc><lastmod>${iso(lastmod)}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
}

const { services, portfolio, blog } = await loadContent()

const nodes = [
  ...staticRoutes.map(([p, priority, changefreq]) => urlNode(p, { priority, changefreq })),
  ...services
    .filter((s) => s.slug && s.published !== false)
    .map((s) => urlNode(`/services/${s.slug}`, { priority: 0.8, changefreq: 'monthly', lastmod: s.updatedAt })),
  ...portfolio
    .filter((p) => p.slug && p.published !== false)
    .map((p) => urlNode(`/portfolio/${p.slug}`, { priority: 0.7, changefreq: 'monthly', lastmod: p.updatedAt })),
  ...blog
    .filter((b) => b.slug && b.published !== false)
    .map((b) => urlNode(`/blog/${b.slug}`, { priority: 0.6, changefreq: 'monthly', lastmod: b.updatedAt || b.date })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${nodes.join('\n')}
</urlset>
`

await writeFile(join(root, 'public', 'sitemap.xml'), xml)
console.log(`[sitemap] wrote ${nodes.length} URLs to public/sitemap.xml`)
