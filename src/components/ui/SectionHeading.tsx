import { motion } from 'framer-motion'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  onDark?: boolean
  className?: string
}

/**
 * SectionHeading — eyebrow + titre + sous-titre cohérents sur tout le site.
 */
export const SectionHeading = ({ eyebrow, title, subtitle, align = 'center', onDark = false, className = '' }: SectionHeadingProps) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const textColor = onDark ? 'text-white' : 'text-ink'
  const subColor = onDark ? 'text-earth-200' : 'text-ink-soft'

  return (
    <Reveal className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${align === 'center' ? 'justify-center' : ''} ${onDark ? 'text-sun-300' : 'text-sun-700'} mb-3`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mb-4 ${textColor}`}>{title}</h2>
      {subtitle && <p className={`text-lg ${subColor} leading-relaxed`}>{subtitle}</p>}
    </Reveal>
  )
}

export default SectionHeading