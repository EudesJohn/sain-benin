import { supabase } from './supabase'
import { getSectionId } from './photoService'

export interface MenuItem {
  id?: string
  name: string
  name_en: string
  position: number
}

export interface MenuCategory {
  id?: string
  name: string
  name_en: string
  position: number
  items: MenuItem[]
}

const CATEGORY_COLUMNS = 'id, section_id, name, name_en, position'
const ITEM_COLUMNS = 'id, category_id, name, name_en, position'

interface CategoryRow {
  id: string
  name: string
  name_en?: string
  position: number
}

interface ItemRow {
  id: string
  category_id: string
  name: string
  name_en?: string
  position: number
}

function toCategory(row: CategoryRow): MenuCategory {
  return { id: row.id, name: row.name ?? '', name_en: row.name_en ?? '', position: row.position ?? 0, items: [] }
}

function toItem(row: ItemRow): MenuItem {
  return { id: row.id, name: row.name ?? '', name_en: row.name_en ?? '', position: row.position ?? 0 }
}

/** Localise un élément de menu selon la langue */
export function localizeMenuItem(item: MenuItem, lang: string): MenuItem {
  if (lang === 'en') {
    return { ...item, name: item.name_en || item.name }
  }
  return item
}

/** Localise une catégorie de menu selon la langue */
export function localizeMenuCategory(cat: MenuCategory, lang: string): MenuCategory {
  if (lang === 'en') {
    return {
      ...cat,
      name: cat.name_en || cat.name,
      items: cat.items.map((i) => localizeMenuItem(i, lang)),
    }
  }
  return cat
}

/** Catégories et plats d'une section, groupés et triés par position */
export async function fetchSectionMenus(sectionSlug: string): Promise<MenuCategory[]> {
  if (!supabase) return []
  const sectionId = await getSectionId(sectionSlug)
  if (!sectionId) return []

  const { data: categories, error: catError } = await supabase
    .from('menu_categories')
    .select(CATEGORY_COLUMNS)
    .eq('section_id', sectionId)
    .order('position', { ascending: true })
  if (catError) {
    console.error('Erreur fetchSectionMenus (catégories):', catError.message)
    return []
  }

  const { data: items, error: itemError } = await supabase
    .from('menu_items')
    .select(ITEM_COLUMNS)
    .order('position', { ascending: true })
  if (itemError) {
    console.error('Erreur fetchSectionMenus (plats):', itemError.message)
    return []
  }

  return (categories ?? []).map((row) => ({
    ...toCategory(row),
    items: (items ?? [])
      .filter((i) => i.category_id === row.id)
      .map(toItem),
  }))
}

/** Crée ou met à jour une catégorie de menu */
export async function upsertMenuCategory(
  sectionSlug: string,
  category: { id?: string; name: string; name_en?: string; position: number },
): Promise<boolean> {
  if (!supabase) return false
  const sectionId = await getSectionId(sectionSlug)
  if (!sectionId) return false

  const payload = {
    section_id: sectionId,
    name: category.name,
    name_en: category.name_en ?? '',
    position: category.position,
  }

  if (category.id) {
    const { error } = await supabase.from('menu_categories').update(payload).eq('id', category.id)
    if (error) console.error('Erreur upsertMenuCategory (update):', error.message)
    return !error
  }

  const { error } = await supabase.from('menu_categories').insert(payload)
  if (error) console.error('Erreur upsertMenuCategory (insert):', error.message)
  return !error
}

/** Supprime une catégorie de menu (et tous ses plats, par cascade) */
export async function deleteMenuCategory(id: string): Promise<boolean> {
  if (!supabase) return false
  const { error } = await supabase.from('menu_categories').delete().eq('id', id)
  if (error) console.error('Erreur deleteMenuCategory:', error.message)
  return !error
}

/** Enregistre le nouvel ordre des catégories */
export async function reorderMenuCategories(
  ordered: { id?: string; position: number }[],
): Promise<boolean> {
  if (!supabase) return false
  let ok = true
  for (let i = 0; i < ordered.length; i++) {
    const category = ordered[i]
    if (!category.id) continue
    const { error } = await supabase
      .from('menu_categories')
      .update({ position: i })
      .eq('id', category.id)
    if (error) {
      console.error('Erreur reorderMenuCategories:', error.message)
      ok = false
    }
  }
  return ok
}

/**
 * Crée ou met à jour un plat dans une catégorie.
 * Renvoie l'id du plat (le nouvel id après insertion, ou l'id existant après
 * mise à jour), ou null en cas d'erreur.
 */
export async function upsertMenuItem(
  categoryId: string,
  item: { id?: string; name: string; name_en?: string; position: number },
): Promise<string | null> {
  if (!supabase) return null

  const payload = {
    category_id: categoryId,
    name: item.name,
    name_en: item.name_en ?? '',
    position: item.position,
  }

  if (item.id) {
    const { error } = await supabase.from('menu_items').update(payload).eq('id', item.id)
    if (error) console.error('Erreur upsertMenuItem (update):', error.message)
    return error ? null : item.id
  }

  const { data, error } = await supabase.from('menu_items').insert(payload).select('id').single()
  if (error) {
    console.error('Erreur upsertMenuItem (insert):', error.message)
    return null
  }
  return data?.id ?? null
}

/** Supprime un plat */
export async function deleteMenuItem(id: string): Promise<boolean> {
  if (!supabase) return false
  const { error } = await supabase.from('menu_items').delete().eq('id', id)
  if (error) console.error('Erreur deleteMenuItem:', error.message)
  return !error
}

/** Enregistre le nouvel ordre des plats d'une catégorie */
export async function reorderMenuItems(ordered: { id?: string; position: number }[]): Promise<boolean> {
  if (!supabase) return false
  let ok = true
  for (let i = 0; i < ordered.length; i++) {
    const item = ordered[i]
    if (!item.id) continue
    const { error } = await supabase
      .from('menu_items')
      .update({ position: i })
      .eq('id', item.id)
    if (error) {
      console.error('Erreur reorderMenuItems:', error.message)
      ok = false
    }
  }
  return ok
}
