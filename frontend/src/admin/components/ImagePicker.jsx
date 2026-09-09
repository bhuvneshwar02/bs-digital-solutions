import { useEffect, useState } from 'react'
import { inputClass } from '../ui'

// Lets the editor paste any image URL or pick from the images bundled in the repo
// (public/assets/manifest.json).
export default function ImagePicker({ value, onChange }) {
  const [choices, setChoices] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch('/assets/manifest.json')
      .then((r) => r.json())
      .then((d) => setChoices(d.images || []))
      .catch(() => setChoices([]))
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          className={inputClass}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/assets/… or https://…"
        />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 border border-line rounded-lg px-3 text-sm font-mono hover:bg-ink/5"
        >
          {open ? 'Close' : 'Browse'}
        </button>
      </div>

      {value && (
        <img
          src={value}
          alt="Selected"
          className="h-24 w-40 object-cover rounded-lg border border-line"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}

      {open && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-64 overflow-y-auto border border-line rounded-lg p-2 bg-paper-dim">
          {choices.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                onChange(src)
                setOpen(false)
              }}
              className={`rounded-md overflow-hidden border-2 ${value === src ? 'border-marigold' : 'border-transparent'}`}
            >
              <img src={src} alt="" className="h-16 w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
