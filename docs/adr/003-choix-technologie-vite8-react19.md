# ADR-003: Choix de la stack technologique (Vite 8 + React 19)

## Status
Accepted

## Context
Le site SAIN devait être reconstruit moderne, rapide et maintenable. Les technologies suivantes étaient candidates :
- Vite 8 (build tool moderne, Rust-based)
- React 19 (latest stable)
- Next.js 15 (alternative full-stack)

## Décision
Adopter **Vite 8 + React 19 + TypeScript** comme stack principale, sans framework full-stack (pas de Next.js).

## Code

```json
{
  "dependencies": {
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^6.30.4",
    "framer-motion": "^13.0.0",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "vite": "^8.2.0",
    "@vitejs/plugin-react": "^6.0.4",
    "typescript": "~6.0.2"
  }
}
```

## Alternatives considérées

| Option | Avantages | Inconvénients | Décision |
|--------|-----------|---------------|----------|
| **Vite 8 + React 19 (choisi)** | Build ultra-rapide (~2s), bundle optimisé, HMR instantané, simple | Pas de SSR natif, dépendance à React Router pour le routing | ✅ Accepté |
| Next.js 15 App Router | SSR/SSG natif, API routes, SEO optimisé, image optimization | Bundle plus lourd (~100 kB supplémentaires), build plus lent, complexité supplémentaire | ❌ Rejeté |
| Angular 19 | Solution complète, TypeScript natif | Bundle lourd, courbe d'apprentissage raide, écosystème large mais complexe | ❌ Rejeté |
| SvelteKit 5 | Bundle ultra-léger, performance excellente | Moins de flexibilité component, écosystème plus restreint | ❌ Rejeté |

## Arguments pour Vite 8 + React 19

1. **Performance de build** : Vite 8 compile en ~2 secondes vs ~15-30 secondes pour Next.js
2. **Simplicité** : Pas de configuration complexe de serveur, pas de API routes à gérer
3. **Bundle size** : Plus léger qu'un framework full-stack pour un site vitrine
4. **Écosystème mature** : React 19 + Framer Motion + Tailwind forme un ensemble bien éprouvé
5. **Migration facile** : Peut évoluer vers Next.js plus tard si besoin de SSR/SEO

## Arguments contre (limitations connues)

1. **Pas de SSR** : Le contenu est rendu côté client → SEO dépend des meta tags statiques
2. **Pas d'API routes** : Pas de backend intégré → formulaire contact limité à mailto
3. **Pas d'optimisation d'images native** : Next/Image non disponible → images non optimisées

## Conséquences
- **Positive** : Build ultra-rapide, bundle léger, maintenance simple
- **Negative** : SEO limité sans SSR, pas de backend natif, images non optimisées automatiquement

## Trade-offs
**Rapidité de développement et de build > SEO natif** pour un site vitrine. Si le trafic organique devient critique, migrer vers Next.js est une option future documentée.

## Related ADRs
- [[007-deploiement-vercel-static]] — Vercel héberge le build static
- [[009-gestion-images-externes]] — Gestion manuelle des images (workaround)