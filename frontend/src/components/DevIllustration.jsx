/*
 * Brand-coloured SVG illustrations used where a photo would otherwise go.
 * variant="editor"    — a code editor + live preview (home hero)
 * variant="workspace" — a developer's desk (about page)
 */
export default function DevIllustration({ variant = 'editor', className = '' }) {
  return variant === 'workspace' ? <Workspace className={className} /> : <Editor className={className} />
}

function Editor({ className }) {
  const line = (y, widths, colors) => (
    <g transform={`translate(28 ${y})`}>
      {widths.map((w, i) => {
        const x = widths.slice(0, i).reduce((a, b) => a + b + 8, 0)
        return <rect key={i} x={x} y="0" width={w} height="7" rx="3.5" fill={colors[i]} />
      })}
    </g>
  )
  return (
    <svg viewBox="0 0 460 380" className={className} role="img" aria-label="Code editor with a live preview">
      <defs>
        <linearGradient id="ed-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a3252" />
          <stop offset="1" stopColor="#1b2138" />
        </linearGradient>
      </defs>

      {/* editor window */}
      <rect x="8" y="14" width="330" height="300" rx="14" fill="url(#ed-bg)" stroke="#454f78" />
      <circle cx="30" cy="34" r="4" fill="#F2A93B" />
      <circle cx="46" cy="34" r="4" fill="#17917E" />
      <circle cx="62" cy="34" r="4" fill="#5a6690" />
      <rect x="120" y="30" width="110" height="9" rx="4.5" fill="#3c456b" />

      {/* gutter */}
      <rect x="8" y="52" width="26" height="262" fill="#232a45" />
      {[...Array(11)].map((_, i) => (
        <rect key={i} x="14" y={64 + i * 22} width="10" height="5" rx="2.5" fill="#5a6690" />
      ))}

      {line(64, [40, 70, 24], ['#F2A93B', '#aab2d4', '#17917E'])}
      {line(86, [24, 96, 40], ['#c471ed', '#aab2d4', '#F2A93B'])}
      {line(108, [60, 40], ['#17917E', '#aab2d4'])}
      {line(130, [24, 120, 30], ['#c471ed', '#e0e3f0', '#aab2d4'])}
      {line(152, [90, 46], ['#F2A93B', '#aab2d4'])}
      {line(174, [40, 70, 60], ['#aab2d4', '#17917E', '#aab2d4'])}
      {line(196, [24, 130], ['#c471ed', '#e0e3f0'])}
      {line(218, [70, 30, 40], ['#17917E', '#aab2d4', '#F2A93B'])}
      {line(240, [50, 96], ['#F2A93B', '#aab2d4'])}
      {line(262, [24, 60], ['#c471ed', '#aab2d4'])}
      {line(284, [40, 40, 24], ['#aab2d4', '#17917E', '#aab2d4'])}

      {/* live preview card */}
      <g transform="translate(250 150)">
        <rect x="0" y="0" width="200" height="216" rx="14" fill="#F5F6F0" stroke="#DBDACE" />
        <rect x="0" y="0" width="200" height="46" rx="14" fill="#12172b" />
        <rect x="0" y="30" width="200" height="16" fill="#12172b" />
        <circle cx="20" cy="23" r="9" fill="#F2A93B" />
        <rect x="36" y="18" width="80" height="7" rx="3.5" fill="#F5F6F0" />
        <rect x="16" y="66" width="130" height="12" rx="6" fill="#12172b" />
        <rect x="16" y="86" width="168" height="7" rx="3.5" fill="#c8cad6" />
        <rect x="16" y="99" width="150" height="7" rx="3.5" fill="#c8cad6" />
        <rect x="16" y="120" width="78" height="26" rx="13" fill="#F2A93B" />
        <rect x="16" y="162" width="52" height="38" rx="8" fill="#E4F3F0" />
        <rect x="76" y="162" width="52" height="38" rx="8" fill="#ECEDE5" />
        <rect x="136" y="162" width="48" height="38" rx="8" fill="#ECEDE5" />
      </g>
    </svg>
  )
}

function Workspace({ className }) {
  return (
    <svg viewBox="0 0 460 380" className={className} role="img" aria-label="A developer's desk with a monitor, keyboard and coffee">
      {/* wall accent */}
      <circle cx="360" cy="70" r="46" fill="#E4F3F0" />
      <rect x="60" y="40" width="60" height="80" rx="6" fill="none" stroke="#DBDACE" strokeWidth="3" />

      {/* desk */}
      <rect x="20" y="300" width="420" height="12" rx="4" fill="#12172b" />
      <rect x="52" y="312" width="10" height="48" fill="#12172b" />
      <rect x="398" y="312" width="10" height="48" fill="#12172b" />

      {/* monitor */}
      <rect x="120" y="90" width="220" height="150" rx="12" fill="#12172b" />
      <rect x="132" y="102" width="196" height="126" rx="6" fill="#1b2138" />
      <rect x="146" y="120" width="60" height="9" rx="4.5" fill="#F2A93B" />
      <rect x="146" y="138" width="150" height="7" rx="3.5" fill="#3a4260" />
      <rect x="146" y="152" width="120" height="7" rx="3.5" fill="#3a4260" />
      <rect x="146" y="166" width="140" height="7" rx="3.5" fill="#17917E" />
      <rect x="146" y="180" width="90" height="7" rx="3.5" fill="#3a4260" />
      <rect x="146" y="198" width="70" height="18" rx="9" fill="#F2A93B" />
      <rect x="222" y="240" width="16" height="26" fill="#12172b" />
      <rect x="196" y="266" width="68" height="8" rx="4" fill="#12172b" />

      {/* keyboard */}
      <rect x="150" y="284" width="150" height="16" rx="4" fill="#c8cad6" stroke="#DBDACE" />

      {/* mug */}
      <path d="M330 262h34v22a12 12 0 0 1-12 12h-10a12 12 0 0 1-12-12z" fill="#F2A93B" />
      <path d="M364 266h8a8 8 0 0 1 0 16h-8" fill="none" stroke="#F2A93B" strokeWidth="4" />
      <path d="M338 250c0-6 6-6 6-12M350 250c0-6 6-6 6-12" fill="none" stroke="#c8cad6" strokeWidth="3" strokeLinecap="round" />

      {/* plant */}
      <rect x="70" y="266" width="34" height="34" rx="4" fill="#17917E" />
      <path d="M87 266c0-24-14-30-14-30 20-2 22 14 22 14M87 266c0-20 16-26 16-26-2 18-16 20-16 20" fill="#E4F3F0" stroke="#17917E" strokeWidth="3" />

      {/* lamp */}
      <path d="M406 300v-70l-28-34" fill="none" stroke="#12172b" strokeWidth="5" strokeLinecap="round" />
      <path d="M362 190l32-16 12 22-30 16z" fill="#F2A93B" />
    </svg>
  )
}
