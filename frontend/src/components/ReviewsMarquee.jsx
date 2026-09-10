import { Stars } from './Stars'

function initials(name = '') {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] || '')
    .join('')
    .toUpperCase()
}

function ReviewCard({ r, dark }) {
  return (
    <blockquote
      className={`flex flex-col rounded-2xl p-6 border w-[300px] sm:w-[340px] shrink-0 ${
        dark ? 'border-white/15 bg-white/[0.03]' : 'border-line bg-white'
      }`}
    >
      <Stars value={r.rating} size={15} />
      <p className={`text-sm leading-relaxed mt-4 flex-1 line-clamp-5 ${dark ? 'text-white/75' : 'text-ink/80'}`}>
        “{r.text}”
      </p>
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
          <span
            className={`font-mono text-[10px] uppercase tracking-wider block truncate ${
              dark ? 'text-white/40' : 'text-slate'
            }`}
          >
            {[r.role, r.project, [r.city, r.state].filter(Boolean).join(', ')].filter(Boolean).join(' · ')}
          </span>
        </span>
      </footer>
    </blockquote>
  )
}

/**
 * A review row that scrolls horizontally forever — one card after another,
 * never stopping. The track renders the list twice so the loop is seamless.
 * Speed scales with the number of cards so it always feels steady.
 */
export default function ReviewsMarquee({ reviews = [], dark = false, limit }) {
  const list = limit ? reviews.slice(0, limit) : reviews
  if (!list.length) return null

  // ~7s per card feels unhurried; clamp so tiny/large lists stay reasonable.
  const duration = Math.min(160, Math.max(28, list.length * 7))

  const group = (copy) => (
    <div className="flex gap-5 pr-5 shrink-0" aria-hidden={copy === 1 ? 'true' : undefined}>
      {list.map((r, i) => (
        <ReviewCard key={(r.id || r.name) + '-' + copy + '-' + i} r={r} dark={dark} />
      ))}
    </div>
  )

  return (
    <div className="marquee">
      <div className="marquee__track" style={{ '--marquee-duration': `${duration}s` }}>
        {group(0)}
        {group(1)}
      </div>
    </div>
  )
}
