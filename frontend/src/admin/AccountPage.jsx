import { useState } from 'react'
import { adminApi } from './lib/adminApi'
import { setToken } from '../lib/api'
import { Button, Card, Field, Input } from './ui'
import { useAuth } from '../auth/AuthContext'

export default function AccountPage() {
  const { user } = useAuth()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    if (form.newPassword !== form.confirm) {
      setMsg({ type: 'err', text: 'New passwords do not match' })
      return
    }
    if (form.newPassword.length < 10) {
      setMsg({ type: 'err', text: 'Use at least 10 characters' })
      return
    }
    setBusy(true)
    try {
      const { token } = await adminApi.changePassword(form.currentPassword, form.newPassword)
      if (token) setToken(token)
      setForm({ currentPassword: '', newPassword: '', confirm: '' })
      setMsg({ type: 'ok', text: 'Password updated. Other sessions have been signed out.' })
    } catch (err) {
      setMsg({ type: 'err', text: err.message || 'Could not update password' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Account</h1>
        <p className="text-sm text-slate mt-1">
          {user?.name} · {user?.email} · <span className="font-mono">{user?.role}</span>
        </p>
      </div>

      <Card title="Change password">
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Field label="Current password">
            <Input type="password" value={form.currentPassword} onChange={set('currentPassword')} required autoComplete="current-password" />
          </Field>
          <Field label="New password" hint="At least 10 characters. Use a password manager.">
            <Input type="password" value={form.newPassword} onChange={set('newPassword')} required minLength={10} autoComplete="new-password" />
          </Field>
          <Field label="Confirm new password">
            <Input type="password" value={form.confirm} onChange={set('confirm')} required autoComplete="new-password" />
          </Field>
          {msg && (
            <p className={`text-sm ${msg.type === 'ok' ? 'text-teal' : 'text-red-600'}`}>{msg.text}</p>
          )}
          <Button type="submit" disabled={busy}>
            {busy ? 'Updating…' : 'Update password'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
