/**
 * The site's core typographic device: one heading where the opening clause is
 * black (#000) and the trailing clause is grey (#969696) — measured on the
 * hero, "Shaping Perception", "Our Story" and the About mission block.
 *
 * The break is mid-sentence in places ("...driven by a | refusal to settle for
 * ordinary."), so it is authored per-heading rather than split on punctuation.
 */
export default function TwoTone({
  black,
  grey,
  /**
   * Whether the grey clause starts on its own line. Measured per heading:
   * the hero and "Shaping Perception" break (hero renders as 4 lines of
   * 76.8px = the 307px box height measured on the original), while "Our
   * Story" and the About mission run the grey text inline, mid-line.
   */
  breakLine = false,
  as: Tag = 'h2',
  className = '',
  ...rest
}) {
  return (
    <Tag className={className} {...rest}>
      {black}
      {grey ? (
        <>
          {black && !breakLine ? ' ' : null}
          <span
            className="grey"
            style={breakLine ? { display: 'block' } : undefined}
          >
            {grey}
          </span>
        </>
      ) : null}
    </Tag>
  )
}
