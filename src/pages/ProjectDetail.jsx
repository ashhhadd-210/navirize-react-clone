import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import { ArrowUpRight } from '../components/icons.jsx'
import NotFound from './NotFound.jsx'
import { projects, galleryUrl, caseStudies, caseMedia, img, imgSrcSet } from '../data/site.js'

/*
 * Case-study layout, measured off the original at 1440:
 *   meta row      Industry | Service | Project at y=213, values 18px below
 *   title         64px, max 800px
 *   hero          content-width frame, radius 24; the image inside is
 *                 scroll-linked, scale ~1.25 -> 1.0 across its traversal
 *   prose         1200px centred (x=111 in the 1262 content box), 64px lede,
 *                 24px/33.6 paragraphs, section titles 32px/44.8 with their
 *                 "The Thinking:" / "The Outcome:" prefixes inline
 *   media         wide 1262x680-ish (ar 1.86-1.96) and 611x600 pairs (ar 1.02)
 *                 interleaved between sections, radius 24
 *   marquee       an auto-scrolling full-bleed strip of the remaining gallery,
 *                 alternating 500x340 / 350x340 tiles, drifting left ~28px/s
 */

/* The original's hero zoom: measured at scale 1.226 with the hero just below
   the fold, easing to 1 as it travels up the viewport. Scroll-linked, so a
   plain rAF-throttled scroll handler, not an animation. */
function ZoomHero({ project }) {
  const frameRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const frame = frameRef.current
    const image = imgRef.current
    if (!frame || !image) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const r = frame.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the frame's top touches the viewport bottom, 1 when its bottom
      // leaves through the top — the full traversal.
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
      image.style.transform = `scale(${(1.25 - 0.25 * p).toFixed(4)})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <figure className="proj__hero" ref={frameRef}>
      <img
        ref={imgRef}
        src={img(project.image, 2048)}
        srcSet={imgSrcSet(project.image)}
        sizes="(max-width: 767px) calc(100vw - 50px), (max-width: 1099px) calc(100vw - 128px), calc(100vw - 160px)"
        alt={project.alt}
        fetchpriority="high"
        decoding="async"
      />
    </figure>
  )
}

function Wide({ src, alt, second = false }) {
  return (
    <Reveal
      as="figure"
      className={`proj__media proj__media--wide${second ? ' proj__media--second' : ''}`}
    >
      <img src={img(src, 2048)} srcSet={imgSrcSet(src)}
        sizes="(max-width: 767px) calc(100vw - 50px), (max-width: 1099px) calc(100vw - 128px), calc(100vw - 160px)"
        alt={alt} loading="lazy" decoding="async" />
    </Reveal>
  )
}

function Pair({ items }) {
  return (
    <Reveal className="proj__pair">
      {items.map((it) => (
        <figure className="proj__media proj__media--sq" key={it.src}>
          <img src={img(it.src, 1024)} srcSet={imgSrcSet(it.src)}
            sizes="(max-width: 767px) 50vw, calc(50vw - 84px)"
            alt={it.alt} loading="lazy" decoding="async" />
        </figure>
      ))}
    </Reveal>
  )
}

function Prose({ title, big = false, paragraphs }) {
  const Tag = big ? 'h2' : 'h3'
  return (
    <Reveal className="proj__prose">
      <Tag className={big ? 'proj__lede' : 'proj__subtitle'}>{title}</Tag>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 32)}>{p}</p>
      ))}
    </Reveal>
  )
}

/* The closing strip. Evidence, in order of trust:
   - idle drift ~28px/s leftward, measured frame-by-frame off a recording of
     the original (it does not animate at all in headless Chrome, so the live
     measurement could never be repeated there);
   - the client's own screen recording shows the strip being DRAGGED with
     momentum — velocity samples across its frames decay ~0.43x per 1.4s,
     an exponential glide with a ~1.6s time constant.
   So: a pointer-draggable strip with inertia, drifting slowly left when
   idle, wrapping seamlessly across one strip's width. Reduced motion turns
   off the drift; dragging still works. */
function Marquee({ ids }) {
  const trackRef = useRef(null)
  const state = useRef({ offset: 0, vel: 0, dragging: false, lastX: 0, lastT: 0 })

  const widths = ids.map((_, i) => (i % 2 === 0 ? 500 : 350))
  const stripWidth = widths.reduce((a, w) => a + w + 40, 0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const st = state.current
    const drift = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 28
    let raf = 0
    let last = performance.now()

    const step = (now) => {
      const dt = Math.min(64, now - last) / 1000
      last = now
      if (!st.dragging) {
        st.offset -= drift * dt
        if (Math.abs(st.vel) > 2) {
          st.offset += st.vel * dt
          st.vel *= Math.exp(-dt / 1.6)
        } else {
          st.vel = 0
        }
      }
      // keep the offset inside (-stripWidth, 0] so the doubled runs cover it
      st.offset = ((st.offset % stripWidth) - stripWidth) % stripWidth
      track.style.transform = `translateX(${st.offset.toFixed(2)}px)`
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    const down = (e) => {
      st.dragging = true
      st.vel = 0
      st.lastX = e.clientX
      st.lastT = performance.now()
      track.setPointerCapture(e.pointerId)
      track.style.cursor = 'grabbing'
    }
    const move = (e) => {
      if (!st.dragging) return
      const now = performance.now()
      const dx = e.clientX - st.lastX
      const dt = Math.max(1, now - st.lastT) / 1000
      st.offset += dx
      st.vel = 0.8 * st.vel + 0.2 * (dx / dt)
      st.lastX = e.clientX
      st.lastT = now
    }
    const up = (e) => {
      st.dragging = false
      track.style.cursor = 'grab'
      try {
        track.releasePointerCapture(e.pointerId)
      } catch {
        /* pointer already released */
      }
    }
    track.addEventListener('pointerdown', down)
    track.addEventListener('pointermove', move)
    track.addEventListener('pointerup', up)
    track.addEventListener('pointercancel', up)
    return () => {
      cancelAnimationFrame(raf)
      track.removeEventListener('pointerdown', down)
      track.removeEventListener('pointermove', move)
      track.removeEventListener('pointerup', up)
      track.removeEventListener('pointercancel', up)
    }
  }, [stripWidth])

  if (!ids.length) return null
  const tiles = ids.map((id, i) => ({ id, w: widths[i] }))
  return (
    <div className="proj__marquee" aria-hidden="true">
      <div className="proj__marquee-track proj__marquee-track--drag" ref={trackRef}>
        {[0, 1, 2].map((copy) => (
          <div className="proj__marquee-run" key={copy}>
            {tiles.map(({ id, w }) => (
              <figure className="proj__tile" style={{ width: w }} key={copy + id}>
                <img
                  src={img(galleryUrl(id), 512)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return <NotFound />

  const study = caseStudies[slug]
  const media = caseMedia[slug]
  const g = (id) => (id ? galleryUrl(id) : null)
  const alt = (i) => `${project.title} — application ${i + 1}`

  return (
    <>
      <Seo
        title={`Navirize - ${project.title}`}
        description={project.lede}
      />

      <article>
        <header className="shell pagehead">
          <div>
            <dl className="proj__meta">
              <div>
                <dt className="label">Industry</dt>
                <dd>{project.industry}</dd>
              </div>
              <div>
                <dt className="label">Service</dt>
                <dd>{project.service}</dd>
              </div>
              <div>
                <dt className="label">Project</dt>
                <dd>{project.code}</dd>
              </div>
            </dl>
            <h1 className="display display--narrow">{project.title}</h1>
          </div>

          <ZoomHero project={project} />
        </header>

        <div className="shell">
          <Prose big title={study.lede} paragraphs={study.intro} />
          {study.link && (
            <div className="proj__prose proj__visit">
              <a
                className="btn btn--soft"
                href={study.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {study.link.label}
                <ArrowUpRight />
              </a>
            </div>
          )}
          <Wide src={g(media.band1)} alt={alt(0)} />
          <Pair items={[{ src: g(media.pair1[0]), alt: alt(1) }, { src: g(media.pair1[1]), alt: alt(2) }]} />

          <Prose title={study.thinkingTitle} paragraphs={study.thinking} />
          <Wide src={g(media.band2)} alt={alt(3)} second />
          <Pair items={[{ src: g(media.pair2[0]), alt: alt(4) }, { src: g(media.pair2[1]), alt: alt(5) }]} />

          <Prose title={study.outcomeTitle} paragraphs={study.outcome} />
        </div>

        <Marquee ids={media.ticker} />
      </article>
    </>
  )
}
