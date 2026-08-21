import { useCallback, useEffect, useState } from 'react'
import { fetchSectionMenus, type MenuCategory } from '../lib/menuService'

export interface SectionMenus {
  /** Catégories et plats de la section, triés par position */
  categories: MenuCategory[]
  loading: boolean
  reload: () => void
}

/**
 * Menus d'une section : charge depuis Supabase (table `menu_categories` +
 * `menu_items`). Sans Supabase configuré, la liste est vide — les pages
 * affichent alors leur menu par défaut.
 */
export function useSectionMenus(sectionSlug: string): SectionMenus {
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(() => {
    let cancelled = false
    setLoading(true)
    fetchSectionMenus(sectionSlug)
      .then((rows) => {
        if (!cancelled) setCategories(rows)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [sectionSlug])

  useEffect(() => {
    const cancel = reload()
    return cancel
  }, [reload])

  return { categories, loading, reload }
}
