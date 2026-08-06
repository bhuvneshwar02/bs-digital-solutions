import { useState } from 'react'
import { PageHero } from '../components/PageParts'
import { Eyebrow, PrimaryButton, GhostButton } from '../components/Atoms'
import { brand } from '../data/site'
import contact from '../assets/contact.png'

const projectTypes = [
  'Business website',
  'Portfolio website',
  'E-commerce store',
  'Admin dashboard',
  'AI chatbot / RAG app',
  'Everyday digital help',
  'Something else',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: projectTypes[0], message: '' })
  const [sent, setSent] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const mailtoHref = `mailto:${brand.email}?subject=${encodeURIComponent(
    `New enquiry — ${form.type}`
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nProject type: ${form.type}\n\n${form.message}`
  )}`

  const whatsappHref = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    `Hi, I'm ${form.name || '...'}. I'd like to talk about: ${form.type}.\n\n${form.message}`
  )}`

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell me what you need — I'll reply within a day."
        description="Whether it's a full website, an AI tool, or a five-minute digital task like setting up a Gmail account, fill in the form or reach out directly below."
      />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-14">
        <div>
          {!sent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full name" required>
                  <input
                    required
                    value={form.name}
                    onChange={update('name')}
                    className="w-full bg-white border border-line rounded-xl px-4 py-3 text-sm focus:border-ink outline-none"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    className="w-full bg-white border border-line rounded-xl px-4 py-3 text-sm focus:border-ink outline-none"
                    placeholder="you@email.com"
                  />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Phone / WhatsApp">
                  <input
                    value={form.phone}
                    onChange={update('phone')}
                    className="w-full bg-white border border-line rounded-xl px-4 py-3 text-sm focus:border-ink outline-none"
                    placeholder="+91"
                  />
                </Field>
                <Field label="What do you need?">
                  <select
                    value={form.type}
                    onChange={update('type')}
                    className="w-full bg-white border border-line rounded-xl px-4 py-3 text-sm focus:border-ink outline-none"
                  >
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Project details" required>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  className="w-full bg-white border border-line rounded-xl px-4 py-3 text-sm focus:border-ink outline-none resize-none"
                  placeholder="Tell me a bit about what you're trying to build or fix..."
                />
              </Field>
              <div className="flex flex-wrap gap-4 mt-2">
                <PrimaryButton type="submit">Send enquiry</PrimaryButton>
              </div>
              <p className="font-mono text-[11px] text-slate">
                Submitting opens your email or WhatsApp with this pre-filled — nothing is sent silently.
              </p>
            </form>
          ) : (
            <div className="border border-line rounded-2xl p-8">
              <Eyebrow>Almost there</Eyebrow>
              <h3 className="font-display text-xl font-semibold mt-3">Choose how to send this</h3>
              <p className="text-sm text-slate leading-relaxed mt-2">
                Pick whichever is easier — both are pre-filled with what you entered.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <PrimaryButton href={mailtoHref}>Send via Email</PrimaryButton>
                <GhostButton href={whatsappHref}>Send via WhatsApp</GhostButton>
              </div>
              <button onClick={() => setSent(false)} className="font-mono text-[11px] uppercase tracking-wider text-slate mt-6 underline underline-offset-4">
                Edit details
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <img src={contact} alt="Contact / office photo" ratio="aspect-[4/3]" />
          <div className="border border-line rounded-2xl p-6 flex flex-col gap-5">
            <ContactRow label="Email" value={brand.email} href={`mailto:${brand.email}`} />
            <ContactRow label="Phone / WhatsApp" value={brand.phone} href={`https://wa.me/${brand.whatsapp}`} />
            <ContactRow label="Location" value={brand.location} />
            <ContactRow label="LinkedIn" value="bhuvneshwar02" href={brand.linkedin} />
            <ContactRow label="GitHub" value="bhuvneshwar02" href={brand.github} />
          </div>
          <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg aspect-[4/3]">
            <iframe
              title="Rampur Location"
              src="https://www.google.com/maps?q=Rampur,+Uttar+Pradesh,+India&output=embed"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ label, required, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-wider text-slate">
        {label} {required && <span className="text-marigold-dark">*</span>}
      </span>
      {children}
    </label>
  )
}

function ContactRow({ label, value, href }) {
  const content = (
    <>
      <p className="font-mono text-[10px] uppercase tracking-wider text-slate">{label}</p>
      <p className="font-display text-sm font-semibold mt-1 text-ink">{value}</p>
    </>
  )
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block hover:text-marigold-dark transition-colors">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  )
}
