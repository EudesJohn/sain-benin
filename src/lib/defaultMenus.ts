// Menus par défaut du site, par section.
// Ce sont les menus actuellement en dur dans les pages : ils servent de repli
// tant qu'aucun menu n'a été enregistré dans Supabase.

export interface DefaultMenuCategory {
  name: string
  items: string[]
}

export const defaultMenus: Record<string, DefaultMenuCategory[]> = {
  restaurant: [
    {
      name: 'Entrées',
      items: ['Salade verte', 'Soupe du jour', 'Salade de papaye verte'],
    },
    {
      name: 'Plats Principaux',
      items: ['Riz SAIN (riz de la ferme)', 'Poulet rôti', 'Poisson grillé', 'Lapin braisé'],
    },
    {
      name: 'Accompagnements',
      items: ['Légumes de saison', 'Purée de manioc', 'Gari'],
    },
    {
      name: 'Desserts',
      items: ['Confiture maison', 'Jus de papaye', 'Fromage de coco'],
    },
  ],
}
