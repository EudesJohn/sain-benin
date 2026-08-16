// Vérification responsive du site (Chrome headless) : débordement horizontal,
// erreurs JS et menu mobile sur plusieurs tailles d'écran.
// Usage : node scripts/check-responsive.mjs [BASE_URL]
import puppeteer from 'puppeteer-core'

const BASE = process.env.BASE_URL ?? process.argv[2] ?? 'https://sain-benin.vercel.app'
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const VIEWPORTS = [
  { name: 'Mobile 360', width: 360, height: 740 },
  { name: 'Mobile 390', width: 390, height: 844 },
  { name: 'Mobile 430', width: 430, height: 932 },
  { name: 'Tablette 768', width: 768, height: 1024 },
  { name: 'Tablette 1024', width: 1024, height: 768 },
  { name: 'Desktop 1280', width: 1280, height: 800 },
  { name: 'Desktop 1920', width: 1920, height: 1080 },
]

const ROUTES = [
  '/',
  '/projet-global',
  '/responsabilite-sociale',
  '/activites-sain',
  '/equipe-sain',
  '/formations',
  '/hebergement-ferme',
  '/restaurant',
  '/circuits-decouverte',
  '/production',
  '/nous-soutenir',
  '/galerie',
  '/contact',
  '/mentions-legales',
]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const problems = []

const load = async (page, url) => {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })
    return true
  } catch {
    // Deuxième tentative courte (serveur lent / cache froid)
    try {
      await page.goto(url, { waitUntil: 'commit', timeout: 10000 })
      return true
    } catch {
      return false
    }
  }
}

for (const vp of VIEWPORTS) {
  for (const route of ROUTES) {
    const page = await browser.newPage()
    await page.setViewport({ width: vp.width, height: vp.height })
    const pageErrors = []
    page.on('pageerror', (err) => pageErrors.push(String(err)))
    const loaded = await load(page, BASE + route)
    await new Promise((r) => setTimeout(r, 1800))

    const notLoaded = !loaded
    if (notLoaded) {
      problems.push(`[${vp.name}] ${route} → page non chargée (délai dépassé)`)
      await page.close()
      continue
    }

    const info = await page.evaluate(() => {
      const doc = document.documentElement
      const overflowX = doc.scrollWidth - doc.clientWidth
      // Éléments qui dépassent nettement à droite de l'écran
      const vw = window.innerWidth
      const offenders = []
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect()
        if (r.width > 0 && r.right > vw + 2 && r.left < vw - 2) {
          const cls = (el.className && typeof el.className === 'string') ? el.className.slice(0, 40) : ''
          offenders.push(`${el.tagName.toLowerCase()}${cls ? '.' + cls : ''}`)
          if (offenders.length >= 3) break
        }
      }
      return { overflowX, offenders, bodyTextLen: document.body.innerText.length }
    })

    const isMobile = vp.width < 768
    let menuOk = null
    if (isMobile && route === '/') {
      // Ouvre le menu mobile (bouton hamburger) et vérifie qu'il s'affiche sans débordement
      try {
        await page.click('button[aria-label="Ouvrir le menu"]')
        await new Promise((r) => setTimeout(r, 800))
        menuOk = await page.evaluate(() => {
          const menu = document.getElementById('mobile-menu')
          if (!menu) return 'menu introuvable'
          const r = menu.getBoundingClientRect()
          const doc = document.documentElement
          return r.left >= -1 && r.right <= window.innerWidth + 1 && doc.scrollWidth <= doc.clientWidth + 1
            ? 'ok'
            : `déborde (right=${Math.round(r.right)} vw=${window.innerWidth})`
        })
      } catch {
        menuOk = 'bouton introuvable'
      }
    }

    // Seul le débordement réel de la page compte (scrollWidth > clientWidth) :
    // les blobs décoratifs et les éléments en cours d'animation dépassent parfois
    // du viewport sans élargir la page (clippés par le wrapper overflow-x-hidden).
    const overflow = info.overflowX > 1
    if (overflow || pageErrors.length) {
      problems.push(
        `[${vp.name}] ${route} → débordementX=${info.overflowX}px, éléments=${info.offenders.join(', ') || 'aucun'}${pageErrors.length ? `, erreurs JS: ${pageErrors.join(' | ')}` : ''}${menuOk && menuOk !== 'ok' ? `, menu: ${menuOk}` : ''}`,
      )
    }
    if (menuOk && menuOk !== 'ok') {
      problems.push(`[${vp.name}] ${route} → menu mobile : ${menuOk}`)
    }
    await page.close()
  }
}

await browser.close()

if (problems.length === 0) {
  console.log(`✅ Aucun problème responsive détecté sur ${VIEWPORTS.length} tailles d'écran × ${ROUTES.length} pages.`)
} else {
  console.log(`⚠️ ${problems.length} problème(s) détecté(s) :\n`)
  for (const p of problems) console.log(`  - ${p}`)
}
