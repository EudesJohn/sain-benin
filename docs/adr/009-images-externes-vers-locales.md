# ADR-009: Migration des images WordPress vers stockage local

## Status
Proposed

## Context
Actuellement, le site utilise deux sources d'images :
1. **101 images téléchargées** dans `public/images/` (depuis WordPress)
2. **URLs WordPress externes** encore présentes dans certains composants (`Home.tsx`, `About.tsx`, `HeroSection.tsx`, `Gallery.tsx`, `Contact.tsx`)

Cela crée :
- Risque de blocage si WordPress devient inaccessible
- Dépendance externe instable
- Incohérence entre images locales et externes
- Pas d'optimisation locale (WebP, dimensions adaptées)

## Décision
Migrer **toutes les images** vers le stockage local `public/images/`, en utilisant les fichiers téléchargés pour remplacer les URLs WordPress externes.

## Analyse des usages actuels

### Fichiers utilisant des URLs WordPress externes

| Fichier | URLs externes | Recommandation |
|---------|--------------|----------------|
| `src/pages/Home.tsx` | 2 URLs | Remplacer par `public/images/*` |
| `src/pages/About.tsx` | 1 URL | Remplacer |
| `src/components/HeroSection.tsx` | 1 URL | Remplacer |
| `src/pages/Gallery.tsx` | 36 URLs | Remplacer toutes |
| `src/pages/Contact.tsx` | 1 URL | Remplacer |

## Plan de migration

### Phase 1 : Identifier les correspondances
```bash
# Lister les images locales disponibles
ls public/images/ | wc -l  # 101 images

# Identifier les noms dans le code source
grep -r "https://www.sain-benin.org/wp-content" src/
```

### Phase 2 : Correspondance nom → fichier
Exemple de mapping :
```
https://www.sain-benin.org/wp-content/uploads/2022/06/Hébergement-Sain-1-1024x768.jpg
→ /images/Hébergement-Sain-1-1024x768.jpg
```

### Phase 3 : Remplacement dans le code
Utiliser `sed` pour remplacer les patterns :
```bash
sed -i 's|https://www.sain-benin.org/wp-content/uploads/2022/06/|https://www.sain-benin.org/wp-content/uploads/2022/06/|g' src/**/*.tsx
```

## Alternatives considérées

| Option | Avantages | Inconvénients | Décision |
|--------|-----------|---------------|----------|
| **Migration complète locale (choisie)** | Contrôle total, plus de dépendance externe, optimisations possibles | Effort de migration (40 URLs à changer) | ✅ Proposé |
| CDN externe (Cloudinary, Imgix) | Optimisation automatique d'images, responsive | Coût, dépendance externe | ❌ Rejeté |
| Proxy image | Cache serveur, URLs WordPress restent | Complexité infra, coûts | ❌ Rejeté |

## Optimisations futures possibles

### Format WebP
```
public/images/
├── *.jpg → *.webp (conversion)
└── dimensions optimisées (300x300, 1024x768, etc.)
```

### Responsive images
```tsx
<img
  srcSet="/images/photo-150w.webp 150w,
          /images/photo-300w.webp 300w,
          /images/photo-1024w.webp 1024w"
  sizes="(max-width: 768px) 150px, (max-width: 1200px) 300px, 1024px"
  src="/images/photo-1024w.webp"
  alt="..."
/>
```

### Lazy loading
```tsx
<img loading="lazy" ... />
```

## Conséquences
- **Positive** : Élimine dépendance externe, améliore la performance, cache CDN optimisé
- **Negative** : Nécessite conversion de 101 images (format, dimensions), espace disque supplémentaire

## Related ADRs
- [[007-deploiement-vercel-static]] — Images locales pour cache immuable
- [[003-choix-technologie-vite8-react19]] — Vite gère bien les assets statiques