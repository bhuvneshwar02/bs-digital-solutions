import { Link } from 'react-router-dom'
import Logo from './Logo'
import { useContent, useSite } from '../content/ContentContext'

export default function Footer() {
  const site = useSite()
  const { services, portfolio, blog } = useContent()
  const brand = site.brand || {}
  const nav = site.nav?.length ? site.nav : []

  const socials = [
    { label: 'LinkedIn', href: brand.linkedin },
    { label: 'GitHub', href: brand.github },
    { label: 'Instagram', href: brand.instagram },
    { label: 'Facebook', href: brand.facebook },
    { label: 'Review on Google ★', href: brand.googleReview },
  ].filter((s) => s.href)

  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          <div className="col-span-2">
            <Logo variant="light" />
            <p className="text-white/50 text-sm leading-relaxed mt-5 max-w-xs">
              {site.footerBlurb ||
                'Helping businesses, institutions and everyday people get their digital work done.'}
            </p>
            {brand.location && (
              <p className="font-mono text-[11px] text-white/40 mt-6 uppercase tracking-wider">{brand.location}</p>
            )}
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">Company</p>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-white/70 hover:text-marigold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">Services</p>
            <ul className="flex flex-col gap-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm text-white/70 hover:text-marigold transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">Portfolio</p>
            <ul className="flex flex-col gap-3">
              {portfolio.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link to={`/portfolio/${p.slug}`} className="text-sm text-white/70 hover:text-marigold transition-colors">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">Blog</p>
            <ul className="flex flex-col gap-3">
              {blog.slice(0, 4).map((b) => (
                <li key={b.slug}>
                  <Link
                    to={`/blog/${b.slug}`}
                    className="text-sm text-white/70 hover:text-marigold transition-colors line-clamp-2"
                  >
                    {b.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-14 pt-8 border-t border-white/10">
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
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
        <p className="font-mono text-[11px] text-white/30 mt-6">
          © {new Date().getFullYear()} {brand.name || 'BS Innovation Solutions'}. Founded by{' '}
          {brand.founder || 'Bhuvneshwar Sharma'}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
