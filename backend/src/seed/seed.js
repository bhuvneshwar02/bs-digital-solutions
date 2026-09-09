/*
 * Idempotent database seed.
 *
 *   node src/seed/seed.js           # fills only what's missing
 *   node src/seed/seed.js --fresh   # wipes content collections + settings, then reseeds
 *
 * The admin account is always ensured from SEED_ADMIN_* env vars (never overwritten
 * if it already exists).
 */
import bcrypt from 'bcryptjs'
import { env } from '../config/env.js'
import { connectDb, disconnectDb } from '../config/db.js'
import {
  User,
  SiteSettings,
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
  GalleryItem,
  Job,
  Review,
} from '../models/index.js'
import * as content from './data/content.js'
import { siteSettings } from './data/site.js'

const fresh = process.argv.includes('--fresh')

const withOrder = (rows) => rows.map((row, i) => ({ ...row, order: i, published: true }))

const groups = [
  { Model: ServiceCategory, rows: content.serviceCategories, upsertKey: 'key' },
  { Model: Service, rows: content.services, upsertKey: 'slug' },
  { Model: Project, rows: content.portfolio, upsertKey: 'slug' },
  { Model: BlogPost, rows: content.blog, upsertKey: 'slug' },
  { Model: GalleryItem, rows: content.gallery },
  { Model: Job, rows: content.jobs, upsertKey: 'title' },
  { Model: PricingPlan, rows: [...content.pricingPlans, ...content.carePlans], upsertKey: 'name' },
  { Model: PricingAddon, rows: content.pricingAddons, upsertKey: 'name' },
  { Model: Testimonial, rows: content.testimonials },
  { Model: Faq, rows: content.faqs },
  { Model: ProcessStep, rows: content.processSteps },
  { Model: TechItem, rows: content.techStack },
  { Model: TimelineItem, rows: content.timeline },
  { Model: CoreValue, rows: content.coreValues },
]

async function ensureAdmin() {
  const count = await User.countDocuments()
  if (count > 0) {
    console.log(`• users: ${count} already present — skipping admin creation`)
    return
  }
  const { name, email, password } = env.seedAdmin
  await User.create({
    name,
    email: email.toLowerCase(),
    role: 'admin',
    passwordHash: await bcrypt.hash(password, 12),
  })
  console.log(`• users: created admin <${email}>`)
}

async function seedGroup({ Model, rows, upsertKey }) {
  const name = Model.modelName
  if (fresh) await Model.deleteMany({})
  const existing = await Model.countDocuments()

  if (existing === 0) {
    await Model.insertMany(withOrder(rows))
    console.log(`• ${name}: inserted ${rows.length}`)
    return
  }

  // Additive: for collections with a natural key, insert any new rows that
  // aren't in the DB yet (keeps hand-edits, adds newly-shipped content).
  if (upsertKey) {
    let added = 0
    let maxOrder = (await Model.findOne().sort({ order: -1 }).select('order'))?.order ?? -1
    for (const row of rows) {
      // eslint-disable-next-line no-await-in-loop
      if (await Model.exists({ [upsertKey]: row[upsertKey] })) continue
      maxOrder += 1
      // eslint-disable-next-line no-await-in-loop
      await Model.create({ ...row, order: maxOrder, published: true })
      added += 1
    }
    console.log(`• ${name}: ${existing} present, added ${added} new`)
    return
  }

  console.log(`• ${name}: ${existing} rows present — skipping`)
}

async function seedSettings() {
  if (fresh) await SiteSettings.deleteMany({})
  const existing = await SiteSettings.findOne({ key: 'site' })
  if (!existing) {
    await SiteSettings.create(siteSettings)
    console.log('• SiteSettings: created')
    return
  }
  // Backfill only fields that don't exist yet — never overwrite edited values.
  let touched = 0
  const backfillBrand = ['domain', 'googleReview']
  for (const k of backfillBrand) {
    if (!existing.brand?.[k] && siteSettings.brand[k]) {
      existing.brand[k] = siteSettings.brand[k]
      touched += 1
    }
  }
  // One-time correction: replace the old contact number if it hasn't been
  // changed away from the previous default.
  if (existing.brand?.whatsapp === '917617482996') {
    existing.brand.whatsapp = siteSettings.brand.whatsapp
    touched += 1
  }
  if (existing.brand?.phone === '+91 76174 82996') {
    existing.brand.phone = siteSettings.brand.phone
    touched += 1
  }
  if (!existing.commitments?.length && siteSettings.commitments?.length) {
    existing.commitments = siteSettings.commitments
    touched += 1
  }
  if (!existing.seo?.serviceAreas?.length && siteSettings.seo.serviceAreas?.length) {
    existing.seo = { ...(existing.seo?.toObject?.() ?? existing.seo ?? {}), serviceAreas: siteSettings.seo.serviceAreas }
    touched += 1
  }
  // Reset nav to the canonical primary set only if it still matches a known older
  // default (i.e. the owner hasn't customised it).
  const legacyNavShapes = [
    'Home,About,Services,Portfolio,Pricing,Blog,Contact',
    'Home,About,Services,Portfolio,Gallery,Pricing,Blog,Contact',
    'Services,Portfolio,Pricing,About,Contact',
    'Services,Portfolio,Pricing,About,Jobs,Contact',
  ]
  const currentNav = (existing.nav || []).map((n) => n.label).join(',')
  if (legacyNavShapes.includes(currentNav)) {
    existing.nav = siteSettings.nav
    touched += 1
  }
  if (touched) {
    existing.markModified('brand')
    existing.markModified('nav')
    existing.markModified('seo')
    await existing.save()
    console.log(`• SiteSettings: backfilled ${touched} field(s)`)
  } else {
    console.log('• SiteSettings: present — nothing to backfill')
  }
}

async function seedReviews() {
  if (fresh) await Review.deleteMany({})
  if (!content.reviews?.length) return
  const existing = await Review.countDocuments()
  if (existing > 0) {
    console.log(`• Review: ${existing} present — skipping`)
    return
  }
  await Review.insertMany(content.reviews)
  console.log(`• Review: inserted ${content.reviews.length}`)
}

async function main() {
  await connectDb()
  console.log(`Seeding${fresh ? ' (fresh)' : ''}…`)
  await ensureAdmin()
  await seedSettings()
  for (const group of groups) {
    // eslint-disable-next-line no-await-in-loop
    await seedGroup(group)
  }
  await seedReviews()
  console.log('Done.')
  await disconnectDb()
}

main().catch(async (err) => {
  console.error(err)
  await disconnectDb()
  process.exit(1)
})
