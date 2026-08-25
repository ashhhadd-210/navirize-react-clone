import { useLayoutEffect } from 'react'

/**
 * Per-line load stagger, measured off the original's Web Animations API.
 *
 * The original splits a heading into one span per glyph and gives every
 * glyph on the same rendered LINE the same delay, stepping 200ms down the
 * lines while each line fades opacity 0.001 -> 1 over 500ms:
 *
 *   line 1 "We design how people"  delay 0
 *   line 2 "feel about what they"  delay 200
 *   line 3 "see."                  delay 400
 *   line 4 "Your presence,"        delay 600
 *
 * Lines are a product of wrapping, so they can only be known after layout.
 * We split on words instead of glyphs — the fade is per line either way, and
 * keeping whole words preserves kerning (per-glyph inline-blocks drop it,
 * which is why the original's text measures marginally wider than ours).
 */

/** Split a string into word spans, keeping the whitespace between them. */
export function words(text) {
  const out = []
  const parts = String(text).split(' ')
  parts.forEach((word, i) => {
    if (word) out.push(<span className="w" key={`w${i}`}>{word}</span>)
    if (i < parts.length - 1) out.push(' ')
  })
  return out
}

/** Group the word spans inside `ref` into lines and stamp each with its index. */
export function useLineStagger(ref, deps = []) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const assign = () => {
      let line = -1
      let lastTop = null
      for (const span of el.querySelectorAll('.w')) {
        const top = span.offsetTop
        // a new line starts wherever the vertical offset jumps
        if (lastTop === null || Math.abs(top - lastTop) > 2) {
          line += 1
          lastTop = top
        }
        span.style.setProperty('--ln', String(line))
      }
    }

    assign()
    // wrapping changes with width, and with the font swapping in
    window.addEventListener('resize', assign)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(assign)
    return () => window.removeEventListener('resize', assign)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
