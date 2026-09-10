import { Link } from 'react-router-dom'
import Logo from './Logo'
import { useContent, useSite } from '../content/ContentContext'

// Only the pages not already in the top nav.
const pages = [
  { label: 'Reviews', to: '/reviews' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Start a project', to: '/start-project' },
  { label: 'Work with me', to: '/collaborate' },
]

export default function Footer() {
  const site = useSite()
  const { services, portfolio, visits } = useContent()
  const brand = site.brand || {}

  const socials = [
    { label: 'LinkedIn', href: brand.linkedin },
    { label: 'GitHub', href: brand.github },
    { label: 'Instagram · bhuvneshwar02', href: brand.instagram },
    { label: 'Instagram · bsinnovationsolutions', href: brand.instagramBusiness },
    { label: 'Facebook', href: brand.facebook },
    { label: 'Freelancer.com', href: brand.freelancer },
    { label: 'Review on Google ★', href: brand.googleReview },
  ].filter((s) => s.href)

  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="col-span-2 lg:col-span-4">
            <Logo variant="light" size={44} />
            <p className="text-white/50 text-sm leading-relaxed mt-5 max-w-xs">
              {site.footerBlurb ||
                'Helping businesses, institutions and everyday people get their digital work done.'}
            </p>
            {brand.location && (
              <p className="font-mono text-[11px] text-white/40 mt-6 uppercase tracking-wider">{brand.location}</p>
            )}
            {brand.email && (
              <a
                href={`mailto:${brand.email}`}
                className="font-mono text-[11px] text-white/60 mt-2 block hover:text-marigold transition-colors"
              >
                {brand.email}
              </a>
            )}
          </div>

          <div className="lg:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">Pages</p>
            <ul className="flex flex-col gap-3">
              {pages.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-white/70 hover:text-marigold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">Services</p>
            <ul className="flex flex-col gap-3">
              {services.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm text-white/70 hover:text-marigold transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">Recent work</p>
            <ul className="flex flex-col gap-3">
              {portfolio.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <Link to={`/portfolio/${p.slug}`} className="text-sm text-white/70 hover:text-marigold transition-colors">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-14 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-wider text-white/50 hover:text-marigold transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="font-mono text-[11px] uppercase tracking-wider text-white/40 hover:text-white/70">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="font-mono text-[11px] uppercase tracking-wider text-white/40 hover:text-white/70">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-6">
          <p className="font-mono text-[11px] text-white/30">
            © {new Date().getFullYear()} {brand.name || 'BS Innovation Solutions'}. Founded by{' '}
            {brand.founder || 'Bhuvneshwar Sharma'}. All rights reserved.
          </p>
          {typeof visits === 'number' && visits > 0 && (
            <p className="font-mono text-[11px] text-white/30 sm:text-right" title="Total visits to this site">
              {visits.toLocaleString('en-IN')} visits
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
