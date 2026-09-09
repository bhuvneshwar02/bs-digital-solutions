import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { PrimaryButton } from './Atoms'
import { useSite } from '../content/ContentContext'

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
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-paper/90 backdrop-blur border-b border-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-20">
        <NavLink to="/" aria-label={`${site.brand?.name || 'BS Innovation Solutions'} — home`}>
          <Logo />
        </NavLink>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `font-mono text-[12px] uppercase tracking-wider px-4 py-2 rounded-full transition-colors ${
                  isActive ? 'text-ink bg-ink/5' : 'text-slate hover:text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <PrimaryButton to="/start-project" className="!py-2.5 !px-5 !text-[13px]">
            Start a project
          </PrimaryButton>
        </div>

        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border border-line"
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
          </nav>
          <PrimaryButton to="/start-project" className="w-full mt-5">
            Start a project
          </PrimaryButton>
        </div>
      )}
    </header>
  )
}
