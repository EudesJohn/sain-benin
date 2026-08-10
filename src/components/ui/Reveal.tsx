import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

const easeOut = [0.23, 1, 0.32, 1] as const

/**
 * Reveal — apparition douce au scroll (opacity + y, ease-out fort).
 * `prefers-reduced-motion` est géré globalement par <MotionConfig reducedMotion="user">
 * dans main.tsx. Toujours composable et décoratif : ne bloque jamais l'interaction.
 */
export const Reveal = ({ children, delay = 0, y = 24, className }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.45, ease: easeOut, delay }}
  >
    {children}
  </motion.div>
)

export default Reveal