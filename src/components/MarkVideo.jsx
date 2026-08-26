import { useEffect, useRef } from 'react'
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
  const ref = useRef(null)

  /* Some browsers refuse a muted autoplay (data saver, low-power mode) and
     leave the poster showing, which reads as a still image — the client saw
     it as "an svg". Nudge it on mount and again on the first interaction. */
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const play = () => {
      const r = v.play()
      if (r && r.catch) r.catch(() => {})
    }
    play()
    document.addEventListener('touchstart', play, { once: true, passive: true })
    document.addEventListener('click', play, { once: true })
    return () => {
      document.removeEventListener('touchstart', play)
      document.removeEventListener('click', play)
    }
  }, [])

  return (
    <div className="shell mark">
      <div className="mark__band">
      <video
        ref={ref}
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
    </div>
  )
}
