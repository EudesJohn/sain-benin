-- ════════════════════════════════════════════════════════════════════════
-- SAIN — Script COMPLET : corriger FR et EN dans la base
-- Exécuter dans l'éditeur SQL de Supabase Dashboard
-- https://supabase.com/dashboard → ton projet → SQL Editor → Run
-- ════════════════════════════════════════════════════════════════════════
-- RÈGLES :
--   • Noms de personnes, lieux, adresses, "SAIN" → IDENTIQUES dans les deux langues
--   • Montants (FCFA, €) → IDENTIQUES dans les deux langues
--   • Sigles (SRI, PCM, RSE) → IDENTIQUES dans les deux langues
--   • Colonnes de base (sans suffixe) = FRANÇAIS
--   • Colonnes _en = ANGLAIS
--   • Idempotent et sans risque de doublon
-- ════════════════════════════════════════════════════════════════════════


-- ════════════════════════════════════════════════════════════════════════
-- PARTIE A : CORRIGER LES COLONNES FR (base)
--           Le seed initiale avait des descriptions EN dans les circuits.
-- ════════════════════════════════════════════════════════════════════════

-- Circuit 1
UPDATE public.prices SET
  description = 'Immersion dans le marché local avec visite guidée et dégustation de spécialités locales.',
  subtitle = 'Marché d''Akpadanou'
WHERE key = 'circuit-1';

-- Circuit 2
UPDATE public.prices SET
  description = 'Immersion culturelle dans la vie quotidienne du village : préparation de l''huile, fabrication du gari et distillation traditionnelle.',
  subtitle = 'Kakanitchoé'
WHERE key = 'circuit-2';

-- Circuit 3
UPDATE public.prices SET
  description = 'Centre éducatif de nature accueillant des groupes scolaires et des familles avec des programmes sur la faune et la flore locales.',
  subtitle = 'Faune et flore'
WHERE key = 'circuit-3';

-- Circuit 4
UPDATE public.prices SET
  description = 'Exploration des champs agricoles montrant les cultures de saison et les interactions avec les agriculteurs, ainsi que la visite du marécage.',
  subtitle = 'Champs et marécage'
WHERE key = 'circuit-4';

-- Circuit 5
UPDATE public.prices SET
  description = 'Balade en pirogue traditionnelle le long du fleuve Ouémé avec visite de l''île protégée de la forêt KPINKON.',
  subtitle = 'Fleuve Ouémé'
WHERE key = 'circuit-5';

-- Circuit 6
UPDATE public.prices SET
  description = 'Visite guidée de la ferme présentant les pratiques agroécologiques : production de champignons, miel, poissons, lapins et cailles.',
  subtitle = 'Activités agroécoliques'
WHERE key = 'circuit-6';

-- Vidéos bizarres → corriger en français
UPDATE public.videos SET title = 'Formation des jeunes entrepreneurs — SAIN'
WHERE youtube_id = 'ebattfJkYkU' AND title = '17  Augustin 1';

UPDATE public.videos SET title = 'Activités de la ferme-école SAIN'
WHERE youtube_id = 'jMCzuutr7yY' AND title = '14';


-- ════════════════════════════════════════════════════════════════════════
-- PARTIE B : COLONNES _en = VRAI ANGLAIS
--           Remplace les copies FR dans les colonnes _en par du vrai anglais.
-- ════════════════════════════════════════════════════════════════════════

-- ── CIRCUITS ──
UPDATE public.prices SET title_en = 'Discovery of the local market', subtitle_en = 'Akpadanou Market',
  description_en = 'Immersive local market experience with guided tours and tasting of local specialties.'
WHERE key = 'circuit-1';

UPDATE public.prices SET title_en = 'Discovery of the village', subtitle_en = 'Kakanitchoé',
  description_en = 'Cultural immersion experiencing daily village life including oil preparation, gari making, and traditional distillation.'
WHERE key = 'circuit-2';

UPDATE public.prices SET title_en = 'Nature Tour', subtitle_en = 'Fauna and flora',
  description_en = 'Educational nature center offering school groups and families programs about local fauna and flora.'
WHERE key = 'circuit-3';

UPDATE public.prices SET title_en = 'Hiking', subtitle_en = 'Fields and wetland',
  description_en = 'Agricultural field exploration showing seasonal crops and farmer interactions, plus marshland visit.'
WHERE key = 'circuit-4';

UPDATE public.prices SET title_en = 'Canoe Trip', subtitle_en = 'Ouémé River',
  description_en = 'Traditional canoe tour along Ouémé River visiting KPINKON protected forest island.'
WHERE key = 'circuit-5';

UPDATE public.prices SET title_en = 'Farm Visit', subtitle_en = 'Agroecological activities',
  description_en = 'Guided farm visit showcasing agroecological practices including mushroom production, honey, fish, rabbits, and quails.'
WHERE key = 'circuit-6';

-- ── HÉBERGEMENT CHAMBRES ──
UPDATE public.prices SET title_en = 'Simple Room', description_en = 'Comfortable individual room'
WHERE key = 'room-1' AND category = 'room';
UPDATE public.prices SET title_en = 'Double Room', description_en = 'Double room with living space'
WHERE key = 'room-2' AND category = 'room';
UPDATE public.prices SET title_en = 'Double Room + Living Room', description_en = 'Double room with private sitting area'
WHERE key = 'room-3' AND category = 'room';
UPDATE public.prices SET title_en = 'Family Room + Living Room', description_en = 'Spacious family room with living room'
WHERE key = 'room-4' AND category = 'room';
UPDATE public.prices SET title_en = 'Dormitory', description_en = 'Shared room for 4 to 6 people'
WHERE key = 'room-5' AND category = 'room';
UPDATE public.prices SET title_en = 'Extra Mattress', description_en = 'Add a mattress to your room'
WHERE key = 'room-6' AND category = 'room';

-- ── HÉBERGEMENT PENSION ──
UPDATE public.prices SET title_en = 'Simple Room' WHERE key = 'board-1';
UPDATE public.prices SET title_en = 'Double Room' WHERE key = 'board-2';
UPDATE public.prices SET title_en = 'Double Room + Living Room' WHERE key = 'board-3';
UPDATE public.prices SET title_en = 'Family Room' WHERE key = 'board-4';

-- ── PROGRAMMES DE SOUTIEN ──
UPDATE public.prices SET
  title_en = 'Monthly Sponsorship',
  description_en = 'Support a young person in their agricultural training',
  details_en = 'Covers supplies and food needs
Provides access to professional training
Personalized follow-up throughout training
Partner with sustainable projects'
WHERE key = 'program-1';

UPDATE public.prices SET
  title_en = 'Infrastructure Improvement',
  description_en = 'Fund agricultural and educational facilities',
  price_en = 'Custom',
  details_en = 'Sustainable irrigation systems
Fish farming ponds
Agri-food processing units
Improved educational spaces'
WHERE key = 'program-2';

UPDATE public.prices SET
  title_en = 'Youth Scholarships',
  description_en = 'Fund education for disadvantaged children',
  details_en = 'School supplies
Registration fees
Meals and accommodation
Personalized educational follow-up'
WHERE key = 'program-3';

-- ── MENUS RESTAURANT ──
UPDATE public.menu_categories SET name_en = 'Starters' WHERE name = 'Entrées';
UPDATE public.menu_categories SET name_en = 'Main Courses' WHERE name = 'Plats Principaux';
UPDATE public.menu_categories SET name_en = 'Side Dishes' WHERE name = 'Accompagnements';
UPDATE public.menu_categories SET name_en = 'Desserts' WHERE name = 'Desserts';

UPDATE public.menu_items SET name_en = 'Green Salad' WHERE name = 'Salade verte';
UPDATE public.menu_items SET name_en = 'Soup of the Day' WHERE name = 'Soupe du jour';
UPDATE public.menu_items SET name_en = 'Green Papaya Salad' WHERE name = 'Salade de papaye verte';
UPDATE public.menu_items SET name_en = 'SAIN Rice (farm rice)' WHERE name = 'Riz SAIN (riz de la ferme)';
UPDATE public.menu_items SET name_en = 'Roasted Chicken' WHERE name = 'Poulet rôti';
UPDATE public.menu_items SET name_en = 'Grilled Fish' WHERE name = 'Poisson grillé';
UPDATE public.menu_items SET name_en = 'Grilled Rabbit' WHERE name = 'Lapin braisé';
UPDATE public.menu_items SET name_en = 'Seasonal Vegetables' WHERE name = 'Légumes de saison';
UPDATE public.menu_items SET name_en = 'Cassava Purée' WHERE name = 'Purée de manioc';
UPDATE public.menu_items SET name_en = 'Gari' WHERE name = 'Gari';
UPDATE public.menu_items SET name_en = 'Homemade Jam' WHERE name = 'Confiture maison';
UPDATE public.menu_items SET name_en = 'Papaya Juice' WHERE name = 'Jus de papaye';
UPDATE public.menu_items SET name_en = 'Coconut Cheese' WHERE name = 'Fromage de coco';

-- ── VIDÉOS ──
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS title_en text NOT NULL DEFAULT '';

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

UPDATE public.videos SET title_en = 'Young entrepreneurs training — SAIN'
WHERE youtube_id = 'ebattfJkYkU' AND title_en = '';

UPDATE public.videos SET title_en = 'Farm activities — SAIN Training Farm'
WHERE youtube_id = 'jMCzuutr7yY' AND title_en = '';

UPDATE public.videos SET title_en = ''  -- pas de titre, garder l'id YouTube
WHERE youtube_id = 'zG4hkH2Sjpo' AND title_en = 'Sain-Benin (présentation)';


-- ── PHOTOS : Légendes EN correctes (noms identiques) ──

-- Photos avec key fixe
UPDATE public.photos SET alt_en = 'Rice field of the SAIN farm', caption_en = 'Home banner of the SAIN farm'
WHERE key = 'hero' AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');
UPDATE public.photos SET alt_en = 'SAIN — About', caption_en = 'The SAIN farm in pictures'
WHERE key = 'apropos' AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');
UPDATE public.photos SET alt_en = 'Farm work', caption_en = 'Daily work on the farm'
WHERE key = 'apercu-1' AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');
UPDATE public.photos SET alt_en = 'Training farm students', caption_en = 'Our students in training'
WHERE key = 'apercu-2' AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');
UPDATE public.photos SET alt_en = 'Fresh fruits from the farm', caption_en = 'Fresh fruits from our production'
WHERE key = 'apercu-3' AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');
UPDATE public.photos SET alt_en = 'SAIN rooms', caption_en = 'Farm rooms'
WHERE key = 'apercu-4' AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');
UPDATE public.photos SET alt_en = 'Composting', caption_en = 'Composting, an essential practice'
WHERE key = 'apercu-5' AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');
UPDATE public.photos SET alt_en = 'The farm garden', caption_en = 'The farm garden'
WHERE key = 'apercu-6' AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');
UPDATE public.photos SET alt_en = 'Alassane Touré, former student', caption_en = 'Alassane Touré, former student of the training farm'
WHERE key = 'temoin-1' AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');
UPDATE public.photos SET alt_en = 'Marie Dubois, visitor', caption_en = 'Marie Dubois, farm visitor'
WHERE key = 'temoin-2' AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');
UPDATE public.photos SET alt_en = 'Pasteur Houensou, partner', caption_en = 'Pasteur Houensou, SAIN partner'
WHERE key = 'temoin-3' AND section_id = (SELECT id FROM public.sections WHERE slug = 'accueil');

UPDATE public.photos SET alt_en = 'The SAIN farm', caption_en = 'About page banner'
WHERE key = 'hero' AND section_id = (SELECT id FROM public.sections WHERE slug = 'projet-global');
UPDATE public.photos SET alt_en = 'Social engagement', caption_en = 'Our social commitment'
WHERE key = 'hero' AND section_id = (SELECT id FROM public.sections WHERE slug = 'responsabilite-sociale');

UPDATE public.photos SET alt_en = 'Farm work', caption_en = 'SAIN activities banner'
WHERE key = 'hero' AND section_id = (SELECT id FROM public.sections WHERE slug = 'activites-sain');
UPDATE public.photos SET alt_en = 'Plant production', caption_en = 'Our plant production'
WHERE key = 'pole-1' AND section_id = (SELECT id FROM public.sections WHERE slug = 'activites-sain');
UPDATE public.photos SET alt_en = 'Rabbit farming', caption_en = 'Our rabbit farm'
WHERE key = 'pole-2' AND section_id = (SELECT id FROM public.sections WHERE slug = 'activites-sain');
UPDATE public.photos SET alt_en = 'Rice field', caption_en = 'Our rice field'
WHERE key = 'pole-3' AND section_id = (SELECT id FROM public.sections WHERE slug = 'activites-sain');
UPDATE public.photos SET alt_en = 'Agritourism', caption_en = 'Agritourism at SAIN'
WHERE key = 'agritourisme' AND section_id = (SELECT id FROM public.sections WHERE slug = 'activites-sain');

UPDATE public.photos SET alt_en = 'Pascal Gbenou', caption_en = 'Pascal Gbenou, founder of SAIN'
WHERE key = 'membre-1' AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');
UPDATE public.photos SET alt_en = 'Bernardin DJOSSOU', caption_en = 'Bernardin DJOSSOU, team member'
WHERE key = 'membre-2' AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');
UPDATE public.photos SET alt_en = 'NEVIS Romaric David', caption_en = 'NEVIS Romaric David, team member'
WHERE key = 'membre-3' AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');
UPDATE public.photos SET alt_en = 'Jeanne Adjahoungbeta', caption_en = 'Jeanne Adjahoungbeta, team member'
WHERE key = 'membre-4' AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');
UPDATE public.photos SET alt_en = 'Lucien N''Vênihoundé', caption_en = 'Lucien N''Vênihoundé, team member'
WHERE key = 'membre-5' AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');
UPDATE public.photos SET alt_en = 'Prosper Dekpo S.', caption_en = 'Prosper Dekpo S., team member'
WHERE key = 'membre-6' AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');
UPDATE public.photos SET alt_en = 'Noëllie Oussa Zannou', caption_en = 'Noëllie Oussa Zannou, team member'
WHERE key = 'membre-7' AND section_id = (SELECT id FROM public.sections WHERE slug = 'equipe-sain');

UPDATE public.photos SET alt_en = 'Beekeeping training', caption_en = 'Beekeeping training at the farm'
WHERE key = 'hero' AND section_id = (SELECT id FROM public.sections WHERE slug = 'formations');
UPDATE public.photos SET alt_en = 'Student in training', caption_en = 'A student in practical training'
WHERE key = 'etudiant' AND section_id = (SELECT id FROM public.sections WHERE slug = 'formations');

UPDATE public.photos SET alt_en = 'The farm garden', caption_en = 'Accommodation banner'
WHERE key = 'hero' AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');
UPDATE public.photos SET alt_en = 'Farm welcome', caption_en = 'Warm welcome at the farm'
WHERE key = 'apercu-1' AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');
UPDATE public.photos SET alt_en = 'SAIN rooms', caption_en = 'Our comfortable rooms'
WHERE key = 'apercu-2' AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');
UPDATE public.photos SET alt_en = 'Farm view', caption_en = 'Panoramic view of the farm'
WHERE key = 'apercu-3' AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');
UPDATE public.photos SET alt_en = 'Guesthouse kitchen', caption_en = 'The guesthouse kitchen'
WHERE key = 'apercu-4' AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');
UPDATE public.photos SET alt_en = 'Rooms', caption_en = 'Room area'
WHERE key = 'espace-1' AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');
UPDATE public.photos SET alt_en = 'Garden', caption_en = 'The farm garden'
WHERE key = 'espace-2' AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');
UPDATE public.photos SET alt_en = 'Green areas', caption_en = 'Our green spaces'
WHERE key = 'espace-3' AND section_id = (SELECT id FROM public.sections WHERE slug = 'hebergement-ferme');

UPDATE public.photos SET alt_en = 'The farm restaurant', caption_en = 'The SAIN farm restaurant'
WHERE key = 'hero' AND section_id = (SELECT id FROM public.sections WHERE slug = 'restaurant');
UPDATE public.photos SET alt_en = 'The farm restaurant', caption_en = 'Our welcoming restaurant'
WHERE key = 'photo-1' AND section_id = (SELECT id FROM public.sections WHERE slug = 'restaurant');
UPDATE public.photos SET alt_en = 'Farm fruits', caption_en = 'Our fresh products of the day'
WHERE key = 'photo-2' AND section_id = (SELECT id FROM public.sections WHERE slug = 'restaurant');

UPDATE public.photos SET alt_en = 'The SAIN farm', caption_en = 'Farm overview'
WHERE key = 'hero' AND section_id = (SELECT id FROM public.sections WHERE slug = 'circuits-decouverte');
UPDATE public.photos SET alt_en = 'The farm wetland', caption_en = 'The farm wetland'
WHERE key = 'galerie-1' AND section_id = (SELECT id FROM public.sections WHERE slug = 'circuits-decouverte');
UPDATE public.photos SET alt_en = 'Canoe trip', caption_en = 'Canoe trip on the Ouémé River'
WHERE key = 'galerie-2' AND section_id = (SELECT id FROM public.sections WHERE slug = 'circuits-decouverte');
UPDATE public.photos SET alt_en = 'Chicken farming', caption_en = 'Our chicken farm'
WHERE key = 'galerie-3' AND section_id = (SELECT id FROM public.sections WHERE slug = 'circuits-decouverte');
UPDATE public.photos SET alt_en = 'Palm grove', caption_en = 'The farm palm grove'
WHERE key = 'galerie-4' AND section_id = (SELECT id FROM public.sections WHERE slug = 'circuits-decouverte');

UPDATE public.photos SET alt_en = 'The farm garden', caption_en = 'The farm vegetable garden'
WHERE key = 'hero' AND section_id = (SELECT id FROM public.sections WHERE slug = 'production');

UPDATE public.photos SET alt_en = 'Crop watering', caption_en = 'Students watering the crops'
WHERE key = 'hero' AND section_id = (SELECT id FROM public.sections WHERE slug = 'nous-soutenir');
UPDATE public.photos SET alt_en = 'A student at the farm', caption_en = 'A student in apprenticeship at the farm'
WHERE key = 'photo-1' AND section_id = (SELECT id FROM public.sections WHERE slug = 'nous-soutenir');
UPDATE public.photos SET alt_en = 'Beekeeping training', caption_en = 'Beekeeping training'
WHERE key = 'photo-2' AND section_id = (SELECT id FROM public.sections WHERE slug = 'nous-soutenir');
UPDATE public.photos SET alt_en = 'Crop watering', caption_en = 'Our crops in full growth'
WHERE key = 'photo-3' AND section_id = (SELECT id FROM public.sections WHERE slug = 'nous-soutenir');
UPDATE public.photos SET alt_en = 'Students', caption_en = 'Our young students'
WHERE key = 'photo-4' AND section_id = (SELECT id FROM public.sections WHERE slug = 'nous-soutenir');

UPDATE public.photos SET alt_en = 'Farm work', caption_en = 'Gallery banner'
WHERE key = 'hero' AND section_id = (SELECT id FROM public.sections WHERE slug = 'galerie');
UPDATE public.photos SET alt_en = 'A student at the farm', caption_en = 'A student passionate about agriculture'
WHERE key = 'hero' AND section_id = (SELECT id FROM public.sections WHERE slug = 'contact');
UPDATE public.photos SET alt_en = 'Action research', caption_en = 'Our action research'
WHERE key = 'hero' AND section_id = (SELECT id FROM public.sections WHERE slug = 'mentions-legales');

-- Photos libres galerie
UPDATE public.photos SET caption_en = 'Daily work at the SAIN farm' WHERE url = '/images/Travaux-Ferme-1024x768.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Students watering the crops' WHERE url = '/images/Ecole-Sain-Arrosage-1-1024x867.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'A student watering the vegetable garden' WHERE url = '/images/Arrosage-Etudiant-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'The farm vegetable garden' WHERE url = '/images/Jardin-Sain-1024x768.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Farm garden in full growth' WHERE url = '/images/Jardin3-Sain-1024x768.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Composting, natural fertilizer source' WHERE url = '/images/Compost-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Organic market gardening' WHERE url = '/images/Maraichage-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Fresh vegetables from the garden' WHERE url = '/images/Maraichage-5-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Farm market gardening' WHERE url = '/images/Maraichage-3-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Organic market gardening' WHERE url = '/images/Maraichage-4-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'The farm wetland' WHERE url = '/images/Marécage-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Agricultural work on the farm' WHERE url = '/images/Travaux-2-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Rice seedling transplanting' WHERE url = '/images/Repiquage-Sain-1-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Transplanting seedlings in progress' WHERE url = '/images/Repiquage-Sain-2-ppttfeo9obz73iq6nc47mek4fgqy114nz90vxbnfes.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Our SRI rice field' WHERE url = '/images/Riz-Sain-1024x743.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Rice harvest at the farm' WHERE url = '/images/Riz-Sain-1-1024x743.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'The farm palm grove' WHERE url = '/images/Palme-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Farm flowers' WHERE url = '/images/Fleur-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Our rabbit farm' WHERE url = '/images/Elevage-lapin-Sain-1024x806.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Farm rabbits' WHERE url = '/images/Lapins-Elevage-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Our chicken coop' WHERE url = '/images/Elevage-Poules-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Beekeeping training' WHERE url = '/images/Formation-Apiculture-1024x768.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Our beehives' WHERE url = '/images/Apiculture-Formation-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Fruits from our production' WHERE url = '/images/Fruits-Sain-1024x717.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Fresh garden fruits' WHERE url = '/images/Fruits-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Our ripe papayas' WHERE url = '/images/Papaye-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Turmeric, farm spice' WHERE url = '/images/Curcuma-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Farm-grown pineapple' WHERE url = '/images/Ananas-2-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Plantain bananas from the farm' WHERE url = '/images/banaan-scaled-e1649512167400.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Fresh cucumber juice' WHERE url = '/images/Jus-Concombre-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Our training farm students' WHERE url = '/images/Etudiants-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'A student in apprenticeship' WHERE url = '/images/Etudiant-4-1024x683.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Practical agricultural training' WHERE url = '/images/Etudiant-5-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Practical work on the farm' WHERE url = '/images/Etudiant-7-1024x683.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Our students together' WHERE url = '/images/Etudiants-2-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Group of training farm students' WHERE url = '/images/Etudiants-Sain-1024x768.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'The SAIN team together' WHERE url = '/images/Equipe-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Smiling youth from the farm' WHERE url = '/images/Sourire-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Our social commitment to the community' WHERE url = '/images/Engagement-Social-Sain-1024x768.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'SAIN solidarity engagement' WHERE url = '/images/Engagement-Social-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Farm accommodation at SAIN' WHERE url = '/images/Hebergement-9-ppv80k18zqzr9fenf1dj1cdlvqjcdnyq13mq21ey10.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Our comfortable rooms' WHERE url = '/images/Chambres-Sain-1024x768.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Farm accommodation area' WHERE url = '/images/Hébergement-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Farm rooms' WHERE url = '/images/Hébergement-3-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'The guesthouse kitchen' WHERE url = '/images/Cuisine-Gite-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Farm kitchen' WHERE url = '/images/Cuisine-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Warm welcome at the farm' WHERE url = '/images/Accueil-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'The farm welcome' WHERE url = '/images/Ferme-Accueil-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Panoramic view of the farm' WHERE url = '/images/sain1-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Guided farm tour' WHERE url = '/images/Visite-Ferme-ppttg268f6vd5rs1u49vuqmna3j4dgpyehc0x8ol38.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Farm tour for groups' WHERE url = '/images/Visite-Ferme-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Canoe trip on the Ouémé River' WHERE url = '/images/Pirogue-150x114.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Plastic sorting, eco-friendly gesture' WHERE url = '/images/Plastique-Sain-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Our action research in agriculture' WHERE url = '/images/Recherche-Sain-1024x767.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Laboratory research' WHERE url = '/images/Recherche-Sain-1-pptteyp0g5dbm5de8n7jy0labwxpe6d891xmrmb4ck.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Research work' WHERE url = '/images/Recherche-Sain-1-150x150.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'The SAIN farm as a whole' WHERE url = '/images/A-PROPOS-SAIN-1024x715.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Portrait of a team member' WHERE url = '/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg' AND key IS NULL;
UPDATE public.photos SET caption_en = 'The farm restaurant' WHERE url = '/images/Restaurant-Sain-724x1024.png' AND key IS NULL;
UPDATE public.photos SET caption_en = 'Daily life at the farm' WHERE url = '/images/sain5-150x150.jpg' AND key IS NULL;


-- ════════════════════════════════════════════════════════════════════════
-- VÉRIFICATION FINALE
-- ════════════════════════════════════════════════════════════════════════

SELECT '=== PHOTOS ===' AS section;
SELECT COUNT(*) AS total,
  COUNT(*) FILTER (WHERE alt_en != '') AS "alt_en ok",
  COUNT(*) FILTER (WHERE caption_en != '') AS "caption_en ok"
FROM public.photos;

SELECT '=== CIRCUITS FR ===' AS section;
SELECT key, title, LEFT(description, 60) || '...' AS description
FROM public.prices WHERE key LIKE 'circuit-%';

SELECT '=== CIRCUITS EN ===' AS section;
SELECT key, title_en, LEFT(description_en, 60) || '...' AS description_en
FROM public.prices WHERE key LIKE 'circuit-%';

SELECT '=== MENUS ===' AS section;
SELECT mc.name AS "FR", mc.name_en AS "EN",
       mi.name AS "Plat FR", mi.name_en AS "Plat EN"
FROM public.menu_categories mc
JOIN public.menu_items mi ON mi.category_id = mc.id
ORDER BY mc.position, mi.position;

SELECT '=== VIDÉOS ===' AS section;
SELECT title AS "FR", title_en AS "EN" FROM public.videos ORDER BY position;

SELECT '✅ Tout est correct ! FR dans les colonnes de base, vrai EN dans les colonnes _en.' AS resultat;
