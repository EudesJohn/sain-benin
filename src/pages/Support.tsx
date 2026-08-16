import { motion } from 'framer-motion'
import { GraduationCap, Droplet, HandHeart, Construction, BookOpen, Loader2 } from 'lucide-react'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import { useSectionPrices } from '../hooks/useSectionPrices'
import SectionPhotoStrip from '../components/SectionPhotoStrip'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { CTASection } from '../components/ui/CTASection'

const Support = () => {
  const { photos, freePhotos } = useSectionPhotos('nous-soutenir')
  // Programmes chargés depuis Supabase (gérés dans l'admin — plus rien en dur dans le code)
  const { prices, loading } = useSectionPrices('nous-soutenir')
  const supportPrograms = [...prices].sort((a, b) => a.position - b.position)

  // Icônes et couleurs attribuées aux programmes selon leur ordre d'affichage
  const programIcons = [GraduationCap, Construction, BookOpen]
  const programColors = ['from-sun-500 to-sun-700', 'from-leaf-500 to-leaf-700', 'from-earth-500 to-earth-700']

  const specificProjects = [
    {
      title: 'Une Famille une Latrine',
      description: 'Améliorer l\'hygiène sanitaire dans les foyers locaux',
      icon: HandHeart,
      progress: 75,
    },
    {
      title: 'Accès à l\'Eau Potable',
      description: 'Installation de puits et forages dans les villages',
      icon: Droplet,
      progress: 60,
    },
    {
      title: 'Scholarship Program',
      description: 'Soutien financier pour les étudiants défavorisés',
      icon: GraduationCap,
      progress: 90,
    },
  ]

  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/Ecole-Sain-Arrosage-1-1024x867.jpg'}
        eyebrow="Faire un don"
        title="Nous Soutenir"
        subtitle="Ensemble, construisons un avenir durable pour les jeunes et la communauté"
      >
        <blockquote className="text-lg italic text-earth-100 border-l-2 border-sun-400 pl-4">
          « SAIN est une petite structure d'économie sociale. Son modèle repose sur des formations payantes et des subventions diverses. »
        </blockquote>
      </PageHero>

      {/* Support Programs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Trois façons d'agir"
            title="Programmes de Soutien"
            subtitle="Rejoignez-nous dans notre mission de promouvoir l'agroécologie et l'émancipation des jeunes"
            className="mb-16"
          />

          {loading ? (
            <div className="flex items-center justify-center py-16 text-ink-soft">
              <Loader2 className="w-6 h-6 animate-spin mr-3" aria-hidden="true" />
              Chargement des programmes…
            </div>
          ) : supportPrograms.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {supportPrograms.map((program, i) => (
                <motion.div
                  key={program.id ?? i}
                  className="bg-white rounded-card shadow-card overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`h-24 bg-gradient-to-br ${programColors[i % programColors.length]} flex items-center justify-center`}
                  >
                    {(() => {
                      const Icon = programIcons[i % programIcons.length]
                      return <Icon className="w-10 h-10 text-white" aria-hidden="true" />
                    })()}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-ink mb-2">{program.title}</h3>
                    <p className="text-sm text-ink-soft mb-3">{program.description}</p>
                    <p className="text-lg font-bold text-leaf-600 mb-4">{program.price}</p>
                    <ul className="space-y-2 text-sm text-ink-soft">
                      {program.details.split('\n').filter(Boolean).map((detail, j) => (
                        <li key={j} className="flex items-start">
                          <span>•</span>
                          <span className="ml-2">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-ink-soft">Aucun programme pour le moment.</p>
          )}
        </div>
      </section>

      {/* Specific Projects */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="En cours"
            title="Projets Spécifiques"
            subtitle="Découvrez nos initiatives actuelles et suivez leur avancement"
            className="mb-16"
          />

          <div className="max-w-4xl mx-auto space-y-6">
            {specificProjects.map((project, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-card p-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-leaf-600/10 flex items-center justify-center">
                  <project.icon className="w-7 h-7 text-leaf-700" aria-hidden="true" />
                </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-ink mb-2">
                      {project.title}
                    </h3>
                    <p className="text-ink-soft mb-4">{project.description}</p>
                    <div className="w-full bg-earth-200 rounded-full h-2">
                      <motion.div
                        className="bg-leaf-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <p className="text-sm text-ink-faint mt-2">{project.progress}% complété</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Support */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SectionHeading
                align="left"
                eyebrow="Éducation"
                title="Soutien aux Étudiants"
                className="mb-6"
              />
              <p className="text-lg text-ink-soft mb-6 leading-relaxed">
                Notre programme de soutien éducatif couvre l'ensemble des besoins
                des élèves défavorisés : fournitures scolaires, frais d'inscription,
                et besoins alimentaires.
              </p>
              <p className="text-lg text-ink-soft mb-6 leading-relaxed">
                Chaque don participe directement à l'intégration réussie de nos
                jeunes dans un avenir prometteur à travers l'agriculture durable.
              </p>
              <Button to="/contact" icon={<GraduationCap className="w-4 h-4" />}>
                Devenir parrain
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {['photo-1', 'photo-2', 'photo-3', 'photo-4'].map((key, i) => {
                const photo = photos[key]
                const fallbacks = [
                  '/images/Etudiant-4-1024x683.jpg',
                  '/images/Formation-Apiculture-1024x768.jpg',
                  '/images/Ecole-Sain-Arrosage-1-1024x867.jpg',
                  '/images/Etudiants-2-150x150.jpg',
                ]
                const alts = ['Étudiant', 'Formation', 'Arrosage', 'Étudiants']
                return (
                  <img
                    key={key}
                    src={photo?.url || fallbacks[i]}
                    alt={photo?.alt || alts[i]}
                    className="w-full h-48 object-cover rounded-xl shadow-card"
                  />
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <SectionPhotoStrip photos={freePhotos} />

      <CTASection
        title="Soutenez notre mission"
        subtitle="Votre soutien nous permet de continuer à former les jeunes, de protéger l'environnement et de développer notre communauté."
        label="Contactez-nous pour soutenir"
      />
    </>
  )
}

export default Support
