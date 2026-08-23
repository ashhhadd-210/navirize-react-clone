import { Routes, Route, useLocation } from 'react-router-dom'

import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'

import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

/* The original is a multi-page site, so navigation there is a full document
   load with no transition. This is an SPA, so a short opacity-only fade keeps
   route changes from snapping — deliberately no vertical movement, which would
   fight the on-mount rise of the page content underneath.

   Previously an AnimatePresence exit/enter pair. The exit half is gone: it held
   the outgoing page mounted for 220ms before the new one could paint, which on
   a multi-page site the original renders with plain document loads bought
   nothing but latency. Keying <main> on the pathname remounts it, which
   restarts the CSS enter fade. */
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

export default function App() {
  const location = useLocation()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <SmoothScroll />
      <Nav />

      <Routes location={location} key={location.pathname}>
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={<Page>{r.el}</Page>} />
        ))}
      </Routes>

      <Footer />
    </>
  )
}
