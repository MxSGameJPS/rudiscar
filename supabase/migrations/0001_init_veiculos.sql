-- ============================================================
-- Rudi's Car - Schema inicial (tabela veiculos + Storage + RLS)
-- Execute no SQL Editor do Supabase (ou via MCP execute_sql)
-- ============================================================

-- Extensao para gerar UUIDs
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Tabela principal de veiculos a venda
-- ------------------------------------------------------------
create table if not exists public.veiculos (
  id                uuid primary key default gen_random_uuid(),
  marca             text not null,
  modelo            text not null,
  versao            text,
  ano_fabricacao    integer not null,
  ano_modelo        integer not null,
  quilometragem     integer not null default 0,
  preco             numeric(12,2) not null,
  cambio            text,               -- Manual, Automatico, CVT...
  combustivel       text,               -- Flex, Gasolina, Diesel, Eletrico...
  cor               text,
  portas            integer,
  placa_final       text,               -- final da placa (0-9)
  descricao         text,
  opcionais         text[] default '{}',-- lista de opcionais
  imagens           text[] default '{}',-- URLs publicas do Storage
  imagem_capa       text,               -- URL da imagem de destaque
  destaque          boolean not null default false,
  vendido           boolean not null default false,
  criado_em         timestamptz not null default now(),
  atualizado_em     timestamptz not null default now()
);

comment on table public.veiculos is 'Veiculos a venda na revenda Rudi''s Car';

-- Indices para busca/filtro na vitrine
create index if not exists veiculos_marca_idx        on public.veiculos (marca);
create index if not exists veiculos_preco_idx        on public.veiculos (preco);
create index if not exists veiculos_ano_modelo_idx   on public.veiculos (ano_modelo);
create index if not exists veiculos_destaque_idx     on public.veiculos (destaque) where destaque = true;
create index if not exists veiculos_vendido_idx      on public.veiculos (vendido);
create index if not exists veiculos_criado_em_idx    on public.veiculos (criado_em desc);

-- Trigger para atualizar "atualizado_em"
create or replace function public.set_atualizado_em()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

drop trigger if exists trg_veiculos_atualizado_em on public.veiculos;
create trigger trg_veiculos_atualizado_em
  before update on public.veiculos
  for each row execute function public.set_atualizado_em();

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table public.veiculos enable row level security;

-- Leitura publica (vitrine) - qualquer visitante pode ver
drop policy if exists "veiculos_select_public" on public.veiculos;
create policy "veiculos_select_public"
  on public.veiculos
  for select
  to anon, authenticated
  using (true);

-- Escrita apenas para usuarios autenticados (painel)
drop policy if exists "veiculos_insert_auth" on public.veiculos;
create policy "veiculos_insert_auth"
  on public.veiculos
  for insert
  to authenticated
  with check (true);

drop policy if exists "veiculos_update_auth" on public.veiculos;
create policy "veiculos_update_auth"
  on public.veiculos
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "veiculos_delete_auth" on public.veiculos;
create policy "veiculos_delete_auth"
  on public.veiculos
  for delete
  to authenticated
  using (true);
