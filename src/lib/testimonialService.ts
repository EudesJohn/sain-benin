import { supabase, PHOTOS_BUCKET } from './supabase'
import { storagePathFromUrl } from './photoService'
import { logError } from './logger'

export interface Testimonial {
  id?: string
  name: string
  role: string
  role_en: string
  quote: string
  quote_en: string
  image_url: string
  position: number
}

const COLUMNS = 'id, name, role, role_en, quote, quote_en, image_url, position'

/** Récupère tous les témoignages triés par position */
export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('testimonials')
    .select(COLUMNS)
    .order('position', { ascending: true })
  if (error) {
    logError('Erreur fetchTestimonials:', error.message)
    return []
  }
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name ?? '',
    role: row.role ?? '',
    role_en: row.role_en ?? '',
    quote: row.quote ?? '',
    quote_en: row.quote_en ?? '',
    image_url: row.image_url ?? '',
    position: row.position ?? 0,
  }))
}

/** Crée ou met à jour un témoignage */
export async function upsertTestimonial(testimonial: Testimonial): Promise<boolean> {
  if (!supabase) return false

  const payload = {
    name: testimonial.name,
    role: testimonial.role,
    role_en: testimonial.role_en,
    quote: testimonial.quote,
    quote_en: testimonial.quote_en,
    image_url: testimonial.image_url,
    position: testimonial.position,
  }

  if (testimonial.id) {
    const { error } = await supabase
      .from('testimonials')
      .update(payload)
      .eq('id', testimonial.id)
    if (error) {
      logError('Erreur upsertTestimonial (update):', error.message)
      return false
    }
    return true
  }

  const { error } = await supabase.from('testimonials').insert(payload)
  if (error) {
    logError('Erreur upsertTestimonial (insert):', error.message)
    return false
  }
  return true
}

/** Supprime un témoignage et nettoie l'image du stockage */
export async function deleteTestimonial(id: string): Promise<boolean> {
  if (!supabase) return false
  // Récupérer l'image_url avant suppression
  const { data } = await supabase
    .from('testimonials')
    .select('image_url')
    .eq('id', id)
    .single()
  // Supprimer la ligne en base
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) {
    logError('Erreur deleteTestimonial:', error.message)
    return false
  }
  // Nettoyer l'image du stockage
  if (data?.image_url) {
    const storagePath = storagePathFromUrl(data.image_url)
    if (storagePath) {
      await supabase.storage.from(PHOTOS_BUCKET).remove([storagePath])
    }
  }
  return true
}

/** Enregistre le nouvel ordre des témoignages (requêtes parallèles) */
export async function reorderTestimonials(ordered: { id?: string; position: number }[]): Promise<boolean> {
  if (!supabase) return false
  const updates = ordered
    .map((t, i) => ({ id: t.id, position: i }))
    .filter((t) => t.id)
    .map((t) =>
      supabase
        .from('testimonials')
        .update({ position: t.position })
        .eq('id', t.id!)
    )
  const results = await Promise.all(updates)
  return results.every(({ error }) => !error)
}

/** Localise un témoignage selon la langue */
export function localizeTestimonial(t: Testimonial, lang: string): Testimonial {
  if (lang === 'en') {
    return {
      ...t,
      role: t.role_en || t.role,
      quote: t.quote_en || t.quote,
    }
  }
  return t
}

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024 // 5 Mo
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

/**
 * Téléverse l'image d'un témoignage dans le bucket « photos » et renvoie
 * l'URL publique, ou null en cas d'erreur.
 */
export async function uploadTestimonialImage(file: File): Promise<string | null> {
  if (!supabase) return null
  // Validation du type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    logError('Type de fichier non supporté:', file.type)
    return null
  }
  // Validation de la taille
  if (file.size > MAX_UPLOAD_SIZE) {
    logError('Fichier trop volumineux:', file.size, 'octets (max:', MAX_UPLOAD_SIZE, ')')
    return null
  }
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const path = `testimonials/${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from(PHOTOS_BUCKET).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  })
  if (error) {
    logError('Erreur uploadTestimonialImage:', error.message)
    return null
  }
  return supabase.storage.from(PHOTOS_BUCKET).getPublicUrl(path).data.publicUrl
}
