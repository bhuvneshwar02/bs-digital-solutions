import { PageHero } from '../components/PageParts'
import { useSite } from '../content/ContentContext'

const buildSections = (brand) => [
  {
    h: 'What information is collected',
    p: 'When you use the contact form or reach out via email or WhatsApp, information you choose to share is collected — such as your name, email address, phone number and project details. No information is collected silently or without your action.',
  },
  {
    h: 'How information is used',
    p: 'Information shared is used only to respond to your enquiry, scope a project, and — if you become a client — to deliver and maintain the agreed work. It is not sold, rented or shared with third parties for marketing.',
  },
  {
    h: 'Cookies & analytics',
    p: 'This site may use basic, privacy-respecting analytics to understand which pages are useful, such as visit counts and general location by country. This data is aggregated and not used to identify individual visitors.',
  },
  {
    h: 'Third-party services',
    p: 'Contact form submissions are stored in a private database and may also be followed up by email or WhatsApp, which are subject to their own respective privacy policies. Payment processing for any project, where applicable, is handled by the relevant payment gateway, not stored on this site.',
  },
  {
    h: 'Data retention',
    p: 'Project-related information is retained for as long as reasonably needed to deliver and support the work, and is deleted or anonymised on request once a project concludes.',
  },
  {
    h: 'Your rights',
    p: 'You can request a copy of any information held about you, ask for it to be corrected, or ask for it to be deleted, at any time, by writing to the email address below.',
  },
  {
    h: 'Contact',
    p: `For any privacy-related question, write to ${brand.email || 'the email on the contact page'}.`,
  },
]

export default function Privacy() {
  const site = useSite()
  const sections = buildSections(site.brand || {})
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated: September 2026." />
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
