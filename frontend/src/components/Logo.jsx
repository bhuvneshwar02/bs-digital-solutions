import { useSite } from '../content/ContentContext'

// The single BS Innovation Solutions mark — a rounded-square monogram with an
// accent dot. Used everywhere; there is no wordmark variant.
// `variant="light"` inverts it for dark backgrounds (e.g. the footer).
export default function Logo({ size = 38, variant = 'dark', className = '', title = 'BS Innovation Solutions' }) {
  const site = useSite()
  const name = (site.brand?.name || 'BS Innovation Solutions').trim()
  const first = name.split(/\s+/)[0] || 'BS'
  // "BS Innovation Solutions" → "BS"; otherwise the first two initials.
  const monogram = (/^[A-Za-z]{2,3}$/.test(first) ? first : name.replace(/[^A-Za-z]/g, '').slice(0, 2)).toUpperCase()

  const square = variant === 'light' ? '#F5F6F0' : '#12172B'
  const letter = variant === 'light' ? '#12172B' : '#F5F6F0'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <rect x="1" y="1" width="36" height="36" rx="9" fill={square} />
      <text
        x="19"
        y="24.5"
        textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="700"
        fontSize="15"
        fill={letter}
      >
        {monogram}
      </text>
      <circle cx="30" cy="9" r="3.4" fill="#F2A93B" />
    </svg>
  )
}
