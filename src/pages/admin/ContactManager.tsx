import { useCallback, useEffect, useState } from 'react'
import {
  Phone,
  Mail,
  Globe,
  Save,
  Loader2,
  Check,
  Info,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface ContactField {
  key: string
  label: string
  value: string
  icon: React.ReactNode
  placeholder: string
}

/* ─────────────────────────────────────────────
   Ligne de champ contact — éditable
────────────────────────────────────────────── */
interface ContactFieldRowProps {
  field: ContactField
  onChanged: () => void
}

const ContactFieldRow = ({ field, onChanged }: ContactFieldRowProps) => {
  const [value, setValue] = useState(field.value)
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setValue(field.value)
  }, [field.value])

  const save = async () => {
    if (!supabase) return
    setBusy(true)
    const { error } = await supabase
      .from('contact_info')
      .upsert({ key: field.key, value: value.trim(), label: field.label }, { onConflict: 'key' })
    setBusy(false)
    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
      onChanged()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4">
      <div className="flex items-center gap-3 min-w-[200px]">
        <div className="w-10 h-10 rounded-xl bg-earth-100 flex items-center justify-center text-earth-500">
          {field.icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{field.label}</p>
          <p className="text-xs text-ink-soft">{field.key}</p>
        </div>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label={field.label}
        placeholder={field.placeholder}
        className="flex-1 min-w-0 px-3 py-2.5 text-sm border border-earth-200 rounded-lg focus:ring-2 focus:ring-sun-500 focus:border-transparent transition-[border-color,box-shadow] duration-200"
      />
      <button
        type="button"
        onClick={save}
        disabled={busy}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-10 text-xs font-semibold bg-leaf-600 hover:bg-leaf-700 disabled:opacity-60 text-white rounded-lg transition-[background-color] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2"
      >
        {busy ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : saved ? (
          <Check className="w-3.5 h-3.5" />
        ) : (
          <Save className="w-3.5 h-3.5" />
        )}
        {busy ? 'Enregistrement...' : saved ? 'Enregistre' : 'Enregistrer'}
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Gestionnaire de contacts
────────────────────────────────────────────── */
interface ContactManagerProps {
  /** Forcer le rechargement après modification */
  onContactChanged?: () => void
}

const ContactManager = ({ onContactChanged }: ContactManagerProps) => {
  const [fields, setFields] = useState<ContactField[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!supabase) {
      setLoading(false)
      return
    }
    setLoading(true)
    const { data } = await supabase
      .from('contact_info')
      .select('key, value, label')
      .order('key')
    if (data) {
      const mapped: ContactField[] = data.map((row) => ({
        key: row.key,
        label: row.label,
        value: row.value,
        icon: getIcon(row.key),
        placeholder: getPlaceholder(row.key),
      }))
      setFields(mapped)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleChanged = () => {
    load()
    onContactChanged?.()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-ink-soft">
        <Loader2 className="w-6 h-6 animate-spin mr-3" />
        Chargement...
      </div>
    )
  }

  if (fields.length === 0) {
    return (
      <div className="flex items-start gap-3 bg-white rounded-2xl shadow-card p-6 text-ink-soft">
        <Info className="w-5 h-5 text-sun-600 flex-shrink-0" />
        <p className="text-sm">
          Aucune information de contact trouvee. Assurez-vous d'avoir execute le script SQL
          d'initialisation (add-contact-info.sql).
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-ink flex items-center gap-2">
          <Phone className="w-6 h-6 text-sun-600" />
          Informations de contact
        </h2>
        <p className="text-sm text-ink-soft">
          Modifiez les numeros de telephone, l'adresse email et les liens reseaux sociaux.
          Les changements sont visibles immediatement sur le site.
        </p>
      </div>

      <div className="space-y-3">
        {fields.map((field) => (
          <ContactFieldRow
            key={field.key}
            field={field}
            onChanged={handleChanged}
          />
        ))}
      </div>

      <div className="bg-earth-50 rounded-2xl p-4 text-sm text-ink-soft">
        <p className="font-semibold text-ink mb-1">Notes importantes :</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Pour le WhatsApp, saisissez le numero complet avec l'indicatif (ex. +229 01 95 40 54 33)</li>
          <li>Pour les reseaux sociaux, saisissez l'URL complete du profil</li>
          <li>Les champs vides seront remplaces par les valeurs par defaut</li>
        </ul>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Helpers
────────────────────────────────────────────── */
function getIcon(key: string) {
  switch (key) {
    case 'whatsapp':
    case 'mobile':
      return <Phone className="w-5 h-5" />
    case 'email':
      return <Mail className="w-5 h-5" />
    default:
      return <Globe className="w-5 h-5" />
  }
}

function getPlaceholder(key: string): string {
  switch (key) {
    case 'whatsapp':
      return '+229 01 95 40 54 33'
    case 'mobile':
      return '+229 97 65 56 28'
    case 'email':
      return 'sainbenin@yahoo.fr'
    case 'facebook':
      return 'https://www.facebook.com/...'
    case 'youtube':
      return 'https://www.youtube.com/...'
    case 'instagram':
      return 'https://www.instagram.com/...'
    default:
      return ''
  }
}

export default ContactManager
