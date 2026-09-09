import { useParams, Link, Navigate } from 'react-router-dom'
import { Eyebrow, Tag, PrimaryButton } from '../components/Atoms'
import { CTASection } from '../components/PageParts'
import Seo from '../components/Seo'
import MediaSlot from '../components/MediaSlot'
import { useContent } from '../content/ContentContext'

function displayLink(link) {
  return link ? link.replace(/^https?:\/\//, '').replace(/\/$/, '') : ''
}

export default function PortfolioDetail() {
  const { slug } = useParams()
  const { portfolio, loading } = useContent()
  const project = portfolio.find((p) => p.slug === slug)

  if (!project) {
    if (loading) return <div className="max-w-5xl mx-auto px-5 py-24 font-mono text-sm text-slate">Loading…</div>
    return <Navigate to="/portfolio" replace />
  }

  const more = portfolio.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <>
      <Seo title={project.title} description={project.summary} path={`/portfolio/${project.slug}`} image={project.image} />
      <section className="bg-ink text-paper bp-grid">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20">
          <Link to="/portfolio" className="font-mono text-[11px] uppercase tracking-wider text-white/50 hover:text-marigold">
            ← All projects
          </Link>
          <div className="mt-6">
            <span className="font-mono text-[11px] uppercase tracking-widest text-marigold">
              {project.tag} · {project.category} · {project.year}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-3 leading-tight max-w-2xl">
              {project.title}
            </h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mt-5 max-w-xl">{project.summary}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-sm text-teal mt-4 hover:text-marigold transition-colors"
              >
                {displayLink(project.link)} ↗
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        {project.image ? (
          <div className="overflow-hidden rounded-[32px] aspect-[16/9]">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          </div>
        ) : (
          <MediaSlot label={`${project.title} — screenshots / walkthrough`} ratio="aspect-[16/9]" />
        )}

        <div className="grid md:grid-cols-2 gap-10 mt-14">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <p className="text-[15px] text-ink/80 leading-relaxed mt-3">{project.problem}</p>
          </div>
          <div>
            <Eyebrow>The solution</Eyebrow>
            <p className="text-[15px] text-ink/80 leading-relaxed mt-3">{project.solution}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-10 mt-14 pt-10 border-t border-line">
          <div>
            <Eyebrow>Key features</Eyebrow>
            <ul className="mt-3 flex flex-col gap-2.5">
              {(project.features || []).map((f) => (
                <li key={f} className="flex gap-3 text-[15px] text-ink/80">
                  <span className="text-teal font-mono shrink-0">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Tech stack</Eyebrow>
            <div className="flex flex-wrap gap-2 mt-3">
              {(project.stack || []).map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <PrimaryButton to="/contact">Start a similar project</PrimaryButton>
        </div>
      </section>

      {more.length > 0 && (
        <section className="bg-paper-dim py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <Eyebrow>More projects</Eyebrow>
            <div className="grid sm:grid-cols-3 gap-5 mt-6">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  to={`/portfolio/${p.slug}`}
                  className="bg-white border border-line rounded-2xl p-5 hover:border-ink/30 transition-colors"
                >
                  <span className="font-mono text-[10px] text-teal tracking-widest">{p.category}</span>
                  <h3 className="font-display font-semibold mt-2">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}
