import { motion } from 'framer-motion'
import { School, GraduationCap, Sprout } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTASection } from '../components/ui/CTASection'

const SocialResponsibility = () => {
  const initiatives = [
    {
      icon: School,
      title: 'École Primaire de Kakanitchoé Xwhenusu',
      description: 'École établie en 2000. Les premiers élèves ont obtenu leur master en 2021, démontrant l\'impact durable de l\'éducation soutenue par SAIN.',
      impact: 'Plus de 100 élèves formés',
      color: 'from-sun-500 to-sun-700',
    },
    {
      icon: GraduationCap,
      title: 'Bourses pour Jeunes Désavantagés',
      description: 'Nous soutenons financièrement les jeunes défavorisés pour accéder à une formation professionnelle ou littéraire.',
      details: [
        'Fournitures scolaires fournies',
        'Frais d\'inscription couverts',
        'Besoins alimentaires assurés',
      ],
      impact: '45 bénéficiaires annuels',
      color: 'from-earth-500 to-earth-700',
    },
    {
      icon: Sprout,
      title: 'Formation Agricole Professionnelle',
      description: 'Notre ferme-école offre une formation professionnelle en agriculture durable avec une approche "apprendre en faisant".',
      details: [
        'Programme de 18 mois',
        '15-20 jeunes recrutés annuellement',
        'Financement via les ventes agricoles',
        'Parrainage pour compléter le financement',
      ],
      impact: '130+ jeunes formés depuis 2002',
      color: 'from-leaf-500 to-leaf-700',
    },
  ]

  return (
    <>
      <PageHero
        image="/images/Engagement-Social-Sain-1024x768.jpg"
        eyebrow="Responsabilité sociale"
        title="Notre Responsabilité Sociale"
        subtitle="Engagés pour le développement durable et l'intégration des jeunes — « Améliorer les conditions de vie locales à travers l'agriculture »."
      />

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Notre engagement"
            title="Notre Engagement"
            subtitle="SAIN promeut la confiance, l'ouverture et des valeurs environnementales. Nos initiatives s'étendent à l'éducation, le soutien aux jeunes, la formation professionnelle et le développement rural."
            className="mb-12"
          />
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Nos initiatives"
            title="Des actions concrètes pour la communauté"
            className="mb-12"
          />
          <div className="max-w-6xl mx-auto space-y-8">
            {initiatives.map((initiative, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-card shadow-card overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                  <div
                    className={`bg-gradient-to-br ${initiative.color} p-8 flex items-center justify-center text-white`}
                  >
                    <div className="text-center">
                      <initiative.icon className="w-12 h-12 mx-auto mb-4 text-white" aria-hidden="true" />
                      <div className="text-2xl font-bold">{initiative.impact}</div>
                    </div>
                  </div>
                  <div className="lg:col-span-3 p-8">
                    <h3 className="text-2xl font-bold text-ink mb-4">
                      {initiative.title}
                    </h3>
                    <p className="text-ink-soft mb-4 leading-relaxed">
                      {initiative.description}
                    </p>
                    {'details' in initiative && initiative.details && (
                      <ul className="space-y-2 text-ink-soft">
                        {initiative.details.map((detail, j) => (
                          <li key={j} className="flex items-start">
                            <span className="mr-2 text-leaf-600">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center bg-gradient-to-br from-leaf-600 to-earth-700 rounded-card p-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold mb-6">
              Notre Mission
            </h2>
            <blockquote className="text-2xl italic mb-6">
              {`"Contrire à un monde meilleur où les humains vivent avec dignité dans un environnement sain"`}
            </blockquote>
            <p className="text-lg leading-relaxed opacity-90">
              Nous promouvons des systèmes agricoles et alimentaires durables,
              en valorisant les connaissances endogènes et en mettant l'accent
              sur l'humain, la nature et la communauté.
            </p>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Soutenez nos actions sociales"
        subtitle="Votre engagement multiplie l'impact de nos initiatives auprès des jeunes."
      />
    </>
  )
}

export default SocialResponsibility
