import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { api, getToken, setToken, sessionRemainingMs } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  // Set when the 5-minute cap (not a manual sign-out) ends the session, so the
  // login screen can explain why the user landed back there.
  const [expired, setExpired] = useState(false)
  const timerRef = useRef(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const endSession = useCallback((wasExpired) => {
    clearTimer()
    setToken(null)
    setUser(null)
    setExpired(Boolean(wasExpired))
  }, [])

  // (Re)arm the auto-logout timer for whatever time is left on the current session.
  const armTimer = useCallback(() => {
    clearTimer()
    const remaining = sessionRemainingMs()
    if (remaining <= 0) {
      endSession(true)
      return
    }
    timerRef.current = setTimeout(() => {
      // The token may have been re-issued in the meantime (e.g. a password
      // change) — only end the session if the cap has genuinely been reached.
      if (sessionRemainingMs() <= 0) endSession(true)
      else armTimer()
    }, remaining)
  }, [endSession])

  useEffect(() => {
    if (!getToken()) {
      setReady(true)
      return
    }
    if (sessionRemainingMs() <= 0) {
      endSession(true)
      setReady(true)
      return
    }
    api
      .get('/auth/me', { auth: true })
      .then((u) => {
        setUser(u)
        armTimer()
      })
      .catch(() => endSession(false))
      .finally(() => setReady(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Re-check the cap whenever the tab regains focus (a timer can be throttled or
  // paused while the tab is in the background).
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible' && getToken() && sessionRemainingMs() <= 0) {
        endSession(true)
      }
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      clearTimer()
    }
  }, [endSession])

  const login = useCallback(
    async (email, password) => {
      const { token, user: u } = await api.post('/auth/login', { email, password })
      setToken(token)
      setUser(u)
      setExpired(false)
      armTimer()
      return u
    },
    [armTimer],
  )

  const logout = useCallback(() => endSession(false), [endSession])

  const refresh = useCallback(async () => {
    const u = await api.get('/auth/me', { auth: true })
    setUser(u)
    return u
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, ready, expired, login, logout, refresh, isAdmin: user?.role === 'admin' }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
