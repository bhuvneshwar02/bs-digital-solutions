import { useState } from 'react'
import { PageHero } from '../components/PageParts'
import { Eyebrow, PrimaryButton, GhostButton } from '../components/Atoms'
import Seo from '../components/Seo'
import { useSite } from '../content/ContentContext'
import { api, ApiError } from '../lib/api'

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
  const site = useSite()
  const brand = site.brand || {}

  const [form, setForm] = useState({ name: '', email: '', phone: '', type: projectTypes[0], message: '', company: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await api.post('/contact', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        type: form.type,
        message: form.message,
        company: form.company, // honeypot
      })
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err instanceof ApiError ? err.userMessage : 'Something went wrong — please email directly.')
    }
  }

  const whatsappHref = brand.whatsapp
    ? `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
        `Hi, I'm ${form.name || '...'}. I'd like to talk about: ${form.type}.\n\n${form.message}`,
      )}`
    : null

  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Get in touch with BS Innovation Solutions — Bhuvneshwar Sharma. Freelance web, app and AI developer, Rampur UP, working remotely across India and worldwide."
      />
      <PageHero
        eyebrow="Contact"
        title="Tell me what you need — I'll reply within a day."
        description="Whether it's a full website, an AI tool, or a five-minute digital task like setting up a Gmail account, fill in the form or reach out directly below."
      />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-14">
        <div>
          {status === 'sent' ? (
            <div className="border border-line rounded-2xl p-8">
              <Eyebrow>Message received</Eyebrow>
              <h3 className="font-display text-xl font-semibold mt-3">Thanks — your enquiry is in.</h3>
              <p className="text-sm text-slate leading-relaxed mt-2">
                I&apos;ll get back to you within a day, usually sooner. If it&apos;s urgent, WhatsApp or email is fastest.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                {whatsappHref && <PrimaryButton href={whatsappHref}>Message on WhatsApp</PrimaryButton>}
                {brand.email && <GhostButton href={`mailto:${brand.email}`}>Email instead</GhostButton>}
              </div>
              <button
                onClick={() => {
                  setForm({ name: '', email: '', phone: '', type: projectTypes[0], message: '', company: '' })
                  setStatus('idle')
                }}
                className="font-mono text-[11px] uppercase tracking-wider text-slate mt-6 underline underline-offset-4"
              >
                Send another
              </button>
            </div>
          ) : (
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

              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={update('company')}
                className="hidden"
                aria-hidden="true"
              />

              {status === 'error' && (
                <p className="text-sm text-marigold-dark bg-marigold/10 border border-marigold/30 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <div className="flex flex-wrap gap-4 mt-2 items-center">
                <PrimaryButton type="submit" className={status === 'sending' ? 'opacity-60 pointer-events-none' : ''}>
                  {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                </PrimaryButton>
                {whatsappHref && <GhostButton href={whatsappHref}>Or message on WhatsApp</GhostButton>}
              </div>
              <p className="font-mono text-[11px] text-slate">
                Your enquiry is stored securely and only used to reply to you.
              </p>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl bg-ink text-paper p-7">
            <p className="font-mono text-[11px] uppercase tracking-widest text-marigold">Let’s build something</p>
            <p className="font-display text-2xl font-semibold mt-2 leading-snug">
              Have a project in mind? I usually reply the same day.
            </p>
            <p className="text-white/55 text-sm leading-relaxed mt-3">
              Every project starts as a short conversation about the problem — not the technology. Tell me what you need
              and I’ll tell you honestly how I can help.
            </p>
          </div>
          <div className="border border-line rounded-2xl p-6 flex flex-col gap-5">
            {brand.email && <ContactRow label="Email" value={brand.email} href={`mailto:${brand.email}`} />}
            {brand.phone && (
              <ContactRow
                label="Phone / WhatsApp"
                value={brand.phone}
                href={brand.whatsapp ? `https://wa.me/${brand.whatsapp}` : undefined}
              />
            )}
            {brand.location && <ContactRow label="Location" value={brand.location} />}
            {brand.linkedin && <ContactRow label="LinkedIn" value="bhuvneshwar02" href={brand.linkedin} />}
            {brand.github && <ContactRow label="GitHub" value="bhuvneshwar02" href={brand.github} />}
          </div>

          {brand.googleReview && (
            <a
              href={brand.googleReview}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-line rounded-2xl p-5 flex items-center justify-between gap-3 hover:border-ink/30 transition-colors bg-white"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate">Worked with me before?</p>
                <p className="font-display text-sm font-semibold mt-1 text-ink">Leave a Google review ★</p>
              </div>
              <span className="text-ink/30">↗</span>
            </a>
          )}
          {brand.location && (
            <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg aspect-[4/3]">
              <iframe
                title={`${brand.location} location`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(brand.location)}&output=embed`}
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
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
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="block hover:text-marigold-dark transition-colors"
    >
      {content}
    </a>
  ) : (
    <div>{content}</div>
  )
}
