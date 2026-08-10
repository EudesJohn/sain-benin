# ADR-005: React Router v6 pour le routing client-side (SPA)

## Status
Accepted

## Context
Le site SAIN a 14 routes principales. Le routing peut être géré par plusieurs approches :
- React Router v6 (client-side routing)
- Next.js file-system routing
- Custom routing solution

## Décision
Utiliser **React Router DOM v6** avec `BrowserRouter` pour un routing client-side (SPA), avec les flags futurs de React Router v7 activés.

## Configuration (`src/main.tsx`)

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

## Routes définies (`src/App.tsx`)

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Page d'accueil |
| `/projet-global` | About | À propos / projet global |
| `/responsabilite-sociale` | SocialResponsibility | École, bourses, formations |
| `/activites-sain` | Activities | Activités agricoles |
| `/equipe-sain` | Team | Équipe SAIN |
| `/formations` | Formations | Formations professionnelles |
| `/hebergement-ferme` | Accommodation | Hébergement à la ferme |
| `/restaurant` | Restaurant | Restaurant bio |
| `/circuits-decouverte` | Circuits | Circuits découverte |
| `/production` | Production | Produits bio |
| `/nous-soutenir` | Support | Soutien / dons |
| `/galerie` | Gallery | Galerie photo |
| `/contact` | Contact | Formulaire de contact |
| `/mentions-legales` | LegalMentions | Mentions légales |

## Alternatives considérées

| Option | Avantages | Inconvénients | Décision |
|--------|-----------|---------------|----------|
| **React Router v6 (choisi)** | Mature, flexible, well-documented, no build step needed | Client-side only (no SSR) | ✅ Accepté |
| Next.js App Router | File-system routing, SSR/SSG, colocated layouts | Coupled to Next.js framework | ❌ Rejeté |
| TanStack Router | Type-safe, file-based routes | Less mature ecosystem | ❌ Rejeté |

## Avantages

1. **Simple** : Pas besoin de structure de fichiers spéciale
2. **Flexibilité** : Contrôle total sur les routes et les redirections
3. **Performance** : Bundle partagé optimisé avec code splitting Vite
4. **Futur-proof** : Flags v7 activés pour forward-compatibilité
5. **Migrations possibles** : Peut passer à Next.js sans changer la structure des routes

## Limitations

1. **Pas de SSR** : Googlebot doit exécuter le JS pour voir le contenu (SEO impact)
2. **Pas de pré-render** : Aucun HTML statique par route
3. **Bundle partagé** : Toutes les routes sont dans le même bundle initial

## Conséquences
- **Positive** : Routing simple, flexibilité totale, migrations possibles vers Next.js
- **Negative** : SEO limité par absence de SSR, nécessite solution alternative (sitemap.xml dynamique)

## Related ADRs
- [[003-choix-technologie-vite8-react19]] — Pas de Next.js = React Router nécessaire