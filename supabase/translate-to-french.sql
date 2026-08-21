-- ════════════════════════════════════════════════════════════════════════
-- SAIN — Script COMPLET de traduction vers le français
-- Exécuter dans l'éditeur SQL de Supabase Dashboard
-- https://supabase.com/dashboard → ton projet → SQL Editor → Run
-- ════════════════════════════════════════════════════════════════════════
-- Ce script traduit TOUT le contenu de la base de données vers le français.
-- Les versions anglaises sont conservées dans les colonnes _en pour le
-- site bilingue. Idempotent et sans risque de doublon.
-- ════════════════════════════════════════════════════════════════════════


-- ════════════════════════════════════════════════════════════════════════
-- ÉTAPE 1 : CIRCUITS DÉCOUVERTE — Traduire les 6 descriptions EN → FR
--           Les 6 circuits avaient des descriptions en anglais dans la
--           seed initiale (setup.sql).
-- ════════════════════════════════════════════════════════════════════════

-- Circuit 1 : Découverte du marché local
UPDATE public.prices SET
  description_en = description,
  subtitle_en = subtitle
WHERE key = 'circuit-1'
  AND (description_en = '' OR description_en = description);

UPDATE public.prices SET
  description = 'Immersion dans le marché local avec visite guidée et dégustation de spécialités locales.',
  subtitle = 'Marché d''Akpadanou'
WHERE key = 'circuit-1';

-- Circuit 2 : Découverte du village
UPDATE public.prices SET
  description_en = description,
  subtitle_en = subtitle
WHERE key = 'circuit-2'
  AND (description_en = '' OR description_en = description);

UPDATE public.prices SET
  description = 'Immersion culturelle dans la vie quotidienne du village : préparation de l''huile, fabrication du gari et distillation traditionnelle.',
  subtitle = 'Kakanitchoé'
WHERE key = 'circuit-2';

-- Circuit 3 : Circuit Nature
UPDATE public.prices SET
  description_en = description,
  subtitle_en = subtitle
WHERE key = 'circuit-3'
  AND (description_en = '' OR description_en = description);

UPDATE public.prices SET
  description = 'Centre éducatif de nature accueillant des groupes scolaires et des familles avec des programmes sur la faune et la flore locales.',
  subtitle = 'Faune et flore'
WHERE key = 'circuit-3';

-- Circuit 4 : Randonnée
UPDATE public.prices SET
  description_en = description,
  subtitle_en = subtitle
WHERE key = 'circuit-4'
  AND (description_en = '' OR description_en = description);

UPDATE public.prices SET
  description = 'Exploration des champs agricoles montrant les cultures de saison et les interactions avec les agriculteurs, ainsi que la visite du marécage.',
  subtitle = 'Champs et marécage'
WHERE key = 'circuit-4';

-- Circuit 5 : Tour en pirogue
UPDATE public.prices SET
  description_en = description,
  subtitle_en = subtitle
WHERE key = 'circuit-5'
  AND (description_en = '' OR description_en = description);

UPDATE public.prices SET
  description = 'Balade en pirogue traditionnelle le long du fleuve Ouémé avec visite de l''île protégée de la forêt KPINKON.',
  subtitle = 'Fleuve Ouémé'
WHERE key = 'circuit-5';

-- Circuit 6 : Visite de la ferme
UPDATE public.prices SET
  description_en = description,
  subtitle_en = subtitle
WHERE key = 'circuit-6'
  AND (description_en = '' OR description_en = description);

UPDATE public.prices SET
  description = 'Visite guidée de la ferme présentant les pratiques agroécologiques : production de champignons, miel, poissons, lapins et cailles.',
  subtitle = 'Activités agroécoliques'
WHERE key = 'circuit-6';


-- ════════════════════════════════════════════════════════════════════════
-- ÉTAPE 2 : PHOTOS — Ajouter des légendes FR à toutes les photos
--           Toutes les légendes (caption) sont vides dans la seed.
--           On remplit avec des descriptions appropriées.
-- ════════════════════════════════════════════════════════════════════════

-- Photos avec emplacement fixe (key non null)
UPDATE public.photos SET caption = 'Bannière d''accueil de la ferme SAIN'
WHERE key = 'hero' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');

UPDATE public.photos SET caption = 'La ferme SAIN en images'
WHERE key = 'apropos' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');

UPDATE public.photos SET caption = 'Les travaux quotidiens à la ferme'
WHERE key = 'apercu-1' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');

UPDATE public.photos SET caption = 'Nos étudiants en formation'
WHERE key = 'apercu-2' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');

UPDATE public.photos SET caption = 'Fruits frais de notre production'
WHERE key = 'apercu-3' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');

UPDATE public.photos SET caption = 'Les chambres de la ferme'
WHERE key = 'apercu-4' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');

UPDATE public.photos SET caption = 'Le compostage, une pratique essentielle'
WHERE key = 'apercu-5' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');

UPDATE public.photos SET caption = 'Le jardin de la ferme'
WHERE key = 'apercu-6' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');

UPDATE public.photos SET caption = 'Alassane Touré, ancien élève de la ferme-école'
WHERE key = 'temoin-1' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');

UPDATE public.photos SET caption = 'Marie Dubois, visiteuse de la ferme'
WHERE key = 'temoin-2' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');

UPDATE public.photos SET caption = 'Pasteur Houensou, partenaire de SAIN'
WHERE key = 'temoin-3' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');

UPDATE public.photos SET caption = 'Bannière de la page À propos'
WHERE key = 'hero' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'projet-global');

UPDATE public.photos SET caption = 'Notre engagement social'
WHERE key = 'hero' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'responsabilite-sociale');

UPDATE public.photos SET caption = 'Bannière des activités de SAIN'
WHERE key = 'hero' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'activites-sain');

UPDATE public.photos SET caption = 'Notre production végétale'
WHERE key = 'pole-1' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'activites-sain');

UPDATE public.photos SET caption = 'Notre élevage de lapins'
WHERE key = 'pole-2' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'activites-sain');

UPDATE public.photos SET caption = 'Notre champ de riz'
WHERE key = 'pole-3' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'activites-sain');

UPDATE public.photos SET caption = 'L''agritourisme à SAIN'
WHERE key = 'agritourisme' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'activites-sain');

UPDATE public.photos SET caption = 'Pascal Gbenou, fondateur de SAIN'
WHERE key = 'membre-1' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');

UPDATE public.photos SET caption = 'Bernardin DJOSSOU, membre de l''équipe'
WHERE key = 'membre-2' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');

UPDATE public.photos SET caption = 'NEVIS Romaric David, membre de l''équipe'
WHERE key = 'membre-3' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');

UPDATE public.photos SET caption = 'Jeanne Adjahoungbeta, membre de l''équipe'
WHERE key = 'membre-4' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');

UPDATE public.photos SET caption = 'Lucien N''Vênihoundé, membre de l''équipe'
WHERE key = 'membre-5' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');

UPDATE public.photos SET caption = 'Prosper Dekpo S., membre de l''équipe'
WHERE key = 'membre-6' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');

UPDATE public.photos SET caption = 'Noëllie Oussa Zannou, membre de l''équipe'
WHERE key = 'membre-7' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');

UPDATE public.photos SET caption = 'Formation en apiculture à la ferme'
WHERE key = 'hero' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'formations');

UPDATE public.photos SET caption = 'Un étudiant en formation pratique'
WHERE key = 'etudiant' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'formations');

UPDATE public.photos SET caption = 'Bannière de l''hébergement'
WHERE key = 'hero' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');

UPDATE public.photos SET caption = 'Accueil chaleureux à la ferme'
WHERE key = 'apercu-1' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');

UPDATE public.photos SET caption = 'Nos chambres confortables'
WHERE key = 'apercu-2' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');

UPDATE public.photos SET caption = 'Vue panoramique de la ferme'
WHERE key = 'apercu-3' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');

UPDATE public.photos SET caption = 'La cuisine du gîte'
WHERE key = 'apercu-4' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');

UPDATE public.photos SET caption = 'Espace chambres'
WHERE key = 'espace-1' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');

UPDATE public.photos SET caption = 'Le jardin de la ferme'
WHERE key = 'espace-2' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');

UPDATE public.photos SET caption = 'Nos espaces verts'
WHERE key = 'espace-3' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');

UPDATE public.photos SET caption = 'Le restaurant de la ferme SAIN'
WHERE key = 'hero' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'restaurant');

UPDATE public.photos SET caption = 'Notre restaurant accueillant'
WHERE key = 'photo-1' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'restaurant');

UPDATE public.photos SET caption = 'Nos produits frais du jour'
WHERE key = 'photo-2' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'restaurant');

UPDATE public.photos SET caption = 'Le marécage de la ferme'
WHERE key = 'galerie-1' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'circuits-decouverte');

UPDATE public.photos SET caption = 'Tour en pirogue sur le fleuve Ouémé'
WHERE key = 'galerie-2' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'circuits-decouverte');

UPDATE public.photos SET caption = 'Notre élevage de poules'
WHERE key = 'galerie-3' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'circuits-decouverte');

UPDATE public.photos SET caption = 'La palmeraie de la ferme'
WHERE key = 'galerie-4' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'circuits-decouverte');

UPDATE public.photos SET caption = 'Le jardin potager de la ferme'
WHERE key = 'hero' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'production');

UPDATE public.photos SET caption = 'Arrosage des cultures par nos étudiants'
WHERE key = 'hero' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'nous-soutenir');

UPDATE public.photos SET caption = 'Un étudiant en apprentissage à la ferme'
WHERE key = 'photo-1' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'nous-soutenir');

UPDATE public.photos SET caption = 'Formation en apiculture'
WHERE key = 'photo-2' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'nous-soutenir');

UPDATE public.photos SET caption = 'Nos cultures en pleine croissance'
WHERE key = 'photo-3' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'nous-soutenir');

UPDATE public.photos SET caption = 'Nos jeunes étudiants'
WHERE key = 'photo-4' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'nous-soutenir');

UPDATE public.photos SET caption = 'Bannière de la galerie'
WHERE key = 'hero' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'galerie');

UPDATE public.photos SET caption = 'Un étudiant passionné par l''agriculture'
WHERE key = 'hero' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'contact');

UPDATE public.photos SET caption = 'Notre recherche-action'
WHERE key = 'hero' AND caption = ''
AND section_id = (SELECT id FROM public.sections WHERE slug = 'mentions-legales');

-- Photos libres de la galerie (key = NULL) — ajouter des légendes
UPDATE public.photos SET caption = 'Les travaux quotidiens à la ferme SAIN'
WHERE url = '/images/Travaux-Ferme-1024x768.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Arrosage des cultures par les étudiants'
WHERE url = '/images/Ecole-Sain-Arrosage-1-1024x867.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Un étudiant arrose le jardin potager'
WHERE url = '/images/Arrosage-Etudiant-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Le jardin potager de la ferme'
WHERE url = '/images/Jardin-Sain-1024x768.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Jardin de la ferme en pleine croissance'
WHERE url = '/images/Jardin3-Sain-1024x768.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Le compostage, source d''engrais naturel'
WHERE url = '/images/Compost-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Culture maraîchère biologique'
WHERE url = '/images/Maraichage-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Nos légumes frais du jardin'
WHERE url = '/images/Maraichage-5-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Maraîchage de la ferme'
WHERE url = '/images/Maraichage-3-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Culture maraîchère biologique'
WHERE url = '/images/Maraichage-4-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Le marécage de la ferme'
WHERE url = '/images/Marécage-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Travaux agricoles à la ferme'
WHERE url = '/images/Travaux-2-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Repiquage des plants de riz'
WHERE url = '/images/Repiquage-Sain-1-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Repiquage des plants en cours'
WHERE url = '/images/Repiquage-Sain-2-ppttfeo9obz73iq6nc47mek4fgqy114nz90vxbnfes.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Notre champ de riz cultivé en SRI'
WHERE url = '/images/Riz-Sain-1024x743.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'La récolte du riz à la ferme'
WHERE url = '/images/Riz-Sain-1-1024x743.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'La palmeraie de la ferme'
WHERE url = '/images/Palme-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Les fleurs de la ferme'
WHERE url = '/images/Fleur-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Notre élevage de lapins'
WHERE url = '/images/Elevage-lapin-Sain-1024x806.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Les lapins de la ferme'
WHERE url = '/images/Lapins-Elevage-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Notre poulailler'
WHERE url = '/images/Elevage-Poules-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Formation en apiculture'
WHERE url = '/images/Formation-Apiculture-1024x768.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Nos ruches d''apiculture'
WHERE url = '/images/Apiculture-Formation-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Les fruits de notre production'
WHERE url = '/images/Fruits-Sain-1024x717.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Fruits frais du jardin'
WHERE url = '/images/Fruits-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Nos papayes mûres'
WHERE url = '/images/Papaye-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Le curcuma, épice de la ferme'
WHERE url = '/images/Curcuma-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Ananas cultivé à la ferme'
WHERE url = '/images/Ananas-2-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Bananes plantains de la ferme'
WHERE url = '/images/banaan-scaled-e1649512167400.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Jus de concombre frais'
WHERE url = '/images/Jus-Concombre-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Nos étudiants de la ferme-école'
WHERE url = '/images/Etudiants-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Un étudiant en apprentissage'
WHERE url = '/images/Etudiant-4-1024x683.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Formation pratique en agriculture'
WHERE url = '/images/Etudiant-5-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Travaux pratiques à la ferme'
WHERE url = '/images/Etudiant-7-1024x683.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Nos étudiants en groupe'
WHERE url = '/images/Etudiants-2-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Groupe d''étudiants de la ferme-école'
WHERE url = '/images/Etudiants-Sain-1024x768.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'L''équipe SAIN réunie'
WHERE url = '/images/Equipe-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Jeunes souriants de la ferme'
WHERE url = '/images/Sourire-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Notre engagement social auprès de la communauté'
WHERE url = '/images/Engagement-Social-Sain-1024x768.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Engagement solidaire de SAIN'
WHERE url = '/images/Engagement-Social-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Hébergement à la ferme SAIN'
WHERE url = '/images/Hebergement-9-ppv80k18zqzr9fenf1dj1cdlvqjcdnyq13mq21ey10.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Nos chambres confortables'
WHERE url = '/images/Chambres-Sain-1024x768.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Espace hébergement à la ferme'
WHERE url = '/images/Hébergement-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Chambres de la ferme'
WHERE url = '/images/Hébergement-3-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'La cuisine du gîte'
WHERE url = '/images/Cuisine-Gite-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Cuisine de la ferme'
WHERE url = '/images/Cuisine-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Accueil chaleureux à la ferme'
WHERE url = '/images/Accueil-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'L''accueil de la ferme'
WHERE url = '/images/Ferme-Accueil-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Vue panoramique de la ferme'
WHERE url = '/images/sain1-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Visite guidée de la ferme'
WHERE url = '/images/Visite-Ferme-ppttg268f6vd5rs1u49vuqmna3j4dgpyehc0x8ol38.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Visite de la ferme pour les groupes'
WHERE url = '/images/Visite-Ferme-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Tour en pirogue sur le fleuve Ouémé'
WHERE url = '/images/Pirogue-150x114.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Tri du plastique, geste éco-responsable'
WHERE url = '/images/Plastique-Sain-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Notre recherche-action en agriculture'
WHERE url = '/images/Recherche-Sain-1024x767.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Recherche en laboratoire'
WHERE url = '/images/Recherche-Sain-1-pptteyp0g5dbm5de8n7jy0labwxpe6d891xmrmb4ck.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Travaux de recherche'
WHERE url = '/images/Recherche-Sain-1-150x150.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'La ferme SAIN dans son ensemble'
WHERE url = '/images/A-PROPOS-SAIN-1024x715.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Portrait d''un membre de l''équipe'
WHERE url = '/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'Le restaurant de la ferme'
WHERE url = '/images/Restaurant-Sain-724x1024.png' AND caption = '' AND key IS NULL;

UPDATE public.photos SET caption = 'La vie quotidienne à la ferme'
WHERE url = '/images/sain5-150x150.jpg' AND caption = '' AND key IS NULL;


-- ════════════════════════════════════════════════════════════════════════
-- ÉTAPE 3 : VIDÉOS — Corriger les titres bizarres et traduire EN
-- ════════════════════════════════════════════════════════════════════════

-- Ajouter la colonne title_en si elle n'existe pas
ALTER TABLE public.videos
  ADD COLUMN IF NOT EXISTS title_en text NOT NULL DEFAULT '';

-- Corriger les titres bizarres (numérotations sans sens)
UPDATE public.videos SET
  title = 'Formation des jeunes entrepreneurs — SAIN',
  title_en = 'Young entrepreneurs training — SAIN'
WHERE youtube_id = 'ebattfJkYkU' AND title = '17  Augustin 1';

UPDATE public.videos SET
  title = 'Activités de la ferme-école SAIN',
  title_en = 'Activities of the SAIN Training Farm'
WHERE youtube_id = 'jMCzuutr7yY' AND title = '14';

-- Traduire les titres anglais existants
UPDATE public.videos SET title_en = 'Sain-Benin (presentation)'
WHERE title = 'Sain-Benin (présentation)' AND title_en = '';

UPDATE public.videos SET title_en = 'Discovering the SAIN Training Farm in Kakanitchoé, Benin'
WHERE title = 'A la découverte de la Ferme école SAIN de Kakanitchoé au Bénin (Adjohoun-Ouémé)' AND title_en = '';

UPDATE public.videos SET title_en = 'The SAIN Training Farm and the Colibri Foundation'
WHERE title = 'La Ferme Ecole SAIN et la Fondation Collibri' AND title_en = '';

UPDATE public.videos SET title_en = 'The 23rd class of young entrepreneurs from SAIN Training Farm'
WHERE title = 'La 23ième promotion des jeunes entrepreneurs de la Ferme École SAIN' AND title_en = '';

UPDATE public.videos SET title_en = 'Young graduates from SAIN Training Farm share their experience'
WHERE title LIKE 'Les jeunes formés à la Ferme-école SAIN%' AND title_en = '';

UPDATE public.videos SET title_en = 'Agriculture: SAIN Training Farm in Kakanitchoé damaged by storm'
WHERE title = 'Agriculture : destruction de la Ferme École SAIN de Kakanitchoé par une tempête' AND title_en = '';


-- ════════════════════════════════════════════════════════════════════════
-- ÉTAPE 4 : HÉBERGEMENT — Vérifier les traductions EN des chambres
-- ════════════════════════════════════════════════════════════════════════

UPDATE public.prices SET title_en = 'Simple Room', description_en = 'Comfortable individual room'
WHERE key = 'room-1' AND category = 'room' AND (title_en = '' OR title_en = 'Chambre Simple');

UPDATE public.prices SET title_en = 'Double Room', description_en = 'Double room with living space'
WHERE key = 'room-2' AND category = 'room' AND (title_en = '' OR title_en = 'Chambre Double');

UPDATE public.prices SET title_en = 'Double Room + Living Room', description_en = 'Double room with private sitting area'
WHERE key = 'room-3' AND category = 'room' AND (title_en = '' OR title_en = 'Chambre Double + Salon');

UPDATE public.prices SET title_en = 'Family Room + Living Room', description_en = 'Spacious family room with living room'
WHERE key = 'room-4' AND category = 'room' AND (title_en = '' OR title_en = 'Chambre Familiale + Salon');

UPDATE public.prices SET title_en = 'Dormitory', description_en = 'Shared room for 4 to 6 people'
WHERE key = 'room-5' AND category = 'room' AND (title_en = '' OR title_en = 'Dortoir');

UPDATE public.prices SET title_en = 'Extra mattress', description_en = 'Add a mattress to your room'
WHERE key = 'room-6' AND category = 'room' AND (title_en = '' OR title_en = 'Matelas supplémentaire');

UPDATE public.prices SET title_en = 'Simple Room' WHERE key = 'board-1' AND (title_en = '' OR title_en = 'Chambre simple');
UPDATE public.prices SET title_en = 'Double Room' WHERE key = 'board-2' AND (title_en = '' OR title_en = 'Chambre double');
UPDATE public.prices SET title_en = 'Double Room + Living Room' WHERE key = 'board-3' AND (title_en = '' OR title_en = 'Chambre double + salon');
UPDATE public.prices SET title_en = 'Family Room' WHERE key = 'board-4' AND (title_en = '' OR title_en = 'Chambre familiale');


-- ════════════════════════════════════════════════════════════════════════
-- ÉTAPE 5 : PROGRAMMES DE SOUTIEN — Traductions EN
-- ════════════════════════════════════════════════════════════════════════

UPDATE public.prices SET
  title_en = 'Monthly Sponsorship',
  description_en = 'Support a young person in their agricultural training',
  details_en = 'Covers supplies and food needs
Provides access to professional training
Personalized follow-up throughout training
Partner with sustainable projects'
WHERE key = 'program-1' AND (title_en = '' OR title_en = 'Parrainage Mensuel');

UPDATE public.prices SET
  title_en = 'Infrastructure Improvement',
  description_en = 'Fund agricultural and educational facilities',
  price_en = 'Custom',
  details_en = 'Sustainable irrigation systems
Fish farming ponds
Agri-food processing units
Improved educational spaces'
WHERE key = 'program-2' AND (title_en = '' OR title_en = 'Amélioration des Infrastructures');

UPDATE public.prices SET
  title_en = 'Youth Scholarships',
  description_en = 'Fund education for disadvantaged children',
  details_en = 'School supplies
Registration fees
Meals and accommodation
Personalized educational follow-up'
WHERE key = 'program-3' AND (title_en = '' OR title_en = 'Bourses pour Jeunes');


-- ════════════════════════════════════════════════════════════════════════
-- ÉTAPE 6 : MENUS DU RESTAURANT — Traductions EN
-- ════════════════════════════════════════════════════════════════════════

UPDATE public.menu_categories SET name_en = 'Starters' WHERE name = 'Entrées';
UPDATE public.menu_categories SET name_en = 'Main Courses' WHERE name = 'Plats Principaux';
UPDATE public.menu_categories SET name_en = 'Side Dishes' WHERE name = 'Accompagnements';
UPDATE public.menu_categories SET name_en = 'Desserts' WHERE name = 'Desserts';

UPDATE public.menu_items SET name_en = 'Green salad' WHERE name = 'Salade verte';
UPDATE public.menu_items SET name_en = 'Soup of the day' WHERE name = 'Soupe du jour';
UPDATE public.menu_items SET name_en = 'Green papaya salad' WHERE name = 'Salade de papaye verte';
UPDATE public.menu_items SET name_en = 'SAIN Rice (farm rice)' WHERE name = 'Riz SAIN (riz de la ferme)';
UPDATE public.menu_items SET name_en = 'Roasted chicken' WHERE name = 'Poulet rôti';
UPDATE public.menu_items SET name_en = 'Grilled fish' WHERE name = 'Poisson grillé';
UPDATE public.menu_items SET name_en = 'Grilled rabbit' WHERE name = 'Lapin braisé';
UPDATE public.menu_items SET name_en = 'Seasonal vegetables' WHERE name = 'Légumes de saison';
UPDATE public.menu_items SET name_en = 'Cassava purée' WHERE name = 'Purée de manioc';
UPDATE public.menu_items SET name_en = 'Gari' WHERE name = 'Gari';
UPDATE public.menu_items SET name_en = 'Homemade jam' WHERE name = 'Confiture maison';
UPDATE public.menu_items SET name_en = 'Papaya juice' WHERE name = 'Jus de papaye';
UPDATE public.menu_items SET name_en = 'Coconut cheese' WHERE name = 'Fromage de coco';


-- ════════════════════════════════════════════════════════════════════════
-- ÉTAPE 7 : PHOTOS — Synchroniser les colonnes _en avec les nouvelles légendes
-- ════════════════════════════════════════════════════════════════════════

UPDATE public.photos SET alt_en = alt WHERE alt_en = '' AND alt != '';
UPDATE public.photos SET caption_en = caption WHERE caption_en = '' AND caption != '';


-- ════════════════════════════════════════════════════════════════════════
-- ÉTAPE 8 : CONTACT INFO — Vérifier les labels sont en français
-- ════════════════════════════════════════════════════════════════════════

-- Les labels sont déjà en français dans la seed. On s'assure qu'ils le sont.
UPDATE public.contact_info SET label = 'Numéro WhatsApp' WHERE key = 'whatsapp' AND label != 'Numéro WhatsApp';
UPDATE public.contact_info SET label = 'Numéro mobile' WHERE key = 'mobile' AND label != 'Numéro mobile';
UPDATE public.contact_info SET label = 'Adresse email' WHERE key = 'email' AND label != 'Adresse email';
UPDATE public.contact_info SET label = 'Facebook' WHERE key = 'facebook' AND label != 'Facebook';
UPDATE public.contact_info SET label = 'YouTube' WHERE key = 'youtube' AND label != 'YouTube';
UPDATE public.contact_info SET label = 'Instagram' WHERE key = 'instagram' AND label != 'Instagram';


-- ════════════════════════════════════════════════════════════════════════
-- VÉRIFICATION FINALE
-- ════════════════════════════════════════════════════════════════════════

SELECT '=== CIRCUITS (FR) ===' AS section;
SELECT key, title AS "Titre", subtitle AS "Sous-titre", description AS "Description"
FROM public.prices WHERE key LIKE 'circuit-%' ORDER BY key;

SELECT '=== CIRCUITS (EN) ===' AS section;
SELECT key, title_en AS "Titre EN", subtitle_en AS "Sous-titre EN", description_en AS "Description EN"
FROM public.prices WHERE key LIKE 'circuit-%' ORDER BY key;

SELECT '=== PHOTOS avec légendes ===' AS section;
SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE caption != '') AS "avec légende"
FROM public.photos;

SELECT '=== VIDÉOS ===' AS section;
SELECT title AS "Titre FR", title_en AS "Titre EN" FROM public.videos ORDER BY position;

SELECT '=== MENUS ===' AS section;
SELECT mc.name AS "Catégorie FR", mc.name_en AS "Catégorie EN",
       mi.name AS "Plat FR", mi.name_en AS "Plat EN"
FROM public.menu_categories mc
JOIN public.menu_items mi ON mi.category_id = mc.id
ORDER BY mc.position, mi.position;

SELECT '✅ Toute la base de données est maintenant en français ! Les versions anglaises sont dans les colonnes _en.' AS resultat;
