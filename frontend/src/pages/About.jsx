import { m } from 'framer-motion'
import { PageHero, CTASection, HireMe } from '../components/PageParts'
import { SectionHeading, Eyebrow } from '../components/Atoms'
import Seo from '../components/Seo'
import DevIllustration from '../components/DevIllustration'
import { useContent, useSite } from '../content/ContentContext'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' } }),
}

export default function About() {
  const site = useSite()
  const { techStack, timeline, coreValues } = useContent()
  const about = site.about || {}
  const brand = site.brand || {}

  return (
    <>
      <Seo
        title="About"
        path="/about"
        description={about.heroDescription}
      />
      <PageHero
        eyebrow={`About ${brand.name || 'BS Innovation Solutions'}`}
        title={about.heroTitle || 'A one-person studio, built like a full team.'}
        description={about.heroDescription}
      />

      {/* STORY */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-24 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <Eyebrow>{about.storyEyebrow || 'The story'}</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mt-3">
            {about.storyTitle || 'Why this studio exists'}
          </h2>
          <div className="text-slate text-[15px] leading-relaxed mt-5 space-y-4">
            {(about.storyParagraphs || []).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        {about.image ? (
          <img
            src={about.image}
            alt={`${brand.founder || 'Bhuvneshwar Sharma'}, founder`}
            className="w-full rounded-2xl object-cover aspect-[4/5]"
          />
        ) : (
          <div className="rounded-2xl border border-line bg-paper-dim p-5 sm:p-7">
            <DevIllustration variant="workspace" className="w-full h-auto" />
          </div>
        )}
      </section>

      {/* MISSION & VISION */}
      <section className="bg-paper-dim py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 gap-6">
          <div className="bg-white border border-line rounded-2xl p-8">
            <Eyebrow>Mission</Eyebrow>
            <p className="font-display text-xl font-semibold mt-3 leading-snug">{about.mission}</p>
          </div>
          <div className="bg-white border border-line rounded-2xl p-8">
            <Eyebrow>Vision</Eyebrow>
            <p className="font-display text-xl font-semibold mt-3 leading-snug">{about.vision}</p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      {timeline.length > 0 && (
        <section className="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <SectionHeading eyebrow="Timeline" title="How this studio came together" align="center" />
          <div className="mt-14 flex flex-col">
            {timeline.map((item, i) => (
              <m.div
                key={item.id || item.title}
                custom={i}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="grid grid-cols-[70px_1fr] sm:grid-cols-[100px_1fr] gap-4 sm:gap-8 pb-10 relative"
              >
                <div className="relative">
                  <p className="font-mono text-sm text-marigold-dark pt-0.5">{item.year}</p>
                  {i !== timeline.length - 1 && (
                    <span className="absolute left-1/2 top-6 bottom-[-2.5rem] w-px bg-line -translate-x-1/2 hidden sm:block" />
                  )}
                </div>
                <div className="border-l border-line pl-6 sm:border-none sm:pl-0">
                  <h3 className="font-display font-semibold text-ink">{item.title}</h3>
                  <p className="text-sm text-slate leading-relaxed mt-1.5">{item.text}</p>
                </div>
              </m.div>
            ))}
          </div>
        </section>
      )}

      {/* CORE VALUES */}
      {coreValues.length > 0 && (
        <section className="bg-ink text-paper py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <SectionHeading tone="dark" eyebrow="Core values" title="What every project is held to" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {coreValues.map((v, i) => (
                <m.div
                  key={v.id || v.title}
                  custom={i}
                  initial="hidden"
                  animate="show"
                  variants={fadeUp}
                  className="border-t border-white/15 pt-5"
                >
                  <h3 className="font-display font-semibold">{v.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed mt-2">{v.description}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SKILLS & TECH */}
      {techStack.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <SectionHeading eyebrow="Skills & expertise" title="Technologies used day to day" align="center" />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-12">
            {techStack.map((t) => (
              <div key={t.id || t.name} className="border border-line rounded-xl p-5 text-center">
                <p className="font-display text-sm font-semibold">{t.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate mt-1">{t.note}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WHY TRUST */}
      <section className="bg-paper-dim py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <SectionHeading
            eyebrow={`Why clients trust ${brand.short || 'BS Innovation'}`}
            title={about.trustTitle || 'Nothing outsourced, nothing templated'}
            align="center"
            description={about.trustDescription}
          />
        </div>
      </section>

      <HireMe dark />

      <CTASection
        title="Ready to work together?"
        description="Whether it's a full website or a five-minute digital task, tell me what you need and I'll tell you honestly whether — and how — I can help."
      />
    </>
  )
}
