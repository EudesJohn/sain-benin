import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SiFacebook, SiYoutube, SiInstagram, SiWhatsapp } from '@icons-pack/react-simple-icons'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'

const MAPS_LINK = 'https://maps.app.goo.gl/NHMjjrNEsWapCCnW7'
const WHATSAPP_NUMBER = '22962444744' // +229 62 44 47 44 (sans le +)
const CONTACT_EMAIL = 'sainbenin@yahoo.fr'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Choix de l'envoi : WhatsApp (par défaut) ou Email — retenu au clic du bouton
  const sendMethod = useRef<'whatsapp' | 'email'>('whatsapp')

  const buildMessage = (withSubject: boolean) =>
    [
      `Nom: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.phone ? `Téléphone: ${formData.phone}` : '',
      withSubject && formData.subject ? `Motif: ${formData.subject}` : '',
      '',
      formData.message,
    ]
      .filter(Boolean)
      .join('\n')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (sendMethod.current === 'whatsapp') {
      // Ouvre WhatsApp avec le message pré-rempli
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(true))}`,
        '_blank',
        'noopener,noreferrer'
      )
    } else {
      // Ouvre le client mail avec le message pré-rempli
      const link = document.createElement('a')
      link.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(buildMessage(false))}`
      link.click()
    }
  }

  return (
    <>
      <PageHero
        image="/images/Etudiant-4-1024x683.jpg"
        eyebrow="Contact"
        title="Contactez-nous"
        subtitle="Nous sommes à votre écoute pour toute question ou collaboration"
      />

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SectionHeading
                align="left"
                eyebrow="Nous trouver"
                title="Nos Coordonnées"
                className="mb-8"
              />

              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-sun-100 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-sun-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink mb-1">Adresse</h3>
                    <a
                      href={MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-soft hover:text-sun-600 transition-colors duration-200"
                    >
                      SAIN – Village Kakanitchoé<br />
                      12 km de Adjohoun, Bénin<br />
                      44 km de Porto-Novo (± 1h)<br />
                      84 km de Cotonou (± 2h)
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-sun-100 p-3 rounded-xl">
                    <Phone className="w-6 h-6 text-sun-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink mb-1">Téléphones</h3>
                    <p className="text-ink-soft">
                      +229 62 44 47 44 (WhatsApp)<br />
                      +229 97 65 56 28
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-sun-100 p-3 rounded-xl">
                    <Mail className="w-6 h-6 text-sun-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink mb-1">Email</h3>
                    <p className="text-ink-soft">
                      <a
                        href="mailto:sainbenin@yahoo.fr"
                        className="text-sun-600 hover:underline"
                      >
                        sainbenin@yahoo.fr
                      </a>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-sun-100 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-sun-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink mb-1">Horaires</h3>
                    <p className="text-ink-soft">
                      Du lundi au vendredi<br />
                      8h00 - 17h00 (heure du Bénin)
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Map Embed */}
              <motion.div
                className="mt-8 aspect-video rounded-2xl overflow-hidden shadow-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <iframe
                  src="https://www.google.com/maps?q=6.765846,2.512753&z=15&hl=fr&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation SAIN"
                />
              </motion.div>

              {/* Legal Info */}
              <motion.div
                className="mt-8 p-6 bg-earth-50 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-ink mb-2">Informations Légales</h3>
                <p className="text-sm text-ink-soft">
                  Société S.A.R.L (immatriculée au RCCM: RB/PNO/21 3196)<br />
                  Directeur de Publication: Pascal Gbenou<br />
                  Hébergeur: STARTLOGIC'S, Jacksonville, FL, USA<br />
                  Site créé par <a href="https://bawete.fr" target="_blank" rel="noopener noreferrer" className="text-sun-600">Bawete</a> © Juin 2022
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SectionHeading
                align="left"
                eyebrow="Écrivez-nous"
                title="Formulaire de Contact"
                className="mb-6"
              />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-ink-soft mb-2">
                      Nom & Prénom
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-ink-soft mb-2">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-ink-soft mb-2">
                    Téléphone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
                    placeholder="+229 97 00 00 00"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-ink-soft mb-2">
                    Motif du contact
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
                    placeholder="Réservation, stage, visite, question…"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-ink-soft mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200 resize-none"
                    placeholder="Votre message..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={<SiWhatsapp className="w-5 h-5" />}
                    onClick={() => { sendMethod.current = 'whatsapp' }}
                  >
                    Envoyer par WhatsApp
                  </Button>
                  <Button
                    type="submit"
                    variant="outline"
                    size="lg"
                    icon={<Send className="w-5 h-5" />}
                    onClick={() => { sendMethod.current = 'email' }}
                  >
                    Envoyer par Email
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <SectionHeading
            eyebrow="Réseaux sociaux"
            title="Suivez-nous sur les réseaux sociaux"
            className="mb-12"
          />

          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              {
                name: 'Facebook',
                icon: SiFacebook,
                url: 'https://www.facebook.com/Ferme-Ecole-SAIN-108352284147580/',
                color: 'hover:bg-[#1877F2]',
              },
              {
                name: 'YouTube',
                icon: SiYoutube,
                url: 'https://www.youtube.com/channel/UCN982W_xV7nRHt6aW1mAIwA',
                color: 'hover:bg-[#FF0000]',
              },
              {
                name: 'Instagram',
                icon: SiInstagram,
                url: 'https://www.instagram.com/fermeecolesain/',
                color: 'hover:bg-[#E4405F]',
              },
            ].map((social, i) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`group w-16 h-16 rounded-full bg-white shadow-card hover:shadow-card-hover flex items-center justify-center transition-[background-color,box-shadow] duration-200 ${social.color} cursor-pointer`}
                  whileHover={{ scale: 1.08, y: -3, transition: {duration: 0.16, ease: [0.23, 1, 0.32, 1] } }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <Icon className="w-7 h-7 text-ink-soft group-hover:text-white transition-colors duration-200" />
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Contact
