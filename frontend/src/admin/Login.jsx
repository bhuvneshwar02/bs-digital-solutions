import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { Button, Field, Input } from './ui'

export default function Login() {
  const { login, expired } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const from = location.state?.from || '/admin'

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper-dim px-5">
      <div className="w-full max-w-sm bg-white border border-line rounded-2xl p-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-teal">BS Innovation Solutions</p>
        <h1 className="font-display text-xl font-semibold mt-2">Admin sign in</h1>
        {expired && !error && (
          <p className="text-sm text-slate mt-3">
            Your session ended automatically after 5 minutes. Please sign in again.
          </p>
        )}
        <form onSubmit={submit} className="flex flex-col gap-4 mt-6">
          <Field label="Email">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </Field>
          <Field label="Password">
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  )
}
