import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import { useSectionVideos } from '../hooks/useSectionVideos'

const easeOut = [0.23, 1, 0.32, 1]

const Gallery = () => {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { photos, freePhotos, loading, preloadProgress, allReady } = useSectionPhotos('galerie')
  const { videos } = useSectionVideos('galerie')
  const showPhotoLoader = loading || !allReady

  const defaultGalleryImages = [
    { src: '/images/Travaux-Ferme-1024x768.jpg', alt: t('gallery.images.farmWorks') },
    { src: '/images/Ecole-Sain-Arrosage-1-1024x867.jpg', alt: t('gallery.images.watering') },
    { src: '/images/Arrosage-Etudiant-150x150.jpg', alt: t('gallery.images.studentWatering') },
    { src: '/images/Jardin-Sain-1024x768.jpg', alt: t('gallery.images.garden') },
    { src: '/images/Jardin3-Sain-1024x768.jpg', alt: t('gallery.images.garden2') },
    { src: '/images/Compost-Sain-150x150.jpg', alt: t('gallery.images.compost') },
    { src: '/images/Maraichage-150x150.jpg', alt: t('gallery.images.marketGardening') },
    { src: '/images/Maraichage-5-150x150.jpg', alt: t('gallery.images.marketGardening2') },
    { src: '/images/Maraichage-3-150x150.jpg', alt: t('gallery.images.marketGardening3') },
    { src: '/images/Maraichage-4-150x150.jpg', alt: t('gallery.images.marketGardening4') },
    { src: '/images/Marécage-150x150.jpg', alt: t('gallery.images.wetland') },
    { src: '/images/Travaux-2-150x150.jpg', alt: t('gallery.images.farmWorks2') },
    { src: '/images/Repiquage-Sain-1-150x150.jpg', alt: t('gallery.images.transplanting') },
    { src: '/images/Repiquage-Sain-2-ppttfeo9obz73iq6nc47mek4fgqy114nz90vxbnfes.jpg', alt: t('gallery.images.transplanting2') },
    { src: '/images/Riz-Sain-1024x743.jpg', alt: t('gallery.images.riceField') },
    { src: '/images/Riz-Sain-1-1024x743.jpg', alt: t('gallery.images.riceHarvest') },
    { src: '/images/Palme-Sain-150x150.jpg', alt: t('gallery.images.palmTrees') },
    { src: '/images/Fleur-150x150.jpg', alt: t('gallery.images.flowers') },
    { src: '/images/Elevage-lapin-Sain-1024x806.jpg', alt: t('gallery.images.rabbitFarming') },
    { src: '/images/Lapins-Elevage-150x150.jpg', alt: t('gallery.images.rabbits') },
    { src: '/images/Elevage-Poules-Sain-150x150.jpg', alt: t('gallery.images.chickenFarming') },
    { src: '/images/Formation-Apiculture-1024x768.jpg', alt: t('gallery.images.beekeepingTraining') },
    { src: '/images/Apiculture-Formation-150x150.jpg', alt: t('gallery.images.beekeeping') },
    { src: '/images/Fruits-Sain-1024x717.jpg', alt: t('gallery.images.fruits') },
    { src: '/images/Fruits-Sain-150x150.jpg', alt: t('gallery.images.freshFruits') },
    { src: '/images/Papaye-Sain-150x150.jpg', alt: t('gallery.images.papaya') },
    { src: '/images/Curcuma-Sain-150x150.jpg', alt: t('gallery.images.turmeric') },
    { src: '/images/Ananas-2-150x150.jpg', alt: t('gallery.images.pineapple') },
    { src: '/images/banaan-scaled-e1649512167400.jpg', alt: t('gallery.images.plantains') },
    { src: '/images/Jus-Concombre-Sain-150x150.jpg', alt: t('gallery.images.cucumberJuice') },
    { src: '/images/Etudiants-Sain-150x150.jpg', alt: t('gallery.images.students') },
    { src: '/images/Etudiant-4-1024x683.jpg', alt: t('gallery.images.student') },
    { src: '/images/Etudiant-5-150x150.jpg', alt: t('gallery.images.studentTraining') },
    { src: '/images/Etudiant-7-1024x683.jpg', alt: t('gallery.images.practicalTraining') },
    { src: '/images/Etudiants-2-150x150.jpg', alt: t('gallery.images.students2') },
    { src: '/images/Etudiants-Sain-1024x768.jpg', alt: t('gallery.images.studentGroup') },
    { src: '/images/Equipe-Sain-150x150.jpg', alt: t('gallery.images.sainTeam') },
    { src: '/images/Sourire-Sain-150x150.jpg', alt: t('gallery.images.smilingYouth') },
    { src: '/images/Engagement-Social-Sain-1024x768.jpg', alt: t('gallery.images.socialEngagement') },
    { src: '/images/Engagement-Social-Sain-150x150.jpg', alt: t('gallery.images.solidarity') },
    { src: '/images/Hebergement-9-ppv80k18zqzr9fenf1dj1cdlvqjcdnyq13mq21ey10.jpg', alt: t('gallery.images.accommodation') },
    { src: '/images/Chambres-Sain-1024x768.jpg', alt: t('gallery.images.rooms') },
    { src: '/images/Hébergement-Sain-150x150.jpg', alt: t('gallery.images.accommodation2') },
    { src: '/images/Hébergement-3-Sain-150x150.jpg', alt: t('gallery.images.accommodation3') },
    { src: '/images/Cuisine-Gite-150x150.jpg', alt: t('gallery.images.guesthouseKitchen') },
    { src: '/images/Cuisine-Sain-150x150.jpg', alt: t('gallery.images.farmKitchen') },
    { src: '/images/Accueil-Sain-150x150.jpg', alt: t('gallery.images.welcome') },
    { src: '/images/Ferme-Accueil-150x150.jpg', alt: t('gallery.images.farmWelcome') },
    { src: '/images/sain1-150x150.jpg', alt: t('gallery.images.farmView') },
    { src: '/images/Visite-Ferme-ppttg268f6vd5rs1u49vuqmna3j4dgpyehc0x8ol38.jpg', alt: t('gallery.images.farmVisit') },
    { src: '/images/Visite-Ferme-150x150.jpg', alt: t('gallery.images.guidedTour') },
    { src: '/images/Pirogue-150x114.jpg', alt: t('gallery.images.canoeTrip') },
    { src: '/images/Plastique-Sain-150x150.jpg', alt: t('gallery.images.plasticSorting') },
    { src: '/images/Recherche-Sain-1024x767.jpg', alt: t('gallery.images.actionResearch') },
    { src: '/images/Recherche-Sain-1-pptteyp0g5dbm5de8n7jy0labwxpe6d891xmrmb4ck.jpg', alt: t('gallery.images.labResearch') },
    { src: '/images/Recherche-Sain-1-150x150.jpg', alt: t('gallery.images.research') },
    { src: '/images/A-PROPOS-SAIN-1024x715.jpg', alt: t('gallery.images.sainFarm') },
    { src: '/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg', alt: t('gallery.images.gaze') },
    { src: '/images/Restaurant-Sain-724x1024.png', alt: t('gallery.images.farmRestaurant') },
    { src: '/images/sain5-150x150.jpg', alt: t('gallery.images.farmLife') },
  ]

  // Dédupliquer par URL pour éviter les doublons (hero + photo libre identique)
  const heroUrl = photos['hero']?.url
  const rawImages = freePhotos.length > 0
    ? freePhotos.map((photo) => ({ src: photo.url, alt: photo.alt }))
    : defaultGalleryImages
  const seenUrls = new Set<string>()
  const galleryImages = rawImages.filter((image) => {
    if (seenUrls.has(image.src)) return false
    // Exclure l'image hero déjà affichée dans PageHero
    if (heroUrl && image.src === heroUrl) return false
    seenUrls.add(image.src)
    return true
  })
  const galleryVideos = videos.map((video) => ({ id: video.youtubeId, title: video.title }))

  const openModal = (index: number) => {
    setSelectedImage(index)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const prevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    }
  }

  const nextImage = () => {
    if (selectedImage !== null && selectedImage < galleryImages.length - 1) {
      setSelectedImage(selectedImage + 1)
    }
  }

  useEffect(() => {
    if (selectedImage === null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowLeft') {
        setSelectedImage((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'ArrowRight') {
        setSelectedImage((prev) =>
          prev !== null && prev < galleryImages.length - 1 ? prev + 1 : prev
        )
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedImage])

  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/Travaux-Ferme-1024x768.jpg'}
        eyebrow={t('gallery.eyebrow')}
        title={t('gallery.title')}
        subtitle={t('gallery.subtitle')}
      />

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('gallery.grid.eyebrow')}
            title={t('gallery.grid.title')}
            subtitle={t('gallery.grid.subtitle')}
            className="mb-16"
          />

          {showPhotoLoader ? (
            <motion.div
              className="flex flex-col items-center justify-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: easeOut }}
              role="status"
              aria-live="polite"
            >
              <Loader2 className="w-10 h-10 text-sun-600 animate-spin mb-4" aria-hidden="true" />
              <p className="text-ink font-semibold">{t('gallery.loading')}</p>
              {!loading && preloadProgress.total > 0 && (
                <p className="text-sm text-ink-soft mt-1">
                  {preloadProgress.ready}/{preloadProgress.total} {t('gallery.photosReady')}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="columns-2 md:columns-3 lg:columns-4 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15, ease: easeOut }}
              viewport={{ once: true }}
            >
              {galleryImages.map((image, i) => (
                <motion.div
                  key={i}
                  className="mb-4 break-inside-avoid cursor-zoom-in"
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02, duration: 0.3, ease: easeOut }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openModal(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={t('gallery.viewImage', { alt: image.alt })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openModal(i)
                    }
                  }}
                >
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full rounded-lg shadow-card transition-[box-shadow] duration-200"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Videos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('gallery.videos.eyebrow')}
            title={t('gallery.videos.title')}
            subtitle={t('gallery.videos.subtitle')}
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryVideos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.4, ease: easeOut }}
                viewport={{ once: true }}
                className="break-inside-avoid"
              >
                <div className="aspect-video rounded-2xl overflow-hidden shadow-card bg-ink/5">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
                    title={video.title}
                    width="100%"
                    height="100%"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>
                <p className="mt-2.5 text-sm text-ink-soft leading-snug">{video.title}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: easeOut }}
            viewport={{ once: true }}
          >
            <a
              href="https://www.youtube.com/channel/UCN982W_xV7nRHt6aW1mAIwA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sun-600 hover:bg-earth-700 text-white rounded-full font-semibold transition-[background-color] duration-200"
            >
              {t('gallery.videos.seeAll')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={t('gallery.modal.label', { alt: galleryImages[selectedImage]?.alt })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: easeOut }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh] mx-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={galleryImages[selectedImage]?.src}
                alt={galleryImages[selectedImage]?.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {selectedImage > 0 && (
                <motion.button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white rounded-full p-2 transition-[background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer"
                  whileHover={{ x: -2 }}
                  transition={{ duration: 0.15, ease: easeOut }}
                  aria-label={t('common.previous')}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
              )}

              {selectedImage < galleryImages.length - 1 && (
                <motion.button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white rounded-full p-2 transition-[background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15, ease: easeOut }}
                  aria-label={t('common.next')}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              )}

              <motion.button
                ref={closeButtonRef}
                onClick={closeModal}
                className="absolute -top-10 right-0 text-white hover:text-earth-100 transition-[color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded cursor-pointer"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.15, ease: easeOut }}
                aria-label={t('common.close')}
              >
                <X className="w-6 h-6" />
              </motion.button>

              <p className="text-center text-white mt-4 text-sm opacity-80">
                {galleryImages[selectedImage]?.alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Gallery
