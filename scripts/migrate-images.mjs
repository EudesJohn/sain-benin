#!/usr/bin/env node
/**
 * Script de migration des images WordPress vers stockage local.
 * Usage: node scripts/migrate-images.mjs
 */
import fs from 'fs'
import path from 'path'

// Mapping manuel des URLs WordPress -> fichiers locaux
const urlToLocalMap = {
  // Hero backgrounds 1024x768
  'H%C3%A9bergement-Sain-1-1024x768.jpg': 'Hébergement-Sain-1-1024x768.jpg',
  'A-PROPOS-SAIN-1024x715.jpg': 'A-PROPOS-SAIN-1024x715.jpg',
  'Travaux-Ferme-1024x768.jpg': 'Travaux-Ferme-1024x768.jpg',
  'R%C3%A9fectoire-Sain-1024x788.jpg': 'Réfectoire-Sain-1-1024x788.jpg',
  'Engagement-Social-Sain-1024x768.jpg': 'Engagement-Social-Sain-1024x768.jpg',
  'Ecole-Sain-Arrosage-1-1024x867.jpg': 'Ecole-Sain-Arrosage-1-1024x867.jpg',
  'Equipe-Sain-1024x576.jpg': 'Equipe-Sain-1024x576.jpg',
  'H%C3%A9bergement-Sain-1024x768.jpg': 'Hébergement-Sain-1024x768.jpg',

  // Activity images
  'Fruits-Sain-1024x717.jpg': 'Fruits-Sain-1024x717.jpg',
  'Elevage-lapin-Sain-1024x806.jpg': 'Elevage-lapin-Sain-1024x806.jpg',
  'Riz-Sain-1024x743.jpg': 'Riz-Sain-1024x743.jpg',
  'Formation-Apiculture-1024x768.jpg': 'Formation-Apiculture-1024x768.jpg',
  'Etudiant-4-1024x683.jpg': 'Etudiant-4-1024x683.jpg',
  'Elevage-lapin-Sain-1-ppttcath31q2px8nshrlvos9qm29l1slvve3te99z8.jpg': 'Elevage-lapin-Sain-1-ppttcath31q2px8nshrlvos9qm29l1slvve3te99z8.jpg',

  // Product images
  'Restaurant-Sain-724x1024.png': 'Restaurant-Sain-724x1024.png',
  'Menu-Sain-724x923.png': 'Menu-Sain-724x923.png',
  'Jus-Papaye-pptte4m6dg8fix98abjpzs3jiia26t1ernt0f8t7eg.jpg': 'Jus-Papaye-pptte4m6dg8fix98abjpzs3jiia26t1ernt0f8t7eg.jpg',
  'Coco-Sain-pqky6e68slgnnf75o9nbc77z8q39mwqhem67maejzs.jpg': 'Coco-Sain-pqky6e68slgnnf75o9nbc77z8q39mwqhem67maejzs.jpg',
  'Transformation-Sain-scaled-ppv80oqfxx6h3rvytmqw5d3x1l4a33gz0hn2gwhgoo.jpg': 'Transformation-Sain-scaled-ppv80oqfxx6h3rvytmqw5d3x1l4a33gz0hn2gwhgoo.jpg',

  // Gallery 150x150 thumbnails (URL encoded names match)
  'Etudiants-Sain-150x150.jpg': 'Etudiants-Sain-150x150.jpg',
  'Fruits-Sain-150x150.jpg': 'Fruits-Sain-150x150.jpg',
  'Chambres-Sain-150x150.jpg': 'Chambres-Sain-150x150.jpg',
  'Compost-Sain-150x150.jpg': 'Compost-Sain-150x150.jpg',
  'Jardin-Sain-150x150.jpg': 'Jardin-Sain-150x150.jpg',
  'Hébergemnt-Sain-150x150.jpg': 'Hébergemnt-Sain-150x150.jpg',
  'Papaye-Sain-150x150.jpg': 'Papaye-Sain-150x150.jpg',
  'Equipe-Sain-150x150.jpg': 'Equipe-Sain-150x150.jpg',
  'Curcuma-Sain-150x150.jpg': 'Curcuma-Sain-150x150.jpg',
  'Arrosage-Etudiant-150x150.jpg': 'Arrosage-Etudiant-150x150.jpg',
  'Visite-Ferme-150x150.jpg': 'Visite-Ferme-150x150.jpg',
  'Hébergement-Sain-1-150x150.jpg': 'Hébergement-Sain-1-150x150.jpg',
  'Hébergement-2-150x150.jpg': 'Hébergement-2-150x150.jpg',
  'Hébergement-3-Sain-150x150.jpg': 'Hébergement-3-Sain-150x150.jpg',
  'Formation-Apiculture-150x150.jpg': 'Formation-Apiculture-150x150.jpg',
  'Etudiant-5-150x150.jpg': 'Etudiant-5-150x150.jpg',
  'Etudiant-7-150x150.jpg': 'Etudiant-7-150x150.jpg',
  'Randonnée-150x150.jpg': 'Randonnée-150x150.jpg',
  'Pirogue-150x114.jpg': 'Pirogue-150x114.jpg',
  'Palme-Sain-150x150.jpg': 'Palme-Sain-150x150.jpg',
  'Elevage-Poules-Sain-150x150.jpg': 'Elevage-Poules-Sain-150x150.jpg',
  'Accueil-Sain-150x150.jpg': 'Accueil-Sain-150x150.jpg',
  'Maraichage-4-150x150.jpg': 'Maraichage-4-150x150.jpg',
  'Maraichage-3-150x150.jpg': 'Maraichage-3-150x150.jpg',
  'Jardin3-Sain-150x150.jpg': 'Jardin3-Sain-150x150.jpg',
  'Engagement-2-Sain-150x150.jpg': 'Engagement-2-Sain-150x150.jpg',
  'Réagard-150x150.jpg': 'Réagard-150x150.jpg',
  'Repiquage-Sain-1-150x150.jpg': 'Repiquage-Sain-1-150x150.jpg',
  'Enfants-à-la-ferme-1-150x150.jpg': 'Enfants-à-la-ferme-1-150x150.jpg',
  'Diplôme-Sain-150x150.jpg': 'Diplôme-Sain-150x150.jpg',
  'Lapins-Elevage-150x150.jpg': 'Lapins-Elevage-150x150.jpg',
  'Plastique-Sain-150x150.jpg': 'Plastique-Sain-150x150.jpg',
  'sain5-150x150.jpg': 'sain5-150x150.jpg',
  'Réfectoire-Sain-150x150.jpg': 'Réfectoire-Sain-150x150.jpg',
  'Recherche-Sain-1-150x150.jpg': 'Recherche-Sain-1-150x150.jpg',
  'Réflexoire-Sain-150x150.jpg': 'Réfectoire-Sain-150x150.jpg',

  // Elementor thumbnails
  'sain1-ppttfjdgmi5mpkjcvw5cgvdfee3s3inbnwabbpggjo.jpg': 'sain1-ppttfjdgmi5mpkjcvw5cgvdfee3s3inbnwabbpggjo.jpg',
  'Jardin-Sain-ppttdnp2yfkzhn9nv2w7hcg8mndcpb6nelbcrs8szo.jpg': 'Jardin-Sain-ppttdnp2yfkzhn9nv2w7hcg8mndcpb6nelbcrs8szo.jpg',
  'Engagement-Eco-Sain-ppttcic6lq0dasxqkl0mfmvyhp17ammgkwlznly4lg.jpg': 'Engagement-Eco-Sain-ppttcic6lq0dasxqkl0mfmvyhp17ammgkwlznly4lg.jpg',
  'sain1-150x150.jpg': 'sain1-150x150.jpg',
  'Hebergement-3-Sain-ppttdbh6hl49apreufm22xj8wn1kx8u50wu1j6qx8k.jpg': 'Hebergement-3-Sain-ppttdbh6hl49apreufm22xj8wn1kx8u50wu1j6qx8k.jpg',
  'Hergement-Sain-8-ppv80i5km2x6m7hdq0k9wcuooysly9r9cubr3hhqdg.jpg': 'Hergement-Sain-8-ppv80i5km2x6m7hdq0k9wcuooysly9r9cubr3hhqdg.jpg',
  'sain1-ppttfjdgmi5mpkjcvw5cgvdfee3s3inbnwabbpggjo.jpg': 'sain1-ppttfjdgmi5mpkjcvw5cgvdfee3s3inbnwabbpggjo.jpg',
  'Chambres-Sain-ppttbo9cj0v6za5fg80k7uh7hd5ggbb1srqgar6q4k.jpg': 'Chambres-Sain-ppttbo9cj0v6za5fg80k7uh7hd5ggbb1srqgar6q4k.jpg',
  'Dortoir-Sain-ppttc2cxdjehtfky5w3yr8x4e57ynrv0upiqhwltj8.jpg': 'Dorteur-Sain-ppttc2cxdjehtfky5w3yr8x4e57ynrv0upiqhwltj8.jpg',
  'Réfectoire-Sain-150x150.jpg': 'Réfectoire-Sain-150x150.jpg',

  // Product image thumbnails
  'Papaye-Sain-ppttetzthz768e8d64ind3ozjwsyymu5v5f4dprkqg.jpg': 'Papaye-Sain-ppttetzthz768e8d64ind3ozjwsyymu5v5f4dprkqg.jpg',
  'Aubergine-Sain-ppttblftyirm8qxo2q4wrx3tw4rgg5zg34iwveke60.jpg': 'Aubergine-Sain-ppttblftyirm8qxo2q4wrx3tw4rgg5zg34iwveke60.jpg',
  'Oeufs-Sain-pqky5wbb6qs7itx3kjxeitq7yejaknrl05rzi151a0.jpg': 'Oeufs-Sain-pqky5wbb6qkitx3kjxeitq7yejaknrl05rzi151a0.jpg',
  'Lapin-Sain-pqky63u0pf2i3pm6cn6f2rtwphi8a8lfp6zvc8tvw8.jpg': 'Lapin-Sain-pqky63u0pf2i3pm6cn6f2rtwphi8a8lfp6zvc8tvw8.jpg',
  'Poisson-Sain-pql0e2xo6yjrxbg4cpooq3as8pbi7539p184as90hk.jpg': 'Poisson-Sain-pql0e2xo6yjrxbg4cpooq3as8pbi7539p184as90hk.jpg',
  'Champignons-Sain-pqky6bcq83csolb94qffmpxlgkh5ztfae87r6giqig.jpg': 'Champignons-Sain-pqky6bcq83csolb94qffmpxlgkh5ztfae87r6giqig.jpg',
  'Coco-Sain-pqky6e68slgnnf75o9nbc77z8q39mwqhem67maejzs.jpg': 'Coco-Sain-pqky6e68slgnnf75o9nbc77z8q39mwqhem67maejzs.jpg',
  'Pasteque-Sain-pqky602ny2xct9rmyljwsss2by0rfg6icodxf4zgl4.jpg': 'Pasteque-Sain-pqky602ny2xct9rmyljwsss2by0rfg6icodxf4zgl4.jpg',

  // Other images - fallback to similar matches
  'Transformation-Sain-scaled-ppv80oqfxx6h3rvytmqw5d3x1l4a33gz0hn2gwhgoo.jpg': 'Transformation-Sain-scaled-ppv80oqfxx6h3rvytmqw5d3x1l4a33gz0hn2gwhgoo.jpg',
  'Réfectoire-ppttfbur3tvc4oua3swbwx9qnb4udxtgyv2fhhrlxg.jpg': 'Réfectoire-ppttfbur3tvc4oua3swbwx9qnb4udxtgyv2fhhrlxg.jpg',
  'Travaux-Ferme-1024x768.jpg': 'Travaux-Ferme-1024x768.jpg',
  'Fruits-Sain-1024x717.jpg': 'Fruits-Sain-1024x717.jpg',
  'Ecole-Sain-Arrosage-1-1024x867.jpg': 'Ecole-Sain-Arrosage-1-1024x867.jpg',
  'Réfectoire-Sain-150x150.jpg': 'Réfectoire-Sain-150x150.jpg',
}

// Get all files in src/ that contain WordPress URLs
import { execSync } from 'child_process'

const filesResult = execSync('grep -rl "https://www.sain-benin.org/wp-content" src/', { stdio: 'pipe' }).toString()
const files = filesResult.split('\n').filter(f => f.length > 0)

let totalReplacements = 0
const filesChanged = new Set()

const wpUrlPattern = /https:\/\/www\.sain-benin\.org\/wp-content\/uploads\/(?:2022\/(?:06|04)\/|elementor\/(?:thqs|thumbs)\/)([^'"\)\s]+)/g

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8')
  let count = 0

  content = content.replace(wpUrlPattern, (match, filename) => {
    // Try direct filename match first (handles URL-encoded names)
    const decodedFilename = decodeURIComponent(filename)
    const directPath = path.join(process.cwd(), 'public/images', filename)
    const decodedPath = path.join(process.cwd(), 'public/images', decodedFilename)

    // Check urlToLocalMap
    if (urlToLocalMap[filename] && fs.existsSync(path.join(process.cwd(), 'public/images', urlToLocalMap[filename]))) {
      count++
      totalReplacements++
      return `/images/${urlToLocalMap[filename]}`
    }

    // Check decoded filename
    if (fs.existsSync(decodedPath)) {
      count++
      totalReplacements++
      return `/images/${decodedFilename}`
    }

    // Check direct filename
    if (fs.existsSync(directPath)) {
      count++
      totalReplacements++
      return `/images/${filename}`
    }

    // Check URL-encoded filename variants
    const localImages = fs.readdirSync(path.join(process.cwd(), 'public/images'))
    const matchingImage = localImages.find(img => {
      const imgDecoded = decodeURIComponent(img)
      return imgDecoded === decodedFilename || img === decodedFilename
    })

    if (matchingImage) {
      count++
      totalReplacements++
      return `/images/${matchingImage}`
    }

    console.warn(`⚠️  No local match for: ${filename} in ${file}`)
    return match
  })

  if (count > 0) {
    fs.writeFileSync(file, content, 'utf8')
    filesChanged.add(file)
  }
})

console.log(`\n✅ Migration terminée: ${totalReplacements} URLs remplacées dans ${filesChanged.size} fichiers`)
if (filesChanged.size > 0) {
  console.log('Fichiers modifiés:')
  filesChanged.forEach(f => console.log(`  - ${f}`))
}
