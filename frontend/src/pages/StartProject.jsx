import { PageHero, HireMe } from '../components/PageParts'
import { SectionHeading } from '../components/Atoms'
import Seo from '../components/Seo'
import ApplicationForm from '../components/ApplicationForm'
import { useSite } from '../content/ContentContext'

export default function StartProject() {
  const site = useSite()
  const commitments = site.commitments || []

  return (
    <>
      <Seo
        title="Start a project"
        path="/start-project"
        description="Send a project brief to BS Innovation Solutions — website, web app or AI build. Fixed price agreed upfront, delivered on a timeline, no hidden charges."
      />
      <PageHero
        eyebrow="Start a project"
        title="Send a brief. Get an honest plan and a fixed quote."
        description="This form goes straight to Bhuvneshwar. You'll get a reply within a day with a recommended approach, a timeline and a single fixed price — no obligation."
      />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-14">
        <div>
          <ApplicationForm kind="project" />
        </div>
        <aside className="flex flex-col gap-4">
          {commitments.map((c) => (
            <div key={c.title} className="border border-line rounded-2xl p-5 bg-white">
              <p className="font-display font-semibold text-ink">{c.title}</p>
              <p className="text-sm text-slate leading-relaxed mt-1.5">{c.description}</p>
            </div>
          ))}
        </aside>
      </section>

      <section className="bg-paper-dim py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Prefer to just talk first?"
            title="A quick message works too."
            description="If you're not ready for a full brief, the contact page has a short form and direct WhatsApp / email."
          />
        </div>
      </section>

      <HireMe />
    </>
  )
}
