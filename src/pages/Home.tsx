import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Sprout,
  GraduationCap,
  ShoppingBasket,
  Home as HomeIcon,
  UtensilsCrossed,
  Trees,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import HeroSection from '../components/HeroSection'
import { serviceCards, testimonials } from '../data/sainData'
import TestimonialCard from '../components/TestimonialCard'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import SectionPhotoStrip from '../components/SectionPhotoStrip'

const easeOut = [0.23, 1, 0.32, 1] as const

// Icônes lucide pour les pôles d'activité
const serviceIcons: Record<string, typeof Sprout> = {
  sprout: Sprout,
  graduation: GraduationCap,
  basket: ShoppingBasket,
  home: HomeIcon,
  utensils: UtensilsCrossed,
  trees: Trees,
}

const Home = () => {
  const { photos, freePhotos } = useSectionPhotos('accueil')
  const { t } = useTranslation()
  const previewImages = ['apercu-1', 'apercu-2', 'apercu-3', 'apercu-4', 'apercu-5', 'apercu-6']
  return (
    <div className="overflow-hidden">
      <HeroSection />

      {/* ── Six pôles d'activité ─────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('activities.eyebrow')}
            title={t('activities.title')}
            subtitle={t('home.activitiesSubtitle')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
            {serviceCards.map((card, index) => {
              const Icon = serviceIcons[card.icon] ?? Sprout
              return (
                <Reveal key={card.id} delay={index * 0.08}>
                  <Link
                    to={card.href}
                    className="group surface-card hover-lift p-8 flex flex-col items-center text-center cursor-pointer h-full block"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-card mb-6 transition-transform duration-200 group-hover:scale-105`}>
                      <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-ink mb-3 group-hover:text-leaf-700 transition-colors duration-200">
                      {t(`home.services.${card.id}.title`)}
                    </h3>
                    <p className="text-ink-soft mb-6 flex-1">{t(`home.services.${card.id}.description`)}</p>
                    <motion.span
                      className="inline-flex items-center gap-2 text-sun-700 font-semibold"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                    >
                      {t('common.learnMore')}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </motion.span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── À propos (aperçu) ────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <SectionHeading
                align="left"
                eyebrow={t('home.aboutTitle')}
                title={t('home.aboutFarmTitle')}
                subtitle={t('home.aboutText')}
              />
              <blockquote className="text-xl italic text-earth-800 border-l-4 border-sun-500 pl-4 mb-8 mt-6">
                {t('hero.quote')}
              </blockquote>
              <Reveal delay={0.1}>
                <Button to="/projet-global" icon={<ArrowRight className="w-4 h-4" />}>
                  {t('common.learnMore')}
                </Button>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="relative">
                <img
                  src={photos['apropos']?.url || '/images/A-PROPOS-SAIN-1024x715.jpg'}
                  alt={photos['apropos']?.alt || 'SAIN — À propos'}
                  className="w-full object-cover rounded-card shadow-card-hover aspect-[4/3]"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-6 rounded-2xl shadow-float max-w-xs">
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-sun-700 mb-1">+30</div>
                    <p className="text-sm text-ink-soft">{t('home.yearsExperience')}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Galerie (aperçu) ─────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('home.galleryEyebrow')}
            title={t('home.galleryTitle')}
            subtitle={t('home.gallerySubtitle')}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-14">
            {previewImages.map((key, i) => {
              const photo = photos[key]
              return (
                <Reveal key={key} delay={i * 0.05}>
                  <div className="aspect-square rounded-xl overflow-hidden shadow-card hover-lift cursor-pointer">
                    <img
                      src={photo?.url || `/images/Travaux-Ferme-1024x768.jpg`}
                      alt={photo?.alt || `La vie à la ferme — image ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
              )
            })}
          </div>
          <div className="text-center mt-12">
            <Reveal delay={0.1}>
              <Button to="/galerie" variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
                {t('home.seeAll')}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Témoignages ──────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-earth-900 to-earth-950 text-white">
        <div className="container mx-auto px-4 lg:px-6">              <SectionHeading
                onDark
                eyebrow={t('home.testimonialsTitle')}
                title={t('home.testimonialsSubtitle')}
                subtitle={t('home.testimonialsDescription')}
              />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                role={testimonial.role}
                quote={testimonial.quote}
                image={photos[`temoin-${index + 1}`]?.url || `/images/${testimonial.image}`}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <SectionPhotoStrip photos={freePhotos} />
    </div>
  )
}

export default Home