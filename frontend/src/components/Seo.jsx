import { useSite } from '../content/ContentContext'
import { jsonLd } from '../lib/jsonld'

/**
 * Per-page metadata. React 19 hoists <title>/<meta>/<link> to <head>.
 *
 * @param {string}   title        page title (site name appended)
 * @param {string}   description  meta description
 * @param {string}   path         canonical path, e.g. "/services"
 * @param {string}   image        OG image URL (absolute or site-relative)
 * @param {boolean}  noindex      add noindex robots tag
 * @param {'website'|'article'} type  Open Graph type
 * @param {Array<{name:string,path:string}>} breadcrumbs  trail for BreadcrumbList JSON-LD
 */
export default function Seo({ title, description, path = '', image, noindex = false, type = 'website', breadcrumbs }) {
  const site = useSite()
  const brand = site.brand || {}
  const seo = site.seo || {}
  const domain = (brand.domain || 'bsinnovationsolutions.com').replace(/^https?:\/\//, '').replace(/\/$/, '')
  const origin = `https://${domain}`

  const fullTitle = title ? `${title} · ${brand.name || 'BS Innovation Solutions'}` : seo.title || brand.name
  const desc = description || seo.description || ''
  const canonical = `${origin}${path}`
  const rawImage = image || seo.ogImage || '/assets/portfolio/dheeraj-banner.png'
  const ogImage = rawImage.startsWith('http') ? rawImage : `${origin}${rawImage}`

  const crumbLd =
    breadcrumbs && breadcrumbs.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            item: `${origin}${c.path}`,
          })),
        }
      : null

  return (
    <>
      <title>{fullTitle}</title>
      {desc && <meta name="description" content={desc} />}
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content={brand.name || 'BS Innovation Solutions'} />
      <meta property="og:title" content={fullTitle} />
      {desc && <meta property="og:description" content={desc} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {desc && <meta name="twitter:description" content={desc} />}

      {crumbLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(crumbLd) }} />}
    </>
  )
}
