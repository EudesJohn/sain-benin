import { useCallback, useEffect, useState } from 'react'
import { fetchSectionPrices, type Price } from '../lib/priceService'

export interface SectionPrices {
  /** Prix/tarifs de la section, triés par position */
  prices: Price[]
  loading: boolean
  reload: () => void
}

/**
 * Prix d'une section : charge depuis Supabase. Sans Supabase configuré
 * (ou table non alimentée), la liste est vide — les pages affichent alors
 * un état vide. Les tarifs ne sont plus du tout codés en dur dans le site.
 */
export function useSectionPrices(sectionSlug: string): SectionPrices {
  const [prices, setPrices] = useState<Price[]>([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(() => {
    let cancelled = false
    setLoading(true)
    fetchSectionPrices(sectionSlug)
      .then((rows) => {
        if (!cancelled) setPrices(rows)
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

  return { prices, loading, reload }
}
