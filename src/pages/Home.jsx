import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import RiseIn from '../components/RiseIn.jsx'
import TwoTone from '../components/TwoTone.jsx'
import SectionRow from '../components/SectionRow.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Accordion from '../components/Accordion.jsx'
import Reveal from '../components/Reveal.jsx'
import { ArrowUpRight } from '../components/icons.jsx'
import MarkVideo from '../components/MarkVideo.jsx'
import { projects, services, headings } from '../data/site.js'

export default function Home() {
  const [featured, ...rest] = projects

  return (
    <>
      <Seo
        title="Navirize - Luxury Web & Brand Design"
        description="Navirize is a luxury web design and branding studio helping businesses position themselves as the next leaders in their space. Built with precision, conviction, and long-term thinking."
      />

      {/* ---------- hero: eyebrow, one two-tone h1, one button ---------- */}
      <section className="shell hero">
        <RiseIn delay={0.15}>
          <p className="label hero__eyebrow">Branding&nbsp; ·&nbsp; Web Design</p>

          <TwoTone as="h1" className="display" breakLine {...headings.hero} />

          <div className="hero__cta">
            <Link to="/projects" className="btn btn--dark">
              Explore our Work
              <ArrowUpRight />
            </Link>
          </div>
        </RiseIn>
      </section>

      {/* ---------- work: 1 featured + 2-col grid, no section heading ---------- */}
      <section className="shell work" aria-label="Selected work">
        <ProjectCard project={featured} variant="featured" priority />
        <div className="work__grid">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} index={1} />
          ))}
        </div>
      </section>

      {/* ---------- shaping perception ---------- */}
      <Reveal as="section" axis="x" className="shell section">
        <SectionRow
          label="Shaping Perception"
          action={
            <Link to="/projects" className="btn btn--soft">
              Our Work
              <ArrowUpRight />
            </Link>
          }
        >
          <TwoTone
            as="h2"
            className="h-section"
            breakLine
            {...headings.perception}
          />
        </SectionRow>
      </Reveal>

      {/* ---------- services accordion ---------- */}
      <Reveal as="section" axis="x" className="shell section" aria-labelledby="services-label">
        <p className="label" id="services-label">
          Services
        </p>
        <Accordion groups={services} />
      </Reveal>

      {/* ---------- our story ---------- */}
      <Reveal as="section" axis="x" className="shell section">
        <SectionRow
          label="Our Story"
          action={
            <Link to="/about" className="btn btn--soft">
              About Us
              <ArrowUpRight />
            </Link>
          }
        >
          <TwoTone as="h2" className="h-section" {...headings.story} />
        </SectionRow>
      </Reveal>

      {/* ---------- centred brand mark before the black footer ---------- */}
      <MarkVideo />
    </>
  )
}
