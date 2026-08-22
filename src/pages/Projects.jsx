import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import RiseIn from '../components/RiseIn.jsx'
import TwoTone from '../components/TwoTone.jsx'
import SectionRow from '../components/SectionRow.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { ArrowUpRight } from '../components/icons.jsx'
import { projects, headings, marks, img } from '../data/site.js'
import Reveal from '../components/Reveal.jsx'

export default function Projects() {
  const [featured, ...rest] = projects

  return (
    <>
      <Seo
        title="Navirize - Projects"
        description="A closer look at how ideas are transformed into identity, experience, and advantage."
      />

      <section className="shell pagehead">
        <RiseIn delay={0.15}>
          <p className="label pagehead__label">Projects</p>
          <TwoTone as="h1" className="display" {...headings.projectsHero} />
          <p className="body--lg grey pagehead__lede">
            A closer look at how ideas are transformed into identity,
            experience, and advantage.
          </p>
        </RiseIn>
      </section>

      <section className="shell work" aria-label="All projects">
        <ProjectCard project={featured} variant="featured" priority />
        <div className="work__grid">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <Reveal as="section" className="shell section">
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

      <div className="shell mark">
        <img
          src={img(marks.n, 512)}
          alt=""
          width="181"
          height="196"
          loading="lazy"
          decoding="async"
        />
      </div>
    </>
  )
}
