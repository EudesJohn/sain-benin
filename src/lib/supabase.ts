import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/** true si le site est configuré avec Supabase (URL + clé anon) */
export const isSupabaseConfigured = Boolean(url && anonKey)

/** Client Supabase — null tant que les variables d'environnement ne sont pas définies */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null

/** Bucket de stockage des photos */
export const PHOTOS_BUCKET = 'photos'
