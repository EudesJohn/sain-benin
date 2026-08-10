import { motion } from 'framer-motion'
import { SiFacebook, SiYoutube, SiInstagram } from '@icons-pack/react-simple-icons'

const easeOut = [0.23, 1, 0.32, 1] as const

const SocialMediaBar = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: SiFacebook,
      url: 'https://www.facebook.com/Ferme-Ecole-SAIN-108352284147580/',
      fill: 'group-hover:bg-[#1877F2]',
    },
    {
      name: 'Instagram',
      icon: SiInstagram,
      url: 'https://www.instagram.com/fermeecolesain/',
      fill: 'group-hover:bg-[#E4405F]',
    },
    {
      name: 'YouTube',
      icon: SiYoutube,
      url: 'https://www.youtube.com/channel/UCN982W_xV7nRHt6aW1mAIwA',
      fill: 'group-hover:bg-[#FF0000]',
    },
  ]

  return (
    <motion.div
      className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.4, ease: easeOut }}
    >
      {socialLinks.map((social, i) => {
        const Icon = social.icon
        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={`group w-11 h-11 rounded-full bg-white shadow-card flex items-center justify-center cursor-pointer transition-[background-color,box-shadow] duration-200 ${social.fill} hover:shadow-card-hover`}
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i + 0.5, duration: 0.25, ease: easeOut }}
          >
            <Icon className="w-5 h-5 text-ink-faint group-hover:text-white transition-colors duration-200" />
          </motion.a>
        )
      })}
    </motion.div>
  )
}

export default SocialMediaBar