import { Link } from 'react-router-dom'

export function StatusTag({ children }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate">
      <span className="status-dot" />
      {children}
    </span>
  )
}

export function Eyebrow({ children, tone = 'light' }) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.18em] font-medium ${
        tone === 'dark' ? 'text-marigold' : 'text-teal'
      }`}
    >
      {children}
    </span>
  )
}

// tone="dark" for sections on the ink background (keeps the title readable).
export function SectionHeading({ eyebrow, title, description, align = 'left', tone = 'light', className = '' }) {
  const alignClass = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'
  const dark = tone === 'dark'
  return (
    <div className={`flex flex-col gap-3 max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-display text-3xl sm:text-4xl font-semibold tracking-tight ${dark ? 'text-paper' : 'text-ink'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base leading-relaxed ${dark ? 'text-white/60' : 'text-slate'}`}>{description}</p>
      )}
    </div>
  )
}

export function Tag({ children, variant = 'default' }) {
  const styles = variant === 'inverted' ? 'border-white/20 text-paper' : 'border-line text-slate'
  return (
    <span className={`font-mono text-[10px] uppercase tracking-widest border rounded-full px-2.5 py-1 ${styles}`}>
      {children}
    </span>
  )
}

export function PrimaryButton({ children, to, href, onClick, type = 'button', className = '' }) {
  const base =
    'inline-flex items-center justify-center gap-2 bg-marigold text-ink font-display font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-marigold-dark transition-colors duration-200'
  if (to) {
    return (
      <Link to={to} className={`${base} ${className}`}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`${base} ${className}`}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={`${base} ${className}`}>
      {children}
    </button>
  )
}

export function GhostButton({ children, to, href, className = '', dark = false }) {
  const base = `inline-flex items-center justify-center gap-2 font-display font-semibold text-sm px-6 py-3.5 rounded-full border transition-colors duration-200 ${
    dark ? 'border-white/25 text-paper hover:bg-white/10' : 'border-ink/20 text-ink hover:bg-ink/5'
  }`
  if (to) {
    return (
      <Link to={to} className={`${base} ${className}`}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`${base} ${className}`}>
      {children}
    </a>
  )
}
