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
} from '../models/index.js'
import * as content from './data/content.js'
import { siteSettings } from './data/site.js'

const fresh = process.argv.includes('--fresh')

const withOrder = (rows) => rows.map((row, i) => ({ ...row, order: i, published: true }))

const groups = [
  { Model: ServiceCategory, rows: content.serviceCategories },
  { Model: Service, rows: content.services },
  { Model: Project, rows: content.portfolio },
  { Model: BlogPost, rows: content.blog },
  { Model: PricingPlan, rows: content.pricingPlans },
  { Model: PricingAddon, rows: content.pricingAddons },
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

async function seedGroup({ Model, rows }) {
  const name = Model.modelName
  if (fresh) await Model.deleteMany({})
  const existing = await Model.countDocuments()
  if (existing > 0) {
    console.log(`• ${name}: ${existing} rows present — skipping`)
    return
  }
  await Model.insertMany(withOrder(rows))
  console.log(`• ${name}: inserted ${rows.length}`)
}

async function seedSettings() {
  if (fresh) await SiteSettings.deleteMany({})
  const existing = await SiteSettings.findOne({ key: 'site' })
  if (existing) {
    console.log('• SiteSettings: present — skipping')
    return
  }
  await SiteSettings.create(siteSettings)
  console.log('• SiteSettings: created')
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
  console.log('Done.')
  await disconnectDb()
}

main().catch(async (err) => {
  console.error(err)
  await disconnectDb()
  process.exit(1)
})
