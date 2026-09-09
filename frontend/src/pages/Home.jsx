import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SectionHeading, StatusTag, PrimaryButton, GhostButton } from '../components/Atoms'
import { CTASection, HireMe, Commitments } from '../components/PageParts'
import Seo from '../components/Seo'
import DevIllustration from '../components/DevIllustration'
import ReviewsWall from '../components/ReviewsWall'
import { Stars } from '../components/Stars'
import { useContent, useSite } from '../content/ContentContext'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' } }),
}

const whyChoose = [
  { t: 'Direct communication', d: 'You talk to the developer building your site, not a rotating support inbox.' },
  { t: 'Production-grade code', d: 'Real MERN-stack applications with payments, dashboards and PDF generation — not template hacks.' },
  { t: 'Fast turnaround', d: 'Most business sites launch in under two weeks from the first call.' },
  { t: 'Support that continues', d: "Maintenance plans mean the relationship doesn't end at launch." },
]

export default function Home() {
  const site = useSite()
  const { services, portfolio, processSteps, techStack, reviews, faqs } = useContent()
  const hero = site.hero || {}
  const trustedBy = site.trustedBy || []

  return (
    <>
      <Seo path="/" />
      {/* HERO */}
      <section className="bg-ink text-paper bp-grid relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-20 sm:pt-28 sm:pb-28 relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              {hero.statusText && <StatusTag>{hero.statusText}</StatusTag>}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight mt-5 leading-[1.06]">
                {hero.titleLead || 'Digital work, done properly —'}
                <span className="text-marigold"> {hero.titleAccent}</span>
              </h1>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed mt-6 max-w-xl">{hero.description}</p>
              <div className="flex flex-wrap items-center gap-4 mt-9">
                <PrimaryButton to="/start-project">Start a project</PrimaryButton>
                <GhostButton dark to="/portfolio">
                  See the work
                </GhostButton>
              </div>
              {hero.stats?.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-12 pt-8 border-t border-white/10">
                  {hero.stats.map((s) => (
                    <div key={s.label}>
                      <p className="font-display text-2xl font-semibold text-marigold">{s.value}</p>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-white/45 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-4 sm:p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
                {hero.image ? (
                  <img
                    src={hero.image}
                    alt="A developer building a web application"
                    className="w-full rounded-xl object-cover aspect-[4/5]"
                  />
                ) : (
                  <DevIllustration variant="editor" className="w-full h-auto" />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      {trustedBy.length > 0 && (
        <section className="bg-paper-dim border-b border-line py-8">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <p className="font-mono text-[11px] uppercase tracking-widest text-slate text-center mb-6">
              Built &amp; trusted by
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {trustedBy.map((name) => (
                <span key={name} className="font-display text-sm sm:text-base text-ink/50 font-medium">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="What I do"
            title="Every kind of digital work, under one roof"
            description="Full websites and apps for businesses and institutions, plus the everyday digital tasks people search for a 'top freelancer' to handle."
          />
          <GhostButton to="/services" className="shrink-0">
            View all services
          </GhostButton>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(0, 9).map((s, i) => (
            <motion.div key={s.slug} custom={i} initial="hidden" animate="show" variants={fadeUp}>
              <Link
                to={`/services/${s.slug}`}
                className="group flex flex-col h-full bg-white border border-line rounded-2xl p-6 hover:border-ink/30 hover:shadow-[0_4px_24px_rgba(18,23,43,0.06)] transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-teal tracking-widest">{s.tag}</span>
                  <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink/40 group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-colors">
                    →
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mt-4 text-ink">{s.title}</h3>
                <p className="text-sm text-slate leading-relaxed mt-2">{s.short}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-ink text-paper py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            tone="dark"
            eyebrow="Why clients stick around"
            title="Not an agency with a queue. One developer who ships."
            description="No account managers, no hand-offs between teams — the person who scopes the project is the person who builds it."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.t}
                custom={i}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="border-t border-white/15 pt-5"
              >
                <h3 className="font-display text-base font-semibold">{item.t}</h3>
                <p className="text-sm text-white/55 leading-relaxed mt-2">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW I WORK */}
      <Commitments />

      {/* SUCCESS STORIES */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Success stories"
            title="Real projects, shipped and live"
            description="A sample of the sites and applications built end-to-end — from the first sketch to a working, deployed product."
          />
          <GhostButton to="/portfolio" className="shrink-0">
            View full portfolio
          </GhostButton>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.slice(0, 3).map((p, i) => (
            <motion.div key={p.slug} custom={i} initial="hidden" animate="show" variants={fadeUp}>
              <Link to={`/portfolio/${p.slug}`} className="group block">
                {p.image && (
                  <div className="overflow-hidden rounded-2xl mb-4 aspect-[16/10]">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-teal">{p.category}</p>
                    <h3 className="font-display text-lg font-semibold mt-1 group-hover:text-marigold-dark transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <span className="text-ink/30 group-hover:text-ink transition-colors">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      {processSteps.length > 0 && (
        <section className="bg-paper-dim py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionHeading
              eyebrow="Development process"
              title="A fixed six-step process, every project"
              description="The order matters — each step depends on the one before it, so nothing gets built on an unapproved assumption."
              align="center"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
              {processSteps.map((s, i) => (
                <motion.div
                  key={s.id || s.title}
                  custom={i}
                  initial="hidden"
                  animate="show"
                  variants={fadeUp}
                  className="bg-white border border-line rounded-2xl p-6"
                >
                  <span className="font-mono text-xs text-marigold-dark">{s.step}</span>
                  <h3 className="font-display text-lg font-semibold mt-2">{s.title}</h3>
                  <p className="text-sm text-slate leading-relaxed mt-2">{s.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TECH STACK */}
      {techStack.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <SectionHeading eyebrow="Technology stack" title="Built on tools that scale, not shortcuts" align="center" />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-14">
            {techStack.map((t) => (
              <div key={t.id || t.name} className="border border-line rounded-xl p-5 text-center bg-white">
                <p className="font-display text-sm font-semibold">{t.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate mt-1">{t.note}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* REVIEWS */}
      {reviews.items?.length > 0 && (
        <section className="bg-ink text-paper py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
              <div>
                <SectionHeading tone="dark" eyebrow="Reviews" title="What people say — in their words" />
                {reviews.count > 0 && (
                  <div className="flex items-center gap-3 mt-4">
                    <Stars value={reviews.average} size={18} />
                    <span className="font-display font-semibold">{reviews.average.toFixed(1)}</span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/45">
                      {reviews.count} review{reviews.count === 1 ? '' : 's'}
                    </span>
                  </div>
                )}
              </div>
              <GhostButton dark to="/reviews" className="shrink-0">
                Read all · leave a review
              </GhostButton>
            </div>
            <ReviewsWall reviews={reviews.items} dark limit={6} />
          </div>
        </section>
      )}

      {/* FAQ */}
      <HomeFAQ faqs={faqs} />

      <HireMe />

      <CTASection />
    </>
  )
}

function HomeFAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0)
  if (!faqs.length) return null
  return (
    <section className="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <SectionHeading eyebrow="FAQ" title="Questions clients ask before starting" align="center" />
      <div className="mt-12 flex flex-col divide-y divide-line border-t border-b border-line">
        {faqs.map((item, i) => (
          <div key={item.id || item.q}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="font-display font-semibold text-ink">{item.q}</span>
              <span className="font-mono text-lg text-marigold-dark shrink-0">{openIndex === i ? '−' : '+'}</span>
            </button>
            {openIndex === i && <p className="text-sm text-slate leading-relaxed pb-5 -mt-2">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
