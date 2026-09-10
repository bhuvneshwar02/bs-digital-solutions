import { useParams, Link, Navigate } from 'react-router-dom'
import { Eyebrow } from '../components/Atoms'
import { CTASection } from '../components/PageParts'
import Seo from '../components/Seo'
import { useContent, useSite } from '../content/ContentContext'
import { jsonLd } from '../lib/jsonld'

function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BlogDetail() {
  const { slug } = useParams()
  const { blog, loading } = useContent()
  const site = useSite()
  const brand = site.brand || {}
  const origin = `https://${(brand.domain || 'bsinnovationsolutions.com').replace(/^https?:\/\//, '').replace(/\/$/, '')}`
  const post = blog.find((b) => b.slug === slug)

  if (!post) {
    if (loading) return <div className="max-w-3xl mx-auto px-5 py-24 font-mono text-sm text-slate">Loading…</div>
    return <Navigate to="/blog" replace />
  }

  const more = blog.filter((b) => b.slug !== post.slug).slice(0, 2)

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    ...(post.date ? { datePublished: new Date(post.date).toISOString(), dateModified: new Date(post.updatedAt || post.date).toISOString() } : {}),
    author: { '@type': 'Person', name: brand.founder || 'Bhuvneshwar Sharma', url: origin },
    publisher: { '@type': 'Organization', name: brand.name || 'BS Innovation Solutions', url: origin },
    mainEntityOfPage: `${origin}/blog/${post.slug}`,
    inLanguage: 'en',
  }

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleLd) }} />
      <section className="bg-ink text-paper bp-grid">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20">
          <Link to="/blog" className="font-mono text-[11px] uppercase tracking-wider text-white/50 hover:text-marigold">
            ← All articles
          </Link>
          <div className="mt-6">
            <span className="font-mono text-[11px] uppercase tracking-widest text-marigold">{post.tag}</span>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-3 leading-tight">
              {post.title}
            </h1>
            <p className="font-mono text-[11px] uppercase tracking-wider text-white/40 mt-5">
              {formatDate(post.date)} · {post.readTime}
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-2xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <p className="text-lg text-ink/70 leading-relaxed font-display">{post.excerpt}</p>
        <div className="mt-8 flex flex-col gap-5">
          {(post.body || []).map((para, i) => (
            <p key={i} className="text-[15px] text-ink/80 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-paper-dim py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <Eyebrow>More notes</Eyebrow>
            <div className="grid sm:grid-cols-2 gap-5 mt-6">
              {more.map((b) => (
                <Link
                  key={b.slug}
                  to={`/blog/${b.slug}`}
                  className="bg-white border border-line rounded-2xl p-5 hover:border-ink/30 transition-colors"
                >
                  <span className="font-mono text-[10px] text-teal tracking-widest">{b.tag}</span>
                  <h3 className="font-display font-semibold mt-2">{b.title}</h3>
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
