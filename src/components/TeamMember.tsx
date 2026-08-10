import { motion } from 'framer-motion'

interface TeamMemberProps {
  name: string
  role: string
  description?: string
  image: string
  index: number
}

const easeOut = [0.23, 1, 0.32, 1] as const

const TeamMember = ({ name, role, description, image, index }: TeamMemberProps) => {
  return (
    <motion.div
      className="group relative surface-card overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: easeOut } }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: easeOut }}
    >
      {/* Photo */}
      <div className="relative h-64 bg-sun-100 overflow-hidden">
        <motion.img
          src={`/images/${image}`}
          alt={name}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=15803D&color=white&size=200`
          }}
          loading="lazy"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4, ease: easeOut }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" aria-hidden="true" />
      </div>

      {/* Contenu */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-ink mb-1 group-hover:text-leaf-700 transition-colors duration-200">
          {name}
        </h3>
        <p className="text-sun-700 font-medium text-sm mb-3">{role}</p>
        {description && (
          <p className="text-ink-soft text-sm leading-relaxed line-clamp-3">{description}</p>
        )}
      </div>

      {/* Overlay au survol (devices avec pointeur uniquement) */}
      <motion.div
        className="absolute inset-0 bg-earth-900/90 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <p className="text-white text-center px-4">{description && `${description.substring(0, 100)}…`}</p>
      </motion.div>
    </motion.div>
  )
}

export default TeamMember