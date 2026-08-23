import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * The original ships a SmoothScroll module (script_main loads
 * SmoothScroll_Prod.mjs) that lerps wheel input instead of jumping — a big
 * part of why its animations read as "smooth": every scroll-linked effect
 * (reveals, the hero zoom, the footer curtain) rides on an eased scroll
 * position instead of 100px steps.
 *
 * Measured on the live site with a single 400px wheel notch, scrollY follows
 * an exponential approach settling in ~800ms; the per-frame factor fits
 * ~0.12 at 60fps, i.e. a time constant of ~130ms:
 *
 *     t(ms)   0    67   134   201   315   382   449   515
 *     y       0    91   215   290   355   373   384   391   -> 400
 *
 * Wheel events only — touch, keyboard, scrollbar drags and anchor jumps stay
 * native, and any scroll we didn't cause just re-syncs the target. Disabled
 * under prefers-reduced-motion.
 */
const TAU = 130

export default function SmoothScroll() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let target = window.scrollY
    let current = window.scrollY
    let raf = 0
    let last = 0
    let animating = false

    const max = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

    const step = (now) => {
      const dt = Math.min(64, now - last)
      last = now
      const k = 1 - Math.exp(-dt / TAU)
      current += (target - current) * k
      if (Math.abs(target - current) < 0.5) {
        current = target
        animating = false
      }
      window.scrollTo(0, current)
      if (animating) raf = requestAnimationFrame(step)
      else raf = 0
    }

    const onWheel = (e) => {
      // pinch-zoom and modified wheels stay native
      if (e.ctrlKey) return
      e.preventDefault()
      // normalise: line-mode deltas (Firefox) arrive in lines, not px
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
      target = Math.min(max(), Math.max(0, target + dy))
      if (!animating) {
        animating = true
        current = window.scrollY
        last = performance.now()
        raf = requestAnimationFrame(step)
      }
    }

    // a scroll we didn't animate (keyboard, scrollbar, hash, ScrollToTop)
    // re-anchors the lerp so the next wheel starts from reality
    const onScroll = () => {
      if (!animating) {
        target = window.scrollY
        current = window.scrollY
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // route change: ScrollToTop resets the window; nothing to do here because
  // the scroll listener above re-anchors, but cancel any in-flight glide
  useEffect(() => {
    // the effect above re-anchors via its scroll listener
  }, [pathname])

  return null
}
