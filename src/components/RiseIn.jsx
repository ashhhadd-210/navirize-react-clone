/**
 * The original's ONE animation, measured off the live site:
 *   opacity 0 -> 1, translateY 50px -> 0, ~500ms, ease-out, on mount.
 *
 * Sampling the hero's character spans showed char 0, 3, 10 and 25 moving in
 * perfect lockstep — so the headline is split into spans for layout, but
 * animates as a single block with NO per-character stagger. Mid-page sections
 * measured opacity:1 / transform:none while still far below the fold, so the
 * original has no scroll-triggered reveals at all. This component is used
 * only where the original actually animates.
 *
 * This was framer-motion. The library cost 37.8 KB gzipped — a third of the JS
 * bundle — to drive four transitions the platform does natively, so it is now
 * a CSS keyframe (`.rise-in` in index.css) parameterised through custom
 * properties. It runs off the main thread and needs no JS at all.
 * `prefers-reduced-motion` is handled by the global rule in index.css.
 */
export default function RiseIn({
  children,
  delay = 0,
  y = 50,
  duration = 0.5,
  className = '',
  as: Tag = 'div',
  style,
  ...rest
}) {
  return (
    <Tag
      className={className ? `rise-in ${className}` : 'rise-in'}
      style={{
        '--rise-y': `${y}px`,
        '--rise-duration': `${duration}s`,
        '--rise-delay': `${delay}s`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
