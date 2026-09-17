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

export function DevelopmentCta({ development }: DevelopmentCtaProps) {
  const href = buildWhatsAppUrl({ message: contextualMessage(development) });

  return (
    <section className="rounded-lg bg-navy-600 p-8 text-navy-50">
      <h2 className="text-2xl font-semibold text-white">
        Interessado no {development.name}?
      </h2>
      <p className="mt-2 text-navy-100">
        Fale agora com o time do Grupo Natus e tire suas dúvidas.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center rounded-md bg-status-pronto px-6 py-3 font-medium text-white transition-transform hover:scale-105"
      >
        Conversar no WhatsApp
      </a>
    </section>
  );
}
