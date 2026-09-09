import { motion } from 'framer-motion'
import { PageHero, CTASection, Commitments } from '../components/PageParts'
import { SectionHeading, PrimaryButton, GhostButton } from '../components/Atoms'
import Seo from '../components/Seo'
import { useContent } from '../content/ContentContext'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' } }),
}

export default function Pricing() {
  const { pricingPlans, pricingAddons, faqs } = useContent()

  return (
    <>
      <Seo
        title="Pricing"
        path="/pricing"
        description="Transparent website and web-app pricing from BS Innovation Solutions. Fixed quote agreed before work starts, no hidden platform fees or surprise charges."
      />
      <PageHero
        eyebrow="Pricing"
        title="Clear pricing, no hidden platform fees."
        description="Four straightforward plans covering most projects. Every quote is confirmed in writing before work starts — this page is a starting point, not a final invoice."
      />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.id || plan.name}
              custom={i}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className={`flex flex-col rounded-2xl p-7 border ${
                plan.highlighted ? 'bg-ink text-paper border-ink relative' : 'bg-white border-line'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-7 bg-marigold text-ink font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
              <p className={`text-sm mt-2 leading-relaxed ${plan.highlighted ? 'text-white/60' : 'text-slate'}`}>
                {plan.description}
              </p>
              <div className="mt-6">
                <span className="font-display text-3xl font-semibold">{plan.price}</span>
                <span className={`font-mono text-[11px] ml-2 ${plan.highlighted ? 'text-white/50' : 'text-slate'}`}>
                  {plan.unit}
                </span>
              </div>
              <ul className="flex flex-col gap-2.5 mt-6 flex-1">
                {(plan.features || []).map((f) => (
                  <li
                    key={f}
                    className={`flex gap-2.5 text-sm leading-relaxed ${plan.highlighted ? 'text-white/75' : 'text-ink/75'}`}
                  >
                    <span className={plan.highlighted ? 'text-marigold' : 'text-teal'}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                {plan.highlighted ? (
                  <PrimaryButton to="/contact" className="w-full">
                    Choose this plan
                  </PrimaryButton>
                ) : (
                  <GhostButton to="/contact" className="w-full">
                    Choose this plan
                  </GhostButton>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center font-mono text-[11px] uppercase tracking-wider text-slate mt-10">
          Prices in INR · GST extra where applicable · Custom scopes quoted separately
        </p>
      </section>

      <Commitments dark />


      {pricingAddons.length > 0 && (
        <section className="bg-paper-dim py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <SectionHeading eyebrow="Add-ons" title="Common add-ons to any plan" align="center" />
            <div className="grid sm:grid-cols-3 gap-5 mt-10">
              {pricingAddons.map((a) => (
                <div
                  key={a.id || a.name}
                  className="bg-white border border-line rounded-xl p-5 flex items-center justify-between gap-3"
                >
                  <span className="font-display text-sm font-semibold">{a.name}</span>
                  <span className="font-mono text-[11px] text-teal shrink-0">{a.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <SectionHeading eyebrow="Common questions" title="Before you choose a plan" align="center" />
          <div className="mt-10 flex flex-col divide-y divide-line border-t border-b border-line">
            {faqs.slice(0, 3).map((item) => (
              <details key={item.id || item.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-display font-semibold text-ink">
                  {item.q}
                  <span className="font-mono text-marigold-dark group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-slate leading-relaxed pt-3">{item.a}</p>
              </details>
            ))}
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
