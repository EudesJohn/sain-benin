import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone} from 'lucide-react'
import { SiWhatsapp } from '@icons-pack/react-simple-icons'
import { useTranslation } from 'react-i18next'
import sainLogo from '../assets/SAIN-Logo.png'
import { Button } from './ui/Button'
import { useContactInfo } from '../hooks/useContactInfo'
import LanguageSwitcher from './LanguageSwitcher'

const easeOut = [0.23, 1, 0.32, 1] as const

const aboutItems = [
  { nameKey: 'nav.aboutProject', path: '/projet-global' },
  { nameKey: 'nav.responsability', path: '/responsabilite-sociale' },
  { nameKey: 'nav.activities', path: '/activites-sain' },
  { nameKey: 'nav.team', path: '/equipe-sain' },
]

const ecoItems = [
  { nameKey: 'nav.accommodation', path: '/hebergement-ferme' },
  { nameKey: 'nav.restaurant', path: '/restaurant' },
  { nameKey: 'nav.circuits', path: '/circuits-decouverte' },
]

const mainNavItems = [
  { nameKey: 'nav.home', path: '/' },
  { nameKey: 'nav.formations', path: '/formations' },
  { nameKey: 'nav.production', path: '/production' },
  { nameKey: 'nav.support', path: '/nous-soutenir' },
  { nameKey: 'nav.gallery', path: '/galerie' },
]

interface DropdownProps {
  labelKey: string
  items: { nameKey: string; path: string }[]
  solid: boolean
}

/**
 * NavDropdown — menu déroulant hover + clavier (focus), origin-aware,
 * 180ms ease-out. Les items masqués ne restent jamais dans le DOM.
 */
const NavDropdown = ({ labelKey, items, solid }: DropdownProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isActive = items.some((item) => location.pathname === item.path)

  const close = () => setOpen(false)

  const buttonClass = `inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium cursor-pointer transition-[background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 ${
    isActive
      ? solid
        ? 'text-leaf-700 bg-leaf-50'
        : 'text-white bg-white/15'
      : solid
        ? 'text-ink-soft hover:text-ink hover:bg-earth-50'
        : 'text-white/85 hover:text-white hover:bg-white/10'
  }`

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) close()
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={buttonClass}
      >
        <span>{t(labelKey)}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-float ring-1 ring-black/5 py-2 overflow-hidden z-50"
            style={{ transformOrigin: 'top left' }}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: easeOut }}
          >
            {items.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.16, ease: easeOut }}
              >
                <Link
                  to={item.path}
                  onClick={close}
                  className={`block px-4 py-2.5 text-sm cursor-pointer transition-[background-color,color] duration-150 ${
                    location.pathname === item.path
                      ? 'text-leaf-700 bg-leaf-50 font-medium'
                      : 'text-ink-soft hover:text-ink hover:bg-earth-50'
                  }`}
                >
                  {t(item.nameKey)}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const contact = useContactInfo()
  const { t } = useTranslation()
  const isHome = location.pathname === '/'

  // Une seule source de vérité : barre blanche dès qu'on quitte le haut de l'accueil
  const solid = scrolled || !isHome || isOpen

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Verrouille le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Ferme le menu à chaque navigation
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const menuVariants = {
    hidden: { opacity: 0, scaleY: 0, transformOrigin: 'top' },
    visible: { opacity: 1, scaleY: 1, transition: { duration: 0.25, ease: easeOut } },
    exit: { opacity: 0, scaleY: 0, transition: { duration: 0.18, ease: easeOut } },
  }

  const linkClass = (isActive: boolean) =>
    `inline-flex items-center px-3 py-2 rounded-full text-sm font-medium cursor-pointer transition-[background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 ${
      isActive
        ? solid
          ? 'text-leaf-700 bg-leaf-50'
          : 'text-white bg-white/15'
        : solid
          ? 'text-ink-soft hover:text-ink hover:bg-earth-50'
          : 'text-white/85 hover:text-white hover:bg-white/10'
    }`

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,padding] duration-200 ${
        solid ? 'bg-white/95 backdrop-blur-md shadow-card py-2' : 'bg-transparent py-3.5'
      }`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0" aria-label="Accueil SAIN">
            <img src={sainLogo} alt="SAIN Ferme École Bio" className="h-11 w-auto drop-shadow-sm" />
          </Link>

          {/* Navigation desktop */}
          <div className="hidden lg:flex items-center gap-0.5">
            {mainNavItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => linkClass(isActive)}>
                {t(item.nameKey)}
              </NavLink>
            ))}
            <NavDropdown labelKey="nav.about" items={aboutItems} solid={solid} />
            <NavDropdown labelKey="nav.ecoTourism" items={ecoItems} solid={solid} />
          </div>

          {/* Actions desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${contact.whatsapp}`}
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 ${
                solid ? 'text-leaf-600 hover:bg-leaf-50' : 'text-white hover:bg-white/10'
              }"
            >
              <SiWhatsapp className="w-5 h-5" />
            </a>
            <Button to="/contact" variant="primary" size="sm">
              {t('nav.contact')}
            </Button>
          </div>

          {/* Bouton menu mobile */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-xl cursor-pointer transition-[background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 ${
              solid ? 'text-ink hover:bg-earth-50' : 'text-white hover:bg-white/10'
            }`}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.16, ease: easeOut }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-float max-h-[calc(100vh-4rem)] overflow-y-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-[15px] font-medium cursor-pointer transition-[background-color,color] duration-150 ${
                      isActive ? 'text-leaf-700 bg-leaf-50' : 'text-ink hover:bg-earth-50'
                    }`
                  }
                >
                  {t(item.nameKey)}
                </NavLink>
              ))}
              {[
                { labelKey: 'nav.about', items: aboutItems },
                { labelKey: 'nav.ecoTourism', items: ecoItems },
              ].map((section) => (
                <div key={section.labelKey} className="pt-3 mt-1 border-t border-earth-100">
                  <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                    {t(section.labelKey)}
                  </p>
                  {section.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block pl-8 pr-4 py-2.5 text-[15px] cursor-pointer transition-[background-color,color] duration-150 rounded-xl ${
                          isActive ? 'text-leaf-700 bg-leaf-50' : 'text-ink-soft hover:text-ink hover:bg-earth-50'
                        }`
                      }
                    >
                      {t(item.nameKey)}
                    </NavLink>
                  ))}
                </div>
              ))}

              <div className="pt-3 mt-1 border-t border-earth-100">
                <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-faint">{t('nav.contact')}</p>
                <div className="px-4 py-3 space-y-2">
                  <a href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink-soft hover:text-ink transition-colors duration-150 cursor-pointer">
                    <SiWhatsapp className="w-5 h-5 text-leaf-600" />
                    <span className="text-[15px]">{contact.whatsapp} (WhatsApp)</span>
                  </a>
                  <a href={`tel:${contact.mobile.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-3 text-ink-soft hover:text-ink transition-colors duration-150 cursor-pointer">
                    <Phone className="w-5 h-5 text-leaf-600" />
                    <span className="text-[15px]">{contact.mobile}</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar