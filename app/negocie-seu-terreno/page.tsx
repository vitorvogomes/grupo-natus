import type { Metadata } from "next";
import { LeadForm, type LeadField } from "@/features/contact/LeadForm";

export const metadata: Metadata = {
  title: "Negocie seu Terreno",
  description:
    "Tem um terreno? Apresente para o Grupo Natus avaliar uma parceria ou compra.",
};

// TODO: CONTENT REQUIRED — confirmar os campos exatos do formulário com a empresa.
const FIELDS: LeadField[] = [
  { name: "nome", label: "Nome", required: true },
  { name: "telefone", label: "Telefone", type: "tel", required: true },
  { name: "email", label: "Email", type: "email" },
  {
    name: "localizacao",
    label: "Localização do terreno",
    required: true,
    placeholder: "Cidade, bairro, endereço",
  },
  { name: "area", label: "Área (m²)", placeholder: "ex.: 1000" },
  {
    name: "tipo",
    label: "Tipo / uso pretendido",
    type: "select",
    placeholder: "Selecione",
    options: [
      { value: "residencial", label: "Residencial" },
      { value: "comercial", label: "Comercial" },
      { value: "misto", label: "Misto" },
      { value: "nao_sei", label: "Não sei / a avaliar" },
    ],
  },
  { name: "observacoes", label: "Observações", type: "textarea" },
];

export default function NegocieTerrenoPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-ink md:text-4xl">
        Negocie seu Terreno
      </h1>
      <p className="mt-4 text-ink-soft">
        O Grupo Natus está sempre em busca de novos terrenos para desenvolver.
        Apresente o seu: nossa equipe avalia parceria, permuta ou compra.
      </p>

      <div className="mt-10">
        <LeadForm
          leadType="terreno"
          fields={FIELDS}
          submitLabel="Enviar terreno"
        />
      </div>
    </main>
  );
}
