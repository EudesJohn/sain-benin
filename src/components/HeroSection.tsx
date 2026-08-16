import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { Button } from './ui/Button'
import { useSectionPhotos } from '../hooks/useSectionPhotos'

const easeOut = [0.23, 1, 0.32, 1] as const

const HeroSection = () => {
  const { photos } = useSectionPhotos('accueil')
  const hero = photos['hero']
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fond photo + voiles */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${hero?.url || '/images/Riz-Sain-1024x743.jpg'}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/75" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-tr from-leaf-900/40 via-transparent to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Eyebrow */}
          <motion.p
            className="eyebrow justify-center text-sun-300 mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
          >
            Ferme École • Agroécologie • Éco-tourisme
          </motion.p>

          {/* Titre */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 leading-[1.05]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: easeOut }}
          >
            Solidarités Agricoles Intégrées
          </motion.h1>

          {/* Citation */}
          <motion.p
            className="text-xl md:text-2xl italic text-leaf-100 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4, ease: easeOut }}
          >
            « Communion entre l'Homme, la Nature et la Communauté »
          </motion.p>

          {/* Localisation & contact */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 text-earth-100"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4, ease: easeOut }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sun-300" aria-hidden="true" />
              <span>Village Kakanitchoé, 12 km d'Adjohoun, Bénin</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-sun-300" aria-hidden="true" />
              <span>+229 62 44 47 44 • +229 97 65 56 28</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4, ease: easeOut }}
          >
            <Button to="/formations" variant="accent" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Découvrir nos formations
            </Button>
            <Button to="/circuits-decouverte" variant="ghost-light" size="lg">
              Réserver une visite
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection