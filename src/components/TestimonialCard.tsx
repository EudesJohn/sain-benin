import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

interface TestimonialCardProps {
  name: string
  role: string
  quote: string
  image: string
  index: number
}

const easeOut = [0.23, 1, 0.32, 1] as const

const TestimonialCard = ({ name, role, quote, image, index }: TestimonialCardProps) => {
  return (
    <motion.div
      className="surface-card p-8 relative overflow-hidden group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.12, duration: 0.4, ease: easeOut }}
    >
      {/* Quote icon */}
      <div className="absolute top-4 right-4 text-sun-600/20" aria-hidden="true">
        <Quote className="w-10 h-10" />
      </div>

      {/* Photo */}
      <motion.div
        className="relative w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden ring-2 ring-sun-100"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2, ease: easeOut }}
      >
        <img
          src={`/images/${image}`}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=15803D&color=white&size=80`
          }}
          loading="lazy"
        />
      </motion.div>

      {/* Citation */}
      <blockquote className="text-center italic text-ink-soft mb-6 leading-relaxed">
        « {quote} »
      </blockquote>

      {/* Auteur */}
      <div className="text-center">
        <p className="font-bold text-ink">{name}</p>
        <p className="text-sm text-ink-faint">{role}</p>
      </div>

      {/* Halo décoratif */}
      <div className="absolute -top-10 -left-10 w-20 h-20 bg-sun-500/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-300" aria-hidden="true" />
      <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-leaf-500/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-300" aria-hidden="true" />
    </motion.div>
  )
}

export default TestimonialCard