import Link from "next/link";
import { Logo } from "./Logo";
import { CONTACT, NAV_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy-600 text-navy-50">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Logo negative className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-navy-100">
            Incorporação e engenharia em Minas Gerais e no Rio de Janeiro.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <ul className="flex flex-col gap-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="flex flex-col gap-3 text-sm not-italic">
          <a href={`mailto:${CONTACT.email}`} className="hover:text-brand">
            {CONTACT.email}
          </a>
          <a href={`tel:${CONTACT.phone}`} className="hover:text-brand">
            {CONTACT.phoneDisplay}
          </a>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            className="hover:text-brand"
          >
            WhatsApp {CONTACT.whatsappDisplay}
          </a>
          <span>{CONTACT.address}</span>
          <span className="text-navy-200">{CONTACT.hours}</span>
        </address>
      </div>
    </footer>
  );
}
