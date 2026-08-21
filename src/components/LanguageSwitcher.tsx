import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr'
    i18n.changeLanguage(newLang)
  }

  const currentLang = i18n.language?.split('-')[0] || 'fr'

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500"
      aria-label={currentLang === 'fr' ? 'Switch to English' : 'Passer en francais'}
    >
      <Globe className="w-4 h-4" />
      <span className="text-xs font-semibold uppercase">
        {currentLang === 'fr' ? 'EN' : 'FR'}
      </span>
    </button>
  )
}

export default LanguageSwitcher
