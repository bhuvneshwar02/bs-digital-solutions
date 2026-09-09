import { useEffect, useState } from 'react'
import { adminApi } from './lib/adminApi'
import { Button, Card, Field, Input, Badge, EmptyState, inputClass } from './ui'
import { useAuth } from '../auth/AuthContext'

const blankForm = { name: '', email: '', password: '', role: 'editor' }

export default function UsersPage() {
  const { user: me } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(blankForm)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    adminApi
      .listUsers()
      .then(setRows)
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (editingId) {
        const body = { name: form.name, email: form.email, role: form.role }
        if (form.password) body.password = form.password
        await adminApi.updateUser(editingId, body)
      } else {
        await adminApi.createUser(form)
      }
      setForm(blankForm)
      setEditingId(null)
      load()
    } catch (err) {
      setError(err.message || 'Failed')
    }
  }

  const edit = (u) => {
    setEditingId(u.id)
    setForm({ name: u.name, email: u.email, password: '', role: u.role })
  }

  const remove = async (u) => {
    if (!window.confirm(`Delete ${u.name}?`)) return
    try {
      await adminApi.removeUser(u.id)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold text-ink">Users & roles</h1>

      <Card title={editingId ? 'Edit user' : 'Add a user'}>
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </Field>
          <Field label="Email">
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </Field>
          <Field label={editingId ? 'New password (leave blank to keep)' : 'Password'}>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required={!editingId}
              minLength={8}
            />
          </Field>
          <Field label="Role" hint="editor: content only · admin: everything, incl. users & settings">
            <select className={inputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="editor">editor</option>
              <option value="admin">admin</option>
            </select>
          </Field>
          <div className="sm:col-span-2 flex gap-2">
            <Button type="submit">{editingId ? 'Save changes' : 'Create user'}</Button>
            {editingId && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setEditingId(null)
                  setForm(blankForm)
                }}
              >
                Cancel
              </Button>
            )}
          </div>
          {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}
        </form>
      </Card>

      <Card>
        {loading ? (
          <EmptyState>Loading…</EmptyState>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-slate border-b border-line">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id} className="border-b border-line/60 last:border-0">
                  <td className="py-2">
                    {u.name} {u.id === me?.id && <span className="text-slate/60">(you)</span>}
                  </td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">
                    <Badge tone={u.role === 'admin' ? 'amber' : 'neutral'}>{u.role}</Badge>
                  </td>
                  <td className="py-2 text-right whitespace-nowrap">
                    <button onClick={() => edit(u)} className="font-mono text-xs hover:underline mr-3">
                      Edit
                    </button>
                    {u.id !== me?.id && (
                      <button onClick={() => remove(u)} className="font-mono text-xs text-red-600 hover:underline">
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}
