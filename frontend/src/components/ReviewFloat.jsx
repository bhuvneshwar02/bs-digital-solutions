import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Floating "leave a review" button. Sits just above the WhatsApp float.
// Shows expanded (with label) for the first 5 seconds, then shrinks to a small
// icon so it never covers page content. Re-expands on hover.
export default function ReviewFloat() {
  const { pathname } = useLocation()
  const [expanded, setExpanded] = useState(true)
  const [hovered, setHovered] = useState(false)
  const timer = useRef()

  useEffect(() => {
    timer.current = setTimeout(() => setExpanded(false), 5000)
    return () => clearTimeout(timer.current)
  }, [])

  if (pathname === '/reviews') return null

  const open = expanded || hovered

  return (
    <Link
      to="/reviews#leave-a-review"
      aria-label="Leave a review"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed bottom-24 right-5 sm:bottom-28 sm:right-8 z-50 inline-flex items-center justify-center rounded-full bg-marigold text-ink shadow-lg shadow-black/20 hover:bg-marigold-dark transition-all duration-300 ${
        open ? 'gap-2 pl-3.5 pr-4 py-2.5' : 'w-11 h-11 p-0'
      }`}
    >
      <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true" className="shrink-0">
        <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 15l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" />
      </svg>
      <span
        className={`font-display font-semibold text-[13px] whitespace-nowrap overflow-hidden transition-all duration-300 ${
          open ? 'max-w-[140px] opacity-100' : 'max-w-0 opacity-0'
        }`}
      >
        Leave a review
      </span>
    </Link>
  )
}
