import { Button } from './Button'
import { Reveal } from './Reveal'

interface CTASectionProps {
  title: string
  subtitle?: string
  label?: string
  to?: string
}

/**
 * CTASection — bande de conversion réutilisée en bas des pages :
 * fond dégradé, titre, appel à l'action. Une seule source de vérité
 * pour éviter les 6 variantes divergentes d'origine.
 */
export const CTASection = ({ title, subtitle, label = 'Contactez-nous', to = '/contact' }: CTASectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-leaf-600 via-leaf-700 to-earth-800 text-white">
      {/* Texture décorative */}
      <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-sun-300 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-20 text-center relative z-10">
        <Reveal>
          <h2 className="text-white mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-leaf-100 max-w-2xl mx-auto leading-relaxed mb-8">{subtitle}</p>}
          <Button to={to} variant="accent" size="lg">
            {label}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

export default CTASection