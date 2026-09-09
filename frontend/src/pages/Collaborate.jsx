import { PageHero } from '../components/PageParts'
import Seo from '../components/Seo'
import ApplicationForm from '../components/ApplicationForm'

export default function Collaborate() {
  return (
    <>
      <Seo
        title="Work with me"
        path="/collaborate"
        description="Developers, designers and digital specialists — apply to collaborate with BS Innovation Solutions on client projects."
      />
      <PageHero
        eyebrow="Work with me"
        title="Open to collaborators."
        description="As more work comes in, I bring in developers, designers and digital specialists I trust. If that's you, send an application — I keep a shortlist and reach out when a project fits."
      />

      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <ApplicationForm kind="collaborator" />
      </section>
    </>
  )
}
