import { supabase, PHOTOS_BUCKET } from './supabase'

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
    console.error('Erreur fetchTestimonials:', error.message)
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
      console.error('Erreur upsertTestimonial (update):', error.message)
      return false
    }
    return true
  }

  const { error } = await supabase.from('testimonials').insert(payload)
  if (error) {
    console.error('Erreur upsertTestimonial (insert):', error.message)
    return false
  }
  return true
}

/** Supprime un témoignage */
export async function deleteTestimonial(id: string): Promise<boolean> {
  if (!supabase) return false
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) {
    console.error('Erreur deleteTestimonial:', error.message)
    return false
  }
  return true
}

/** Enregistre le nouvel ordre des témoignages */
export async function reorderTestimonials(ordered: { id?: string; position: number }[]): Promise<boolean> {
  if (!supabase) return false
  let ok = true
  for (let i = 0; i < ordered.length; i++) {
    const t = ordered[i]
    if (!t.id) continue
    const { error } = await supabase
      .from('testimonials')
      .update({ position: i })
      .eq('id', t.id)
    if (error) {
      console.error('Erreur reorderTestimonials:', error.message)
      ok = false
    }
  }
  return ok
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

/**
 * Téléverse l'image d'un témoignage dans le bucket « photos » et renvoie
 * l'URL publique, ou null en cas d'erreur.
 */
export async function uploadTestimonialImage(file: File): Promise<string | null> {
  if (!supabase) return null
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const path = `testimonials/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage.from(PHOTOS_BUCKET).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  })
  if (error) {
    console.error('Erreur uploadTestimonialImage:', error.message)
    return null
  }
  return supabase.storage.from(PHOTOS_BUCKET).getPublicUrl(path).data.publicUrl
}
