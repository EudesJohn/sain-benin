# Feuille de route — Améliorations d'évolutivité et de maintenabilité

## Priorités par phase

### Phase 1 : Correctif critique (À faire immédiatement)

| # | Action | Effort | Impact | Urgence |
|---|--------|--------|--------|---------|
| 1 | **Migrer toutes les images WordPress → local** | Moyen | Élevé | 🔴 Critique |
| 2 | **`react-helmet-async` pour meta tags dynamiques** | Moyen | Élevé | 🔴 Critique |
| 3 | **Générer sitemap.xml + robots.txt** | Faible | Élevé | 🔴 Critique |
| 4 | **Valider le manifest web (JSON format)** | Faible | Moyen | 🟡 Moyenne |

#### Actions concrètes

```bash
# 1. Identifier URLs WordPress externes
grep -r "https://www.sain-benin.org/wp-content" src/

# 2. Générer robots.txt
echo 'User-agent: *
Allow: /
Sitemap: https://sain-modern.vercel.app/sitemap.xml' > public/robots.txt

# 3. Script sitemap (build-time)
node scripts/generate-sitemap.ts
```

### Phase 2 : Améliorations UX (2-4 semaines)

| Action | Effort | Impact |
|--------|--------|--------|
| Form validation côté client (Zod) | Moyen | Haute |
| Toast notifications (success/error) | Faible | Moyen |
| Formspree ou solution email temporaire | Faible | Haute |
| Image optimization (srcset + WebP) | Élevé | Élevé |

### Phase 3 : Performance (1-2 mois)

| Action | Effort | Impact |
|--------|--------|--------|
| Convertir images JPG → WebP | Moyen | Élevé |
| Lazy loading images (IntersectionObserver) | Moyen | Élevé |
| Code splitting granular (React.lazy) | Moyen | Moyen |
| Compression image + responsive sizes | Élevé | Élevé |

### Phase 4 : Backend & fonctionnalités (2-3 mois)

| Action | Effort | Impact |
|--------|--------|--------|
| Intégrer Vercel Functions pour contact | Élevé | Élevé |
| Anti-spam (honey pot + rate limiting) | Moyen | Haute |
| Archivage messages (SQLite ou KV) | Moyen | Moyen |

### Phase 5 : Migration Next.js (6 mois)

| Action | Effort | Impact |
|--------|--------|--------|
| Migrer React Router → Next.js App Router | Élevé | Très élevé |
| Implémenter SSG/SSR pour SEO | Élevé | Très élevé |
| Next/Image optimization | Moyen | Élevé |

## Tests & monitoring

```bash
# Script de vérification
npm run test:build  # vérifie taille bundle
npm run test:lighthouse  # score SEO/performance
npm run test:seo  # valide meta tags, sitemap
```

## Résumé

Le site SAIN a une architecture solide mais présente des lacunes critiques en SEO et performance liées aux images externes. La priorité absolue est de migrer les images localement et d'ajouter un sitemap dynamique.