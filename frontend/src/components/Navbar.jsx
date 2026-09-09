import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { PrimaryButton } from './Atoms'
import { useSite } from '../content/ContentContext'

// Secondary pages — shown in the mobile menu and the footer, not the top bar.
const secondaryLinks = [
  { label: 'Reviews', to: '/reviews' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Start a project', to: '/start-project' },
  { label: 'Work with me', to: '/collaborate' },
]

export default function Navbar() {
  const site = useSite()
  const nav = site.nav?.length ? site.nav : []
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    `relative font-mono text-[12px] uppercase tracking-wider px-3.5 py-2 rounded-full transition-colors ${
      isActive ? 'text-ink' : 'text-slate hover:text-ink hover:bg-ink/[0.04]'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/80 backdrop-blur-md border-b border-line shadow-[0_1px_20px_rgba(18,23,43,0.05)]' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[70px]">
        <NavLink to="/" aria-label={`${site.brand?.name || 'BS Innovation Solutions'} — home`} className="shrink-0">
          <Logo size={40} />
        </NavLink>

        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-marigold" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {site.brand?.whatsapp && (
            <a
              href={`https://wa.me/${site.brand.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-slate hover:text-teal hover:border-teal/40 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5 14.1c-.2.6-1.2 1.1-1.7 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6 0-1.3.7-1.9.9-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.4.1.2.1.6-.1 1Z" />
              </svg>
            </a>
          )}
          <PrimaryButton to="/start-project" className="!py-2.5 !px-5 !text-[13px] !gap-1.5">
            Start a project <span aria-hidden>→</span>
          </PrimaryButton>
        </div>

        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border border-line hover:bg-ink/[0.04] transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`block w-4 h-[1.5px] bg-ink transition-transform ${open ? 'rotate-45 translate-y-[1.5px]' : ''}`} />
          <span className={`block w-4 h-[1.5px] bg-ink mt-1 transition-transform ${open ? '-rotate-45 -translate-y-[1.5px]' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-paper border-t border-line px-5 pb-6 pt-2">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `font-mono text-[13px] uppercase tracking-wider py-3.5 border-b border-line ${
                    isActive ? 'text-ink' : 'text-slate'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {secondaryLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="font-mono text-[12px] uppercase tracking-wider py-3 border-b border-line/60 text-slate/70"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <PrimaryButton to="/start-project" className="w-full mt-5">
            Start a project →
          </PrimaryButton>
        </div>
      )}
    </header>
  )
}
