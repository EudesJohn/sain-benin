/**
 * Test bout-en-bout du remplacement d'une photo via l'admin connecté :
 *   1. Connexion sur /admin (email + mot de passe)
 *   2. Remplacement de la bannière d'accueil par une image de test (magenta)
 *   3. Vérification sur la page d'accueil que la nouvelle image s'affiche
 *   4. Restauration de la photo d'origine
 *   5. Nettoyage de l'objet de test dans le bucket
 *
 * Usage : node scripts/test-admin-replace.mjs
 * Variables : ADMIN_EMAIL, ADMIN_PASSWORD, BASE_URL (défaut http://127.0.0.1:5173)
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
if (!ADMIN_PASSWORD) {
  console.error('Usage : ADMIN_PASSWORD=… node scripts/test-admin-replace.mjs')
  process.exit(1)
}
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SHOT_DIR = path.join(ROOT, 'scripts')
const TEST_IMG = path.join(SHOT_DIR, 'test-remplacement.png')
const ORIG_IMG = path.join(ROOT, 'public/images/Riz-Sain-1024x743.jpg')

/* ── Localise Chrome (même logique que browser-check.mjs) ── */
const candidates = [
  '/c/Program Files/Google/Chrome/Application/chrome.exe',
  '/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/c/Users/Eudes Johnson/AppData/Local/Google/Chrome/Application/chrome.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
]
function findChrome() {
  for (const c of candidates) {
    try {
      fs.accessSync(c)
      return c
    } catch {
      /* suivant */
    }
  }
  try {
    return execFileSync('which', ['google-chrome']).toString().trim()
  } catch {
    throw new Error('Chrome introuvable')
  }
}

/* ── Génère une image PNG pleine couleur (magenta) sans dépendance ── */
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
  ihdr[8] = 8 // bit depth
  ihdr[9] = 2 // color type RGB
  const row = Buffer.alloc(1 + w * 3)
  for (let x = 0; x < w; x++) {
    row[1 + x * 3] = r
    row[2 + x * 3] = g
    row[3 + x * 3] = b
  }
  const raw = Buffer.concat(Array.from({ length: h }, () => row))
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/* ── Helpers ── */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function waitFor(fn, timeout = 30000, label = 'condition') {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      const v = await fn()
      if (v) return v
    } catch {
      /* réessayer */
    }
    await sleep(400)
  }
  throw new Error(`Timeout en attendant : ${label}`)
}

/* Trouve la carte d'emplacement par son libellé (ex. "Bannière d'accueil (héro)"), recherche fraîche */
async function cardByLabel(page, label) {
  const handle = await page.evaluateHandle((lbl) => {
    const p = [...document.querySelectorAll('p')].find((el) => el.textContent.trim().includes(lbl))
    return p ? p.closest('.bg-white.rounded-2xl.shadow-card') : null
  }, label)
  const isNull = await page.evaluate((el) => el === null, handle)
  return isNull ? null : handle
}

async function cardImgSrc(page, label) {
  const card = await cardByLabel(page, label)
  if (!card) return ''
  const src = await card.evaluate((el) => el.querySelector('img')?.getAttribute('src') ?? '')
  await card.dispose()
  return src
}

/* Remplace la photo d'un emplacement par un fichier local, attend le nouveau src */
async function replacePhoto(page, label, filePath, notUrl) {
  const card = await cardByLabel(page, label)
  if (!card) throw new Error(`Carte « ${label} » introuvable`)
  await card.evaluate((el) => {
    const btn = [...el.querySelectorAll('button')].find((b) => b.textContent.includes('Remplacer'))
    btn.click()
  })
  await sleep(300)
  const input = await card.$('input[type="file"]')
  if (!input) throw new Error('input file introuvable dans la carte')
  await input.uploadFile(filePath)
  await card.dispose()
  // Attend que l'image de la carte change vers une URL Supabase différente
  // (on re-interroge le DOM à chaque fois : React remplace les nœuds au re-rendu)
  return waitFor(async () => {
    const s = await cardImgSrc(page, label)
    return s && s.startsWith('http') && s !== notUrl ? s : null
  }, 30000, 'nouvelle URL après remplacement')
}

async function heroBg(page) {
  return page.evaluate(() => {
    const el = document.querySelector('[style*="background-image"]')
    return el ? (el.style.backgroundImage || '') : ''
  })
}

/* ── Déroulé ── */
const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const results = []
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  const consoleErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`))

  /* 1. Connexion admin */
  console.log('→ Connexion sur /admin …')
  await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle0', timeout: 30000 })
  await page.waitForSelector('#admin-email', { timeout: 10000 })
  await page.type('#admin-email', ADMIN_EMAIL)
  await page.type('#admin-password', ADMIN_PASSWORD)
  await page.click('form button[type="submit"]')
  await waitFor(async () => {
    const t = await page.evaluate(() => document.querySelector('h2')?.textContent ?? '')
    return t.includes('Photos —')
  }, 20000, 'tableau de bord après connexion')
  // Les cartes d'emplacements s'affichent après le fetch des photos : on attend
  await waitFor(() => page.evaluate(() => document.querySelectorAll('.bg-white.rounded-2xl.shadow-card').length > 0), 20000, 'cartes des emplacements')
  const h2 = await page.evaluate(() => document.querySelector('h2')?.textContent ?? '')
  console.log(`✅ Connecté — tableau de bord : « ${h2.trim()} »`)
  await page.screenshot({ path: path.join(SHOT_DIR, 'shots_admin_dashboard.png') })

  /* 2. Remplacement de la bannière d'accueil */
  const before = await cardImgSrc(page, 'Bannière d\u2019accueil')
  console.log(`→ Bannière actuelle : ${before}`)
  fs.writeFileSync(TEST_IMG, makePng(640, 360, [255, 0, 255]))
  const newUrl = await replacePhoto(page, 'Bannière d\u2019accueil', TEST_IMG, before)
  console.log(`✅ Remplacée par : ${newUrl}`)
  await page.screenshot({ path: path.join(SHOT_DIR, 'shots_admin_after_replace.png') })

  /* 3. Vérification sur la page d'accueil */
  console.log('→ Vérification sur la page d’accueil …')
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0', timeout: 30000 })
  const heroNew = await waitFor(async () => {
    const bg = await heroBg(page)
    return bg.includes(newUrl) ? bg : null
  }, 20000, 'hero avec la nouvelle image')
  console.log(`✅ La bannière du site affiche la nouvelle image`)
  await page.screenshot({ path: path.join(SHOT_DIR, 'shots_home_after_replace.png') })

  /* 4. Restauration de la photo d'origine */
  console.log('→ Restauration de la photo d’origine …')
  await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle0', timeout: 30000 })
  await waitFor(async () => {
    const t = await page.evaluate(() => document.querySelector('h2')?.textContent ?? '')
    return t.includes('Photos —')
  }, 20000, 'tableau de bord (retour)')
  await waitFor(() => page.evaluate(() => document.querySelectorAll('.bg-white.rounded-2xl.shadow-card').length > 0), 20000, 'cartes des emplacements (retour)')
  const restoredUrl = await replacePhoto(page, 'Bannière d\u2019accueil', ORIG_IMG, newUrl)
  console.log(`✅ Restaurée : ${restoredUrl}`)

  /* 5. Vérification de la restauration sur le site */
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0', timeout: 30000 })
  await waitFor(async () => {
    const bg = await heroBg(page)
    return bg.includes(restoredUrl) ? bg : null
  }, 20000, 'hero restauré')
  console.log('✅ Le site affiche de nouveau la photo d’origine')
  await page.screenshot({ path: path.join(SHOT_DIR, 'shots_home_restored.png') })

  /* 6. Nettoyage : supprime l'objet de test du bucket (session admin) */
  try {
    const token = await page.evaluate(() => {
      for (const k of Object.keys(localStorage)) {
        if (k.includes('auth-token')) {
          try {
            return JSON.parse(localStorage.getItem(k)).access_token
          } catch { /* continuer */ }
        }
      }
      return null
    })
    if (token && newUrl.includes('/storage/v1/object/public/photos/')) {
      const storagePath = newUrl.split('/storage/v1/object/public/photos/')[1].split('?')[0]
      const res = await page.evaluate(
        async ({ p, t }) => {
          const r = await fetch(`https://fcueevdczwwtpbozjpml.supabase.co/storage/v1/object/photos/${p}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${t}` },
          })
          return r.status
        },
        { p: storagePath, t: token },
      )
      console.log(`🧹 Objet de test supprimé du bucket (statut ${res})`)
    }
  } catch (e) {
    console.log(`ℹ️ Nettoyage ignoré : ${e.message}`)
  }

  const errs = consoleErrors.filter((e) => !e.includes('videos') && !e.includes('404'))
  results.push(errs.length === 0 ? 'aucune erreur console inattendue' : `erreurs console : ${errs.join(' | ')}`)
  console.log(`\nBilan erreurs console : ${errs.length === 0 ? 'aucune inattendue ✅' : errs.join(' | ')}`)
} finally {
  await browser.close()
}
