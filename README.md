# Sain - Ferme École Bio • Modern UI

Site web moderne et hautement optimisé pour **SAIN** (Solidarités Agricoles Intégrées), une ferme-école en agroécologie au Bénin.

## 🔥 Technologies

- **Vite** - Build ultra-rapide
- **React 19** - Framework UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Design système
- **Framer Motion** - Animations fluides
- **GSAP** - Animations avancées
- **React Router v6** - Gestion de navigation

## ✨ Fonctionnalités

- **Design moderne** : Interface épurée et élégante
- **Animations avancées** : Transitions fluides et micro-interactions
- **Responsive** : Compatible mobile, tablette et desktop
- **Performance** : Optimisation au chargement et au rendu
- **SEO optimisé** : Meta tags et métadonnées complètes
- **Accessibilité** : Navigation clavier et contraste adéquat

## 📊 Pages du Site

| Page | Route | Description |
|------|-------|-------------|
| Accueil | `/` | Présentation générale avec carousel et services |
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
| Galerie | `/galerie` | Galerie photo complète |
| Contact | `/contact` | Formulaire et localisation |

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

## 📱 Fonctionnalités Mobiles

- Menu hamburger animé
- Formulaire de contact responsive
- Carousel d'images mobile-friendly

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

## 🖼️ Administration des photos

Une zone d'administration est disponible sur `/admin` (lien discret dans le pied de page).
L'admin peut **ajouter, modifier, remplacer et supprimer** les photos de chaque section du site
(accueil, hébergement, restaurant, « Nos produits », galerie…), **gérer les prix et tarifs**
(hébergement — types de chambres et pension complète —, circuits découverte, programmes de
soutien) et **modifier les menus du restaurant** (catégories et plats).
Les photos sont lues depuis la table `photos`, les tarifs depuis `prices`, les menus depuis
`menu_categories` et `menu_items` : plus rien n'est codé en dur dans le site.
Les données sont stockées dans **Supabase** (Postgres + Storage + Auth).

### Mise en place (une seule fois)

1. Créez un projet sur [supabase.com](https://supabase.com) (ou utilisez le vôtre).
2. Dans **SQL Editor**, exécutez le contenu de `supabase/setup.sql` (tables, sécurité, stockage, seed des photos actuelles).
3. Créez le compte admin : **Authentication → Users → Add user** (email + mot de passe).
4. Copiez `.env.example` vers `.env.local` et renseignez `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`
   (Dashboard → Settings → API).
5. Redémarrez `npm run dev` — le site lit alors les photos depuis Supabase.
6. En production (Vercel), ajoutez ces deux variables dans les réglages du projet.

> Sans Supabase configuré, le site continue de fonctionner avec les photos locales par défaut.

## 📞 Support

Pour toute question ou collaboration :
- Email : sainbenin@yahoo.fr
- WhatsApp : +229 62 44 47 44
- Mobile : +229 97 65 56 28

---

Site conçu avec ❤️ pour la promotion de l'agroécologie au Bénin.
