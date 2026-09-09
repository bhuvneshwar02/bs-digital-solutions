import { useEffect, useState } from 'react'
import { PageHero } from '../components/PageParts'
import { SectionHeading, Eyebrow, PrimaryButton, GhostButton, Tag } from '../components/Atoms'
import Seo from '../components/Seo'
import ApplicationForm from '../components/ApplicationForm'
import JobBoardForm from '../components/JobBoardForm'
import { useContent, useSite } from '../content/ContentContext'
import { api } from '../lib/api'
import { jsonLd } from '../lib/jsonld'

function formatDate(v) {
  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

// schema.org JobPosting for each open role — helps Google for Jobs pick them up.
function JobPostingSchema({ jobs, origin, areas }) {
  const open = jobs.filter((j) => j.status !== 'closed')
  if (!open.length) return null
  const data = open.map((j) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: j.title,
    description: j.description || j.title,
    datePosted: j.createdAt,
    employmentType: (j.employmentType || 'CONTRACTOR').toUpperCase().replace(/[^A-Z]/g, '_'),
    hiringOrganization: {
      '@type': 'Organization',
      name: 'BS Innovation Solutions',
      sameAs: origin,
    },
    jobLocationType: j.remote ? 'TELECOMMUTE' : undefined,
    applicantLocationRequirements: { '@type': 'Country', name: 'India' },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: j.location || areas[0], addressCountry: 'IN' },
    },
  }))
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  )
}

function JobCard({ job }) {
  const [open, setOpen] = useState(false)
  const closed = job.status === 'closed'
  return (
    <div className="border border-line rounded-2xl bg-white overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">{job.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <Tag>{job.employmentType}</Tag>
              <Tag>{job.location}</Tag>
              {job.remote && <Tag>Remote OK</Tag>}
            </div>
          </div>
          {closed && <span className="font-mono text-[10px] uppercase tracking-wider text-slate">Closed</span>}
        </div>
        {job.description && <p className="text-sm text-slate leading-relaxed mt-4">{job.description}</p>}
        {job.requirements?.length > 0 && (
          <ul className="mt-4 flex flex-col gap-1.5">
            {job.requirements.map((r) => (
              <li key={r} className="flex gap-2.5 text-sm text-ink/75">
                <span className="text-teal shrink-0">→</span>
                {r}
              </li>
            ))}
          </ul>
        )}
        {job.compensation && (
          <p className="font-mono text-[12px] text-teal mt-4">{job.compensation}</p>
        )}
        {!closed && (
          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-5 font-display text-sm font-semibold inline-flex items-center gap-1.5 text-ink hover:text-marigold-dark transition-colors"
          >
            {open ? 'Close' : 'Apply for this role'} <span aria-hidden>{open ? '↑' : '↓'}</span>
          </button>
        )}
      </div>
      {open && (
        <div className="border-t border-line bg-paper-dim p-6">
          <ApplicationForm kind="job" job={job} />
        </div>
      )}
    </div>
  )
}

export default function Jobs() {
  const site = useSite()
  const { jobs } = useContent()
  const areas = site.seo?.serviceAreas || ['Rampur', 'Milak', 'Moradabad', 'Bareilly']
  const domain = (site.brand?.domain || 'bsinnovationsolutions.com').replace(/^https?:\/\//, '').replace(/\/$/, '')
  const origin = `https://${domain}`
  const areaList = areas.slice(0, 4).join(', ')

  const [board, setBoard] = useState([])
  useEffect(() => {
    api
      .get('/job-board')
      .then(setBoard)
      .catch(() => setBoard([]))
  }, [])

  return (
    <>
      <Seo
        title="Jobs — Post a Job Free · Work With Me"
        path="/jobs"
        description={`Post a job for free in ${areaList} and across India — hire a web / app / AI developer, or apply to freelance and part-time roles with BS Innovation Solutions.`}
      />
      <JobPostingSchema jobs={jobs} origin={origin} areas={areas} />

      <PageHero
        eyebrow="Jobs"
        title="Post a job for free. Or come work with me."
        description={`Businesses and individuals in ${areaList} — and anywhere online — can post a job or project for free. Developers and digital specialists can apply to open roles or join as a collaborator.`}
      />

      {/* QUICK CHOICE */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { t: 'Post a job — free', d: 'Need something built or done? Post it and reach a developer directly.', href: '#post-a-job', cta: 'Post a job' },
            { t: 'Apply to open roles', d: 'Freelance and part-time roles working on real client projects.', href: '#open-roles', cta: 'See roles' },
            { t: 'Work with me', d: 'Join the collaborator shortlist for design, dev and digital work.', to: '/collaborate', cta: 'Apply' },
          ].map((c) => (
            <div key={c.t} className="border border-line rounded-2xl p-6 bg-white flex flex-col">
              <h3 className="font-display font-semibold text-ink">{c.t}</h3>
              <p className="text-sm text-slate leading-relaxed mt-2 flex-1">{c.d}</p>
              {c.to ? (
                <GhostButton to={c.to} className="mt-4 self-start">
                  {c.cta}
                </GhostButton>
              ) : (
                <a
                  href={c.href}
                  className="mt-4 self-start inline-flex items-center gap-2 font-display font-semibold text-sm px-5 py-2.5 rounded-full border border-ink/20 text-ink hover:bg-ink/5 transition-colors"
                >
                  {c.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* OPEN ROLES */}
      <section id="open-roles" className="max-w-5xl mx-auto px-5 sm:px-8 py-12 scroll-mt-24">
        <SectionHeading
          eyebrow="Open roles"
          title="Freelance & part-time roles"
          description="Roles working with BS Innovation Solutions on client projects. Apply below — every application is read personally."
        />
        <div className="grid gap-5 mt-10">
          {jobs.length === 0 ? (
            <p className="text-sm text-slate">No open roles right now — check back, or join the collaborator shortlist.</p>
          ) : (
            jobs.map((job) => <JobCard key={job.id || job.title} job={job} />)
          )}
        </div>
      </section>

      {/* POST A JOB */}
      <section id="post-a-job" className="bg-paper-dim py-16 sm:py-20 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Post a job — free"
            title={`Hiring in ${areaList}? Post it here.`}
            description="Free for everyone — local shops, businesses, individuals. Describe what you need and reach a developer directly. Every post is reviewed before it goes live."
          />
          <div className="mt-10">
            <JobBoardForm />
          </div>
        </div>
      </section>

      {/* COMMUNITY BOARD */}
      {board.length > 0 && (
        <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
          <SectionHeading eyebrow="Job board" title="Recently posted" />
          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            {board.map((p) => (
              <div key={p.id} className="border border-line rounded-2xl p-6 bg-white">
                <h3 className="font-display font-semibold text-ink">{p.jobTitle}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {p.company && <Tag>{p.company}</Tag>}
                  <Tag>{[p.location, p.city, p.state].filter(Boolean).join(', ')}</Tag>
                  <Tag>{p.workMode}</Tag>
                </div>
                <p className="text-sm text-slate leading-relaxed mt-3 line-clamp-4">{p.description}</p>
                <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-line">
                  <span className="font-mono text-[11px] text-slate">
                    {p.budget ? `${p.budget} · ` : ''}
                    {formatDate(p.postedAt)}
                  </span>
                  <a
                    href={`mailto:${p.posterEmail}?subject=${encodeURIComponent(`Re: ${p.jobTitle}`)}`}
                    className="font-mono text-[11px] uppercase tracking-wider text-teal hover:text-marigold-dark"
                  >
                    Contact to apply →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* COLLABORATE */}
      <section className="bg-ink text-paper py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <Eyebrow tone="dark">Collaborators</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mt-3">
            Want to work with me on client projects?
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mt-4 max-w-2xl">
            I keep a shortlist of developers, designers and digital specialists and reach out when a project fits. Send a
            short application and I&apos;ll be in touch when something matches.
          </p>
          <PrimaryButton to="/collaborate" className="mt-7">
            Join the shortlist
          </PrimaryButton>
        </div>
      </section>
    </>
  )
}
