import { z } from 'zod'
import { IN_STATES } from './states.js'

const stateEnum = z.enum(IN_STATES)

const strArray = z.array(z.string().trim().max(2000)).max(100).default([])
const listable = {
  order: z.number().int().min(0).max(100000).optional(),
  published: z.boolean().optional(),
}

// Image references: a site-relative path or an http(s) URL. Blocks javascript:,
// data:, and other exotic schemes from ending up in an <img src>.
const imageRef = z
  .string()
  .trim()
  .max(2048)
  .refine((v) => v === '' || v.startsWith('/') || /^https?:\/\//i.test(v), {
    message: 'Must be a site path (/…) or an http(s) URL',
  })
  .optional()
  .default('')

const strongPassword = z
  .string()
  .min(10, 'Use at least 10 characters')
  .max(200)

export const schemas = {
  service: z.object({
    slug: z.string().trim().optional(),
    category: z.string().trim().min(1),
    tag: z.string().trim().optional().default(''),
    title: z.string().trim().min(1),
    image: imageRef,
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
    image: imageRef,
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
    image: imageRef.refine((v) => !!v, 'An image is required'),
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

  // Public "leave a review" submission.
  reviewSubmit: z.object({
    name: z.string().trim().min(2, 'Please enter your name').max(80),
    role: z.string().trim().max(120).optional().default(''),
    rating: z.coerce.number().int().min(1, 'Pick a star rating').max(5).default(5),
    project: z.string().trim().max(160).optional().default(''),
    city: z.string().trim().max(80).optional().default(''),
    state: z.union([stateEnum, z.literal('')]).optional().default(''),
    text: z.string().trim().min(6, 'Please write a few more words').max(2000),
  }),

  // Admin create/edit of a review.
  review: z.object({
    name: z.string().trim().min(1).max(80),
    role: z.string().trim().max(120).optional().default(''),
    rating: z.coerce.number().int().min(1).max(5).default(5),
    project: z.string().trim().max(160).optional().default(''),
    city: z.string().trim().max(80).optional().default(''),
    state: z.union([stateEnum, z.literal('')]).optional().default(''),
    text: z.string().trim().min(1).max(2000),
    status: z.enum(['pending', 'approved', 'rejected']).optional().default('approved'),
    featured: z.boolean().optional().default(false),
  }),

  // Public "post a job for free" submission — full poster identity is required
  // and an admin verifies it before the post is published.
  jobPost: z.object({
    jobTitle: z.string().trim().min(2).max(160),
    company: z.string().trim().max(160).optional().default(''),
    location: z.string().trim().min(2).max(160),
    city: z.string().trim().min(2, 'City is required').max(80),
    state: stateEnum,
    workMode: z.string().trim().max(40).optional().default('On-site'),
    budget: z.string().trim().max(120).optional().default(''),
    description: z.string().trim().min(15, 'Please describe the job in a bit more detail').max(4000),
    posterName: z.string().trim().min(2, 'Your full name is required').max(120),
    posterEmail: z.string().trim().email('A valid email is required').max(200),
    posterPhone: z
      .string()
      .trim()
      .min(7, 'A phone number is required')
      .max(20)
      .regex(/^[+\d][\d\s-]{6,}$/, 'Enter a valid phone number'),
    posterOrg: z.string().trim().max(160).optional().default(''),
    posterAddress: z.string().trim().max(300).optional().default(''),
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
    email: z.string().trim().email().max(200),
    password: z.string().min(1).max(200),
  }),

  changePassword: z.object({
    currentPassword: z.string().min(1).max(200),
    newPassword: strongPassword,
  }),

  userCreate: z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    password: strongPassword,
    role: z.enum(['admin', 'editor']).default('editor'),
  }),

  userUpdate: z.object({
    name: z.string().trim().min(1).optional(),
    email: z.string().trim().email().optional(),
    password: strongPassword.optional(),
    role: z.enum(['admin', 'editor']).optional(),
  }),

  reorder: z.object({
    ids: z
      .array(z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id'))
      .min(1)
      .max(500),
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
    instagramBusiness: z.string().trim().optional(),
    facebook: z.string().trim().optional(),
    freelancer: z.string().trim().optional(),
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
        image: imageRef,
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
        image: imageRef,
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
