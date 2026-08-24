/**
 * The site's repeating section grid, measured at 1440:
 *   label   x=80,   column 272px wide, 12px type
 *   content x=352,  max 795px
 *   action  right-aligned, ending at x=1360
 * Used by "Shaping Perception", "Our Story", "Our Mission", "Why Us",
 * "How We Work" and the projects/about closers.
 */
export default function SectionRow({ label, children, action, className = '' }) {
  /* Measured on the original: rows WITH an action reserve a 213px column
     for it (home headings measure remaining−213); rows WITHOUT one let the
     body span the full remaining width (About's one-line headings exceed
     the 3-column width). */
  const cls = `row ${action ? 'row--with-action ' : ''}${className}`.trim()
  return (
    <div className={cls}>
      <p className="label row__label">{label}</p>
      <div className="row__body">{children}</div>
      {action ? <div className="row__action">{action}</div> : null}
    </div>
  )
}
