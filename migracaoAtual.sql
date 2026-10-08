-- ============================================================
-- Rudi's Car - Schema Atualizado (Veículos + Depoimentos + Propostas + Storage + RLS)
-- Atualização do arquivo migracaoAntiga para a versão atual do projeto
-- Execute este arquivo no SQL Editor do Supabase
-- ============================================================

-- Extensão para gerar UUIDs
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- 1. Tabela principal de veículos à venda
-- ------------------------------------------------------------
create table if not exists public.veiculos (
  id                uuid primary key default gen_random_uuid(),
  nome              text,               -- Ex: "Hyundai Tucson"
  marca             text not null,      -- Ex: "Hyundai"
  modelo            text not null,      -- Ex: "Tucson"
  versao            text,               -- Ex: "GLS 1.6 Turbo"
  ano               text,               -- Ex: "2021/2022" (Exibição formatada)
  ano_fabricacao    integer,            -- Ex: 2021
  ano_modelo        integer,            -- Ex: 2022
  km                text,               -- Ex: "38.400 km" (Exibição formatada)
  quilometragem     integer default 0,  -- Ex: 38400
  preco             numeric(12,2) not null,
  categoria         text not null default 'SUV', -- "SUV", "Sedã", "Hatch", "Picape"
  tag               text,               -- "Mais procurado", "Premium", "Ótimo 1º carro", "Baixa km"
  cambio            text,               -- "Manual", "Automático", "CVT"...
  combustivel       text,               -- "Flex", "Gasolina", "Diesel", "Elétrico"...
  cor               text,
  portas            integer,
  placa_final       text,               -- Final da placa (0-9)
  descricao         text,
  opcionais         text[] default '{}',-- Lista de opcionais
  imagem_capa       text,               -- URL da imagem principal/destaque
  imagens           text[] default '{}',-- URLs de todas as imagens no Storage
  destaque          boolean not null default false,
  vendido           boolean not null default false,
  criado_em         timestamptz not null default now(),
  atualizado_em     timestamptz not null default now()
);

-- Migração de colunas adicionais (para bases que já executaram a migracaoAntiga)
do $$
begin
  if not exists (select 1 from information_schema.columns where table_schema='public' and table_name='veiculos' and column_name='nome') then
    alter table public.veiculos add column nome text;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema='public' and table_name='veiculos' and column_name='ano') then
    alter table public.veiculos add column ano text;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema='public' and table_name='veiculos' and column_name='km') then
    alter table public.veiculos add column km text;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema='public' and table_name='veiculos' and column_name='categoria') then
    alter table public.veiculos add column categoria text not null default 'SUV';
  end if;
  if not exists (select 1 from information_schema.columns where table_schema='public' and table_name='veiculos' and column_name='tag') then
    alter table public.veiculos add column tag text;
  end if;
end $$;

comment on table public.veiculos is 'Veículos à venda na revenda Rudi''s Car';

-- Índices para busca/filtro na vitrine
create index if not exists veiculos_categoria_idx    on public.veiculos (categoria);
create index if not exists veiculos_marca_idx        on public.veiculos (marca);
create index if not exists veiculos_preco_idx        on public.veiculos (preco);
create index if not exists veiculos_ano_modelo_idx   on public.veiculos (ano_modelo);
create index if not exists veiculos_destaque_idx     on public.veiculos (destaque) where destaque = true;
create index if not exists veiculos_vendido_idx      on public.veiculos (vendido);
create index if not exists veiculos_criado_em_idx    on public.veiculos (criado_em desc);

-- Trigger para atualizar "atualizado_em" automaticamente
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

-- Row Level Security (veiculos)
alter table public.veiculos enable row level security;

-- Leitura pública (vitrine)
drop policy if exists "veiculos_select_public" on public.veiculos;
create policy "veiculos_select_public"
  on public.veiculos for select to anon, authenticated using (true);

-- Escrita restrita a usuários autenticados (painel admin)
drop policy if exists "veiculos_insert_auth" on public.veiculos;
create policy "veiculos_insert_auth"
  on public.veiculos for insert to authenticated with check (true);

drop policy if exists "veiculos_update_auth" on public.veiculos;
create policy "veiculos_update_auth"
  on public.veiculos for update to authenticated using (true) with check (true);

drop policy if exists "veiculos_delete_auth" on public.veiculos;
create policy "veiculos_delete_auth"
  on public.veiculos for delete to authenticated using (true);

-- ------------------------------------------------------------
-- 2. Tabela de Depoimentos de Clientes
-- ------------------------------------------------------------
create table if not exists public.depoimentos (
  id            uuid primary key default gen_random_uuid(),
  nome          text not null,
  cidade        text not null,
  carro         text not null,
  texto         text not null,
  avaliacao     integer default 5,
  ativo         boolean not null default true,
  criado_em     timestamptz not null default now()
);

alter table public.depoimentos enable row level security;

drop policy if exists "depoimentos_select_public" on public.depoimentos;
create policy "depoimentos_select_public"
  on public.depoimentos for select to anon, authenticated using (ativo = true);

drop policy if exists "depoimentos_all_auth" on public.depoimentos;
create policy "depoimentos_all_auth"
  on public.depoimentos for all to authenticated using (true);

-- ------------------------------------------------------------
-- 3. Tabela de Propostas / Leads de Financiamento e Interesse
-- ------------------------------------------------------------
create table if not exists public.propostas (
  id            uuid primary key default gen_random_uuid(),
  veiculo_id    uuid references public.veiculos(id) on delete set null,
  nome_cliente  text not null,
  telefone      text not null,
  mensagem      text,
  valor_carro   numeric(12,2),
  entrada_pct   integer,
  parcelas      integer,
  status        text not null default 'novo', -- 'novo', 'em_atendimento', 'concluido', 'cancelado'
  criado_em     timestamptz not null default now()
);

alter table public.propostas enable row level security;

-- Visitantes podem enviar propostas
drop policy if exists "propostas_insert_public" on public.propostas;
create policy "propostas_insert_public"
  on public.propostas for insert to anon, authenticated with check (true);

-- Apenas autenticados leem as propostas
drop policy if exists "propostas_select_auth" on public.propostas;
create policy "propostas_select_auth"
  on public.propostas for select to authenticated using (true);

-- ------------------------------------------------------------
-- 4. Bucket de Storage para Imagens ("veiculos")
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('veiculos', 'veiculos', true)
on conflict (id) do nothing;

drop policy if exists "veiculos_storage_select_public" on storage.objects;
create policy "veiculos_storage_select_public"
  on storage.objects for select to anon, authenticated using (bucket_id = 'veiculos');

drop policy if exists "veiculos_storage_insert_auth" on storage.objects;
create policy "veiculos_storage_insert_auth"
  on storage.objects for insert to authenticated with check (bucket_id = 'veiculos');

drop policy if exists "veiculos_storage_update_auth" on storage.objects;
create policy "veiculos_storage_update_auth"
  on storage.objects for update to authenticated using (bucket_id = 'veiculos') with check (bucket_id = 'veiculos');

drop policy if exists "veiculos_storage_delete_auth" on storage.objects;
create policy "veiculos_storage_delete_auth"
  on storage.objects for delete to authenticated using (bucket_id = 'veiculos');

-- ------------------------------------------------------------
-- 5. Carga de Dados Iniciais (Seed Data)
-- ------------------------------------------------------------
-- Insere estoque atual de veículos caso a tabela esteja vazia
insert into public.veiculos (nome, marca, modelo, versao, ano, ano_fabricacao, ano_modelo, km, quilometragem, combustivel, cambio, preco, categoria, imagem_capa, tag, destaque)
select
  v.nome, v.marca, v.modelo, v.versao, v.ano, v.ano_fabricacao, v.ano_modelo, v.km, v.quilometragem, v.combustivel, v.cambio, v.preco, v.categoria, v.imagem_capa, v.tag, v.destaque
from (values
  ('Hyundai Tucson', 'Hyundai', 'Tucson', 'GLS 1.6 Turbo', '2021/2022', 2021, 2022, '38.400 km', 38400, 'Flex', 'Automático', 129900.00, 'SUV', 'https://images.pexels.com/photos/11808155/pexels-photo-11808155.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840', 'Mais procurado', true),
  ('Toyota Corolla', 'Toyota', 'Corolla', 'XEi 2.0 Dynamic', '2020/2020', 2020, 2020, '52.100 km', 52100, 'Flex', 'CVT', 112900.00, 'Sedã', 'https://images.pexels.com/photos/11501948/pexels-photo-11501948.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840', null, false),
  ('Mercedes-Benz CLA', 'Mercedes-Benz', 'CLA', '180 Urban', '2019/2019', 2019, 2019, '41.700 km', 41700, 'Gasolina', 'Automático', 159900.00, 'Sedã', 'https://images.pexels.com/photos/16495911/pexels-photo-16495911.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840', 'Premium', true),
  ('Ford Fiesta', 'Ford', 'Fiesta', 'SE 1.6 16V', '2018/2019', 2018, 2019, '63.200 km', 63200, 'Flex', 'Manual', 49900.00, 'Hatch', 'https://images.pexels.com/photos/17209676/pexels-photo-17209676.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840', 'Ótimo 1º carro', false),
  ('Nissan Frontier', 'Nissan', 'Frontier', 'SE 2.3 4x4 Diesel', '2019/2020', 2019, 2020, '88.500 km', 88500, 'Diesel', 'Automático', 164900.00, 'Picape', 'https://images.pexels.com/photos/12384824/pexels-photo-12384824.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840', null, false),
  ('Nissan Sentra', 'Nissan', 'Sentra', 'SV 2.0 CVT', '2021/2021', 2021, 2021, '34.900 km', 34900, 'Flex', 'CVT', 104900.00, 'Sedã', 'https://images.pexels.com/photos/15223537/pexels-photo-15223537.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840', null, false),
  ('Kia Picanto', 'Kia', 'Picanto', 'EX 1.0', '2020/2020', 2020, 2020, '29.800 km', 29800, 'Flex', 'Automático', 57900.00, 'Hatch', 'https://images.pexels.com/photos/20475023/pexels-photo-20475023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840', null, false),
  ('Hyundai Creta', 'Hyundai', 'Creta', 'Action 1.6', '2022/2023', 2022, 2023, '21.300 km', 21300, 'Flex', 'Automático', 99900.00, 'SUV', 'https://images.pexels.com/photos/15001927/pexels-photo-15001927.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840', 'Baixa km', false)
) as v(nome, marca, modelo, versao, ano, ano_fabricacao, ano_modelo, km, quilometragem, combustivel, cambio, preco, categoria, imagem_capa, tag, destaque)
where not exists (select 1 from public.veiculos limit 1);

-- Insere depoimentos iniciais caso a tabela esteja vazia
insert into public.depoimentos (nome, cidade, carro, texto)
select d.nome, d.cidade, d.carro, d.texto
from (values
  ('Juliana Schmitt', 'Dois Irmãos', 'Hyundai Creta 2022', 'Já conhecia o Rudi da oficina, então comprar com ele foi natural. O carro veio impecável, com relatório de tudo que foi revisado. Confiança total.'),
  ('Marcos Kunz', 'Morro Reuter', 'Nissan Frontier 2020', 'Deixei minha picape antiga na troca e fui muito bem avaliado. O financiamento saiu em menos de dois dias. Atendimento nota 10.'),
  ('Fernanda Rech', 'Ivoti', 'Kia Picanto 2020', 'Primeiro carro da minha filha e eu queria segurança. Explicaram cada detalhe da revisão, sem enrolação. Recomendo de olhos fechados.'),
  ('Roberto Hoffmann', 'Novo Hamburgo', 'Toyota Corolla 2020', 'Rodei várias lojas na região e só aqui senti honestidade de verdade. Seis meses depois, o carro segue perfeito. Voltarei com certeza.'),
  ('Carla Weber', 'Santa Maria do Herval', 'Nissan Sentra 2021', 'Preço justo, carro revisado e garantia de motor e câmbio. Ainda ganhei a primeira revisão na oficina deles. Experiência excelente!')
) as d(nome, cidade, carro, texto)
where not exists (select 1 from public.depoimentos limit 1);
