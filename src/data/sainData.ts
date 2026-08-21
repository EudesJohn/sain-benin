// Données de l'organisation SAIN
export const sainData = {
  siteName: "SAIN - Ferme École",
  description: "Solidarités Agricoles Intégrées - Ferme École, Hébergement, Restaurant, Séjours Nature",
  email: "sainbenin@yahoo.fr",
  phones: {
    whatsapp: "+229 62 44 47 44",
    mobile: "+229 97 65 56 28",
  },
  address: {
    village: "Village Kakanitchoé",
    distance: "12 km de Adjohoun",
    region: "Bénin",
  },
  social: {
    facebook: "https://www.facebook.com/Ferme-Ecole-SAIN-108352284147580/",
    youtube: "https://www.youtube.com/channel/UCN982W_xV7nRHt6aW1mAIwA",
    instagram: "https://www.instagram.com/fermeecolesain/",
  },
  mission: "Promouvoir des systèmes agricoles et alimentaires durables",
  vision: "Monde meilleur où les humains vivent avec dignité dans un environnement sain",
  philosophy: "Communion entre l'Homme, la Nature et la Communauté",
  history: "Créée en 1991, installée au village de Kakanitchoé depuis 1998, sur 14 hectares",
  legal: {
    siret: "RB/PNO/21 3196",
    ifu: "3 2021 12 62 37 34",
    director: "Pascal Gbenou",
  },
}

// Cartes de services pour la page d'accueil
export const serviceCards = [
  {
    id: 'agroecology',
    title: 'Agroécologie',
    description: 'Production agricole durable respectue de l\'environnement',
    href: '/projet-global',
    color: 'from-leaf-500 to-leaf-700',
    icon: 'sprout',
  },
  {
    id: 'school',
    title: 'Ferme École',
    description: 'Formation professionnelle en agriculture durable',
    href: '/formations',
    color: 'from-sun-500 to-sun-700',
    icon: 'graduation',
  },
  {
    id: 'products',
    title: 'Produits frais & transformés',
    description: 'Vente de produits bio cultivés sur place',
    href: '/production',
    color: 'from-earth-500 to-earth-700',
    icon: 'basket',
  },
  {
    id: 'accommodation',
    title: 'Hébergement à la Ferme',
    description: 'Séjournez dans un cadre rural et paisible',
    href: '/hebergement-ferme',
    color: 'from-sky-500 to-sky-700',
    icon: 'home',
  },
  {
    id: 'restaurant',
    title: 'Restauration',
    description: 'Cuisine bio, du champ à l\'assiette',
    href: '/restaurant',
    color: 'from-sun-400 to-sun-600',
    icon: 'utensils',
  },
  {
    id: 'nature',
    title: 'Séjours Nature',
    description: 'Découvrez les circuits de découverte',
    href: '/circuits-decouverte',
    color: 'from-leaf-400 to-leaf-600',
    icon: 'trees',
  },
]

// Équipe
export const teamData = [
  {
    id: 1,
    name: 'Pascal Gbenou',
    role: 'Promoteur du mouvement SAIN',
    description: 'Passionné d\'agriculture et d\'inclusion sociale. Il soutient l\'équipe de la ferme pour atteindre ses objectifs en supervisant les activités de formation, en encadrant les jeunes et en assurant la supervision générale et l\'orientation stratégique.',
    image: 'Pascal-Gbenou.jpg',
  },
  {
    id: 2,
    name: 'Bernardin DJOSSOU',
    role: 'Agronome - Recteur de la Ferme École SAIN',
    description: 'Coordonne les activités de formation, les productions, les innovations (recherches-actions pour de nouvelles solutions/technologies agricoles) et la production de connaissances. Il décrit la ferme comme une grande famille motivée où les jeunes apprennent non seulement l\'agriculture mais aussi des compétences de vie.',
    image: 'Bernardin.jpg',
  },
  {
    id: 3,
    name: 'NEVIS Romaric David',
    role: 'Agronome - Chargé de formation',
    description: 'Responsable de la formation et du suivi post-formation des apprenants de la Ferme École SAIN à Kakanitchoé. Il est reconnaissant d\'appartenir à l\'équipe opérationnelle et est motivé par l\'apprentissage continu, le partage d\'expertise et la contribution à la vision d\'un dispositif éducatif performant respectueux de l\'environnement.',
    image: 'NEVIS-Romaric.jpg',
  },
  {
    id: 4,
    name: 'Jeanne Adjahoungbeta',
    role: 'Secrétaire-caissière',
    image: 'Jeanne-150x150.jpg',
  },
  {
    id: 5,
    name: 'Lucien N\'Vênihoundé',
    role: 'Chargé des innovations agroécoliques',
    image: 'Lucien-150x150.jpg',
  },
  {
    id: 6,
    name: 'Prosper Dekpo S.',
    role: 'Chargé des opérations',
    image: 'Prosper-150x150.jpg',
  },
  {
    id: 7,
    name: 'Noëllie Oussa Zannou',
    role: 'Responsable de l\'Agro-transformation et de l\'accueil touristique',
    image: 'Noellie-e1655720153956-150x150.jpg',
  },
]

// Produits
export const products = {
  fresh: {
    title: 'Produits frais',
    items: [
      {
        name: 'Fruits',
        image: 'Fruits-Sain-150x150.jpg',
        items: [
          { name: 'Papayes', image: 'Papaye-Sain-150x150.jpg' },
          { name: 'Oranges' },
          { name: 'Coco', image: 'Palme-Sain-150x150.jpg' },
          { name: 'Pastèques' },
          { name: 'Ananas', image: 'Ananas-2-150x150.jpg' },
          { name: 'Bananes plantains', image: 'banaan-1024x768.jpg' },
        ],
      },
      { name: 'Légumes', items: ['Piments', 'Oignons', 'Haricots verts'], image: 'Maraichage-4-150x150.jpg' },
      { name: 'œufs', items: ['Œufs de poule', 'Œufs de cailles'], image: 'Elevage-Poules-Sain-150x150.jpg' },
      { name: 'Viandes', items: ['Lapin', 'Caille', 'Pigeon', 'Canard'], image: 'Lapins-Elevage-150x150.jpg' },
      { name: 'Poissons', items: ['Poisson frais'], image: 'Pirogue-150x114.jpg' },
      { name: 'Autres', items: ['Champignons', 'Miel'], image: 'Apiculture-Formation-150x150.jpg' },
    ],
  },
  processed: {
    title: 'Produits transformés',
    items: [
      { name: 'Jus de papaye', image: 'Papaye-Sain-150x150.jpg' },
      { name: 'Huile de coco', image: 'Palme-Sain-150x150.jpg' },
      { name: 'Confitures', image: '' },
      { name: 'Gari', image: '' },
      { name: 'Huile de palme', image: 'Curcuma-Sain-150x150.jpg' },
    ],
  },
}

// Témoignages (bilingues FR/EN — les noms restent identiques)
export interface Testimonial {
  id: number
  name: string        // identique dans les 2 langues
  role: string        // traduit selon la langue
  role_en: string
  quote: string       // traduit selon la langue
  quote_en: string
  image: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alassane Touré',
    role: 'Ancien élève',
    role_en: 'Former student',
    quote: 'Grâce à SAIN, j\'ai appris à cultiver durablement et ai pu créer mon entreprise agricole. Merci à toute l\'équipe !',
    quote_en: 'Thanks to SAIN, I learned sustainable farming and was able to create my agricultural business. Thank you to the whole team!',
    image: 'Etudiants-2-150x150.jpg',
  },
  {
    id: 2,
    name: 'Marie Dubois',
    role: 'Visiteuse touristique',
    role_en: 'Tourist visitor',
    quote: 'Un lieu magique où l\'on découvre l\'agriculture autrement. L\'hébergement était parfait et le repas délicieux !',
    quote_en: 'A magical place where you discover agriculture differently. The accommodation was perfect and the meal delicious!',
    image: 'Visite-Ferme-150x150.jpg',
  },
  {
    id: 3,
    name: 'Pasteur Houensou',
    role: 'Partenaire local',
    role_en: 'Local partner',
    quote: 'SAIN est un modèle pour notre communauté. Leur engagement envers le développement rural est exemplaire.',
    quote_en: 'SAIN is a model for our community. Their commitment to rural development is exemplary.',
    image: 'Sourire-Sain-150x150.jpg',
  },
]
