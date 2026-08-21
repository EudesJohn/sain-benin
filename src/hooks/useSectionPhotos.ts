import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchSectionPhotos, type Photo } from '../lib/photoService'
import { defaultPhotos, defaultFreePhotos, type DefaultPhoto } from '../lib/defaultPhotos'
import { isSupabaseConfigured } from '../lib/supabase'

export interface SectionPhotos {
  /** Emplacements fixes : key -> photo. La photo locale est affichee tant que la version Supabase n'est pas chargee. */
  photos: Record<string, Photo>
  /** Photos libres (galerie), triees par position */
  freePhotos: Photo[]
  /** true pendant le chargement depuis Supabase */
  loading: boolean
  /** Progression du prechargement des photos distantes */
  preloadProgress: { ready: number; total: number }
  /** true quand toutes les photos distantes sont pretes */
  allReady: boolean
}

function toPhoto(defaultPhoto: DefaultPhoto, key: string | null, position: number): Photo {
  return {
    key,
    url: defaultPhoto.url,
    alt: defaultPhoto.alt,
    caption: defaultPhoto.caption ?? '',
    alt_en: defaultPhoto.alt_en ?? defaultPhoto.alt ?? '',
    caption_en: defaultPhoto.caption_en ?? defaultPhoto.caption ?? '',
    position,
  }
}

const isRemoteUrl = (url: string) => /^https?:\/\//.test(url)

/**
 * Renvoie le texte dans la bonne langue.
 * Si la langue est 'en' et qu'une version EN existe, on l'utilise.
 * Sinon on fallback sur la version FR.
 */
function localize(photo: Photo, lang: string): Photo {
  if (lang === 'en') {
    return {
      ...photo,
      alt: photo.alt_en || photo.alt,
      caption: photo.caption_en || photo.caption,
    }
  }
  return photo
}

/**
 * Photos d'une section : charge depuis Supabase et affiche immediatement les photos
 * locales par defaut, puis bascule en silence vers la version Supabase une fois que
 * l'image est chargee dans le cache du navigateur (aucune attente visible).
 * Les textes (alt, caption) sont adaptees a la langue courante.
 */
export function useSectionPhotos(sectionSlug: string): SectionPhotos {
  const [remote, setRemote] = useState<Photo[] | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [ready, setReady] = useState<Set<string>>(new Set())
  const dispatched = useRef<Set<string>>(new Set())
  const { i18n } = useTranslation()
  const lang = i18n.language?.split('-')[0] || 'fr'

  useEffect(() => {
    let cancelled = false
    dispatched.current = new Set()
    setReady(new Set())
    if (!isSupabaseConfigured) {
      setRemote(null)
      setLoading(false)
      return
    }
    setLoading(true)
    fetchSectionPhotos(sectionSlug)
      .then((rows) => {
        if (!cancelled) setRemote(rows)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [sectionSlug])

  useEffect(() => {
    if (!remote) return
    for (const row of remote) {
      if (!isRemoteUrl(row.url) || ready.has(row.url) || dispatched.current.has(row.url)) continue
      dispatched.current.add(row.url)
      const img = new Image()
      img.onload = () => setReady((prev) => new Set(prev).add(row.url))
      img.src = row.url
    }
  }, [remote, ready])

  const defaults = defaultPhotos[sectionSlug] ?? {}

  // Emplacements fixes : la photo Supabase remplace la locale des qu'elle est prete
  const photosRaw: Record<string, Photo> = {}
  for (const [key, def] of Object.entries(defaults)) {
    photosRaw[key] = toPhoto(def, key, 0)
  }
  for (const row of remote ?? []) {
    if (!row.key) continue
    const def = defaults[row.key]
    const remoteReady = isRemoteUrl(row.url) ? ready.has(row.url) : true
    if (remoteReady || !def) photosRaw[row.key] = row
  }

  // Appliquer la localisation aux textes
  const photos: Record<string, Photo> = {}
  for (const [key, photo] of Object.entries(photosRaw)) {
    photos[key] = localize(photo, lang)
  }

  // Photos libres : meme principe
  const freePhotosRaw: Photo[] = []
  const remoteFree = (remote ?? []).filter((p) => !p.key)
  if (remoteFree.length > 0) {
    remoteFree.forEach((row, i) => {
      const def = defaultFreePhotos[sectionSlug]?.[i]
      const remoteReady = isRemoteUrl(row.url) ? ready.has(row.url) : true
      freePhotosRaw.push(remoteReady || !def ? row : toPhoto(def, null, i))
    })
  } else {
    ;(defaultFreePhotos[sectionSlug] ?? []).forEach((def, i) => {
      freePhotosRaw.push(toPhoto(def, null, i))
    })
  }

  const freePhotos = freePhotosRaw.map((p) => localize(p, lang))

  // Progression du prechargement
  const remoteUrls = (remote ?? []).map((r) => r.url).filter(isRemoteUrl)
  const total = remoteUrls.length
  const readyCount = remoteUrls.filter((u) => ready.has(u)).length
  const allReady = !remote || total === 0 || readyCount === total

  return { photos, freePhotos, loading, preloadProgress: { ready: readyCount, total }, allReady }
}
