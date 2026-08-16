import { motion } from 'framer-motion'
import { teamData } from '../data/sainData'
import TeamMember from '../components/TeamMember'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import SectionPhotoStrip from '../components/SectionPhotoStrip'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTASection } from '../components/ui/CTASection'

const Team = () => {
  const { photos, freePhotos } = useSectionPhotos('equipe-sain')
  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg'}
        eyebrow="Notre équipe"
        title="Notre Équipe"
        subtitle="Rencontrez les personnes passionnées qui font vivre le projet SAIN"
      />

      {/* Team Members */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Les acteurs de la ferme"
            title="L'Équipe Permanente"
            subtitle="Des personnes dévouées à la promotion de l'agriculture durable et à l'intégration des jeunes"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamData.map((member, index) => (
              <TeamMember
                key={member.id}
                name={member.name}
                role={member.role}
                description={member.description}
                image={photos[`membre-${index + 1}`]?.url || `/images/${member.image}`}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeading
              eyebrow="Nos valeurs"
              title="Engagés pour un Avenir Durable"
              subtitle="Notre équipe est unie par une passion commune pour l'agriculture durable, l'éducation des jeunes et le développement communautaire. Ensemble, nous construisons un avenir où l'homme, la nature et la communauté vivent en harmonie."
            />
          </div>
        </div>
      </section>

      <SectionPhotoStrip photos={freePhotos} />

      <CTASection
        title="Une équipe à votre écoute"
        subtitle="Posez vos questions ou planifiez une visite : l'équipe SAIN vous accueille avec plaisir à la ferme."
      />
    </>
  )
}

export default Team
