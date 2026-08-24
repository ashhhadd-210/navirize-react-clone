import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import TwoTone from '../components/TwoTone.jsx'
import SectionRow from '../components/SectionRow.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { ArrowUpRight } from '../components/icons.jsx'
import { projects, headings } from '../data/site.js'
import Reveal from '../components/Reveal.jsx'

export default function Projects() {

  return (
    <>
      <Seo
        title="Navirize - Projects"
        description="A closer look at how ideas are transformed into identity, experience, and advantage."
      />

      <section className="shell pagehead">
        <div>
          <TwoTone as="h1" className="display slidein" {...headings.projectsHero} />
          <p className="pagehead__lede pagehead__lede--big slidein" style={{ '--slide-delay': '0.12s' }}>
            A closer look at how ideas are transformed into identity,
            experience, and advantage.
          </p>
        </div>
      </section>

      {/* Measured on the original: a uniform two-column grid of all four
          projects (620x509 cards at 1440) — no full-width featured card on
          this page, unlike home. */}
      <section className="shell work work--listing" aria-label="All projects">
        <div className="work__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} priority={i < 2} index={i} />
          ))}
        </div>
      </section>

      <Reveal as="section" axis="x" className="shell section section--tail">
        <SectionRow
          label="Our Story"
          action={
            <Link to="/about" className="btn btn--soft">
              About Us
              <ArrowUpRight />
            </Link>
          }
        >
          <TwoTone as="h2" className="h-section" {...headings.projectsStory} />
        </SectionRow>
      </Reveal>

    </>
  )
}
