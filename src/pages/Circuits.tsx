import { motion } from 'framer-motion'
import { Clock, Euro, ShoppingBag, Building2, Leaf, Footprints, Waves, Sprout, Loader2 } from 'lucide-react'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import { useSectionPrices } from '../hooks/useSectionPrices'
import SectionPhotoStrip from '../components/SectionPhotoStrip'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTASection } from '../components/ui/CTASection'

const Circuits = () => {
  const { photos, freePhotos } = useSectionPhotos('circuits-decouverte')
  // Circuits chargés depuis Supabase (gérés dans l'admin — plus rien en dur dans le code)
  const { prices, loading } = useSectionPrices('circuits-decouverte')
  const circuits = [...prices].sort((a, b) => a.position - b.position)

  // Icônes attribuées aux circuits selon leur ordre d'affichage
  const circuitIcons = [ShoppingBag, Building2, Leaf, Footprints, Waves, Sprout]

  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/A-PROPOS-SAIN-1024x715.jpg'}
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

          {loading ? (
            <div className="flex items-center justify-center py-16 text-ink-soft">
              <Loader2 className="w-6 h-6 animate-spin mr-3" aria-hidden="true" />
              Chargement des circuits…
            </div>
          ) : circuits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {circuits.map((circuit, i) => (
                <motion.div
                  key={circuit.id ?? i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-card shadow-card p-8 text-center group hover:shadow-card-hover transition-shadow cursor-pointer"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-leaf-600/10 flex items-center justify-center">
                    {(() => {
                      const Icon = circuitIcons[i % circuitIcons.length]
                      return <Icon className="w-10 h-10 text-leaf-700" aria-hidden="true" />
                    })()}
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
          ) : (
            <p className="text-center text-ink-soft">Aucun circuit pour le moment.</p>
          )}
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

          {loading ? (
            <div className="flex items-center justify-center py-16 text-ink-soft">
              <Loader2 className="w-6 h-6 animate-spin mr-3" aria-hidden="true" />
              Chargement…
            </div>
          ) : circuits.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-8">
              {circuits.map((circuit, i) => (
                <motion.div
                  key={circuit.id ?? i}
                  className="bg-white rounded-2xl shadow-card overflow-hidden"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-leaf-600/10 flex items-center justify-center">
                        {(() => {
                          const Icon = circuitIcons[i % circuitIcons.length]
                          return <Icon className="w-7 h-7 text-leaf-700" aria-hidden="true" />
                        })()}
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
          ) : (
            <p className="text-center text-ink-soft">Aucun circuit pour le moment.</p>
          )}
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
            {['galerie-1', 'galerie-2', 'galerie-3', 'galerie-4'].map((key, i) => {
              const photo = photos[key]
              const fallbacks = [
                '/images/Marécage-150x150.jpg',
                '/images/Pirogue-150x114.jpg',
                '/images/Elevage-Poules-Sain-150x150.jpg',
                '/images/Palme-Sain-150x150.jpg',
              ]
              return (
                <motion.div
                  key={key}
                  className="aspect-square rounded-xl overflow-hidden shadow-card"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                >
                  <img
                    src={photo?.url || fallbacks[i]}
                    alt={photo?.alt || `Circuit ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <SectionPhotoStrip photos={freePhotos} />

      <CTASection
        title="Réservez Votre Découverte"
        subtitle="Contactez-nous pour réserver votre circuit préféré et vivez une expérience unique au cœur de la nature béninoise."
        label="Réserver maintenant"
      />
    </>
  )
}

export default Circuits
