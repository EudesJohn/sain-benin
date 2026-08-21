# SAIN — Ferme École Bio • Site Web Moderne

Site web bilingue (FR/EN) pour **SAIN** (Solidarités Agricoles Intégrées), une ferme-école en agroécologie au Bénin.

## 🔥 Technologies

- **Vite** — Build ultra-rapide
- **React 19** — Framework UI
- **TypeScript** — Typage statique
- **Tailwind CSS** — Design système
- **Framer Motion** — Animations fluides
- **GSAP** — Animations avancées
- **React Router v6** — Navigation
- **i18next** — Internationalisation bilingue (FR/EN)
- **Supabase** — Base de données, stockage, authentification

## ✨ Fonctionnalités

- **Bilingue** : Le site affiche en français par défaut, avec un switcher pour basculer en anglais
- **Design moderne** : Interface épurée et élégante
- **Animations avancées** : Transitions fluides et micro-interactions
- **Responsive** : Compatible mobile, tablette et desktop
- **Performance** : Optimisation au chargement et au rendu
- **SEO optimisé** : Meta tags et métadonnées complètes
- **Accessibilité** : Navigation clavier et contraste adéquat
- **Zone admin** : Gestion complète du contenu sans toucher au code

## 📊 Pages du Site

| Page | Route | Description |
|------|-------|-------------|
| Accueil | `/` | Présentation générale avec carousel, témoignages et services |
| À propos | `/projet-global` | Histoire, mission et philosophie |
| RSE | `/responsabilite-sociale` | Initiatives sociales et éducatives |
| Activités | `/activites-sain` | Production, formation, recherche |
| Équipe | `/equipe-sain` | Profils détaillés des équipes |
| Formations | `/formations` | Programmes de formation |
| Hébergement | `/hebergement-ferme` | Tarifs et équipements |
| Restaurant | `/restaurant` | Menus et concept |
| Circuits | `/circuits-decouverte` | Tous les circuits touristiques |
| Production | `/production` | Produits frais et transformés |
| Soutien | `/nous-soutenir` | Programmes de parrainage |
| Galerie | `/galerie` | Galerie photo et vidéos YouTube |
| Contact | `/contact` | Formulaire et localisation |
| Mentions légales | `/mentions-legales` | Informations légales |

## 🛠️ Zone d'Administration

Accès : `/admin` (lien discret dans le pied de page)

L'admin permet de gérer **tout le contenu du site** sans toucher au code :

| Onglet | Fonctionnalité |
|--------|---------------|
| **📸 Photos & vidéos** | Ajouter, remplacer, supprimer les photos de chaque section. Gérer les vidéos YouTube. Légendes bilingues (FR/EN). |
| **💰 Prix & tarifs** | Gérer les tarifs d'hébergement (chambres, pension complète), circuits découverte et programmes de soutien. Champs bilingues. |
| **🍽️ Menus** | Gérer les catégories et plats du restaurant. Champs bilingues. |
| **📞 Contacts** | Modifier les numéros, email et réseaux sociaux. |
| **💬 Témoignages** | Ajouter, modifier, supprimer et réordonner les témoignages. Champs bilingues. |

### Sécurité

- Lecture publique pour tous
- Écriture réservée au compte admin (`sainbenin@yahoo.fr`)
- RLS (Row Level Security) activé sur toutes les tables

## 🌐 Système Bilingue (FR/EN)

Le site est entièrement bilingue grâce à **i18next** :

- **Interface** : Tous les textes de l'interface (navigation, boutons, labels) sont traduits dans `src/locales/fr.json` et `src/locales/en.json`
- **Contenu de la base** : Les colonnes `_en` contiennent les traductions anglaises du contenu (titres, descriptions, prix, légendes photos)
- **Noms propres** : Les noms de personnes, lieux, adresses et le nom **SAIN** restent identiques dans les deux langues
- **Admin** : L'interface admin est toujours en français (même avec un navigateur anglais)
- **Switcher** : Un bouton FR/EN dans la navigation permet de basculer la langue

### Données bilingues dans la base

| Table | Colonnes bilingues |
|-------|-------------------|
| `prices` | `title_en`, `subtitle_en`, `price_en`, `description_en`, `details_en` |
| `menu_categories` | `name_en` |
| `menu_items` | `name_en` |
| `photos` | `alt_en`, `caption_en` |
| `videos` | `title_en` |
| `testimonials` | `role_en`, `quote_en` |
| `contact_info` | — (les noms de contacts sont universels) |

## 🚀 Démarrage

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

### Configuration Supabase

1. Créez un projet sur [supabase.com](https://supabase.com)
2. Dans **SQL Editor**, exécutez les scripts dans l'ordre (voir section Scripts SQL ci-dessous)
3. Créez le compte admin : **Authentication → Users → Add user** (email : `sainbenin@yahoo.fr`)
4. Copiez `.env.example` vers `.env.local` et renseignez :
   ```
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=votre-clé-anon
   ```
5. Redémarrez `npm run dev`

> Sans Supabase configuré, le site fonctionne avec les photos locales par défaut.

## 📦 Scripts SQL (Supabase)

Exécutez ces scripts dans l'éditeur SQL de Supabase Dashboard, dans l'ordre :

| # | Script | Description |
|---|--------|-------------|
| 1 | `supabase/setup.sql` | **Setup initial** — Tables (sections, photos, videos, prices, menus), RLS, stockage, seed des photos et vidéos |
| 2 | `supabase/add-bilingual-prices-menus.sql` | **Colonnes bilingues** — Ajoute les colonnes `_en` pour les prix, menus et catégories |
| 3 | `supabase/add-contact-info.sql` | **Contacts** — Table `contact_info` avec les numéros, email et réseaux sociaux |
| 4 | `supabase/add-photo-bilingual.sql` | **Photos bilingues** — Ajoute les colonnes `alt_en` et `caption_en` aux photos |
| 5 | `supabase/add-testimonials.sql` | **Témoignages** — Table `testimonials` bilingue avec les 3 témoignages de seed |
| 6 | `supabase/fix-all-translations.sql` | **Traductions** — Met à jour tout le contenu EN avec les vraies traductions anglaises (noms propres, lieux et adresses conservés identiques) |
| 7 | `supabase/dedup-gallery.sql` | **Nettoyage** — Supprime les doublons éventuels dans la galerie |

### Scripts additionnels

| Script | Description |
|--------|-------------|
| `supabase/translate-to-french.sql` | Traduit le contenu EN existant en français (obsolète si `fix-all-translations.sql` est exécuté) |
| `supabase/fix-translations-en.sql` | Corrige les traductions anglaises (obsolète si `fix-all-translations.sql` est exécuté) |
| `supabase/MIGRATION_COMPLETE.sql` | Migration complète historique |

## 🎨 Personnalisation

Le thème couleur peut être modifié dans `tailwind.config.js` :
- **Primary** : Vert agricole
- **Secondary** : Violet vibrant
- **Earth** : Tons terre pour l'éco-tourisme

## 🚀 Déploiement

Le site est configuré pour un déploiement facile sur **Vercel** :

```bash
npm run build
vercel --prod
```

Variables d'environnement à configurer dans Vercel :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📁 Structure du Projet

```
sain-modern/
├── src/
│   ├── components/       # Composants réutilisables
│   ├── data/             # Données statiques (témoignages bilingues)
│   ├── hooks/            # Hooks React (useSectionPhotos, useSectionMenus…)
│   ├── i18n.ts           # Configuration i18next
│   ├── lib/              # Services (photoService, priceService, menuService, testimonialService…)
│   ├── locales/          # Traductions (fr.json, en.json)
│   ├── pages/            # Pages du site
│   │   └── admin/        # Zone d'administration
│   └── main.tsx          # Point d'entrée
├── supabase/             # Scripts SQL
├── public/               # Images statiques
├── .env.example          # Variables d'environnement (modèle)
└── package.json
```

## 📞 Support

Pour toute question ou collaboration :
- Email : sainbenin@yahoo.fr
- WhatsApp : +229 01 95 40 54 33
- Mobile : +229 97 65 56 28
- Facebook : [Ferme École SAIN](https://www.facebook.com/Ferme-Ecole-SAIN-108352284147580/)
- YouTube : [SAIN Channel](https://www.youtube.com/channel/UCN982W_xV7nRHt6aW1mAIwA)
- Instagram : [@fermeecolesain](https://www.instagram.com/fermeecolesain/)

---

Site conçu avec ❤️ pour la promotion de l'agroécologie au Bénin.
