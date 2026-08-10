#!/usr/bin/env node
/**
 * Script de migration des images WordPress vers le stockage local.
 * Remplace les URLs externes dans le code source par des chemins /images/...
 * Usage: node scripts/migrate-images.js
 */
import { execSync } from 'child_process'
import fs from 'fs'

// Mapping des URLs WordPress -> noms de fichis locaux
// Format de l'URL WordPress:
//   https://www.sain-benin.org/wp-content/uploads/2022/06/FICHIER.jpg
//   https://www.sain-benin.org/wp-content/uploads/2022/04/FICHIER.jpg
//   https://www.sain-benin.org/wp-content/uploads/elementor/thqs/FICHIER.jpg
//   https://www.sain-benin.org/wp-content/uploads/elementor/thumbs/FICHIER.jpg

// Mapping manuel basé sur ls des images locales
const urlToLocalMap = {
  // 1024x768 hero backgrounds
  'H%C3%A9bergement-Sain-1-1024x768.jpg': 'Hébergement-Sain-1-1024x768.jpg',
  'A-PROPOS-SAIN-1024x715.jpg': 'A-PROPOS-SAIN-1024x715.jpg',
  'Travaux-Ferme-1024x768.jpg': 'Travaux-Ferme-1024x768.jpg',
  'R%C3%A9fectoire-Sain-1024x788.jpg': 'Réfectoire.jpg', // fallback
  'Engagement-Social-Sain-1024x768.jpg': 'Engagement-Social-Sain-1024x768.jpg',
  'Ecole-Sain-Arrosage-1-1024x867.jpg': 'Ecole-Sain-Arrosage-1-1024x867.jpg',
  'Equipe-Sain-1024x576.jpg': 'Equipe-Sain-1024x576.jpg',

  // 1024x9xx product/formation images
  'Restaurant-Sain-724x1024.png': 'Restaurant-Sain-724x1024.png',
  'Menu-Sain-724x923.png': 'Menu-Sain-724x923.png',

  // 1024x7xx activity images
  'Fruits-Sain-1024x717.jpg': 'Fruits-Sain-1024x717.jpg',
  'Elevage-lapin-Sain-1024x806.jpg': 'Elevage-lapin-Sain-1024x806.jpg',
  'Riz-Sain-1024x743.jpg': 'Riz-Sain-1024x743.jpg',
  'Riz-Sain-1-1024x743.jpg': 'Riz-Sain-1-1024x743.jpg',
  'Formation-Apiculture-1024x768.jpg': 'Formation-Apiculture-1024x768.jpg',
  'Etudiant-4-1024x683.jpg': 'Etudiant-4-1024x683.jpg',

  // 150x150 gallery images (déjà présents localement)
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
  'Apiculture-Formation-150x150.jpg': 'Apiculture-Formation-150x150.jpg',
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
  'Engagement-Social-Sain-150x150.jpg': 'Engagement-Social-Sain-150x150.jpg',
  'sain5-150x150.jpg': 'sain5-150x150.jpg',
  'Réfectoire-Sain-150x150.jpg': 'Réfectoire-Sain-150x150.jpg',
  'Recherche-Sain-1-150x150.jpg': 'Recherche-Sain-1-150x150.jpg',
  'Recherche-Sain-1024x767.jpg': 'Recherche-Sain-1024x767.jpg',

  // Étudiant-4-... -> Etudiant-4-1024x683.jpg (déjà dans le mapping ci-dessus)

  // Elementor thumbnails -> fichiers locaux correspondants
  'sain1-ppttfjdgmi5mpkjcvw5cgvdfee3s3inbnwabbpggjo.jpg': 'sain1-ppttfjdgmi5mpkjcvw5cgvdfee3s3inbnwabbpggjo.jpg',
  'Jardin-Sain-ppttdnp2yfkzhn9nv2w7hcg8mndcpb6nelbcrs8szo.jpg': 'Jardin-Sain-ppttdnp2yfkzhn9nv2w7hcg8mndcpb6nelbcrs8szo.jpg',
  'Engagement-Eco-Sain-ppttcic6lq0dasxqkl0mfmvyhp17ammgkwlznly4lg.jpg': 'Engagement-Eco-Sain-ppttcic6lq0dasxqkl0mfmvyhp17ammgkwlznly4lg.jpg',
  'sain1-150x150.jpg': 'sain1-150x150.jpg',
  'Hebergement-3-Sain-ppttdbh6hl49apreufm22xj8wn1kx8u50wu1j6qx8k.jpg': 'Hebergement-3-Sain-ppttdbh6hl49apreufm22xj8wn1kx8u50wu1j6qx8k.jpg',
  'Hergement-Sain-8-ppv80i5km2x6m7hdq0k9wcuooysly9r9cubr3hhqdg.jpg': 'Hergement-Sain-8-ppv80i5km2x6m7hdq0k9wcuooysly9r9cubr3hhqdg.jpg',
}

// Pattern pour remplacer
// https://www.sain-benin.org/wp-content/uploads/2022/06/FICHIER
// https://www.sain-benin.org/wp-content/uploads/2022/04/FICHIER
// https://www.sain-benin.org/wp-content/uploads/elementor/thqs/FICHIER
// https://www.sain-benin.org/wp-content/uploads/elementor/thumbs/FICHIER

const wpUrlPattern = /https:\/\/www\.sain-benin\.org\/wp-content\/uploads\/(?:2022\/(?:06|04)\/|elementor\/(?:thqs|thumbs)\/)([^'"\)\s]+)/g

fs.copyFileSync // no-op, just checking fs works

let totalReplacements = 0
const filesChanged = new Set()

// Walk src/ directory
execSync(`grep -rl "https://www.sain-benin.org/wp-content" src/`, { stdio: 'pipe' }).toString()
  .split('\n')
  .filter(f => f.length > 0)
  .forEach(file => {
    let content = fs.readFileSync(file, 'utf8')
    let count = 0

    content = content.replace(wpUrlPattern, (match, filename) => {
      // Vérifier si le fichier existe localement
      const localPath = `/images/${filename}`
      const localFile = path => `${process.cwd()}/public/images/${filename}`

      // Essayez de trouver le fichier correspondant
      let matched = false
      for (const [wpName, localName] of Object.entries(urlToLocalMap)) {
        if (decodeURIComponent(wpName) === decodeURIComponent(filename) || wpName === filename) {
          if (fs.existsSync(`${process.cwd()}/public/images/${localName}`)) {
            count++
            totalReplacements++
            return `/images/${localName}`
          }
        }
      }

      // Tentative directe: le nom est déjà le bon
      const directPath = `${process.cwd()}/public/images/${filename}`
      if (fs.existsSync(directPath)) {
        count++
        totalReplacements++
        return `/images/${filename}`
      }

      // Ne pas remplacer si on ne trouve pas -> laisser comme fallback
      console.warn(`⚠️  No local match for: ${filename} in ${file}`)
      return match
    })

    if (count > 0) {
      fs.writeFileSync(file, content, 'utf8')
      filesChanged.add(file)
    }
  })

console.log(`\n✅ Migration terminée: ${totalReplacements} URLs remplacées dans ${filesChanged.size} fichiers`)
console.log('Fichiers modifiés:', [...filesChanged].join('\n'))
