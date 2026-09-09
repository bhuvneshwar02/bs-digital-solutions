import {
  Service,
  Project,
  BlogPost,
  PricingPlan,
  PricingAddon,
  Testimonial,
  Faq,
  ProcessStep,
  TechItem,
  TimelineItem,
  CoreValue,
  ServiceCategory,
} from '../models/index.js'
import { schemas } from '../lib/validate.js'

// key = URL segment used for both /api/<key> (public) and /api/admin/<key> (CRUD).
export const collections = {
  services: { Model: Service, schema: schemas.service, hasSlug: true, slugSource: 'title' },
  portfolio: { Model: Project, schema: schemas.project, hasSlug: true, slugSource: 'title' },
  blog: { Model: BlogPost, schema: schemas.blogPost, hasSlug: true, slugSource: 'title' },
  'pricing-plans': { Model: PricingPlan, schema: schemas.pricingPlan },
  'pricing-addons': { Model: PricingAddon, schema: schemas.pricingAddon },
  testimonials: { Model: Testimonial, schema: schemas.testimonial },
  faqs: { Model: Faq, schema: schemas.faq },
  'process-steps': { Model: ProcessStep, schema: schemas.processStep },
  'tech-stack': { Model: TechItem, schema: schemas.techItem },
  timeline: { Model: TimelineItem, schema: schemas.timelineItem },
  'core-values': { Model: CoreValue, schema: schemas.coreValue },
  'service-categories': { Model: ServiceCategory, schema: schemas.serviceCategory, adminOnly: ['DELETE'] },
}
