# ADR-012: Menus du restaurant — gestion depuis l'administration

## Status
Accepté

## Contexte
Le menu de la page Restaurant (`src/pages/Restaurant.tsx`) était codé en dur dans le composant
(`menuCategories` : Entrées, Plats Principaux, Accompagnements, Desserts). Toute modification
du menu nécessitait une intervention de développement et un redéploiement.

Par ailleurs, l'hébergement et les photos (« Nos produits ») étaient déjà gérables depuis la
zone d'administration `/admin` (tables `prices` et `photos`), mais pas les menus.

## Décision
Rendre les menus du restaurant modifiables depuis l'administration, sur le même modèle que les
photos et les prix :

- **Table `menu_categories`** : une ligne par catégorie (nom + position), rattachée à une section.
- **Table `menu_items`** : une ligne par plat, rattachée à une catégorie (nom + position) ;
  suppression d'une catégorie par cascade (`on delete cascade`).
- **`src/lib/menuService.ts`** : lecture, création, modification, suppression et réordonnancement.
- **Onglet « Menus »** dans l'admin (`MenuManager.tsx`), visible sur la section Restaurant :
  ajout / renommage / suppression / glisser-déposer des catégories et des plats.
- **Page Restaurant** : lecture depuis Supabase via `useSectionMenus`, avec repli sur le menu
  par défaut (`src/lib/defaultMenus.ts`) tant qu'aucun menu n'est enregistré.

## Alternatives considérées

| Option | Avantages | Inconvénients | Décision |
|--------|-----------|---------------|----------|
| **Menus codés en dur** (avant) | Simple, aucun backend | Non modifiable sans déploiement | ❌ Rejeté |
| **Table unique `menus`** (catégorie + plat par ligne) | Une seule table, proche du pattern `prices` | Renommage/ajout de catégorie vide complexes | ⚠️ Envisagé |
| **`menu_categories` + `menu_items`** | Catégories vides possibles, renommage simple, cascade | Deux tables | ✅ Retenu |

## Conséquences
- L'équipe SAIN peut mettre à jour le menu sans redéployer le site.
- Le menu par défaut reste affiché si Supabase n'est pas configuré ou si la table est vide.
- Le script `supabase/setup.sql` reste idempotent : le seed des menus ne s'insère que si la
  section ou la catégorie n'a encore aucune ligne.

## Related ADRs
- [002-vue-densemble-architecture](002-vue-densemble-architecture.md) — données côté Supabase
- [008-palette-couleurs-terreuses](008-palette-couleurs-terreuses.md) — design system de l'admin
