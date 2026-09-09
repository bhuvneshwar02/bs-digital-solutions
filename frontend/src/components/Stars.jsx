function Star({ filled, px }) {
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 20 20"
      className="shrink-0"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 15l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" strokeLinejoin="round" />
    </svg>
  )
}

// Display-only star rating.
export function Stars({ value = 5, size = 16, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-marigold ${className}`} aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= Math.round(value)} px={size} />
      ))}
    </span>
  )
}

// Interactive star input for a form.
export function StarInput({ value, onChange }) {
  return (
    <div className="inline-flex gap-1 text-marigold">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className="p-0.5 hover:scale-110 transition-transform"
        >
          <Star filled={n <= value} px={28} />
        </button>
      ))}
    </div>
  )
}
