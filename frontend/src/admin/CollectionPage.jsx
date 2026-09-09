import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collectionSchemas } from './schemas'
import { adminApi } from './lib/adminApi'
import { Button, Card, Badge, EmptyState } from './ui'
import EntityForm from './components/EntityForm'

export default function CollectionPage() {
  const { key } = useParams()
  const schema = collectionSchemas[key]

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const [editing, setEditing] = useState(null) // row object, or 'new', or null
  const [saving, setSaving] = useState(false)

  const load = useCallback(() => {
    if (!schema) return
    setLoading(true)
    adminApi
      .list(schema.endpoint)
      .then((data) => {
        setRows(data)
        setErr('')
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false))
  }, [schema])

  useEffect(load, [load])

  if (!schema) return <p className="text-sm text-red-600">Unknown collection: {key}</p>

  const save = async (payload) => {
    setSaving(true)
    try {
      if (editing === 'new') await adminApi.create(schema.endpoint, payload)
      else await adminApi.update(schema.endpoint, editing.id, payload)
      setEditing(null)
      load()
    } finally {
      setSaving(false)
    }
  }

  const togglePublished = async (row) => {
    await adminApi.patch(schema.endpoint, row.id, { published: !row.published })
    load()
  }

  const move = async (index, dir) => {
    const next = [...rows]
    const target = index + dir
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setRows(next)
    await adminApi.reorder(
      schema.endpoint,
      next.map((r) => r.id),
    )
  }

  const remove = async (row) => {
    if (!window.confirm(`Delete this ${schema.singularLabel}? This cannot be undone.`)) return
    await adminApi.remove(schema.endpoint, row.id)
    load()
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">{schema.label}</h1>
          <p className="text-sm text-slate mt-1">
            {rows.length} {rows.length === 1 ? schema.singularLabel : `${schema.singularLabel}s`} · drag order with the
            arrows
          </p>
        </div>
        <Button onClick={() => setEditing('new')}>+ New {schema.singularLabel}</Button>
      </div>

      {err && <p className="text-sm text-red-600">{err}</p>}

      {editing && (
        <Card title={editing === 'new' ? `New ${schema.singularLabel}` : `Edit ${schema.singularLabel}`}>
          <EntityForm
            schema={schema}
            initial={editing === 'new' ? null : editing}
            onSubmit={save}
            onCancel={() => setEditing(null)}
            saving={saving}
          />
        </Card>
      )}

      <Card>
        {loading ? (
          <EmptyState>Loading…</EmptyState>
        ) : rows.length === 0 ? (
          <EmptyState>Nothing here yet.</EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-slate border-b border-line">
                  <th className="py-2 w-16">Order</th>
                  {schema.columns.map((c) => (
                    <th key={c.key} className="py-2 pr-4">
                      {c.label}
                    </th>
                  ))}
                  <th className="py-2">Status</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id} className="border-b border-line/60 last:border-0">
                    <td className="py-2">
                      <div className="flex gap-1">
                        <button onClick={() => move(i, -1)} className="text-slate hover:text-ink disabled:opacity-30" disabled={i === 0}>
                          ↑
                        </button>
                        <button
                          onClick={() => move(i, 1)}
                          className="text-slate hover:text-ink disabled:opacity-30"
                          disabled={i === rows.length - 1}
                        >
                          ↓
                        </button>
                      </div>
                    </td>
                    {schema.columns.map((c) => (
                      <td key={c.key} className="py-2 pr-4 max-w-xs truncate">
                        {typeof row[c.key] === 'boolean' ? (row[c.key] ? 'Yes' : '—') : row[c.key]}
                      </td>
                    ))}
                    <td className="py-2">
                      <button onClick={() => togglePublished(row)}>
                        {row.published ? <Badge tone="green">Live</Badge> : <Badge tone="amber">Hidden</Badge>}
                      </button>
                    </td>
                    <td className="py-2 text-right whitespace-nowrap">
                      <button onClick={() => setEditing(row)} className="text-ink font-mono text-xs hover:underline mr-3">
                        Edit
                      </button>
                      <button onClick={() => remove(row)} className="text-red-600 font-mono text-xs hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
