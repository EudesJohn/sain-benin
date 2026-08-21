// Photos par défaut du site, par section et emplacement.
// Ce sont les images actuellement en dur dans les pages : elles servent de repli
// tant qu'une photo n'a pas été personnalisée dans Supabase. Une URL vide = pas de photo.

export interface DefaultPhoto {
  url: string
  alt: string
  caption?: string
}

/** Photos des emplacements fixes, par section puis par key */
export const defaultPhotos: Record<string, Record<string, DefaultPhoto>> = {
  accueil: {
    hero: { url: '/images/Riz-Sain-1024x743.jpg', alt: 'Champ de riz de la ferme SAIN' },
    apropos: { url: '/images/A-PROPOS-SAIN-1024x715.jpg', alt: 'SAIN — À propos' },
    'apercu-1': { url: '/images/Travaux-Ferme-1024x768.jpg', alt: 'Travaux à la ferme' },
    'apercu-2': { url: '/images/Etudiants-Sain-150x150.jpg', alt: 'Étudiants de la ferme école' },
    'apercu-3': { url: '/images/Fruits-Sain-150x150.jpg', alt: 'Fruits frais de la ferme' },
    'apercu-4': { url: '/images/Chambres-Sain-150x150.jpg', alt: 'Chambres de la ferme' },
    'apercu-5': { url: '/images/Compost-Sain-150x150.jpg', alt: 'Compostage' },
    'apercu-6': { url: '/images/Jardin-Sain-150x150.jpg', alt: 'Jardin de la ferme' },
    'temoin-1': { url: '/images/Etudiants-2-150x150.jpg', alt: 'Alassane Touré, ancien élève' },
    'temoin-2': { url: '/images/Visite-Ferme-150x150.jpg', alt: 'Marie Dubois, visiteuse' },
    'temoin-3': { url: '/images/Sourire-Sain-150x150.jpg', alt: 'Pasteur Houensou, partenaire' },
  },
  'projet-global': {
    hero: { url: '/images/A-PROPOS-SAIN-1024x715.jpg', alt: 'La ferme SAIN' },
  },
  'responsabilite-sociale': {
    hero: { url: '/images/Engagement-Social-Sain-1024x768.jpg', alt: 'Engagement social' },
  },
  'activites-sain': {
    hero: { url: '/images/Travaux-Ferme-1024x768.jpg', alt: 'Travaux à la ferme' },
    'pole-1': { url: '/images/Fruits-Sain-1024x717.jpg', alt: 'Production végétale' },
    'pole-2': { url: '/images/Elevage-lapin-Sain-1024x806.jpg', alt: 'Élevage de lapins' },
    'pole-3': { url: '/images/Riz-Sain-1024x743.jpg', alt: 'Champ de riz' },
    agritourisme: { url: '/images/Fruits-Sain-1024x717.jpg', alt: 'Agritourisme' },
  },
  'equipe-sain': {
    hero: { url: '/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg', alt: 'Regard' },
    'membre-1': { url: '/images/Pascal-Gbenou.jpg', alt: 'Pascal Gbenou' },
    'membre-2': { url: '/images/Bernardin.jpg', alt: 'Bernardin DJOSSOU' },
    'membre-3': { url: '/images/NEVIS-Romaric.jpg', alt: 'NEVIS Romaric David' },
    'membre-4': { url: '/images/Jeanne-150x150.jpg', alt: 'Jeanne Adjahoungbeta' },
    'membre-5': { url: '/images/Lucien-150x150.jpg', alt: "Lucien N'Vênihoundé" },
    'membre-6': { url: '/images/Prosper-150x150.jpg', alt: 'Prosper Dekpo S.' },
    'membre-7': { url: '/images/Noellie-e1655720153956-150x150.jpg', alt: 'Noëllie Oussa Zannou' },
  },
  formations: {
    hero: {
      url: '/images/Formation-Apiculture-ppttd5u5ckwjd1zlrd6anyyhcbtdn27r04x4niza9w.jpg',
      alt: 'Formation en apiculture',
    },
    etudiant: { url: '/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg', alt: 'Étudiant en formation' },
  },
  'hebergement-ferme': {
    hero: { url: '/images/Jardin3-Sain-1024x768.jpg', alt: 'Jardin de la ferme' },
    'apercu-1': { url: '/images/Accueil-Sain-150x150.jpg', alt: 'Accueil à la ferme' },
    'apercu-2': { url: '/images/Chambres-Sain-1024x768.jpg', alt: 'Chambres SAIN' },
    'apercu-3': { url: '/images/sain1-150x150.jpg', alt: 'Vue de la ferme' },
    'apercu-4': { url: '/images/Cuisine-Gite-150x150.jpg', alt: 'Cuisine du gîte' },
    'espace-1': {
      url: '/images/Hebergement-9-ppv80k18zqzr9fenf1dj1cdlvqjcdnyq13mq21ey10.jpg',
      alt: 'Chambres',
    },
    'espace-2': { url: '/images/Palme-Sain-150x150.jpg', alt: 'Jardin' },
    'espace-3': { url: '/images/Fleur-150x150.jpg', alt: 'Espaces verts' },
  },
  restaurant: {
    hero: { url: '/images/Restaurant-Sain-724x1024.png', alt: 'Le restaurant de la ferme' },
    'photo-1': { url: '/images/Restaurant-Sain-724x1024.png', alt: 'Le restaurant de la ferme' },
    'photo-2': { url: '/images/Fruits-Sain-1024x717.jpg', alt: 'Fruits de la ferme' },
  },
  'circuits-decouverte': {
    hero: { url: '/images/A-PROPOS-SAIN-1024x715.jpg', alt: 'La ferme SAIN' },
    'galerie-1': { url: '/images/Marécage-150x150.jpg', alt: 'Le marécage de la ferme' },
    'galerie-2': { url: '/images/Pirogue-150x114.jpg', alt: 'Tour en pirogue' },
    'galerie-3': { url: '/images/Elevage-Poules-Sain-150x150.jpg', alt: 'Élevage de poules' },
    'galerie-4': { url: '/images/Palme-Sain-150x150.jpg', alt: 'Palmeraie' },
  },
  production: {
    hero: { url: '/images/Jardin-Sain-1024x768.jpg', alt: 'Le jardin de la ferme' },
    'produit-fresh-fruits': { url: '/images/Fruits-Sain-150x150.jpg', alt: 'Fruits' },
    'produit-fresh-item-papayes': { url: '/images/Papaye-Sain-150x150.jpg', alt: 'Papayes' },
    'produit-fresh-item-coco': { url: '/images/Palme-Sain-150x150.jpg', alt: 'Coco' },
    'produit-fresh-item-ananas': { url: '/images/Ananas-2-150x150.jpg', alt: 'Ananas' },
    'produit-fresh-item-bananes-plantains': { url: '/images/banaan-1024x768.jpg', alt: 'Bananes plantains' },
    'produit-fresh-item-oranges': { url: '', alt: 'Oranges' },
    'produit-fresh-item-pasteques': {
      url: '/images/Pasteque-Sain-pqky602ny2xct9rmyljwsss2by0rfg6icodxf4zgl4.jpg',
      alt: 'Pastèques',
    },
    'produit-fresh-legumes': { url: '/images/Maraichage-4-150x150.jpg', alt: 'Légumes' },
    'produit-fresh-item-piments': { url: '', alt: 'Piments' },
    'produit-fresh-item-oignons': { url: '', alt: 'Oignons' },
    'produit-fresh-item-haricots-verts': { url: '', alt: 'Haricots verts' },
    'produit-fresh-oeufs': { url: '/images/Elevage-Poules-Sain-150x150.jpg', alt: 'Œufs' },
    'produit-fresh-item-oeufs-de-poule': {
      url: '/images/Oeufs-Sain-pqky5wbb6qs7itx3kjxeitq7yejaknrl05rzi151a0.jpg',
      alt: 'Œufs de poule',
    },
    'produit-fresh-item-oeufs-de-cailles': { url: '', alt: 'Œufs de cailles' },
    'produit-fresh-viandes': { url: '/images/Lapins-Elevage-150x150.jpg', alt: 'Viandes' },
    'produit-fresh-item-lapin': {
      url: '/images/Lapin-Sain-pqky63u0pf2i3pm6cn6f2rtwphi8a8lfp6zvc8tvw8.jpg',
      alt: 'Lapin',
    },
    'produit-fresh-item-caille': { url: '', alt: 'Caille' },
    'produit-fresh-item-pigeon': { url: '', alt: 'Pigeon' },
    'produit-fresh-item-canard': { url: '', alt: 'Canard' },
    'produit-fresh-poissons': { url: '/images/Pirogue-150x114.jpg', alt: 'Poissons' },
    'produit-fresh-item-poisson-frais': {
      url: '/images/Poisson-Sain-pql0e2xo6yjrxbg4cpooq3as8pbi7539p184as90hk.jpg',
      alt: 'Poisson frais',
    },
    'produit-fresh-autres': { url: '/images/Apiculture-Formation-150x150.jpg', alt: 'Autres produits' },
    'produit-fresh-item-champignons': {
      url: '/images/Champignons-Sain-pqky6bcq83csolb94qffmpxlgkh5ztfae87r6giqig.jpg',
      alt: 'Champignons',
    },
    'produit-fresh-item-miel': { url: '', alt: 'Miel' },
    'produit-processed-jus-de-papaye': { url: '/images/Papaye-Sain-150x150.jpg', alt: 'Jus de papaye' },
    'produit-processed-huile-de-coco': { url: '/images/Palme-Sain-150x150.jpg', alt: 'Huile de coco' },
    'produit-processed-confitures': { url: '', alt: 'Confitures' },
    'produit-processed-gari': { url: '', alt: 'Gari' },
    'produit-processed-huile-de-palme': { url: '/images/Curcuma-Sain-150x150.jpg', alt: 'Huile de palme' },
  },
  'nous-soutenir': {
    hero: { url: '/images/Ecole-Sain-Arrosage-1-1024x867.jpg', alt: 'Arrosage des cultures' },
    'photo-1': { url: '/images/Etudiant-4-1024x683.jpg', alt: 'Un étudiant à la ferme' },
    'photo-2': { url: '/images/Formation-Apiculture-1024x768.jpg', alt: 'Formation en apiculture' },
    'photo-3': { url: '/images/Ecole-Sain-Arrosage-1-1024x867.jpg', alt: 'Arrosage des cultures' },
    'photo-4': { url: '/images/Etudiants-2-150x150.jpg', alt: 'Étudiants de la ferme' },
  },
  galerie: {
    hero: { url: '/images/Travaux-Ferme-1024x768.jpg', alt: 'Travaux à la ferme' },
  },
  contact: {
    hero: { url: '/images/Etudiant-4-1024x683.jpg', alt: 'Un étudiant à la ferme' },
  },
  'mentions-legales': {
    hero: { url: '/images/Recherche-Sain-1024x767.jpg', alt: 'Recherche-action' },
  },
}

/** Photos libres par défaut (galerie), triées par position */
export const defaultFreePhotos: Record<string, DefaultPhoto[]> = {
  galerie: [
    // ── La ferme & les travaux ──
    { url: '/images/Travaux-Ferme-1024x768.jpg', alt: 'Travaux à la ferme' },
    { url: '/images/Ecole-Sain-Arrosage-1-1024x867.jpg', alt: 'Arrosage des cultures' },
    { url: '/images/Arrosage-Etudiant-150x150.jpg', alt: 'Un étudiant arrose le jardin' },
    { url: '/images/Jardin-Sain-1024x768.jpg', alt: 'Le jardin de la ferme' },
    { url: '/images/Jardin3-Sain-1024x768.jpg', alt: 'Jardin de la ferme' },
    { url: '/images/Compost-Sain-150x150.jpg', alt: 'Compostage' },
    { url: '/images/Maraichage-150x150.jpg', alt: 'Maraîchage' },
    { url: '/images/Maraichage-5-150x150.jpg', alt: 'Culture maraîchère' },
    { url: '/images/Maraichage-3-150x150.jpg', alt: 'Maraîchage' },
    { url: '/images/Maraichage-4-150x150.jpg', alt: 'Culture maraîchère' },
    { url: '/images/Marécage-150x150.jpg', alt: 'Le marécage de la ferme' },
    { url: '/images/Travaux-2-150x150.jpg', alt: 'Travaux de la ferme' },
    { url: '/images/Repiquage-Sain-1-150x150.jpg', alt: 'Repiquage des plants' },
    { url: '/images/Repiquage-Sain-2-ppttfeo9obz73iq6nc47mek4fgqy114nz90vxbnfes.jpg', alt: 'Repiquage des plants' },
    { url: '/images/Riz-Sain-1024x743.jpg', alt: 'Champ de riz' },
    { url: '/images/Riz-Sain-1-1024x743.jpg', alt: 'Récolte du riz' },
    { url: '/images/Palme-Sain-150x150.jpg', alt: 'Palmeraie' },
    { url: '/images/Fleur-150x150.jpg', alt: 'Fleurs de la ferme' },

    // ── Élevage & produits ──
    { url: '/images/Elevage-lapin-Sain-1024x806.jpg', alt: 'Élevage de lapins' },
    { url: '/images/Lapins-Elevage-150x150.jpg', alt: 'Lapins de la ferme' },
    { url: '/images/Elevage-Poules-Sain-150x150.jpg', alt: 'Élevage de poules' },
    { url: '/images/Formation-Apiculture-1024x768.jpg', alt: 'Formation en apiculture' },
    { url: '/images/Apiculture-Formation-150x150.jpg', alt: 'Apiculture' },
    { url: '/images/Fruits-Sain-1024x717.jpg', alt: 'Fruits de la ferme' },
    { url: '/images/Fruits-Sain-150x150.jpg', alt: 'Fruits frais' },
    { url: '/images/Papaye-Sain-150x150.jpg', alt: 'Papayes' },
    { url: '/images/Curcuma-Sain-150x150.jpg', alt: 'Curcuma' },
    { url: '/images/Ananas-2-150x150.jpg', alt: 'Ananas de la ferme' },
    { url: '/images/banaan-scaled-e1649512167400.jpg', alt: 'Bananes plantains' },
    { url: '/images/Jus-Concombre-Sain-150x150.jpg', alt: 'Jus de concombre' },

    // ── Étudiants, formation & équipe ──
    { url: '/images/Etudiants-Sain-150x150.jpg', alt: 'Étudiants de la ferme école' },
    { url: '/images/Etudiant-4-1024x683.jpg', alt: 'Un étudiant à la ferme' },
    { url: '/images/Etudiant-5-150x150.jpg', alt: 'Étudiant en formation' },
    { url: '/images/Etudiant-7-1024x683.jpg', alt: 'Formation pratique' },
    { url: '/images/Etudiants-2-150x150.jpg', alt: 'Étudiants de la ferme' },
    { url: '/images/Etudiants-Sain-1024x768.jpg', alt: "Groupe d'étudiants de la ferme" },
    { url: '/images/Equipe-Sain-150x150.jpg', alt: "L'équipe SAIN" },
    { url: '/images/Sourire-Sain-150x150.jpg', alt: 'Jeunes souriants' },
    { url: '/images/Engagement-Social-Sain-1024x768.jpg', alt: 'Engagement social' },
    { url: '/images/Engagement-Social-Sain-150x150.jpg', alt: 'Engagement solidaire' },

    // ── Hébergement & accueil ──
    { url: '/images/Hebergement-9-ppv80k18zqzr9fenf1dj1cdlvqjcdnyq13mq21ey10.jpg', alt: 'Hébergement à la ferme' },
    { url: '/images/Chambres-Sain-1024x768.jpg', alt: 'Chambres SAIN' },
    { url: '/images/Hébergement-Sain-150x150.jpg', alt: 'Hébergement à la ferme' },
    { url: '/images/Hébergement-3-Sain-150x150.jpg', alt: 'Hébergement de la ferme' },
    { url: '/images/Cuisine-Gite-150x150.jpg', alt: 'Cuisine du gîte' },
    { url: '/images/Cuisine-Sain-150x150.jpg', alt: 'Cuisine de la ferme' },
    { url: '/images/Accueil-Sain-150x150.jpg', alt: 'Accueil à la ferme' },
    { url: '/images/Ferme-Accueil-150x150.jpg', alt: 'Accueil de la ferme' },
    { url: '/images/sain1-150x150.jpg', alt: 'Vue de la ferme' },

    // ── Nature, recherche & découverte ──
    { url: '/images/Visite-Ferme-ppttg268f6vd5rs1u49vuqmna3j4dgpyehc0x8ol38.jpg', alt: 'Visite de la ferme' },
    { url: '/images/Visite-Ferme-150x150.jpg', alt: 'Visite guidée' },
    { url: '/images/Pirogue-150x114.jpg', alt: 'Tour en pirogue' },
    { url: '/images/Plastique-Sain-150x150.jpg', alt: 'Tri du plastique' },
    { url: '/images/Recherche-Sain-1024x767.jpg', alt: 'Recherche-action' },
    { url: '/images/Recherche-Sain-1-pptteyp0g5dbm5de8n7jy0labwxpe6d891xmrmb4ck.jpg', alt: 'Recherche en laboratoire' },
    { url: '/images/Recherche-Sain-1-150x150.jpg', alt: 'Recherche' },
    { url: '/images/A-PROPOS-SAIN-1024x715.jpg', alt: 'La ferme SAIN' },
    { url: '/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg', alt: 'Regard' },
    { url: '/images/Restaurant-Sain-724x1024.png', alt: 'Le restaurant de la ferme' },
    { url: '/images/sain5-150x150.jpg', alt: 'Vie à la ferme' },
  ],
}

/** Nombre total de photos par défaut (diagnostic) */
export const DEFAULT_PHOTO_COUNT = Object.values(defaultPhotos).reduce(
  (acc, section) => acc + Object.keys(section).length,
  0,
) + Object.values(defaultFreePhotos).reduce((acc, list) => acc + list.length, 0)
