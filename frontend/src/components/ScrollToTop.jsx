import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// On every route change, jump back to the top of the page — otherwise the new
// page opens at whatever scroll position the previous one was left at (which
// often looks like it "opens at the footer"). A #hash still scrolls to its
// target element.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
