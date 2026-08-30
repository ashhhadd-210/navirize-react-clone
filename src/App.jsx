import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'

import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import Prefetch from './components/Prefetch.jsx'

import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

/* The original is a multi-page site. Screencasting its navigation showed the
   sequence a visitor actually sees: the OLD page stays fully painted for
   ~250ms while the next document loads (browser paint-holding), then the new
   page appears already fading in on its measured exponential curve. An SPA
   swaps instantly, which read as the old page vanishing into a near-blank
   frame — so navigation here holds the outgoing location for 250ms before
   swapping, and only scrolls to the top at the moment of the swap. */
/* .page-wrap carries the opaque background and z-index that keep the page
   above the fixed footer; the fade lives on <main> inside it, so the footer
   never flashes through during a route transition. */
/* No page-level fade, on first paint or on navigation. The original loads
   a fresh document on every link: the screen goes briefly blank and the new
   page then arrives element by element, heading lines leading. Fading the
   whole <main> as one block washed all of that out — every element came up
   together at a uniform opacity, which is what the client saw as the flow
   being wrong. With it gone, a route change replays the same staggered
   entrance the first load does. */
function Page({ children, leaving }) {
  return (
    <div className="page-wrap">
      <main id="main" className={leaving ? 'page-leaving' : undefined}>
        {children}
      </main>
    </div>
  )
}

const routes = [
  { path: '/', el: <Home /> },
  { path: '/projects', el: <Projects /> },
  { path: '/projects/:slug', el: <ProjectDetail /> },
  { path: '/about', el: <About /> },
  { path: '/contact', el: <Contact /> },
  { path: '/terms', el: <Legal which="terms" /> },
  { path: '/privacy-policy', el: <Legal which="privacy" /> },
  { path: '*', el: <NotFound /> },
]

const HOLD_MS = 250

export default function App() {
  const location = useLocation()
  const navType = useNavigationType()
  const [shown, setShown] = useState(location)
  /* "When I click a link it should fade to white, then load, then stagger
     animate." The outgoing page fades out over the hold; the incoming one
     runs its own entrance. page-wrap stays white underneath, so what you see
     is the content dissolving into the page colour rather than a flash. */
  const [leaving, setLeaving] = useState(false)

  /* The original is a multi-page site, so the browser restores the scroll
     position on back/forward. Mirror that: remember where each history
     entry was, scroll new navigations to the top, restore traversals. */
  const positions = useRef(new Map())

  /* iOS Safari only honours :active on an element once the document has a
     touch listener, so without this the press on a button does nothing on
     the client's phone. An empty passive listener is enough. */
  useEffect(() => {
    const noop = () => {}
    document.addEventListener('touchstart', noop, { passive: true })
    return () => document.removeEventListener('touchstart', noop)
  }, [])

  useEffect(() => {
    if (location === shown) return
    // capture the outgoing page's position once, at navigation time —
    // a continuous scroll listener would race the swap's own scrollTo
    positions.current.set(shown.key, window.scrollY)
    setLeaving(true)
    const t = setTimeout(() => {
      const y =
        navType === 'POP' ? (positions.current.get(location.key) ?? 0) : 0
      window.scrollTo(0, y)
      setShown(location)
      setLeaving(false)
    }, HOLD_MS)
    return () => clearTimeout(t)
  }, [location, shown, navType])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SmoothScroll />
      <Prefetch />
      <Nav />

      <Routes location={shown} key={shown.pathname}>
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={<Page leaving={leaving}>{r.el}</Page>} />
        ))}
      </Routes>

      {/* Transparent run-off the height of the footer. The footer is pinned
          behind the page, so the document needs this much extra scroll for
          the page to slide up and uncover it. A margin on .page-wrap would
          collapse away, and padding there would stay opaque white. */}
      <div className="foot-spacer" aria-hidden="true" />

      <Footer />
    </>
  )
}
