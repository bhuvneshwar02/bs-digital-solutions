import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { adminNav, collectionSchemas } from './schemas'

const linkClass = ({ isActive }) =>
  `block px-3 py-1.5 rounded-lg text-sm transition-colors ${
    isActive ? 'bg-ink text-paper' : 'text-slate hover:bg-ink/5 hover:text-ink'
  }`

export default function AdminLayout() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const signOut = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-paper-dim flex">
      <aside className="w-60 shrink-0 bg-white border-r border-line flex flex-col p-4 gap-4 sticky top-0 h-screen overflow-y-auto">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-teal">BS Innovation</p>
          <p className="font-display font-semibold text-ink">Admin</p>
        </div>

        <nav className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-0.5">
            <NavLink to="/admin" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/site" className={linkClass}>
              Site settings
            </NavLink>
            <NavLink to="/admin/messages" className={linkClass}>
              Contact inbox
            </NavLink>
            <NavLink to="/admin/applications" className={linkClass}>
              Applications
            </NavLink>
            <NavLink to="/admin/job-board" className={linkClass}>
              Job board
            </NavLink>
            <NavLink to="/admin/reviews" className={linkClass}>
              Reviews
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin/users" className={linkClass}>
                Users
              </NavLink>
            )}
          </div>

          {adminNav.map((group) => (
            <div key={group.section} className="flex flex-col gap-0.5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate/60 px-3 mb-1">{group.section}</p>
              {group.items.map((key) => (
                <NavLink key={key} to={`/admin/c/${key}`} className={linkClass}>
                  {collectionSchemas[key].label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="border-t border-line pt-3">
          <NavLink to="/admin/account" className="text-xs text-slate hover:text-ink block truncate">
            {user?.name}
          </NavLink>
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate/60">{user?.role}</p>
          <div className="flex gap-3 mt-2">
            <a href="/" className="font-mono text-[11px] text-slate hover:text-ink">
              View site
            </a>
            <NavLink to="/admin/account" className="font-mono text-[11px] text-slate hover:text-ink">
              Account
            </NavLink>
            <button onClick={signOut} className="font-mono text-[11px] text-red-600 hover:underline">
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-8 max-w-5xl">
        <Outlet />
      </main>
    </div>
  )
}
