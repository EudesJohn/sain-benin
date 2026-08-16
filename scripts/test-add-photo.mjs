/**
 * Test d'ajout de photo libre dans une section (ex. Accueil) :
 *   1. Connexion admin
 *   2. Vérifie la présence du bouton « Ajouter une photo » sur une section non-galerie
 *   3. Ajoute une photo de test (magenta)
 *   4. Vérifie que le bandeau de section l'affiche sur le site
 *   5. Supprime la photo de test (retour à l'état initial)
 *
 * Usage : ADMIN_PASSWORD=… node scripts/test-add-photo.mjs
 */
import puppeteer from 'puppeteer-core'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import zlib from 'node:zlib'

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:5173'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sainbenin@yahoo.fr'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SHOT_DIR = path.join(ROOT, 'scripts')
const TEST_IMG = path.join(SHOT_DIR, 'test-section-photo.png')

if (!ADMIN_PASSWORD) {
  console.error('Usage : ADMIN_PASSWORD=… node scripts/test-add-photo.mjs')
  process.exit(1)
}

const candidates = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Users/Eudes Johnson/AppData/Local/Google/Chrome/Application/chrome.exe',
]
const exe = candidates.find((c) => { try { fs.accessSync(c); return true } catch { return false } })
if (!exe) throw new Error('Chrome introuvable')

function crc32(buf) {
  let table = crc32.table
  if (!table) {
    table = crc32.table = new Int32Array(256)
    for (let n = 0; n < 256; n++) {
      let c = n
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      table[n] = c
    }
  }
  let crc = -1
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff]
  return (crc ^ -1) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}
function makePng(w, h, [r, g, b]) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0)
  ihdr.writeUInt32BE(h, 4)
  ihdr[8] = 8
  ihdr[9] = 2
  const row = Buffer.alloc(1 + w * 3)
  for (let x = 0; x < w; x++) { row[1 + x * 3] = r; row[2 + x * 3] = g; row[3 + x * 3] = b }
  const raw = Buffer.concat(Array.from({ length: h }, () => row))
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function waitFor(fn, timeout = 30000, label = 'condition') {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try { const v = await fn(); if (v) return v } catch { /* réessayer */ }
    await sleep(400)
  }
  throw new Error(`Timeout : ${label}`)
}

const browser = await puppeteer.launch({ executablePath: exe, headless: 'new', args: ['--no-sandbox'] })
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })

  /* 1. Connexion */
  await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle0', timeout: 30000 })
  await page.waitForSelector('#admin-email')
  await page.type('#admin-email', ADMIN_EMAIL)
  await page.type('#admin-password', ADMIN_PASSWORD)
  await page.click('form button[type="submit"]')
  await waitFor(() => page.evaluate(() => document.querySelector('h2')?.textContent.includes('Photos —')), 20000, 'tableau de bord')

  /* 2. Bouton « Ajouter une photo » présent sur Accueil ? */
  const addBtn = await page.evaluate(() =>
    [...document.querySelectorAll('button')].some((b) => b.textContent.includes('Ajouter une photo')),
  )
  console.log(`→ Bouton « Ajouter une photo » sur la section Accueil : ${addBtn ? '✅ présent' : '❌ absent'}`)
  if (!addBtn) throw new Error('Bouton absent — freePhotos non activé')

  /* 3. Ajout d'une photo de test */
  fs.writeFileSync(TEST_IMG, makePng(400, 300, [0, 128, 255]))
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find((b) => b.textContent.includes('Ajouter une photo'))
    btn.click()
  })
  await sleep(300)
  const fileInput = await page.$('input[type="file"]')
  await fileInput.uploadFile(TEST_IMG)
  // Attend l'apparition d'une carte de photo libre (badge + image Supabase)
  const addedUrl = await waitFor(async () => {
    return page.evaluate(() => {
      const imgs = [...document.querySelectorAll('main img')]
      const src = imgs.find((i) => i.getAttribute('src')?.startsWith('http') && i.getAttribute('src')?.includes('/accueil/'))
      return src?.getAttribute('src') ?? null
    })
  }, 30000, 'photo ajoutée dans l’admin')
  console.log(`✅ Photo ajoutée : ${addedUrl}`)
  await page.screenshot({ path: path.join(SHOT_DIR, 'shots_admin_section_add.png') })

  /* 4. Vérification sur la page d'accueil (bandeau de section) */
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0', timeout: 30000 })
  const onSite = await waitFor(async () => {
    return page.evaluate((u) => {
      const imgs = [...document.querySelectorAll('img')]
      return imgs.some((i) => i.getAttribute('src') === u) ? u : null
    }, addedUrl)
  }, 25000, 'photo affichée dans le bandeau du site')
  console.log('✅ Le bandeau de la page d’accueil affiche la photo ajoutée')
  await page.screenshot({ path: path.join(SHOT_DIR, 'shots_home_section_strip.png') })

  /* 5. Suppression de la photo de test */
  await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle0', timeout: 30000 })
  await waitFor(() => page.evaluate(() => document.querySelector('h2')?.textContent.includes('Photos —')), 20000, 'tableau de bord (retour)')
  const removed = await page.evaluate(async () => {
    const card = [...document.querySelectorAll('.bg-white.rounded-2xl.shadow-card')].find((el) =>
      el.querySelector('img')?.getAttribute('src')?.includes('/accueil/'),
    )
    if (!card) return false
    const btn = [...card.querySelectorAll('button')].find((b) => b.textContent.includes('Supprimer'))
    btn.click()
    return true
  })
  await waitFor(async () => {
    const stillThere = await page.evaluate(() =>
      [...document.querySelectorAll('main img')].some((i) => i.getAttribute('src')?.includes('/accueil/')),
    )
    return !stillThere
  }, 25000, 'photo supprimée de l’admin')
  console.log('✅ Photo de test supprimée (retour à l’état initial)')
  console.log('ℹ️ L’objet stocké reste dans le bucket (suppression bénigne).')
} finally {
  await browser.close()
}
