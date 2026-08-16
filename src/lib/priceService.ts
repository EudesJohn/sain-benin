import { supabase } from './supabase'

export interface Price {
  id?: string
  /** Identifiant stable (lignes semées) ou null pour une ligne ajoutée par l'admin */
  key: string | null
  /** Catégorie : 'room' / 'board' (hébergement), 'circuit', 'program', sinon '' */
  category: string
  title: string
  subtitle: string
  description: string
  price: string
  duration: string
  /** Une puce par ligne (séparées par des retours à la ligne) */
  details: string
  position: number
}

const PRICE_COLUMNS = 'id, key, category, title, subtitle, description, price, duration, details, position'

function toPrice(row: {
  id: string
  key: string | null
  category: string
  title: string
  subtitle: string
  description: string
  price: string
  duration: string
  details: string
  position: number
}): Price {
  return {
    id: row.id,
    key: row.key,
    category: row.category ?? '',
    title: row.title ?? '',
    subtitle: row.subtitle ?? '',
    description: row.description ?? '',
    price: row.price ?? '',
    duration: row.duration ?? '',
    details: row.details ?? '',
    position: row.position ?? 0,
  }
}

/** Prix/tarifs d'une section, triés par position */
export async function fetchSectionPrices(sectionSlug: string): Promise<Price[]> {
  if (!supabase) return []
  const { data: section } = await supabase
    .from('sections')
    .select('id')
    .eq('slug', sectionSlug)
    .maybeSingle()
  if (!section) return []

  const { data, error } = await supabase
    .from('prices')
    .select(PRICE_COLUMNS)
    .eq('section_id', section.id)
    .order('position', { ascending: true })
  if (error) {
    console.error('Erreur fetchSectionPrices:', error.message)
    return []
  }
  return (data ?? []).map(toPrice)
}

/** Crée ou met à jour un prix */
export async function upsertPrice(sectionSlug: string, price: Price): Promise<boolean> {
  if (!supabase) return false
  const { data: section } = await supabase
    .from('sections')
    .select('id')
    .eq('slug', sectionSlug)
    .maybeSingle()
  if (!section) return false

  const payload = {
    section_id: section.id,
    key: price.key,
    category: price.category,
    title: price.title,
    subtitle: price.subtitle,
    description: price.description,
    price: price.price,
    duration: price.duration,
    details: price.details,
    position: price.position,
  }

  if (price.id) {
    const { error } = await supabase.from('prices').update(payload).eq('id', price.id)
    if (error) console.error('Erreur upsertPrice (update):', error.message)
    return !error
  }

  const { error } = await supabase.from('prices').insert(payload)
  if (error) console.error('Erreur upsertPrice (insert):', error.message)
  return !error
}

/** Supprime un prix */
export async function deletePrice(id: string): Promise<boolean> {
  if (!supabase) return false
  const { error } = await supabase.from('prices').delete().eq('id', id)
  if (error) console.error('Erreur deletePrice:', error.message)
  return !error
}

/** Enregistre le nouvel ordre des prix (glisser-déposer) */
export async function reorderPrices(orderedPrices: Price[]): Promise<boolean> {
  if (!supabase) return false
  let ok = true
  for (let i = 0; i < orderedPrices.length; i++) {
    const price = orderedPrices[i]
    if (!price.id) continue
    const { error } = await supabase
      .from('prices')
      .update({ position: i })
      .eq('id', price.id)
    if (error) {
      console.error('Erreur reorderPrices:', error.message)
      ok = false
    }
  }
  return ok
}
