import { MessageCircle } from "lucide-react";
import { InterestForm } from "@/features/contact/InterestForm";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Development } from "@/types/development";

type DevelopmentCtaProps = {
  development: Development;
};

export function contextualMessage(development: Development): string {
  return (
    development.contact?.whatsappMessage ??
    `Olá! Tenho interesse no empreendimento ${development.name}. Gostaria de mais informações.`
  );
}

/**
 * Conversão da página do empreendimento.
 *
 * Uma faixa só: antes eram dois blocos lado a lado (painel de WhatsApp +
 * formulário) competindo com dois `<h2>` concorrentes na mesma linha. Agora a
 * chamada é única e o WhatsApp vira a alternativa de quem não quer preencher
 * nada — continua sendo a abstração do projeto (AD-3), não um link solto.
 */
export function DevelopmentCta({ development }: DevelopmentCtaProps) {
  const whatsappHref = buildWhatsAppUrl({
    message: contextualMessage(development),
  });

  return (
    <section className="overflow-hidden rounded-2xl bg-navy-600 text-navy-50">
      <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14 lg:p-12">
        <div>
          <h2 className="text-balance text-3xl font-semibold text-white md:text-4xl">
            Quer saber mais?
          </h2>
          <p className="mt-4 max-w-prose text-navy-100">
            Preencha o formulário para que um consultor da Natus entre em
            contato com você.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 py-1 text-sm font-medium text-brand underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            Prefere conversar agora? Fale no WhatsApp
          </a>
        </div>

        <div className="rounded-xl bg-surface p-6 text-ink shadow-lg sm:p-7">
          <InterestForm slug={development.slug} name={development.name} />
        </div>
      </div>
    </section>
  );
}
