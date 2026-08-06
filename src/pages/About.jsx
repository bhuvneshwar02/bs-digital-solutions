import { motion } from 'framer-motion'
import { PageHero, CTASection } from '../components/PageParts'
import { SectionHeading, Eyebrow } from '../components/Atoms'
import MediaSlot from '../components/MediaSlot'
import { techStack, brand } from '../data/site'
import founderPhoto from '../assets/founder-photo.png'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' } }),
}

const timeline = [
  { year: '2021', title: 'Started B.Tech in Information Technology', text: 'Began formal study at Dr. A.P.J. Abdul Kalam Technical University, building a foundation in computer science and web development.' },
  { year: '2024', title: 'Product Support Engineer, Samsung ASC', text: 'Worked hands-on with technical support and customer-facing problem solving — the same instinct for clear, working solutions now shapes every client project.' },
  { year: '2025', title: 'B.Tech completed', text: 'Graduated in Information Technology, with a portfolio of live full-stack projects already shipped.' },
  { year: '2025', title: 'Joined Dheeraj Singh Consultancy', text: 'Started as an intern, then moved full-time as a Full Stack Developer and Technical Support Engineer, building the firm\'s consultancy portal.' },
  { year: '2026', title: 'BS Digital Solutions', text: 'Opened up full-stack and AI development, alongside everyday digital support, to clients directly — from businesses to temples to individuals.' },
]

const values = [
  { t: 'Say what it costs, upfront', d: 'No vague quotes. You know the price and timeline before work begins.' },
  { t: 'Build it to last', d: 'Clean, maintainable code — not something that breaks the moment you ask for a small change.' },
  { t: 'Explain, don\'t just deliver', d: 'You should understand what was built and why, not just receive a login.' },
  { t: 'Small requests matter too', d: 'A Gmail account setup gets the same care as a full web application.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About BS Digital Solutions"
        title="A one-person studio, built like a full team."
        description={`Founded by ${brand.founder}, BS Digital Solutions exists because most small businesses and institutions don't need a big agency — they need one person who can actually build the thing, explain it clearly, and stick around after launch.`}
      />

      {/* STORY */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-24 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <Eyebrow>The story</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mt-3">
            Why BS Digital exists
          </h2>
          <div className="text-slate text-[15px] leading-relaxed mt-5 space-y-4">
            <p>
              Most of the businesses, schools and institutions that need a website the most — a local
              consultancy, a temple trust, an alumni committee — are the ones least served by big agencies,
              who quote high and disappear after the invoice clears.
            </p>
            <p>
              BS Digital Solutions started from the opposite end: build production-grade software — the
              same MERN-stack applications, payment integrations and dashboards a large agency would deliver
              — but stay small enough to talk directly to every client, and stay around long after launch.
            </p>
            <p>
              What began as individual projects — a consultancy portal, an alumni reunion platform, a temple
              website — has grown into a full digital practice covering web development, AI applications and
              the everyday digital tasks people rarely find a dedicated freelancer for.
            </p>
          </div>
        </div>
        <img src={founderPhoto} alt="Founder working / workspace photo" ratio="aspect-[4/5]" />
      </section>

      {/* MISSION & VISION */}
      <section className="bg-paper-dim py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 gap-6">
          <div className="bg-white border border-line rounded-2xl p-8">
            <Eyebrow>Mission</Eyebrow>
            <p className="font-display text-xl font-semibold mt-3 leading-snug">
              Help businesses grow with modern websites, web applications and AI solutions.
            </p>
          </div>
          <div className="bg-white border border-line rounded-2xl p-8">
            <Eyebrow>Vision</Eyebrow>
            <p className="font-display text-xl font-semibold mt-3 leading-snug">
              Become the default freelancer people search for — for any digital work, not just websites.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <SectionHeading eyebrow="Timeline" title="How this studio came together" align="center" />
        <div className="mt-14 flex flex-col">
          {timeline.map((item, i) => (
            <motion.div
              key={item.title}
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-ink text-paper py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <SectionHeading eyebrow="Core values" title="What every project is held to" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((v, i) => (
              <motion.div key={v.t} custom={i} initial="hidden" animate="show" variants={fadeUp} className="border-t border-white/15 pt-5">
                <h3 className="font-display font-semibold">{v.t}</h3>
                <p className="text-sm text-white/55 leading-relaxed mt-2">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS & TECH */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <SectionHeading eyebrow="Skills & expertise" title="Technologies used day to day" align="center" />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-12">
          {techStack.map((t) => (
            <div key={t.name} className="border border-line rounded-xl p-5 text-center">
              <p className="font-display text-sm font-semibold">{t.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate mt-1">{t.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY TRUST */}
      <section className="bg-paper-dim py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <SectionHeading
            eyebrow="Why clients trust BS Digital"
            title="Nothing outsourced, nothing templated"
            align="center"
            description="Every project on the portfolio was designed, built and deployed personally — there's no subcontracted team behind the name, and no recycled template underneath the design."
          />
        </div>
      </section>

      <CTASection
        title="Ready to work together?"
        description="Whether it's a full website or a five-minute digital task, tell me what you need and I'll tell you honestly whether — and how — I can help."
      />
    </>
  )
}
