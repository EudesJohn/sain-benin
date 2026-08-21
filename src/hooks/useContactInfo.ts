import { useEffect, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export interface ContactInfo {
  whatsapp: string
  mobile: string
  email: string
  facebook: string
  youtube: string
  instagram: string
}

const DEFAULTS: ContactInfo = {
  whatsapp: '+229 01 95 40 54 33',
  mobile: '+229 97 65 56 28',
  email: 'sainbenin@yahoo.fr',
  facebook: 'https://www.facebook.com/Ferme-Ecole-SAIN-108352284147580/',
  youtube: 'https://www.youtube.com/channel/UCN982W_xV7nRHt6aW1mAIwA',
  instagram: 'https://www.instagram.com/fermeecolesain/',
}

/** Récupère les infos de contact depuis Supabase (avec fallback sur les valeurs par défaut) */
export function useContactInfo(): ContactInfo {
  const [info, setInfo] = useState<ContactInfo>(DEFAULTS)

  const load = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) return
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('key, value')
      if (error || !data) return
      const map: Record<string, string> = {}
      for (const row of data) {
        map[row.key] = row.value
      }
      setInfo({
        whatsapp: map.whatsapp || DEFAULTS.whatsapp,
        mobile: map.mobile || DEFAULTS.mobile,
        email: map.email || DEFAULTS.email,
        facebook: map.facebook || DEFAULTS.facebook,
        youtube: map.youtube || DEFAULTS.youtube,
        instagram: map.instagram || DEFAULTS.instagram,
      })
    } catch {
      // En cas d'erreur, on garde les valeurs par défaut
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return info
}
