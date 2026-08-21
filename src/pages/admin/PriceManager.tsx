import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Reorder, useDragControls } from 'framer-motion'
import {
  Tag,
  Plus,
  Save,
  Trash2,
  Loader2,
  Check,
  GripVertical,
  Info,
  Globe,
} from 'lucide-react'
import {
  fetchSectionPrices,
  upsertPrice,
  deletePrice,
  reorderPrices,
  type Price,
} from '../../lib/priceService'
import { PRICE_SECTIONS, type PriceCategory } from '../../lib/sections'

/* ─────────────────────────────────────────────
   Ligne prix/tarif — champs éditables, réordonnable
────────────────────────────────────────────── */
interface PriceCardProps {
  sectionSlug: string
  price: Price
  index: number
  categories?: PriceCategory[]
  onChanged: () => void
}

const PriceCard = ({ sectionSlug, price, index, categories, onChanged }: PriceCardProps) => {
  const { t } = useTranslation()
  const dragControls = useDragControls()
  const [title, setTitle] = useState(price.title)
  const [titleEn, setTitleEn] = useState(price.title_en)
  const [subtitle, setSubtitle] = useState(price.subtitle)
  const [subtitleEn, setSubtitleEn] = useState(price.subtitle_en)
  const [priceValue, setPriceValue] = useState(price.price)
  const [priceEn, setPriceEn] = useState(price.price_en)
  const [duration, setDuration] = useState(price.duration)
  const [description, setDescription] = useState(price.description)
  const [descriptionEn, setDescriptionEn] = useState(price.description_en)
  const [details, setDetails] = useState(price.details)
  const [detailsEn, setDetailsEn] = useState(price.details_en)
  const [category, setCategory] = useState(price.category || categories?.[0]?.value || '')
  const [busy, setBusy] = useState<'save' | 'delete' | null>(null)
  const [saved, setSaved] = useState(false)
  const [showEn, setShowEn] = useState(false)

  const save = async () => {
    setBusy('save')
    const ok = await upsertPrice(sectionSlug, {
      ...price,
      title: title.trim(),
      title_en: titleEn.trim(),
      subtitle: subtitle.trim(),
      subtitle_en: subtitleEn.trim(),
      price: priceValue.trim(),
      price_en: priceEn.trim(),
      duration: duration.trim(),
      description: description.trim(),
      description_en: descriptionEn.trim(),
      details,
      details_en: detailsEn,
      category,
    })
    setBusy(null)
    if (ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
      onChanged()
    }
  }

  const remove = async () => {
    if (!price.id) return
    setBusy('delete')
    await deletePrice(price.id)
    setBusy(null)
    onChanged()
  }

  const inputClass =
    'w-full px-3 py-2 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200'

  return (
    <Reorder.Item value={price} dragListener={false} dragControls={dragControls} className="list-none">
      <div className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col sm:flex-row">
        {/* Poignée de glisser-déposer */}
        <button
          type="button"
          onPointerDown={(e) => dragControls.start(e)}
          aria-label="Réordonner cet article (glisser-déposer)"
          title="Glisser-déposer pour réordonner"
          className="touch-none flex items-center justify-center min-w-10 min-h-10 px-2 py-2 sm:py-0 text-earth-300 hover:text-ink cursor-grab active:cursor-grabbing transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2 rounded-lg"
        >
          <GripVertical className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Champs */}
        <div className="flex-1 min-w-0 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-earth-700">Article #{index + 1}</p>
            <div className="flex items-center gap-2">
              {price.key && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-leaf-50 text-leaf-700">
                  {t('admin.default')}
                </span>
              )}
              <button
                type="button"
                onClick={() => setShowEn(!showEn)}
                className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full transition-colors duration-200 cursor-pointer ${showEn ? 'bg-blue-100 text-blue-700' : 'bg-earth-100 text-earth-600 hover:bg-earth-200'}`}
                title={showEn ? 'Masquer les champs EN' : 'Afficher les champs EN'}
              >
                <Globe className="w-3 h-3" />
                EN
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label={t('admin.titleFr')}
              placeholder={t('admin.titleFr')}
              className={inputClass}
            />
            <input
              type="text"
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
              aria-label={t('admin.priceFr')}
              placeholder={t('admin.priceFr')}
              className={inputClass}
            />
          </div>

          {showEn && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                aria-label={t('admin.titleEn')}
                placeholder={t('admin.titleEn')}
                className={`${inputClass} border-blue-200`}
              />
              <input
                type="text"
                value={priceEn}
                onChange={(e) => setPriceEn(e.target.value)}
                aria-label={t('admin.priceEn')}
                placeholder={t('admin.priceEn')}
                className={`${inputClass} border-blue-200`}
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              aria-label="Sous-titre (optionnel)"
              placeholder="Sous-titre (ex. Marché d'Akpadanou)"
              className={inputClass}
            />
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              aria-label="Durée (optionnel)"
              placeholder="Durée (ex. 1-3 heures)"
              className={inputClass}
            />
          </div>

          {showEn && (
            <input
              type="text"
              value={subtitleEn}
              onChange={(e) => setSubtitleEn(e.target.value)}
              aria-label="Subtitle (EN, optional)"
              placeholder="Subtitle (EN, optional)"
              className={`${inputClass} border-blue-200`}
            />
          )}

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-label="Description (optionnel)"
            placeholder="Description (optionnel)"
            className={inputClass}
          />

          {showEn && (
            <input
              type="text"
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              aria-label="Description (EN, optional)"
              placeholder="Description (EN, optional)"
              className={`${inputClass} border-blue-200`}
            />
          )}

          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            aria-label="Détails — une puce par ligne (optionnel)"
            placeholder="Détails — une puce par ligne (optionnel)"
            rows={2}
            className={`${inputClass} resize-none`}
          />

          {showEn && (
            <textarea
              value={detailsEn}
              onChange={(e) => setDetailsEn(e.target.value)}
              aria-label="Details EN — one bullet per line (optional)"
              placeholder="Details EN — one bullet per line (optional)"
              rows={2}
              className={`${inputClass} resize-none border-blue-200`}
            />
          )}

          {categories && categories.length > 0 && (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Catégorie"
              className={inputClass}
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={save}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-leaf-600 hover:bg-leaf-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2"
            >
              {busy === 'save' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              ) : saved ? (
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Save className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              {busy === 'save' ? 'Enregistrement…' : saved ? 'Enregistré' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={remove}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-red-50 hover:bg-red-100 disabled:opacity-60 text-red-700 rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}

/* ─────────────────────────────────────────────
   Gestion des prix d'une section
────────────────────────────────────────────── */
interface PriceManagerProps {
  sectionSlug: string
}

const PriceManager = ({ sectionSlug }: PriceManagerProps) => {
  const { t } = useTranslation()
  const [prices, setPrices] = useState<Price[]>([])
  const [order, setOrder] = useState<Price[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)

  const config = PRICE_SECTIONS[sectionSlug]
  const categories = config?.categories

  const [newTitle, setNewTitle] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newCategory, setNewCategory] = useState(categories?.[0]?.value ?? '')
  const [error, setError] = useState<string | null>(null)
  const newTitleRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const fetched = await fetchSectionPrices(sectionSlug)
    setPrices(fetched)
    setOrder([...fetched].sort((a, b) => a.position - b.position))
    setLoading(false)
  }, [sectionSlug])

  useEffect(() => {
    load()
  }, [load])

  const handleReorder = (next: Price[]) => {
    const updated = next.map((p, i) => ({ ...p, position: i }))
    setOrder(updated)
    reorderPrices(updated).then((ok) => {
      if (!ok) load()
    })
  }

  const add = async () => {
    if (!newTitle.trim() || !newPrice.trim()) {
      setError(t('admin.priceRequired'))
      return
    }
    setError(null)
    setAdding(true)
    const maxPosition = prices.reduce((max, p) => Math.max(max, p.position), -1)
    const ok = await upsertPrice(sectionSlug, {
      key: null,
      category: categories ? newCategory : '',
      title: newTitle.trim(),
      title_en: '',
      subtitle: '',
      subtitle_en: '',
      description: '',
      description_en: '',
      price: newPrice.trim(),
      price_en: '',
      duration: '',
      details: '',
      details_en: '',
      position: maxPosition + 1,
    })
    setAdding(false)
    if (ok) {
      setNewTitle('')
      setNewPrice('')
      load()
    }
  }

  if (!config) {
    return (
      <div className="flex items-start gap-3 bg-white rounded-2xl shadow-card p-6 text-ink-soft">
        <Info className="w-5 h-5 text-sun-600 flex-shrink-0" aria-hidden="true" />
        <p className="text-sm">
          {t('admin.noPrices')}
        </p>
      </div>
    )
  }

  const inputClass =
    'px-3 py-2.5 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-ink flex items-center gap-2">
          <Tag className="w-6 h-6 text-sun-600" aria-hidden="true" />
          {t('admin.prices')}
        </h2>
        <p className="text-sm text-ink-soft">
          {config.label} — {t('admin.pricesDescription')}
        </p>
      </div>

      {/* Formulaire d'ajout */}
      <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col sm:flex-row gap-3">
        <input
          ref={newTitleRef}
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          aria-label={t('admin.newPriceTitle')}
          placeholder={t('admin.newPriceTitle')}
          className={`${inputClass} flex-1`}
        />
        <input
          type="text"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          aria-label={t('admin.newPriceValue')}
          placeholder={t('admin.newPriceValue')}
          className={`${inputClass} flex-1`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
        />
        {categories && categories.length > 0 && (
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            aria-label="Catégorie"
            className={`${inputClass} sm:w-48`}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        )}
        <button
          type="button"
          onClick={add}
          disabled={adding}
          className="inline-flex items-center gap-2 px-5 py-2.5 min-h-10 text-sm font-semibold bg-sun-600 hover:bg-earth-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2"
        >
          {adding ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <Plus className="w-4 h-4" aria-hidden="true" />
          )}
          {t('admin.addPrice')}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {/* Liste des prix */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-ink-soft">
          <Loader2 className="w-6 h-6 animate-spin mr-3" aria-hidden="true" />
          {t('common.loading')}
        </div>
      ) : order.length > 0 ? (
        <>
          <p className="text-sm text-ink-soft">
            {t('admin.dragReorder')}
          </p>
          <Reorder.Group
            axis="y"
            values={order}
            onReorder={handleReorder}
            className="space-y-4"
          >
            {order.map((price, index) => (
              <PriceCard
                key={price.id ?? `new-${index}`}
                sectionSlug={sectionSlug}
                price={price}
                index={index}
                categories={categories}
                onChanged={load}
              />
            ))}
          </Reorder.Group>
        </>
      ) : (
        <p className="text-sm text-ink-soft bg-white rounded-2xl shadow-card p-6">
          {t('admin.noPricesYet')}
        </p>
      )}
    </div>
  )
}

export default PriceManager
