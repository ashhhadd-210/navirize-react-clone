import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import TwoTone from '../components/TwoTone.jsx'
import SectionRow from '../components/SectionRow.jsx'
import { ArrowUpRight } from '../components/icons.jsx'
import { whyUs, process, headings, aboutMedia, img, imgSrcSet } from '../data/site.js'
import Reveal from '../components/Reveal.jsx'

function Media({ item, priority = false, wide = true }) {
  return (
    <figure className={`media media--about ${wide ? 'media--1262x650' : ''}`}>
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

      <Reveal as="section" className="shell pagehead">
        <div>
          <p className="label pagehead__label">About Us</p>
          <TwoTone
            as="h1"
            stagger
            className="display slidein display--narrow"
            {...headings.aboutHero}
          />
          <p className="pagehead__lede">{headings.aboutLede}</p>
        </div>

        {/* paired media directly under the hero */}
        <div className="media-pair">
          <Media item={aboutMedia[0]} priority wide={false} />
          <Media item={aboutMedia[1]} wide={false} />
        </div>
      </Reveal>

      {/* ---------- mission ---------- */}
      <Reveal as="section" axis="x" className="shell section section--about">
        <SectionRow label="Our Mission" className="row--wide">
          {/* the original's tablet/phone variant swaps the last words of the
              first sentence: "premium craftsmanship." -> "excellence." */}
          <h2 className="h-section">
            Our mission is to redefine digital aesthetics with precision,
            clarity, and <span className="bp-lg">premium craftsmanship.</span>
            <span className="bp-sm">excellence.</span>
          </h2>
          <TwoTone as="p" className="h-section" {...headings.mission2} />
        </SectionRow>
        <Media item={aboutMedia[2]} />
      </Reveal>

      {/* ---------- why us ---------- */}
      <Reveal as="section" axis="x" className="shell section section--about">
        <SectionRow label="Why Us" className="row--wide">
          <TwoTone as="h2" className="h-section" breakLine {...headings.whyUs} />
        </SectionRow>

        <div className="stack stack--why">
          {whyUs.map((item) => (
            <div className="stack__item stack__item--plain" key={item.title}>
              <div>
                <h3 className="stack__title">{item.title}</h3>
                <p className="stack__body">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* On the original this image sits between Why Us and How We Work,
            not after the process steps. */}
        <Media item={aboutMedia[3]} />
      </Reveal>

      {/* ---------- process ---------- */}
      <Reveal as="section" axis="x" className="shell section section--about">
        <SectionRow label="How We Work" className="row--wide">
          <TwoTone as="h2" className="h-section" {...headings.process} />
        </SectionRow>

        <ol className="stack stack--proc">
          {process.map((item) => (
            <li className="stack__item" key={item.step}>
              <p className="stack__k">{item.step}</p>
              <h3 className="stack__title">{item.title}</h3>
              {/* description spans the full row under the number, measured
                  at x=355 on the original — the number column's own x */}
              <p className="stack__body">{item.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* ---------- work closer ---------- */}
      <Reveal as="section" axis="x" className="shell section section--about section--tail">
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

    </>
  )
}
