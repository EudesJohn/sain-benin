// Migration ponctuelle : téléverse les images locales (public/images) vers le bucket
// Supabase « photos » puis met à jour les URLs de la table photos.
//
// Usage (la clé service_role n'est utilisée que localement, jamais dans le frontend) :
//   SUPABASE_SERVICE_ROLE_KEY=eyJ... node scripts/upload-images.mjs
//
// ⚠️ Après utilisation, pensez à régénérer la clé service_role dans le dashboard
//    (Settings → API → Roll service_role key) si elle a circulé.

import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://fcueevdczwwtpbozjpml.supabase.co'
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SERVICE_KEY) {
  console.error('Manque la variable SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const sb = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })
const BUCKET = 'photos'
const PREFIX = 'site'
const IMAGES_DIR = path.resolve('public/images')

const MIME = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  avif: 'image/avif',
  svg: 'image/svg+xml',
}

// ── 1. Bucket ──
const { data: buckets } = await sb.storage.listBuckets()
if (!buckets?.some((b) => b.id === BUCKET)) {
  const { error } = await sb.storage.createBucket(BUCKET, { public: true })
  if (error) {
    console.error('Création du bucket impossible :', error.message)
    process.exit(1)
  }
  console.log(`Bucket « ${BUCKET} » créé`)
}

// ── 2. Téléversement des fichiers locaux ──
const files = fs
  .readdirSync(IMAGES_DIR)
  .filter((f) => fs.statSync(path.join(IMAGES_DIR, f)).isFile())

// Les clés du bucket n'acceptent pas les caractères accentués : on les translittère (é→e…)
const sanitize = (name) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const urlMap = {} // filename (avec ou sans accent) → URL publique
let uploaded = 0
let failed = 0
for (const file of files) {
  const body = fs.readFileSync(path.join(IMAGES_DIR, file))
  const ext = file.split('.').pop()?.toLowerCase() ?? ''
  let key = file
  let dest = `${PREFIX}/${key}`
  let { error } = await sb.storage.from(BUCKET).upload(dest, body, {
    upsert: true,
    contentType: MIME[ext] ?? 'application/octet-stream',
  })
  if (error && /Invalid key/i.test(error.message)) {
    key = sanitize(file)
    dest = `${PREFIX}/${key}`
    ;({ error } = await sb.storage.from(BUCKET).upload(dest, body, {
      upsert: true,
      contentType: MIME[ext] ?? 'application/octet-stream',
    }))
  }
  if (error) {
    console.error(`  ÉCHEC téléversement : ${file} — ${error.message}`)
    failed++
    continue
  }
  urlMap[file] = sb.storage.from(BUCKET).getPublicUrl(dest).data.publicUrl
  uploaded++
}
console.log(`\nTéléversés : ${uploaded}/${files.length} (${failed} échecs)`)

// ── 3. Mise à jour des URLs dans la table photos ──
const { data: rows, error: fetchErr } = await sb.from('photos').select('id, url')
if (fetchErr) {
  console.error('Lecture de la table photos impossible :', fetchErr.message)
  process.exit(1)
}

let updated = 0
let unchanged = 0
const missing = new Set()
for (const row of rows) {
  const m = row.url?.match(/^\/images\/(.+)$/)
  if (!m) {
    unchanged++ // déjà une URL externe (ou vide)
    continue
  }
  const filename = m[1]
  const newUrl = urlMap[filename]
  if (!newUrl) {
    missing.add(row.url)
    continue
  }
  const { error } = await sb.from('photos').update({ url: newUrl }).eq('id', row.id)
  if (error) {
    console.error(`  ÉCHEC mise à jour ${row.url} — ${error.message}`)
  } else {
    updated++
  }
}
console.log(`Lignes photos mises à jour : ${updated} (${unchanged} déjà en externe)`)
if (missing.size > 0) {
  console.log(`\n⚠️ Références sans fichier local (non migrées) :\n  ${[...missing].join('\n  ')}`)
}

console.log('\nTerminé.')
