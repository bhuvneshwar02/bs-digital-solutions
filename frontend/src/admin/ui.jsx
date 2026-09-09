// Small shared building blocks for the admin panel. Deliberately plain.

export function Button({ variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-ink text-paper hover:bg-ink-soft',
    ghost: 'border border-line text-ink hover:bg-ink/5',
    danger: 'border border-red-300 text-red-700 hover:bg-red-50',
    accent: 'bg-marigold text-ink hover:bg-marigold-dark',
  }[variant]
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-display font-semibold text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none ${styles} ${className}`}
      {...props}
    />
  )
}

export function Field({ label, hint, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      {label && <span className="font-mono text-[11px] uppercase tracking-wider text-slate">{label}</span>}
      {children}
      {hint && !error && <span className="text-[11px] text-slate/80">{hint}</span>}
      {error && <span className="text-[11px] text-red-600">{error}</span>}
    </label>
  )
}

export const inputClass =
  'w-full bg-white border border-line rounded-lg px-3 py-2 text-sm focus:border-ink outline-none'

export function Input(props) {
  return <input className={inputClass} {...props} />
}

export function Textarea({ rows = 3, ...props }) {
  return <textarea rows={rows} className={`${inputClass} resize-y`} {...props} />
}

export function Card({ title, actions, children, className = '' }) {
  return (
    <div className={`bg-white border border-line rounded-xl ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-line">
          {title && <h2 className="font-display font-semibold text-ink">{title}</h2>}
          {actions}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}

export function Badge({ tone = 'neutral', children }) {
  const styles = {
    neutral: 'bg-ink/5 text-slate',
    green: 'bg-teal-soft text-teal',
    amber: 'bg-marigold/15 text-marigold-dark',
    red: 'bg-red-50 text-red-700',
  }[tone]
  return (
    <span className={`inline-flex items-center font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${styles}`}>
      {children}
    </span>
  )
}

export function EmptyState({ children }) {
  return <p className="text-sm text-slate py-8 text-center">{children}</p>
}
