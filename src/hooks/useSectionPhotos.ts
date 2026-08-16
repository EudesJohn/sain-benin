import { useEffect, useRef, useState } from 'react'
import { fetchSectionPhotos, type Photo } from '../lib/photoService'
import { defaultPhotos, defaultFreePhotos, type DefaultPhoto } from '../lib/defaultPhotos'
import { isSupabaseConfigured } from '../lib/supabase'

export interface SectionPhotos {
  /** Emplacements fixes : key → photo. La photo locale est affichée tant que la
   *  version Supabase n'est pas chargée (bascule sans flash). */
  photos: Record<string, Photo>
  /** Photos libres (galerie), triées par position */
  freePhotos: Photo[]
  /** true pendant le chargement depuis Supabase */
  loading: boolean
  /** Progression du préchargement des photos distantes : { ready, total } */
  preloadProgress: { ready: number; total: number }
  /** true quand toutes les photos distantes sont prêtes (ou s'il n'y en a aucune) */
  allReady: boolean
}

function toPhoto(defaultPhoto: DefaultPhoto, key: string | null, position: number): Photo {
  return { key, url: defaultPhoto.url, alt: defaultPhoto.alt, caption: defaultPhoto.caption ?? '', position }
}

const isRemoteUrl = (url: string) => /^https?:\/\//.test(url)

/**
 * Photos d'une section : charge depuis Supabase et affiche immédiatement les photos
 * locales par défaut, puis bascule en silence vers la version Supabase une fois que
 * l'image est chargée dans le cache du navigateur (aucune attente visible).
 * Si Supabase n'est pas configuré (ou en erreur), les défauts locaux sont utilisés.
 */
export function useSectionPhotos(sectionSlug: string): SectionPhotos {
  const [remote, setRemote] = useState<Photo[] | null>(null)
  // Démarre « en chargement » si Supabase est configuré (évite un flash de grille
  // avant l'apparition de l'écran de chargement de la galerie)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  // URLs distantes dont l'image est prête dans le cache du navigateur
  const [ready, setReady] = useState<Set<string>>(new Set())
  const dispatched = useRef<Set<string>>(new Set())

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

  // Préchauffe les photos distantes en arrière-plan. On ne marque « prêt » que
  // lorsque l'image est chargée : en cas d'erreur, on garde la photo locale.
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

  // Emplacements fixes : la photo Supabase remplace la locale dès qu'elle est prête
  const photos: Record<string, Photo> = {}
  for (const [key, def] of Object.entries(defaults)) {
    photos[key] = toPhoto(def, key, 0)
  }
  for (const row of remote ?? []) {
    if (!row.key) continue
    const def = defaults[row.key]
    const remoteReady = isRemoteUrl(row.url) ? ready.has(row.url) : true
    if (remoteReady || !def) photos[row.key] = row
  }

  // Photos libres : même principe, photo par photo
  let freePhotos: Photo[]
  const remoteFree = (remote ?? []).filter((p) => !p.key)
  if (remoteFree.length > 0) {
    freePhotos = remoteFree.map((row, i) => {
      const def = defaultFreePhotos[sectionSlug]?.[i]
      const remoteReady = isRemoteUrl(row.url) ? ready.has(row.url) : true
      return remoteReady || !def ? row : toPhoto(def, null, i)
    })
  } else {
    freePhotos = (defaultFreePhotos[sectionSlug] ?? []).map((def, i) => toPhoto(def, null, i))
  }

  // Progression du préchargement (photos distantes uniquement)
  const remoteUrls = (remote ?? []).map((r) => r.url).filter(isRemoteUrl)
  const total = remoteUrls.length
  const readyCount = remoteUrls.filter((u) => ready.has(u)).length
  const allReady = !remote || total === 0 || readyCount === total

  return { photos, freePhotos, loading, preloadProgress: { ready: readyCount, total }, allReady }
}
