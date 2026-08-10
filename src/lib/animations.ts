// Centralized Framer Motion variants and easing curves
// Following Emil Kowalski's design engineering principles

export const easeOut = [0.23, 1, 0.32, 1]
export const easeInOut = [0.77, 0, 0.175, 1]

/**
 * Reusable animation durations (in ms).
 * micro: instant feedback (button press)
 * ui: standard UI transitions
 * macro: page sections / entrances
 * page: full page transitions
 */
export const durations = {
  micro: 0.15,
  ui: 0.2,
  macro: 0.4,
  page: 0.5,
}

/**
 * Standard fade-in + slide-up used across sections.
 * Start slightly scaled to avoid scale(0) artifacts.
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: durations.macro, ease: easeOut },
}

/**
 * Simple fade-only for lighter entrances.
 */
export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: durations.ui, ease: easeOut },
}

/**
 * Staggered children container — apply `variants` then set
 * `variants={staggerItem}` on each child or use `custom` for delay.
 */
export const staggerContainer = (delayChildren = 0, stagger = 0.08) => ({
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      delayChildren,
      staggerChildren,
      ease: easeOut,
    },
  },
  viewport: { once: true, margin: '-50px' },
})

export const staggerItem = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: durations.macro, ease: easeOut },
}

/**
 * Mobile menu scaleY variant — animates from top origin.
 */
export const menuVariants = {
  hidden: { opacity: 0, scaleY: 0, transformOrigin: 'top' },
  visible: { opacity: 1, scaleY: 1, transition: { duration: durations.ui, ease: easeOut } },
  exit: { opacity: 0, scaleY: 0, transition: { duration: durations.ui, ease: easeOut } },
}

/**
 * Helper to generate delay variants for staggered lists.
 */
export const withDelay = (base: any, delay: number) => ({
  ...base,
  transition: { ...base.transition, delay },
})
