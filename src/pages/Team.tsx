import { useTranslation } from 'react-i18next'
import { teamData } from '../data/sainData'
import TeamMember from '../components/TeamMember'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import SectionPhotoStrip from '../components/SectionPhotoStrip'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTASection } from '../components/ui/CTASection'

const Team = () => {
  const { t } = useTranslation()
  const { photos, freePhotos } = useSectionPhotos('equipe-sain')
  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg'}
        eyebrow={t('team.eyebrow')}
        title={t('team.title')}
        subtitle={t('team.subtitle')}
      />

      {/* Team Members */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('team.members.eyebrow')}
            title={t('team.members.title')}
            subtitle={t('team.members.subtitle')}
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
              eyebrow={t('team.values.eyebrow')}
              title={t('team.values.title')}
              subtitle={t('team.values.subtitle')}
            />
          </div>
        </div>
      </section>

      <SectionPhotoStrip photos={freePhotos} />

      <CTASection
        title={t('team.ctaTitle')}
        subtitle={t('team.ctaText')}
      />
    </>
  )
}

export default Team
