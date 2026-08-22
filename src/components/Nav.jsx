import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { brand, nav } from '../data/site.js'
import { ArrowUpRight, Wordmark } from './icons.jsx'

/**
 * Measured behaviour on the original: the header is position:fixed with a
 * transparent background (no blur, no border) and is visible ONLY at the very
 * top of the document. A sweep of scrollY = 0 / 20 / 40 / 60 / 80 / 120 / 200
 * / 400 showed it visible at 0 and translated out of view at every other
 * offset — it does not return on scroll-up, only on reaching the top again.
 */
export default function Nav() {
  const [atTop, setAtTop] = useState(true)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY <= 8)
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
  const hidden = !atTop && !open

  return (
    <header className={`nav${hidden ? ' nav--hidden' : ''}`}>
      <div className="shell nav__inner">
        <Link to="/" className="nav__logo" aria-label={`${brand.name} — home`}>
          <Wordmark />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav__link">
              {item.label}
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

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="nav-sheet"
            className="nav__sheet"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
