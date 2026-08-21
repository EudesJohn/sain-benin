import { supabase } from './supabase'
import { useTranslation } from 'react-i18next'
import { logError } from './logger'

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
  // Champs bilingues
  title_en: string
  subtitle_en: string
  price_en: string
  description_en: string
  details_en: string
}

const PRICE_COLUMNS = 'id, key, category, title, subtitle, description, price, duration, details, position, title_en, subtitle_en, price_en, description_en, details_en'

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
  title_en?: string
  subtitle_en?: string
  price_en?: string
  description_en?: string
  details_en?: string
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
    title_en: row.title_en ?? '',
    subtitle_en: row.subtitle_en ?? '',
    price_en: row.price_en ?? '',
    description_en: row.description_en ?? '',
    details_en: row.details_en ?? '',
  }
}

/** Localise un prix selon la langue courante */
export function localizePrice(price: Price, lang: string): Price {
  if (lang === 'en') {
    return {
      ...price,
      title: price.title_en || price.title,
      subtitle: price.subtitle_en || price.subtitle,
      price: price.price_en || price.price,
      description: price.description_en || price.description,
      details: price.details_en || price.details,
    }
  }
  return price
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
    logError('Erreur fetchSectionPrices:', error.message)
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
    title_en: price.title_en,
    subtitle_en: price.subtitle_en,
    price_en: price.price_en,
    description_en: price.description_en,
    details_en: price.details_en,
  }

  if (price.id) {
    const { error } = await supabase.from('prices').update(payload).eq('id', price.id)
    if (error) logError('Erreur upsertPrice (update):', error.message)
    return !error
  }

  const { error } = await supabase.from('prices').insert(payload)
  if (error) logError('Erreur upsertPrice (insert):', error.message)
  return !error
}

/** Supprime un prix */
export async function deletePrice(id: string): Promise<boolean> {
  if (!supabase) return false
  const { error } = await supabase.from('prices').delete().eq('id', id)
  if (error) logError('Erreur deletePrice:', error.message)
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
      logError('Erreur reorderPrices:', error.message)
      ok = false
    }
  }
  return ok
}
