import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'
import ReviewFloat from './ReviewFloat'
import StructuredData from './StructuredData'
import Analytics from './Analytics'
import ScrollToTop from './ScrollToTop'

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <span className="w-6 h-6 rounded-full border-2 border-line border-t-ink animate-spin" aria-label="Loading" />
    </div>
  )
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <StructuredData />
      <Analytics />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ReviewFloat />
      <WhatsAppFloat />
    </div>
  )
}
