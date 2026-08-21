// Registre des sections du site et de leurs emplacements de photos.
// Chaque section a des « slots » fixes (key unique) pour les photos liées au contenu
// (bannière, membre d'équipe, produit…) et accepte en plus des photos libres
// (key null) ajoutées depuis l'admin, affichées dans le bandeau de la section.

export interface PhotoSlot {
  key: string
  label: string
  /** Taille recommandee pour un meilleur rendu (ex. "1920x1080", "800x600") */
  size?: string
  /** Description de la taille (ex. "Banniere 16:9") */
  sizeLabel?: string
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
      { key: 'hero', label: 'Bannière d\u2019accueil (héro)', size: '1920x1080', sizeLabel: 'Bannière 16:9' },
      { key: 'apropos', label: 'Section « À propos »', size: '1200x800', sizeLabel: 'Paysage 3:2' },
      { key: 'apercu-1', label: 'Aperçu galerie — image 1', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'apercu-2', label: 'Aperçu galerie — image 2', size: '400x400', sizeLabel: 'Carré' },
      { key: 'apercu-3', label: 'Aperçu galerie — image 3', size: '400x400', sizeLabel: 'Carré' },
      { key: 'apercu-4', label: 'Aperçu galerie — image 4', size: '400x400', sizeLabel: 'Carré' },
      { key: 'apercu-5', label: 'Aperçu galerie — image 5', size: '400x400', sizeLabel: 'Carré' },
      { key: 'apercu-6', label: 'Aperçu galerie — image 6', size: '400x400', sizeLabel: 'Carré' },
      { key: 'temoin-1', label: 'Témoignage — Alassane Touré', size: '400x400', sizeLabel: 'Carré' },
      { key: 'temoin-2', label: 'Témoignage — Marie Dubois', size: '400x400', sizeLabel: 'Carré' },
      { key: 'temoin-3', label: 'Témoignage — Pasteur Houensou', size: '400x400', sizeLabel: 'Carré' },
    ],
    freePhotos: true,
  },
  {
    slug: 'projet-global',
    name: 'À propos',
    slots: [{ key: 'hero', label: 'Bannière de page', size: '1920x1080', sizeLabel: 'Bannière 16:9' }],
    freePhotos: true,
  },
  {
    slug: 'responsabilite-sociale',
    name: 'RSE',
    slots: [{ key: 'hero', label: 'Bannière de page', size: '1920x1080', sizeLabel: 'Bannière 16:9' }],
    freePhotos: true,
  },
  {
    slug: 'activites-sain',
    name: 'Activités',
    slots: [
      { key: 'hero', label: 'Bannière de page', size: '1920x1080', sizeLabel: 'Bannière 16:9' },
      { key: 'pole-1', label: 'Production végétale', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'pole-2', label: 'Production animale', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'pole-3', label: 'Aquaculture', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'agritourisme', label: 'Section agritourisme', size: '800x600', sizeLabel: 'Paysage 4:3' },
    ],
    freePhotos: true,
  },
  {
    slug: 'equipe-sain',
    name: 'Équipe',
    slots: [
      { key: 'hero', label: 'Bannière de page', size: '1920x1080', sizeLabel: 'Bannière 16:9' },
      { key: 'membre-1', label: 'Pascal Gbenou', size: '400x400', sizeLabel: 'Carré' },
      { key: 'membre-2', label: 'Bernardin DJOSSOU', size: '400x400', sizeLabel: 'Carré' },
      { key: 'membre-3', label: 'NEVIS Romaric David', size: '400x400', sizeLabel: 'Carré' },
      { key: 'membre-4', label: 'Jeanne Adjahoungbeta', size: '400x400', sizeLabel: 'Carré' },
      { key: 'membre-5', label: 'Lucien N\u2019Vênihoundé', size: '400x400', sizeLabel: 'Carré' },
      { key: 'membre-6', label: 'Prosper Dekpo S.', size: '400x400', sizeLabel: 'Carré' },
      { key: 'membre-7', label: 'Noëllie Oussa Zannou', size: '400x400', sizeLabel: 'Carré' },
    ],
    freePhotos: true,
  },
  {
    slug: 'formations',
    name: 'Formations',
    slots: [
      { key: 'hero', label: 'Bannière de page', size: '1920x1080', sizeLabel: 'Bannière 16:9' },
      { key: 'etudiant', label: 'Photo étudiant (section méthode)', size: '800x600', sizeLabel: 'Paysage 4:3' },
    ],
    freePhotos: true,
  },
  {
    slug: 'hebergement-ferme',
    name: 'Hébergement',
    slots: [
      { key: 'hero', label: 'Bannière de page', size: '1920x1080', sizeLabel: 'Bannière 16:9' },
      { key: 'apercu-1', label: 'Aperçu — image 1', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'apercu-2', label: 'Aperçu — image 2', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'apercu-3', label: 'Aperçu — image 3', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'apercu-4', label: 'Aperçu — image 4', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'espace-1', label: 'Espace — Chambres', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'espace-2', label: 'Espace — Jardin', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'espace-3', label: 'Espace — Espaces verts', size: '800x600', sizeLabel: 'Paysage 4:3' },
    ],
    freePhotos: true,
  },
  {
    slug: 'restaurant',
    name: 'Restaurant',
    slots: [
      { key: 'hero', label: 'Bannière de page', size: '1920x1080', sizeLabel: 'Bannière 16:9' },
      { key: 'photo-1', label: 'Photo principale', size: '800x1200', sizeLabel: 'Portrait 2:3' },
      { key: 'photo-2', label: 'Photo produits', size: '1200x800', sizeLabel: 'Paysage 3:2' },
    ],
    freePhotos: true,
  },
  {
    slug: 'circuits-decouverte',
    name: 'Circuits',
    slots: [
      { key: 'hero', label: 'Bannière de page', size: '1920x1080', sizeLabel: 'Bannière 16:9' },
      { key: 'galerie-1', label: 'Galerie — image 1', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'galerie-2', label: 'Galerie — image 2', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'galerie-3', label: 'Galerie — image 3', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'galerie-4', label: 'Galerie — image 4', size: '800x600', sizeLabel: 'Paysage 4:3' },
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
      { key: 'produit-fresh-item-oranges', label: 'Frais — Oranges' },
      { key: 'produit-fresh-item-pasteques', label: 'Frais — Pastèques' },
      { key: 'produit-fresh-legumes', label: 'Frais — Légumes' },
      { key: 'produit-fresh-item-piments', label: 'Frais — Piments' },
      { key: 'produit-fresh-item-oignons', label: 'Frais — Oignons' },
      { key: 'produit-fresh-item-haricots-verts', label: 'Frais — Haricots verts' },
      { key: 'produit-fresh-oeufs', label: 'Frais — Œufs' },
      { key: 'produit-fresh-item-oeufs-de-poule', label: 'Frais — Œufs de poule' },
      { key: 'produit-fresh-item-oeufs-de-cailles', label: 'Frais — Œufs de cailles' },
      { key: 'produit-fresh-viandes', label: 'Frais — Viandes' },
      { key: 'produit-fresh-item-lapin', label: 'Frais — Lapin' },
      { key: 'produit-fresh-item-caille', label: 'Frais — Caille' },
      { key: 'produit-fresh-item-pigeon', label: 'Frais — Pigeon' },
      { key: 'produit-fresh-item-canard', label: 'Frais — Canard' },
      { key: 'produit-fresh-poissons', label: 'Frais — Poissons' },
      { key: 'produit-fresh-item-poisson-frais', label: 'Frais — Poisson frais' },
      { key: 'produit-fresh-autres', label: 'Frais — Autres' },
      { key: 'produit-fresh-item-champignons', label: 'Frais — Champignons' },
      { key: 'produit-fresh-item-miel', label: 'Frais — Miel' },
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
      { key: 'hero', label: 'Bannière de page', size: '1920x1080', sizeLabel: 'Bannière 16:9' },
      { key: 'photo-1', label: 'Photo 1', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'photo-2', label: 'Photo 2', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'photo-3', label: 'Photo 3', size: '800x600', sizeLabel: 'Paysage 4:3' },
      { key: 'photo-4', label: 'Photo 4', size: '800x600', sizeLabel: 'Paysage 4:3' },
    ],
    freePhotos: true,
  },
  {
    slug: 'galerie',
    name: 'Galerie',
    freePhotos: true,
    hasVideos: true,
    slots: [{ key: 'hero', label: 'Bannière de page', size: '1920x1080', sizeLabel: 'Bannière 16:9' }],
  },
  {
    slug: 'contact',
    name: 'Contact',
    slots: [{ key: 'hero', label: 'Bannière de page', size: '1920x1080', sizeLabel: 'Bannière 16:9' }],
    freePhotos: true,
  },
  {
    slug: 'mentions-legales',
    name: 'Mentions légales',
    slots: [{ key: 'hero', label: 'Bannière de page', size: '1920x1080', sizeLabel: 'Bannière 16:9' }],
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

/* ─────────────────────────────────────────────
   Sections avec menus gérables (admin)
────────────────────────────────────────────── */

export interface MenuSectionDef {
  /** Libellé affiché dans l'admin */
  label: string
}

export const MENU_SECTIONS: Record<string, MenuSectionDef> = {
  restaurant: {
    label: 'Restaurant — menus',
  },
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
