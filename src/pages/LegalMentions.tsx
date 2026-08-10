import { motion } from 'framer-motion'
import { sainData } from '../data/sainData'
import { PageHero } from '../components/ui/PageHero'

const LegalMentions = () => {
  return (
    <>
      <PageHero
        image="/images/Recherche-Sain-1024x767.jpg"
        eyebrow="Informations légales"
        title="Mentions Légales"
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
              <h2 className="text-2xl font-display font-bold text-ink mb-4">1. Éditeur du Site</h2>
              <div className="space-y-2 text-ink-soft">
                <p><strong>SAIN Bénin</strong></p>
                <p>S.A.R.L enregistrée au Registre du Commerce et du Crédit Mobilier RCCM: RB/PNO/21 3196</p>
                <p>N° d'Identification Fiscale Unique (IFU): 3 2021 12 62 37 34</p>
                <p>Directeur de Publication: Pascal Gbenou</p>
                <p>Email: <a href="mailto:sainbenin@yahoo.fr" className="text-sun-600">sainbenin@yahoo.fr</a></p>
                <p>Site web: <a href="https://www.sain-benin.org" className="text-sun-600">www.sain-benin.org</a></p>
              </div>
            </div>

            {/* Address */}
            <div>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">2. Adresse</h2>
              <div className="space-y-2 text-ink-soft">
                <p>Maison GBENOU, Kakanitchoé, Kodé, Adjohoun à 04 Km de la voie Porto-Novo – Bohicon</p>
                <p>BP: 21 ADJHOUN, BÉNIN (West Africa)</p>
              </div>
            </div>

            {/* Hosting */}
            <div>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">3. Hébergement</h2>
              <div className="text-ink-soft">
                <p>STARTLOGIC'S – Jacksonville, FL 32256 – U.S.A.</p>
                <p>Site web: <a href="http://www.startlogic.com" className="text-sun-600">www.startlogic.com</a></p>
              </div>
            </div>

            {/* Development */}
            <div>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">4. Création du Site</h2>
              <div className="text-ink-soft">
                <p>Bawete – Orée d'Anjou – France</p>
                <p>Site web: <a href="https://bawete.fr" className="text-sun-600">www.bawete.fr</a></p>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">5. Cookies</h2>
              <p className="text-ink-soft">
                Ce site utilise des cookies pour des raisons statistiques et d'affichage.
                En poursuivant votre navigation sur ce site, vous en acceptez l'utilisation.
                Vous pouvez paramétrer vos choix via votre navigateur.
              </p>
            </div>

            {/* External Links */}
            <div>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">6. Liens Hypertextes</h2>
              <p className="text-ink-soft">
                Le présent site peut contenir des liens hypertextes vers d'autres sites
                internet. SAIN ne peut être tenu responsable du contenu de ces sites
                externes. Toute création de lien vers ce site nécessite une autorisation
                préalable.
              </p>
            </div>

            {/* Data Protection */}
            <div>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">7. Données Personnelles</h2>
              <p className="text-ink-soft mb-4">
                Conformément à la loi "Informatique et Libertés" (Loi 78-17), vous disposez
                d'un droit d'accès, de rectification et d'opposition sur les données personnelles
                que vous communquez via le formulaire de contact.
              </p>
              <p className="text-ink-soft">
                Les données collectées ne sont jamais cédées à des tiers. Elles sont
                conservées pour une durée maximale de 3 ans. Pour exercer vos droits,
                contactez-nous à : sainbenin@yahoo.fr
              </p>
            </div>

            {/* Legal disclaimer */}
            <div className="pt-8 border-t border-earth-200">
              <p className="text-sm text-ink-faint">
                Création Bawete © Juin 2022 - Dernière mise à jour : {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default LegalMentions
