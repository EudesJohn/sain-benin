import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { School, GraduationCap, Sprout } from 'lucide-react'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import SectionPhotoStrip from '../components/SectionPhotoStrip'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTASection } from '../components/ui/CTASection'

const SocialResponsibility = () => {
  const { t } = useTranslation()
  const { photos, freePhotos } = useSectionPhotos('responsabilite-sociale')

  const initiatives = [
    {
      icon: School,
      title: t('socialResponsibility.initiatives.school.title'),
      description: t('socialResponsibility.initiatives.school.description'),
      impact: t('socialResponsibility.initiatives.school.impact'),
      color: 'from-sun-500 to-sun-700',
    },
    {
      icon: GraduationCap,
      title: t('socialResponsibility.initiatives.scholarships.title'),
      description: t('socialResponsibility.initiatives.scholarships.description'),
      details: t('socialResponsibility.initiatives.scholarships.details', { returnObjects: true }) as string[],
      impact: t('socialResponsibility.initiatives.scholarships.impact'),
      color: 'from-earth-500 to-earth-700',
    },
    {
      icon: Sprout,
      title: t('socialResponsibility.initiatives.training.title'),
      description: t('socialResponsibility.initiatives.training.description'),
      details: t('socialResponsibility.initiatives.training.details', { returnObjects: true }) as string[],
      impact: t('socialResponsibility.initiatives.training.impact'),
      color: 'from-leaf-500 to-leaf-700',
    },
  ]

  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/Engagement-Social-Sain-1024x768.jpg'}
        eyebrow={t('socialResponsibility.eyebrow')}
        title={t('socialResponsibility.title')}
        subtitle={t('socialResponsibility.subtitle')}
      />

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('socialResponsibility.engagement.eyebrow')}
            title={t('socialResponsibility.engagement.title')}
            subtitle={t('socialResponsibility.engagement.subtitle')}
            className="mb-12"
          />
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('socialResponsibility.actions.eyebrow')}
            title={t('socialResponsibility.actions.title')}
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
                        {initiative.details.map((detail: string, j: number) => (
                          <li key={j} className="flex items-start">
                            <span className="mr-2 text-leaf-600">&bull;</span>
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
              {t('socialResponsibility.mission.title')}
            </h2>
            <blockquote className="text-2xl italic mb-6">
              {t('socialResponsibility.mission.quote')}
            </blockquote>
            <p className="text-lg leading-relaxed opacity-90">
              {t('socialResponsibility.mission.description')}
            </p>
          </motion.div>
        </div>
      </section>

      <SectionPhotoStrip photos={freePhotos} />

      <CTASection
        title={t('socialResponsibility.ctaTitle')}
        subtitle={t('socialResponsibility.ctaText')}
      />
    </>
  )
}

export default SocialResponsibility
