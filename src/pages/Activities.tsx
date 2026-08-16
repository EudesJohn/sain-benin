import { motion } from 'framer-motion'
import { Salad, PawPrint, Fish, Sprout, FlaskConical, BookOpen } from 'lucide-react'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import SectionPhotoStrip from '../components/SectionPhotoStrip'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTASection } from '../components/ui/CTASection'

const Activities = () => {
  const { photos, freePhotos } = useSectionPhotos('activites-sain')
  const poles = [
    {
      title: 'Production Végétale',
      description: 'Cultures maraîchères, arrosage, engrais organiques et pesticides biologiques',
      icon: Salad,
      image: photos['pole-1']?.url || '/images/Fruits-Sain-1024x717.jpg',
    },
    {
      title: 'Production Animale',
      description: 'Élevage des lapins, poule, pigeonneaux, canards et cailles',
      icon: PawPrint,
      image: photos['pole-2']?.url || '/images/Elevage-lapin-Sain-1024x806.jpg',
    },
    {
      title: 'Aquaculture',
      description: 'Élevage de poissons dans des bassins spécialement aménagés',
      icon: Fish,
      image: photos['pole-3']?.url || '/images/Riz-Sain-1024x743.jpg',
    },
  ]
  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/Travaux-Ferme-1024x768.jpg'}
        eyebrow="Nos activités"
        title="Nos Activités"
        subtitle="Une ferme intégrée alliant production agricole, éducation, recherche et tourisme"
      />

      {/* Production */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
              eyebrow="Production agricole"
              title="Production Agricole"
              subtitle="SAIN pratique une agriculture intégrée et durable avec trois sections principales"
              className="mb-12"
            />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {poles.map((pole, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-card overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={pole.image}
                    alt={pole.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="w-14 h-14 mb-3 rounded-2xl bg-sun-600/10 flex items-center justify-center">
                    <pole.icon className="w-7 h-7 text-sun-700" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">{pole.title}</h3>
                  <p className="text-ink-soft">{pole.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formation */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
              eyebrow="Formation agricole"
              title="Formation Agricole"
              subtitle="Depuis 2002, SAIN est une ferme-école offrant une formation professionnelle en agriculture durable"
              className="mb-12"
            />

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white rounded-card shadow-card p-8 mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-ink mb-4">
                Notre Méthode Pédagogique
              </h3>
              <blockquote className="text-xl italic text-earth-700 border-l-4 border-sun-500 pl-4 mb-4">
                "Apprendre en faire" - une approche pratique et immersive
              </blockquote>
              <p className="text-ink-soft leading-relaxed">
                Les apprenants découvrent les techniques agricoles par la pratique
                directe sur notre ferme de 14 hectares. Cette méthode permet d'acquérir
                des compétences concrètes et durables.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-white rounded-card shadow-card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold text-ink mb-3">Formation Longue (18 mois)</h4>
                <ul className="space-y-2 text-ink-soft">
                  <li>• Public : jeunes défavorisés</li>
                  <li>• Recrutement via les communes locales</li>
                  <li>• Financement : vente des productions agricoles</li>
                  <li>• Suivi post-formation inclus</li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-white rounded-card shadow-card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold text-ink mb-3">Formations Courtes</h4>
                <ul className="space-y-2 text-ink-soft">
                  <li>• Durée : quelques jours à plusieurs semaines</li>
                  <li>• Thèmes : techniques agricoles, leadership</li>
                  <li>• Public : PCM, Colibri, organisations</li>
                  <li>• Suivi individuel sur parcelle</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
              eyebrow="Recherche-action"
              title="Recherche-Action"
              subtitle="Développement de stratégies agricoles innovantes et durables"
              className="mb-12"
            />

          <motion.div
            className="bg-gradient-to-r from-sun-600 to-earth-700 text-white rounded-card p-8 lg:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Objectifs de Recherche
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              La ferme SAIN se consacre à la mise au point de stratégies agricoles
              innovantes et durables. Notre équipe de recherche travaille pour proposer
              des techniques respectueuses de l'environnement tout en augmentant la
              productivité et la résilience face aux changements climatiques.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 p-4 rounded-xl flex items-center gap-3">
                <Sprout className="w-7 h-7 text-sun-200 flex-shrink-0" aria-hidden="true" />
                <p className="font-medium">Techniques agricoles innovantes</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl flex items-center gap-3">
                <FlaskConical className="w-7 h-7 text-sun-200 flex-shrink-0" aria-hidden="true" />
                <p className="font-medium">Adaptation au climat</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-sun-200 flex-shrink-0" aria-hidden="true" />
                <p className="font-medium">Partage de connaissances</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agritourism */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
              eyebrow="Agritourisme"
              title="Agritourisme"
              subtitle="Découvrez un cadre paisible pour des séjours familiaux, des séminaires ou des retraites"
              className="mb-12"
            />

          <motion.div
            className="bg-white rounded-card shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src={photos['agritourisme']?.url || '/images/Fruits-Sain-1024x717.jpg'}
              alt={photos['agritourisme']?.alt || 'Agritourisme'}
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <p className="text-ink-soft leading-relaxed">
                Située au cœur du village de Kakanitchoé, notre ferme offre un environnement
                magnifique et propice à la détente. Que vous soyez en famille, avec des amis
                ou en entreprise, vous pourrez profiter de nos espaces verdoyants, de nos
                sentiers de randonnée et de nos activités éducatives.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionPhotoStrip photos={freePhotos} />

      <CTASection
        title="Venez vivre la ferme autrement"
        subtitle="Une visite, une formation ou un séjour : tout commence par un échange."
      />
    </>
  )
}

export default Activities
