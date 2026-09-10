import mongoose from 'mongoose'

const { Schema, model } = mongoose

/* ------------------------------------------------------------------ */
/*  Shared field sets                                                  */
/* ------------------------------------------------------------------ */

// Every editable content collection carries these so the admin panel can
// reorder and hide items without deleting them.
const listable = {
  order: { type: Number, default: 0, index: true },
  published: { type: Boolean, default: true, index: true },
}

const opts = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(_doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    },
  },
}

/* ------------------------------------------------------------------ */
/*  Users                                                              */
/* ------------------------------------------------------------------ */

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'editor'], default: 'editor', index: true },
    lastLoginAt: Date,
    // Any token issued before this instant is rejected (see requireAuth).
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.passwordHash
        return ret
      },
    },
  },
)

export const User = model('User', userSchema)

/* ------------------------------------------------------------------ */
/*  Site settings (singleton)                                          */
/* ------------------------------------------------------------------ */

const siteSettingsSchema = new Schema(
  {
    key: { type: String, default: 'site', unique: true },
    brand: {
      name: { type: String, default: 'BS Innovation Solutions' },
      short: { type: String, default: 'BS Innovation' },
      tagline: { type: String, default: 'Web · AI · Growth' },
      founder: { type: String, default: 'Bhuvneshwar Sharma' },
      location: { type: String, default: 'Rampur, Uttar Pradesh, India' },
      domain: { type: String, default: 'bsinnovationsolutions.com' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
      googleReview: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
    },
    // "Timely delivery / fixed price / no hidden charges" promises.
    commitments: [{ title: String, description: String }],
    nav: [{ label: String, to: String, order: Number }],
    trustedBy: [String],
    hero: {
      statusText: String,
      titleLead: String,
      titleAccent: String,
      description: String,
      image: String,
      stats: [{ value: String, label: String }],
    },
    hireMe: {
      eyebrow: { type: String, default: 'Freelance / hire me' },
      title: String,
      description: String,
      ctaLabel: { type: String, default: 'Hire me for a project' },
    },
    about: {
      heroTitle: String,
      heroDescription: String,
      storyEyebrow: { type: String, default: 'The story' },
      storyTitle: String,
      storyParagraphs: [String],
      mission: String,
      vision: String,
      trustTitle: String,
      trustDescription: String,
      image: String,
    },
    footerBlurb: String,
    seo: {
      title: String,
      description: String,
      ogTitle: String,
      ogDescription: String,
      ogImage: String,
      serviceAreas: [String],
    },
  },
  opts,
)

export const SiteSettings = model('SiteSettings', siteSettingsSchema)

/* ------------------------------------------------------------------ */
/*  Content collections                                                */
/* ------------------------------------------------------------------ */

const serviceCategorySchema = new Schema(
  { key: { type: String, required: true, unique: true }, label: { type: String, required: true }, ...listable },
  opts,
)
export const ServiceCategory = model('ServiceCategory', serviceCategorySchema)

const serviceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true },
    tag: String,
    title: { type: String, required: true },
    image: String,
    short: String,
    description: String,
    features: [String],
    idealFor: [String],
    timeline: String,
    ...listable,
  },
  opts,
)
export const Service = model('Service', serviceSchema)

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tag: String,
    title: { type: String, required: true },
    image: String,
    category: String,
    year: String,
    summary: String,
    problem: String,
    solution: String,
    features: [String],
    stack: [String],
    link: String,
    ...listable,
  },
  opts,
)
export const Project = model('Project', projectSchema)

const blogPostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tag: String,
    title: { type: String, required: true },
    date: String,
    readTime: String,
    excerpt: String,
    body: [String],
    ...listable,
  },
  opts,
)
export const BlogPost = model('BlogPost', blogPostSchema)

const pricingPlanSchema = new Schema(
  {
    name: { type: String, required: true },
    price: String,
    unit: String,
    description: String,
    features: [String],
    highlighted: { type: Boolean, default: false },
    // 'build' = one-time project plans, 'care' = monthly retainer plans
    group: { type: String, enum: ['build', 'care'], default: 'build', index: true },
    ...listable,
  },
  opts,
)
export const PricingPlan = model('PricingPlan', pricingPlanSchema)

const pricingAddonSchema = new Schema(
  { name: { type: String, required: true }, price: String, ...listable },
  opts,
)
export const PricingAddon = model('PricingAddon', pricingAddonSchema)

const testimonialSchema = new Schema(
  { quote: { type: String, required: true }, name: String, context: String, ...listable },
  opts,
)
export const Testimonial = model('Testimonial', testimonialSchema)

const faqSchema = new Schema(
  { q: { type: String, required: true }, a: { type: String, required: true }, ...listable },
  opts,
)
export const Faq = model('Faq', faqSchema)

const processStepSchema = new Schema(
  { step: String, title: { type: String, required: true }, description: String, ...listable },
  opts,
)
export const ProcessStep = model('ProcessStep', processStepSchema)

const techItemSchema = new Schema(
  { name: { type: String, required: true }, note: String, ...listable },
  opts,
)
export const TechItem = model('TechItem', techItemSchema)

const timelineItemSchema = new Schema(
  { year: String, title: { type: String, required: true }, text: String, ...listable },
  opts,
)
export const TimelineItem = model('TimelineItem', timelineItemSchema)

const coreValueSchema = new Schema(
  { title: { type: String, required: true }, description: String, ...listable },
  opts,
)
export const CoreValue = model('CoreValue', coreValueSchema)

/* ------------------------------------------------------------------ */
/*  Contact messages                                                   */
/* ------------------------------------------------------------------ */

const galleryItemSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    caption: String,
    ...listable,
  },
  opts,
)
export const GalleryItem = model('GalleryItem', galleryItemSchema)

/* ------------------------------------------------------------------ */
/*  Applications (project brief + collaborator)                        */
/* ------------------------------------------------------------------ */

const applicationSchema = new Schema(
  {
    kind: { type: String, enum: ['project', 'collaborator', 'job'], required: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    message: { type: String, required: true },
    // project brief
    company: String,
    projectType: String,
    budget: String,
    timeline: String,
    // collaborator
    role: String,
    skills: String,
    portfolioUrl: String,
    availability: String,
    // job application
    jobId: String,
    jobTitle: String,
    status: { type: String, enum: ['new', 'read', 'archived'], default: 'new', index: true },
    meta: { ip: String, userAgent: String },
  },
  opts,
)
export const Application = model('Application', applicationSchema)

/* ------------------------------------------------------------------ */
/*  Jobs — roles the studio is hiring for (admin-managed)              */
/* ------------------------------------------------------------------ */

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    employmentType: { type: String, default: 'Contract' }, // Full-time | Part-time | Contract | Freelance | Internship
    location: { type: String, default: 'Remote' },
    remote: { type: Boolean, default: true },
    description: String,
    requirements: [String],
    compensation: String,
    applyEmail: String,
    status: { type: String, enum: ['open', 'closed'], default: 'open', index: true },
    ...listable,
  },
  opts,
)
export const Job = model('Job', jobSchema)

/* ------------------------------------------------------------------ */
/*  Community job board — anyone can post a job/requirement for free   */
/*  (moderated: pending -> approved before it shows publicly)          */
/* ------------------------------------------------------------------ */

const jobPostSchema = new Schema(
  {
    jobTitle: { type: String, required: true },
    company: String,
    location: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    workMode: { type: String, default: 'On-site' }, // On-site | Remote | Hybrid
    budget: String,
    description: { type: String, required: true },
    // Poster identity — all required, verified by an admin before the post shows.
    posterName: { type: String, required: true },
    posterEmail: { type: String, required: true, lowercase: true, trim: true },
    posterPhone: { type: String, required: true },
    posterOrg: String,
    posterAddress: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
    meta: { ip: String, userAgent: String },
  },
  opts,
)
export const JobPost = model('JobPost', jobPostSchema)

/* ------------------------------------------------------------------ */
/*  Reviews — anyone can leave one; moderated before it shows          */
/* ------------------------------------------------------------------ */

const reviewSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true }, // e.g. "Owner, Grameen Haat" or "Client"
    rating: { type: Number, min: 1, max: 5, default: 5 },
    project: { type: String, trim: true }, // which project / work, optional
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    text: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
    featured: { type: Boolean, default: false },
    meta: { ip: String, userAgent: String },
  },
  opts,
)
export const Review = model('Review', reviewSchema)

/* ------------------------------------------------------------------ */
/*  Contact messages                                                   */
/* ------------------------------------------------------------------ */

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    type: { type: String, trim: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'archived'], default: 'new', index: true },
    meta: {
      ip: String,
      userAgent: String,
    },
  },
  opts,
)
export const ContactMessage = model('ContactMessage', contactMessageSchema)

/* ------------------------------------------------------------------ */
/*  Metrics (singleton counters, e.g. total site visits)              */
/* ------------------------------------------------------------------ */

const metricSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true },
)
export const Metric = model('Metric', metricSchema)
