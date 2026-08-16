import { supabase } from './supabase'

/** Préchauffe des images dans le cache du navigateur (sans les afficher) */
export function preloadImages(urls: string[]): void {
  for (const url of urls) {
    if (!url || !/^https?:\/\//.test(url)) continue
    const img = new Image()
    img.src = url
  }
}

/**
 * Préchauffe en arrière-plan les photos « phare » (bannières de page + aperçus
 * d'accueil) de toutes les sections : une seule requête, puis préchargement des
 * images. Ainsi, la navigation d'une page à l'autre ne fait attendre personne.
 */
export async function preloadHeroPhotos(): Promise<void> {
  if (!supabase) return
  const heroKeys = new Set(['hero', 'apropos', 'apercu-1', 'apercu-2', 'apercu-3'])
  const { data, error } = await supabase
    .from('photos')
    .select('key, url')
    .not('key', 'is', null)
  if (error || !data) return
  const urls = data
    .filter((p) => p.key && heroKeys.has(p.key))
    .map((p) => p.url)
    .filter(Boolean)
  preloadImages([...new Set(urls)])
}
