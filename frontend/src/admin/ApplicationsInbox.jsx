import { useEffect, useState } from 'react'
import { adminApi } from './lib/adminApi'
import { Card, Badge, EmptyState, Button } from './ui'

const tones = { new: 'amber', read: 'green', archived: 'neutral' }

const fieldLabels = {
  jobTitle: 'Applying for',
  company: 'Company / org',
  projectType: 'Project type',
  budget: 'Budget',
  timeline: 'Timeline',
  role: 'Role',
  skills: 'Skills',
  portfolioUrl: 'Portfolio',
  availability: 'Availability',
}

export default function ApplicationsInbox() {
  const [rows, setRows] = useState([])
  const [kind, setKind] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    adminApi
      .listApplications({ kind, status })
      .then(setRows)
      .finally(() => setLoading(false))
  }
  useEffect(load, [kind, status]) // eslint-disable-line react-hooks/exhaustive-deps

  const setS = async (id, s) => {
    await adminApi.setApplicationStatus(id, s)
    load()
  }
  const remove = async (id) => {
    if (!window.confirm('Delete this application permanently?')) return
    await adminApi.removeApplication(id)
    load()
  }

  const Filter = ({ value, current, onClick, children }) => (
    <button
      onClick={() => onClick(value)}
      className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border ${
        current === value ? 'bg-ink text-paper border-ink' : 'border-line text-slate'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-display text-2xl font-semibold text-ink">Applications</h1>

      <div className="flex flex-wrap gap-2">
        <Filter value="" current={kind} onClick={setKind}>
          all kinds
        </Filter>
        <Filter value="project" current={kind} onClick={setKind}>
          project briefs
        </Filter>
        <Filter value="job" current={kind} onClick={setKind}>
          job applications
        </Filter>
        <Filter value="collaborator" current={kind} onClick={setKind}>
          collaborators
        </Filter>
        <span className="w-px bg-line mx-1" />
        {['', 'new', 'read', 'archived'].map((s) => (
          <Filter key={s || 'all'} value={s} current={status} onClick={setStatus}>
            {s || 'all status'}
          </Filter>
        ))}
      </div>

      {loading ? (
        <EmptyState>Loading…</EmptyState>
      ) : rows.length === 0 ? (
        <EmptyState>No applications.</EmptyState>
      ) : (
        rows.map((a) => (
          <Card key={a.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-semibold">{a.name}</span>
                  <Badge tone={a.kind === 'project' ? 'amber' : 'neutral'}>{a.kind}</Badge>
                  <Badge tone={tones[a.status]}>{a.status}</Badge>
                </div>
                <p className="text-sm text-slate mt-0.5">
                  <a href={`mailto:${a.email}`} className="hover:underline">
                    {a.email}
                  </a>
                  {a.phone ? ` · ${a.phone}` : ''}
                </p>
              </div>
              <span className="font-mono text-[10px] text-slate/60 shrink-0">
                {new Date(a.createdAt).toLocaleString('en-IN')}
              </span>
            </div>

            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-1 mt-3 text-sm">
              {Object.keys(fieldLabels)
                .filter((k) => a[k])
                .map((k) => (
                  <div key={k} className="flex gap-2">
                    <dt className="text-slate/70 font-mono text-[11px] uppercase tracking-wider pt-0.5">
                      {fieldLabels[k]}
                    </dt>
                    <dd className="text-ink/80">
                      {k === 'portfolioUrl' ? (
                        <a href={a[k]} target="_blank" rel="noreferrer" className="underline">
                          {a[k]}
                        </a>
                      ) : (
                        a[k]
                      )}
                    </dd>
                  </div>
                ))}
            </dl>

            <p className="text-sm text-ink/80 leading-relaxed mt-3 whitespace-pre-wrap border-t border-line/60 pt-3">
              {a.message}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {a.status !== 'read' && (
                <Button variant="ghost" onClick={() => setS(a.id, 'read')}>
                  Mark read
                </Button>
              )}
              {a.status !== 'archived' && (
                <Button variant="ghost" onClick={() => setS(a.id, 'archived')}>
                  Archive
                </Button>
              )}
              <Button variant="danger" onClick={() => remove(a.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
