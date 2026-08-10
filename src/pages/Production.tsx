import { motion } from 'framer-motion'
import { ShoppingCart, Package, Calendar, Leaf, Wheat, PawPrint, Droplet } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/sainData'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTASection } from '../components/ui/CTASection'

const Production = () => {
  return (
    <>
      <PageHero
        image="/images/Papaye-Sain-150x150.jpg"
        eyebrow="Nos produits"
        title="Nos Produits"
        subtitle="Des produits frais et transformés cultivés avec amour"
      >
        <blockquote className="text-lg italic text-earth-100 border-l-2 border-sun-400 pl-4">
          Production équilibrée entre trois secteurs : plantes, animaux et agro-transformation
        </blockquote>
      </PageHero>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Notre production"
            title="Production Agricole Durable"
            subtitle="Notre ferme pratique une agriculture 100% biologique avec des techniques respectueuses de l'environnement."
            className="mb-16"
          />

          <div className="max-w-4xl mx-auto bg-earth-50 rounded-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-leaf-600/10 flex items-center justify-center">
                  <Wheat className="w-8 h-8 text-leaf-700" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-ink mb-2">Cultures</h3>
                <p className="text-sm text-ink-soft">Fruits, légumes et céréales</p>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-xl shadow-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-sun-600/10 flex items-center justify-center">
                  <PawPrint className="w-8 h-8 text-sun-700" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-ink mb-2">Élevage</h3>
                <p className="text-sm text-ink-soft">Rabbit, poules, poissons</p>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-xl shadow-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-earth-500/10 flex items-center justify-center">
                  <Droplet className="w-8 h-8 text-earth-700" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-ink mb-2">Transformation</h3>
                <p className="text-sm text-ink-soft">Jus, huiles, confitures</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Products */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="De la ferme au panier"
            title="Produits Frais"
            subtitle="Des produits de saison, cultivés avec soin"
            className="mb-16"
          />

          <div className="max-w-6xl mx-auto">
            {products.fresh.items.map((category, i) => (
              <motion.div
                key={i}
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-ink mb-6">{category.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {category.items.map((item, j) => (
                    <ProductCard
                      key={j}
                      name={item}
                      image={category.image}
                      category={category.name}
                      index={j}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Processed Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow="Valorisation sur place"
            title={products.processed.title}
            subtitle="Nos produits transformés avec les ingrédients de notre ferme"
            className="mb-16"
          />

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.processed.items.map((product, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl shadow-card overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className="h-48 bg-cover bg-center relative"
                    style={{
                      backgroundImage: product.image ? `url('/images/${product.image}')` : undefined,
                      backgroundColor: !product.image ? '#EFE9DE' : undefined,
                    }}
                  >
                    {!product.image && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package className="w-12 h-12 text-earth-400" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-ink mb-2">{product.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gradient-to-br from-leaf-600 to-earth-700 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            onDark
            eyebrow="Nos services"
            title="Services de Distribution"
            subtitle="Plusieurs façons de commander nos produits frais"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-sun-200" />
              <h3 className="text-xl font-bold mb-3">Vente Directe</h3>
              <p className="text-earth-100 text-sm">
                Achetez nos produits directement sur la ferme
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Calendar className="w-12 h-12 mx-auto mb-4 text-sun-200" />
              <h3 className="text-xl font-bold mb-3">Panier Mensuel</h3>
              <p className="text-earth-100 text-sm">
                Abonnement mensuel de livraison de produits frais
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Leaf className="w-12 h-12 mx-auto mb-4 text-sun-200" />
              <h3 className="text-xl font-bold mb-3">Événement Mensuel</h3>
              <p className="text-earth-100 text-sm">
                Barbecue mensuel avec nos viandes d'élevage
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        title="Commandez nos produits"
        subtitle="Contactez-nous pour passer votre commande ou découvrir notre gamme complète de produits agricoles."
        label="Commander maintenant"
      />
    </>
  )
}

export default Production
