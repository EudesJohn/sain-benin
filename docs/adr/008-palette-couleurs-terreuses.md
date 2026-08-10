# ADR-008: Palette de couleurs terreuses SAIN

## Status
Accepted

## Context
Le site SAIN (Solidarités Agricoles Intégrées) nécessite une palette de couleurs qui reflète :
- L'agroécologie (terre, végétation)
- La ferme (champs, récoltes)
- La nature (soleil, ciel)
- La solidarité (chaleur, accueil)

## Décision
Adopter une palette **terreuse personnalisée** inspirée de la campagne béninoise, avec 6 familles de couleurs principales.

## Palette définitive

| Famille | Couleur principale | Usage principal | Exemples |
|---------|-------------------|-----------------|----------|
| **sun** | `#F59E1B` (amber-500) | CTA, highlights, icônes | `.bg-sun-600`, `.text-sun-600` |
| **earth** | `#A1622D` (amber-700) | Backgrounds, textes secondaires | `.bg-earth-900`, `.text-earth-700` |
| **leaf** | `#10B981` (emerald-500) | Nature, croissance, écologie | `.bg-leaf-500`, `.text-leaf-600` |
| **sky** | `#0EA5E9` (sky-500) | Ciel, confiance, sérénité | `.text-sky-500` |
| **bark** | `#F5F0E7` (beige clair) | Background général | `bg-bark-50` |
| **ink** | `#1F2937` (gray-800) | Texte principal, contrastes | `.text-ink`, `.bg-ink/60` |

## Nuances définies (Tailwind CSS v4)

```css
/* Sun shades */
--color-sun-50:  #FFFBEB  /* très clair */
--color-sun-100: #FEF3C7
--color-sun-200: #FDE68A
--color-sun-300: #FCD34D
--color-sun-400: #FBBF24
--color-sun-500: #F59E1B  /* amber standard */
--color-sun-600: #D97706  /* CTA principal */
--color-sun-700: #B45309
--color-sun-800: #92400E
--color-sun-900: #78350F

/* Earth shades */
--color-earth-50:  #FFFBED
--color-earth-100: #FEF5E8
--color-earth-200: #FEECC9
--color-earth-300: #FEDCA3
--color-earth-400: #FDC366
--color-earth-500: #A1622D  /* terre profonde */
```

## Schéma de couleur appliqué

| Élément | Couleurs utilisées | Justification |
|---------|-------------------|---------------|
| **Navbar** | `earth-800/900` | Terre profonde, contraste avec contenu |
| **Footer** | `earth-900→950 gradient` | Profondeur, sérieux |
| **CTA buttons** | `sun-600→earth-700 hover` | Chaleur, appel à l'action |
| **Hero** | `sun-300`, `leaf-300` | Vitalité, nature |
| **Témoignages** | `earth-900` | Confiance, authenticité |
| **Accents** | `sun-500/600` | Highlights visuels |
| **Texte** | `ink`, `gray-700/800` | Lisibilité maximale |

## Alternatives considérées

| Option | Avantages | Inconvénients | Décision |
|--------|-----------|---------------|----------|
| **Palette terreuse SAIN (choisie)** | Cohérence thématique forte avec agriculture | Nécessite définition manuelle des nuances | ✅ Accepté |
| Palette Material Design standard | Standardisé, out-of-box | Trop générique, pas lié au contexte | ❌ Rejeté |
| Couleurs de marque WordPress originales | Cohérence avec ancien site | Pas d'identité visuelle forte | ❌ Rejeté |
| Couleurs saisonnières dynamiques | Original, engageant | Complexité technique, risque UX | ❌ Rejeté (pour plus tard) |

## Implementation (Tailwind CSS v4 @theme)

```css
@theme inline {
  /* Palette terreuse SAIN */
  --color-sun: #F59E1B;
  --color-earth: #A1622D;
  --color-leaf: #10B981;
  --color-sky: #0EA5E9;
  --color-bark: #F5F0E7;
  --color-ink: #1F2937;
}
```

## Conséquences
- **Positive** : Cohérence visuelle forte, identité distinctive, thème agricole évident
- **Negative** : Maintenance des nuances manuelle, potentiellement moins accessible que palettes standardisées

## Related ADRs
- [[004-tailwindcss-v4-theme-inline]] — Configuration @theme