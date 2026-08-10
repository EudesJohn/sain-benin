# ADR-011: SEO & Infrastructure (sitemap.xml, robots.txt)

## Status
Proposed

## Context
Le site SAIN est une SPA (client-rendered). Sans SSR, Google dépend de :
1. L'exécution JavaScript pour indexer le contenu
2. Des fichiers `sitemap.xml` et `robots.txt` pour découvrir les routes
3. Des balises meta tags statiques pour le référencement

## Décision
 générer dynamiquement `sitemap.xml` et `robots.txt` via un **script de build**, et optimiser manuellement les meta tags.

## Fichiers actuels

### `public/site.webmanifest` (existant)
```json
{
  "name": "SAIN - Ferme École Bio",
  "short_name": "SAIN",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#22c55e",
  "icons": [...]
}
```

### `public/robots.txt` (manquant — à créer)
```
User-agent: *
Allow: /
Disallow: /api/*

Sitemap: https://www.sain-modern.vercel.app/sitemap.xml
```

## Plan de migration SEO

### 1. Sitemap dynamique (build-time)

```ts
// scripts/generate-sitemap.ts
import { routes } from '../src/App'

const sitemap = routes.map(route => `
  <url>
    <loc>https://sain-modern.vercel.app${route.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`).join('')

// Écrire dans public/sitemap.xml pendant le build
```

### 2. Meta tags dynamiques (react-helmet-async)

```tsx
import { Helmet } from 'react-helmet-async'

const About = () => {
  return (
    <>
      <Helmet>
        <title>À Propos - SAIN | Ferme École Bio</title>
        <meta name="description" content="Découvrez l'histoire de SAIN, ferme-école d'agroécologie au Bénin..." />
        <meta property="og:title" content="À Propos - SAIN Ferme École" />
        <link rel="canonical" href="https://sain-modern.vercel.app/projet-global" />
      </Helmet>
      ...
    </>
  )
}
```

### 3. Structured Data (JSON-LD)

```tsx
<script type="application/ld+json">
{
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SAIN - Solidarités Agricoles Intégrées",
    "address": "Village Kakanitchoé, 12 km d'Adjohoun, Bénin",
    "telephone": "+229 62 44 47 44",
    "email": "sainbenin@yahoo.fr",
    "url": "https://sain-modern.vercel.app",
    "image": "https://sain-modern.vercel.app/images/sain1-150x150.jpg",
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-17:00"
  })
}
</script>
```

## Alternatives considérées

| Option | Avantages | Inconvénients | Décision |
|--------|-----------|---------------|----------|
| **Sitemap statique généré build-time (choisi)** | Simple, pas de backend, CDN compatible | Mise à jour manuelle des routes | ✅ Proposé |
| Sitemap dynamique (API route) | Toujours à jour | Nécessite backend/API | ❌ Rejeté (pour l'instant) |
| react-helmet-async | Meta tags dynamiques par route | Bundle +4kB | ✅ Recommandé |
| Next.js SEO | SSR/SSG natif, sitemap auto | Verrouillage Next.js | ❌ Rejeté (pour l'instant) |
| Astro + React | SSR partiel, SEO excellent | Migration complète | ❌ Rejeté (hors scope) |

## Scripts à ajouter (`package.json`)

```json
{
  "scripts": {
    "build": "tsc && vite build",
    "prebuild": "node scripts/generate-sitemap.ts",
    "seo:check": "node scripts/check-seo.ts"
  }
}
```

## Checklist SEO

| Item | Statut | Notes |
|------|--------|-------|
| ✅ Meta title/description | Partiel | Statique dans `index.html` |
| ✅ Open Graph tags | Partiel | Statiques, pas dynamiques |
| ❌ Sitemap généré | À faire | Script build-time |
| ❌ robots.txt | À créer | Simple fichier |
| ❌ Meta tags dynamiques | À faire | react-helmet-async |
| ❌ JSON-LD structured data | À faire | LocalBusiness schema |
| ❌ Alt text optimisé | Partiel | Présent mais non optimisé |
| ❌ Image optimization (srcset) | À faire | Voir ADR-009 |

## Conséquences
- **Positive** : Meilleure indexation, visibilité SEO améliorée
- **Negative** : Maintenance des meta tags manuelle, pas de SSR natif

## Related ADRs
- [[003-choix-technologie-vite8-react19]] — Pas de Next.js = SEO via static generation
- [[009-images-externes-vers-locales]] — Alt text et image optimization