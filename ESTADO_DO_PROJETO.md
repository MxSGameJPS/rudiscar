# 📋 Estado do Projeto — Rudi's Car

> **Handoff / contexto para retomar o trabalho** (ex.: no Gemini/Antigravity).
> Última atualização: 2026-09-12
> Diretório: `e:\Prospecção\rudmar`

---

## 1. Visão geral

Site em **Next.js 14 (App Router, JavaScript)** com **CSS Modules** e **Supabase** (Auth + Postgres + Storage) para a oficina/revenda **"Rudi's Car"**.

Três frentes:
1. **Home institucional** — hero cinematográfico com imagem de fundo, serviços, sobre, destaques e contato.
2. **Vitrine de veículos** — `/veiculos` (filtros + grid) e `/veiculos/[id]` (galeria + detalhe + CTA WhatsApp).
3. **Painel admin** — `/login` (Supabase Auth) e `/painel` (CRUD de veículos + upload de imagens no Storage), protegido por middleware.

**Stack / dependências principais:**
- `next@^14.2.35`, `react@^18.3.1`, `react-dom@^18.3.1`
- `@supabase/ssr@^0.5.2`, `@supabase/supabase-js@^2.45.4`
- `framer-motion@^11.5.4` (efeitos de scroll/motion)
- `lucide-react@^0.441.0` (ícones)
- Fontes: Inter (texto) + Sora (display)

---

## 2. ✅ O que já está PRONTO

### Frontend (100% construído e buildando)
- [x] Projeto scaffoldado manualmente (package.json, next.config.mjs, jsconfig, eslintrc, gitignore).
- [x] Design system em `globals.css` — tema dark/industrial/premium, acento vermelho `#e4322b` + âmbar, tokens, `prefers-reduced-motion`.
- [x] Layout raiz com fontes Inter + Sora.
- [x] **Home** com todas as seções: Hero, Serviços, Sobre, Destaques, Contato.
- [x] **Hero cinematográfico**: imagem de fundo (Unsplash), efeito **Ken Burns** (zoom lento), **parallax no scroll** (`useScroll`/`useTransform`), overlay + vinheta, entrada em cascata dos elementos, indicador "Role para explorar".
- [x] **Componentes de motion reutilizáveis**: `src/components/ui/motion/Reveal.jsx` e `Stagger.jsx` (respeitam reduced-motion), aplicados em Serviços, Sobre, Destaques e Contato.
- [x] **Vitrine** `/veiculos` (Filtros + grid) e `/veiculos/[id]` (Galeria + detalhe), com páginas `not-found`.
- [x] **Painel**: `/login`, `/painel` (lista + stats), `/painel/novo`, `/painel/[id]` (edição). Componentes: PainelShell, VeiculoForm, ImageUploader (upload/reorder/capa), VeiculoRow.
- [x] Componentes UI: Button, Logo, WhatsAppFloat, VeiculoCard. Layout: Header, Footer.
- [x] `npm run build` **passa limpo** (8 rotas, sem warnings).
- [x] `npm run dev` roda e serve a home (HTTP 200 confirmado).

### Backend / integração (código pronto, banco pendente)
- [x] Clientes Supabase: `lib/supabase/client.js` (browser), `server.js` (server), `middleware.js`.
- [x] **Middleware de proteção** de rotas (`/painel/*` exige login; redireciona para `/login`).

## 3. ✅ Status Final — CONCLUÍDO (100%)

### 🟢 Banco de Dados & Infraestrutura Supabase (Concluído)
- [x] **Migrations aplicadas no banco**:
  - `0001_init_veiculos.sql` (tabela `public.veiculos`, índices, RLS, trigger `set_atualizado_em`).
  - `0002_storage_bucket.sql` (bucket público `veiculos` e políticas RLS de storage).
- [x] **Chave Supabase `NEXT_PUBLIC_SUPABASE_ANON_KEY` configurada no `.env.local`**.
- [x] **Usuário Administrador Criado**: `admin@rudiscar.com.br` / `AdminRudmar2026!`.
- [x] **Massa de Teste (Seed)**: 3 veículos cadastrados no banco (2 em destaque).
- [x] **Advisors de Segurança & Performance**: `get_advisors` executado e função trigger ajustada para `SECURITY INVOKER` com permissões revogadas para anon.

---

## 4. 🔑 Dados-chave do Projeto

| Item | Valor |
|---|---|
| Supabase project_ref | `cszculnaawtspsqfqsyt` |
| Supabase URL | `https://cszculnaawtspsqfqsyt.supabase.co` |
| Anon key | **Configurada** no `.env.local` |
| Usuário Admin | `admin@rudiscar.com.br` |
| Senha Admin | `AdminRudmar2026!` |
| Bucket de imagens | `veiculos` (público) |
| Rota de login | `/login` |
| Rota do painel | `/painel` (protegida) |
| MCP status | `✔ Connected` (ferramentas ativas e integradas) |

## 5. 🗄️ Modelo de dados (tabela `public.veiculos`)

| Coluna | Tipo | Observação |
|---|---|---|
| id | uuid (pk) | default `gen_random_uuid()` |
| marca, modelo | text | obrigatórios |
| versao | text | nullable |
| ano_fabricacao, ano_modelo | integer | obrigatórios |
| quilometragem | integer | default 0 |
| preco | numeric(12,2) | obrigatório |
| cambio, combustivel, cor | text | nullable |
| portas | integer | nullable |
| placa_final | text | final da placa |
| descricao | text | nullable |
| opcionais | text[] | default `{}` |
| imagens | text[] | URLs públicas do Storage |
| imagem_capa | text | URL da capa (= imagens[0]) |
| destaque | boolean | default false |
| vendido | boolean | default false |
| criado_em, atualizado_em | timestamptz | trigger atualiza `atualizado_em` |

**RLS:** SELECT público (anon+authenticated); INSERT/UPDATE/DELETE só `authenticated`.
**Storage:** bucket `veiculos` público; SELECT público; INSERT/UPDATE/DELETE só `authenticated`.

---

## 6. 🚀 Passo a passo para "ligar" o projeto

```bash
# 1. (opcional) instalar deps se ambiente novo
npm install

# 2. Aplicar as migrations no banco (na ordem):
#    - via MCP execute_sql, ou no SQL Editor do dashboard
#      0001_init_veiculos.sql  ->  0002_storage_bucket.sql

# 3. Preencher a anon key em .env.local
#    Settings -> API -> Project API keys -> anon public

# 4. Criar usuário admin:
#    Authentication -> Users -> Add user (email + senha)

# 5. Subir o site
npm run dev
# Home:   http://localhost:3000
# Login:  http://localhost:3000/login  -> cai em /painel
```

---

## 7. ⚠️ Notas importantes

- **MCP conectado ≠ ferramentas disponíveis na mesma sessão.** O `.mcp.json` foi criado no meio da sessão; as tools do MCP (`execute_sql`, `apply_migration`, `get_advisors`, `list_tables`) só aparecem para o agente **após reiniciar a sessão**. O CLI mostra `✔ Connected`, mas o agente precisa de sessão nova para usá-las.
- `atualizarVeiculo(id, formData)` é chamado via `.bind(null, id)` no form → handler recebe `(id, formData)`. (Verificado, correto.)
- A leitura de veículos é pública (RLS SELECT para anon); a escrita exige login.
- Enquanto a anon key for placeholder, as queries no navegador retornam vazio/erro — comportamento esperado.

---

## 8. 🗂️ Estrutura de arquivos (src/ + supabase/)

```
src/
├── app/
│   ├── (site)/        rotas públicas: layout, page (Home), veiculos/ (vitrine + [id])
│   ├── login/         LoginForm.jsx, page.js, css
│   ├── painel/        admin protegido: page, novo/, [id]/, actions.js, layout
│   ├── layout.js      layout raiz + fontes
│   ├── globals.css    design system
│   └── not-found.js
├── components/
│   ├── layout/        Header, Footer
│   ├── ui/            Button, Logo, WhatsAppFloat
│   │   └── motion/    Reveal.jsx, Stagger.jsx   (efeitos de scroll)
│   ├── home/          Hero, Servicos, Sobre, Destaques, Contato
│   ├── veiculos/      VeiculoCard, Filtros, Galeria
│   └── painel/        PainelShell, VeiculoForm, ImageUploader, VeiculoRow
├── lib/
│   ├── config.js      dados do site
│   ├── format.js      R$, km, URL WhatsApp
│   └── supabase/      client, server, middleware
├── services/veiculos.js   camada de dados
└── middleware.js          proteção /painel

supabase/migrations/
├── 0001_init_veiculos.sql   tabela + índices + trigger + RLS
└── 0002_storage_bucket.sql  bucket + policies
```


### `.env.local` (estado atual)
```
NEXT_PUBLIC_SUPABASE_URL=https://cszculnaawtspsqfqsyt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key   <- TROCAR
NEXT_PUBLIC_SUPABASE_BUCKET=veiculos
```

---

- [x] Camada de dados `services/veiculos.js` (listar, filtrar, destaques, buscar por id, marcas).
- [x] **Server actions** `app/painel/actions.js` (criar, atualizar, remover, alternar vendido, sair) — com `requireUser()` e limpeza de imagens no Storage ao excluir.
- [x] **Migrations SQL escritas** (ainda NÃO aplicadas no banco):
  - `supabase/migrations/0001_init_veiculos.sql` — tabela `veiculos` + índices + trigger `atualizado_em` + **RLS** (leitura pública; escrita só autenticado).
  - `supabase/migrations/0002_storage_bucket.sql` — bucket público `veiculos` + policies (leitura pública; upload/update/delete só autenticado).

### Configuração do MCP / Supabase
- [x] Projeto Supabase **existe**: `project_ref = cszculnaawtspsqfqsyt`.
- [x] `.mcp.json` criado na raiz e **MCP do Supabase autenticado + `✔ Connected`** (via `claude mcp list`).
- [x] `.env.local` com a **URL real** preenchida (`https://cszculnaawtspsqfqsyt.supabase.co`).

---
