import { PrimaryButton } from '../components/Atoms'

export default function NotFound() {
  return (
    <section className="bg-ink text-paper bp-grid min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-24 text-center">
        <span className="font-mono text-[11px] uppercase tracking-widest text-marigold">Error 404</span>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mt-4">
          This page doesn't exist.
        </h1>
        <p className="text-white/60 mt-4">The link might be broken, or the page may have moved.</p>
        <div className="mt-8 flex justify-center">
          <PrimaryButton to="/">Back to home</PrimaryButton>
        </div>
      </div>
    </section>
  )
}
