# ADR-006: Framer Motion v13 pour les animations

## Status
Accepted

## Context
Le site SAIN nécessite des animations fluides pour :
- Entrées/sorties d'éléments (hero, sections)
- Interactionshover/click
- Transitions de Page
- Scrolldéclenchées

## Décision
Utiliser **Framer Motion v13** comme bibliothèque d'animation, en complément de GSAP pour certaines animations plus complexes.

## Pattern utilisé (viewport-triggered animations)

```tsx
<motion.div
  className="text-center mb-16"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <h2>...</h2>
</motion.div>
```

## Patterns d'animation déployés

| Type | Composant | Usage |
|------|-----------|-------|
| `initial` + `whileInView` | Toutes les sections | Apparition progressive au scroll |
| `whileHover` | Buttons, cards, nav items | Feedback visuel au survol |
| `whileTap` | Buttons, social links | Feedback tactile au clic |
| `AnimatePresence` | BackToTop, Mobile Menu, Modal | Gestion des entrées/sorties |
| `staggerChildren` | Menu mobile, Footer | Animations en cascade |
| `layoutId` | Navbar indicator | Transitions fluides entre états |

## Alternatives considérées

| Option | Avantages | Inconvénients | Décision |
|--------|-----------|---------------|----------|
| **Framer Motion v13 (choisi)** | API React-native, animations fluides, TypeScript, bien documenté | Bundle additionnel (~40kB) | ✅ Accepté |
| GSAP v3.15 | Le plus puissant pour animations complexes | API JS, moins React-native | ❌ Accepté comme complément |
| CSS Animations natives | Pas de bundle, performances | Moins de contrôle, complexes pour interactions dynamiques | ❌ Rejeté |
| AOS (Animate On Scroll) | Simple, léger | Moins de flexibilité, maintenance incertaine | ❌ Rejeté |

## Conséquences
- **Positive** : Animations cohérentes, API React-native, maintenance aisée
- **Negative** : Bundle +40kB, dépendance supplémentaire

## Related ADRs
- [[003-choix-technologie-vite8-react19]] — Intégré à la stack React