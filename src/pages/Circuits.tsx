import { motion } from 'framer-motion'
import { Clock, Euro, ShoppingBag, Building2, Leaf, Footprints, Waves, Sprout } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTASection } from '../components/ui/CTASection'

const Circuits = () => {
  const circuits = [
    {
      title: 'Découverte du marché local',
      subtitle: 'Marché d\'Akpadanou',
      description: 'Immersive local market experience with guided tours and tasting of local specialties.',
      price: '10 000 FCFA jusqu\'à 5 pers, +1 000 FCFA/personne',
      duration: '1-3 heures (jours de marché)',
      icon: ShoppingBag,
    },
    {
      title: 'Découverte du village',
      subtitle: 'Kakanitchoé',
      description: 'Cultural immersion experiencing daily village life including oil preparation, gari making, and traditional distillation.',
      price: '10 000 FCFA jusqu\'à 5 pers, +1 000 FCFA/personne',
      duration: '1-3 heures (matin ou après-midi)',
      icon: Building2,
    },
    {
      title: 'Circuit Nature',
      subtitle: 'Faune et flore',
      description: 'Educational nature center offering school groups and families programs about local flora/fauna.',
      price: '20 000 FCFA jusqu\'à 5 pers, +2 000 FCFA/personne',
      duration: '1-3 heures',
      icon: Leaf,
    },
    {
      title: 'Randonnée',
      subtitle: 'Champs et marécage',
      description: 'Agricultural field exploration showing seasonal crops and farmer interactions, plus marshland visit.',
      price: '10 000 FCFA jusqu\'à 5 pers, +1 000 FCFA/personne',
      duration: '1-3 heures (matin ou après-midi)',
      icon: Footprints,
    },
    {
      title: 'Tour en pirogue',
      subtitle: 'Fleuve Ouémé',
      description: 'Traditional canoe tour along Ouémé River visiting KPINKON protected forest island.',
      price: '10 000 FCFA jusqu\'à 4 pers, 12 500 FCFA jusqu\'à 5 pers, +1 000 FCFA/personne',
      duration: '1-3 heures (matin ou après-midi)',
      icon: Waves,
    },
    {
      title: 'Visite de la ferme',
      subtitle: 'Activités agroécoliques',
      description: 'Guided farm visit showcasing agroecological practices including mushroom production, honey, fish, rabbits, and quails.',
      price: '5 000 FCFA jusqu\'à 4 pers, +1 000 FCFA/personne',
      duration: '1-2 heures',
      icon: Sprout,
    },
  ]

  return (
    <>
      <PageHero
        image="/images/A-PROPOS-SAIN-1024x715.jpg"
        eyebrow="Éco-tourisme"
        title="Circuits Découverte"
        subtitle="Découvrez les trésors naturels et culturels de notre région"
      >
        <blockquote className="text-lg italic text-earth-100 border-l-2 border-sun-400 pl-4">
          « Tous les circuits incluent un guide local passionné. Le transport n'est pas inclus. »
        </blockquote>
      </PageHero>

      {/* Circuit Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Nos circuits"
            title="Découvrez nos 6 Circuits"
            subtitle="Chaque circuit vous immerge dans un aspect unique de la culture et de la nature béninoise"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {circuits.map((circuit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-card shadow-card p-8 text-center group hover:shadow-card-hover transition-shadow cursor-pointer"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-leaf-600/10 flex items-center justify-center">
                  <circuit.icon className="w-10 h-10 text-leaf-700" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-sun-600 transition-colors">
                  {circuit.title}
                </h3>
                <p className="text-ink-soft mb-3 text-sm">{circuit.subtitle}</p>
                <p className="text-sm text-ink-faint mb-4 line-clamp-3">
                  {circuit.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-ink-soft">
                    <Euro className="w-4 h-4 text-sun-600" />
                    <span className="font-medium">{circuit.price}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-ink-soft">
                    <Clock className="w-4 h-4 text-sun-600" />
                    <span>{circuit.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Circuit Details */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Comment ça se passe ?"
            title="Détails des Circuits"
            subtitle="Toutes nos découvertes vous attendent en petits groupes pour une expérience immersive et authentique."
            className="mb-12"
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {circuits.map((circuit, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-card overflow-hidden"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-leaf-600/10 flex items-center justify-center">
                      <circuit.icon className="w-7 h-7 text-leaf-700" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-ink mb-1">
                        {circuit.title}
                      </h3>
                      <p className="text-sun-600 font-medium mb-2">
                        {circuit.subtitle}
                      </p>
                      <p className="text-ink-soft leading-relaxed mb-4">
                        {circuit.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Euro className="w-4 h-4 text-sun-600" />
                          <span className="font-medium">{circuit.price}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-sun-600" />
                          <span>{circuit.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading eyebrow="Galerie" title="En Images" className="mb-16" />

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              '/images/Maraichage-4-150x150.jpg',
              '/images/Pirogue-150x114.jpg',
              '/images/Elevage-Poules-Sain-150x150.jpg',
              '/images/Palme-Sain-150x150.jpg',
            ].map((img, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-xl overflow-hidden shadow-card"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 2 }}
              >
                <img
                  src={img}
                  alt={`Circuit ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Réservez Votre Découverte"
        subtitle="Contactez-nous pour réserver votre circuit préféré et vivez une expérience unique au cœur de la nature béninoise."
        label="Réserver maintenant"
      />
    </>
  )
}

export default Circuits
