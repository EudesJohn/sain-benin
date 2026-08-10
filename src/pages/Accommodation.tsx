import { Map, Users, BedDouble, Home, UserRound, ShowerHead, Plus } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { IconTile } from '../components/ui/IconTile'
import { CTASection } from '../components/ui/CTASection'

const Accommodation = () => {
  const rooms = [
    {
      title: 'Chambre Simple',
      price: '10,000 FCFA',
      description: 'Chambre individuelle confortable',
      icon: BedDouble,
    },
    {
      title: 'Chambre Double',
      price: '10,000 FCFA',
      description: 'Chambre double avec espace de vie',
      icon: BedDouble,
    },
    {
      title: 'Chambre Double + Salon',
      price: '12,000-15,000 FCFA',
      description: 'Chambre double avec espace de séjour privatif',
      icon: Home,
    },
    {
      title: 'Chambre Familiale + Salon',
      price: '18,000 FCFA',
      description: 'Chambre familiale spacieuse avec salon',
      icon: UserRound,
    },
    {
      title: 'Dortoir',
      price: 'Sur demande',
      description: 'Chambre partagée pour 4 à 6 personnes',
      icon: ShowerHead,
    },
    {
      title: 'Matelas supplémentaire',
      price: '2,500 FCFA (1 pers) / 5,000 FCFA (2 pers)',
      description: 'Ajout d\'un matelas dans votre chambre',
      icon: Plus,
    },
  ]

  const boardRates = [
    {
      title: 'Chambre simple',
      price: '17,000 FCFA',
    },
    {
      title: 'Chambre double',
      price: '17,000 FCFA',
    },
    {
      title: 'Chambre double + salon',
      price: '18,000-20,000 FCFA',
    },
    {
      title: 'Chambre familiale',
      price: '18,000-24,000 FCFA',
    },
  ]

  return (
    <>
      <PageHero
        image="/images/Jardin3-Sain-1024x768.jpg"
        eyebrow="Éco-tourisme"
        title="Hébergement à la Ferme"
        subtitle="Venez à SAIN pour vous ressourcer, découvrir les paysages magnifiques du Bénin."
      />

      {/* Un Séjour dans la Nature */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <SectionHeading align="left" eyebrow="À la ferme" title="Un Séjour dans la Nature" className="mb-6" />
              <p className="text-lg text-ink-soft mb-6 leading-relaxed">
                Notre établissement est idéal pour des séjours familiaux,
                des séminaires ou des retraites. Profitez d'un cadre paisible
                entouré de belles paysages béninois.
              </p>
              <p className="text-lg text-ink-soft mb-6 leading-relaxed">
                Situé au cœur du village de Kakanitchoé, notre ferme offre
                un environnement calme et propice à la détente, loin de la
                pollution et du stress de la vie citadine.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-ink">
                  <Map className="w-5 h-5 text-sun-600" aria-hidden="true" />
                  <span>12 km d'Adjohoun</span>
                </div>
                <div className="flex items-center gap-2 text-ink">
                  <Users className="w-5 h-5 text-sun-600" aria-hidden="true" />
                  <span>Capacité : 40 personnes</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  '/images/Accueil-Sain-150x150.jpg',
                  '/images/Chambres-Sain-1024x768.jpg',
                  '/images/sain1-150x150.jpg',
                  '/images/Cuisine-Gite-150x150.jpg',
                ].map((img, i) => (
                  <div key={i} className="group aspect-square rounded-card overflow-hidden shadow-card cursor-pointer">
                    <img
                      src={img}
                      alt={`Hébergement ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Types de Chambres */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Hébergement"
            title="Types de Chambres"
            subtitle="Des options adaptées à tous les besoins"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {rooms.map((room, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <div className="hover-lift cursor-pointer bg-white rounded-card shadow-card p-6 text-center h-full">
                  <IconTile icon={room.icon} tone="sun" size="md" className="mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-ink mb-2">{room.title}</h3>
                  <p className="text-2xl font-bold text-sun-600 mb-2">{room.price}</p>
                  <p className="text-ink-soft text-sm">{room.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs Pension Complète */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Pension complète"
            title="Tarifs Pension Complète"
            subtitle="Repas inclus avec produits frais de notre ferme"
            className="mb-12"
          />

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {boardRates.map((rate, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="flex justify-between items-center bg-earth-50 rounded-card p-5">
                    <span className="font-medium text-ink">{rate.title}</span>
                    <span className="text-xl font-bold text-sun-600">{rate.price}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15}>
              <p className="text-center text-sm text-ink-faint mt-6">
                * Tous les repas sont préparés avec nos produits agricoles biologiques
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Découvrez Nos Espaces */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading eyebrow="Galerie" title="Découvrez Nos Espaces" className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { src: '/images/Hebergement-9-ppv80k18zqzr9fenf1dj1cdlvqjcdnyq13mq21ey10.jpg', title: 'Chambres' },
              { src: '/images/Palme-Sain-150x150.jpg', title: 'Jardin' },
              { src: '/images/Fleur-150x150.jpg', title: 'Espaces verts' },
            ].map((img, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group aspect-[4/3] rounded-card overflow-hidden shadow-card cursor-pointer">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Réservez Votre Séjour"
        subtitle="Contactez-nous pour plus d'informations et vérifier la disponibilité."
        label="Contactez-nous"
      />
    </>
  )
}

export default Accommodation