import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import RiseIn from '../components/RiseIn.jsx'
import TwoTone from '../components/TwoTone.jsx'
import SectionRow from '../components/SectionRow.jsx'
import { ArrowUpRight } from '../components/icons.jsx'
import { whyUs, process, headings, aboutMedia, marks, img, imgSrcSet } from '../data/site.js'
import Reveal from '../components/Reveal.jsx'

function Media({ item, priority = false }) {
  return (
    <figure className="media media--16x10">
      <img
        src={img(item.src, 2048)}
        srcSet={imgSrcSet(item.src)}
        sizes="(max-width: 1099px) calc(100vw - 80px), 1280px"
        alt={item.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </figure>
  )
}

export default function About() {
  return (
    <>
      <Seo
        title="Navirize - About"
        description="Navirize combines strategy, psychology, and design to create work that feels timeless, intentional, and world-class."
      />

      <section className="shell pagehead">
        <RiseIn delay={0.15}>
          <p className="label pagehead__label">About Us</p>
          <TwoTone
            as="h1"
            className="display display--narrow"
            {...headings.aboutHero}
          />
          <p className="pagehead__lede">{headings.aboutLede}</p>
        </RiseIn>

        {/* paired media directly under the hero */}
        <div className="media-pair">
          <Media item={aboutMedia[0]} priority />
          <Media item={aboutMedia[1]} />
        </div>
      </section>

      {/* ---------- mission ---------- */}
      <Reveal as="section" className="shell section">
        <SectionRow label="Our Mission">
          <TwoTone as="h2" className="h-section" {...headings.mission1} />
          <TwoTone as="p" className="h-section" {...headings.mission2} />
        </SectionRow>
        <Media item={aboutMedia[2]} />
      </Reveal>

      {/* ---------- why us ---------- */}
      <Reveal as="section" className="shell section">
        <SectionRow label="Why Us">
          <TwoTone as="h2" className="h-section" {...headings.whyUs} />
        </SectionRow>

        <div className="stack">
          {whyUs.map((item, i) => (
            <div className="stack__item" key={item.title}>
              <p className="stack__k">{String(i + 1).padStart(2, '0')}</p>
              <div>
                <h3 className="stack__title">{item.title}</h3>
                <p className="stack__body">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ---------- process ---------- */}
      <Reveal as="section" className="shell section">
        <SectionRow label="How We Work">
          <TwoTone as="h2" className="h-section" {...headings.process} />
        </SectionRow>

        <ol className="stack">
          {process.map((item) => (
            <li className="stack__item" key={item.step}>
              <p className="stack__k">{item.step}</p>
              <div>
                <h3 className="stack__title">{item.title}</h3>
                <p className="stack__body">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <Media item={aboutMedia[3]} />
      </Reveal>

      {/* ---------- work closer ---------- */}
      <Reveal as="section" className="shell section">
        <SectionRow
          label="Designing Success"
          action={
            <Link to="/projects" className="btn btn--soft">
              Our Work
              <ArrowUpRight />
            </Link>
          }
        >
          <TwoTone as="h2" className="h-section" {...headings.aboutWork} />
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
