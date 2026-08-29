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
   0.94 was an overshoot: an element fired with ~6% of it showing, so it had
   finished before you could see it — the animations read as missing. The
   "too late" report behind that change was really about the first card not
   being alive at load, which the mount rule below handles instead. 0.85
   starts it as it genuinely comes into view. */
const TRIGGER = 0.85

/* Containers whose CHILDREN are the real items — a list must arrive row by
   row, not as one block. */
const GROUPS =
  'ul, ol, .acc, .stack, .row, .media-pair, .proj__pair, .work__grid, .contact__meta, .foot__col, .form'

/* Elements that are pictures: these rise from below instead of sliding in. */
const VISUAL = 'img, video, figure, picture, canvas'

let observer = null
const callbacks = new WeakMap()

/* A single global sweep, bound once. The observer is the normal path, but it
   can be torn down by a re-render, and anything it drops would sit at
   opacity 0 forever — invisible content, not just a missing animation. This
   guarantees that never happens. */
let sweepBound = false
function bindSweep() {
  if (sweepBound || typeof window === 'undefined') return
  sweepBound = true
  let raf = 0
  const sweep = () => {
    raf = 0
    const vh = window.innerHeight
    for (const el of document.querySelectorAll('.rv:not(.rv--on)')) {
      const r = el.getBoundingClientRect()
      if (r.top < vh * TRIGGER && r.bottom > -400) el.classList.add('rv--on')
    }
  }
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(sweep)
  }
  window.addEventListener('scroll', kick, { passive: true })
  window.addEventListener('resize', kick)
}

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

/* A group's rows start one after another but all LAND together: later rows
   get a longer delay and a correspondingly shorter glide. The client: "they
   start at different times and some are faster and end at the same time —
   that way the animation would be complete." Ours went strictly one by one,
   which is also why the lists looked like they were jumping. */
const GROUP_STEP = 90
const GROUP_TOTAL = 1400 // the original's measured reveal length

/* Everything already on screen at mount plays as ONE staggered set, in
   document order. Each Reveal used to reveal its own visible items the
   instant it mounted, so a short page (contact especially) fired every item
   at exactly the same moment — the client's "some aren't staggering". They
   are collected across all Reveals in the same frame and played together. */
let pending = []
let flushQueued = false

function queueMount(node) {
  pending.push(node)
  if (flushQueued) return
  flushQueued = true
  requestAnimationFrame(() => {
    flushQueued = false
    const rows = pending
    pending = []
    rows.sort((a, b) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    )
    playGroup(rows)
  })
}

function playGroup(rows) {
  rows.forEach((row, i) => {
    const delay = Math.min(i * GROUP_STEP, GROUP_TOTAL - 400)
    row.style.setProperty('--rd', delay + 'ms')
    row.style.setProperty('--rdur', GROUP_TOTAL - delay + 'ms')
    row.classList.add('rv--on')
  })
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
    bindSweep()

    /* Rows are NOT fired as a block. The client: "some stagger animations in
       lists were fine before, now it's just a whole block ... I need them
       one by one as I scroll, not scroll a tiny bit and have the whole
       section move without me seeing it." So every row gets its own trigger
       below, exactly like the sections on the terms page he pointed at.
       The land-together timing still applies to what is on screen at mount,
       where there is no scroll to pace it. */

    for (const node of items(el)) {
      if (node.dataset.rv) continue
      // the marquee drives its own transform — a reveal on it fights the drift
      if (node.closest('.proj__marquee') || node.querySelector('.proj__marquee')) continue
      // a line-staggered heading animates its own words — leave it alone
      if (node.classList.contains('slidein') || node.querySelector('.w')) continue
      // nothing to reveal on a boxless node (an empty live region, say)
      const box = node.getBoundingClientRect()
      if (box.width === 0 && box.height === 0) continue
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
        queueMount(node)
        continue
      }
      observe(node, show)
    }

    /* Run ONCE per mount. It used to run after every render, and its cleanup
       unobserved everything while the re-run skipped already-tagged nodes —
       so after any re-render the observers were gone and those elements
       stayed invisible. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
