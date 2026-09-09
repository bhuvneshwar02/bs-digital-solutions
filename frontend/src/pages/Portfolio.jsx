import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageHero, CTASection } from '../components/PageParts'
import Seo from '../components/Seo'
import MediaSlot from '../components/MediaSlot'
import { Tag } from '../components/Atoms'
import { useContent } from '../content/ContentContext'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: (i % 6) * 0.06, ease: 'easeOut' } }),
}

export default function Portfolio() {
  const { portfolio } = useContent()

  return (
    <>
      <Seo
        title="Portfolio"
        path="/portfolio"
        description="Live websites, web apps and AI projects built end-to-end by BS Innovation Solutions — event platforms, healthcare sites, e-commerce, consultancy portals and RAG apps."
      />
      <PageHero
        eyebrow="Portfolio"
        title={`${portfolio.length || ''} live projects. Real clients, real deadlines.`.trim()}
        description="Every project below was designed, built and deployed end-to-end — from an alumni reunion platform to an AI health assistant. Each one links to a full case study."
      />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((p, i) => (
            <motion.div key={p.slug} custom={i} initial="hidden" animate="show" variants={fadeUp}>
              <Link to={`/portfolio/${p.slug}`} className="group block">
                {p.image ? (
                  <div className="overflow-hidden rounded-[28px] mb-4 aspect-[16/10]">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <MediaSlot label={p.title} className="mb-4" />
                )}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-teal">
                      {p.category} · {p.year}
                    </p>
                    <h3 className="font-display text-lg font-semibold mt-1 group-hover:text-marigold-dark transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate leading-relaxed mt-2">{p.summary}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {(p.stack || []).slice(0, 3).map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Your project could be next"
        title="Have something similar in mind?"
        description="Every case study above started as a short conversation about the problem, not the technology. Start with yours."
      />
    </>
  )
}
