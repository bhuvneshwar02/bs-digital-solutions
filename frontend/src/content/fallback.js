// Assembles the local data files into the same shape as GET /api/bootstrap so the
// site still renders if the API is unreachable.
import { services, serviceCategories } from '../data/services'
import { portfolio } from '../data/portfolio'
import { blog } from '../data/blog'
import {
  siteSettings,
  pricingPlans,
  pricingAddons,
  testimonials,
  faqs,
  processSteps,
  techStack,
  timeline,
  coreValues,
  gallery,
  jobs,
} from '../data/site'

export const fallbackContent = {
  site: siteSettings,
  services,
  portfolio,
  blog,
  gallery,
  jobs,
  pricingPlans,
  pricingAddons,
  testimonials,
  faqs,
  processSteps,
  techStack,
  timeline,
  coreValues,
  serviceCategories,
}
