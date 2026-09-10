import { useContent, useSite } from '../content/ContentContext'
import { jsonLd } from '../lib/jsonld'

// Schema.org JSON-LD so search engines understand this is a freelance
// developer + local service, who runs it, where, what it covers, and how it's
// rated. Emits three graphs: the business, the freelancer (Person), and the FAQ.
export default function StructuredData() {
  const site = useSite()
  const { services, reviews, faqs } = useContent()
  const brand = site.brand || {}
  const domain = (brand.domain || 'bsinnovationsolutions.com').replace(/^https?:\/\//, '').replace(/\/$/, '')
  const origin = `https://${domain}`
  const areas = site.seo?.serviceAreas || ['Rampur', 'Milak', 'Moradabad', 'Bareilly']

  const sameAs = [
    brand.linkedin,
    brand.github,
    brand.instagram,
    brand.instagramBusiness,
    brand.facebook,
    brand.freelancer,
  ].filter(Boolean)

  const person = {
    '@type': 'Person',
    '@id': `${origin}/#bhuvneshwar`,
    name: brand.founder || 'Bhuvneshwar Sharma',
    jobTitle: ['Freelancer', 'Freelance Full-Stack & AI Developer', 'Freelance Web Developer'],
    description:
      'Freelancer and freelance web, app and AI developer available for hire — business websites, web apps, e-commerce, AI chatbots and SEO.',
    url: origin,
    email: brand.email || undefined,
    telephone: brand.phone || undefined,
    knowsAbout: [
      'Web development',
      'React',
      'Node.js',
      'MongoDB',
      'E-commerce development',
      'AI chatbots',
      'Retrieval-Augmented Generation',
      'SEO',
      ...(services.length ? services.slice(0, 8).map((s) => s.title) : []),
    ],
    homeLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Rampur', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
    },
    sameAs,
    worksFor: { '@id': `${origin}/#business` },
  }

  const business = {
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
    founder: { '@id': `${origin}/#bhuvneshwar` },
    employee: { '@id': `${origin}/#bhuvneshwar` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rampur',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 28.7904, longitude: 79.0247 },
    areaServed: [
      ...areas.map((name) => ({ '@type': 'Place', name })),
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

  if (reviews?.count > 0) {
    business.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: reviews.average,
      reviewCount: reviews.count,
      bestRating: 5,
      worstRating: 1,
    }
    business.review = (reviews.items || []).slice(0, 10).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
      ...(r.date ? { datePublished: r.date } : {}),
      ...(r.city || r.state
        ? { locationCreated: { '@type': 'Place', name: [r.city, r.state].filter(Boolean).join(', ') } }
        : {}),
    }))
  }

  const webSite = {
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: origin,
    name: brand.name || 'BS Innovation Solutions',
    inLanguage: 'en',
    publisher: { '@id': `${origin}/#business` },
    about: { '@id': `${origin}/#bhuvneshwar` },
  }

  const graph = { '@context': 'https://schema.org', '@graph': [webSite, person, business] }

  const faqLd =
    faqs?.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.slice(0, 10).map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqLd) }} />}
    </>
  )
}
