import { img, marks } from '../data/site.js'

/**
 * The chrome "N" between the last section and the footer. On the original
 * this is a live WebGL shader (data-framer-component-type="Shader") with the
 * PNG as a fade-in fallback — the metal highlights flow continuously.
 *
 * The shader itself isn't extractable, so this is a capture of its canvas
 * output, recorded straight off the live site at 2x:
 *   n-mark.webm       VP9 with alpha — composites onto the page background
 *   n-mark-white.mp4  H.264, white-matted — Safari, which drops VP9 alpha
 * The PNG stays as poster and reduced-motion/no-video fallback.
 */
export default function MarkVideo() {
  return (
    <div className="shell mark">
      <video
        width="181"
        height="196"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={img(marks.n, 512)}
        aria-hidden="true"
      >
        <source src="/media/n-mark.webm" type="video/webm" />
        <source src="/media/n-mark-white.mp4" type="video/mp4" />
        <img src={img(marks.n, 512)} alt="" width="181" height="196" loading="lazy" />
      </video>
    </div>
  )
}
