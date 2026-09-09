import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eyebrow, Tag, PrimaryButton, GhostButton } from '../components/Atoms'
import { CTASection } from '../components/PageParts'
import MediaSlot from '../components/MediaSlot'
import { useContent, useSite } from '../content/ContentContext'

export default function ServiceDetail() {
  const { slug } = useParams()
  const site = useSite()
  const { services, loading } = useContent()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    if (loading) return <div className="max-w-5xl mx-auto px-5 py-24 font-mono text-sm text-slate">Loading…</div>
    return <Navigate to="/services" replace />
  }

  const whatsapp = site.brand?.whatsapp
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3)

  return (
    <>
      <section className="bg-ink text-paper bp-grid">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20">
          <Link to="/services" className="font-mono text-[11px] uppercase tracking-wider text-white/50 hover:text-marigold">
            ← All services
          </Link>
          <div className="mt-6">
            <span className="font-mono text-[11px] uppercase tracking-widest text-marigold">{service.tag}</span>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-3 leading-tight max-w-2xl"
            >
              {service.title}
            </motion.h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mt-5 max-w-xl">{service.short}</p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <PrimaryButton to="/contact">Enquire about this service</PrimaryButton>
              {whatsapp && (
                <GhostButton dark href={`https://wa.me/${whatsapp}`}>
                  WhatsApp instead
                </GhostButton>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-[1.3fr_0.9fr] gap-12">
          <div>
            <Eyebrow>Overview</Eyebrow>
            <p className="text-ink text-[15px] leading-relaxed mt-3">{service.description}</p>

            <div className="mt-8">
              <Eyebrow>What&apos;s included</Eyebrow>
            </div>
            <ul className="mt-3 flex flex-col gap-3">
              {(service.features || []).map((f) => (
                <li key={f} className="flex gap-3 text-[15px] text-ink/80 leading-relaxed">
                  <span className="text-teal shrink-0 font-mono">→</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              {service.image ? (
                <div className="overflow-hidden rounded-2xl aspect-[16/9]">
                  <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
                </div>
              ) : (
                <MediaSlot label={`${service.title} — sample screenshot`} />
              )}
            </div>
          </div>

          <aside className="flex flex-col gap-5">
            <div className="border border-line rounded-2xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate">Typical timeline</p>
              <p className="font-display text-xl font-semibold mt-2">{service.timeline}</p>
            </div>
            {service.idealFor?.length > 0 && (
              <div className="border border-line rounded-2xl p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-slate mb-3">Best for</p>
                <div className="flex flex-wrap gap-2">
                  {service.idealFor.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            )}
            <Link to="/pricing" className="border border-line rounded-2xl p-6 hover:border-ink/30 transition-colors">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate">Pricing</p>
              <p className="font-display text-base font-semibold mt-2">See plans &amp; pricing →</p>
            </Link>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-paper-dim py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <Eyebrow>Related services</Eyebrow>
            <div className="grid sm:grid-cols-3 gap-5 mt-6">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="bg-white border border-line rounded-2xl p-5 hover:border-ink/30 transition-colors"
                >
                  <span className="font-mono text-[10px] text-teal tracking-widest">{s.tag}</span>
                  <h3 className="font-display font-semibold mt-2">{s.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}
