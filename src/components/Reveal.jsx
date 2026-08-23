import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * The original's scroll reveal, sampled frame by frame off the live site in
 * headless Chrome.
 *
 * An earlier measurement pass concluded the original had no scroll-triggered
 * reveals — it read mid-page sections as opacity:1 while they were still far
 * below the fold. That was a false negative: those particular sections really
 * are static, but nine other blocks on the home page are not. Snapshotting
 * every element's computed style, scrolling the whole document, then diffing
 * found the featured card, all three grid cards, Shaping Perception, Services,
 * Our Story, their two buttons and the footer CTA all starting at
 * `opacity: 0; translateY(30px)`.
 *
 * Measured behaviour:
 *   trigger   the element's top crossing 40px inside the viewport bottom
 *   from      opacity 0, translateY 30px
 *   to        opacity 1, translateY 0
 *   duration  ~1500ms
 *   easing    a spring — slow to leave, then a long asymptotic tail. Both
 *             properties are driven by one progress function: at t=378ms
 *             opacity read 0.4579 and translateY read 16.26, and
 *             30 * (1 - 0.4579) = 16.26 exactly.
 *   one-shot  it does not reverse when scrolled back past.
 *
 * The spring is reproduced in CSS with `linear()` built from the samples (see
 * --reveal-spring in index.css), so this stays a class toggle with no
 * animation library and no per-frame JS.
 */

// One observer for every reveal on the page rather than one each.
let observer = null
const callbacks = new WeakMap()

function observe(el, cb) {
  if (typeof IntersectionObserver === 'undefined') {
    cb()
    return () => {}
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const fn = callbacks.get(entry.target)
          observer.unobserve(entry.target) // one-shot, like the original
          callbacks.delete(entry.target)
          if (fn) fn()
        }
      },
      // Measured: fires when the top is 40px inside the viewport bottom.
      { rootMargin: '0px 0px -40px 0px', threshold: 0 }
    )
  }
  callbacks.set(el, cb)
  observer.observe(el)
  return () => {
    if (observer) observer.unobserve(el)
    callbacks.delete(el)
  }
}

export function useReveal() {
  const ref = useRef(null)
  // 'instant' | 'hidden' | 'shown'
  const [state, setState] = useState('hidden')

  /* Layout effect, not effect: the in-view decision must land BEFORE the
     first paint, or above-fold content flashes a frame (or more, under
     load) of opacity 0 at every route change. The original paints its
     in-view content faintly from the very first frame of a page fade. */
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || state !== 'hidden') return
    /* Sampled on the original's page loads: content already inside the
       viewport fades in with the page itself — it does NOT run the slow
       scroll spring. Only content that arrives by scrolling gets the
       30px/1.5s reveal. */
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
      setState('instant')
      return
    }
    return observe(el, () => setState('shown'))
  }, [state])

  const className =
    state === 'instant' ? '' : state === 'shown' ? 'reveal reveal--in' : 'reveal'
  return { ref, className }
}

export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const { ref, className: revealClass } = useReveal()
  return (
    <Tag ref={ref} className={className ? `${className} ${revealClass}` : revealClass} {...rest}>
      {children}
    </Tag>
  )
}
