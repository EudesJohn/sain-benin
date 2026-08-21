import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { GraduationCap, Droplet, HandHeart, Construction, BookOpen, Loader2 } from 'lucide-react'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import { useSectionPrices } from '../hooks/useSectionPrices'
import SectionPhotoStrip from '../components/SectionPhotoStrip'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { CTASection } from '../components/ui/CTASection'

const Support = () => {
  const { t } = useTranslation()
  const { photos, freePhotos } = useSectionPhotos('nous-soutenir')
  const { prices, loading } = useSectionPrices('nous-soutenir')
  const supportPrograms = [...prices].sort((a, b) => a.position - b.position)

  const programIcons = [GraduationCap, Construction, BookOpen]
  const programColors = ['from-sun-500 to-sun-700', 'from-leaf-500 to-leaf-700', 'from-earth-500 to-earth-700']

  const specificProjects = [
    {
      title: t('support.projects.latrine.title'),
      description: t('support.projects.latrine.description'),
      icon: HandHeart,
      progress: 75,
    },
    {
      title: t('support.projects.water.title'),
      description: t('support.projects.water.description'),
      icon: Droplet,
      progress: 60,
    },
    {
      title: t('support.projects.scholarship.title'),
      description: t('support.projects.scholarship.description'),
      icon: GraduationCap,
      progress: 90,
    },
  ]

  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/Ecole-Sain-Arrosage-1-1024x867.jpg'}
        eyebrow={t('support.eyebrow')}
        title={t('support.title')}
        subtitle={t('support.subtitle')}
      >
        <blockquote className="text-lg italic text-earth-100 border-l-2 border-sun-400 pl-4">
          {t('support.quote')}
        </blockquote>
      </PageHero>

      {/* Support Programs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('support.programs.eyebrow')}
            title={t('support.programs.title')}
            subtitle={t('support.programs.subtitle')}
            className="mb-16"
          />

          {loading ? (
            <div className="flex items-center justify-center py-16 text-ink-soft">
              <Loader2 className="w-6 h-6 animate-spin mr-3" aria-hidden="true" />
              {t('circuits.loading')}
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
                          <span>&bull;</span>
                          <span className="ml-2">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-ink-soft">{t('support.programs.empty')}</p>
          )}
        </div>
      </section>

      {/* Specific Projects */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('support.projects.eyebrow')}
            title={t('support.projects.title')}
            subtitle={t('support.projects.subtitle')}
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
                    <p className="text-sm text-ink-faint mt-2">{project.progress}% {t('support.projects.completed')}</p>
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
                eyebrow={t('support.students.eyebrow')}
                title={t('support.students.title')}
                className="mb-6"
              />
              <p className="text-lg text-ink-soft mb-6 leading-relaxed">
                {t('support.students.description1')}
              </p>
              <p className="text-lg text-ink-soft mb-6 leading-relaxed">
                {t('support.students.description2')}
              </p>
              <Button to="/contact" icon={<GraduationCap className="w-4 h-4" />}>
                {t('support.students.cta')}
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
                const altKeys = ['support.students.photo1', 'support.students.photo2', 'support.students.photo3', 'support.students.photo4']
                return (
                  <img
                    key={key}
                    src={photo?.url || fallbacks[i]}
                    alt={photo?.alt || t(altKeys[i])}
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
        title={t('support.ctaTitle')}
        subtitle={t('support.ctaText')}
        label={t('support.ctaLabel')}
      />
    </>
  )
}

export default Support
