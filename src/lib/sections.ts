// Registre des sections du site et de leurs emplacements de photos.
// Chaque section a des « slots » fixes (key unique) pour les photos liées au contenu
// (bannière, membre d'équipe, produit…) et accepte en plus des photos libres
// (key null) ajoutées depuis l'admin, affichées dans le bandeau de la section.

export interface PhotoSlot {
  key: string
  label: string
}

export interface SectionDef {
  slug: string
  name: string
  slots: PhotoSlot[]
  /** true si la section accepte des photos libres supplémentaires (ajout admin) */
  freePhotos?: boolean
  /** true si la section gère aussi des vidéos (ex. galerie) */
  hasVideos?: boolean
}

export const SECTIONS: SectionDef[] = [
  {
    slug: 'accueil',
    name: 'Accueil',
    slots: [
      { key: 'hero', label: 'Bannière d\u2019accueil (héro)' },
      { key: 'apropos', label: 'Section « À propos »' },
      { key: 'apercu-1', label: 'Aperçu galerie — image 1' },
      { key: 'apercu-2', label: 'Aperçu galerie — image 2' },
      { key: 'apercu-3', label: 'Aperçu galerie — image 3' },
      { key: 'apercu-4', label: 'Aperçu galerie — image 4' },
      { key: 'apercu-5', label: 'Aperçu galerie — image 5' },
      { key: 'apercu-6', label: 'Aperçu galerie — image 6' },
      { key: 'temoin-1', label: 'Témoignage — Alassane Touré' },
      { key: 'temoin-2', label: 'Témoignage — Marie Dubois' },
      { key: 'temoin-3', label: 'Témoignage — Pasteur Houensou' },
    ],
    freePhotos: true,
  },
  {
    slug: 'projet-global',
    name: 'À propos',
    slots: [{ key: 'hero', label: 'Bannière de page' }],
    freePhotos: true,
  },
  {
    slug: 'responsabilite-sociale',
    name: 'RSE',
    slots: [{ key: 'hero', label: 'Bannière de page' }],
    freePhotos: true,
  },
  {
    slug: 'activites-sain',
    name: 'Activités',
    slots: [
      { key: 'hero', label: 'Bannière de page' },
      { key: 'pole-1', label: 'Production végétale' },
      { key: 'pole-2', label: 'Production animale' },
      { key: 'pole-3', label: 'Aquaculture' },
      { key: 'agritourisme', label: 'Section agritourisme' },
    ],
    freePhotos: true,
  },
  {
    slug: 'equipe-sain',
    name: 'Équipe',
    slots: [
      { key: 'hero', label: 'Bannière de page' },
      { key: 'membre-1', label: 'Pascal Gbenou' },
      { key: 'membre-2', label: 'Bernardin DJOSSOU' },
      { key: 'membre-3', label: 'NEVIS Romaric David' },
      { key: 'membre-4', label: 'Jeanne Adjahoungbeta' },
      { key: 'membre-5', label: 'Lucien N\u2019Vênihoundé' },
      { key: 'membre-6', label: 'Prosper Dekpo S.' },
      { key: 'membre-7', label: 'Noëllie Oussa Zannou' },
    ],
    freePhotos: true,
  },
  {
    slug: 'formations',
    name: 'Formations',
    slots: [
      { key: 'hero', label: 'Bannière de page' },
      { key: 'etudiant', label: 'Photo étudiant (section méthode)' },
    ],
    freePhotos: true,
  },
  {
    slug: 'hebergement-ferme',
    name: 'Hébergement',
    slots: [
      { key: 'hero', label: 'Bannière de page' },
      { key: 'apercu-1', label: 'Aperçu — image 1' },
      { key: 'apercu-2', label: 'Aperçu — image 2' },
      { key: 'apercu-3', label: 'Aperçu — image 3' },
      { key: 'apercu-4', label: 'Aperçu — image 4' },
      { key: 'espace-1', label: 'Espace — Chambres' },
      { key: 'espace-2', label: 'Espace — Jardin' },
      { key: 'espace-3', label: 'Espace — Espaces verts' },
    ],
    freePhotos: true,
  },
  {
    slug: 'restaurant',
    name: 'Restaurant',
    slots: [
      { key: 'hero', label: 'Bannière de page' },
      { key: 'photo-1', label: 'Photo principale' },
      { key: 'photo-2', label: 'Photo produits' },
    ],
    freePhotos: true,
  },
  {
    slug: 'circuits-decouverte',
    name: 'Circuits',
    slots: [
      { key: 'hero', label: 'Bannière de page' },
      { key: 'galerie-1', label: 'Galerie — image 1' },
      { key: 'galerie-2', label: 'Galerie — image 2' },
      { key: 'galerie-3', label: 'Galerie — image 3' },
      { key: 'galerie-4', label: 'Galerie — image 4' },
    ],
    freePhotos: true,
  },
  {
    slug: 'production',
    name: 'Production',
    slots: [
      { key: 'hero', label: 'Bannière de page' },
      { key: 'produit-fresh-fruits', label: 'Frais — Fruits' },
      { key: 'produit-fresh-item-papayes', label: 'Frais — Papayes' },
      { key: 'produit-fresh-item-coco', label: 'Frais — Coco' },
      { key: 'produit-fresh-item-ananas', label: 'Frais — Ananas' },
      { key: 'produit-fresh-item-bananes-plantains', label: 'Frais — Bananes plantains' },
      { key: 'produit-fresh-legumes', label: 'Frais — Légumes' },
      { key: 'produit-fresh-oeufs', label: 'Frais — Œufs' },
      { key: 'produit-fresh-viandes', label: 'Frais — Viandes' },
      { key: 'produit-fresh-poissons', label: 'Frais — Poissons' },
      { key: 'produit-fresh-autres', label: 'Frais — Autres' },
      { key: 'produit-processed-jus-de-papaye', label: 'Transformé — Jus de papaye' },
      { key: 'produit-processed-huile-de-coco', label: 'Transformé — Huile de coco' },
      { key: 'produit-processed-confitures', label: 'Transformé — Confitures' },
      { key: 'produit-processed-gari', label: 'Transformé — Gari' },
      { key: 'produit-processed-huile-de-palme', label: 'Transformé — Huile de palme' },
    ],
    freePhotos: true,
  },
  {
    slug: 'nous-soutenir',
    name: 'Soutien',
    slots: [
      { key: 'hero', label: 'Bannière de page' },
      { key: 'photo-1', label: 'Photo 1' },
      { key: 'photo-2', label: 'Photo 2' },
      { key: 'photo-3', label: 'Photo 3' },
      { key: 'photo-4', label: 'Photo 4' },
    ],
    freePhotos: true,
  },
  {
    slug: 'galerie',
    name: 'Galerie',
    freePhotos: true,
    hasVideos: true,
    slots: [{ key: 'hero', label: 'Bannière de page' }],
  },
  {
    slug: 'contact',
    name: 'Contact',
    slots: [{ key: 'hero', label: 'Bannière de page' }],
    freePhotos: true,
  },
  {
    slug: 'mentions-legales',
    name: 'Mentions légales',
    slots: [{ key: 'hero', label: 'Bannière de page' }],
    freePhotos: true,
  },
]

/** Index slug → section */
export const SECTION_BY_SLUG: Record<string, SectionDef> = Object.fromEntries(
  SECTIONS.map((s) => [s.slug, s]),
)

/** Libellé d'un emplacement dans une section */
export function slotLabel(sectionSlug: string, key: string): string {
  return SECTION_BY_SLUG[sectionSlug]?.slots.find((s) => s.key === key)?.label ?? key
}

/* ─────────────────────────────────────────────
   Sections avec prix/tarifs gérables (admin)
────────────────────────────────────────────── */

export interface PriceCategory {
  value: string
  label: string
}

export interface PriceSectionDef {
  /** Libellé affiché dans l'admin */
  label: string
  /** Catégories proposées (sélecteur) — ex. hébergement : chambre / pension complète */
  categories?: PriceCategory[]
}

export const PRICE_SECTIONS: Record<string, PriceSectionDef> = {
  'hebergement-ferme': {
    label: 'Hébergement (chambres & pension complète)',
    categories: [
      { value: 'room', label: 'Chambre' },
      { value: 'board', label: 'Pension complète' },
    ],
  },
  'circuits-decouverte': {
    label: 'Circuits découverte',
  },
  'nous-soutenir': {
    label: 'Programmes de soutien',
  },
}
