import { useState } from 'react'
import { PrimaryButton, GhostButton, Eyebrow } from './Atoms'
import { useSite } from '../content/ContentContext'
import { api, ApiError } from '../lib/api'
import { IN_STATES } from '../lib/states'

const input = 'w-full bg-white border border-line rounded-xl px-4 py-3 text-sm focus:border-ink outline-none'
const modes = ['On-site', 'Remote', 'Hybrid']

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

export default function JobBoardForm() {
  const site = useSite()
  const areas = site.seo?.serviceAreas?.slice(0, 4).join(', ') || 'your area'
  const [form, setForm] = useState({
    jobTitle: '',
    company: '',
    location: '',
    city: '',
    state: '',
    workMode: 'On-site',
    budget: '',
    description: '',
    posterName: '',
    posterEmail: '',
    posterPhone: '',
    posterOrg: '',
    posterAddress: '',
    website: '', // honeypot
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await api.post('/job-board', form)
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err instanceof ApiError ? err.message : 'Something went wrong — please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-line rounded-2xl p-8 bg-white">
        <Eyebrow>Submitted for review</Eyebrow>
        <h3 className="font-display text-xl font-semibold mt-3">Thanks — your job post is in the queue.</h3>
        <p className="text-sm text-slate leading-relaxed mt-2">
          Every post is checked and the poster&apos;s details verified before it goes live (usually within a day). You&apos;ll
          hear from anyone interested by email.
        </p>
        <GhostButton to="/jobs" className="mt-6">
          Back to the job board
        </GhostButton>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-5">
        <legend className="font-mono text-[11px] uppercase tracking-widest text-teal mb-1">The job</legend>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Job / project title" required>
            <input required className={input} value={form.jobTitle} onChange={set('jobTitle')} placeholder="e.g. Need a website for my shop" />
          </Field>
          <Field label="Business name">
            <input className={input} value={form.company} onChange={set('company')} placeholder="Optional" />
          </Field>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          <Field label="Area / locality" required>
            <input required className={input} value={form.location} onChange={set('location')} placeholder={`e.g. ${areas.split(',')[0]}`} />
          </Field>
          <Field label="City" required>
            <input required className={input} value={form.city} onChange={set('city')} placeholder="e.g. Rampur" />
          </Field>
          <Field label="State" required>
            <select required className={input} value={form.state} onChange={set('state')}>
              <option value="">Select a state</option>
              {IN_STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Work mode">
            <select className={input} value={form.workMode} onChange={set('workMode')}>
              {modes.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </Field>
          <Field label="Budget / pay">
            <input className={input} value={form.budget} onChange={set('budget')} placeholder="Optional" />
          </Field>
        </div>
        <Field label="Describe the job" required>
          <textarea
            required
            rows={5}
            className={`${input} resize-none`}
            value={form.description}
            onChange={set('description')}
            placeholder="What needs doing, any deadline, skills required…"
          />
        </Field>
      </fieldset>

      <fieldset className="flex flex-col gap-5 border-t border-line pt-6">
        <legend className="font-mono text-[11px] uppercase tracking-widest text-teal mb-1">
          Your details (verified by admin — not shown publicly except your email)
        </legend>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Your full name" required>
            <input required minLength={2} className={input} value={form.posterName} onChange={set('posterName')} />
          </Field>
          <Field label="Your email" required>
            <input required type="email" className={input} value={form.posterEmail} onChange={set('posterEmail')} placeholder="you@email.com" />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Your phone" required>
            <input required type="tel" className={input} value={form.posterPhone} onChange={set('posterPhone')} placeholder="+91 …" />
          </Field>
          <Field label="Organisation / role">
            <input className={input} value={form.posterOrg} onChange={set('posterOrg')} placeholder="Optional" />
          </Field>
        </div>
        <Field label="Address">
          <input className={input} value={form.posterAddress} onChange={set('posterAddress')} placeholder="Optional — helps verification" />
        </Field>
      </fieldset>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        value={form.website}
        onChange={set('website')}
      />

      {status === 'error' && (
        <p className="text-sm text-marigold-dark bg-marigold/10 border border-marigold/30 rounded-xl px-4 py-3">{error}</p>
      )}

      <div>
        <PrimaryButton type="submit" className={status === 'sending' ? 'opacity-60 pointer-events-none' : ''}>
          {status === 'sending' ? 'Submitting…' : 'Post this job — free'}
        </PrimaryButton>
      </div>
      <p className="font-mono text-[11px] text-slate">
        Free to post. Your details are verified and the post approved by an admin before it appears. Only your email is
        shown publicly, to people who want to apply.
      </p>
    </form>
  )
}
