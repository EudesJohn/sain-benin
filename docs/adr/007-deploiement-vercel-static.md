# ADR-007: Déploiement statique sur Vercel

## Status
Accepted

## Context
Le site SAIN est un site vitrine (SPA). Le déploiement doit :
- Être simple à configurer
- Fournir un CDN mondial
- Supportér le preview mode pour le CI/CD
- Optimiser la mise en cache
- Fournir HTTPS automatique

## Décision
Déployer sur **Vercel** avec un build statique (`@vercel/static-build`).

## Configuration (`vercel.json`)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      },
      "continue": true
    },
    {
      "src": "/(.*)",
      "status": 200,
      "dest": "/"
    }
  ],
  "cleanOutputs": true
}
```

## Features Vercel

```
📦 Static Build
   ├── dist/
   │   ├── index.html
   │   ├── assets/[hash].js
   │   └── assets/[hash].css
   └── CDN global Vercel
       ├── Cache-Control: 1 an (immutable)
       └── HTTPS automatique
```

## Alternatives considérées

| Option | Avantages | Inconvénients | Décision |
|--------|-----------|---------------|----------|
| **Vercel (choisi)** | CDN optimal, preview URLs, config simple, HTTPS auto | Vercel-specific (lock-in) | ✅ Accepté |
| Netlify | Équivalent fonctionnel | Écosystème différent | ❌ Rejeté |
| GitHub Pages | Gratuit, simple | Pas de CDN optimal, config manuelle | ❌ Rejeté |
| Cloudflare Pages | CDN solide | Configuration plus complexe | ❌ Rejeté |
| Host manuel (NGINX) | Contrôle total | Maintenance, coûts infrastructure | ❌ Rejeté |

## Mise en cache
- **Assets JS/CSS/Images** : 1 an (`max-age=31536000, immutable`)
- **HTML** : Non caché (SPA routing)
- **Images** : Non caché (chargement lazy)

## CI/CD Flow

```
git push → Vercel Build → Preview URL → Production (si main branch) → CDN
```

## Script de déploiement (`package.json`)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "deploy": "npm run build && vercel --prod"
  }
}
```

## Conséquences
- **Positive** : Déploiement simple, CDN mondial, preview mode pour tests
- **Negative** : Lock-in Vercel, pas de fonctions serveur (sans Vercel Functions)

## Related ADRs
- [[003-choix-technologie-vite8-react19]] — Build statique Vite compatible Vercel
- [[009-gestion-images-externes]] — Images locales requises pour cache optimal