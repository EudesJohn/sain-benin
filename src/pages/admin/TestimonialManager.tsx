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
  Camera,
} from 'lucide-react'
import {
  fetchTestimonials,
  upsertTestimonial,
  deleteTestimonial,
  reorderTestimonials,
  uploadTestimonialImage,
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

// Classe CSS partagée pour les champs de saisie
const INPUT_CLASS =
  'w-full px-3 py-2 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200'

const TestimonialCard = ({ testimonial, index, onChanged }: TestimonialCardProps) => {
  const { t } = useTranslation()
  const dragControls = useDragControls()
  const [name, setName] = useState(testimonial.name)
  const [role, setRole] = useState(testimonial.role)
  const [roleEn, setRoleEn] = useState(testimonial.role_en)
  const [quote, setQuote] = useState(testimonial.quote)
  const [quoteEn, setQuoteEn] = useState(testimonial.quote_en)
  const [imageUrl, setImageUrl] = useState(testimonial.image_url)
  const [busy, setBusy] = useState<'save' | 'delete' | 'upload' | null>(null)
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy('upload')
    const url = await uploadTestimonialImage(file)
    if (url) setImageUrl(url)
    setBusy(null)
    e.target.value = ''
  }

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
            placeholder="Nom du témoin (identique FR/EN)"              className={INPUT_CLASS}
          />

          {/* Rôle FR / EN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              aria-label={t('admin.testimonialRoleFr')}
              placeholder={t('admin.testimonialRoleFr')}
              className={INPUT_CLASS}
            />
            <input
              type="text"
              value={roleEn}
              onChange={(e) => setRoleEn(e.target.value)}
              aria-label={t('admin.testimonialRoleEn')}
              placeholder={t('admin.testimonialRoleEn')}
              className={`${INPUT_CLASS} border-blue-200`}
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
              className={`${INPUT_CLASS} resize-none`}
            />
            <textarea
              value={quoteEn}
              onChange={(e) => setQuoteEn(e.target.value)}
              aria-label={t('admin.testimonialQuoteEn')}
              placeholder={t('admin.testimonialQuoteEn')}
              rows={3}
              className={`${INPUT_CLASS} resize-none border-blue-200`}
            />
          </div>

          {/* Photo */}
          <div className="flex items-center gap-3">
            {imageUrl ? (
              <img src={imageUrl} alt="Aperçu" className="w-16 h-16 rounded-lg object-cover border" />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-earth-100 flex items-center justify-center">
                <Camera className="w-6 h-6 text-earth-300" aria-hidden="true" />
              </div>
            )}
            <div className="flex-1">
              <label className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-earth-100 hover:bg-earth-200 text-earth-700 rounded-lg cursor-pointer transition-colors duration-200">
                <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                {imageUrl ? 'Changer la photo' : 'Choisir une photo'}
                <input type="file" accept="image/*" onChange={handleUpload} className="sr-only" />
              </label>
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="ml-2 text-xs text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={save}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-leaf-600 hover:bg-leaf-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2"
            >
              {busy === 'save' || busy === 'upload' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              ) : saved ? (
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Save className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              {busy === 'save' ? 'Enregistrement…' : busy === 'upload' ? 'Envoi…' : saved ? 'Enregistré' : 'Enregistrer'}
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
  const [newRoleEn, setNewRoleEn] = useState('')
  const [newQuote, setNewQuote] = useState('')
  const [newQuoteEn, setNewQuoteEn] = useState('')
  const [newImageUrl, setNewImageUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

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
      role_en: newRoleEn.trim(),
      quote: newQuote.trim(),
      quote_en: newQuoteEn.trim(),
      image_url: newImageUrl.trim(),
      position: maxPosition + 1,
    })
    setAdding(false)
    if (ok) {
      setNewName('')
      setNewRole('')
      setNewRoleEn('')
      setNewQuote('')
      setNewQuoteEn('')
      setNewImageUrl('')
      load()
    }
  }

  const handleNewUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const url = await uploadTestimonialImage(file)
    if (url) setNewImageUrl(url)
    setUploading(false)
    e.target.value = ''
  }

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
        {/* Nom + Photo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            aria-label="Nom du témoin"
            placeholder="Nom du témoin"              className={`${INPUT_CLASS} flex-1`}
          />
          <div className="flex items-center gap-2">
            {newImageUrl ? (
              <img src={newImageUrl} alt="Aperçu" className="w-10 h-10 rounded-lg object-cover border" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-earth-100 flex items-center justify-center">
                <Camera className="w-4 h-4 text-earth-300" aria-hidden="true" />
              </div>
            )}
            <label className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-earth-100 hover:bg-earth-200 text-earth-700 rounded-lg cursor-pointer transition-colors duration-200">
              <Camera className="w-3.5 h-3.5" aria-hidden="true" />
              {uploading ? 'Envoi…' : newImageUrl ? 'Changer' : 'Photo'}
              <input type="file" accept="image/*" onChange={handleNewUpload} className="sr-only" disabled={uploading} />
            </label>
            {newImageUrl && (
              <button type="button" onClick={() => setNewImageUrl('')} className="text-xs text-red-500 hover:text-red-700">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Rôle FR / EN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            aria-label="Rôle (FR)"
            placeholder="Rôle FR (ex. Ancien élève)"              className={INPUT_CLASS}
          />
          <input
            type="text"
            value={newRoleEn}
            onChange={(e) => setNewRoleEn(e.target.value)}
            aria-label="Rôle (EN)"
            placeholder="Rôle EN (ex. Former student)"              className={`${INPUT_CLASS} border-blue-200`}
          />
        </div>

        {/* Citation FR / EN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <textarea
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            aria-label="Citation (FR)"
            placeholder="Citation du témoin (FR)"
            rows={3}              className={`${INPUT_CLASS} resize-none`}
          />
          <textarea
            value={newQuoteEn}
            onChange={(e) => setNewQuoteEn(e.target.value)}
            aria-label="Citation (EN)"
            placeholder="Citation du témoin (EN)"
            rows={3}              className={`${INPUT_CLASS} resize-none border-blue-200`}
          />
        </div>

        <button
          type="button"
          onClick={add}
          disabled={adding || uploading}
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
                key={`${testimonial.id}-${testimonial.position}`}
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
