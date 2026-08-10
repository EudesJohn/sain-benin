# ADR-002: Vue d'ensemble de l'architecture cible

## Status
Accepted

## Context

Le site SAIN moderne a été reconstruit à partir de zéro avec une architecture SPA (Single Page Application) utilisant React 19 et Vite 8. Le site original était un site WordPress hébergé sur www.sain-benin.org. L'objectif est de fournir une expérience utilisateur moderne, des temps de chargement réduits et une meilleure maintenabilité.

## Architecture actuelle

```mermaid
graph TD
    Client["Client (Navigateur)"] --> CDN["CDN Vercel (Static Assets)"]
    CDN --> ViteBuild["Build Vite 8<br/>React 19 + TypeScript<br/>Tailwind CSS v4"]
    CDN --> StaticFiles["Fichiers statiques<br/>HTML/CSS/JS/Images"]

    subgraph "Runtime Client"
        ReactRuntime["React 19 DOM"]
        BrowserRouter["React Router v6<br/>(14 routes SPA)"]
        FramerMotion["Framer Motion<br/>(animations)"]
        TailwindCSS["Tailwind CSS v4<br/>(@theme inline)"]
    end

    subgraph "Sources de données"
        SainData["src/data/sainData.ts<br/>(données structurées)"]
        PublicImages["public/images/<br/>101 images locales"]
        ExternalWP["Images WordPress<br/>externes (fallback)"]
    end

    ReactRuntime -->|import| SainData
    ReactRuntime -->|import| StaticFiles
    ReactRuntime -->|import| ExternalWP
    BrowserRouter -->|navigate| Routes["14 Routes SPA"]
</arg_value

## Décisions clés

| Décision | ADR | Statut |
|---------|-----|--------|
| React 19 avec Vite 8 | ADR-003 | Accepté |
| Tailwind CSS v4 (sans config file) | ADR-004 | Accepté |
| React Router v6 (SPA) | ADR-005 | Accepté |
| Framer Motion pour animations | ADR-006 | Accepté |
| Déploiement Vercel (static) | ADR-007 | Accepté |
| Palette de couleurs terreuses | ADR-008 | Accepté |
| Images statiques externes | ADR-009 | Accepté (temporaire) |
| Contact par email (mailto) | ADR-010 | Accepté (temporaire) |

## Structure du projet

```
sain-modern/
├── public/
│   ├── images/              # 101 images téléchargées depuis WordPress
│   ├── favicon.svg
│   └── site.webmanifest     # PWA manifest
├── src/
│   ├── assets/              # Logo SAIN (PNG)
│   ├── components/          # 10 composants réutilisables
│   │   ├── Navbar.tsx       # Navigation responsive + dropdowns
│   │   ├── Footer.tsx       # Footer avec réseaux sociaux
│   │   ├── HeroSection.tsx  # Section héro avec animations
│   │   ├── BackToTop.tsx    # Bouton scroll-top
│   │   ├── TestimonialCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── TourismCard.tsx
│   │   ├── ProductCard.tsx
│   │   ├── TeamMember.tsx
│   │   └── SocialMediaBar.tsx
│   ├── pages/               # 14 pages (routes)
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── SocialResponsibility.tsx
│   │   ├── Activities.tsx
│   │   ├── Team.tsx
│   │   ├── Formations.tsx
│   │   ├── Accommodation.tsx
│   │   ├── Restaurant.tsx
│   │   ├── Circuits.tsx
│   │   ├── Production.tsx
│   │   ├── Support.tsx
│   │   ├── Gallery.tsx
│   │   ├── Contact.tsx
│   │   └── LegalMentions.tsx
│   ├── data/                # Données métier
│   │   └── sainData.ts
│   ├── styles/              # Styles globaux
│   │   └── index.css
│   ├── main.tsx             # Point d'entrée (BrowserRouter)
│   └── App.tsx              # Routes + layout
├── vite.config.ts
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── vercel.json              # Configuration déploiement
```

## Caractéristiques techniques actuelles

| Aspect | Détails |
|--------|---------|
| **Build time** | ~2 secondes (Vite 8 + Turbo/Rust) |
| **Taille bundle JS** | 477 kB |
| **Taille CSS** | 45.13 kB |
| **Images** | 101 images locales + URLs WordPress externes |
| **Routes** | 14 routes client-side |
| **Typographie** | Cormorant Garamond (display), Inter (body), Inter Mono (utility) |
| **Palette** | sun, earth, leaf, sky, bark, ink (14 teintes) |
| **Responsive** | Mobile-first, breakpoints sm/md/lg/xl |
| **Animations** | Framer Motion (viewport triggers, hover, tap) |
| **SEO** | Meta tags statiques dans index.html (pas de SSR) |
| **PWA** | site.webmanifest présent (pas de service worker) |

## Conséquences positives
- Temps de build extrêmement rapide
- Bundle JS/JSX optimisé
- Architecture simple et compréhensible
- Maintenance aisée avec données centralisées
- Animations fluides avec Framer Motion

## Conséquences négatives (à surveiller)
- Pas de SSR → SEO limité (dépendant aux meta tags statiques)
- Pas de service worker → pas de PWA offline
- Images externes (WordPress) → dépendance externe risquée
- Formulaire contact par mailto → pas de fonctionnalité backend
- Pas de tests unitaires/automatisés

## Related ADRs
- [[003-choix-technologique-vite8-react19]]
- [[007-deploiement-vercel-static]]
- [[009-gestion-images-externes]]