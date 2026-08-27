import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { brand, footerNav, footerLegal, socials } from '../data/site.js'
import { ArrowUpRight } from './icons.jsx'
import RollText from './RollText.jsx'

/**
 * Black footer, measured off the original at 1440x900:
 *   background #000, CTA headline 64/76.8 white, "Let's talk" pill on #f0f0f0,
 *   two link columns at x=919 and x=1152 (208px each), then a 1px rule and a
 *   centred legal line. No brand block, no description paragraph.
 */
/*
 * There is NO parallax on the footer. Probing the live original at 390 and
 * 1440 shows the inner footer holds a constant offset from its wrapper at
 * every scroll position (-48 phone / -80 desktop, i.e. its own padding) —
 * it simply scrolls in normal flow. An earlier reading of the scroll
 * recording modelled this as a curtain, which on mobile dragged the footer
 * up over the page content and hid its CTA.
 */
export default function Footer() {
  /* The footer lies BEHIND the page rather than after it: the page is an
     opaque layer above, and as you reach the end it slides up and uncovers
     the footer sitting underneath. The client's own words — "it looks like a
     section behind the page, like with z index behind the page ... and when I
     scroll I should see the page look independent from the footer and slowly
     reveal what's behind." A fixed footer needs the flow to reserve its
     height, so its measured height is published as --foot-h. */
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const publish = () => {
      document.documentElement.style.setProperty('--foot-h', el.offsetHeight + 'px')
    }
    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(el)
    window.addEventListener('resize', publish)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', publish)
    }
  }, [])

  // Measured on the original: the "Ready when you are." CTA renders on
  // every page, /contact included (872px at 1440, 1506 at 1024).
  const showCta = true

  const links = [...footerNav, ...footerLegal]

  return (
    <footer className="foot-wrap" ref={wrapRef}>
      <div className="foot">
      <div className="shell">
        <div className="foot__top">
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
                  <Link to={item.to}>
                    <RollText>{item.label}</RollText>
                  </Link>
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
                    <RollText>{item.label}</RollText>
                    <ArrowUpRight />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

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
