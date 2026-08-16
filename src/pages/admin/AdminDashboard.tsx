import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reorder, useDragControls } from 'framer-motion'
import {
  LogOut,
  ImagePlus,
  Trash2,
  Upload,
  Save,
  Images,
  ArrowLeft,
  Loader2,
  ExternalLink,
  GripVertical,
  Plus,
  Video as VideoIcon,
  Check,
  Tag,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { SECTIONS, type SectionDef, type PhotoSlot } from '../../lib/sections'
import { defaultPhotos, type DefaultPhoto } from '../../lib/defaultPhotos'
import {
  fetchSectionPhotos,
  upsertPhoto,
  deletePhoto,
  uploadImage,
  reorderPhotos,
  type Photo,
} from '../../lib/photoService'
import {
  fetchSectionVideos,
  upsertVideo,
  deleteVideo,
  reorderVideos,
  extractYouTubeId,
  type Video,
} from '../../lib/videoService'
import PriceManager from './PriceManager'

/* ─────────────────────────────────────────────
   Carte d'un emplacement fixe (slot)
────────────────────────────────────────────── */
interface SlotCardProps {
  sectionSlug: string
  slot: PhotoSlot
  photo?: Photo
  defaultValue: DefaultPhoto | undefined
  onChanged: () => void
}

const SlotCard = ({ sectionSlug, slot, photo, defaultValue, onChanged }: SlotCardProps) => {
  const url = photo?.url || defaultValue?.url || ''
  const [alt, setAlt] = useState(photo?.alt ?? defaultValue?.alt ?? '')
  const [caption, setCaption] = useState(photo?.caption ?? defaultValue?.caption ?? '')
  const [busy, setBusy] = useState<'upload' | 'save' | 'delete' | null>(null)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const replace = async (file: File) => {
    setBusy('upload')
    const url = await uploadImage(file, sectionSlug)
    if (url) {
      await upsertPhoto(sectionSlug, {
        id: photo?.id,
        key: slot.key,
        url,
        alt,
        caption,
        position: photo?.position ?? 0,
      })
      onChanged()
    }
    setBusy(null)
  }

  const save = async () => {
    setBusy('save')
    const ok = await upsertPhoto(sectionSlug, {
      id: photo?.id,
      key: slot.key,
      url,
      alt,
      caption,
      position: photo?.position ?? 0,
    })
    setBusy(null)
    if (ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
    }
    onChanged()
  }

  const remove = async () => {
    if (!photo) return
    setBusy('delete')
    await deletePhoto(photo)
    setBusy(null)
    onChanged()
  }

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="relative aspect-video bg-earth-50 overflow-hidden">
        {url ? (
          <img src={url} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-earth-300">
            <Images className="w-10 h-10 mb-2" aria-hidden="true" />
            <span className="text-sm">Aucune photo</span>
          </div>
        )}
        <span
          className={`absolute top-2 left-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            photo ? 'bg-leaf-600 text-white' : 'bg-white/90 text-earth-600'
          }`}
        >
          {photo ? 'Personnalisée' : 'Photo par défaut'}
        </span>
        {busy === 'upload' && (
          <div className="absolute inset-0 bg-ink/50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <p className="text-sm font-semibold text-ink">{slot.label}</p>

        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          aria-label="Texte alternatif (alt)" placeholder="Texte alternatif (alt)"
          className="w-full px-3 py-2 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
        />
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          aria-label="Légende (optionnel)" placeholder="Légende (optionnel)"
          className="w-full px-3 py-2 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
        />

        <div className="flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) replace(file)
              e.target.value = ''
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy !== null}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-sun-600 hover:bg-earth-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2"
          >
            <Upload className="w-3.5 h-3.5" aria-hidden="true" />
            Remplacer
          </button>
          <button
            type="button"
            onClick={save}
            disabled={busy !== null}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-leaf-600 hover:bg-leaf-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2"
          >
            {busy === 'save' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
            ) : saved ? (
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Save className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            {busy === 'save' ? 'Enregistrement…' : saved ? 'Enregistré' : 'Enregistrer'}
          </button>
          {photo && (
            <button
              type="button"
              onClick={remove}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-red-50 hover:bg-red-100 disabled:opacity-60 text-red-700 rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              Supprimer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Photo libre de la galerie — ligne réordonnable par glisser-déposer
────────────────────────────────────────────── */
interface FreePhotoCardProps {
  sectionSlug: string
  photo: Photo
  index: number
  onChanged: () => void
}

const FreePhotoCard = ({ sectionSlug, photo, index, onChanged }: FreePhotoCardProps) => {
  const dragControls = useDragControls()
  const [alt, setAlt] = useState(photo.alt)
  const [caption, setCaption] = useState(photo.caption)
  const [busy, setBusy] = useState<'upload' | 'save' | 'delete' | null>(null)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const replace = async (file: File) => {
    setBusy('upload')
    const url = await uploadImage(file, sectionSlug)
    if (url) {
      await upsertPhoto(sectionSlug, { ...photo, url, alt, caption })
      onChanged()
    }
    setBusy(null)
  }

  const save = async () => {
    setBusy('save')
    const ok = await upsertPhoto(sectionSlug, { ...photo, alt, caption })
    setBusy(null)
    if (ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
    }
    onChanged()
  }

  const remove = async () => {
    setBusy('delete')
    await deletePhoto(photo)
    setBusy(null)
    onChanged()
  }

  return (
    <Reorder.Item value={photo} dragListener={false} dragControls={dragControls} className="list-none">
      <div className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col sm:flex-row">
        {/* Poignée de glisser-déposer */}
        <button
          type="button"
          onPointerDown={(e) => dragControls.start(e)}
          aria-label="Réordonner cette photo (glisser-déposer)"
          title="Glisser-déposer pour réordonner"
          className="touch-none flex items-center justify-center min-w-10 min-h-10 px-2 py-2 sm:py-0 text-earth-300 hover:text-ink cursor-grab active:cursor-grabbing transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2 rounded-lg"
        >
          <GripVertical className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Vignette */}
        <div className="relative w-full sm:w-44 h-44 sm:h-auto bg-earth-50 flex-shrink-0">
          <img src={photo.url} alt={alt} className="w-full h-full object-cover" />
          {busy === 'upload' && (
            <div className="absolute inset-0 bg-ink/50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Champs */}
        <div className="flex-1 min-w-0 p-4 space-y-3">
          <p className="text-xs font-semibold text-earth-700">Photo #{index + 1}</p>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            aria-label="Texte alternatif (alt)" placeholder="Texte alternatif (alt)"
            className="w-full px-3 py-2 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
          />
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            aria-label="Légende (optionnel)" placeholder="Légende (optionnel)"
            className="w-full px-3 py-2 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
          />
          <div className="flex items-center gap-2 flex-wrap">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) replace(file)
                e.target.value = ''
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-sun-600 hover:bg-earth-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2"
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              Remplacer
            </button>
            <button
              type="button"
              onClick={save}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-leaf-600 hover:bg-leaf-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2"
            >
              {busy === 'save' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              ) : saved ? (
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Save className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              {busy === 'save' ? 'Enregistrement…' : saved ? 'Enregistré' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={remove}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-red-50 hover:bg-red-100 disabled:opacity-60 text-red-700 rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}

/* ─────────────────────────────────────────────
   Vidéo de la galerie — ligne réordonnable par glisser-déposer
────────────────────────────────────────────── */
interface VideoCardProps {
  sectionSlug: string
  video: Video
  index: number
  onChanged: () => void
}

const VideoCard = ({ sectionSlug, video, index, onChanged }: VideoCardProps) => {
  const dragControls = useDragControls()
  const [title, setTitle] = useState(video.title)
  const [url, setUrl] = useState(video.youtubeId)
  const [busy, setBusy] = useState<'save' | 'delete' | null>(null)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const save = async () => {
    const youtubeId = extractYouTubeId(url)
    if (!youtubeId) {
      setError('URL ou ID YouTube invalide')
      return
    }
    setError(null)
    setBusy('save')
    const ok = await upsertVideo(sectionSlug, { ...video, youtubeId, title: title.trim() || youtubeId })
    setBusy(null)
    if (ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
      onChanged()
    }
  }

  const remove = async () => {
    setBusy('delete')
    await deleteVideo(video.id)
    setBusy(null)
    onChanged()
  }

  return (
    <Reorder.Item value={video} dragListener={false} dragControls={dragControls} className="list-none">
      <div className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col sm:flex-row">
        {/* Poignée de glisser-déposer */}
        <button
          type="button"
          onPointerDown={(e) => dragControls.start(e)}
          aria-label="Réordonner cette vidéo (glisser-déposer)"
          title="Glisser-déposer pour réordonner"
          className="touch-none flex items-center justify-center min-w-10 min-h-10 px-2 py-2 sm:py-0 text-earth-300 hover:text-ink cursor-grab active:cursor-grabbing transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2 rounded-lg"
        >
          <GripVertical className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Vignette YouTube */}
        <div className="relative w-full sm:w-44 aspect-video sm:h-auto bg-ink/5 flex-shrink-0 overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Champs */}
        <div className="flex-1 min-w-0 p-4 space-y-3">
          <p className="text-xs font-semibold text-earth-700">Vidéo #{index + 1}</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Titre de la vidéo" placeholder="Titre de la vidéo"
            className="w-full px-3 py-2 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
          />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-label="URL YouTube ou ID (ex. https://youtu.be/…)"
            placeholder="URL YouTube ou ID (ex. https://youtu.be/…)"
            className="w-full px-3 py-2 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
          />
          {error && <p className="text-xs text-red-700">{error}</p>}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={save}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-leaf-600 hover:bg-leaf-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2"
            >
              {busy === 'save' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              ) : saved ? (
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Save className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              {busy === 'save' ? 'Enregistrement…' : saved ? 'Enregistré' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={remove}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-10 text-xs font-semibold bg-red-50 hover:bg-red-100 disabled:opacity-60 text-red-700 rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}

/* ─────────────────────────────────────────────
   Tableau de bord
────────────────────────────────────────────── */
const AdminDashboard = () => {
  const [sectionSlug, setSectionSlug] = useState<string>(SECTIONS[0].slug)
  const [rows, setRows] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const addFileRef = useRef<HTMLInputElement>(null)
  const [adding, setAdding] = useState(false)
  const [tab, setTab] = useState<'media' | 'prices'>('media')

  const section: SectionDef = SECTIONS.find((s) => s.slug === sectionSlug) ?? SECTIONS[0]

  const reload = useCallback(async () => {
    setLoading(true)
    const fetched = await fetchSectionPhotos(sectionSlug)
    setRows(fetched)
    setLoading(false)
  }, [sectionSlug])

  // Vidéos (galerie) — ajout, modification, suppression, réordonnancement
  const [videos, setVideos] = useState<Video[]>([])
  const [videoOrder, setVideoOrder] = useState<Video[]>([])
  const [newVideoTitle, setNewVideoTitle] = useState('')
  const [newVideoUrl, setNewVideoUrl] = useState('')
  const [videoError, setVideoError] = useState<string | null>(null)
  const [addingVideo, setAddingVideo] = useState(false)

  const loadVideos = useCallback(async () => {
    const fetched = await fetchSectionVideos(sectionSlug)
    setVideos(fetched)
    setVideoOrder([...fetched].sort((a, b) => a.position - b.position))
  }, [sectionSlug])

  const handleVideoReorder = (next: Video[]) => {
    const updated = next.map((v, i) => ({ ...v, position: i }))
    setVideoOrder(updated)
    reorderVideos(updated).then((ok) => {
      if (!ok) loadVideos()
    })
  }

  const addVideo = async () => {
    const youtubeId = extractYouTubeId(newVideoUrl)
    if (!youtubeId) {
      setVideoError('URL ou ID YouTube invalide')
      return
    }
    setVideoError(null)
    setAddingVideo(true)
    const maxPosition = videos.reduce((max, v) => Math.max(max, v.position), -1)
    const ok = await upsertVideo(sectionSlug, {
      youtubeId,
      title: newVideoTitle.trim() || youtubeId,
      position: maxPosition + 1,
    })
    setAddingVideo(false)
    if (ok) {
      setNewVideoTitle('')
      setNewVideoUrl('')
      loadVideos()
    }
  }

  useEffect(() => {
    reload()
    if (section.hasVideos) loadVideos()
  }, [reload, loadVideos, section.hasVideos])

  const logout = async () => {
    await supabase?.auth.signOut()
  }

  const addPhoto = async (file: File) => {
    setAdding(true)
    const url = await uploadImage(file, sectionSlug)
    if (url) {
      const maxPosition = rows.reduce((max, p) => Math.max(max, p.position), -1)
      await upsertPhoto(sectionSlug, {
        key: null,
        url,
        alt: file.name.replace(/\.[^.]+$/, ''),
        caption: '',
        position: maxPosition + 1,
      })
      reload()
    }
    setAdding(false)
  }

  const defaults = defaultPhotos[sectionSlug] ?? {}

  // Ordre des photos libres (galerie) — réordonnable par glisser-déposer
  const [freeOrder, setFreeOrder] = useState<Photo[]>([])
  useEffect(() => {
    setFreeOrder([...rows.filter((p) => !p.key)].sort((a, b) => a.position - b.position))
  }, [rows])

  const handleReorder = (next: Photo[]) => {
    // Position mise à jour sur chaque photo pour rester cohérent avec la base
    const updated = next.map((p, i) => ({ ...p, position: i }))
    setFreeOrder(updated)
    reorderPhotos(updated).then((ok) => {
      if (ok) {
        setRows((prev) => prev.map((p) => updated.find((n) => n.id === p.id) ?? p))
      } else {
        reload()
      }
    })
  }

  return (
    <div className="min-h-screen bg-earth-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-earth-900 to-earth-950 text-white sticky top-0 z-20">
        <div className="container mx-auto px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sun-600 flex items-center justify-center">
              <Images className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display font-bold leading-tight">Gestion du site</h1>
              <p className="text-xs text-earth-300">Zone d'administration SAIN</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-earth-200 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-400 focus-visible:ring-offset-2 rounded-lg"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              Voir le site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Onglets */}
      <div className="bg-white border-b border-earth-200">
        <div className="container mx-auto px-4 lg:px-6 flex gap-2 py-3">
          <button
            type="button"
            onClick={() => setTab('media')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2 ${
              tab === 'media' ? 'bg-leaf-600 text-white shadow-card' : 'text-ink-soft hover:bg-earth-50 hover:text-ink'
            }`}
          >
            <Images className="w-4 h-4" aria-hidden="true" />
            Photos & vidéos
          </button>
          <button
            type="button"
            onClick={() => setTab('prices')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2 ${
              tab === 'prices' ? 'bg-leaf-600 text-white shadow-card' : 'text-ink-soft hover:bg-earth-50 hover:text-ink'
            }`}
          >
            <Tag className="w-4 h-4" aria-hidden="true" />
            Prix & tarifs
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar : sections */}
        <aside>
          <p className="text-xs font-semibold uppercase tracking-wider text-earth-600 mb-3 px-3">
            Sections du site
          </p>
          <nav className="space-y-1">
            {SECTIONS.map((s) => {
              const count = s.slug === sectionSlug ? rows.length : 0
              const active = s.slug === sectionSlug
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setSectionSlug(s.slug)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    active
                      ? 'bg-leaf-600 text-white shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-600 focus-visible:ring-offset-2'
                      : 'text-ink-soft hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2'
                  }`}
                >
                  <span>{s.name}</span>
                  {active && count > 0 && (
                    <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">{count}</span>
                  )}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Contenu */}
        <main>
          {tab === 'prices' ? (
            <PriceManager sectionSlug={sectionSlug} />
          ) : (
            <>
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div>
              <h2 className="text-2xl font-display font-bold text-ink">
                Photos — {section.name}
              </h2>
              <p className="text-sm text-ink-soft">
                Remplacez, modifiez ou supprimez les photos de cette section. Les changements
                sont visibles immédiatement sur le site.
              </p>
            </div>
            {section.freePhotos && (
              <>
                <input
                  ref={addFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) addPhoto(file)
                    e.target.value = ''
                  }}
                />
                <button
                  type="button"
                  onClick={() => addFileRef.current?.click()}
                  disabled={adding}
                  className="inline-flex items-center gap-2 px-5 py-2.5 min-h-10 text-sm font-semibold bg-sun-600 hover:bg-earth-700 disabled:opacity-60 text-white rounded-full transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2"
                >
                  {adding ? (
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <ImagePlus className="w-4 h-4" aria-hidden="true" />
                  )}
                  Ajouter une photo
                </button>
              </>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24 text-ink-soft">
              <Loader2 className="w-6 h-6 animate-spin mr-3" aria-hidden="true" />
              Chargement…
            </div>
          ) : (
            <div className="space-y-10">
              {/* Emplacements fixes */}
              <div>
                <h3 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
                  <Images className="w-5 h-5 text-sun-600" aria-hidden="true" />
                  Emplacements de la section
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {section.slots.map((slot) => (
                    <SlotCard
                      key={slot.key}
                      sectionSlug={sectionSlug}
                      slot={slot}
                      photo={rows.find((p) => p.key === slot.key)}
                      defaultValue={defaults[slot.key]}
                      onChanged={reload}
                    />
                  ))}
                </div>
              </div>

              {/* Photos libres (galerie) */}
              {section.freePhotos && freeOrder.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
                    <ImagePlus className="w-5 h-5 text-sun-600" aria-hidden="true" />
                    Photos de la galerie
                  </h3>
                  <p className="text-sm text-ink-soft mb-4">
                    Glissez-déposez les photos pour les réordonner — l'ordre est enregistré
                    automatiquement et s'applique sur la page Galerie.
                  </p>
                  <Reorder.Group
                    axis="y"
                    values={freeOrder}
                    onReorder={handleReorder}
                    className="space-y-4"
                  >
                    {freeOrder.map((photo, index) => (
                      <FreePhotoCard
                        key={photo.id}
                        sectionSlug={sectionSlug}
                        photo={photo}
                        index={index}
                        onChanged={reload}
                      />
                    ))}
                  </Reorder.Group>
                </div>
              )}

              {/* Vidéos (galerie) */}
              {section.hasVideos && (
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
                    <VideoIcon className="w-5 h-5 text-sun-600" aria-hidden="true" />
                    Vidéos de la galerie
                  </h3>
                  <p className="text-sm text-ink-soft mb-4">
                    Collez une URL YouTube (watch, youtu.be, shorts…) ou un ID de vidéo.
                    Glissez-déposez pour réordonner — l'ordre est enregistré automatiquement
                    et s'applique sur la page Galerie.
                  </p>

                  {/* Formulaire d'ajout */}
                  <div className="bg-white rounded-2xl shadow-card p-4 mb-4 flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={newVideoTitle}
                      onChange={(e) => setNewVideoTitle(e.target.value)}
                      aria-label="Titre de la vidéo" placeholder="Titre de la vidéo"
                      className="flex-1 px-3 py-2.5 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
                    />
                    <input
                      type="text"
                      value={newVideoUrl}
                      onChange={(e) => setNewVideoUrl(e.target.value)}
                      aria-label="URL YouTube ou ID" placeholder="URL YouTube ou ID"
                      className="flex-1 px-3 py-2.5 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addVideo()
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={addVideo}
                      disabled={addingVideo}
                      className="inline-flex items-center gap-2 px-5 py-2.5 min-h-10 text-sm font-semibold bg-sun-600 hover:bg-earth-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2"
                    >
                      {addingVideo ? (
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <Plus className="w-4 h-4" aria-hidden="true" />
                      )}
                      Ajouter
                    </button>
                  </div>
                  {videoError && (
                    <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-4">
                      {videoError}
                    </p>
                  )}

                  {videoOrder.length > 0 ? (
                    <Reorder.Group
                      axis="y"
                      values={videoOrder}
                      onReorder={handleVideoReorder}
                      className="space-y-4"
                    >
                      {videoOrder.map((video, index) => (
                        <VideoCard
                          key={video.id ?? video.youtubeId}
                          sectionSlug={sectionSlug}
                          video={video}
                          index={index}
                          onChanged={loadVideos}
                        />
                      ))}
                    </Reorder.Group>
                  ) : (
                    <p className="text-sm text-ink-soft">
                      Aucune vidéo pour le moment — ajoutez-en une ci-dessus.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-earth-600 hover:text-leaf-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Retour au site
            </Link>
          </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
