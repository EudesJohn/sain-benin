// Vérification du déploiement : logo footer, absence de Bawete, service worker.
// Usage : node scripts/verify-deploy.mjs
import puppeteer from 'puppeteer-core'

const BASE = process.env.BASE_URL ?? 'https://sain-benin.vercel.app'
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })

  for (const route of ['/', '/contact', '/mentions-legales']) {
    await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 30000 })
    await new Promise((r) => setTimeout(r, 1500))

    const info = await page.evaluate(() => {
      const footer = document.querySelector('footer')
      const footerImg = footer?.querySelector('img[alt="SAIN Ferme École Bio"]')
      const body = document.body.innerText
      return {
        route: location.pathname,
        footerLogoOk: !!footerImg && footerImg.naturalWidth > 0,
        footerLogoLoaded: footerImg ? footerImg.complete && footerImg.naturalWidth > 0 : false,
        footerTextHasBawete: /bawete/i.test(body),
        footerTextHasSAIN: /SAIN/i.test(footer?.innerText ?? ''),
        swSupported: 'serviceWorker' in navigator,
      }
    })
    console.log(`\n=== ${info.route}`)
    console.log(`  logo footer visible : ${info.footerLogoOk}`)
    console.log(`  texte « Bawete » présent : ${info.footerTextHasBawete}`)
    console.log(`  « SAIN » dans le footer : ${info.footerTextHasSAIN}`)
  }

  // Service worker : attendre qu'il prenne le contrôle
  const swPage = await browser.newPage()
  await swPage.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 3000))
  const sw = await swPage.evaluate(async () => {
    const regs = await navigator.serviceWorker.getRegistrations()
    return {
      count: regs.length,
      scope: regs.map((r) => r.scope),
      active: regs.map((r) => (r.active ? r.active.scriptURL : null)),
      controlled: !!navigator.serviceWorker.controller,
    }
  })
  console.log(`\n=== Service worker`)
  console.log(`  enregistrements : ${sw.count} (scope ${sw.scope.join(', ')})`)
  console.log(`  actif : ${sw.active.join(', ')}`)
  console.log(`  page contrôlée : ${sw.controlled}`)
} finally {
  await browser.close()
}
