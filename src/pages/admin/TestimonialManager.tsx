import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Reorder, useDragControls } from 'framer-motion'
import {
  Quote,
  Plus,
  Save,
  Trash2,
  Loader2,
  Check,
  GripVertical,
} from 'lucide-react'
import {
  fetchTestimonials,
  upsertTestimonial,
  deleteTestimonial,
  reorderTestimonials,
  type Testimonial,
} from '../../lib/testimonialService'

/* ─────────────────────────────────────────────
   Carte d'un témoignage — éditable, réordonnable
────────────────────────────────────────────── */
interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
  onChanged: () => void
}

const TestimonialCard = ({ testimonial, index, onChanged }: TestimonialCardProps) => {
  const { t } = useTranslation()
  const dragControls = useDragControls()
  const [name, setName] = useState(testimonial.name)
  const [role, setRole] = useState(testimonial.role)
  const [roleEn, setRoleEn] = useState(testimonial.role_en)
  const [quote, setQuote] = useState(testimonial.quote)
  const [quoteEn, setQuoteEn] = useState(testimonial.quote_en)
  const [imageUrl, setImageUrl] = useState(testimonial.image_url)
  const [busy, setBusy] = useState<'save' | 'delete' | null>(null)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    setBusy('save')
    const ok = await upsertTestimonial({
      ...testimonial,
      name: name.trim(),
      role: role.trim(),
      role_en: roleEn.trim(),
      quote: quote.trim(),
      quote_en: quoteEn.trim(),
      image_url: imageUrl.trim(),
    })
    setBusy(null)
    if (ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
      onChanged()
    }
  }

  const remove = async () => {
    if (!testimonial.id) return
    setBusy('delete')
    await deleteTestimonial(testimonial.id)
    setBusy(null)
    onChanged()
  }

  const inputClass =
    'w-full px-3 py-2 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200'

  return (
    <Reorder.Item value={testimonial} dragListener={false} dragControls={dragControls} className="list-none">
      <div className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col sm:flex-row">
        {/* Poignée de glisser-déposer */}
        <button
          type="button"
          onPointerDown={(e) => dragControls.start(e)}
          aria-label="Réordonner ce témoignage"
          title="Glisser-déposer pour réordonner"
          className="touch-none flex items-center justify-center min-w-10 min-h-10 px-2 py-2 sm:py-0 text-earth-300 hover:text-ink cursor-grab active:cursor-grabbing transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2 rounded-lg"
        >
          <GripVertical className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Champs */}
        <div className="flex-1 min-w-0 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-earth-700">Témoignage #{index + 1}</p>
          </div>

          {/* Nom (identique dans les 2 langues) */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Nom du témoin"
            placeholder="Nom du témoin (identique FR/EN)"
            className={inputClass}
          />

          {/* Rôle FR / EN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              aria-label={t('admin.testimonialRoleFr')}
              placeholder={t('admin.testimonialRoleFr')}
              className={inputClass}
            />
            <input
              type="text"
              value={roleEn}
              onChange={(e) => setRoleEn(e.target.value)}
              aria-label={t('admin.testimonialRoleEn')}
              placeholder={t('admin.testimonialRoleEn')}
              className={`${inputClass} border-blue-200`}
            />
          </div>

          {/* Citation FR / EN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              aria-label={t('admin.testimonialQuoteFr')}
              placeholder={t('admin.testimonialQuoteFr')}
              rows={3}
              className={`${inputClass} resize-none`}
            />
            <textarea
              value={quoteEn}
              onChange={(e) => setQuoteEn(e.target.value)}
              aria-label={t('admin.testimonialQuoteEn')}
              placeholder={t('admin.testimonialQuoteEn')}
              rows={3}
              className={`${inputClass} resize-none border-blue-200`}
            />
          </div>

          {/* URL image */}
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            aria-label="URL de la photo"
            placeholder="URL de la photo (ex. /images/...)"
            className={inputClass}
          />

          {/* Actions */}
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
   Gestionnaire de témoignages
────────────────────────────────────────────── */
const TestimonialManager = () => {
  const { t } = useTranslation()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [order, setOrder] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)

  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState('')
  const [newQuote, setNewQuote] = useState('')
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const fetched = await fetchTestimonials()
    setTestimonials(fetched)
    setOrder([...fetched].sort((a, b) => a.position - b.position))
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleReorder = (next: Testimonial[]) => {
    const updated = next.map((t, i) => ({ ...t, position: i }))
    setOrder(updated)
    reorderTestimonials(updated).then((ok) => {
      if (!ok) load()
    })
  }

  const add = async () => {
    if (!newName.trim() || !newQuote.trim()) {
      setError(t('admin.testimonialRequired'))
      return
    }
    setError(null)
    setAdding(true)
    const maxPosition = testimonials.reduce((max, t) => Math.max(max, t.position), -1)
    const ok = await upsertTestimonial({
      name: newName.trim(),
      role: newRole.trim(),
      role_en: '',
      quote: newQuote.trim(),
      quote_en: '',
      image_url: '',
      position: maxPosition + 1,
    })
    setAdding(false)
    if (ok) {
      setNewName('')
      setNewRole('')
      setNewQuote('')
      load()
    }
  }

  const inputClass =
    'px-3 py-2.5 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-ink flex items-center gap-2">
          <Quote className="w-6 h-6 text-sun-600" aria-hidden="true" />
          {t('admin.testimonials')}
        </h2>
        <p className="text-sm text-ink-soft">
          {t('admin.testimonialsDescription')}
        </p>
      </div>

      {/* Formulaire d'ajout */}
      <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            aria-label="Nom du témoin"
            placeholder="Nom du témoin"
            className={`${inputClass} flex-1`}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                add()
              }
            }}
          />
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            aria-label="Rôle (FR)"
            placeholder="Rôle (FR, ex. Ancien élève)"
            className={`${inputClass} flex-1`}
          />
        </div>
        <input
          type="text"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          aria-label="Citation (FR)"
          placeholder="Citation du témoin (FR)"
          className={inputClass}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
        />
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
          {t('admin.addTestimonial')}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {/* Indicateur bilingual */}
      <div className="flex items-center gap-2 text-sm text-blue-600">
        <span className="font-medium">ℹ️</span>
        <span>{t('admin.bilingualHint')}</span>
      </div>

      {/* Liste des témoignages */}
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
            {order.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id ?? `new-${index}`}
                testimonial={testimonial}
                index={index}
                onChanged={load}
              />
            ))}
          </Reorder.Group>
        </>
      ) : (
        <p className="text-sm text-ink-soft bg-white rounded-2xl shadow-card p-6">
          {t('admin.noTestimonials')}
        </p>
      )}
    </div>
  )
}

export default TestimonialManager
