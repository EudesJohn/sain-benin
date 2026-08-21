-- ════════════════════════════════════════════════════════════════════════
-- SAIN — Script SQL complet : toutes les modifications
-- Exécuter dans l'éditeur SQL de Supabase Dashboard
-- https://supabase.com/dashboard → ton projet → SQL Editor → Run
-- ════════════════════════════════════════════════════════════════════════
-- Ce script est idempotent : il peut être exécuté plusieurs fois
-- sans risque de doublon ou d'erreur (grâce à IF NOT EXISTS).
-- ════════════════════════════════════════════════════════════════════════


-- ============================================================
-- PARTIE 1 : TABLE contact_info (numéros, email, réseaux sociaux)
-- ============================================================

create table if not exists public.contact_info (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null default '',
  label text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.contact_info enable row level security;

drop policy if exists "Contact info : lecture publique" on public.contact_info;
create policy "Contact info : lecture publique" on public.contact_info
  for select using (true);

drop policy if exists "Contact info : ajout admin" on public.contact_info;
create policy "Contact info : ajout admin" on public.contact_info
  for insert with check (public.is_admin());

drop policy if exists "Contact info : modification admin" on public.contact_info;
create policy "Contact info : modification admin" on public.contact_info
  for update using (public.is_admin());

drop policy if exists "Contact info : suppression admin" on public.contact_info;
create policy "Contact info : suppression admin" on public.contact_info
  for delete using (public.is_admin());

-- Seed : données de contact initiales
insert into public.contact_info (key, value, label) values
  ('whatsapp', '+229 01 95 40 54 33', 'Numéro WhatsApp'),
  ('mobile', '+229 97 65 56 28', 'Numéro mobile'),
  ('email', 'sainbenin@yahoo.fr', 'Adresse email'),
  ('facebook', 'https://www.facebook.com/Ferme-Ecole-SAIN-108352284147580/', 'Facebook'),
  ('youtube', 'https://www.youtube.com/channel/UCN982W_xV7nRHt6aW1mAIwA', 'YouTube'),
  ('instagram', 'https://www.instagram.com/fermeecolesain/', 'Instagram')
on conflict (key) do update set
  value = excluded.value,
  label = excluded.label,
  updated_at = now();


-- ============================================================
-- PARTIE 2 : Colonnes bilingues pour les PHOTOS (alt_en, caption_en)
-- ============================================================

ALTER TABLE public.photos
  ADD COLUMN IF NOT EXISTS alt_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS caption_en text NOT NULL DEFAULT '';

UPDATE public.photos SET alt_en = alt WHERE alt_en = '' AND alt != '';
UPDATE public.photos SET caption_en = caption WHERE caption_en = '' AND caption != '';


-- ============================================================
-- PARTIE 3 : Colonnes bilingues pour les PRIX / TARIFS
-- ============================================================

ALTER TABLE public.prices
  ADD COLUMN IF NOT EXISTS title_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS subtitle_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS price_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS details_en text NOT NULL DEFAULT '';

UPDATE public.prices SET title_en = title WHERE title_en = '' AND title != '';
UPDATE public.prices SET subtitle_en = subtitle WHERE subtitle_en = '' AND subtitle != '';
UPDATE public.prices SET price_en = price WHERE price_en = '' AND price != '';
UPDATE public.prices SET description_en = description WHERE description_en = '' AND description != '';
UPDATE public.prices SET details_en = details WHERE details_en = '' AND details != '';


-- ============================================================
-- PARTIE 4 : Colonnes bilingues pour les MENUS du restaurant
-- ============================================================

-- Catégories de menu
ALTER TABLE public.menu_categories
  ADD COLUMN IF NOT EXISTS name_en text NOT NULL DEFAULT '';

UPDATE public.menu_categories SET name_en = name WHERE name_en = '' AND name != '';

-- Plats de menu
ALTER TABLE public.menu_items
  ADD COLUMN IF NOT EXISTS name_en text NOT NULL DEFAULT '';

UPDATE public.menu_items SET name_en = name WHERE name_en = '' AND name != '';


-- ============================================================
-- VERIFICATION FINALE
-- ============================================================

SELECT 'contact_info' AS table_name, COUNT(*) AS total FROM public.contact_info
UNION ALL
SELECT 'photos (alt_en)', COUNT(*) FROM public.photos WHERE alt_en != ''
UNION ALL
SELECT 'prices (title_en)', COUNT(*) FROM public.prices WHERE title_en != ''
UNION ALL
SELECT 'menu_categories (name_en)', COUNT(*) FROM public.menu_categories WHERE name_en != ''
UNION ALL
SELECT 'menu_items (name_en)', COUNT(*) FROM public.menu_items WHERE name_en != '';
