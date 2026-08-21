-- ════════════════════════════════════════════════════════════════════════
-- SAIN — Ajout des colonnes bilingues pour les photos
-- Alt FR/EN et Caption FR/EN
-- Exécutez ce script dans l'éditeur SQL de Supabase Dashboard
-- ════════════════════════════════════════════════════════════════════════

-- 1. Ajouter les colonnes bilingues
ALTER TABLE public.photos
  ADD COLUMN IF NOT EXISTS alt_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS caption_en text NOT NULL DEFAULT '';

-- 2. Copier les valeurs FR existantes vers les champs EN (pour ne pas perdre)
-- Les admins pourront ensuite modifier les valeurs EN
UPDATE public.photos SET alt_en = alt WHERE alt_en = '' AND alt != '';
UPDATE public.photos SET caption_en = caption WHERE caption_en = '' AND caption != '';
