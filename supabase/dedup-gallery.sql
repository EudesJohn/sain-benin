-- ════════════════════════════════════════════════════════════════════════
-- SAIN — Supprimer les doublons de photos dans la galerie
-- Exécuter dans l'éditeur SQL de Supabase Dashboard
-- ════════════════════════════════════════════════════════════════════════
-- La photo hero de la galerie et la première photo libre avaient la
-- même URL, ce qui créait un doublon visuel. Ce script supprime les
-- photos libres dont l'URL est identique à une photo fixe (key non null)
-- de la même section.
-- ════════════════════════════════════════════════════════════════════════

-- 1. Voir les doublons potentiels avant suppression
SELECT p1.id, p1.key, p1.url, p2.id AS duplicate_id, p2.url AS duplicate_url
FROM public.photos p1
JOIN public.photos p2 ON p1.section_id = p2.section_id AND p1.url = p2.url AND p1.id != p2.id
WHERE p1.key IS NOT NULL AND p2.key IS NULL
  AND p1.section_id = (SELECT id FROM public.sections WHERE slug = 'galerie');

-- 2. Supprimer les doublons (photos libres dont l'URL existe déjà en photo fixe)
DELETE FROM public.photos
WHERE id IN (
  SELECT p2.id
  FROM public.photos p1
  JOIN public.photos p2 ON p1.section_id = p2.section_id AND p1.url = p2.url AND p1.id != p2.id
  WHERE p1.key IS NOT NULL AND p2.key IS NULL
    AND p1.section_id = (SELECT id FROM public.sections WHERE slug = 'galerie')
);

-- 3. Vérification
SELECT COUNT(*) AS "Photos restantes dans la galerie"
FROM public.photos
WHERE section_id = (SELECT id FROM public.sections WHERE slug = 'galerie');

-- 4. Vérifier qu'il n'y a plus de doublons
SELECT url, COUNT(*) AS occurrences
FROM public.photos
WHERE section_id = (SELECT id FROM public.sections WHERE slug = 'galerie')
GROUP BY url
HAVING COUNT(*) > 1;
