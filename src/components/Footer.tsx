import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { SiFacebook, SiYoutube, SiInstagram } from '@icons-pack/react-simple-icons'
import { useTranslation } from 'react-i18next'
import sainLogo from '../assets/SAIN-Logo.png'
import { useContactInfo } from '../hooks/useContactInfo'

const easeOut = [0.23, 1, 0.32, 1]

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const contact = useContactInfo()
  const { t } = useTranslation()

  const footerLinks = {
    'footer.about': [
      { nameKey: 'nav.aboutProject', path: '/projet-global' },
      { nameKey: 'nav.responsability', path: '/responsabilite-sociale' },
      { nameKey: 'nav.activities', path: '/activites-sain' },
      { nameKey: 'nav.team', path: '/equipe-sain' },
    ],
    'footer.services': [
      { nameKey: 'nav.formations', path: '/formations' },
      { nameKey: 'nav.accommodation', path: '/hebergement-ferme' },
      { nameKey: 'nav.restaurant', path: '/restaurant' },
      { nameKey: 'nav.circuits', path: '/circuits-decouverte' },
      { nameKey: 'nav.production', path: '/production' },
    ],
    'footer.usefulLinks': [
      { nameKey: 'nav.gallery', path: '/galerie' },
      { nameKey: 'nav.contact', path: '/contact' },
      { nameKey: 'nav.support', path: '/nous-soutenir' },
      { nameKey: 'nav.legal', path: '/mentions-legales' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', url: contact.facebook, icon: SiFacebook, color: 'text-[#1877F2] hover:text-[#4d94ff]' },
    { name: 'YouTube', url: contact.youtube, icon: SiYoutube, color: 'text-[#FF0000] hover:text-[#ff5a5a]' },
    { name: 'Instagram', url: contact.instagram, icon: SiInstagram, color: 'text-[#E4405F] hover:text-[#f06a83]' },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        ease: easeOut,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="bg-gradient-to-b from-earth-900 to-earth-950 text-white">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Logo & Contact */}
          <motion.div variants={itemVariants}>
            <img
              src={sainLogo}
              alt="SAIN Ferme École Bio"
              className="h-14 w-auto mb-4"
            />
            <p className="text-sm text-earth-200 mb-4">
              {t('footer.description')}
            </p>
            <div className="space-y-3">
              <motion.a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-earth-200 hover:text-white transition-[color] duration-200"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2, ease: easeOut }}
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{contact.email}</span>
              </motion.a>
              <motion.a
                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-2 text-earth-200 hover:text-white transition-[color] duration-200"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2, ease: easeOut }}
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">{contact.whatsapp} (WhatsApp)</span>
              </motion.a>
              <motion.a
                href={`tel:${contact.mobile.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-2 text-earth-200 hover:text-white transition-[color] duration-200"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2, ease: easeOut }}
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">{contact.mobile}</span>
              </motion.a>
              <motion.div
                className="flex items-start gap-2 text-earth-200"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2, ease: easeOut }}
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  {t('footer.village')}<br />
                  {t('footer.distance')}
                </span>
              </motion.div>
            </div>
            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ${social.color} transition-[background-color,color,transform] duration-200`}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([categoryKey, links], categoryIndex) => (
            <motion.div key={categoryKey} variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-sun-300">{t(categoryKey)}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <motion.li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-earth-200 hover:text-white transition-[color] duration-200"
                    >
                      {t(link.nameKey)}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="border-t border-white/10 pt-6 text-center text-sm text-earth-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: easeOut }}
        >
          <p>
            © {currentYear} SAIN — {t('footer.copyright')}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer