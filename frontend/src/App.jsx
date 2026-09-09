import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Home + NotFound load with the app; every other route is split into its own
// chunk that only downloads when someone visits it.
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const PortfolioDetail = lazy(() => import('./pages/PortfolioDetail'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Jobs = lazy(() => import('./pages/Jobs'))
const Reviews = lazy(() => import('./pages/Reviews'))
const StartProject = lazy(() => import('./pages/StartProject'))
const Collaborate = lazy(() => import('./pages/Collaborate'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const AdminApp = lazy(() => import('./admin/AdminApp'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/start-project" element={<StartProject />} />
        <Route path="/collaborate" element={<Collaborate />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<div className="p-10 font-mono text-sm text-slate">Loading admin…</div>}>
            <AdminApp />
          </Suspense>
        }
      />
    </Routes>
  )
}
