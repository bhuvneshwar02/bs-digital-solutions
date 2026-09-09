import { useSite } from '../content/ContentContext'

/**
 * Per-page metadata. React 19 hoists <title>/<meta>/<link> to <head>.
 *
 * @param {string}  title        page title (site name appended unless `bare`)
 * @param {string}  description  meta description
 * @param {string}  path         canonical path, e.g. "/services"
 * @param {string}  image        absolute OG image URL
 * @param {boolean} noindex      add noindex robots tag
 */
export default function Seo({ title, description, path = '', image, noindex = false }) {
  const site = useSite()
  const brand = site.brand || {}
  const seo = site.seo || {}
  const domain = (brand.domain || 'bsinnovationsolutions.com').replace(/^https?:\/\//, '').replace(/\/$/, '')
  const origin = `https://${domain}`

  const fullTitle = title ? `${title} · ${brand.name || 'BS Innovation Solutions'}` : seo.title || brand.name
  const desc = description || seo.description || ''
  const canonical = `${origin}${path}`
  const rawImage = image || '/assets/founder-photo.png'
  const ogImage = rawImage.startsWith('http') ? rawImage : `${origin}${rawImage}`

  return (
    <>
      <title>{fullTitle}</title>
      {desc && <meta name="description" content={desc} />}
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={brand.name || 'BS Innovation Solutions'} />
      <meta property="og:title" content={fullTitle} />
      {desc && <meta property="og:description" content={desc} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {desc && <meta name="twitter:description" content={desc} />}
    </>
  )
}
