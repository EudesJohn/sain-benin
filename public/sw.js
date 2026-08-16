/* Service worker — cache navigateur des photos Supabase.
   Les photos téléchargées une fois sont enregistrées dans le navigateur
   (Cache API) : les visites suivantes les affichent instantanément, sans
   re-téléchargement complet. Stratégie : cache-first + mise à jour en
   arrière-plan (stale-while-revalidate). */

const CACHE_NAME = 'sain-photos-v1'
const STORAGE_PHOTOS = /^https:\/\/[^/]+\.supabase\.co\/storage\/v1\/object\/public\/photos\//

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (event.request.method !== 'GET' || !STORAGE_PHOTOS.test(url.href)) return

  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Récupère et met le cache à jour en arrière-plan (même si le cache répond)
      const network = fetch(event.request)
        .then((response) => {
          if (response && (response.ok || response.type === 'opaque')) {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
          }
          return response
        })
        .catch(() => cached) // réseau indisponible → on renvoie le cache s'il existe
      return cached || network
    }),
  )
})
