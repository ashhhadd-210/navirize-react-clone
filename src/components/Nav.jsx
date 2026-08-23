import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { brand, nav } from '../data/site.js'
import { ArrowUpRight, Wordmark } from './icons.jsx'
import RollText from './RollText.jsx'

/**
 * The header is position:fixed and transparent — no blur, no border. An
 * earlier probe concluded it was visible only at the very top; screen
 * recordings of the original show it returning mid-page the moment you
 * scroll UP (it overlays the content, still transparent), then hiding again
 * on the next downward scroll. Programmatic scrollTo jumps don't trigger
 * Framer's direction variant, which is how the first probe got it wrong.
 */
export default function Nav() {
  const [shown, setShown] = useState(true)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y <= 8) setShown(true)
      else if (y < lastY - 2) setShown(true)   // any upward intent reveals it
      else if (y > lastY + 2) setShown(false)  // downward hides it
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // While the mobile sheet is open the bar must stay put regardless of scroll.
  const hidden = !shown && !open

  return (
    <header className={`nav${hidden ? ' nav--hidden' : ''}`}>
      <div className="shell nav__inner">
        <Link to="/" className="nav__logo" aria-label={`${brand.name} — home`}>
          <Wordmark />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav__link">
              <RollText>{item.label}</RollText>
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="btn btn--dark nav__cta">
          Start Your Project
        </Link>

        <button
          type="button"
          className="nav__burger"
          aria-expanded={open}
          aria-controls="nav-sheet"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </div>

      {/* Height animated with the CSS grid 0fr -> 1fr transition rather than a
          motion library. The sheet stays mounted, so the clip carries
          `visibility: hidden` while closed to keep its links untabbable. */}
      <div id="nav-sheet" className="nav__sheet" data-open={open ? 'true' : 'false'}>
        <div className="nav__sheet-clip">
          <div className="shell nav__sheet-inner">
            <Link to="/" className="nav__sheet-link">
              Home
            </Link>
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="nav__sheet-link">
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="nav__sheet-link">
              Contact
            </Link>
            <Link
              to="/contact"
              className="btn btn--dark"
              style={{ marginTop: 26, alignSelf: 'flex-start' }}
            >
              Start Your Project
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
