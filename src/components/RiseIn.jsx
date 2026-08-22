import { motion, useReducedMotion } from 'framer-motion'

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
 */
export default function RiseIn({
  children,
  delay = 0,
  y = 50,
  duration = 0.5,
  className = '',
  as = 'div',
  ...rest
}) {
  const reduce = useReducedMotion()
  const Tag = as
  const MotionTag = motion[as] || motion.div

  if (reduce) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [0.33, 1, 0.68, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
