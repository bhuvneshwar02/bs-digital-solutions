import { useEffect, useState } from 'react'
import { adminApi } from './lib/adminApi'
import { Card, Badge, EmptyState, Button, Field, Input, Textarea, inputClass } from './ui'
import { Stars, StarInput } from '../components/Stars'
import { IN_STATES } from '../lib/states'

const tones = { pending: 'amber', approved: 'green', rejected: 'red' }
const blank = { name: '', role: '', rating: 5, project: '', city: '', state: '', text: '' }

export default function ReviewsAdmin() {
  const [rows, setRows] = useState([])
  const [status, setStatus] = useState('pending')
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(blank)
  const [err, setErr] = useState('')

  const load = () => {
    setLoading(true)
    adminApi
      .listReviews(status)
      .then(setRows)
      .finally(() => setLoading(false))
  }
  useEffect(load, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  const patch = async (id, body) => {
    await adminApi.updateReview(id, body)
    load()
  }
  const remove = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return
    await adminApi.removeReview(id)
    load()
  }
  const add = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      await adminApi.createReview({ ...form, status: 'approved' })
      setForm(blank)
      load()
    } catch (e2) {
      setErr(e2.message || 'Could not add')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Reviews</h1>
        <p className="text-sm text-slate mt-1">
          Reviews left on <span className="font-mono">/reviews</span>. Approve to show them; feature to pin to the top.
        </p>
      </div>

      <Card title="Add a review manually">
        <form onSubmit={add} className="grid sm:grid-cols-2 gap-4">
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </Field>
          <Field label="Role / company">
            <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Optional" />
          </Field>
          <Field label="Project / work">
            <Input value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} placeholder="Optional" />
          </Field>
          <Field label="Rating">
            <StarInput value={form.rating} onChange={(rating) => setForm({ ...form, rating })} />
          </Field>
          <Field label="City">
            <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Optional" />
          </Field>
          <Field label="State">
            <select className={inputClass} value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}>
              <option value="">—</option>
              {IN_STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Review" >
            <Textarea rows={3} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
          </Field>
          <div className="sm:col-span-2 flex items-center gap-3">
            <Button type="submit">Add (approved)</Button>
            {err && <span className="text-sm text-red-600">{err}</span>}
          </div>
        </form>
      </Card>

      <div className="flex gap-2">
        {['pending', 'approved', 'rejected', ''].map((f) => (
          <button
            key={f || 'all'}
            onClick={() => setStatus(f)}
            className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border ${
              status === f ? 'bg-ink text-paper border-ink' : 'border-line text-slate'
            }`}
          >
            {f || 'all'}
          </button>
        ))}
      </div>

      {loading ? (
        <EmptyState>Loading…</EmptyState>
      ) : rows.length === 0 ? (
        <EmptyState>Nothing here.</EmptyState>
      ) : (
        rows.map((r) => (
          <Card key={r.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-semibold">{r.name}</span>
                  <Stars value={r.rating} size={13} />
                  <Badge tone={tones[r.status]}>{r.status}</Badge>
                  {r.featured && <Badge tone="amber">featured</Badge>}
                </div>
                <p className="text-sm text-slate mt-0.5">
                  {[r.role, r.project, [r.city, r.state].filter(Boolean).join(', ')].filter(Boolean).join(' · ')}
                </p>
              </div>
              <span className="font-mono text-[10px] text-slate/60 shrink-0">
                {new Date(r.createdAt).toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-sm text-ink/80 leading-relaxed mt-3 whitespace-pre-wrap border-t border-line/60 pt-3">
              {r.text}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {r.status !== 'approved' && (
                <Button variant="accent" onClick={() => patch(r.id, { status: 'approved' })}>
                  Approve
                </Button>
              )}
              {r.status !== 'rejected' && (
                <Button variant="ghost" onClick={() => patch(r.id, { status: 'rejected' })}>
                  Reject
                </Button>
              )}
              <Button variant="ghost" onClick={() => patch(r.id, { featured: !r.featured })}>
                {r.featured ? 'Unfeature' : 'Feature'}
              </Button>
              <Button variant="danger" onClick={() => remove(r.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
