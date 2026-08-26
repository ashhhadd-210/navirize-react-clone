import { Link } from 'react-router-dom'
import { ArrowUpRight } from './icons.jsx'
import { img, imgSrcSet } from '../data/site.js'

/**
 * Two variants, both measured on the original:
 *   featured  1280 x 709  (aspect 1.805) — full content width, first item only
 *   grid       620 x 509  (aspect 1.218) — 2 columns, 40px gap
 * Both: 24px corner radius (found three levels up from the <img>), a
 * translucent circular arrow inset 20px from the bottom-left of the frame,
 * and the category/title stacked 24px below the image.
 */
export default function ProjectCard({ project, variant = 'grid', priority = false, index = 0 }) {
  const featured = variant === 'featured'
  // Featured renders 1280 CSS px, grid cards 620 — so 2048 covers the featured
  // at 1.6x and the grid cards well past 2x. 4096 is never worth its weight.
  const fallback = featured ? 2048 : 1024

  return (
    <Link to={`/projects/${project.slug}`} className="card">
      <div className={`card__frame card__frame--${featured ? 'featured' : 'grid'}`}>
        <img
          className="card__img"
          src={img(project.image, fallback)}
          srcSet={imgSrcSet(project.image)}
          sizes={
            featured
              ? '(max-width: 767px) calc(100vw - 50px), (max-width: 1099px) calc(100vw - 128px), calc(100vw - 160px)'
              : '(max-width: 767px) calc(100vw - 50px), calc(50vw - 100px)'
          }
          alt={project.alt}
          loading={priority ? 'eager' : 'lazy'}
          /* lowercase: React 18 does not recognise the camelCase form */
          fetchpriority={priority ? 'high' : 'auto'}
          /* sync decode for above-fold cards: with the cache warmed by
             Prefetch, this paints the image on the mount frame instead of
             a grey placeholder a few frames into the page fade */
          decoding={priority ? 'sync' : 'async'}
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
