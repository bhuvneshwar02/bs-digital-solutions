import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Floating "leave a review" button, sits just above the WhatsApp float.
// Fixed position — never affects page layout. Dismissible per session.
export default function ReviewFloat() {
  const { pathname } = useLocation()
  const [hidden, setHidden] = useState(() => {
    try {
      return sessionStorage.getItem('bsis.reviewFloat.hidden') === '1'
    } catch {
      return false
    }
  })

  if (hidden || pathname === '/reviews') return null

  const dismiss = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setHidden(true)
    try {
      sessionStorage.setItem('bsis.reviewFloat.hidden', '1')
    } catch {
      /* ignore */
    }
  }

  return (
    <Link
      to="/reviews#leave-a-review"
      aria-label="Leave a review"
      className="group fixed bottom-24 right-5 sm:bottom-28 sm:right-8 z-50 inline-flex items-center gap-2 rounded-full bg-marigold text-ink font-display font-semibold text-[13px] pl-3.5 pr-4 py-2.5 shadow-lg shadow-black/20 hover:bg-marigold-dark transition-colors"
    >
      <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 15l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" />
      </svg>
      <span className="hidden sm:inline">Leave a review</span>
      <span className="sm:hidden">Review</span>
      <button
        onClick={dismiss}
        aria-label="Hide"
        className="ml-0.5 -mr-1.5 w-4 h-4 rounded-full text-ink/50 hover:text-ink text-[11px] leading-none opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
    </Link>
  )
}
