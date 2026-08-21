-- ════════════════════════════════════════════════════════════════════════
-- SAIN — Supprimer TOUS les doublons de photos dans la galerie
-- Exécuter dans l'éditeur SQL de Supabase Dashboard
-- ════════════════════════════════════════════════════════════════════════

-- 1. Voir les doublons potentiels avant suppression
SELECT url, COUNT(*) AS occurrences, array_agg(id) AS ids
FROM public.photos
WHERE section_id = (SELECT id FROM public.sections WHERE slug = 'galerie')
GROUP BY url
HAVING COUNT(*) > 1;

-- 2. Supprimer les doublons : garder la/photo fixe (key non null) ou la première photo libre
DELETE FROM public.photos
WHERE id IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY url, section_id
             ORDER BY
               CASE WHEN key IS NOT NULL THEN 0 ELSE 1 END,
               position,
               created_at
           ) AS rn
    FROM public.photos
    WHERE section_id = (SELECT id FROM public.sections WHERE slug = 'galerie')
  ) sub
  WHERE rn > 1
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
