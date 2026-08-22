import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { brand, footerNav, footerLegal, socials } from '../data/site.js'
import { ArrowUpRight } from './icons.jsx'
import Reveal from './Reveal.jsx'

/**
 * Black footer, measured off the original at 1440x900:
 *   background #000, CTA headline 64/76.8 white, "Let's talk" pill on #f0f0f0,
 *   two link columns at x=919 and x=1152 (208px each), then a 1px rule and a
 *   centred legal line. No brand block, no description paragraph.
 */
/*
 * The curtain reveal. First modelled as position:fixed after the scroll
 * recording, but measuring the live original against normal document flow
 * shows the footer is not pinned — its top eases 380 -> 80 in the viewport
 * across the last 800px of scroll. The offset from flow position fits
 *
 *   offset = 0.685 x (flowTop - finalTop), capped at 0.69 x footer height
 *
 * to within 3px at every probed position: a parallax, the footer closing at
 * ~1/3 of scroll speed while the white content (z 1) slides off it. The
 * wrapper stays in flow and untransformed — its rect IS the flow position —
 * and only the inner element is translated, from a rAF-gated scroll handler.
 */
const CURTAIN_K = 0.685
export default function Footer() {
  // The original's /contact page drops the "Ready when you are." CTA —
  // it would be pointing at the page you are already on.
  const { pathname } = useLocation()
  const showCta = pathname !== '/contact'

  const links = [...footerNav, ...footerLegal]

  const wrapRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.top > vh + 600) return
      const finalTop = vh - rect.height
      const offset = Math.min(
        rect.height * 0.69,
        Math.max(0, CURTAIN_K * (rect.top - finalTop))
      )
      inner.style.transform = offset > 0.5 ? `translateY(${-offset}px)` : 'none'
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [pathname])

  return (
    <footer className="foot-wrap" ref={wrapRef}>
      <div className="foot" ref={innerRef}>
      <div className="shell">
        <Reveal className="foot__top">
          <div>
            {showCta && (
              <>
                <p className="label foot__cta-label">Contact</p>
                <h2 className="display foot__cta-title">Ready when you are.</h2>
                <Link to="/contact" className="btn btn--soft">
                  Let&apos;s talk
                  <ArrowUpRight />
                </Link>
              </>
            )}
          </div>

          <nav aria-label="Footer">
            <ul className="foot__col">
              {links.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ul className="foot__col">
              {socials.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="foot__ext"
                  >
                    {item.label}
                    <ArrowUpRight />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <hr className="foot__rule" />

        <p className="foot__legal">
          © {brand.year} {brand.legalName} · Registry Code: {brand.registryCode}{' '}
          · {brand.country}
        </p>
      </div>
      </div>
    </footer>
  )
}
