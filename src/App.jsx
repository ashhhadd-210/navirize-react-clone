import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

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
function Page({ children }) {
  return (
    <div className="page-wrap">
      <main id="main" className="page-fade">
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
  const [shown, setShown] = useState(location)

  useEffect(() => {
    if (location === shown) return
    const t = setTimeout(() => {
      window.scrollTo(0, 0)
      setShown(location)
    }, HOLD_MS)
    return () => clearTimeout(t)
  }, [location, shown])

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
          <Route key={r.path} path={r.path} element={<Page>{r.el}</Page>} />
        ))}
      </Routes>

      <Footer />
    </>
  )
}
