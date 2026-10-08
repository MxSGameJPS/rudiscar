-- Execute no projeto cszculnaawtspsqfqsyt após conferir o admin no Auth.
-- Política para um único administrador identificado por e-mail confirmado.
create schema if not exists private;
create or replace function private.rudiscar_admin()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists(
  select 1 from auth.users
  where id = (select auth.uid())
  and lower(email) = 'rudscar@rudscar.com.br'
  and email_confirmed_at is not null
) $$;
revoke all on function private.rudiscar_admin() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.rudiscar_admin() to authenticated;
drop policy if exists "veiculos_insert_auth" on public.veiculos;
drop policy if exists "veiculos_update_auth" on public.veiculos;
drop policy if exists "veiculos_delete_auth" on public.veiculos;
create policy "rudiscar_veiculos_insert" on public.veiculos for insert to authenticated with check ((select private.rudiscar_admin()));
create policy "rudiscar_veiculos_update" on public.veiculos for update to authenticated using ((select private.rudiscar_admin())) with check ((select private.rudiscar_admin()));
create policy "rudiscar_veiculos_delete" on public.veiculos for delete to authenticated using ((select private.rudiscar_admin()));
drop policy if exists "depoimentos_all_auth" on public.depoimentos;
create policy "rudiscar_depoimentos_admin" on public.depoimentos for all to authenticated using ((select private.rudiscar_admin())) with check ((select private.rudiscar_admin()));
drop policy if exists "propostas_select_auth" on public.propostas;
create policy "rudiscar_propostas_select" on public.propostas for select to authenticated using ((select private.rudiscar_admin()));
create policy "rudiscar_propostas_update" on public.propostas for update to authenticated using ((select private.rudiscar_admin())) with check ((select private.rudiscar_admin()));
create policy "rudiscar_propostas_delete" on public.propostas for delete to authenticated using ((select private.rudiscar_admin()));
drop policy if exists "veiculos_storage_insert_auth" on storage.objects;
drop policy if exists "veiculos_storage_update_auth" on storage.objects;
drop policy if exists "veiculos_storage_delete_auth" on storage.objects;
create policy "rudiscar_storage_insert" on storage.objects for insert to authenticated with check (bucket_id = 'veiculos' and (select private.rudiscar_admin()));
create policy "rudiscar_storage_update" on storage.objects for update to authenticated using (bucket_id = 'veiculos' and (select private.rudiscar_admin())) with check (bucket_id = 'veiculos' and (select private.rudiscar_admin()));
create policy "rudiscar_storage_delete" on storage.objects for delete to authenticated using (bucket_id = 'veiculos' and (select private.rudiscar_admin()));