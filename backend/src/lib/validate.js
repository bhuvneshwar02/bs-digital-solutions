import { z } from 'zod'

const strArray = z.array(z.string().trim()).default([])
const listable = {
  order: z.number().int().optional(),
  published: z.boolean().optional(),
}

export const schemas = {
  service: z.object({
    slug: z.string().trim().optional(),
    category: z.string().trim().min(1),
    tag: z.string().trim().optional().default(''),
    title: z.string().trim().min(1),
    image: z.string().trim().optional().default(''),
    short: z.string().trim().optional().default(''),
    description: z.string().trim().optional().default(''),
    features: strArray,
    idealFor: strArray,
    timeline: z.string().trim().optional().default(''),
    ...listable,
  }),

  project: z.object({
    slug: z.string().trim().optional(),
    tag: z.string().trim().optional().default(''),
    title: z.string().trim().min(1),
    image: z.string().trim().optional().default(''),
    category: z.string().trim().optional().default(''),
    year: z.string().trim().optional().default(''),
    summary: z.string().trim().optional().default(''),
    problem: z.string().trim().optional().default(''),
    solution: z.string().trim().optional().default(''),
    features: strArray,
    stack: strArray,
    link: z.string().trim().optional().default(''),
    ...listable,
  }),

  blogPost: z.object({
    slug: z.string().trim().optional(),
    tag: z.string().trim().optional().default(''),
    title: z.string().trim().min(1),
    date: z.string().trim().optional().default(''),
    readTime: z.string().trim().optional().default(''),
    excerpt: z.string().trim().optional().default(''),
    body: strArray,
    ...listable,
  }),

  pricingPlan: z.object({
    name: z.string().trim().min(1),
    price: z.string().trim().optional().default(''),
    unit: z.string().trim().optional().default(''),
    description: z.string().trim().optional().default(''),
    features: strArray,
    highlighted: z.boolean().optional().default(false),
    group: z.enum(['build', 'care']).optional().default('build'),
    ...listable,
  }),

  pricingAddon: z.object({
    name: z.string().trim().min(1),
    price: z.string().trim().optional().default(''),
    ...listable,
  }),

  testimonial: z.object({
    quote: z.string().trim().min(1),
    name: z.string().trim().optional().default(''),
    context: z.string().trim().optional().default(''),
    ...listable,
  }),

  faq: z.object({
    q: z.string().trim().min(1),
    a: z.string().trim().min(1),
    ...listable,
  }),

  processStep: z.object({
    step: z.string().trim().optional().default(''),
    title: z.string().trim().min(1),
    description: z.string().trim().optional().default(''),
    ...listable,
  }),

  techItem: z.object({
    name: z.string().trim().min(1),
    note: z.string().trim().optional().default(''),
    ...listable,
  }),

  timelineItem: z.object({
    year: z.string().trim().optional().default(''),
    title: z.string().trim().min(1),
    text: z.string().trim().optional().default(''),
    ...listable,
  }),

  coreValue: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().optional().default(''),
    ...listable,
  }),

  serviceCategory: z.object({
    key: z.string().trim().min(1),
    label: z.string().trim().min(1),
    ...listable,
  }),

  contactMessage: z.object({
    name: z.string().trim().min(1, 'Name is required').max(120),
    email: z.string().trim().email('A valid email is required').max(200),
    phone: z.string().trim().max(40).optional().default(''),
    type: z.string().trim().max(120).optional().default(''),
    message: z.string().trim().min(5, 'Please add a bit more detail').max(5000),
  }),

  galleryItem: z.object({
    title: z.string().trim().min(1),
    image: z.string().trim().min(1),
    caption: z.string().trim().optional().default(''),
    ...listable,
  }),

  job: z.object({
    title: z.string().trim().min(1),
    employmentType: z.string().trim().optional().default('Contract'),
    location: z.string().trim().optional().default('Remote'),
    remote: z.boolean().optional().default(true),
    description: z.string().trim().optional().default(''),
    requirements: strArray,
    compensation: z.string().trim().optional().default(''),
    applyEmail: z.string().trim().optional().default(''),
    status: z.enum(['open', 'closed']).optional().default('open'),
    ...listable,
  }),

  // Public "post a job for free" submission.
  jobPost: z.object({
    jobTitle: z.string().trim().min(2).max(160),
    company: z.string().trim().max(160).optional().default(''),
    location: z.string().trim().min(2).max(160),
    workMode: z.string().trim().max(40).optional().default('On-site'),
    budget: z.string().trim().max(120).optional().default(''),
    description: z.string().trim().min(15, 'Please describe the job in a bit more detail').max(4000),
    posterName: z.string().trim().min(1).max(120),
    posterEmail: z.string().trim().email('A valid email is required').max(200),
    posterPhone: z.string().trim().max(40).optional().default(''),
  }),

  application: z.object({
    kind: z.enum(['project', 'collaborator', 'job']),
    name: z.string().trim().min(1, 'Name is required').max(120),
    email: z.string().trim().email('A valid email is required').max(200),
    phone: z.string().trim().max(40).optional().default(''),
    message: z.string().trim().min(5, 'Please add a bit more detail').max(6000),
    company: z.string().trim().max(160).optional().default(''),
    projectType: z.string().trim().max(160).optional().default(''),
    budget: z.string().trim().max(120).optional().default(''),
    timeline: z.string().trim().max(120).optional().default(''),
    role: z.string().trim().max(160).optional().default(''),
    skills: z.string().trim().max(600).optional().default(''),
    portfolioUrl: z.string().trim().max(300).optional().default(''),
    availability: z.string().trim().max(160).optional().default(''),
    jobId: z.string().trim().max(64).optional().default(''),
    jobTitle: z.string().trim().max(200).optional().default(''),
  }),

  login: z.object({
    email: z.string().trim().email(),
    password: z.string().min(1),
  }),

  changePassword: z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8, 'Use at least 8 characters'),
  }),

  userCreate: z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    password: z.string().min(8, 'Use at least 8 characters'),
    role: z.enum(['admin', 'editor']).default('editor'),
  }),

  userUpdate: z.object({
    name: z.string().trim().min(1).optional(),
    email: z.string().trim().email().optional(),
    password: z.string().min(8).optional(),
    role: z.enum(['admin', 'editor']).optional(),
  }),

  reorder: z.object({
    ids: z.array(z.string()).min(1),
  }),
}

const brandSchema = z
  .object({
    name: z.string().trim().optional(),
    short: z.string().trim().optional(),
    tagline: z.string().trim().optional(),
    founder: z.string().trim().optional(),
    location: z.string().trim().optional(),
    email: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    whatsapp: z.string().trim().optional(),
    domain: z.string().trim().optional(),
    googleReview: z.string().trim().optional(),
    linkedin: z.string().trim().optional(),
    github: z.string().trim().optional(),
    instagram: z.string().trim().optional(),
    facebook: z.string().trim().optional(),
  })
  .partial()

export const siteSettingsSchema = z
  .object({
    brand: brandSchema.optional(),
    nav: z
      .array(z.object({ label: z.string().trim(), to: z.string().trim(), order: z.number().optional() }))
      .optional(),
    trustedBy: z.array(z.string().trim()).optional(),
    commitments: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
    hero: z
      .object({
        statusText: z.string().optional(),
        titleLead: z.string().optional(),
        titleAccent: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
      })
      .partial()
      .optional(),
    hireMe: z
      .object({
        eyebrow: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        ctaLabel: z.string().optional(),
      })
      .partial()
      .optional(),
    about: z
      .object({
        heroTitle: z.string().optional(),
        heroDescription: z.string().optional(),
        storyEyebrow: z.string().optional(),
        storyTitle: z.string().optional(),
        storyParagraphs: z.array(z.string()).optional(),
        mission: z.string().optional(),
        vision: z.string().optional(),
        trustTitle: z.string().optional(),
        trustDescription: z.string().optional(),
        image: z.string().optional(),
      })
      .partial()
      .optional(),
    footerBlurb: z.string().optional(),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        ogTitle: z.string().optional(),
        ogDescription: z.string().optional(),
        ogImage: z.string().optional(),
        serviceAreas: z.array(z.string()).optional(),
      })
      .partial()
      .optional(),
  })
  .strip()
