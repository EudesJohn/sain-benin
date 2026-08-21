-- ════════════════════════════════════════════════════════════════════════
-- SAIN — Table témoignages bilingues (FR/EN)
-- Exécuter dans l'éditeur SQL de Supabase Dashboard
-- ════════════════════════════════════════════════════════════════════════

-- 1. Table
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  role text not null default '',
  role_en text not null default '',
  quote text not null default '',
  quote_en text not null default '',
  image_url text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default now()
);

-- 2. RLS
alter table public.testimonials enable row level security;

drop policy if exists "Témoignages : lecture publique" on public.testimonials;
create policy "Témoignages : lecture publique" on public.testimonials
  for select using (true);

drop policy if exists "Témoignages : ajout admin" on public.testimonials;
create policy "Témoignages : ajout admin" on public.testimonials
  for insert with check (public.is_admin());

drop policy if exists "Témoignages : modification admin" on public.testimonials;
create policy "Témoignages : modification admin" on public.testimonials
  for update using (public.is_admin());

drop policy if exists "Témoignages : suppression admin" on public.testimonials;
create policy "Témoignages : suppression admin" on public.testimonials
  for delete using (public.is_admin());

-- 3. Seed : les 3 témoignages existants
insert into public.testimonials (name, role, role_en, quote, quote_en, image_url, position) values
  (
    'Alassane Touré',
    'Ancien élève',
    'Former student',
    'Grâce à SAIN, j''ai appris à cultiver durablement et ai pu créer mon entreprise agricole. Merci à toute l''équipe !',
    'Thanks to SAIN, I learned sustainable farming and was able to create my agricultural business. Thank you to the whole team!',
    '/images/Etudiants-2-150x150.jpg',
    0
  ),
  (
    'Marie Dubois',
    'Visiteuse touristique',
    'Tourist visitor',
    'Un lieu magique où l''on découvre l''agriculture autrement. L''hébergement était parfait et le repas délicieux !',
    'A magical place where you discover agriculture differently. The accommodation was perfect and the meal delicious!',
    '/images/Visite-Ferme-150x150.jpg',
    1
  ),
  (
    'Pasteur Houensou',
    'Partenaire local',
    'Local partner',
    'SAIN est un modèle pour notre communauté. Leur engagement envers le développement rural est exemplaire.',
    'SAIN is a model for our community. Their commitment to rural development is exemplary.',
    '/images/Sourire-Sain-150x150.jpg',
    2
  )
on conflict do nothing;

-- 4. Vérification
select count(*) as total FROM public.testimonials;
