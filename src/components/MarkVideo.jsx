import { useEffect, useRef } from 'react'
import { img, marks } from '../data/site.js'

/**
 * The chrome "N" between the last section and the footer. On the original
 * this is a live WebGL shader (data-framer-component-type="Shader") with the
 * PNG as a fade-in fallback — the metal highlights flow continuously.
 *
 * The shader itself isn't extractable, so this is a capture of its canvas
 * output, recorded straight off the live site at 2x:
 *   n-mark.webm       VP9 with alpha — composites onto whatever is behind it
 *   n-mark-white.mp4  H.264, white-matted — for Safari, which drops VP9 alpha
 *
 * The alpha clip has to come first. The white-matted H.264 decodes in
 * hardware and never stutters, but its matte is only invisible on a white
 * page: Android's forced dark theme darkens the page and leaves media alone,
 * so it showed as a white square.
 *
 * LOOPING. The source capture is damaged: scanning it frame by frame shows
 * a hard cut 0.39s in — a frame-to-frame change of 86.8 where the clip
 * averages 2.1 — and a smaller one at 1.87s. Those replay on every lap,
 * which is the glitch. So only the clean stretch is ever shown, 2.9s to
 * 10.2s, and the two ends of that window do not match either (a seam of
 * 8.6), so the hand-over is a short CROSSFADE rather than a cut.
 *
 * Two elements make that possible: one plays the window while the other
 * waits primed at 2.9s, and they cross over. Neither ever seeks while
 * visible, so there is no decode stall either.
 */

/* The clean window inside the capture, and the crossfade that hides its
   seam. Measured, not guessed: see the note above. */
const START = 2.9
const END = 10.2
const FADE = 0.45

export default function MarkVideo() {
  const aRef = useRef(null)
  const bRef = useRef(null)

  useEffect(() => {
    const a = aRef.current
    const b = bRef.current
    if (!a || !b) return

    const play = (v) => {
      const r = v.play()
      if (r && r.catch) r.catch(() => {})
    }
    const prime = (v) => {
      try {
        v.currentTime = START
      } catch {
        /* metadata not ready yet; onloadedmetadata below retries */
      }
    }

    let front = a
    let back = b
    let fading = false

    const start = () => {
      prime(front)
      prime(back)
      front.style.opacity = '1'
      back.style.opacity = '0'
      play(front)
    }
    if (a.readyState >= 1) start()
    else a.addEventListener('loadedmetadata', start, { once: true })

    /* Some browsers refuse a muted autoplay (data saver, low-power mode) and
       leave the poster showing, which reads as a still image. */
    const nudge = () => play(front)
    document.addEventListener('touchstart', nudge, { once: true, passive: true })
    document.addEventListener('click', nudge, { once: true })

    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (fading || front.readyState < 2) return
      if (front.currentTime < END - FADE) return

      // cross over: the waiting clip is already primed at START
      fading = true
      const outgoing = front
      const incoming = back
      prime(incoming)
      play(incoming)
      incoming.style.opacity = '1'
      outgoing.style.opacity = '0'
      front = incoming
      back = outgoing

      window.setTimeout(() => {
        outgoing.pause()
        prime(outgoing)
        fading = false
      }, FADE * 1000)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      a.removeEventListener('loadedmetadata', start)
      document.removeEventListener('touchstart', nudge)
      document.removeEventListener('click', nudge)
    }
  }, [])

  const clip = (ref, autoPlay) => (
    <video
      ref={ref}
      className="mark__clip"
      width="181"
      height="196"
      autoPlay={autoPlay}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      poster={img(marks.n, 512)}
      aria-hidden="true"
    >
      <source src="/media/n-mark.webm" type="video/webm" />
      <source src="/media/n-mark-white.mp4" type="video/mp4" />
      <img src={img(marks.n, 512)} alt="" width="181" height="196" loading="lazy" />
    </video>
  )

  return (
    <div className="shell mark">
      <div className="mark__band">
        <div className="mark__stack">
          {clip(aRef, true)}
          {clip(bRef, false)}
        </div>
      </div>
    </div>
  )
}
