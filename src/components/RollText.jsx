/**
 * The original's nav and footer link hover: each label is a one-line
 * clipping box holding two stacked copies of its text — the lower copy at
 * opacity 0.6 — and hovering rolls the stack up one line, so the label
 * appears to dim by rolling rather than fading. Measured off the live DOM:
 * a 24px overflow-hidden container, copies 25px apart, second copy
 * opacity:0.6. Social links and pill buttons do not roll.
 */
export default function RollText({ children }) {
  return (
    <span className="roll">
      <span className="roll__stack">
        <span className="roll__line">{children}</span>
        <span className="roll__line roll__line--dim" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  )
}
