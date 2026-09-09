export default function MediaSlot({ label, ratio = 'aspect-[16/10]', type = 'image', className = '' }) {
  const icon =
    type === 'video' ? (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="currentColor" />
      </svg>
    ) : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 17L8.5 12L13 15.5L16 13L21 17.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )

  return (
    <div className={`media-slot rounded-2xl ${ratio} ${className}`}>
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        {icon}
        <span className="font-mono text-[11px] uppercase tracking-wider">
          {type === 'video' ? 'Video space' : 'Image space'}{label ? ` — ${label}` : ''}
        </span>
      </div>
    </div>
  )
}
