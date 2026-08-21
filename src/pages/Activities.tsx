import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Salad, PawPrint, Fish, Sprout, FlaskConical, BookOpen } from 'lucide-react'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import SectionPhotoStrip from '../components/SectionPhotoStrip'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTASection } from '../components/ui/CTASection'

const Activities = () => {
  const { t } = useTranslation()
  const { photos, freePhotos } = useSectionPhotos('activites-sain')
  const poles = [
    {
      title: t('activities.poles.vegetal.title'),
      description: t('activities.poles.vegetal.description'),
      icon: Salad,
      image: photos['pole-1']?.url || '/images/Fruits-Sain-1024x717.jpg',
    },
    {
      title: t('activities.poles.animal.title'),
      description: t('activities.poles.animal.description'),
      icon: PawPrint,
      image: photos['pole-2']?.url || '/images/Elevage-lapin-Sain-1024x806.jpg',
    },
    {
      title: t('activities.poles.aquaculture.title'),
      description: t('activities.poles.aquaculture.description'),
      icon: Fish,
      image: photos['pole-3']?.url || '/images/Riz-Sain-1024x743.jpg',
    },
  ]
  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/Travaux-Ferme-1024x768.jpg'}
        eyebrow={t('activities.eyebrow')}
        title={t('activities.title')}
        subtitle={t('activities.subtitle')}
      />

      {/* Production */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
              eyebrow={t('activities.production.eyebrow')}
              title={t('activities.production.title')}
              subtitle={t('activities.production.subtitle')}
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
              eyebrow={t('activities.training.eyebrow')}
              title={t('activities.training.title')}
              subtitle={t('activities.training.subtitle')}
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
                {t('activities.training.methodTitle')}
              </h3>
              <blockquote className="text-xl italic text-earth-700 border-l-4 border-sun-500 pl-4 mb-4">
                {t('activities.training.quote')}
              </blockquote>
              <p className="text-ink-soft leading-relaxed">
                {t('activities.training.description')}
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
                <h4 className="text-xl font-bold text-ink mb-3">{t('activities.training.longTitle')}</h4>
                <ul className="space-y-2 text-ink-soft">
                  {t('activities.training.longDetails', { returnObjects: true }).map((detail: string, i: number) => (
                    <li key={i}>&bull; {detail}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="bg-white rounded-card shadow-card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold text-ink mb-3">{t('activities.training.shortTitle')}</h4>
                <ul className="space-y-2 text-ink-soft">
                  {t('activities.training.shortDetails', { returnObjects: true }).map((detail: string, i: number) => (
                    <li key={i}>&bull; {detail}</li>
                  ))}
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
              eyebrow={t('activities.research.eyebrow')}
              title={t('activities.research.title')}
              subtitle={t('activities.research.subtitle')}
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
              {t('activities.research.goalsTitle')}
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('activities.research.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 p-4 rounded-xl flex items-center gap-3">
                <Sprout className="w-7 h-7 text-sun-200 flex-shrink-0" aria-hidden="true" />
                <p className="font-medium">{t('activities.research.point1')}</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl flex items-center gap-3">
                <FlaskConical className="w-7 h-7 text-sun-200 flex-shrink-0" aria-hidden="true" />
                <p className="font-medium">{t('activities.research.point2')}</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-sun-200 flex-shrink-0" aria-hidden="true" />
                <p className="font-medium">{t('activities.research.point3')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agritourism */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
              eyebrow={t('activities.agritourism.eyebrow')}
              title={t('activities.agritourism.title')}
              subtitle={t('activities.agritourism.subtitle')}
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
              alt={photos['agritourisme']?.alt || t('activities.agritourism.title')}
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <p className="text-ink-soft leading-relaxed">
                {t('activities.agritourism.description')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionPhotoStrip photos={freePhotos} />

      <CTASection
        title={t('activities.ctaTitle')}
        subtitle={t('activities.ctaText')}
      />
    </>
  )
}

export default Activities
