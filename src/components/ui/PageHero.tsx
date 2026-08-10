import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PageHeroProps {
  image: string
  eyebrow?: string
  title: string
  subtitle?: string
  children?: ReactNode
  minHeight?: string
}

const easeOut = [0.23, 1, 0.32, 1] as const

/**
 * PageHero — bannière d'en-tête de page : image plein écran, voile dégradé,
 * titre en séquence (eyebrow → titre → sous-titre → actions).
 */
export const PageHero = ({ image, eyebrow, title, subtitle, children, minHeight = 'min-h-[52vh]' }: PageHeroProps) => {
  return (
    <section className={`relative ${minHeight} flex items-center overflow-hidden`}>
      {/* Image + voile */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${image}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/70" aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10 py-24">
        <div className="max-w-3xl">
          {eyebrow && (
            <motion.p
              className="eyebrow justify-start text-sun-300 mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            className="text-white mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.08 }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              className="text-xl text-earth-100 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.16 }}
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.24 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PageHero