import type { Photo } from '../lib/photoService'
import { SectionHeading } from './ui/SectionHeading'
import Reveal from './ui/Reveal'

interface SectionPhotoStripProps {
  /** Photos libres de la section (ajoutées depuis l'admin) */
  photos: Photo[]
  /** Titre du bandeau (affiché seulement si des photos existent) */
  title?: string
  eyebrow?: string
}

/**
 * Bandeau de photos ajoutées depuis l'admin pour une section.
 * Ne s'affiche que s'il y a des photos libres — sinon rien.
 */
const SectionPhotoStrip = ({ photos, title = 'Galerie de la section', eyebrow = 'Photos' }: SectionPhotoStripProps) => {
  if (photos.length === 0) return null

  return (
    <section className="py-20 bg-earth-50">
      <div className="container mx-auto px-4 lg:px-6">
        <SectionHeading eyebrow={eyebrow} title={title} className="mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {photos.map((photo, i) => (
            <Reveal key={photo.id ?? `${photo.url}-${i}`} delay={(i % 4) * 0.06}>
              <div className="group aspect-square rounded-card overflow-hidden shadow-card cursor-pointer">
                <img
                  src={photo.url}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionPhotoStrip
