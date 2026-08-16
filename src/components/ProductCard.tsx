import { motion } from 'framer-motion'
import {
  Apple,
  Carrot,
  Egg,
  Drumstick,
  Fish,
  Package,
  GlassWater,
  Droplets,
  Cookie,
  Wheat,
} from 'lucide-react'

interface ProductCardProps {
  name: string
  /** URL complète de la photo (vide = icône) */
  image?: string
  category: string
  index: number
}

const easeOut = [0.23, 1, 0.32, 1] as const

// Icônes lucide par catégorie de produit (toute la source de vérité en un seul endroit)
const categoryIcons: Record<string, typeof Apple> = {
  'Fruits': Apple,
  'Légumes': Carrot,
  'œufs': Egg,
  'Viandes': Drumstick,
  'Poissons': Fish,
  'Jus de papaye': GlassWater,
  'Huile de coco': Droplets,
  'Confitures': Cookie,
  'Gari': Wheat,
  'Huile de palme': Droplets,
  'Autres': Package,
}

const ProductCard = ({ name, image, category, index }: ProductCardProps) => {
  const CategoryIcon = categoryIcons[category] ?? Package

  return (
    <motion.div
      className="group surface-card overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: easeOut } }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: easeOut }}
    >
      {/* Image */}
      <div className="h-32 bg-earth-50 overflow-hidden flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <CategoryIcon className="w-12 h-12 text-earth-300" aria-hidden="true" />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <CategoryIcon className="w-4 h-4 text-leaf-600" aria-hidden="true" />
          <span className="text-xs font-semibold text-sun-800 bg-sun-50 px-2.5 py-1 rounded-full">
            {category}
          </span>
        </div>
        <h4 className="font-semibold text-ink group-hover:text-leaf-700 transition-colors duration-200">
          {name}
        </h4>
      </div>
    </motion.div>
  )
}

export default ProductCard