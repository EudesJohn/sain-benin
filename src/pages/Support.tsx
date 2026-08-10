import { motion } from 'framer-motion'
import { GraduationCap, Droplet, HandHeart, Construction, BookOpen } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { CTASection } from '../components/ui/CTASection'

const Support = () => {
  const supportPrograms = [
    {
      title: 'Parrainage Mensuel',
      description: ' soutenir un jeune dans sa formation agricole',
      price: '€3/jour (€90/mois)',
      icon: GraduationCap,
      color: 'from-sun-500 to-sun-700',
      details: [
        'Couvre les besoins en fournitures et en alimentation',
        'Permet l\'accès à la formation professionnelle',
        'Suivi personnalisé tout au long de la formation',
        'Partenaire avec des projets durables',
      ],
    },
    {
      title: 'Amélioration des Infrastructures',
      description: 'financer des aménagements agricoles et pédagogiques',
      price: 'Sur mesure',
      icon: Construction,
      color: 'from-leaf-500 to-leaf-700',
      details: [
        'Systèmes d\'irrigation durable',
        'Bassins de pisciculture',
        'Unités de transformation agroalimentaire',
        'Espaces pédagogiques améliorés',
      ],
    },
    {
      title: 'Bourses pour Jeunes',
      description: 'financer l\'éducation des enfants défavorisés',
      price: '€10-25/mois',
      icon: BookOpen,
      color: 'from-earth-500 to-earth-700',
      details: [
        'Fournitures scolaires',
        'Frais d\'inscription',
        'Repas et hébergement',
        'Suivi éducatif personnalisé',
      ],
    },
  ]

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
        image="/images/Ecole-Sain-Arrosage-1-1024x867.jpg"
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {supportPrograms.map((program, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-card shadow-card overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div
                  className={`h-24 bg-gradient-to-br ${program.color} flex items-center justify-center`}
                >
                  <program.icon className="w-10 h-10 text-white" aria-hidden="true" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ink mb-2">{program.title}</h3>
                  <p className="text-sm text-ink-soft mb-3">{program.description}</p>
                  <p className="text-lg font-bold text-leaf-600 mb-4">{program.price}</p>
                  <ul className="space-y-2 text-sm text-ink-soft">
                    {program.details.map((detail, j) => (
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
              <img
                src="/images/Etudiant-4-1024x683.jpg"
                alt="Étudiant"
                className="w-full h-48 object-cover rounded-xl shadow-card"
              />
              <img
                src="/images/Formation-Apiculture-1024x768.jpg"
                alt="Formation"
                className="w-full h-48 object-cover rounded-xl shadow-card"
              />
              <img
                src="/images/Ecole-Sain-Arrosage-1-1024x867.jpg"
                alt="Arrosage"
                className="w-full h-48 object-cover rounded-xl shadow-card"
              />
              <img
                src="/images/Etudiants-2-150x150.jpg"
                alt="Étudiants"
                className="w-full h-48 object-cover rounded-xl shadow-card"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        title="Soutenez notre mission"
        subtitle="Votre soutien nous permet de continuer à former les jeunes, de protéger l'environnement et de développer notre communauté."
        label="Contactez-nous pour soutenir"
      />
    </>
  )
}

export default Support
