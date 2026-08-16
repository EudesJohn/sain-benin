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
  const { photos, freePhotos } = useSectionPhotos('formations')
  const formationsLongues = [
    {
      title: 'Formation Professionnelle Complète (18 mois)',
      description: 'Cycle complet de formation agricole professionnelle pour jeunes défavorisés',
      details: [
        'Public cible : jeunes décrocheurs de familles défavorisées',
        'Durée : 18 mois',
        'Recrutement : 15 à 20 jeunes annuellement via les communes',
        'Hébergement et repas inclus',
        'Financement partiel par les ventes agricoles de la ferme',
        'Parrainage pour compléter le financement',
      ],
      icon: GraduationCap,
      color: 'from-sun-500 to-sun-700',
    },
    {
      title: 'Formation Courte (15-21 jours)',
      description: 'Formation intensive à distance pour les bénéficiaires du Programme des Communautés Unies (PCM)',
      details: [
        'Jeunes des PCM soutenus par le PNUD',
        'Modules de base en agriculture',
        'Accompagnement individualisé sur parcelle',
        'Suivi post-formation intégré',
      ],
      icon: BookOpen,
      color: 'from-leaf-500 to-leaf-700',
    },
  ]

  const modulesTechniques = [
    {
      title: 'Techniques d\'Élevage',
      items: ['Lapins', 'Poules', 'Cailles', 'Escargots'],
      icon: PawPrint,
    },
    {
      title: 'Techniques de Production',
      items: ['Maraîchage biologique', 'Compostage', 'Riziculture (SRI)', 'Techniques climato-intelligentes'],
      icon: Salad,
    },
    {
      title: 'Leadership & Développement',
      items: ['Élaboration de business plans', 'Agroécologie & entrepreneurship', 'Innovation rurale', 'Communication non-violente'],
      icon: Star,
    },
    {
      title: 'Apiculture',
      items: ['Technique d\'apiculture traditionnelle', 'Gestion des ruches', 'Récolte du miel'],
      icon: Droplet,
    },
  ]

  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/Formation-Apiculture-ppttd5u5ckwjd1zlrd6anyyhcbtdn27r04x4niza9w.jpg'}
        eyebrow="Ferme-école SAIN"
        title="Formations"
        subtitle="Une approche pédagogique innovante: apprendre par l'action"
      >
        <blockquote className="w-full max-w-2xl text-xl md:text-2xl italic text-earth-100 border-l-2 border-sun-400 pl-6">
          « Notre approche privilégiée est la recherche-action formative, autrement dit : ancrer la réflexion dans la pratique. »
        </blockquote>
      </PageHero>

      {/* Méthode Pédagogique */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeading
              eyebrow="Approche pédagogique"
              title="Notre Méthode Pédagogique"
              subtitle="Apprendre en faisant : une approche pratique et immersive qui permet d'acquérir des compétences concrètes et durables."
              className="mb-10"
            />
            <Reveal delay={0.05}>
              <blockquote className="text-2xl italic text-earth-700 border-l-4 border-sun-500 pl-6 mb-6">
                « Apprendre en faisant »
              </blockquote>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-ink-soft">
                Les apprenants découvrent les techniques agricoles par la pratique
                directe sur notre ferme de 14 hectares. Cette méthode permet d'acquérir
                des compétences concrètes et durables.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Formations Longues */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Insertion professionnelle"
            title="Formations de Longue Durée"
            subtitle="Programmes complets pour accompagner les jeunes vers l'insertion professionnelle"
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
                    {formation.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2 text-ink-soft">
                        <span className="text-sun-600" aria-hidden="true">•</span>
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
            eyebrow="Modules courts"
            title="Modules Techniques & Thématiques"
            subtitle="Découvrez les compétences enseignées lors de nos formations courtes"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modulesTechniques.map((module, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <div className="hover-lift cursor-pointer bg-earth-50 rounded-card p-6 text-center h-full">
                  <IconTile icon={module.icon} tone="leaf" size="md" className="mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-ink mb-4">{module.title}</h3>
                  <ul className="space-y-2">
                    {module.items.map((item, j) => (
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
            eyebrow="Retraites & groupes"
            title="Retraites en Familles ou en Groupes"
            subtitle="Un lieu idéal pour réfléchir à l'agriculture et se ressourcer en pleine nature"
            className="mb-12"
          />

          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="surface-card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <Reveal delay={0.05} className="aspect-square lg:aspect-auto">
                    <img
                      src={photos['etudiant']?.url || '/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg'}
                      alt={photos['etudiant']?.alt || 'Retraite'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/Jardin-Sain-1024x768.jpg'
                      }}
                    />
                  </Reveal>
                  <Reveal delay={0.1} className="p-8">
                    <h3 className="text-xl font-bold text-ink mb-4">
                      Découvrez notre cadre de travail
                    </h3>
                    <p className="text-ink-soft leading-relaxed mb-4">
                      La ferme SAIN, étendue sur 14 hectares, offre des espaces verts
                      pour des retrouilles, des ateliers et des moments de réflexion.
                    </p>
                    <p className="text-ink-soft leading-relaxed mb-6">
                      Plusieurs zones de repos et de méditation sont disponibles
                      tout au long du domaine, avec des sentiers pédestres agréables.
                    </p>
                    <Button to="/contact" variant="accent">
                      Réserver une retraite
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
        title="Prêt à rejoindre nos formations ?"
        subtitle="Contactez-nous pour plus d'informations sur nos programmes de formation et nos disponibilités."
        label="Contactez-nous"
      />
    </>
  )
}

export default Formations