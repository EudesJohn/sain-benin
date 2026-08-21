import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchSectionPrices, localizePrice, type Price } from '../lib/priceService'

export interface SectionPrices {
  /** Prix/tarifs de la section, localisés selon la langue courante, triés par position */
  prices: Price[]
  /** Prix bruts (non localisés, pour l'admin) */
  rawPrices: Price[]
  loading: boolean
  reload: () => void
}

/**
 * Prix d'une section : charge depuis Supabase. Sans Supabase configuré
 * (ou table non alimentée), la liste est vide — les pages affichent alors
 * un état vide. Les tarifs ne sont plus du tout codés en dur dans le site.
 */
export function useSectionPrices(sectionSlug: string): SectionPrices {
  const [rawPrices, setRawPrices] = useState<Price[]>([])
  const [loading, setLoading] = useState(true)
  const { i18n } = useTranslation()
  const lang = i18n.language?.split('-')[0] || 'fr'

  const reload = useCallback(() => {
    let cancelled = false
    setLoading(true)
    fetchSectionPrices(sectionSlug)
      .then((rows) => {
        if (!cancelled) setRawPrices(rows)
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

  // Localiser les prix selon la langue courante
  const prices = rawPrices.map((p) => localizePrice(p, lang))

  return { prices, rawPrices, loading, reload }
}
