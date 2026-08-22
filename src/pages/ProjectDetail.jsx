import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import RiseIn from '../components/RiseIn.jsx'
import SectionRow from '../components/SectionRow.jsx'
import { ArrowUpRight } from '../components/icons.jsx'
import NotFound from './NotFound.jsx'
import { projects, galleries, galleryUrl } from '../data/site.js'

function Block({ label, title, lede, paragraphs }) {
  return (
    <div className="proj__block">
      <SectionRow label={label}>
        <h2 className="h-section">{title}</h2>
        <div className="proj__prose">
          {lede ? <p>{lede}</p> : null}
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </SectionRow>
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return <NotFound />

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  const gallery = galleries[slug] || []

  return (
    <>
      <Seo title={`${project.title} - Navirize`} description={project.lede} />

      <article>
        <header className="shell pagehead">
          <RiseIn delay={0.15}>
            <div className="proj__facts">
              <div>
                <p className="proj__fact-k">Industry</p>
                <p>{project.industry}</p>
              </div>
              <div>
                <p className="proj__fact-k">Service</p>
                <p>{project.service}</p>
              </div>
              <div>
                <p className="proj__fact-k">Project</p>
                <p>{project.code}</p>
              </div>
            </div>

            <h1 className="display">{project.title}</h1>
            <p className="body--lg grey pagehead__lede">{project.lede}</p>
          </RiseIn>

          <figure className="media media--16x10">
            <img
              src={`${project.image}?width=1800`}
              srcSet={`${project.image}?width=1200 1200w, ${project.image}?width=1800 1800w`}
              sizes="(max-width: 1099px) calc(100vw - 80px), 1280px"
              alt={project.alt}
              fetchpriority="high"
              decoding="async"
            />
          </figure>
        </header>

        <div className="shell">
          <Block
            label="Overview"
            title={project.lede}
            lede={null}
            paragraphs={project.intro}
          />
          <Block
            label="The Thinking"
            title={project.thinkingTitle}
            lede={project.thinkingLede}
            paragraphs={project.thinking}
          />

          {gallery.length > 0 && (
            <div className="proj__gallery">
              {gallery.map((id, i) => (
                <figure className="media media--16x10" key={id}>
                  <img
                    src={`${galleryUrl(id)}?width=1200`}
                    alt={`${project.title} — application ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          )}

          <Block
            label="The Outcome"
            title={project.outcomeTitle}
            lede={project.outcomeLede}
            paragraphs={project.outcome}
          />

          <nav className="proj__nextnav" aria-label="Project navigation">
            <Link to="/projects" className="nav__link">
              All projects
            </Link>
            <Link to={`/projects/${next.slug}`} className="btn btn--soft">
              Next: {next.title}
              <ArrowUpRight />
            </Link>
          </nav>
        </div>
      </article>
    </>
  )
}
