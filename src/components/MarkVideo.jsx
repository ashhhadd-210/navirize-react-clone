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
 * LOOPING. A single looping <video> re-seeks to 0 at the wrap, and the
 * browser reports `waiting` while it does — a decode discontinuity the
 * client sees as a blink every time round. Two elements are used instead:
 * one plays while the other waits at 0, and they hand over a few frames
 * before the end. Each element only ever plays FORWARD, so nothing ever
 * seeks mid-playback and there is no stall. The capture is a seamless loop,
 * so its last frames and first frames match and the hand-over is invisible.
 */

/* How far before the end to hand over, in seconds — two frames at 30fps. */
const SWAP_LEAD = 0.07

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

    let front = a
    let back = b
    front.style.opacity = '1'
    back.style.opacity = '0'
    play(front)

    /* Some browsers refuse a muted autoplay (data saver, low-power mode) and
       leave the poster showing, which reads as a still image. Nudge it on
       mount and again on the first interaction. */
    const nudge = () => play(front)
    document.addEventListener('touchstart', nudge, { once: true, passive: true })
    document.addEventListener('click', nudge, { once: true })

    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const d = front.duration
      if (!d || Number.isNaN(d)) return
      if (front.currentTime < d - SWAP_LEAD) return

      // hand over: the waiting element is already primed at 0
      play(back)
      back.style.opacity = '1'
      front.style.opacity = '0'
      front.pause()
      try {
        front.currentTime = 0 // rewind out of sight, ready for its next turn
      } catch {
        /* a seek can throw if metadata is not ready yet; the next pass retries */
      }
      const prev = front
      front = back
      back = prev
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
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
