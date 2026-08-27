import { useLayoutEffect, useRef } from 'react'

/**
 * Scroll reveal, one element at a time.
 *
 * The client's brief for this is precise: "each item should be independent —
 * when I scroll to the first and second item they should trigger, not the
 * other items; when I scroll to the fourth, only the first four should
 * stagger." So a section no longer fires its children on a delay chain when
 * the section itself appears. Every animatable element is observed on its
 * own and animates when IT arrives, which means the pace of the stagger is
 * set by how fast you scroll rather than by a fixed timer.
 *
 * Direction is per element, also from the client: "text is animating from
 * right to left and images from bottom to up." Anything whose content is a
 * picture rises; everything else slides in from the right.
 *
 * The trigger sits well inside the viewport (see TRIGGER). Firing as soon as
 * an element's first pixel appeared meant it had finished before it was
 * properly on screen — "it's animating too early and I can't see it".
 */

/* Fraction of the viewport an element's top must cross before it starts.
   Twice reported as late, so it sits high now: an element begins as soon as
   it is a little way onto the screen. Anything already visible at mount is
   handled separately, below. */
const TRIGGER = 0.94

/* Containers whose CHILDREN are the real items — a list must arrive row by
   row, not as one block. */
const GROUPS = 'ul, ol, .acc, .stack, .row, .media-pair, .proj__pair, .work__grid, .contact__meta, .foot__col'

/* Elements that are pictures: these rise from below instead of sliding in. */
const VISUAL = 'img, video, figure, picture, canvas'

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
          observer.unobserve(entry.target) // one-shot; it never plays backwards
          callbacks.delete(entry.target)
          if (fn) fn()
        }
      },
      {
        // negative bottom margin = the element must come this far in first
        rootMargin: `0px 0px -${Math.round((1 - TRIGGER) * 100)}% 0px`,
        threshold: 0,
      }
    )
  }
  callbacks.set(el, cb)
  observer.observe(el)
  return () => {
    if (observer) observer.unobserve(el)
    callbacks.delete(el)
  }
}

/** The individual things that should animate inside a section. */
function items(root) {
  const out = []
  for (const child of root.children) {
    if (child.matches(GROUPS)) {
      for (const row of child.children) out.push(row)
    } else if (!child.classList.contains('slidein') && child.querySelector('.w')) {
      /* A wrapper holding a line-staggered heading. Treating it as one item
         skipped everything in it, which is why the copy under a page title
         sat dead still — "this doesn't animate at all". Go a level deeper so
         its siblings animate and the heading keeps its own word stagger. */
      for (const inner of child.children) out.push(inner)
    } else {
      out.push(child)
    }
  }
  return out
}

function isVisual(el) {
  if (el.matches(VISUAL)) return true
  const inner = el.querySelector(VISUAL)
  if (!inner) return false
  // a picture counts only if it IS the element's content, not a stray icon
  return inner.getBoundingClientRect().height > el.getBoundingClientRect().height * 0.6
}

export function useReveal() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const stops = []

    for (const node of items(el)) {
      if (node.dataset.rv) continue
      // the marquee drives its own transform — a reveal on it fights the drift
      if (node.closest('.proj__marquee') || node.querySelector('.proj__marquee')) continue
      // a line-staggered heading animates its own words — leave it alone
      if (node.classList.contains('slidein') || node.querySelector('.w')) continue
      node.dataset.rv = '1'
      node.classList.add('rv', isVisual(node) ? 'rv--up' : 'rv--in-x')

      const show = () => node.classList.add('rv--on')

      /* At mount, anything with a pixel on screen plays immediately — the
         client wants "a glimpse of the first project before I scroll", so a
         card peeking at the bottom edge must not sit invisible waiting for a
         scroll that has not happened. The tighter TRIGGER applies only to
         things that arrive later. */
      const r = node.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) {
        show()
        continue
      }
      stops.push(observe(node, show))

      /* Belt and braces: under a fast flick the observer can miss an element.
         A rAF-gated scroll check guarantees nothing is left invisible. */
      let raf = 0
      const onScroll = () => {
        if (raf) return
        raf = requestAnimationFrame(() => {
          raf = 0
          if (node.getBoundingClientRect().top < window.innerHeight * TRIGGER) {
            show()
            window.removeEventListener('scroll', onScroll)
          }
        })
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      stops.push(() => {
        window.removeEventListener('scroll', onScroll)
        if (raf) cancelAnimationFrame(raf)
      })
    }

    return () => stops.forEach((s) => s())
  })

  return ref
}

export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useReveal()
  // `axis` used to be a prop; direction is now decided per element.
  delete rest.axis
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
