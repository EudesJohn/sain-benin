import { useEffect, useState } from 'react'
import { fetchSectionVideos, type Video } from '../lib/videoService'
import { defaultVideos } from '../lib/defaultVideos'
import { isSupabaseConfigured } from '../lib/supabase'

export interface SectionVideos {
  /** Vidéos de la section, triées par position */
  videos: Video[]
  /** true pendant le chargement depuis Supabase */
  loading: boolean
}

/**
 * Vidéos d'une section : charge depuis Supabase et retombe sur les défauts locaux
 * si Supabase n'est pas configuré (ou s'il n'y a aucune vidéo en base).
 */
export function useSectionVideos(sectionSlug: string): SectionVideos {
  const [remote, setRemote] = useState<Video[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    if (!isSupabaseConfigured) {
      setRemote(null)
      setLoading(false)
      return
    }
    setLoading(true)
    fetchSectionVideos(sectionSlug)
      .then((rows) => {
        if (!cancelled) setRemote(rows)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [sectionSlug])

  let videos: Video[]
  if (remote && remote.length > 0) {
    videos = [...remote].sort((a, b) => a.position - b.position)
  } else {
    videos = (defaultVideos[sectionSlug] ?? []).map((v, i) => ({
      youtubeId: v.youtubeId,
      title: v.title,
      position: i,
    }))
  }

  return { videos, loading }
}
