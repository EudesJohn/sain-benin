// Vérification des pages à tarifs après passage des prix en base (Chrome headless).
// Usage : node scripts/check-prices-pages.mjs
import puppeteer from 'puppeteer-core'

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4173'
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const ROUTES = ['/hebergement-ferme', '/circuits-decouverte', '/nous-soutenir']

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

for (const route of ROUTES) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  const pageErrors = []
  const consoleErrors = []
  page.on('pageerror', (err) => pageErrors.push(String(err)))
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  try {
    await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 20000 })
  } catch {
    // Certaines pages n'atteignent jamais « networkidle2 » (fonts, ressources externes)
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 20000 })
  }
  await new Promise((r) => setTimeout(r, 2500))

  const info = await page.evaluate(() => {
    const text = document.body.innerText
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim() ?? null,
      hasEmptyState: /aucun (tarif|circuit|programme) pour le moment/i.test(text),
      hasLoading: /chargement/i.test(text),
      hasFCFA: /FCFA/.test(text),
    }
  })
  console.log(`\n=== ${route}`)
  console.log(`  h1 : ${info.h1}`)
  console.log(`  état vide : ${info.hasEmptyState} | chargement : ${info.hasLoading} | FCFA affiché : ${info.hasFCFA}`)
  if (pageErrors.length) console.log(`  ⛔ erreurs JS : ${pageErrors.join(' | ')}`)
  const realErrors = consoleErrors.filter((e) => !/Failed to load resource/.test(e))
  if (realErrors.length) console.log(`  ⚠️ erreurs console : ${realErrors.slice(0, 3).join(' | ')}`)
  await page.close()
}

await browser.close()
console.log('\nTerminé.')
