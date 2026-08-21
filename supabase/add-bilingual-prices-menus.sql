-- Migration : Ajout des colonnes bilingues pour les prix et les menus
-- A executer dans l'editeur SQL Supabase

-- ============================================================
-- 1. PRIX / TARIFS — ajouter les colonnes EN
-- ============================================================
ALTER TABLE public.prices
  ADD COLUMN IF NOT EXISTS title_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS subtitle_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS price_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS details_en text NOT NULL DEFAULT '';

-- Copier les valeurs FR vers EN pour les lignes existantes
UPDATE public.prices SET title_en = title WHERE title_en = '' AND title != '';
UPDATE public.prices SET subtitle_en = subtitle WHERE subtitle_en = '' AND subtitle != '';
UPDATE public.prices SET price_en = price WHERE price_en = '' AND price != '';
UPDATE public.prices SET description_en = description WHERE description_en = '' AND description != '';
UPDATE public.prices SET details_en = details WHERE details_en = '' AND details != '';

-- ============================================================
-- 2. CATEGORIES DE MENU — ajouter la colonne EN
-- ============================================================
ALTER TABLE public.menu_categories
  ADD COLUMN IF NOT EXISTS name_en text NOT NULL DEFAULT '';

-- Copier les valeurs FR vers EN
UPDATE public.menu_categories SET name_en = name WHERE name_en = '' AND name != '';

-- ============================================================
-- 3. PLATS DE MENU — ajouter la colonne EN
-- ============================================================
ALTER TABLE public.menu_items
  ADD COLUMN IF NOT EXISTS name_en text NOT NULL DEFAULT '';

-- Copier les valeurs FR vers EN
UPDATE public.menu_items SET name_en = name WHERE name_en = '' AND name != '';

-- ============================================================
-- VERIFICATION
-- ============================================================
SELECT 'prices' AS table_name, COUNT(*) AS total, COUNT(*) FILTER (WHERE title_en != '') AS with_en FROM public.prices
UNION ALL
SELECT 'menu_categories', COUNT(*), COUNT(*) FILTER (WHERE name_en != '') FROM public.menu_categories
UNION ALL
SELECT 'menu_items', COUNT(*), COUNT(*) FILTER (WHERE name_en != '') FROM public.menu_items;
