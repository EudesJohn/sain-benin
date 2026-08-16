import { Leaf, Clock, MapPin } from 'lucide-react'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import SectionPhotoStrip from '../components/SectionPhotoStrip'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { IconTile } from '../components/ui/IconTile'
import { CTASection } from '../components/ui/CTASection'

const Restaurant = () => {
  const { photos, freePhotos } = useSectionPhotos('restaurant')
  const menuCategories = [
    {
      name: 'Entrées',
      items: ['Salade verte', 'Soupe du jour', 'Salade de papaye verte'],
    },
    {
      name: 'Plats Principaux',
      items: ['Riz SAIN (riz de la ferme)', 'Poulet rôti', 'Poisson grillé', 'Lapin braisé'],
    },
    {
      name: 'Accompagnements',
      items: ['Légumes de saison', 'Purée de manioc', 'Gari'],
    },
    {
      name: 'Desserts',
      items: ['Confiture maison', 'Jus de papaye', 'Fromage de coco'],
    },
  ]

  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/Restaurant-Sain-724x1024.png'}
        eyebrow="Restaurant"
        title="Restaurant SAIN"
        subtitle="Du champ à l'assiette - Découvrez la cuisine bio de notre ferme"
      />

      {/* Notre Concept */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <SectionHeading align="left" eyebrow="Agroécologie" title="Notre Concept" className="mb-6" />
              <p className="text-lg text-ink-soft mb-6 leading-relaxed">
                <strong>Du champ à l'assiette</strong> : nos menus sont élaborés
                avec les produits frais cultivés sur notre propre ferme en
                agroécologie.
              </p>
              <p className="text-lg text-ink-soft mb-6 leading-relaxed">
                Notre cuisine allie tradition béninoise et créativité, en valorisant
                les produits locaux et de saison, garantissant fraîcheur et saveurs
                authentiques.
              </p>
              <div className="flex items-center gap-4">
                <IconTile icon={Leaf} tone="leaf" size="md" />
                <span className="text-lg font-semibold text-ink">100% Bio &amp; Local</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <div className="group aspect-square rounded-card overflow-hidden shadow-card cursor-pointer">
                  <img
                    src={photos['photo-1']?.url || '/images/Restaurant-Sain-724x1024.png'}
                    alt={photos['photo-1']?.alt || 'Restaurant SAIN'}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="group aspect-[4/6] rounded-card overflow-hidden shadow-card cursor-pointer">
                  <img
                    src={photos['photo-2']?.url || '/images/Fruits-Sain-1024x717.jpg'}
                    alt={photos['photo-2']?.alt || 'Menu SAIN'}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Horaires de Service */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading eyebrow="Horaires" title="Horaires de Service" className="mb-12" />

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Reveal delay={0.05} className="h-full">
                <div className="hover-lift cursor-pointer bg-white p-8 rounded-card shadow-card text-center h-full">
                  <IconTile icon={Clock} tone="leaf" size="md" className="mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-ink mb-2">Petit-déjeuner</h3>
                  <p className="text-ink-soft">07h00 - 10h00</p>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="h-full">
                <div className="hover-lift cursor-pointer bg-white p-8 rounded-card shadow-card text-center h-full">
                  <IconTile icon={Clock} tone="leaf" size="md" className="mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-ink mb-2">Dîner</h3>
                  <p className="text-ink-soft">18h30 - 21h00</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-8 text-center text-ink-soft">
                <p className="mb-2">
                  <MapPin className="w-5 h-5 inline mr-2" aria-hidden="true" />
                  Restaurant SAIN - Village Kakanitchoé, 12 km d'Adjohoun
                </p>
                <p>Pour les groupes, réservation obligatoire 24h à l'avance</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Notre Menu */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Menu"
            title="Notre Menu"
            subtitle="Des plats préparés avec nos produits agricoles"
            className="mb-12"
          />

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuCategories.map((category, i) => (
                <Reveal key={category.name} delay={i * 0.1} className="h-full">
                  <div className="bg-earth-50 rounded-card p-6 h-full">
                    <h3 className="text-xl font-bold text-leaf-700 mb-4 border-b-2 border-leaf-200 pb-2">
                      {category.name}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item, j) => (
                        <li key={j} className="flex justify-between text-ink-soft">
                          <span>{item}</span>
                          <span className="text-ink-faint" aria-hidden="true">⋯</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionPhotoStrip photos={freePhotos} />

      <CTASection
        title="Réservez Votre Repas"
        subtitle="Découvrez les saveurs de notre cuisine bio durant votre séjour à la ferme."
        label="Contactez-nous"
      />
    </>
  )
}

export default Restaurant