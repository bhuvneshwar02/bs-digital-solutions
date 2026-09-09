import { useEffect, useState } from 'react'
import { adminApi } from './lib/adminApi'
import { Card, Badge, EmptyState, Button } from './ui'

const tones = { pending: 'amber', approved: 'green', rejected: 'red' }

export default function JobBoardInbox() {
  const [rows, setRows] = useState([])
  const [status, setStatus] = useState('pending')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    adminApi
      .listJobPosts(status)
      .then(setRows)
      .finally(() => setLoading(false))
  }
  useEffect(load, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  const setS = async (id, s) => {
    await adminApi.setJobPostStatus(id, s)
    load()
  }
  const remove = async (id) => {
    if (!window.confirm('Delete this job post permanently?')) return
    await adminApi.removeJobPost(id)
    load()
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Job board</h1>
        <p className="text-sm text-slate mt-1">
          Jobs posted by the public. Approve to show them on <span className="font-mono">/jobs</span>.
        </p>
      </div>

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
        rows.map((p) => (
          <Card key={p.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-semibold">{p.jobTitle}</span>
                  <Badge tone={tones[p.status]}>{p.status}</Badge>
                </div>
                <p className="text-sm text-slate mt-0.5">
                  {p.company ? `${p.company} · ` : ''}
                  {[p.location, p.city, p.state].filter(Boolean).join(', ')} · {p.workMode}
                  {p.budget ? ` · ${p.budget}` : ''}
                </p>
                <p className="text-sm text-slate mt-0.5">
                  <span className="font-semibold text-ink/70">{p.posterName}</span> —{' '}
                  <a href={`mailto:${p.posterEmail}`} className="hover:underline">
                    {p.posterEmail}
                  </a>
                  {p.posterPhone ? ` · ${p.posterPhone}` : ''}
                  {p.posterOrg ? ` · ${p.posterOrg}` : ''}
                </p>
                {p.posterAddress && <p className="text-sm text-slate/80 mt-0.5">{p.posterAddress}</p>}
              </div>
              <span className="font-mono text-[10px] text-slate/60 shrink-0">
                {new Date(p.createdAt).toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-sm text-ink/80 leading-relaxed mt-3 whitespace-pre-wrap border-t border-line/60 pt-3">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {p.status !== 'approved' && (
                <Button variant="accent" onClick={() => setS(p.id, 'approved')}>
                  Approve
                </Button>
              )}
              {p.status !== 'rejected' && (
                <Button variant="ghost" onClick={() => setS(p.id, 'rejected')}>
                  Reject
                </Button>
              )}
              {p.status !== 'pending' && (
                <Button variant="ghost" onClick={() => setS(p.id, 'pending')}>
                  Back to pending
                </Button>
              )}
              <Button variant="danger" onClick={() => remove(p.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
