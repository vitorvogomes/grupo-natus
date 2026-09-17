import type { Metadata } from "next";
import { LeadForm, type LeadField } from "@/features/contact/LeadForm";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fale Conosco",
  description:
    "Fale com o Grupo Natus: telefone, WhatsApp, e-mail e formulário de contato.",
};

const FIELDS: LeadField[] = [
  { name: "nome", label: "Nome", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "telefone", label: "Telefone", type: "tel", required: true },
  {
    name: "assunto",
    label: "Assunto",
    type: "select",
    placeholder: "Selecione",
    options: [
      { value: "compra", label: "Quero comprar um imóvel" },
      { value: "terreno", label: "Negociar meu terreno" },
      { value: "engenharia", label: "Serviços de engenharia" },
      { value: "outro", label: "Outro assunto" },
    ],
  },
  { name: "mensagem", label: "Mensagem", type: "textarea", required: true },
];

export default function ContatoPage() {
  return (
    <main className="mx-auto max-w-[var(--container-max)] px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-ink md:text-4xl">Fale Conosco</h1>
      <p className="mt-2 text-ink-soft">
        Envie sua mensagem ou fale com a gente pelos canais abaixo.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <LeadForm leadType="contato" fields={FIELDS} submitLabel="Enviar mensagem" />

        <aside className="flex flex-col gap-4 text-ink-soft">
          <h2 className="text-xl font-semibold text-ink">Canais de atendimento</h2>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-strong">
            {CONTACT.email}
          </a>
          <a href={`tel:${CONTACT.phone}`} className="hover:text-brand-strong">
            {CONTACT.phoneDisplay}
          </a>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-strong"
          >
            WhatsApp {CONTACT.whatsappDisplay}
          </a>
          <p>{CONTACT.address}</p>
          <p className="text-muted">{CONTACT.hours}</p>
        </aside>
      </div>
    </main>
  );
}
