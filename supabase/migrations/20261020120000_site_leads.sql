-- Leads do formulário da página de empreendimento (site institucional).
--
-- Quem grava é só o servidor (Route Handler /api/leads) com a chave secreta,
-- que ignora RLS. Por isso a tabela tem RLS ligado e NENHUMA policy: anon e
-- authenticated (chave publishable no navegador) não leem nem escrevem nada.
-- Esta migração só cria objetos novos; nada existente é alterado.

create table public.site_leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),

  development_slug text not null check (char_length(development_slug) <= 100),
  crm_empreendimento_id integer,

  nome text not null check (char_length(nome) between 1 and 100),
  email text check (char_length(email) <= 100),
  telefone text check (char_length(telefone) <= 20),
  constraint site_leads_contato check (email is not null or telefone is not null),

  -- utm_source, utm_medium, utm_campaign, utm_content, utm_term (anúncio).
  utm jsonb,
  pagina text check (char_length(pagina) <= 300),

  -- Resultado da sincronização com o CV CRM: o lead já existia (nada feito),
  -- foi criado, ou falhou (reprocessar a partir daqui).
  crm_status text not null default 'pendente'
    check (crm_status in ('pendente', 'existente', 'criado', 'erro')),
  crm_lead_id text,
  crm_error text check (char_length(crm_error) <= 500),
  crm_synced_at timestamptz
);

comment on table public.site_leads is
  'Leads do formulário de interesse das páginas de empreendimento. Escrita só pelo servidor (chave secreta).';

create index site_leads_created_at_idx on public.site_leads (created_at desc);
create index site_leads_crm_pendentes_idx on public.site_leads (crm_status)
  where crm_status in ('pendente', 'erro');

alter table public.site_leads enable row level security;

revoke all on table public.site_leads from anon, authenticated;
