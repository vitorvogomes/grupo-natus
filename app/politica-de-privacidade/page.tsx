import type { Metadata } from "next";
import { pageMetadata } from "@/features/seo/metadata";
import type { ReactNode } from "react";
import { CookiePreferencesButton } from "@/features/consent/CookiePreferencesButton";
import { CONSENT_COOKIE } from "@/lib/consent";
import { CONTACT, LEGAL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Política de Privacidade",
  description:
    "Como o Grupo Natus trata os dados pessoais enviados pelo site, quais cookies usa e como exercer seus direitos pela LGPD.",
  path: "/politica-de-privacidade",
});

/** Data da versão do texto. Atualize junto com qualquer mudança abaixo. */
const UPDATED_AT = "21 de outubro de 2026";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}

const listClass = "flex list-disc flex-col gap-2 pl-5 marker:text-brand-strong";

/**
 * Texto redigido a partir do que o site faz de fato (formulários, e-mail,
 * mapas, WhatsApp). Rascunho para revisão jurídica: ver docs/CONTENT-GAPS.md.
 */
export default function PoliticaDePrivacidadePage() {
  const mail = (
    <a
      href={`mailto:${CONTACT.email}`}
      className="font-medium text-brand-strong underline underline-offset-2"
    >
      {CONTACT.email}
    </a>
  );

  return (
    <main>
      <section className="bg-navy-700 text-navy-50">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand">
            Privacidade
          </p>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-4 text-lg text-navy-100">
            Como tratamos os dados que você envia pelo site e o que você pode
            pedir sobre eles, nos termos da Lei Geral de Proteção de Dados
            (Lei 13.709/2018).
          </p>
          <p className="mt-6 text-sm text-navy-200">
            Última atualização: {UPDATED_AT}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Section title="Quem é responsável pelos seus dados">
          <p>
            O Grupo Natus{LEGAL.cnpj ? `, inscrito no CNPJ ${LEGAL.cnpj},` : ""}{" "}
            com sede na {CONTACT.address}, é o controlador dos dados pessoais
            tratados por este site.
          </p>
        </Section>

        <Section title="Dados que coletamos">
          <p>Só coletamos o que você nos envia ou o que o site precisa para funcionar:</p>
          <ul className={listClass}>
            <li>
              <strong className="text-ink">Contato e interesse em empreendimento:</strong>{" "}
              nome, e-mail, telefone, assunto, mensagem e o empreendimento de
              onde o pedido partiu.
            </li>
            <li>
              <strong className="text-ink">Negocie seu Terreno:</strong> nome,
              telefone, e-mail e as informações do terreno que você descrever
              (localização, área, tipo e observações).
            </li>
            <li>
              <strong className="text-ink">Origem da visita:</strong> a página
              de onde o formulário foi enviado e, quando você chega por um
              anúncio, os parâmetros de campanha do link (como a origem e o
              nome da campanha). Nada disso fica guardado no seu navegador.
            </li>
            <li>
              <strong className="text-ink">Dados técnicos:</strong> o endereço
              IP de quem envia um formulário, mantido só em memória por cerca
              de um minuto para limitar abusos e spam.
            </li>
          </ul>
          <p>
            Não usamos ferramentas de análise de navegação ou de publicidade
            neste momento. Se passarmos a usar, esta política será atualizada e
            elas só serão ativadas com o seu consentimento.
          </p>
        </Section>

        <Section title="Para que usamos">
          <ul className={listClass}>
            <li>Responder ao seu contato e enviar as informações que você pediu.</li>
            <li>Apresentar empreendimentos e condições comerciais do seu interesse.</li>
            <li>Avaliar propostas de terreno e negociar parcerias.</li>
            <li>Proteger o site contra uso indevido.</li>
          </ul>
        </Section>

        <Section title="Bases legais">
          <ul className={listClass}>
            <li>
              Procedimentos preliminares a um contrato, a seu pedido: responder a contatos, interesse em imóveis e propostas de
              terreno.
            </li>
            <li>
              Legítimo interesse: segurança do site e prevenção
              de spam.
            </li>
            <li>
              Consentimento: mapas do Google, que só carregam se
              você permitir.
            </li>
          </ul>
        </Section>

        <Section title="Compartilhamento">
          <p>Não vendemos dados pessoais. Eles passam apenas por:</p>
          <ul className={listClass}>
            <li>
              <strong className="text-ink">Banco de dados:</strong> o serviço
              de hospedagem onde guardamos os pedidos enviados pelos
              formulários, com acesso restrito à nossa equipe.
            </li>
            <li>
              <strong className="text-ink">Sistema de atendimento (CRM):</strong>{" "}
              os pedidos de informação sobre um empreendimento são registrados
              no sistema que nossa equipe comercial usa para atender você.
            </li>
            <li>
              <strong className="text-ink">Provedor de e-mail:</strong> o
              serviço que avisa a nossa equipe de cada mensagem dos formulários.
            </li>
            <li>
              <strong className="text-ink">Google Maps:</strong> quando você
              permite os mapas, o Google recebe dados de navegação (como IP e
              cookies próprios) segundo a política de privacidade dele.
            </li>
            <li>
              <strong className="text-ink">WhatsApp:</strong> ao clicar nos
              botões de WhatsApp, a conversa acontece no aplicativo, sob as
              regras do WhatsApp.
            </li>
            <li>Autoridades, quando houver obrigação legal ou ordem judicial.</li>
          </ul>
        </Section>

        <Section title="Cookies">
          <p>
            Usamos só o cookie necessário para guardar a sua escolha. Os cookies
            do Google entram apenas se você permitir os mapas.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-surface-muted text-ink">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Cookie</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Categoria</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Para quê</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Duração</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-ink">{CONSENT_COOKIE}</td>
                  <td className="px-4 py-3">Necessário</td>
                  <td className="px-4 py-3">Guardar a sua escolha sobre cookies.</td>
                  <td className="px-4 py-3">6 meses</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-ink">Cookies do Google Maps</td>
                  <td className="px-4 py-3">Mapas (opcional)</td>
                  <td className="px-4 py-3">Exibir a localização dos empreendimentos e da sede.</td>
                  <td className="px-4 py-3">Definida pelo Google</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Você pode mudar a escolha a qualquer momento:{" "}
            <CookiePreferencesButton className="font-medium text-brand-strong underline underline-offset-2" />
            .
          </p>
        </Section>

        <Section title="Por quanto tempo guardamos">
          <p>
            Guardamos os dados pelo tempo necessário para atender ao seu pedido
            e à negociação que dele decorrer, e pelo prazo exigido por
            obrigações legais. Depois disso, eles são eliminados ou
            anonimizados.
          </p>
        </Section>

        <Section title="Seus direitos">
          <p>Pela LGPD, você pode pedir a qualquer momento:</p>
          <ul className={listClass}>
            <li>confirmação de que tratamos seus dados e acesso a eles;</li>
            <li>correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>anonimização, bloqueio ou eliminação de dados desnecessários;</li>
            <li>portabilidade dos dados a outro fornecedor;</li>
            <li>informação sobre com quem os compartilhamos;</li>
            <li>revogação do consentimento, quando ele for a base legal.</li>
          </ul>
          <p>
            Você também pode recorrer à Autoridade Nacional de Proteção de
            Dados (ANPD).
          </p>
        </Section>

        <Section title="Fale com a gente">
          <p>
            Para tirar dúvidas sobre esta política, escreva para {mail}.
          </p>
        </Section>
      </div>
    </main>
  );
}
