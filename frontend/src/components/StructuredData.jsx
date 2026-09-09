import { useContent, useSite } from '../content/ContentContext'
import { jsonLd } from '../lib/jsonld'

// Schema.org JSON-LD so search engines understand this is a local + remote
// freelance service, who runs it, where, and what it covers.
export default function StructuredData() {
  const site = useSite()
  const { services, reviews } = useContent()
  const brand = site.brand || {}
  const domain = (brand.domain || 'bsinnovationsolutions.com').replace(/^https?:\/\//, '').replace(/\/$/, '')
  const origin = `https://${domain}`

  const sameAs = [brand.linkedin, brand.github, brand.instagram, brand.facebook].filter(Boolean)

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${origin}/#business`,
    name: brand.name || 'BS Innovation Solutions',
    alternateName: brand.short,
    url: origin,
    image: `${origin}/assets/portfolio/dheeraj-banner.png`,
    description: site.seo?.description,
    email: brand.email || undefined,
    telephone: brand.phone || undefined,
    priceRange: '₹₹',
    founder: {
      '@type': 'Person',
      name: brand.founder || 'Bhuvneshwar Sharma',
      jobTitle: 'Freelance Full-Stack & AI Developer',
      sameAs,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rampur',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: [
      ...(site.seo?.serviceAreas || ['Rampur', 'Milak', 'Moradabad', 'Bareilly']).map((name) => ({
        '@type': 'Place',
        name,
      })),
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'Worldwide (remote)' },
    ],
    knowsAbout: (services.length ? services : []).slice(0, 12).map((s) => s.title),
    sameAs,
    makesOffer: (services.length ? services : []).slice(0, 12).map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, url: `${origin}/services/${s.slug}` },
    })),
  }

  // Real, user-submitted reviews → star ratings in search results.
  if (reviews?.count > 0) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: reviews.average,
      reviewCount: reviews.count,
      bestRating: 5,
      worstRating: 1,
    }
    data.review = (reviews.items || []).slice(0, 10).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
      ...(r.date ? { datePublished: r.date } : {}),
    }))
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  )
}
