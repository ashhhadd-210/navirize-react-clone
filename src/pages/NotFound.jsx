import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { ArrowUpRight } from '../components/icons.jsx'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Navirize - Page not found"
        description="The page you were looking for does not exist."
      />
      <div className="shell nf">
        <p className="label label--grey">404</p>
        <h1 className="display">This page doesn’t exist.</h1>
        <p className="body--lg grey" style={{ maxWidth: 460 }}>
          The link may be out of date, or the page may have moved.
        </p>
        <Link to="/" className="btn btn--dark">
          Back home
          <ArrowUpRight />
        </Link>
      </div>
    </>
  )
}
