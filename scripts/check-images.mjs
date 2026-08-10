// Diagnostic : compare chaque référence d'image du code aux fichiers réels de public/images.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'

const root = 'D:/ferme/sain-modern'
const imgDir = join(root, 'public/images')

// 1) Noms de fichiers réels
const realFiles = readdirSync(imgDir).filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
const realLookup = new Set(realFiles)
const realNFC = new Set(realFiles.map((f) => f.normalize('NFC')))
const realNFD = new Set(realFiles.map((f) => f.normalize('NFD')))

// 2) Tous les fichiers de code
function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'dist' || e.name === '.git') continue
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, acc)
    else if (/\.(tsx?|jsx?|ts|css|html)$/.test(e.name)) acc.push(p)
  }
  return acc
}
const codeFiles = [...walk(join(root, 'src')), join(root, 'index.html')]

// 3) Extraire les références /images/... (et noms nus relatifs dans les data)
const re = /['"](\/images\/[^'"]+|(?:[A-Za-zÀ-ÿ0-9 _%-]+\.(?:jpe?g|png|webp|gif)))['"]/g

const missing = new Map() // ref -> raison
const seen = new Set()
const refsByFile = new Map() // fichier -> [refs manquantes]

for (const file of codeFiles) {
  let src = ''
  try { src = readFileSync(file, 'utf8') } catch { continue }
  const m = src.matchAll(re)
  for (const match of m) {
    let ref = match[1]
    if (ref.includes('://') || ref.includes('data:')) continue
    if (!/(\.(jpe?g|png|webp|gif))$/i.test(ref)) continue
    const key = file + '::' + ref
    if (seen.has(key)) continue
    seen.add(key)

    const bare = ref.startsWith('/images/') ? ref.slice('/images/'.length) : ref
    const bareClean = bare.split('/').pop()
    if (realLookup.has(bareClean)) continue

    // essai NFC / NFD
    const hasNFC = realNFC.has(bareClean.normalize('NFC'))
    const hasNFD = realNFD.has(bareClean.normalize('NFD'))
    if (hasNFC || hasNFD) {
      const note = hasNFC !== hasNFD ? (hasNFC ? 'origine : NFC' : 'origine : NFD') : 'NFC+NFD'
      if (!missing.has(bareClean)) missing.set(bareClean, `${note} — “${bareClean}”`)
      if (!refsByFile.has(file)) refsByFile.set(file, [])
      refsByFile.get(file).push(bareClean)
      continue
    }
    if (!missing.has(bareClean)) missing.set(bareClean, `INTROUVABLE — “${bareClean}”`)
    if (!refsByFile.has(file)) refsByFile.set(file, [])
    refsByFile.get(file).push(bareClean)
  }
}

// 4) Détection d'ambiguités : un même nom en NFC et NFD simultanément
const dupes = []
for (const f1 of realFiles) {
  for (const f2 of realFiles) {
    if (f1 !== f2 && f1.normalize('NFC') === f2.normalize('NFC')) {
      dupes.push([f1, f2])
    }
  }
}

console.log(`Fichiers images réels : ${realFiles.length}`)
console.log(`Références uniques trouvées dans le code : ${seen.size}`)
console.log('--- Introuvables / ambiguës ---')
if (missing.size === 0) console.log('(aucune)')
for (const [name, reason] of missing) console.log(`• ${reason}`)
for (const [file, refs] of refsByFile) {
  const rel = file.replace(root + '/', '')
  console.log(`   dans ${rel}: ${[...new Set(refs)].join(' | ')}`)
}
console.log('--- Doublons NFC/NFD sur disque ---')
if (dupes.length === 0) console.log('(aucun)')
for (const [a, b] of dupes) console.log(`${a}  <=>  ${b}`)