import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageParts'
import { blog } from '../data/blog'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.06, ease: 'easeOut' } }),
}

export default function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes on building and running digital projects."
        description="Practical, no-fluff writing on websites, pricing, SEO and where AI genuinely helps — drawn from real client work, not general advice."
      />

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="flex flex-col divide-y divide-line border-t border-b border-line">
          {blog.map((post, i) => (
            <motion.div key={post.slug} custom={i} initial="hidden" animate="show" variants={fadeUp}>
              <Link to={`/blog/${post.slug}`} className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-7">
                <span className="font-mono text-[11px] text-teal tracking-widest w-20 shrink-0">{post.tag}</span>
                <div className="flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-semibold group-hover:text-marigold-dark transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed mt-1.5 max-w-2xl">{post.excerpt}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-slate/70 mt-3">
                    {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {post.readTime}
                  </p>
                </div>
                <span className="text-ink/30 group-hover:text-ink transition-colors shrink-0 hidden sm:block">→</span>
              </Link>
            </motion.div>
          ))}

        </div>
      </section>
    </>
  )
}
