import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { BackToTop } from "./BackToTop";
import { buttonVariants } from "./ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { CONTACT, LEGAL, NAV_LINKS } from "@/lib/site";

const linkClass = "text-navy-100 transition-colors hover:text-brand";

export function Footer() {
  const legalBits = [
    LEGAL.cnpj ? `CNPJ ${LEGAL.cnpj}` : null,
    LEGAL.creci ? `CRECI ${LEGAL.creci}` : null,
  ].filter(Boolean);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-navy-600 text-navy-50">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo negative className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-navy-100">
            Incorporação e engenharia em Minas Gerais e no Rio de Janeiro.
          </p>
          {/* TODO: CONTENT REQUIRED — redes sociais (URLs) em docs/CONTENT-GAPS §6.
              Ícones de marca serão adicionados quando os links forem confirmados
              (lucide removeu ícones de marca; usaremos um pacote dedicado). */}
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="text-sm font-semibold text-white">Navegação</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="flex flex-col gap-3 text-sm not-italic">
          <h2 className="text-sm font-semibold text-white">Contato</h2>
          <a
            href={`mailto:${CONTACT.email}`}
            className={cn(linkClass, "inline-flex items-center gap-2")}
          >
            <Mail aria-hidden="true" className="size-4 shrink-0" />
            {CONTACT.email}
          </a>
          <a
            href={`tel:${CONTACT.phone}`}
            className={cn(linkClass, "inline-flex items-center gap-2")}
          >
            <Phone aria-hidden="true" className="size-4 shrink-0" />
            {CONTACT.phoneDisplay}
          </a>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClass, "inline-flex items-center gap-2")}
          >
            <MessageCircle aria-hidden="true" className="size-4 shrink-0" />
            WhatsApp {CONTACT.whatsappDisplay}
          </a>
          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClass, "inline-flex items-start gap-2")}
          >
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {CONTACT.address}
          </a>
          <span className="inline-flex items-center gap-2 text-navy-200">
            <Clock aria-hidden="true" className="size-4 shrink-0" />
            {CONTACT.hours}
          </span>
        </address>

        <div>
          <h2 className="text-sm font-semibold text-white">Vamos conversar?</h2>
          <p className="mt-4 text-sm text-navy-100">
            Fale com um consultor e tire suas dúvidas sobre os empreendimentos.
          </p>
          <a
            href={buildWhatsAppUrl({
              message:
                "Olá! Gostaria de falar com um consultor do Grupo Natus.",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "primary", size: "md" }),
              "mt-4 w-full",
            )}
          >
            <MessageCircle aria-hidden="true" />
            Falar com consultor
          </a>
        </div>
      </div>

      <div className="border-t border-navy-500">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-3 px-4 py-6 text-sm text-navy-200 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            {[
              `© ${year} Grupo Natus. Todos os direitos reservados.`,
              ...legalBits,
            ].join(" · ")}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
