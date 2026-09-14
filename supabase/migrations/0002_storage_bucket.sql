-- ============================================================
-- Rudi's Car - Bucket de Storage para imagens dos veiculos
-- ============================================================

-- Cria bucket publico "veiculos" (idempotente)
insert into storage.buckets (id, name, public)
values ('veiculos', 'veiculos', true)
on conflict (id) do nothing;

-- Politicas de acesso ao bucket
-- Leitura publica das imagens
drop policy if exists "veiculos_storage_select_public" on storage.objects;
create policy "veiculos_storage_select_public"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'veiculos');

-- Upload apenas autenticado
drop policy if exists "veiculos_storage_insert_auth" on storage.objects;
create policy "veiculos_storage_insert_auth"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'veiculos');

-- Atualizar apenas autenticado
drop policy if exists "veiculos_storage_update_auth" on storage.objects;
create policy "veiculos_storage_update_auth"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'veiculos')
  with check (bucket_id = 'veiculos');

-- Deletar apenas autenticado
drop policy if exists "veiculos_storage_delete_auth" on storage.objects;
create policy "veiculos_storage_delete_auth"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'veiculos');
