import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

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
   fight the on-mount rise of the page content underneath. */
function Page({ children }) {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: 'linear' }}
    >
      {children}
    </motion.main>
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
      <Nav />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {routes.map((r) => (
            <Route key={r.path} path={r.path} element={<Page>{r.el}</Page>} />
          ))}
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  )
}
