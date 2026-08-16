import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'

/**
 * État de connexion de l'admin (session Supabase Auth).
 * Retourne { session, loading, configured }.
 */
export function useAdminAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }
    let active = true
    supabase!.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session)
    })
    const { data: subscription } = supabase!.auth.onAuthStateChange((_event, newSession) => {
      if (active) setSession(newSession)
    })
    setLoading(false)
    return () => {
      active = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  return { session, loading, configured: isSupabaseConfigured }
}
