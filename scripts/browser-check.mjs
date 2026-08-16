// Vérification navigateur de la zone admin et des pages publiques (Chrome headless).
// Usage : node scripts/browser-check.mjs [--login-email x] [--login-password y]
import puppeteer from 'puppeteer-core'

// 127.0.0.1 (et non localhost) pour éviter qu'un autre serveur écoute sur ::1
const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:5173'
const CHROME =
  process.env.CHROME_PATH ??
  'C:/Program Files/Google/Chrome/Application/chrome.exe'

const args = process.argv.slice(2)
const loginEmail = args.includes('--login-email') ? args[args.indexOf('--login-email') + 1] : null
const loginPassword = args.includes('--login-password') ? args[args.indexOf('--login-password') + 1] : null

const ROUTES = ['/', '/admin', '/galerie', '/equipe-sain', '/production']

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const report = []

async function checkRoute(route) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  const consoleErrors = []
  const pageErrors = []
  const failedRequests = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => pageErrors.push(String(err)))
  page.on('requestfailed', (req) =>
    failedRequests.push(`${req.url()} :: ${req.failure()?.errorText ?? ''}`),
  )

  try {
    await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 30000 })
  } catch (e) {
    report.push(`\n=== ${route} — ÉCHEC de navigation : ${e.message}`)
    await page.close()
    return
  }
  await sleep(1800)

  const info = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')]
    const broken = imgs
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.getAttribute('src'))
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim() ?? null,
      imgs: imgs.length,
      brokenImgs: broken,
      bodyPreview: document.body.innerText.slice(0, 200).replace(/\s+/g, ' '),
    }
  })

  report.push(`\n=== ${route}`)
  report.push(`  titre : ${info.title}`)
  report.push(`  h1    : ${info.h1}`)
  report.push(`  images: ${info.imgs} (${info.brokenImgs.length} cassées)`)
  if (info.brokenImgs.length) report.push(`  cassées: ${info.brokenImgs.join(', ')}`)
  if (pageErrors.length) report.push(`  ⛔ erreurs JS : ${pageErrors.join(' | ')}`)
  if (consoleErrors.length) report.push(`  ⚠️ erreurs console : ${consoleErrors.join(' | ')}`)
  if (failedRequests.length) report.push(`  ⚠️ requêtes échouées : ${failedRequests.slice(0, 5).join(' | ')}`)

  // Screenshots
  const shot = `scripts/shots${route.replace(/\//g, '_') || '_home'}.png`
  await page.screenshot({ path: shot, fullPage: false })
  report.push(`  📷 ${shot}`)
  await page.close()
}

// --- Route admin : test du formulaire de connexion ---
async function checkAdminLogin() {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  const consoleErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  await page.goto(BASE + '/admin', { waitUntil: 'networkidle2', timeout: 30000 })
  await sleep(1200)

  const hasEmail = (await page.$('#admin-email')) !== null
  const hasPassword = (await page.$('#admin-password')) !== null
  const submit = (await page.$('button[type="submit"]')) !== null
  report.push(`\n=== /admin (formulaire de connexion)`)
  report.push(`  champ email: ${hasEmail ? 'oui' : 'NON'} | champ mdp: ${hasPassword ? 'oui' : 'NON'} | bouton: ${submit ? 'oui' : 'NON'}`)

  const body = await page.evaluate(() => document.body.innerText)
  report.push(`  contenu : ${body.slice(0, 150).replace(/\s+/g, ' ')}`)
  await page.screenshot({ path: 'scripts/shots_admin_login.png' })
  report.push(`  📷 scripts/shots_admin_login.png`)

  if (consoleErrors.length) report.push(`  ⚠️ erreurs console : ${consoleErrors.join(' | ')}`)

  // Test de connexion avec de mauvais identifiants → vérifie que Supabase Auth répond
  if (hasEmail && hasPassword && submit) {
    await page.type('#admin-email', loginEmail ?? 'test@example.com')
    await page.type('#admin-password', loginPassword ?? 'motdepasse-incorrect')
    await page.click('button[type="submit"]')
    await sleep(3000)
    const after = await page.evaluate(() => document.body.innerText)
    if (after.includes('Email ou mot de passe incorrect')) {
      report.push(`  ✅ Supabase Auth répond : message « Email ou mot de passe incorrect » affiché`)
    } else if (after.includes('Administration')) {
      report.push(`  ℹ️ Après tentative : toujours sur la page de connexion (aucun message)`)
    } else {
      report.push(`  ⚠️ Après tentative, contenu inattendu : ${after.slice(0, 120).replace(/\s+/g, ' ')}`)
    }
  }
  await page.close()
}

for (const route of ROUTES) {
  await checkRoute(route)
}
await checkAdminLogin()

await browser.close()
console.log(report.join('\n'))
