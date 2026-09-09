import { m } from 'framer-motion'
import { PageHero, CTASection, Commitments } from '../components/PageParts'
import { SectionHeading, PrimaryButton, GhostButton } from '../components/Atoms'
import Seo from '../components/Seo'
import { useContent } from '../content/ContentContext'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: (i % 4) * 0.07, ease: 'easeOut' } }),
}

function PlanCard({ plan, i, accent = 'marigold' }) {
  const featured = plan.highlighted
  const ring = accent === 'teal' ? 'ring-teal' : 'ring-marigold'
  const badge = accent === 'teal' ? 'bg-teal text-paper' : 'bg-marigold text-ink'
  const check = accent === 'teal' ? 'text-teal' : 'text-marigold-dark'

  return (
    <m.div
      custom={i}
      initial="hidden"
      animate="show"
      variants={fadeUp}
      className={`relative flex flex-col rounded-2xl p-7 border transition-shadow ${
        featured
          ? `bg-white border-transparent ring-2 ${ring} shadow-[0_12px_40px_rgba(18,23,43,0.10)] lg:-translate-y-2`
          : 'bg-white border-line hover:shadow-[0_6px_24px_rgba(18,23,43,0.06)]'
      }`}
    >
      {featured && (
        <span
          className={`absolute -top-3 left-7 font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full ${badge}`}
        >
          Most popular
        </span>
      )}
      <h3 className="font-display text-lg font-semibold text-ink">{plan.name}</h3>
      <p className="text-sm mt-2 leading-relaxed text-slate min-h-[40px]">{plan.description}</p>
      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="font-display text-[2rem] font-semibold text-ink leading-none">{plan.price}</span>
        <span className="font-mono text-[11px] text-slate">{plan.unit}</span>
      </div>
      <ul className="flex flex-col gap-2.5 mt-6 flex-1">
        {(plan.features || []).map((f) => (
          <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-ink/75">
            <span className={`${check} shrink-0`}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-7">
        {featured ? (
          <PrimaryButton to="/start-project" className="w-full">
            Get started
          </PrimaryButton>
        ) : (
          <GhostButton to="/start-project" className="w-full">
            Get started
          </GhostButton>
        )}
      </div>
    </m.div>
  )
}

export default function Pricing() {
  const { pricingPlans, pricingAddons, faqs } = useContent()
  const builds = pricingPlans.filter((p) => (p.group || 'build') === 'build')
  const care = pricingPlans.filter((p) => p.group === 'care')

  return (
    <>
      <Seo
        title="Pricing"
        path="/pricing"
        description="Transparent website, web-app and monthly care pricing from BS Innovation Solutions. Fixed quote agreed before work starts — no hidden platform fees or surprise charges."
      />
      <PageHero
        eyebrow="Pricing"
        title="Real numbers, agreed before we start."
        description="Every project is a single fixed price you approve upfront. Monthly care and day-to-day operations plans are listed too — prices in INR, GST extra where applicable."
      />

      {/* BUILD PLANS */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Project builds"
          title="One-time builds"
          description="Pick the closest fit — the final quote is confirmed in writing after a short call."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {builds.map((plan, i) => (
            <PlanCard key={plan.id || plan.name} plan={plan} i={i} accent="marigold" />
          ))}
        </div>
        <p className="text-center font-mono text-[11px] uppercase tracking-wider text-slate mt-10">
          Prices in INR · GST extra where applicable · Custom scopes quoted separately
        </p>
      </section>

      {/* CARE PLANS */}
      {care.length > 0 && (
        <section className="bg-paper-dim py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionHeading
              eyebrow="Care & operations"
              title="Monthly plans — once it's live"
              description="Keep the site healthy, keep content fresh, or hand over the day-to-day digital work entirely. Cancel any time."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
              {care.map((plan, i) => (
                <PlanCard key={plan.id || plan.name} plan={plan} i={i} accent="teal" />
              ))}
            </div>
          </div>
        </section>
      )}

      <Commitments dark />

      {/* ADD-ONS */}
      {pricingAddons.length > 0 && (
        <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <SectionHeading eyebrow="Add-ons" title="Add to any plan" align="center" />
          <div className="grid sm:grid-cols-2 gap-3 mt-10">
            {pricingAddons.map((a) => (
              <div
                key={a.id || a.name}
                className="bg-white border border-line rounded-xl px-5 py-4 flex items-center justify-between gap-3"
              >
                <span className="font-display text-sm font-semibold text-ink">{a.name}</span>
                <span className="font-mono text-[12px] text-teal shrink-0">{a.price}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-paper-dim py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <SectionHeading eyebrow="Common questions" title="Before you choose a plan" align="center" />
            <div className="mt-10 flex flex-col divide-y divide-line border-t border-b border-line">
              {faqs.slice(0, 4).map((item) => (
                <details key={item.id || item.q} className="group py-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-display font-semibold text-ink">
                    {item.q}
                    <span className="font-mono text-marigold-dark group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-slate leading-relaxed pt-3">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        eyebrow="Not sure which plan fits?"
        title="Send a short brief — you'll get an honest recommendation."
        description="If your project sits between two plans, or doesn't fit any of them, I'll tell you which is the right fit rather than upselling."
      />
    </>
  )
}
