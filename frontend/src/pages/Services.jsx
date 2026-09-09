import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageHero, CTASection } from '../components/PageParts'
import { useContent } from '../content/ContentContext'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: (i % 6) * 0.06, ease: 'easeOut' } }),
}

export default function Services() {
  const { services, serviceCategories } = useContent()
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? services : services.filter((s) => s.category === active)

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Any kind of digital work — scoped, priced and shipped."
        description="From a full business website to setting up a Gmail account correctly, here's the complete list of what BS Innovation Solutions handles. If your need isn't listed, ask anyway — most digital work fits somewhere in here."
      />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActive('all')}
            className={`font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-full border transition-colors ${
              active === 'all' ? 'bg-ink text-paper border-ink' : 'border-line text-slate hover:border-ink/40'
            }`}
          >
            All services
          </button>
          {serviceCategories.map((c) => (
            <button
              key={c.key || c.id}
              onClick={() => setActive(c.key)}
              className={`font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-full border transition-colors ${
                active === c.key ? 'bg-ink text-paper border-ink' : 'border-line text-slate hover:border-ink/40'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s, i) => (
            <motion.div key={s.slug} custom={i} initial="hidden" animate="show" variants={fadeUp}>
              <Link
                to={`/services/${s.slug}`}
                className="group flex flex-col h-full bg-white border border-line rounded-2xl p-6 hover:border-ink/30 hover:shadow-[0_4px_24px_rgba(18,23,43,0.06)] transition-all duration-200"
              >
                {s.image && (
                  <div className="overflow-hidden rounded-2xl mb-4 h-40 w-full">
                    <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-teal tracking-widest">{s.tag}</span>
                  <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink/40 group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-colors">
                    →
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mt-4">{s.title}</h3>
                <p className="text-sm text-slate leading-relaxed mt-2 flex-1">{s.short}</p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-line">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate">{s.timeline}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Don't see your exact need?"
        title="If it's digital, it's probably in scope."
        description="Message with what you're trying to do — even if it doesn't fit neatly into a service name above."
      />
    </>
  )
}
