import { supabase } from './supabase'
import { getSectionId } from './photoService'
import { logError } from './logger'

export interface Video {
  id?: string
  youtubeId: string
  title: string
  position: number
}

const VIDEO_COLUMNS = 'id, youtube_id, title, position'

function toVideo(row: {
  id: string
  youtube_id: string
  title: string
  position: number
}): Video {
  return {
    id: row.id,
    youtubeId: row.youtube_id,
    title: row.title ?? '',
    position: row.position ?? 0,
  }
}

/**
 * Extrait l'ID YouTube depuis une URL (watch, youtu.be, embed, shorts…) ou un ID brut.
 */
export function extractYouTubeId(input: string): string | null {
  const trimmed = input.trim()
  if (!trimmed) return null
  // ID brut (11 caractères)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  return match ? match[1] : null
}

/** Vidéos d'une section, triées par position */
export async function fetchSectionVideos(sectionSlug: string): Promise<Video[]> {
  if (!supabase) return []
  const sectionId = await getSectionId(sectionSlug)
  if (!sectionId) return []
  const { data, error } = await supabase
    .from('videos')
    .select(VIDEO_COLUMNS)
    .eq('section_id', sectionId)
    .order('position', { ascending: true })
  if (error) {
    logError('Erreur fetchSectionVideos:', error.message)
    return []
  }
  return (data ?? []).map(toVideo)
}

/** Crée ou met à jour une vidéo */
export async function upsertVideo(sectionSlug: string, video: Video): Promise<boolean> {
  if (!supabase) return false
  const sectionId = await getSectionId(sectionSlug)
  if (!sectionId) return false

  const payload = {
    section_id: sectionId,
    youtube_id: video.youtubeId,
    title: video.title,
    position: video.position,
  }

  if (video.id) {
    const { error } = await supabase.from('videos').update(payload).eq('id', video.id)
    if (error) logError('Erreur upsertVideo (update):', error.message)
    return !error
  }

  const { error } = await supabase.from('videos').insert(payload)
  if (error) logError('Erreur upsertVideo (insert):', error.message)
  return !error
}

/** Supprime une vidéo */
export async function deleteVideo(id?: string): Promise<boolean> {
  if (!supabase || !id) return false
  const { error } = await supabase.from('videos').delete().eq('id', id)
  if (error) logError('Erreur deleteVideo:', error.message)
  return !error
}

/** Enregistre le nouvel ordre des vidéos */
export async function reorderVideos(orderedVideos: Video[]): Promise<boolean> {
  if (!supabase) return false
  let ok = true
  for (let i = 0; i < orderedVideos.length; i++) {
    const video = orderedVideos[i]
    if (!video.id) continue
    const { error } = await supabase
      .from('videos')
      .update({ position: i })
      .eq('id', video.id)
    if (error) {
      logError('Erreur reorderVideos:', error.message)
      ok = false
    }
  }
  return ok
}
