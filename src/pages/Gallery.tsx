import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'

const easeOut = [0.23, 1, 0.32, 1]

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const galleryImages = [
    // ── La ferme & les travaux ──
    { src: '/images/Travaux-Ferme-1024x768.jpg', alt: 'Travaux à la ferme' },
    { src: '/images/Ecole-Sain-Arrosage-1-1024x867.jpg', alt: 'Arrosage des cultures' },
    { src: '/images/Arrosage-Etudiant-150x150.jpg', alt: 'Un étudiant arrose le jardin' },
    { src: '/images/Jardin-Sain-1024x768.jpg', alt: 'Le jardin de la ferme' },
    { src: '/images/Jardin3-Sain-1024x768.jpg', alt: 'Jardin de la ferme' },
    { src: '/images/Compost-Sain-150x150.jpg', alt: 'Compostage' },
    { src: '/images/Maraichage-150x150.jpg', alt: 'Maraîchage' },
    { src: '/images/Maraichage-5-150x150.jpg', alt: 'Culture maraîchère' },
    { src: '/images/Maraichage-3-150x150.jpg', alt: 'Maraîchage' },
    { src: '/images/Maraichage-4-150x150.jpg', alt: 'Culture maraîchère' },
    { src: '/images/Marécage-150x150.jpg', alt: 'Le marécage de la ferme' },
    { src: '/images/Travaux-2-150x150.jpg', alt: 'Travaux de la ferme' },
    { src: '/images/Repiquage-Sain-1-150x150.jpg', alt: 'Repiquage des plants' },
    { src: '/images/Repiquage-Sain-2-ppttfeo9obz73iq6nc47mek4fgqy114nz90vxbnfes.jpg', alt: 'Repiquage des plants' },
    { src: '/images/Riz-Sain-1024x743.jpg', alt: 'Champ de riz' },
    { src: '/images/Riz-Sain-1-1024x743.jpg', alt: 'Récolte du riz' },
    { src: '/images/Palme-Sain-150x150.jpg', alt: 'Palmeraie' },
    { src: '/images/Fleur-150x150.jpg', alt: 'Fleurs de la ferme' },

    // ── Élevage & produits ──
    { src: '/images/Elevage-lapin-Sain-1024x806.jpg', alt: 'Élevage de lapins' },
    { src: '/images/Lapins-Elevage-150x150.jpg', alt: 'Lapins de la ferme' },
    { src: '/images/Elevage-Poules-Sain-150x150.jpg', alt: 'Élevage de poules' },
    { src: '/images/Formation-Apiculture-1024x768.jpg', alt: 'Formation en apiculture' },
    { src: '/images/Apiculture-Formation-150x150.jpg', alt: 'Apiculture' },
    { src: '/images/Fruits-Sain-1024x717.jpg', alt: 'Fruits de la ferme' },
    { src: '/images/Fruits-Sain-150x150.jpg', alt: 'Fruits frais' },
    { src: '/images/Papaye-Sain-150x150.jpg', alt: 'Papayes' },
    { src: '/images/Curcuma-Sain-150x150.jpg', alt: 'Curcuma' },
    { src: '/images/Ananas-2-150x150.jpg', alt: 'Ananas de la ferme' },
    { src: '/images/banaan-scaled-e1649512167400.jpg', alt: 'Bananes plantains' },
    { src: '/images/Jus-Concombre-Sain-150x150.jpg', alt: 'Jus de concombre' },

    // ── Étudiants, formation & équipe ──
    { src: '/images/Etudiants-Sain-150x150.jpg', alt: 'Étudiants de la ferme école' },
    { src: '/images/Etudiant-4-1024x683.jpg', alt: 'Un étudiant à la ferme' },
    { src: '/images/Etudiant-5-150x150.jpg', alt: 'Étudiant en formation' },
    { src: '/images/Etudiant-7-1024x683.jpg', alt: 'Formation pratique' },
    { src: '/images/Etudiants-2-150x150.jpg', alt: 'Étudiants de la ferme' },
    { src: '/images/Etudiants-Sain-1024x768.jpg', alt: 'Groupe d\'étudiants de la ferme' },
    { src: '/images/Equipe-Sain-150x150.jpg', alt: "L'équipe SAIN" },
    { src: '/images/Sourire-Sain-150x150.jpg', alt: 'Jeunes souriants' },
    { src: '/images/Engagement-Social-Sain-1024x768.jpg', alt: 'Engagement social' },
    { src: '/images/Engagement-Social-Sain-150x150.jpg', alt: 'Engagement solidaire' },

    // ── Hébergement & accueil ──
    { src: '/images/Hebergement-9-ppv80k18zqzr9fenf1dj1cdlvqjcdnyq13mq21ey10.jpg', alt: 'Hébergement à la ferme' },
    { src: '/images/Chambres-Sain-1024x768.jpg', alt: 'Chambres SAIN' },
    { src: '/images/Hébergement-Sain-150x150.jpg', alt: 'Hébergement à la ferme' },
    { src: '/images/Hébergement-3-Sain-150x150.jpg', alt: 'Hébergement de la ferme' },
    { src: '/images/Cuisine-Gite-150x150.jpg', alt: 'Cuisine du gîte' },
    { src: '/images/Cuisine-Sain-150x150.jpg', alt: 'Cuisine de la ferme' },
    { src: '/images/Accueil-Sain-150x150.jpg', alt: 'Accueil à la ferme' },
    { src: '/images/Ferme-Accueil-150x150.jpg', alt: 'Accueil de la ferme' },
    { src: '/images/sain1-150x150.jpg', alt: 'Vue de la ferme' },

    // ── Nature, recherche & découverte ──
    { src: '/images/Visite-Ferme-ppttg268f6vd5rs1u49vuqmna3j4dgpyehc0x8ol38.jpg', alt: 'Visite de la ferme' },
    { src: '/images/Visite-Ferme-150x150.jpg', alt: 'Visite guidée' },
    { src: '/images/Pirogue-150x114.jpg', alt: 'Tour en pirogue' },
    { src: '/images/Plastique-Sain-150x150.jpg', alt: 'Tri du plastique' },
    { src: '/images/Recherche-Sain-1024x767.jpg', alt: 'Recherche-action' },
    { src: '/images/Recherche-Sain-1-pptteyp0g5dbm5de8n7jy0labwxpe6d891xmrmb4ck.jpg', alt: 'Recherche en laboratoire' },
    { src: '/images/Recherche-Sain-1-150x150.jpg', alt: 'Recherche' },
    { src: '/images/A-PROPOS-SAIN-1024x715.jpg', alt: 'La ferme SAIN' },
    { src: '/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg', alt: 'Regard' },
    { src: '/images/Restaurant-Sain-724x1024.png', alt: 'Le restaurant de la ferme' },
    { src: '/images/sain5-150x150.jpg', alt: 'Vie à la ferme' },
  ]

  // Vidéos YouTube — 3 proviennent de l'ancienne galerie du site, 9 de la chaîne officielle
  const galleryVideos = [
    // ── Ancienne galerie (sain-benin.org) ──
    { id: 'zG4hkH2Sjpo', title: 'Sain-Benin (présentation)' },
    { id: 'ebattfJkYkU', title: '17  Augustin 1' },
    { id: 'jMCzuutr7yY', title: '14' },

    // ── Chaîne officielle « Ferme école SAIN » ──
    { id: 'HR1WALBrX6A', title: "A la découverte de la Ferme école SAIN de Kakanitchoé au Bénin (Adjohoun-Ouémé)" },
    { id: 'YqyEomOeKyw', title: 'La Ferme Ecole SAIN et la Fondation Collibri' },
    { id: 'zI-ZXgILGjo', title: 'La 23ième promotion des jeunes entrepreneurs de la Ferme École SAIN' },
    { id: '1qbu0Z0b4Ew', title: 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités' },
    { id: '6zjG2PlL0e4', title: 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités' },
    { id: 'ALYKlX-yHCI', title: 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités' },
    { id: 'g1tTBNIs8Do', title: 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités' },
    { id: 'oua2snW8qfw', title: 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités' },
    { id: 'hVuvXNtj4LI', title: 'Agriculture : destruction de la Ferme École SAIN de Kakanitchoé par une tempête' },
  ]

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

  // Claviers : Échap ferme, ←/→ navigue. Verrouille le scroll du body quand la modale est ouverte.
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
        image="/images/Travaux-Ferme-1024x768.jpg"
        eyebrow="Galerie"
        title="Galerie Photo"
        subtitle="Toute la vie de la ferme en images"
      />

      {/* Gallery — masonry grid with column-count */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Notre quotidien"
            title="La Vie à la Ferme en Images"
            subtitle="Découvrez les moments forts de notre communauté agricole"
            className="mb-16"
          />

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
                aria-label={`Voir l'image : ${image.alt}`}
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
        </div>
      </section>

      {/* Videos — YouTube embeds (ancienne galerie + chaîne officielle) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Vidéos"
            title="La Ferme en Vidéos"
            subtitle="Retrouvez la vie de la ferme en mouvement sur notre chaîne YouTube"
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
              Voir toutes nos vidéos sur YouTube
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal — hardware-accelerated, fade + scale */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={`Image : ${galleryImages[selectedImage]?.alt}`}
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

              {/* Navigation */}
              {selectedImage > 0 && (
                <motion.button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white rounded-full p-2 transition-[background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer"
                  whileHover={{ x: -2 }}
                  transition={{ duration: 0.15, ease: easeOut }}
                  aria-label="Image précédente"
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
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              )}

              {/* Close */}
              <motion.button
                ref={closeButtonRef}
                onClick={closeModal}
                className="absolute -top-10 right-0 text-white hover:text-earth-100 transition-[color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded cursor-pointer"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.15, ease: easeOut }}
                aria-label="Fermer la galerie"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Caption */}
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