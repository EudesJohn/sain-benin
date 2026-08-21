-- ════════════════════════════════════════════════════════════════════════
-- SAIN — Table contact_info pour les numéros et email modifiables par l'admin
-- Exécutez ce script dans l'éditeur SQL de Supabase Dashboard
-- ════════════════════════════════════════════════════════════════════════

-- 1. Table contact_info
create table if not exists public.contact_info (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null default '',
  label text not null default '',
  updated_at timestamptz not null default now()
);

-- 2. Sécurité (Row Level Security)
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

-- 3. Seed : données de contact initiales
-- Le nouveau numéro WhatsApp est le +229 01 95 40 54 33
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
