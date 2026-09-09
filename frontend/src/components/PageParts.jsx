import { motion } from 'framer-motion'
import { Eyebrow, PrimaryButton, GhostButton, StatusTag } from './Atoms'
import { useSite } from '../content/ContentContext'

export function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="bg-ink text-paper bp-grid relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-marigold font-medium">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-4 leading-[1.05]">
            {title}
          </h1>
          {description && <p className="text-white/60 text-base sm:text-lg leading-relaxed mt-6 max-w-2xl">{description}</p>}
          {children}
        </motion.div>
      </div>
    </section>
  )
}

export function CTASection({
  eyebrow = 'Let’s build it',
  title = 'Have a project in mind? Let’s get it live.',
  description = "Tell me what you're trying to build or fix — a website, a dashboard, an AI tool, or a small digital task — and I'll get back to you within a day.",
}) {
  const site = useSite()
  const whatsapp = site.brand?.whatsapp
  return (
    <section className="bg-ink text-paper bp-grid relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-24 text-center relative z-10">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-4 max-w-3xl mx-auto leading-tight">
          {title}
        </h2>
        <p className="text-white/60 text-base leading-relaxed mt-5 max-w-xl mx-auto">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-9">
          <PrimaryButton to="/start-project">Start a project</PrimaryButton>
          {whatsapp && (
            <GhostButton dark href={`https://wa.me/${whatsapp}`}>
              Chat on WhatsApp
            </GhostButton>
          )}
        </div>
        <div className="mt-8">
          <StatusTag>Replies within 24 hours</StatusTag>
        </div>
      </div>
    </section>
  )
}

// "Delivered on time · fixed price · no hidden charges" — editable via settings.
export function Commitments({ dark = false }) {
  const site = useSite()
  const items = site.commitments || []
  if (!items.length) return null
  return (
    <section className={`${dark ? 'bg-ink text-paper' : 'bg-white'} py-16 sm:py-20`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Eyebrow>How I work</Eyebrow>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mt-3">
          Timely delivery, a fixed price, and no hidden charges.
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          {items.map((c, i) => (
            <div key={c.title} className={`border-t pt-5 ${dark ? 'border-white/15' : 'border-line'}`}>
              <span className="font-mono text-xs text-marigold-dark">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display font-semibold mt-2">{c.title}</h3>
              <p className={`text-sm leading-relaxed mt-2 ${dark ? 'text-white/55' : 'text-slate'}`}>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Freelancer / "hire me" callout, driven by editable site settings.
export function HireMe({ dark = false }) {
  const site = useSite()
  const h = site.hireMe || {}
  const whatsapp = site.brand?.whatsapp
  const wrap = dark ? 'bg-ink text-paper' : 'bg-paper-dim'
  return (
    <section className={`${wrap} py-16 sm:py-20`}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className={`rounded-3xl border p-8 sm:p-10 ${dark ? 'border-white/15' : 'border-line bg-white'}`}>
          <Eyebrow>{h.eyebrow || 'Freelance / hire me'}</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mt-3 leading-snug">
            {h.title || 'Open for freelance digital work'}
          </h2>
          <p className={`text-[15px] leading-relaxed mt-4 max-w-2xl ${dark ? 'text-white/60' : 'text-slate'}`}>
            {h.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-7">
            <PrimaryButton to="/contact">{h.ctaLabel || 'Hire me for a project'}</PrimaryButton>
            {whatsapp && (
              <GhostButton dark={dark} href={`https://wa.me/${whatsapp}`}>
                Message on WhatsApp
              </GhostButton>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
