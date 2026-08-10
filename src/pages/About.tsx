import { motion } from 'framer-motion'
import { sainData } from '../data/sainData'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { CTASection } from '../components/ui/CTASection'
import {
  Leaf,
  Globe,
  Heart,
  GraduationCap,
  Sprout,
  Building2,
  Wheat,
  BookOpen,
  FlaskConical,
  Umbrella,
} from 'lucide-react'

const About = () => {
  return (
    <>
      <PageHero
        image="/images/A-PROPOS-SAIN-1024x715.jpg"
        eyebrow="Le projet global"
        title="À Propos de SAIN"
        subtitle={sainData.philosophy}
      />

      {/* History & Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-ink mb-6">
                Notre Histoire
              </h2>
              <p className="text-lg text-ink-soft mb-6 leading-relaxed">
                Créée en 1991, <strong>SAIN</strong> (Solidarités Agricoles Intégrées)
                s'est installée au village de Kakanitchoé, à 12 km d'Adjohoun au Bénin,
                depuis 1998. La ferme s'étend sur <strong>14 hectares</strong>,
                comprenant des terres hautes et des basse-cultures.
              </p>
              <p className="text-lg text-ink-soft mb-6 leading-relaxed">
                Notre ferme vit depuis plus de 30 ans grâce à une approche profondément
                ancrée dans les valeurs de solidarité, de respect de la nature et de
                développement communautaire.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <motion.div
                  className="text-center p-4 bg-earth-50 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-sun-600 mb-1">14</div>
                  <p className="text-sm text-ink-soft">Hectares de ferme</p>
                </motion.div>
                <motion.div
                  className="text-center p-4 bg-earth-50 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-sun-600 mb-1">+30</div>
                  <p className="text-sm text-ink-soft">Années d'expérience</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-earth-50 p-8 rounded-card">
                <h3 className="text-xl font-bold text-ink mb-3 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-sun-600" />
                  Notre Mission
                </h3>
                <p className="text-ink-soft leading-relaxed">
                  {sainData.mission}
                </p>
              </div>

              <div className="bg-earth-50 p-8 rounded-card">
                <h3 className="text-xl font-bold text-ink mb-3 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-sun-600" />
                  Notre Vision
                </h3>
                <p className="text-ink-soft leading-relaxed">
                  {sainData.vision}
                </p>
              </div>

              <div className="bg-earth-50 p-8 rounded-card">
                <h3 className="text-xl font-bold text-ink mb-3 flex items-center gap-3">
                  <Leaf className="w-6 h-6 text-sun-600" />
                  Notre Philosophie
                </h3>
                <p className="text-ink-soft leading-relaxed">
                  {sainData.philosophy}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Nos valeurs"
            title="Nos Valeurs Fondamentales"
            subtitle="Les piliers sur lesquels repose notre engagement quotidien"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Soutien aux Jeunes',
                description: 'Nous formons les jeunes pour leur offrir des opportunités durables dans leur région d’origine.',
                icon: GraduationCap,
                color: 'from-leaf-500/20 to-leaf-500/5',
              },
              {
                title: 'Environnement Durable',
                description: 'Toutes nos pratiques agricoles reposent sur l\'agroécologie, la permaculture et la biodiversité.',
                icon: Sprout,
                color: 'from-sun-500/20 to-sun-500/5',
              },
              {
                title: 'Développement Local',
                description: 'Nous contribuons activement au développement socio-économique de notre communauté locale.',
                icon: Building2,
                color: 'from-earth-500/20 to-earth-500/5',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
                className={`bg-gradient-to-br ${value.color} p-8 rounded-card text-center cursor-pointer`}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/70 shadow-card flex items-center justify-center">
                  <value.icon className="w-10 h-10 text-sun-700" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-ink mb-4">{value.title}</h3>
                <p className="text-ink-soft leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Nos interventions"
            title="Nos Domaines d'Intervention"
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Production Agricole',
                description: 'Mise en œuvre de techniques agricoles respectueuses de l\'environnement avec trois sections : production végétale, élevage animal et aquaculture.',
                icon: Wheat,
              },
              {
                title: 'Formation Professionnelle',
                description: 'Depuis 2002, SAIN est une ferme-école formant des jeunes à l\'agriculture durable avec une approche "apprendre en faisant".',
                icon: BookOpen,
              },
              {
                title: 'Recherche-Action',
                description: 'Développement de stratégies agricoles innovantes et durables, en collaboration avec la communauté scientifique.',
                icon: FlaskConical,
              },
              {
                title: 'Agro-Tourisme',
                description: 'Hébergement, restauration et circuits de découverte dans un cadre rural préservé.',
                icon: Umbrella,
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                className="flex gap-6 p-6 bg-earth-50 rounded-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-sun-600/10 shadow-card flex items-center justify-center">
                  <activity.icon className="w-8 h-8 text-sun-700" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink mb-2">{activity.title}</h3>
                  <p className="text-ink-soft">{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Envie de nous rencontrer ?"
        subtitle="Visitez la ferme, rejoignez une formation ou soutenez notre projet."
      />
    </>
  )
}

export default About
