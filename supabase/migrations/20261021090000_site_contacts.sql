-- Leads dos formulários gerais (Contato e Negocie seu Terreno).
--
-- Mesmo modelo de segurança da site_leads: quem grava é só o servidor
-- (Route Handler /api/leads) com a chave de serviço, que ignora RLS. RLS
-- ligado e NENHUMA policy: anon e authenticated não leem nem escrevem nada.
-- O e-mail para o marketing vira um aviso; o registro do lead é a tabela.
-- Só cria objetos novos e acrescenta uma coluna à site_leads (do próprio site).

create table public.site_contacts (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),

  tipo text not null check (tipo in ('contato', 'terreno')),
  nome text not null check (char_length(nome) between 1 and 100),
  email text check (char_length(email) <= 100),
  telefone text check (char_length(telefone) <= 20),
  constraint site_contacts_contato check (email is not null or telefone is not null),

  -- Demais campos do formulário (assunto, mensagem / localização, área, tipo,
  -- observações), já validados pelo servidor.
  dados jsonb not null default '{}'::jsonb
    check (jsonb_typeof(dados) = 'object' and pg_column_size(dados) <= 20000),

  -- O aviso por e-mail saiu? (o Resend gratuito tem limite diário)
  email_enviado boolean not null default false
);

comment on table public.site_contacts is
  'Leads dos formulários Contato e Negocie seu Terreno. Escrita só pelo servidor (chave de serviço).';

create index site_contacts_created_at_idx on public.site_contacts (created_at desc);

alter table public.site_contacts enable row level security;

revoke all on table public.site_contacts from anon, authenticated;

-- Mesmo controle na tabela dos leads de empreendimento.
alter table public.site_leads
  add column email_enviado boolean not null default false;
