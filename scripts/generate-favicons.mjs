// Génération des favicons SAIN à partir du logo (Chrome headless + canvas).
// Usage : node scripts/generate-favicons.mjs
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LOGO_SRC = join(ROOT, 'public/images/Petit-Logo-SAIN.png')
const OUT_DIR = join(ROOT, 'public')
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

// Tailles générées : [fichier, taille]
const SIZES = [
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['favicon-192x192.png', 192],
  ['favicon-512x512.png', 512],
]

const logoBase64 = (await readFile(LOGO_SRC)).toString('base64')

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const page = await browser.newPage()
  const result = await page.evaluate(
    async ({ logoBase64, SIZES }) => {
      const logo = new Image()
      logo.src = 'data:image/png;base64,' + logoBase64
      await logo.decode()

      // Bordures réelles du logo (détourage de la transparence)
      const probe = document.createElement('canvas')
      probe.width = logo.naturalWidth
      probe.height = logo.naturalHeight
      const pctx = probe.getContext('2d')
      pctx.drawImage(logo, 0, 0)
      const data = pctx.getImageData(0, 0, probe.width, probe.height).data
      let minX = probe.width, minY = probe.height, maxX = 0, maxY = 0
      for (let y = 0; y < probe.height; y++) {
        for (let x = 0; x < probe.width; x++) {
          if (data[(y * probe.width + x) * 4 + 3] > 8) {
            if (x < minX) minX = x
            if (x > maxX) maxX = x
            if (y < minY) minY = y
            if (y > maxY) maxY = y
          }
        }
      }
      const trim = { minX, minY, maxX, maxY, w: maxX - minX + 1, h: maxY - minY + 1 }

      // Recadre le logo sur ses bords réels
      const crop = document.createElement('canvas')
      crop.width = trim.w
      crop.height = trim.h
      crop.getContext('2d').drawImage(probe, trim.minX, trim.minY, trim.w, trim.h, 0, 0, trim.w, trim.h)

      const files = {}
      for (const [name, size] of SIZES) {
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        // Marge de sécurité ~7 % autour du logo
        const margin = Math.round(size * 0.07)
        const avail = size - margin * 2
        const scale = Math.min(avail / trim.w, avail / trim.h)
        const dw = Math.round(trim.w * scale)
        const dh = Math.round(trim.h * scale)
        ctx.drawImage(crop, (size - dw) / 2, (size - dh) / 2, dw, dh)
        files[name] = canvas.toDataURL('image/png').split(',')[1]
      }
      return { trim, files }
    },
    { logoBase64, SIZES },
  )

  console.log(
    `Logo source : ${SIZES[0][1]}px cible — bords réels détourés : ${result.trim.w}x${result.trim.h} ` +
      `(source ${'554x469'})`,
  )
  for (const [name] of SIZES) {
    await writeFile(join(OUT_DIR, name), Buffer.from(result.files[name], 'base64'))
    console.log(`  ✓ public/${name}`)
  }
} finally {
  await browser.close()
}
