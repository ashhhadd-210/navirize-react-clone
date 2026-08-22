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
 * The curtain reveal, visible in the original's scroll recording: the black
 * footer does not scroll up with the page — it sits fixed behind everything
 * and is UNCOVERED as the white content slides away (its top edge cuts through
 * the footer text while scrolling). Implemented as position:fixed at z 0 with
 * the page content above it at z 1, plus an in-flow spacer matched to the
 * footer's height so the document keeps its scroll length. If the footer is
 * ever taller than the viewport (small phones), the effect degrades to a
 * normal in-flow footer rather than clipping its top off.
 */
export default function Footer() {
  // The original's /contact page drops the "Ready when you are." CTA —
  // it would be pointing at the page you are already on.
  const { pathname } = useLocation()
  const showCta = pathname !== '/contact'

  const links = [...footerNav, ...footerLegal]

  const footRef = useRef(null)
  const spacerRef = useRef(null)

  useEffect(() => {
    const foot = footRef.current
    const spacer = spacerRef.current
    if (!foot || !spacer) return
    const fit = () => {
      const h = foot.offsetHeight
      const curtain = h < window.innerHeight * 0.96
      foot.classList.toggle('foot--curtain', curtain)
      spacer.style.height = curtain ? `${h}px` : '0px'
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(foot)
    window.addEventListener('resize', fit)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [pathname])

  return (
    <>
      <div className="foot-spacer" ref={spacerRef} aria-hidden="true" />
      <footer className="foot" ref={footRef}>
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
      </footer>
    </>
  )
}
