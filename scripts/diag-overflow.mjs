// Diagnostique le débordement horizontal : remonte à l'élément le plus large.
// Usage : node scripts/diag-overflow.mjs [route] [width] [height]
import puppeteer from 'puppeteer-core'

const BASE = 'https://sain-benin.vercel.app'
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const [route = '/projet-global', width = 390, height = 844] = process.argv.slice(2)

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: Number(width), height: Number(height) })
try {
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 15000 })
} catch {
  await page.goto(BASE + route, { waitUntil: 'load', timeout: 10000 })
}
await new Promise((r) => setTimeout(r, 3000))

const info = await page.evaluate(() => {
  const vw = window.innerWidth
  const doc = document.documentElement
  const overflowX = doc.scrollWidth - doc.clientWidth
  // Tous les éléments dont le bord droit dépasse, classés par excès décroissant
  const offenders = []
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect()
    if (r.width > 0 && r.right > vw + 2) {
      const cls = typeof el.className === 'string' ? el.className : ''
      const anim = el.getAnimations?.().map((a) => a.playState) ?? []
      offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: cls.slice(0, 80),
        right: Math.round(r.right),
        over: Math.round(r.right - vw),
        w: Math.round(r.width),
        left: Math.round(r.left),
        transform: getComputedStyle(el).transform,
        animState: anim.join(','),
      })
    }
  }
  offenders.sort((a, b) => b.over - a.over)
  return { vw, overflowX, count: offenders.length, top: offenders.slice(0, 8) }
})
console.log(`route=${route} vw=${info.vw} scrollWidth-overflow=${info.overflowX}px, ${info.count} éléments`)
for (const o of info.top) {
  console.log(`  right=${o.right} (excès ${o.over}px) w=${o.w} left=${o.left} <${o.tag} class="${o.cls}"> transform=${o.transform} anim=${o.animState}`)
}
await browser.close()
