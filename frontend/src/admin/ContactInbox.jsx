import { useEffect, useState } from 'react'
import { adminApi } from './lib/adminApi'
import { Card, Badge, EmptyState, Button } from './ui'

const tones = { new: 'amber', read: 'green', archived: 'neutral' }

export default function ContactInbox() {
  const [rows, setRows] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    adminApi
      .listMessages(filter)
      .then(setRows)
      .finally(() => setLoading(false))
  }

  useEffect(load, [filter]) // eslint-disable-line react-hooks/exhaustive-deps

  const setStatus = async (id, status) => {
    await adminApi.setMessageStatus(id, status)
    load()
  }
  const remove = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return
    await adminApi.removeMessage(id)
    load()
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-display text-2xl font-semibold text-ink">Contact inbox</h1>

      <div className="flex gap-2">
        {['', 'new', 'read', 'archived'].map((f) => (
          <button
            key={f || 'all'}
            onClick={() => setFilter(f)}
            className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border ${
              filter === f ? 'bg-ink text-paper border-ink' : 'border-line text-slate'
            }`}
          >
            {f || 'all'}
          </button>
        ))}
      </div>

      {loading ? (
        <EmptyState>Loading…</EmptyState>
      ) : rows.length === 0 ? (
        <EmptyState>No messages.</EmptyState>
      ) : (
        rows.map((m) => (
          <Card key={m.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold">{m.name}</span>
                  <Badge tone={tones[m.status]}>{m.status}</Badge>
                </div>
                <p className="text-sm text-slate mt-0.5">
                  <a href={`mailto:${m.email}`} className="hover:underline">
                    {m.email}
                  </a>
                  {m.phone ? ` · ${m.phone}` : ''}
                  {m.type ? ` · ${m.type}` : ''}
                </p>
              </div>
              <span className="font-mono text-[10px] text-slate/60 shrink-0">
                {new Date(m.createdAt).toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-sm text-ink/80 leading-relaxed mt-3 whitespace-pre-wrap">{m.message}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {m.status !== 'read' && (
                <Button variant="ghost" onClick={() => setStatus(m.id, 'read')}>
                  Mark read
                </Button>
              )}
              {m.status !== 'archived' && (
                <Button variant="ghost" onClick={() => setStatus(m.id, 'archived')}>
                  Archive
                </Button>
              )}
              {m.status !== 'new' && (
                <Button variant="ghost" onClick={() => setStatus(m.id, 'new')}>
                  Mark unread
                </Button>
              )}
              <Button variant="danger" onClick={() => remove(m.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
