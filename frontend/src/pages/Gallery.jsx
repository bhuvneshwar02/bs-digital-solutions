import { useState } from 'react'
import { m } from 'framer-motion'
import { PageHero } from '../components/PageParts'
import Seo from '../components/Seo'
import { useContent } from '../content/ContentContext'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: (i % 8) * 0.05, ease: 'easeOut' } }),
}

export default function Gallery() {
  const { gallery } = useContent()
  const [active, setActive] = useState(null)

  return (
    <>
      <Seo
        title="Gallery"
        path="/gallery"
        description="Screenshots and visuals from websites, web apps and AI projects built by BS Innovation Solutions."
      />
      <PageHero
        eyebrow="Gallery"
        title="A look at the work."
        description="Screens and visuals from projects built end-to-end. More added as new work ships."
      />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        {gallery.length === 0 ? (
          <p className="text-sm text-slate text-center py-10">Gallery images coming soon.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {gallery.map((g, i) => (
              <m.button
                key={g.id || g.image + i}
                custom={i}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                onClick={() => setActive(g)}
                className="group relative overflow-hidden rounded-xl border border-line aspect-square bg-paper-dim"
              >
                <img
                  src={g.image}
                  alt={g.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 text-left">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/90 line-clamp-1">
                    {g.title}
                  </span>
                </span>
              </m.button>
            ))}
          </div>
        )}
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[60] bg-ink/85 flex items-center justify-center p-5"
          onClick={() => setActive(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={active.image} alt={active.title} className="w-full rounded-xl" />
            <div className="flex items-center justify-between gap-4 mt-3">
              <p className="text-paper text-sm">
                <span className="font-display font-semibold">{active.title}</span>
                {active.caption ? <span className="text-white/50"> — {active.caption}</span> : null}
              </p>
              <button
                onClick={() => setActive(null)}
                className="font-mono text-[11px] uppercase tracking-wider text-white/70 hover:text-white shrink-0"
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
