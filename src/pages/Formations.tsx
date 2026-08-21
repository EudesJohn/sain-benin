import { useTranslation } from 'react-i18next'
import { GraduationCap, BookOpen, PawPrint, Salad, Star, Droplet } from 'lucide-react'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import SectionPhotoStrip from '../components/SectionPhotoStrip'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { IconTile } from '../components/ui/IconTile'
import { CTASection } from '../components/ui/CTASection'

const Formations = () => {
  const { t } = useTranslation()
  const { photos, freePhotos } = useSectionPhotos('formations')

  const formationsLongues = [
    {
      title: t('formations.long.title'),
      description: t('formations.long.description'),
      details: t('formations.long.details', { returnObjects: true }) as string[],
      icon: GraduationCap,
      color: 'from-sun-500 to-sun-700',
    },
    {
      title: t('formations.short.title'),
      description: t('formations.short.description'),
      details: t('formations.short.details', { returnObjects: true }) as string[],
      icon: BookOpen,
      color: 'from-leaf-500 to-leaf-700',
    },
  ]

  const modulesTechniques = [
    {
      title: t('formations.modules.livestock.title'),
      items: t('formations.modules.livestock.items', { returnObjects: true }) as string[],
      icon: PawPrint,
    },
    {
      title: t('formations.modules.production.title'),
      items: t('formations.modules.production.items', { returnObjects: true }) as string[],
      icon: Salad,
    },
    {
      title: t('formations.modules.leadership.title'),
      items: t('formations.modules.leadership.items', { returnObjects: true }) as string[],
      icon: Star,
    },
    {
      title: t('formations.modules.beekeeping.title'),
      items: t('formations.modules.beekeeping.items', { returnObjects: true }) as string[],
      icon: Droplet,
    },
  ]

  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/Formation-Apiculture-ppttd5u5ckwjd1zlrd6anyyhcbtdn27r04x4niza9w.jpg'}
        eyebrow={t('formations.eyebrow')}
        title={t('formations.title')}
        subtitle={t('formations.subtitle')}
      >
        <blockquote className="w-full max-w-2xl text-xl md:text-2xl italic text-earth-100 border-l-2 border-sun-400 pl-6">
          {t('formations.quote')}
        </blockquote>
      </PageHero>

      {/* M\u00e9thode P\u00e9dagogique */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeading
              eyebrow={t('formations.method.eyebrow')}
              title={t('formations.method.title')}
              subtitle={t('formations.method.subtitle')}
              className="mb-10"
            />
            <Reveal delay={0.05}>
              <blockquote className="text-2xl italic text-earth-700 border-l-4 border-sun-500 pl-6 mb-6">
                {t('formations.method.quote')}
              </blockquote>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-ink-soft">
                {t('formations.method.description')}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Formations Longues */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('formations.long.eyebrow')}
            title={t('formations.long.heading')}
            subtitle={t('formations.long.subtitle')}
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {formationsLongues.map((formation, i) => (
              <Reveal key={i} delay={i * 0.1} className="h-full">
                <div className="hover-lift cursor-pointer bg-white rounded-card shadow-card p-8 h-full">
                  <IconTile
                    icon={formation.icon}
                    tone={formation.color.startsWith('from-sun') ? 'sun' : 'leaf'}
                    size="lg"
                    className="mb-6"
                  />
                  <h3 className="text-2xl font-bold text-ink mb-4">{formation.title}</h3>
                  <p className="text-ink-soft mb-6">{formation.description}</p>
                  <ul className="space-y-3">
                    {formation.details.map((detail: string, j: number) => (
                      <li key={j} className="flex items-start gap-2 text-ink-soft">
                        <span className="text-sun-600" aria-hidden="true">&bull;</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Techniques */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('formations.modules.eyebrow')}
            title={t('formations.modules.title')}
            subtitle={t('formations.modules.subtitle')}
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modulesTechniques.map((module, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <div className="hover-lift cursor-pointer bg-earth-50 rounded-card p-6 text-center h-full">
                  <IconTile icon={module.icon} tone="leaf" size="md" className="mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-ink mb-4">{module.title}</h3>
                  <ul className="space-y-2">
                    {module.items.map((item: string, j: number) => (
                      <li key={j} className="text-sm text-ink-soft">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Retraites */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('formations.retreats.eyebrow')}
            title={t('formations.retreats.title')}
            subtitle={t('formations.retreats.subtitle')}
            className="mb-12"
          />

          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="surface-card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <Reveal delay={0.05} className="aspect-square lg:aspect-auto">
                    <img
                      src={photos['etudiant']?.url || '/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg'}
                      alt={photos['etudiant']?.alt || t('formations.retreats.title')}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/Jardin-Sain-1024x768.jpg'
                      }}
                    />
                  </Reveal>
                  <Reveal delay={0.1} className="p-8">
                    <h3 className="text-xl font-bold text-ink mb-4">
                      {t('formations.retreats.cardTitle')}
                    </h3>
                    <p className="text-ink-soft leading-relaxed mb-4">
                      {t('formations.retreats.description1')}
                    </p>
                    <p className="text-ink-soft leading-relaxed mb-6">
                      {t('formations.retreats.description2')}
                    </p>
                    <Button to="/contact" variant="accent">
                      {t('formations.retreats.cta')}
                    </Button>
                  </Reveal>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionPhotoStrip photos={freePhotos} />

      <CTASection
        title={t('formations.ctaTitle')}
        subtitle={t('formations.ctaText')}
        label={t('contact.formName')}
      />
    </>
  )
}

export default Formations
