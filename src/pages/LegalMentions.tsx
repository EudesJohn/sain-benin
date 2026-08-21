import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { sainData } from '../data/sainData'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import { useContactInfo } from '../hooks/useContactInfo'
import SectionPhotoStrip from '../components/SectionPhotoStrip'
import { PageHero } from '../components/ui/PageHero'

const LegalMentions = () => {
  const { t } = useTranslation()
  const { photos, freePhotos } = useSectionPhotos('mentions-legales')
  const contact = useContactInfo()
  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/Recherche-Sain-1024x767.jpg'}
        eyebrow={t('legal.eyebrow')}
        title={t('legal.title')}
        subtitle={sainData.siteName}
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className="max-w-4xl mx-auto space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Editor */}
            <div>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">1. {t('legal.editor')}</h2>
              <div className="space-y-2 text-ink-soft">
                <p><strong>SAIN Benin</strong></p>
                <p>{t('legal.rccm')}</p>
                <p>{t('legal.ifu')}</p>
                <p>{t('legal.director')} : Pascal Gbenou</p>
                <p>Email: <a href={`mailto:${contact.email}`} className="text-sun-600">{contact.email}</a></p>
                <p>{t('legal.website')} : <a href="https://www.sain-benin.org" className="text-sun-600">www.sain-benin.org</a></p>
              </div>
            </div>

            {/* Address */}
            <div>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">2. {t('legal.address')}</h2>
              <div className="space-y-2 text-ink-soft">
                <p>{t('legal.addressDetail')}</p>
                <p>{t('legal.postalBox')}</p>
              </div>
            </div>

            {/* Hosting */}
            <div>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">3. {t('legal.hosting')}</h2>
              <div className="text-ink-soft">
                <p>{t('legal.hostingProvider')}</p>
                <p>{t('legal.website')} : <a href="http://www.startlogic.com" className="text-sun-600">www.startlogic.com</a></p>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">4. {t('legal.cookies')}</h2>
              <p className="text-ink-soft">
                {t('legal.cookiesText')}
              </p>
            </div>

            {/* External Links */}
            <div>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">5. {t('legal.links')}</h2>
              <p className="text-ink-soft">
                {t('legal.linksText')}
              </p>
            </div>

            {/* Data Protection */}
            <div>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">6. {t('legal.data')}</h2>
              <p className="text-ink-soft mb-4">
                {t('legal.dataText')}
              </p>
              <p className="text-ink-soft">
                {t('legal.dataRetention')} {t('legal.dataContact')} : {contact.email}
              </p>
            </div>

            {/* Legal disclaimer */}
            <div className="pt-8 border-t border-earth-200">
              <p className="text-sm text-ink-faint">
                {t('legal.lastUpdate')} : {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionPhotoStrip photos={freePhotos} />
    </>
  )
}

export default LegalMentions
