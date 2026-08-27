import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import TwoTone from '../components/TwoTone.jsx'
import SectionRow from '../components/SectionRow.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Accordion from '../components/Accordion.jsx'
import Reveal from '../components/Reveal.jsx'
import { words, useLineStagger } from '../components/lineStagger.jsx'
import { ArrowUpRight } from '../components/icons.jsx'
import MarkVideo from '../components/MarkVideo.jsx'
import { projects, services, headings } from '../data/site.js'

export default function Home() {
  const heroRef = useRef(null)
  useLineStagger(heroRef)
  const [featured, ...rest] = projects

  return (
    <>
      <Seo
        title="Navirize - Luxury Web & Brand Design"
        description="Navirize is a luxury web design and branding studio helping businesses position themselves as the next leaders in their space. Built with precision, conviction, and long-term thinking."
      />

      {/* ---------- hero: eyebrow, one two-tone h1, one button ---------- */}
      <Reveal as="section" className="shell hero">
        {/* text loads sliding in from the right, like every other page */}
        <p className="label hero__eyebrow">Branding&nbsp; ·&nbsp; Web Design</p>

        {/* The original renders each letter as an inline-block for its load
            animation, which drops kerning and makes the line marginally
            wider — at phone it therefore breaks after "presence,". */}
        <h1 className="display slidein" ref={heroRef}>
          {words(headings.hero.black)}
          <span className="grey" style={{ display: 'block' }}>
            {words('Your presence,')}
            <br className="br-sm" /> {words('shaped with intention and conviction.')}
          </span>
        </h1>

        <div className="hero__cta">
          <Link to="/projects" className="btn btn--dark">
            Explore our Work
            <ArrowUpRight />
          </Link>
        </div>
      </Reveal>

      {/* ---------- work: 1 featured + 2-col grid, no section heading ---------- */}
      <Reveal as="section" className="shell work" aria-label="Selected work">
        <ProjectCard project={featured} variant="featured" priority />
        <div className="work__grid">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} index={1} />
          ))}
        </div>
      </Reveal>

      {/* ---------- shaping perception ---------- */}
      <Reveal as="section" className="shell section">
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
      <Reveal as="section" className="shell section" aria-labelledby="services-label">
        <p className="label" id="services-label">
          Services
        </p>
        <Accordion groups={services} />
      </Reveal>

      {/* ---------- our story ---------- */}
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
          <TwoTone as="h2" className="h-section" {...headings.story} />
        </SectionRow>
      </Reveal>

      {/* ---------- centred brand mark before the black footer ---------- */}
      <MarkVideo />
    </>
  )
}
