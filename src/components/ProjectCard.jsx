import { Link } from 'react-router-dom'
import { ArrowUpRight } from './icons.jsx'

/**
 * Two variants, both measured on the original:
 *   featured  1280 x 709  (aspect 1.805) — full content width, first item only
 *   grid       620 x 509  (aspect 1.218) — 2 columns, 40px gap
 * Both: 24px corner radius (found three levels up from the <img>), a
 * translucent circular arrow inset 20px from the bottom-left of the frame,
 * and the category/title stacked 24px below the image.
 */
export default function ProjectCard({ project, variant = 'grid', priority = false }) {
  const featured = variant === 'featured'
  const w = featured ? 1800 : 1200

  return (
    <Link to={`/projects/${project.slug}`} className="card">
      <div className={`card__frame card__frame--${featured ? 'featured' : 'grid'}`}>
        <img
          className="card__img"
          src={`${project.image}?width=${w}`}
          srcSet={`${project.image}?width=800 800w, ${project.image}?width=1200 1200w, ${project.image}?width=1800 1800w`}
          sizes={
            featured
              ? '(max-width: 767px) 100vw, (max-width: 1099px) calc(100vw - 80px), 1280px'
              : '(max-width: 767px) 100vw, (max-width: 1099px) calc(50vw - 60px), 620px'
          }
          alt={project.alt}
          loading={priority ? 'eager' : 'lazy'}
          /* lowercase: React 18 does not recognise the camelCase form */
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
        <span className="card__badge">
          <ArrowUpRight size={18} className="" />
        </span>
      </div>

      <div className="card__meta">
        <p className="card__cat">{project.category}</p>
        <h3 className="card__title">{project.title}</h3>
      </div>
    </Link>
  )
}
