import { supabase, PHOTOS_BUCKET } from './supabase'

export interface Photo {
  id?: string
  /** Emplacement fixe dans la section, ou null pour une photo libre (galerie) */
  key: string | null
  url: string
  alt: string
  caption: string
  alt_en: string
  caption_en: string
  position: number
}

const PHOTO_COLUMNS = 'id, section_id, key, url, alt, caption, alt_en, caption_en, position'

function toPhoto(row: {
  id: string
  key: string | null
  url: string
  alt: string
  caption: string
  alt_en: string
  caption_en: string
  position: number
}): Photo {
  return {
    id: row.id,
    key: row.key,
    url: row.url,
    alt: row.alt ?? '',
    caption: row.caption ?? '',
    alt_en: row.alt_en ?? '',
    caption_en: row.caption_en ?? '',
    position: row.position ?? 0,
  }
}

/** Photos d'une section (emplacements fixes + photos libres) */
export async function fetchSectionPhotos(sectionSlug: string): Promise<Photo[]> {
  if (!supabase) return []
  const sectionId = await getSectionId(sectionSlug)
  if (!sectionId) return []
  const { data, error } = await supabase
    .from('photos')
    .select(PHOTO_COLUMNS)
    .eq('section_id', sectionId)
    .order('position', { ascending: true })
  if (error) {
    console.error('Erreur fetchSectionPhotos:', error.message)
    return []
  }
  return (data ?? []).map(toPhoto)
}

/** Id de la section depuis son slug */
export async function getSectionId(sectionSlug: string): Promise<string | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('sections')
    .select('id')
    .eq('slug', sectionSlug)
    .maybeSingle()
  if (error || !data) {
    console.error('Erreur getSectionId:', error?.message)
    return null
  }
  return data.id
}

/** Crée ou met à jour une photo (par section + key, ou nouvelle photo libre) */
export async function upsertPhoto(sectionSlug: string, photo: Photo): Promise<boolean> {
  if (!supabase) return false
  const sectionId = await getSectionId(sectionSlug)
  if (!sectionId) return false

  const payload = {
    section_id: sectionId,
    key: photo.key,
    url: photo.url,
    alt: photo.alt,
    caption: photo.caption,
    alt_en: photo.alt_en,
    caption_en: photo.caption_en,
    position: photo.position,
  }

  if (photo.id) {
    const { error } = await supabase.from('photos').update(payload).eq('id', photo.id)
    if (error) console.error('Erreur upsertPhoto (update):', error.message)
    return !error
  }

  if (photo.key) {
    // Emplacement fixe : mettre à jour s'il existe déjà, sinon insérer
    const { data: existing } = await supabase
      .from('photos')
      .select('id')
      .eq('section_id', sectionId)
      .eq('key', photo.key)
      .maybeSingle()
    if (existing) {
      const { error } = await supabase.from('photos').update(payload).eq('id', existing.id)
      if (error) console.error('Erreur upsertPhoto (update par key):', error.message)
      return !error
    }
  }

  const { error } = await supabase.from('photos').insert(payload)
  if (error) console.error('Erreur upsertPhoto (insert):', error.message)
  return !error
}

/** Supprime une photo (et son objet de stockage si c'en est un) */
export async function deletePhoto(photo: Photo): Promise<boolean> {
  if (!supabase) return false
  if (photo.id) {
    const { error } = await supabase.from('photos').delete().eq('id', photo.id)
    if (error) {
      console.error('Erreur deletePhoto:', error.message)
      return false
    }
  }
  // Nettoie l'objet stocké si l'URL pointe vers notre bucket
  const storagePath = storagePathFromUrl(photo.url)
  if (storagePath) {
    await supabase.storage.from(PHOTOS_BUCKET).remove([storagePath])
  }
  return true
}

/**
 * Enregistre le nouvel ordre des photos (photos libres) en mettant à jour
 * la position de chacune dans la base.
 */
export async function reorderPhotos(orderedPhotos: Photo[]): Promise<boolean> {
  if (!supabase) return false
  const updates = orderedPhotos
    .map((photo, i) => ({ id: photo.id, position: i }))
    .filter((p) => p.id)
    .map((p) =>
      supabase
        .from('photos')
        .update({ position: p.position })
        .eq('id', p.id!)
    )
  const results = await Promise.all(updates)
  return results.every(({ error }) => !error)
}

/** Renvoie le chemin dans le bucket depuis une URL publique, ou null */
export function storagePathFromUrl(url: string): string | null {
  if (!url || !supabase) return null
  const prefix = `${supabase.storage.from(PHOTOS_BUCKET).getPublicUrl('').data.publicUrl}`
  if (!url.startsWith(prefix)) return null
  return url.slice(prefix.length)
}

/**
 * Téléverse un fichier image dans le bucket « photos » et renvoie son URL publique,
 * ou null en cas d'erreur.
 */
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024 // 5 Mo
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function uploadImage(file: File, sectionSlug: string): Promise<string | null> {
  if (!supabase) return null
  // Validation du type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    console.error('Type de fichier non supporté:', file.type)
    return null
  }
  // Validation de la taille
  if (file.size > MAX_UPLOAD_SIZE) {
    console.error('Fichier trop volumineux:', file.size, 'octets (max:', MAX_UPLOAD_SIZE, ')')
    return null
  }
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const path = `${sectionSlug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage.from(PHOTOS_BUCKET).upload(path, file, {
    // Les noms de fichiers sont uniques (timestamp) : cache long sans risque
    cacheControl: '31536000',
    upsert: false,
  })
  if (error) {
    console.error('Erreur uploadImage:', error.message)
    return null
  }
  return supabase.storage.from(PHOTOS_BUCKET).getPublicUrl(path).data.publicUrl
}
