import { useSite } from '../content/ContentContext'

export default function Logo({ variant = 'dark', showWordmark = true, className = '' }) {
  const site = useSite()
  const name = site.brand?.name || 'BS Innovation Solutions'
  const tagline = site.brand?.tagline || 'Web · AI · Growth'

  const parts = name.trim().split(/\s+/)
  const lead = parts.slice(0, -1).join(' ') || name
  const accent = parts.length > 1 ? parts[parts.length - 1] : ''

  // Monogram: initials of the first two words, else first two letters.
  const monogram = (parts.length >= 2 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase()

  const isDark = variant === 'dark'
  const textColor = isDark ? '#12172B' : '#F5F6F0'
  const subColor = isDark ? '#5B6472' : '#C8CAD6'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1" y="1" width="36" height="36" rx="9" fill="#12172B" />
        <text x="19" y="24.5" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="15" fill="#F5F6F0">
          {monogram}
        </text>
        <circle cx="30" cy="9" r="3.4" fill="#F2A93B" />
        <circle cx="30" cy="9" r="3.4" fill="none" stroke="#12172B" strokeWidth="1" />
      </svg>
      {showWordmark && (
        <span className="leading-none">
          <span className="font-display font-semibold text-[17px] tracking-tight block" style={{ color: textColor }}>
            {lead} {accent && <span style={{ color: '#F2A93B' }}>{accent}</span>}
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase block mt-1" style={{ color: subColor }}>
            {tagline}
          </span>
        </span>
      )}
    </div>
  )
}
