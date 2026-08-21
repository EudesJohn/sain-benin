import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ShoppingCart, Package, Calendar, Leaf, Wheat, PawPrint, Droplet } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/sainData'
import { useSectionPhotos } from '../hooks/useSectionPhotos'
import SectionPhotoStrip from '../components/SectionPhotoStrip'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTASection } from '../components/ui/CTASection'

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
const freshCategoryKey = (name: string) => `produit-fresh-${slugify(name)}`
const freshItemKey = (name: string) => `produit-fresh-item-${slugify(name)}`
const processedKey = (name: string) => `produit-processed-${slugify(name)}`

const Production = () => {
  const { t } = useTranslation()
  const { photos, freePhotos } = useSectionPhotos('production')
  return (
    <>
      <PageHero
        image={photos['hero']?.url || '/images/Jardin-Sain-1024x768.jpg'}
        eyebrow={t('production.eyebrow')}
        title={t('production.title')}
        subtitle={t('production.subtitle')}
      >
        <blockquote className="text-lg italic text-earth-100 border-l-2 border-sun-400 pl-4">
          {t('production.quote')}
        </blockquote>
      </PageHero>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('production.intro.eyebrow')}
            title={t('production.intro.title')}
            subtitle={t('production.intro.subtitle')}
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
                <h3 className="font-bold text-ink mb-2">{t('production.intro.crops')}</h3>
                <p className="text-sm text-ink-soft">{t('production.intro.cropsDescription')}</p>
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
                <h3 className="font-bold text-ink mb-2">{t('production.intro.livestock')}</h3>
                <p className="text-sm text-ink-soft">{t('production.intro.livestockDescription')}</p>
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
                <h3 className="font-bold text-ink mb-2">{t('production.intro.processing')}</h3>
                <p className="text-sm text-ink-soft">{t('production.intro.processingDescription')}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Products */}
      <section className="py-20 bg-earth-50">
        <div className="container mx-auto px-4 lg:px-6">
          <SectionHeading
            eyebrow={t('production.fresh.eyebrow')}
            title={t('production.fresh.title')}
            subtitle={t('production.fresh.subtitle')}
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
                  {category.items.map((item, j) => {
                    const itemName = typeof item === 'string' ? item : item.name
                    const categoryUrl = photos[freshCategoryKey(category.name)]?.url || ''
                    const itemUrl = photos[freshItemKey(itemName)]?.url || ''
                    return (
                      <ProductCard
                        key={j}
                        name={itemName}
                        image={itemUrl || categoryUrl || undefined}
                        category={category.name}
                        index={j}
                      />
                    )
                  })}
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
            eyebrow={t('production.processed.eyebrow')}
            title={t('production.processed.title')}
            subtitle={t('production.processed.subtitle')}
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
                      backgroundImage: (photos[processedKey(product.name)]?.url || product.image)
                        ? `url('${photos[processedKey(product.name)]?.url || `/images/${product.image}`}')`
                        : undefined,
                      backgroundColor: !(photos[processedKey(product.name)]?.url || product.image) ? '#EFE9DE' : undefined,
                    }}
                  >
                    {!(photos[processedKey(product.name)]?.url || product.image) && (
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
            eyebrow={t('production.services.eyebrow')}
            title={t('production.services.title')}
            subtitle={t('production.services.subtitle')}
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
              <h3 className="text-xl font-bold mb-3">{t('production.services.directSales')}</h3>
              <p className="text-earth-100 text-sm">
                {t('production.services.directSalesDescription')}
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
              <h3 className="text-xl font-bold mb-3">{t('production.services.monthlyBasket')}</h3>
              <p className="text-earth-100 text-sm">
                {t('production.services.monthlyBasketDescription')}
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
              <h3 className="text-xl font-bold mb-3">{t('production.services.monthlyEvent')}</h3>
              <p className="text-earth-100 text-sm">
                {t('production.services.monthlyEventDescription')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionPhotoStrip photos={freePhotos} />

      <CTASection
        title={t('production.ctaTitle')}
        subtitle={t('production.ctaText')}
        label={t('production.ctaLabel')}
      />
    </>
  )
}

export default Production
