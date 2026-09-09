import { PageHero } from '../components/PageParts'
import { useSite } from '../content/ContentContext'

const buildSections = (brand) => [
  {
    h: 'Scope of work',
    p: 'Every project begins with an agreed scope, timeline and price, confirmed in writing before development starts. Work outside that agreed scope — additional pages, features or revisions beyond what was agreed — is quoted and billed separately.',
  },
  {
    h: 'Payment terms',
    p: 'Projects typically require an advance payment before work begins, with the balance due on delivery or in milestones for larger projects, as agreed per project. Ongoing maintenance and retainer plans are billed monthly in advance.',
  },
  {
    h: 'Revisions',
    p: 'Each plan includes a set number of revision rounds, listed on the Pricing page. Additional revisions beyond that are available at an hourly or per-request rate, quoted before the work is carried out.',
  },
  {
    h: 'Timelines',
    p: 'Timelines quoted are typical, not guaranteed, and depend on timely feedback and content (text, images, logo) being provided by the client. Delays in providing content will shift the delivery date accordingly.',
  },
  {
    h: 'Ownership',
    p: 'Once a project is paid in full, the client owns the final delivered code, content and design for that project. Any reusable components, internal tools or frameworks used to build it remain the property of BS Innovation Solutions.',
  },
  {
    h: 'Cancellation',
    p: 'A project may be cancelled by the client at any stage; work completed up to that point is billed and the advance payment is non-refundable, as it covers time already committed.',
  },
  {
    h: 'Third-party costs',
    p: 'Domain registration, hosting, SSL certificates, payment gateway fees and any paid plugins or APIs are billed at cost, separate from the development fee, unless explicitly included in the agreed scope.',
  },
  {
    h: 'Limitation of liability',
    p: "While every project is tested before launch, BS Innovation Solutions is not liable for losses arising from third-party service outages (hosting, payment gateways, domain registrars) outside of direct control.",
  },
  {
    h: 'Contact',
    p: `Questions about these terms can be sent to ${brand.email || 'the email on the contact page'}.`,
  },
]

export default function Terms() {
  const site = useSite()
  const sections = buildSections(site.brand || {})
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" description="Last updated: September 2026." />
      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-20 flex flex-col gap-10">
        {sections.map((s) => (
          <div key={s.h}>
            <h2 className="font-display text-xl font-semibold text-ink">{s.h}</h2>
            <p className="text-[15px] text-slate leading-relaxed mt-2">{s.p}</p>
          </div>
        ))}
      </section>
    </>
  )
}
