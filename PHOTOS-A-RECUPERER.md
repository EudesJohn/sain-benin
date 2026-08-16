# 📸 PHOTOS À RE-TÉLÉCHARGER — SAIN Ferme École Bio

> Document de suivi pour compléter les photos manquantes du site `sain-modern`.
> Généré le 10 août 2026 après diagnostic complet des 41 fichiers corrompus.

---

## 1. Contexte : pourquoi des photos manquaient

L'export WordPress d'origine a enregistré **41 fichiers « image » qui sont en réalité des pages HTML d'erreur** (867 octets, `<!DOCTYPE HTML>`) redirigeant vers le domaine de parking `www.searchvity.com`. Ces fichiers sont **impossibles à décoder par le navigateur** → photos cassées.

Une partie a déjà été **remplacée par des photos valides de même thème** (56 références vérifiées). Reste les sujets listés ci-dessous, à re-télécharger pour retrouver les **photos originales**.

---

## 2. Méthode de récupération testée (fonctionne)

Le site historique `sain-benin.org` est archivé sur la **Wayback Machine**. La période où les photos originales sont disponibles : captures de **mai–juin 2023** (crawls `202305*`) et **mars 2025** (crawl `20250318223545`, statut 200 sur ~35 ressources images).

**URL modèle (variante binaire « im_ ») :**

```
https://web.archive.org/web/20250318223545im_/https://www.sain-benin.org/wp-content/uploads/2022/06/<Fichier>
```

**⚠️ Attention à l'encodage des accents** : Wayback stocke les noms avec l'accent combiné. Ex. `Marécage-150x150.jpg` doit être demandé sous la forme `Mare%CC%81cage-150x150.jpg`.

> ✔ Résultat : **35 fichiers image valides récupérés** (5 Mo). **29 conservés dans `public/images/`** (intégrés au code ou gardés comme réserve), **6 doublons 150×150 de sujets déjà couverts en meilleure résolution supprimés**, dossier de travail `.recovery-tmp/` supprimé une fois la copie terminée.

---

## 3. État de récupération par sujet

### 3.1 ✅ Récupérés — déjà copiés dans `public/images/`

| Sujet | Fichier récupéré | Copié sous | Taille | Utilisation prévue |
|---|---|---|---|---|
| **Chambres** | `2022/06/Chambres-Sain.jpg` | `Chambres-Sain.jpg` | 387 Ko | Hébergement (grande photo) |
| **Chambres** | `Chambres-Sain-1024x768.jpg` | `Chambres-Sain-1024x768.jpg` | 122 Ko | Hébergement / Galerie |
| **Jardin** | `2022/04/Jardin-Sain.jpg` | `Jardin-Sain.jpg` | 1,5 Mo | Formations / Accueil |
| **Jardin** | `Jardin-Sain-1024x768.jpg` | `Jardin-Sain-1024x768.jpg` | 255 Ko | Formations / Galerie |
| **Étudiants** | `2022/06/Etudiants-Sain.jpg` | `Etudiants-Sain.jpg` | 672 Ko | Équipe / Formation |
| **Étudiants** | `Etudiants-Sain-1024x768.jpg` | `Etudiants-Sain-1024x768.jpg` | 221 Ko | Équipe / Formation |
| **Étudiant** | `2022/06/Etudiant-7.jpg` | `Etudiant-7.jpg` | 318 Ko | Galerie / Activités |
| **Étudiant** | `Etudiant-7-1024x683.jpg` | `Etudiant-7-1024x683.jpg` | 109 Ko | Galerie / Activités |
| **Hébergement** | `Hébergement-Sain-150x150.jpg` | `Hébergement-Sain-150x150.jpg` | 5 Ko | Galerie / Hébergement |
| **Hébergement 3** | `Hébergement-3-Sain-150x150.jpg` | `Hébergement-3-Sain-150x150.jpg` *(remplace le corrompu)* | 6 Ko | Galerie / Hébergement |
| **Banane** | `banaan-scaled-e1649512167400.jpg` | `banaan-scaled-e1649512167400.jpg` | 397 Ko | Galerie — montée en **pleine taille** (1050×1400) ✅ |
| **Banane** | `banaan-1024x768.jpg` | `banaan-1024x768.jpg` | 237 Ko | Production / Galerie |
| **Carte du Bénin** | `2022/06/Plan-Bénin.jpg` | `Plan-Benin.jpg` | 138 Ko | Contact / Itinéraire |
| **Cuisine** | `2022/04/Cuisine-Sain-150x150.jpg` | `Cuisine-Sain-150x150.jpg` | 8 Ko | Restaurant / Hébergement |
| **Jus** | `2022/06/Jus-Concombre-Sain-150x150.jpg` | `Jus-Concombre-Sain-150x150.jpg` | 6 Ko | Production / Galerie |
| **Maraîchage** | `2022/06/Maraichage-150x150.jpg` | `Maraichage-150x150.jpg` | 9 Ko | Production / Galerie |
| **Maraîchage 5** | `Maraichage-5-150x150.jpg` | `Maraichage-5-150x150.jpg` | 11 Ko | Production / Galerie |
| **Marécage** | `2022/06/Marécage-150x150.jpg` | `Marécage-150x150.jpg` *(remplace le corrompu `Maraécage`)* | 6 Ko | Éco-tourisme / Galerie |
| **Élevage poules** | — *(ce sujet était bloqué par le corrompu `Elevage-Poules-Sain-ppv81…`)* | `Elevage-Poules-Sain-150x150.jpg` *(déjà valide)* | 9 Ko | Production / Circuits |
| **Ananas** | `2022/06/Ananas-2-150x150.jpg` | `Ananas-2-150x150.jpg` | 9 Ko | Production / Galerie |
| **Travaux** | `2022/06/Travaux-2-150x150.jpg` | `Travaux-2-150x150.jpg` | 6 Ko | Activités / Galerie |
| **Accueil ferme** | `2022/06/Ferme-Accueil-150x150.jpg` | `Ferme-Accueil-150x150.jpg` | 7 Ko | Accueil / À propos |
| **Logo** | `Petit-Logo-SAIN.png` | `Petit-Logo-SAIN.png` | 122 Ko | Favicon / Marque |

**En plus** (déjà valides sur disque, récupération confirmée utile si besoin) :

| Fichier récupéré | Était aussi présent ? |
|---|---|
| `Compost-Sain-150x150.jpg` | ✔ déjà valide (skippé) |
| `Lapins-Elevage-150x150.jpg` | ✔ déjà valide (skippé) |
| `Papaye-Sain-150x150.jpg` | ✔ déjà valide (skippé) |
| `Reagard-150x150.jpg` | → conflit avec le valide haché `Reagard-ppttev…jpg` |

---

### 3.2 🔴 Définitivement perdus (jamais archivés sur Wayback)

Photos originales **introuvables dans l'archive** (test 404 à tous les timestamps) — il faudra les **re-photographier** ou les demander à l'exploitant du site :

| Sujet | Fichier(s) corrompu(s) d'origine | Substitut actuel affiché |
|---|---|---|
| **Oeufs** | `Oeufs-Sain-pqky5…jpg` | `Elevage-Poules-Sain-150x150.jpg` |
| **Poisson** | `Poisson-Sain-pql0e2…jpg` | `Pirogue-150x114.jpg` |
| **Champignons** | `Champignons-Sain-pqky6…jpg` | `Apiculture-Formation-150x150.jpg` |
| **Ananas** *(photo 1)* | `Ananas-ppttbcza…jpg` | `Fruits-Sain-150x150.jpg` |
| **Aubergine** | `Aubergine-Sain-ppttbl…jpg` | `Maraichage-4-150x150.jpg` |
| **Coco** | `Coco-Sain-pqky6…jpg` | `Palme-Sain-150x150.jpg` |
| **Pastèque** | `Pasteque-Sain-pqky60…jpg` | `Fruits-Sain-150x150.jpg` |
| **Jus de papaye** | `Jus-Papaye-pptte4m…jpg` | `Papaye-Sain-150x150.jpg` |
| **Transformation** | `Transformation-Sain-scaled-ppv80…jpg` | — (sujet retiré de la galerie) |
| **Diplôme** | `Diplôme-Sain-150x150.jpg` | — (sujet retiré de la galerie) |
| **Équipe (grande photo)** | `Equipe-Sain-1024x576.jpg` | `Equipe-Sain-150x150.jpg` (reste petit) |
| **Randonnée** | `Randonnée-150x150.jpg` | `Maraichage-4-150x150.jpg` |
| **Marécage (grand format)** | `Maraécage.jpg` | `Marécage-150x150.jpg` (nouveau, petit) |
| **Enfants à la ferme** | `Enfants-à-la-ferme-1-150x150.jpg`, `Enfants-à-la-ferme-1024x1024.jpg` | — (sujet retiré) |
| **Réfectoire** | `Réfectoire-ppttfb…jpg`, `Réfectoire-Sain-150x150.jpg`, `Réfectoire.jpg` | — (sujet retiré) |
| **Dortoir** | `Dortoir-Sain-ppttc2…jpg` | — (sujet retiré) |
| **Salle de rencontre** | `salle-de-rencontre--ppttf…jpg` | — (sujet retiré) |
| **Dortoir / Hébergement-2** | `Hebergement-2-ppttd8…jpg`, `Hébergement-2-150x150.jpg` | `Hebergement-9-ppv80k…jpg` |
| **Hébergement-1 (grande)** | `Hébergement-Sain-1-1024x768.jpg` | `Jardin3-Sain-1024x768.jpg` (héros Accueil) |
| **Menu restaurant** | `Menu-Sain-724x923.png` | `Fruits-Sain-1024x717.jpg` |

---

## 4. Prochaines actions recommandées

1. ✅ **Intégrer les 29 photos récupérées** dans le code — **fait** : galerie (banane en pleine taille, ananas, jus de concombre, chambres, cuisine, hébergement), production (papaye, coco, ananas, banane), circuits (marécage), équipe, accueil.
2. **Re-photographier** les sujets de la section 3.2 (en priorité : Équipe grande photo, Recette/menu, Randonnée, Dortoir/Réfectoire).
3. **Supprimer les fichiers corrompus résiduels** : les fichiers HTML d'erreur encore présents dans `public/images/` peuvent être purgés dès validation (non référencés par le code).
4. Éventuellement **récupérer les vieilles photos 2011–2012** (déjà archivées : `CIMG5887.jpg`, `DSCN…`, `kak*.jpg`, etc.) si un look « historique » est souhaité.

---

*Récupération effectuée via l'API CDX + variante `im_` de la Wayback Machine. 35 fichiers extraits, tous traités (29 conservés dans `public/images/`, 6 doublons supprimés), dossier `.recovery-tmp/` supprimé. Vérification finale : 122 références → 100 % valides, `npm run build` ✅.*