export default function Logo({ variant = 'dark', showWordmark = true, className = '' }) {
  const isDark = variant === 'dark'
  const textColor = isDark ? '#12172B' : '#F5F6F0'
  const subColor = isDark ? '#5B6472' : '#C8CAD6'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1" y="1" width="36" height="36" rx="9" fill="#12172B" />
        <path d="M11 26V12H18.2C20.5 12 22 13.3 22 15.3C22 16.7 21.2 17.7 20 18.1C21.5 18.5 22.5 19.6 22.5 21.2C22.5 23.4 20.9 24.8 18.4 24.8H11V26Z" fill="#F5F6F0" opacity="0" />
        <text x="19" y="24.5" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="15" fill="#F5F6F0">BS</text>
        <circle cx="30" cy="9" r="3.4" fill="#F2A93B" />
        <circle cx="30" cy="9" r="3.4" fill="none" stroke="#12172B" strokeWidth="1" />
      </svg>
      {showWordmark && (
        <span className="leading-none">
          <span className="font-display font-semibold text-[17px] tracking-tight block" style={{ color: textColor }}>
            BS Digital <span style={{ color: '#F2A93B' }}>Solutions</span>
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase block mt-1" style={{ color: subColor }}>
            Web · AI · Growth
          </span>
        </span>
      )}
    </div>
  )
}
