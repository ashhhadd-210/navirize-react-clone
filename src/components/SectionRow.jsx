/**
 * The site's repeating section grid, measured at 1440:
 *   label   x=80,   column 272px wide, 12px type
 *   content x=352,  max 795px
 *   action  right-aligned, ending at x=1360
 * Used by "Shaping Perception", "Our Story", "Our Mission", "Why Us",
 * "How We Work" and the projects/about closers.
 */
export default function SectionRow({ label, children, action, className = '' }) {
  return (
    <div className={`row ${className}`.trim()}>
      <p className="label row__label">{label}</p>
      <div className="row__body">{children}</div>
      {action ? <div className="row__action">{action}</div> : null}
    </div>
  )
}
