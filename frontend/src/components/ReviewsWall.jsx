import { motion } from 'framer-motion'
import { Stars } from './Stars'

function initials(name = '') {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] || '')
    .join('')
    .toUpperCase()
}

function ReviewCard({ r, i, dark }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
      className={`flex flex-col rounded-2xl p-6 border ${
        dark ? 'border-white/15 bg-white/[0.03]' : 'border-line bg-white'
      }`}
    >
      <Stars value={r.rating} size={15} />
      <p className={`text-sm leading-relaxed mt-4 flex-1 ${dark ? 'text-white/75' : 'text-ink/80'}`}>“{r.text}”</p>
      <footer className="flex items-center gap-3 mt-5">
        <span
          className={`w-9 h-9 rounded-full flex items-center justify-center font-display text-xs font-semibold shrink-0 ${
            dark ? 'bg-white/10 text-paper' : 'bg-ink text-paper'
          }`}
        >
          {initials(r.name)}
        </span>
        <span className="min-w-0">
          <span className="font-display text-sm font-semibold block truncate">{r.name}</span>
          <span className={`font-mono text-[10px] uppercase tracking-wider block truncate ${dark ? 'text-white/40' : 'text-slate'}`}>
            {[r.role, r.project].filter(Boolean).join(' · ')}
          </span>
        </span>
      </footer>
    </motion.blockquote>
  )
}

export default function ReviewsWall({ reviews = [], dark = false, limit }) {
  const list = limit ? reviews.slice(0, limit) : reviews
  if (!list.length) return null
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {list.map((r, i) => (
        <ReviewCard key={r.id || r.name + i} r={r} i={i} dark={dark} />
      ))}
    </div>
  )
}
