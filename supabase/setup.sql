-- ════════════════════════════════════════════════════════════════════════
-- SAIN — Mise en place Supabase (base de données + stockage + sécurité)
-- Script idempotent : exécutable à tout moment dans l'éditeur SQL (relançable sans risque).
-- ════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────
-- 1. Tables
-- ─────────────────────────────────────────────

-- Sections du site (une ligne par page)
create table if not exists public.sections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

-- Photos : une ligne par photo.
--   • key  : emplacement fixe dans la section (ex. 'hero', 'membre-1'), NULL pour
--            une photo libre (galerie). Unique par section.
--   • url  : chemin local ('/images/...') ou URL Supabase Storage.
--   • position : ordre d'affichage (photos libres).
create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.sections(id) on delete cascade,
  key text,
  url text not null default '',
  alt text not null default '',
  caption text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default now(),
  unique (section_id, key)
);

-- ─────────────────────────────────────────────
-- 2. Sécurité (Row Level Security)
-- Lecture publique ; écriture réservée à l'admin (email défini dans is_admin()).
-- ─────────────────────────────────────────────

-- Autorisation admin : seul cet email peut écrire.
-- ⚠️ L'email doit correspondre au compte créé dans Authentication.
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select auth.email() = 'sainbenin@yahoo.fr';
$$;

alter table public.sections enable row level security;
alter table public.photos enable row level security;

drop policy if exists "Sections : lecture publique" on public.sections;
create policy "Sections : lecture publique" on public.sections for select using (true);
drop policy if exists "Sections : écriture admin" on public.sections;
create policy "Sections : écriture admin" on public.sections
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Photos : lecture publique" on public.photos;
create policy "Photos : lecture publique" on public.photos for select using (true);
drop policy if exists "Photos : ajout admin" on public.photos;
create policy "Photos : ajout admin" on public.photos for insert with check (public.is_admin());
drop policy if exists "Photos : modification admin" on public.photos;
create policy "Photos : modification admin" on public.photos for update using (public.is_admin());
drop policy if exists "Photos : suppression admin" on public.photos;
create policy "Photos : suppression admin" on public.photos for delete using (public.is_admin());

-- ─────────────────────────────────────────────
-- 3. Stockage (bucket « photos », public en lecture)
-- ─────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

drop policy if exists "Photos : lecture publique" on storage.objects;
create policy "Photos : lecture publique" on storage.objects
  for select using (bucket_id = 'photos');
drop policy if exists "Photos : upload admin" on storage.objects;
create policy "Photos : upload admin" on storage.objects
  for insert with check (bucket_id = 'photos' and public.is_admin());
drop policy if exists "Photos : mise à jour admin" on storage.objects;
create policy "Photos : mise à jour admin" on storage.objects
  for update using (bucket_id = 'photos' and public.is_admin());
drop policy if exists "Photos : suppression admin" on storage.objects;
create policy "Photos : suppression admin" on storage.objects
  for delete using (bucket_id = 'photos' and public.is_admin());

-- ─────────────────────────────────────────────
-- 4. Sections (seed)
-- ─────────────────────────────────────────────

insert into public.sections (slug, name) values
  ('accueil', 'Accueil'),
  ('projet-global', 'À propos'),
  ('responsabilite-sociale', 'RSE'),
  ('activites-sain', 'Activités'),
  ('equipe-sain', 'Équipe'),
  ('formations', 'Formations'),
  ('hebergement-ferme', 'Hébergement'),
  ('restaurant', 'Restaurant'),
  ('circuits-decouverte', 'Circuits'),
  ('production', 'Production'),
  ('nous-soutenir', 'Soutien'),
  ('galerie', 'Galerie'),
  ('contact', 'Contact'),
  ('mentions-legales', 'Mentions légales')
on conflict (slug) do nothing;

-- ─────────────────────────────────────────────
-- 5. Photos par défaut (seed) — reproduit les images actuelles du site
-- ─────────────────────────────────────────────

insert into public.photos (section_id, key, url, alt, caption, position)
select s.id, v.key, v.url, v.alt, v.caption, v.position
from (values
  -- Accueil
  ('accueil', 'hero', '/images/Riz-Sain-1024x743.jpg', 'Champ de riz de la ferme SAIN', '', 0),
  ('accueil', 'apropos', '/images/A-PROPOS-SAIN-1024x715.jpg', 'SAIN — À propos', '', 0),
  ('accueil', 'apercu-1', '/images/Travaux-Ferme-1024x768.jpg', 'Travaux à la ferme', '', 0),
  ('accueil', 'apercu-2', '/images/Etudiants-Sain-150x150.jpg', 'Étudiants de la ferme école', '', 0),
  ('accueil', 'apercu-3', '/images/Fruits-Sain-150x150.jpg', 'Fruits frais de la ferme', '', 0),
  ('accueil', 'apercu-4', '/images/Chambres-Sain-150x150.jpg', 'Chambres de la ferme', '', 0),
  ('accueil', 'apercu-5', '/images/Compost-Sain-150x150.jpg', 'Compostage', '', 0),
  ('accueil', 'apercu-6', '/images/Jardin-Sain-150x150.jpg', 'Jardin de la ferme', '', 0),
  ('accueil', 'temoin-1', '/images/Etudiants-2-150x150.jpg', 'Alassane Touré, ancien élève', '', 0),
  ('accueil', 'temoin-2', '/images/Visite-Ferme-150x150.jpg', 'Marie Dubois, visiteuse', '', 0),
  ('accueil', 'temoin-3', '/images/Sourire-Sain-150x150.jpg', 'Pasteur Houensou, partenaire', '', 0),
  -- À propos / RSE
  ('projet-global', 'hero', '/images/A-PROPOS-SAIN-1024x715.jpg', 'La ferme SAIN', '', 0),
  ('responsabilite-sociale', 'hero', '/images/Engagement-Social-Sain-1024x768.jpg', 'Engagement social', '', 0),
  -- Activités
  ('activites-sain', 'hero', '/images/Travaux-Ferme-1024x768.jpg', 'Travaux à la ferme', '', 0),
  ('activites-sain', 'pole-1', '/images/Fruits-Sain-1024x717.jpg', 'Production végétale', '', 0),
  ('activites-sain', 'pole-2', '/images/Elevage-lapin-Sain-1024x806.jpg', 'Élevage de lapins', '', 0),
  ('activites-sain', 'pole-3', '/images/Riz-Sain-1024x743.jpg', 'Champ de riz', '', 0),
  ('activites-sain', 'agritourisme', '/images/Fruits-Sain-1024x717.jpg', 'Agritourisme', '', 0),
  -- Équipe
  ('equipe-sain', 'hero', '/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg', 'Regard', '', 0),
  ('equipe-sain', 'membre-1', '/images/Pascal-Gbenou.jpg', 'Pascal Gbenou', '', 0),
  ('equipe-sain', 'membre-2', '/images/Bernardin.jpg', 'Bernardin DJOSSOU', '', 0),
  ('equipe-sain', 'membre-3', '/images/NEVIS-Romaric.jpg', 'NEVIS Romaric David', '', 0),
  ('equipe-sain', 'membre-4', '/images/Jeanne-150x150.jpg', 'Jeanne Adjahoungbeta', '', 0),
  ('equipe-sain', 'membre-5', '/images/Lucien-150x150.jpg', 'Lucien N''Vênihoundé', '', 0),
  ('equipe-sain', 'membre-6', '/images/Prosper-150x150.jpg', 'Prosper Dekpo S.', '', 0),
  ('equipe-sain', 'membre-7', '/images/Noellie-e1655720153956-150x150.jpg', 'Noëllie Oussa Zannou', '', 0),
  -- Formations
  ('formations', 'hero', '/images/Formation-Apiculture-ppttd5u5ckwjd1zlrd6anyyhcbtdn27r04x4niza9w.jpg', 'Formation en apiculture', '', 0),
  ('formations', 'etudiant', '/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg', 'Étudiant en formation', '', 0),
  -- Hébergement
  ('hebergement-ferme', 'hero', '/images/Jardin3-Sain-1024x768.jpg', 'Jardin de la ferme', '', 0),
  ('hebergement-ferme', 'apercu-1', '/images/Accueil-Sain-150x150.jpg', 'Accueil à la ferme', '', 0),
  ('hebergement-ferme', 'apercu-2', '/images/Chambres-Sain-1024x768.jpg', 'Chambres SAIN', '', 0),
  ('hebergement-ferme', 'apercu-3', '/images/sain1-150x150.jpg', 'Vue de la ferme', '', 0),
  ('hebergement-ferme', 'apercu-4', '/images/Cuisine-Gite-150x150.jpg', 'Cuisine du gîte', '', 0),
  ('hebergement-ferme', 'espace-1', '/images/Hebergement-9-ppv80k18zqzr9fenf1dj1cdlvqjcdnyq13mq21ey10.jpg', 'Chambres', '', 0),
  ('hebergement-ferme', 'espace-2', '/images/Palme-Sain-150x150.jpg', 'Jardin', '', 0),
  ('hebergement-ferme', 'espace-3', '/images/Fleur-150x150.jpg', 'Espaces verts', '', 0),
  -- Restaurant
  ('restaurant', 'hero', '/images/Restaurant-Sain-724x1024.png', 'Le restaurant de la ferme', '', 0),
  ('restaurant', 'photo-1', '/images/Restaurant-Sain-724x1024.png', 'Le restaurant de la ferme', '', 0),
  ('restaurant', 'photo-2', '/images/Fruits-Sain-1024x717.jpg', 'Fruits de la ferme', '', 0),
  -- Circuits
  ('circuits-decouverte', 'hero', '/images/A-PROPOS-SAIN-1024x715.jpg', 'La ferme SAIN', '', 0),
  ('circuits-decouverte', 'galerie-1', '/images/Marécage-150x150.jpg', 'Le marécage de la ferme', '', 0),
  ('circuits-decouverte', 'galerie-2', '/images/Pirogue-150x114.jpg', 'Tour en pirogue', '', 0),
  ('circuits-decouverte', 'galerie-3', '/images/Elevage-Poules-Sain-150x150.jpg', 'Élevage de poules', '', 0),
  ('circuits-decouverte', 'galerie-4', '/images/Palme-Sain-150x150.jpg', 'Palmeraie', '', 0),
  -- Production
  ('production', 'hero', '/images/Jardin-Sain-1024x768.jpg', 'Le jardin de la ferme', '', 0),
  ('production', 'produit-fresh-fruits', '/images/Fruits-Sain-150x150.jpg', 'Fruits', '', 0),
  ('production', 'produit-fresh-item-papayes', '/images/Papaye-Sain-150x150.jpg', 'Papayes', '', 0),
  ('production', 'produit-fresh-item-coco', '/images/Palme-Sain-150x150.jpg', 'Coco', '', 0),
  ('production', 'produit-fresh-item-ananas', '/images/Ananas-2-150x150.jpg', 'Ananas', '', 0),
  ('production', 'produit-fresh-item-bananes-plantains', '/images/banaan-1024x768.jpg', 'Bananes plantains', '', 0),
  ('production', 'produit-fresh-legumes', '/images/Maraichage-4-150x150.jpg', 'Légumes', '', 0),
  ('production', 'produit-fresh-oeufs', '/images/Elevage-Poules-Sain-150x150.jpg', 'Œufs', '', 0),
  ('production', 'produit-fresh-viandes', '/images/Lapins-Elevage-150x150.jpg', 'Viandes', '', 0),
  ('production', 'produit-fresh-poissons', '/images/Pirogue-150x114.jpg', 'Poissons', '', 0),
  ('production', 'produit-fresh-autres', '/images/Apiculture-Formation-150x150.jpg', 'Autres produits', '', 0),
  ('production', 'produit-processed-jus-de-papaye', '/images/Papaye-Sain-150x150.jpg', 'Jus de papaye', '', 0),
  ('production', 'produit-processed-huile-de-coco', '/images/Palme-Sain-150x150.jpg', 'Huile de coco', '', 0),
  ('production', 'produit-processed-huile-de-palme', '/images/Curcuma-Sain-150x150.jpg', 'Huile de palme', '', 0),
  -- Soutien
  ('nous-soutenir', 'hero', '/images/Ecole-Sain-Arrosage-1-1024x867.jpg', 'Arrosage des cultures', '', 0),
  ('nous-soutenir', 'photo-1', '/images/Etudiant-4-1024x683.jpg', 'Un étudiant à la ferme', '', 0),
  ('nous-soutenir', 'photo-2', '/images/Formation-Apiculture-1024x768.jpg', 'Formation en apiculture', '', 0),
  ('nous-soutenir', 'photo-3', '/images/Ecole-Sain-Arrosage-1-1024x867.jpg', 'Arrosage des cultures', '', 0),
  ('nous-soutenir', 'photo-4', '/images/Etudiants-2-150x150.jpg', 'Étudiants de la ferme', '', 0),
  -- Galerie (bannière)
  ('galerie', 'hero', '/images/Travaux-Ferme-1024x768.jpg', 'Travaux à la ferme', '', 0),
  -- Contact / Mentions légales
  ('contact', 'hero', '/images/Etudiant-4-1024x683.jpg', 'Un étudiant à la ferme', '', 0),
  ('mentions-legales', 'hero', '/images/Recherche-Sain-1024x767.jpg', 'Recherche-action', '', 0)
) as v(slug, key, url, alt, caption, position)
join public.sections s on s.slug = v.slug
on conflict (section_id, key) do nothing;

-- ─────────────────────────────────────────────
-- 6. Photos libres de la galerie (seed)
-- ─────────────────────────────────────────────

insert into public.photos (section_id, key, url, alt, caption, position)
select s.id, null, v.url, v.alt, '', v.position
from (values
  -- La ferme & les travaux
  ('/images/Travaux-Ferme-1024x768.jpg', 'Travaux à la ferme', 0),
  ('/images/Ecole-Sain-Arrosage-1-1024x867.jpg', 'Arrosage des cultures', 1),
  ('/images/Arrosage-Etudiant-150x150.jpg', 'Un étudiant arrose le jardin', 2),
  ('/images/Jardin-Sain-1024x768.jpg', 'Le jardin de la ferme', 3),
  ('/images/Jardin3-Sain-1024x768.jpg', 'Jardin de la ferme', 4),
  ('/images/Compost-Sain-150x150.jpg', 'Compostage', 5),
  ('/images/Maraichage-150x150.jpg', 'Maraîchage', 6),
  ('/images/Maraichage-5-150x150.jpg', 'Culture maraîchère', 7),
  ('/images/Maraichage-3-150x150.jpg', 'Maraîchage', 8),
  ('/images/Maraichage-4-150x150.jpg', 'Culture maraîchère', 9),
  ('/images/Marécage-150x150.jpg', 'Le marécage de la ferme', 10),
  ('/images/Travaux-2-150x150.jpg', 'Travaux de la ferme', 11),
  ('/images/Repiquage-Sain-1-150x150.jpg', 'Repiquage des plants', 12),
  ('/images/Repiquage-Sain-2-ppttfeo9obz73iq6nc47mek4fgqy114nz90vxbnfes.jpg', 'Repiquage des plants', 13),
  ('/images/Riz-Sain-1024x743.jpg', 'Champ de riz', 14),
  ('/images/Riz-Sain-1-1024x743.jpg', 'Récolte du riz', 15),
  ('/images/Palme-Sain-150x150.jpg', 'Palmeraie', 16),
  ('/images/Fleur-150x150.jpg', 'Fleurs de la ferme', 17),
  -- Élevage & produits
  ('/images/Elevage-lapin-Sain-1024x806.jpg', 'Élevage de lapins', 18),
  ('/images/Lapins-Elevage-150x150.jpg', 'Lapins de la ferme', 19),
  ('/images/Elevage-Poules-Sain-150x150.jpg', 'Élevage de poules', 20),
  ('/images/Formation-Apiculture-1024x768.jpg', 'Formation en apiculture', 21),
  ('/images/Apiculture-Formation-150x150.jpg', 'Apiculture', 22),
  ('/images/Fruits-Sain-1024x717.jpg', 'Fruits de la ferme', 23),
  ('/images/Fruits-Sain-150x150.jpg', 'Fruits frais', 24),
  ('/images/Papaye-Sain-150x150.jpg', 'Papayes', 25),
  ('/images/Curcuma-Sain-150x150.jpg', 'Curcuma', 26),
  ('/images/Ananas-2-150x150.jpg', 'Ananas de la ferme', 27),
  ('/images/banaan-scaled-e1649512167400.jpg', 'Bananes plantains', 28),
  ('/images/Jus-Concombre-Sain-150x150.jpg', 'Jus de concombre', 29),
  -- Étudiants, formation & équipe
  ('/images/Etudiants-Sain-150x150.jpg', 'Étudiants de la ferme école', 30),
  ('/images/Etudiant-4-1024x683.jpg', 'Un étudiant à la ferme', 31),
  ('/images/Etudiant-5-150x150.jpg', 'Étudiant en formation', 32),
  ('/images/Etudiant-7-1024x683.jpg', 'Formation pratique', 33),
  ('/images/Etudiants-2-150x150.jpg', 'Étudiants de la ferme', 34),
  ('/images/Etudiants-Sain-1024x768.jpg', 'Groupe d''étudiants de la ferme', 35),
  ('/images/Equipe-Sain-150x150.jpg', 'L''équipe SAIN', 36),
  ('/images/Sourire-Sain-150x150.jpg', 'Jeunes souriants', 37),
  ('/images/Engagement-Social-Sain-1024x768.jpg', 'Engagement social', 38),
  ('/images/Engagement-Social-Sain-150x150.jpg', 'Engagement solidaire', 39),
  -- Hébergement & accueil
  ('/images/Hebergement-9-ppv80k18zqzr9fenf1dj1cdlvqjcdnyq13mq21ey10.jpg', 'Hébergement à la ferme', 40),
  ('/images/Chambres-Sain-1024x768.jpg', 'Chambres SAIN', 41),
  ('/images/Hébergement-Sain-150x150.jpg', 'Hébergement à la ferme', 42),
  ('/images/Hébergement-3-Sain-150x150.jpg', 'Hébergement de la ferme', 43),
  ('/images/Cuisine-Gite-150x150.jpg', 'Cuisine du gîte', 44),
  ('/images/Cuisine-Sain-150x150.jpg', 'Cuisine de la ferme', 45),
  ('/images/Accueil-Sain-150x150.jpg', 'Accueil à la ferme', 46),
  ('/images/Ferme-Accueil-150x150.jpg', 'Accueil de la ferme', 47),
  ('/images/sain1-150x150.jpg', 'Vue de la ferme', 48),
  -- Nature, recherche & découverte
  ('/images/Visite-Ferme-ppttg268f6vd5rs1u49vuqmna3j4dgpyehc0x8ol38.jpg', 'Visite de la ferme', 49),
  ('/images/Visite-Ferme-150x150.jpg', 'Visite guidée', 50),
  ('/images/Pirogue-150x114.jpg', 'Tour en pirogue', 51),
  ('/images/Plastique-Sain-150x150.jpg', 'Tri du plastique', 52),
  ('/images/Recherche-Sain-1024x767.jpg', 'Recherche-action', 53),
  ('/images/Recherche-Sain-1-pptteyp0g5dbm5de8n7jy0labwxpe6d891xmrmb4ck.jpg', 'Recherche en laboratoire', 54),
  ('/images/Recherche-Sain-1-150x150.jpg', 'Recherche', 55),
  ('/images/A-PROPOS-SAIN-1024x715.jpg', 'La ferme SAIN', 56),
  ('/images/Reagard-ppttevvhvn9gnbhhp3zo8jawjrblr3218nz6bsfav8.jpg', 'Regard', 57),
  ('/images/Restaurant-Sain-724x1024.png', 'Le restaurant de la ferme', 58),
  ('/images/sain5-150x150.jpg', 'Vie à la ferme', 59)
) as v(url, alt, position)
cross join public.sections s
where s.slug = 'galerie'
on conflict (section_id, key) do nothing;

-- ─────────────────────────────────────────────
-- 7. Vidéos de la galerie (YouTube)
-- ─────────────────────────────────────────────

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.sections(id) on delete cascade,
  youtube_id text not null,
  title text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default now(),
  unique (section_id, youtube_id)
);

alter table public.videos enable row level security;

drop policy if exists "Vidéos : lecture publique" on public.videos;
create policy "Vidéos : lecture publique" on public.videos for select using (true);
drop policy if exists "Vidéos : ajout admin" on public.videos;
create policy "Vidéos : ajout admin" on public.videos for insert with check (public.is_admin());
drop policy if exists "Vidéos : modification admin" on public.videos;
create policy "Vidéos : modification admin" on public.videos for update using (public.is_admin());
drop policy if exists "Vidéos : suppression admin" on public.videos;
create policy "Vidéos : suppression admin" on public.videos for delete using (public.is_admin());

-- Seed : les 12 vidéos actuelles (3 anciennes + 9 de la chaîne officielle)
insert into public.videos (section_id, youtube_id, title, position)
select s.id, v.youtube_id, v.title, v.position
from (values
  ('galerie', 'zG4hkH2Sjpo', 'Sain-Benin (présentation)', 0),
  ('galerie', 'ebattfJkYkU', '17  Augustin 1', 1),
  ('galerie', 'jMCzuutr7yY', '14', 2),
  ('galerie', 'HR1WALBrX6A', 'A la découverte de la Ferme école SAIN de Kakanitchoé au Bénin (Adjohoun-Ouémé)', 3),
  ('galerie', 'YqyEomOeKyw', 'La Ferme Ecole SAIN et la Fondation Collibri', 4),
  ('galerie', 'zI-ZXgILGjo', 'La 23ième promotion des jeunes entrepreneurs de la Ferme École SAIN', 5),
  ('galerie', '1qbu0Z0b4Ew', 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités', 6),
  ('galerie', '6zjG2PlL0e4', 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités', 7),
  ('galerie', 'ALYKlX-yHCI', 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités', 8),
  ('galerie', 'g1tTBNIs8Do', 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités', 9),
  ('galerie', 'oua2snW8qfw', 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités', 10),
  ('galerie', 'hVuvXNtj4LI', 'Agriculture : destruction de la Ferme École SAIN de Kakanitchoé par une tempête', 11)
) as v(slug, youtube_id, title, position)
join public.sections s on s.slug = v.slug
on conflict (section_id, youtube_id) do nothing;

-- ─────────────────────────────────────────────
-- 8. Prix & tarifs (hébergement, circuits, soutien)
-- ─────────────────────────────────────────────

-- Une ligne par article tarifé.
--   • category : 'room' / 'board' pour l'hébergement, 'circuit', 'program', sinon ''.
--   • title, subtitle, description, price, duration : contenus affichés sur la page.
--   • details : une puce par ligne (séparées par des retours à la ligne).
--   • key : identifiant stable des lignes semées (permet une ré-exécution sans doublon) ;
--           les lignes ajoutées par l'admin ont key = NULL.
--   • position : ordre d'affichage.
create table if not exists public.prices (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.sections(id) on delete cascade,
  key text,
  category text not null default '',
  title text not null default '',
  subtitle text not null default '',
  description text not null default '',
  price text not null default '',
  duration text not null default '',
  details text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default now(),
  unique (section_id, key)
);

alter table public.prices enable row level security;

drop policy if exists "Prix : lecture publique" on public.prices;
create policy "Prix : lecture publique" on public.prices for select using (true);
drop policy if exists "Prix : ajout admin" on public.prices;
create policy "Prix : ajout admin" on public.prices for insert with check (public.is_admin());
drop policy if exists "Prix : modification admin" on public.prices;
create policy "Prix : modification admin" on public.prices for update using (public.is_admin());
drop policy if exists "Prix : suppression admin" on public.prices;
create policy "Prix : suppression admin" on public.prices for delete using (public.is_admin());

-- Seed : reproduit les tarifs actuellement affichés sur le site
insert into public.prices (section_id, key, category, title, subtitle, description, price, duration, details, position)
select s.id, v.key, v.category, v.title, v.subtitle, v.description, v.price, v.duration, v.details, v.position
from (values
  -- Hébergement — types de chambres
  ('hebergement-ferme', 'room-1', 'room', 'Chambre Simple', '', 'Chambre individuelle confortable', '10,000 FCFA', '', '', 0),
  ('hebergement-ferme', 'room-2', 'room', 'Chambre Double', '', 'Chambre double avec espace de vie', '10,000 FCFA', '', '', 1),
  ('hebergement-ferme', 'room-3', 'room', 'Chambre Double + Salon', '', 'Chambre double avec espace de séjour privatif', '12,000-15,000 FCFA', '', '', 2),
  ('hebergement-ferme', 'room-4', 'room', 'Chambre Familiale + Salon', '', 'Chambre familiale spacieuse avec salon', '18,000 FCFA', '', '', 3),
  ('hebergement-ferme', 'room-5', 'room', 'Dortoir', '', 'Chambre partagée pour 4 à 6 personnes', 'Sur demande', '', '', 4),
  ('hebergement-ferme', 'room-6', 'room', 'Matelas supplémentaire', '', 'Ajout d''un matelas dans votre chambre', '2,500 FCFA (1 pers) / 5,000 FCFA (2 pers)', '', '', 5),
  -- Hébergement — pension complète
  ('hebergement-ferme', 'board-1', 'board', 'Chambre simple', '', '', '17,000 FCFA', '', '', 0),
  ('hebergement-ferme', 'board-2', 'board', 'Chambre double', '', '', '17,000 FCFA', '', '', 1),
  ('hebergement-ferme', 'board-3', 'board', 'Chambre double + salon', '', '', '18,000-20,000 FCFA', '', '', 2),
  ('hebergement-ferme', 'board-4', 'board', 'Chambre familiale', '', '', '18,000-24,000 FCFA', '', '', 3),
  -- Circuits découverte
  ('circuits-decouverte', 'circuit-1', 'circuit', 'Découverte du marché local', 'Marché d''Akpadanou', 'Immersive local market experience with guided tours and tasting of local specialties.', '10 000 FCFA jusqu''à 5 pers, +1 000 FCFA/personne', '1-3 heures (jours de marché)', '', 0),
  ('circuits-decouverte', 'circuit-2', 'circuit', 'Découverte du village', 'Kakanitchoé', 'Cultural immersion experiencing daily village life including oil preparation, gari making, and traditional distillation.', '10 000 FCFA jusqu''à 5 pers, +1 000 FCFA/personne', '1-3 heures (matin ou après-midi)', '', 1),
  ('circuits-decouverte', 'circuit-3', 'circuit', 'Circuit Nature', 'Faune et flore', 'Educational nature center offering school groups and families programs about local flora/fauna.', '20 000 FCFA jusqu''à 5 pers, +2 000 FCFA/personne', '1-3 heures', '', 2),
  ('circuits-decouverte', 'circuit-4', 'circuit', 'Randonnée', 'Champs et marécage', 'Agricultural field exploration showing seasonal crops and farmer interactions, plus marshland visit.', '10 000 FCFA jusqu''à 5 pers, +1 000 FCFA/personne', '1-3 heures (matin ou après-midi)', '', 3),
  ('circuits-decouverte', 'circuit-5', 'circuit', 'Tour en pirogue', 'Fleuve Ouémé', 'Traditional canoe tour along Ouémé River visiting KPINKON protected forest island.', '10 000 FCFA jusqu''à 4 pers, 12 500 FCFA jusqu''à 5 pers, +1 000 FCFA/personne', '1-3 heures (matin ou après-midi)', '', 4),
  ('circuits-decouverte', 'circuit-6', 'circuit', 'Visite de la ferme', 'Activités agroécoliques', 'Guided farm visit showcasing agroecological practices including mushroom production, honey, fish, rabbits, and quails.', '5 000 FCFA jusqu''à 4 pers, +1 000 FCFA/personne', '1-2 heures', '', 5),
  -- Soutien — programmes de parrainage
  ('nous-soutenir', 'program-1', 'program', 'Parrainage Mensuel', '', 'Soutenir un jeune dans sa formation agricole', '€3/jour (€90/mois)', '', 'Couvre les besoins en fournitures et en alimentation
Permet l''accès à la formation professionnelle
Suivi personnalisé tout au long de la formation
Partenaire avec des projets durables', 0),
  ('nous-soutenir', 'program-2', 'program', 'Amélioration des Infrastructures', '', 'Financer des aménagements agricoles et pédagogiques', 'Sur mesure', '', 'Systèmes d''irrigation durable
Bassins de pisciculture
Unités de transformation agroalimentaire
Espaces pédagogiques améliorés', 1),
  ('nous-soutenir', 'program-3', 'program', 'Bourses pour Jeunes', '', 'Financer l''éducation des enfants défavorisés', '€10-25/mois', '', 'Fournitures scolaires
Frais d''inscription
Repas et hébergement
Suivi éducatif personnalisé', 2)
) as v(slug, key, category, title, subtitle, description, price, duration, details, position)
join public.sections s on s.slug = v.slug
on conflict (section_id, key) do nothing;
