import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from './lib/adminApi'
import { adminNav, collectionSchemas } from './schemas'
import { Card } from './ui'
import { useAuth } from '../auth/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const [counts, setCounts] = useState({})
  const [newMessages, setNewMessages] = useState(null)
  const [newApps, setNewApps] = useState(null)
  const [pendingJobs, setPendingJobs] = useState(null)
  const [pendingReviews, setPendingReviews] = useState(null)

  useEffect(() => {
    const keys = adminNav.flatMap((g) => g.items)
    Promise.all(
      keys.map((k) =>
        adminApi
          .list(collectionSchemas[k].endpoint)
          .then((rows) => [k, rows.length])
          .catch(() => [k, '—']),
      ),
    ).then((pairs) => setCounts(Object.fromEntries(pairs)))

    adminApi
      .listMessages('new')
      .then((rows) => setNewMessages(rows.length))
      .catch(() => setNewMessages(null))

    adminApi
      .listApplications({ status: 'new' })
      .then((rows) => setNewApps(rows.length))
      .catch(() => setNewApps(null))

    adminApi
      .listJobPosts('pending')
      .then((rows) => setPendingJobs(rows.length))
      .catch(() => setPendingJobs(null))

    adminApi
      .listReviews('pending')
      .then((rows) => setPendingReviews(rows.length))
      .catch(() => setPendingReviews(null))
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p className="text-sm text-slate mt-1">Everything on the public site is edited from here.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/admin/messages">
          <Card className="hover:border-ink/30 transition-colors">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate">Contact inbox</p>
            <p className="font-display text-3xl font-semibold mt-1">
              {newMessages ?? '—'} <span className="text-sm font-normal text-slate">new</span>
            </p>
          </Card>
        </Link>
        <Link to="/admin/applications">
          <Card className="hover:border-ink/30 transition-colors">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate">Applications</p>
            <p className="font-display text-3xl font-semibold mt-1">
              {newApps ?? '—'} <span className="text-sm font-normal text-slate">new</span>
            </p>
          </Card>
        </Link>
        <Link to="/admin/job-board">
          <Card className="hover:border-ink/30 transition-colors">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate">Job board</p>
            <p className="font-display text-3xl font-semibold mt-1">
              {pendingJobs ?? '—'} <span className="text-sm font-normal text-slate">to review</span>
            </p>
          </Card>
        </Link>
        <Link to="/admin/reviews">
          <Card className="hover:border-ink/30 transition-colors">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate">Reviews</p>
            <p className="font-display text-3xl font-semibold mt-1">
              {pendingReviews ?? '—'} <span className="text-sm font-normal text-slate">to review</span>
            </p>
          </Card>
        </Link>
        {adminNav.flatMap((g) => g.items).map((k) => (
          <Link key={k} to={`/admin/c/${k}`}>
            <Card className="hover:border-ink/30 transition-colors">
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate">{collectionSchemas[k].label}</p>
              <p className="font-display text-3xl font-semibold mt-1">{counts[k] ?? '…'}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
