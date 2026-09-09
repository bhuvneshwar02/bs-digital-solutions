import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'
import { fallbackContent } from './fallback'

const ContentContext = createContext(null)

// Maps the hyphenated API keys onto the camelCase names the UI uses.
function normalize(raw) {
  return {
    site: raw.site || fallbackContent.site,
    services: raw.services || [],
    portfolio: raw.portfolio || [],
    blog: raw.blog || [],
    gallery: raw.gallery || [],
    jobs: raw.jobs || [],
    reviews: raw.reviews || { items: [], count: 0, average: 0 },
    pricingPlans: raw['pricing-plans'] || [],
    pricingAddons: raw['pricing-addons'] || [],
    testimonials: raw.testimonials || [],
    faqs: raw.faqs || [],
    processSteps: raw['process-steps'] || [],
    techStack: raw['tech-stack'] || [],
    timeline: raw.timeline || [],
    coreValues: raw['core-values'] || [],
    serviceCategories: raw['service-categories'] || [],
  }
}

export function ContentProvider({ children }) {
  const [state, setState] = useState({
    data: fallbackContent,
    loading: true,
    // 'api' once loaded from the server, 'fallback' if the request failed.
    source: 'fallback',
  })

  useEffect(() => {
    let cancelled = false
    api
      .get('/bootstrap')
      .then((raw) => {
        if (cancelled) return
        setState({ data: normalize(raw), loading: false, source: 'api' })
      })
      .catch(() => {
        if (cancelled) return
        setState({ data: fallbackContent, loading: false, source: 'fallback' })
      })
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => state, [state])
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within <ContentProvider>')
  return { ...ctx.data, loading: ctx.loading, source: ctx.source }
}

export function useSite() {
  return useContent().site
}
