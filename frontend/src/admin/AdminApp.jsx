import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import AdminLayout from './AdminLayout'
import Login from './Login'
import Dashboard from './Dashboard'
import CollectionPage from './CollectionPage'
import SiteSettingsPage from './SiteSettingsPage'
import ContactInbox from './ContactInbox'
import ApplicationsInbox from './ApplicationsInbox'
import JobBoardInbox from './JobBoardInbox'
import UsersPage from './UsersPage'

function RequireAuth({ children }) {
  const { user, ready } = useAuth()
  const location = useLocation()
  if (!ready) return <div className="min-h-screen grid place-items-center font-mono text-sm text-slate">Loading…</div>
  if (!user) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  return children
}

function RequireAdmin({ children }) {
  const { isAdmin } = useAuth()
  if (!isAdmin) return <Navigate to="/admin" replace />
  return children
}

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="c/:key" element={<CollectionPage />} />
        <Route path="site" element={<SiteSettingsPage />} />
        <Route path="messages" element={<ContactInbox />} />
        <Route path="applications" element={<ApplicationsInbox />} />
        <Route path="job-board" element={<JobBoardInbox />} />
        <Route
          path="users"
          element={
            <RequireAdmin>
              <UsersPage />
            </RequireAdmin>
          }
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  )
}
