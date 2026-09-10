import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Google Analytics 4. Set VITE_GA_ID (e.g. "G-XXXXXXXXXX") in .env.production
// to switch it on; with no ID this renders nothing and loads no script.
const GA_ID = import.meta.env.VITE_GA_ID

let scriptAdded = false

function ensureGtag() {
  if (scriptAdded || !GA_ID || typeof document === 'undefined') return
  scriptAdded = true

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  // We send page_view manually so SPA route changes are tracked.
  window.gtag('config', GA_ID, { send_page_view: false, anonymize_ip: true })
}

export default function Analytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (!GA_ID) return
    ensureGtag()
    window.gtag?.('event', 'page_view', {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, search])

  return null
}
