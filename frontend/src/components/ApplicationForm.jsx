import { useState } from 'react'
import { PrimaryButton, GhostButton, Eyebrow } from './Atoms'
import { useSite } from '../content/ContentContext'
import { api, ApiError } from '../lib/api'

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

const input = 'w-full bg-white border border-line rounded-xl px-4 py-3 text-sm focus:border-ink outline-none'

const projectTypes = [
  'Business website',
  'Portfolio website',
  'E-commerce store',
  'Admin dashboard / web app',
  'AI chatbot / RAG app',
  'Day-to-day digital operations',
  'Something else',
]
const budgets = ['Under ₹10,000', '₹10,000 – ₹25,000', '₹25,000 – ₹50,000', '₹50,000 – ₹1,00,000', 'Above ₹1,00,000', 'Not sure yet']
const timelines = ['ASAP', 'Within 2 weeks', 'Within a month', '1–3 months', 'Flexible']

export default function ApplicationForm({ kind, job }) {
  const site = useSite()
  const brand = site.brand || {}
  const isProject = kind === 'project'
  const isJob = kind === 'job'

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: projectTypes[0],
    budget: budgets[1],
    timeline: timelines[2],
    role: '',
    skills: '',
    portfolioUrl: '',
    availability: '',
    message: '',
    company_website: '', // honeypot
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await api.post('/applications', {
        kind,
        ...form,
        ...(isJob && job ? { jobId: job.id || '', jobTitle: job.title || '' } : {}),
      })
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err instanceof ApiError ? err.message : 'Something went wrong — please email directly.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-line rounded-2xl p-8 bg-white">
        <Eyebrow>Received</Eyebrow>
        <h3 className="font-display text-xl font-semibold mt-3">
          {isProject ? 'Thanks — your project brief is in.' : 'Thanks — your application is in.'}
        </h3>
        {isJob && job?.title && (
          <p className="font-mono text-[11px] uppercase tracking-wider text-teal mt-1">for: {job.title}</p>
        )}
        <p className="text-sm text-slate leading-relaxed mt-2">
          I read every submission personally and reply within a day. For anything urgent, WhatsApp or email is fastest.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          {brand.whatsapp && (
            <PrimaryButton href={`https://wa.me/${brand.whatsapp}`}>Message on WhatsApp</PrimaryButton>
          )}
          {brand.email && <GhostButton href={`mailto:${brand.email}`}>Email instead</GhostButton>}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" required>
          <input required className={input} value={form.name} onChange={set('name')} placeholder="Your name" />
        </Field>
        <Field label="Email" required>
          <input required type="email" className={input} value={form.email} onChange={set('email')} placeholder="you@email.com" />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Phone / WhatsApp">
          <input className={input} value={form.phone} onChange={set('phone')} placeholder="+91" />
        </Field>
        {isProject ? (
          <Field label="Company / organisation">
            <input className={input} value={form.company} onChange={set('company')} placeholder="Optional" />
          </Field>
        ) : (
          <Field label={isJob ? 'Current role / title' : 'Your role / title'}>
            <input className={input} value={form.role} onChange={set('role')} placeholder="e.g. Frontend developer, Designer" />
          </Field>
        )}
      </div>

      {isJob ? (
        <>
          <Field label="Portfolio / GitHub / LinkedIn">
            <input className={input} value={form.portfolioUrl} onChange={set('portfolioUrl')} placeholder="https://…" />
          </Field>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Relevant skills">
              <input className={input} value={form.skills} onChange={set('skills')} placeholder="e.g. React, Tailwind, Node" />
            </Field>
            <Field label="Availability / notice">
              <input className={input} value={form.availability} onChange={set('availability')} placeholder="e.g. immediate, 15 hrs/week" />
            </Field>
          </div>
          <Field label="Why are you a good fit for this role?" required>
            <textarea
              required
              rows={5}
              className={`${input} resize-none`}
              value={form.message}
              onChange={set('message')}
              placeholder="A short note about your experience and why this role suits you…"
            />
          </Field>
        </>
      ) : isProject ? (
        <>
          <div className="grid sm:grid-cols-3 gap-5">
            <Field label="Project type">
              <select className={input} value={form.projectType} onChange={set('projectType')}>
                {projectTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Budget">
              <select className={input} value={form.budget} onChange={set('budget')}>
                {budgets.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Timeline">
              <select className={input} value={form.timeline} onChange={set('timeline')}>
                {timelines.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="What are you trying to build or fix?" required>
            <textarea
              required
              rows={5}
              className={`${input} resize-none`}
              value={form.message}
              onChange={set('message')}
              placeholder="Goals, must-have features, examples of sites you like, anything you already have (logo, content, domain)…"
            />
          </Field>
        </>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Skills / stack">
              <input className={input} value={form.skills} onChange={set('skills')} placeholder="e.g. React, Node, Figma" />
            </Field>
            <Field label="Availability">
              <input className={input} value={form.availability} onChange={set('availability')} placeholder="e.g. 10 hrs/week, weekends" />
            </Field>
          </div>
          <Field label="Portfolio / GitHub / LinkedIn">
            <input className={input} value={form.portfolioUrl} onChange={set('portfolioUrl')} placeholder="https://…" />
          </Field>
          <Field label="Tell me about yourself and how you'd like to work together" required>
            <textarea
              required
              rows={5}
              className={`${input} resize-none`}
              value={form.message}
              onChange={set('message')}
              placeholder="Experience, the kind of projects you want to work on, notice period…"
            />
          </Field>
        </>
      )}

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        value={form.company_website}
        onChange={set('company_website')}
      />

      {status === 'error' && (
        <p className="text-sm text-marigold-dark bg-marigold/10 border border-marigold/30 rounded-xl px-4 py-3">{error}</p>
      )}

      <div className="flex flex-wrap gap-4 mt-1 items-center">
        <PrimaryButton type="submit" className={status === 'sending' ? 'opacity-60 pointer-events-none' : ''}>
          {status === 'sending' ? 'Sending…' : isProject ? 'Send project brief' : isJob ? 'Apply for this role' : 'Send application'}
        </PrimaryButton>
        {brand.whatsapp && <GhostButton href={`https://wa.me/${brand.whatsapp}`}>Or message on WhatsApp</GhostButton>}
      </div>
      <p className="font-mono text-[11px] text-slate">
        Stored securely and emailed to {brand.founder || 'me'} — only used to reply to you.
      </p>
    </form>
  )
}
