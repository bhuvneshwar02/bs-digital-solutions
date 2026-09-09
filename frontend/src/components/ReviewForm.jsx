import { useState } from 'react'
import { PrimaryButton, GhostButton, Eyebrow } from './Atoms'
import { StarInput } from './Stars'
import { useSite } from '../content/ContentContext'
import { api, ApiError } from '../lib/api'
import { IN_STATES } from '../lib/states'

const input = 'w-full bg-white border border-line rounded-xl px-4 py-3 text-sm focus:border-ink outline-none'

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

export default function ReviewForm() {
  const site = useSite()
  const brand = site.brand || {}
  const [form, setForm] = useState({
    name: '',
    role: '',
    rating: 5,
    project: '',
    city: '',
    state: '',
    text: '',
    website: '',
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await api.post('/reviews', form)
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err instanceof ApiError ? err.message : 'Something went wrong — please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-line rounded-2xl p-8 bg-white">
        <Eyebrow>Thank you</Eyebrow>
        <h3 className="font-display text-xl font-semibold mt-3">Your review is in.</h3>
        <p className="text-sm text-slate leading-relaxed mt-2">
          Every review is checked before it goes live (usually within a day) to keep the wall genuine. Thanks for taking
          the time.
        </p>
        {brand.whatsapp && (
          <GhostButton href={`https://wa.me/${brand.whatsapp}`} className="mt-6">
            Message on WhatsApp
          </GhostButton>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Your name" required>
          <input required className={input} value={form.name} onChange={set('name')} placeholder="Full name" />
        </Field>
        <Field label="Role / company">
          <input className={input} value={form.role} onChange={set('role')} placeholder="e.g. Owner, Grameen Haat" />
        </Field>
      </div>

      <Field label="Rating" required>
        <StarInput value={form.rating} onChange={(rating) => setForm((f) => ({ ...f, rating }))} />
      </Field>

      <Field label="Which project / work is this about?">
        <input className={input} value={form.project} onChange={set('project')} placeholder="Optional" />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Your city">
          <input className={input} value={form.city} onChange={set('city')} placeholder="e.g. Rampur" />
        </Field>
        <Field label="Your state">
          <select className={input} value={form.state} onChange={set('state')}>
            <option value="">Select a state</option>
            {IN_STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Your review" required>
        <textarea
          required
          rows={5}
          className={`${input} resize-none`}
          value={form.text}
          onChange={set('text')}
          placeholder="What was it like working together? What did you get?"
        />
      </Field>

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
          {status === 'sending' ? 'Submitting…' : 'Submit review'}
        </PrimaryButton>
      </div>
      <p className="font-mono text-[11px] text-slate">Reviewed before it goes live. Your name is shown; no email needed.</p>
    </form>
  )
}
