# Architecture Decision Records (ADRs) — Site SAIN Moderne

Ce répertoire contient les **Architecture Decision Records (ADRs)** du site SAIN moderne.

## Qu'est-ce qu'un ADR ?

Un ADR (Architecture Decision Record) est un document qui capture une décision d'architecture importante, ses motivations, et ses conséquences. Ces documents aident l'équipe à se rappeler **pourquoi** certaines décisions ont été prises, et à évaluer si celles-ci sont toujours valides.

## Liste des ADRs

| # | ADR | Statut | Thème |
|----|----|--------|-------|
| 002 | [Vue d'ensemble architecture](002-vue-densemble-architecture.md) | ✅ Accepté | Architecture globale |
| 003 | [Choix technologie (Vite 8 + React 19)](003-choix-technologie-vite8-react19.md) | ✅ Accepté | Stack technique |
| 004 | [Tailwind CSS v4 @theme inline](004-tailwindcss-v4-theme-inline.md) | ✅ Accepté | Styling |
| 005 | [React Router v6 SPA](005-react-router-v6-spa.md) | ✅ Accepté | Routing |
| 006 | [Framer Motion animations](006-framer-motion-animations.md) | ✅ Accepté | Animations |
| 007 | [Déploiement Vercel static](007-deploiement-vercel-static.md) | ✅ Accepté | Infrastructure |
| 008 | [Palette couleurs terreuses](008-palette-couleurs-terreuses.md) | ✅ Accepté | Design system |
| 009 | [Images → stockage local](009-images-externes-vers-locales.md) | 📝 Proposé | Performance |
| 010 | [Formulaire contact mailto → backend](010-formulaire-contact.md) | 📝 Proposé | Fonctionnalités |
| 011 | [SEO sitemap/robots/meta](011-seo-sitemap-robots.md) | 📝 Proposé | SEO |

## Légende des statuts

| Statut | Description |
|--------|-------------|
| ✅ **Accepted** | Décision validée et implémentée |
| 📝 **Proposed** | Décision proposée, à implémenter |
| ⏳ **Superseded** | Décision remplacée par une autre |
| ❌ **Rejected** | Décision rejetée |

## Template

Utilisez le [template ADR (001)](001-adr-template.md) comme point de départ pour créer un nouvel ADR.

## Priorités actuelles

| Priorité | Action | ADR lié |
|----------|--------|---------|
| 🔴 Haute | Migrer toutes les images vers stockage local | 009 |
| 🟡 Moyenne | Ajouter react-helmet-async pour meta tags dynamiques | 011 |
| 🟡 Moyenne | Générer sitemap.xml + robots.txt au build | 011 |
| 🟢 Basse | Migrer formulaire contact vers solution backend | 010 |

## Diagramme d'architecture (actuel)

```mermaid
graph TD
    User["Client (Navigateur)"] --> Vercel["CDN Vercel (Static)"]

    subgraph Build
        Vite["Vite 8 (Build)"]
        React["React 19 + TypeScript"]
        Tailwind["Tailwind CSS v4"]
        Framer["Framer Motion"]
    end

    subgraph Deploy
        CDN["CDN Global Vercel"]
        Cache["Cache 1 an (immutable)"]
        HTTPS["HTTPS Auto"]
        SPA["SPA Client-rendered"]
        Routes["14 Routes React Router"]
    end

    subgraph Assets
        Images["public/images/<br/>101 images locales"]
        WP["WordPress URLs<br/>externes (fallback)"]
        Data["src/data/sainData.ts"]
    end

    User -->|HTTPS| CDN --> SPA
    CDN --> Routes
    CDN --> Cache
    SPA -->|import| Images
    SPA -->|fallback| WP
    SPA --> Data

    Build --> Vite
    Vite --> React
    Vite --> Tailwind
    Vite --> Framer
    Build --> Deploy
