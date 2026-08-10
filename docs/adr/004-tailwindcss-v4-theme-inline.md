# ADR-004: Adoption de Tailwind CSS v4 avec @theme inline

## Status
Accepted

## Context
Le site SAIN utilise un système de couleurs terreuses (sun, earth, leaf, sky, bark, ink) avec des nuances (50-900). Tailwind CSS v3 supporte la configuration via `tailwind.config.js`, mais Tailwind CSS v4 change radicalement la configuration.

## Décision
Utiliser **Tailwind CSS v4** avec `@theme inline` block dans `src/styles/index.css`, abandonnant complètement `tailwind.config.js`.

## Configuration actuelle

### `src/styles/index.css`

```css
@import "tailwindcss";

@theme inline {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Cormorant Garamond', serif;
  --font-mono: 'Inter Mono', monospace;

  /* Palette terreuse SAIN */
  --color-sun: #F59E1B;
  --color-earth: #A1622D;
  --color-leaf: #10B981;
  --color-sky: #0EA5E9;
  --color-bark: #F5F0E7;
  --color-ink: #1F2937;

  /* Nuances sun */
  --color-sun-50: #FFFBEB;
  --color-sun-100: #FEF3C7;
  --color-sun-200: #FDE68A;
  --color-sun-300: #FCD34D;
  --color-sun-400: #FBBF24;
  --color-sun-500: #F59E1B;
  --color-sun-600: #D97706;
  --color-sun-700: #B45309;
  --color-sun-800: #92400E;
  --color-sun-900: #78350F;

  /* Nuances earth */
  --color-earth-50: #FFFBED;
  --color-earth-100: #FEF5E8;
  --color-earth-200: #FEECC9;
  --color-earth-300: #FEDCA3;
  --color-earth-400: #FDC366;
  --color-earth-500: #A1622D;
}
```

## Alternatives considérées

| Option | Avantages | Inconvénients | Décision |
|--------|-----------|---------------|----------|
| **Tailwind v4 @theme inline (choisi)** | Pas de fichier de config, CSS native, thèmes dynamiques possibles, performances optimales | Moins connu, documentation en évolution | ✅ Accepté |
| Tailwind v3 + tailwind.config.js | Écosystème éprouvé, documentation complète | Configuration verbosely, moins flexible pour thèmes dynamiques | ❌ Rejeté |
| CSS Modules | Styles locaux, pas de dépendance externe | Pas de système de design tokens intégré, plus de boilerplate | ❌ Rejeté |
| Styled-components | Thèmes JS, dynamique | Bundle supplémentaire, runtime CSS | ❌ Rejeté |

## Avantages de la approche

1. **Pas de fichier de configuration** : Tout est dans le CSS, plus de `tailwind.config.js`
2. **Thèmes dynamiques** : Les CSS variables peuvent être modifiés via JS pour changer de thème
3. **Performance** : Tailwind v4 est compilé en Rust, plus rapide pour le purgeCSS
4. **Simplicité** : Toutes les définitions de couleurs sont centralisées dans un seul fichier
5. **Extensibilité** : Classes utilitaires personnalisées (`.seasonal-band`, `.text-display`, `.earth-divider`)

## Conséquences
- **Positive** : Configuration simplifiée, performances optimales, thèmes personnalisibles
- **Negative** : Migration nécessaire depuis Tailwind v3, équipe doit apprendre la nouvelle syntaxe

## Related ADRs
- [[008-palette-couleurs-terreuses]] — Palette couleur SAIN