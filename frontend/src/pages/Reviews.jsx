import { PageHero } from '../components/PageParts'
import { SectionHeading } from '../components/Atoms'
import { Stars } from '../components/Stars'
import Seo from '../components/Seo'
import ReviewsWall from '../components/ReviewsWall'
import ReviewForm from '../components/ReviewForm'
import { useContent } from '../content/ContentContext'

export default function Reviews() {
  const { reviews } = useContent()
  const { items = [], count = 0, average = 0 } = reviews || {}

  return (
    <>
      <Seo
        title="Reviews"
        path="/reviews"
        description="Reviews from people BS Innovation Solutions has built websites, web apps and AI tools for. Leave your own."
      />
      <PageHero
        eyebrow="Reviews"
        title="What people say — in their words."
        description="Real reviews from clients and collaborators. Anyone who has worked with me can add one; every review is checked before it goes live."
      >
        {count > 0 && (
          <div className="flex items-center gap-3 mt-7">
            <Stars value={average} size={20} />
            <span className="font-display text-lg font-semibold text-paper">{average.toFixed(1)}</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
              from {count} review{count === 1 ? '' : 's'}
            </span>
          </div>
        )}
      </PageHero>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        {items.length ? (
          <ReviewsWall reviews={items} />
        ) : (
          <p className="text-sm text-slate text-center py-10">No reviews yet — be the first below.</p>
        )}
      </section>

      <section id="leave-a-review" className="bg-paper-dim py-16 sm:py-20 scroll-mt-24">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Leave a review"
            title="Worked with me? Add your review."
            description="No account or email needed. It goes live once approved."
          />
          <div className="mt-10">
            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  )
}
