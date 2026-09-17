import { LeadForm, type LeadField } from "./LeadForm";

type InterestFormProps = {
  slug: string;
  name: string;
};

export function InterestForm({ slug, name }: InterestFormProps) {
  const fields: LeadField[] = [
    { name: "nome", label: "Nome", required: true },
    { name: "telefone", label: "Telefone", type: "tel", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    {
      name: "empreendimento",
      label: "Empreendimento",
      defaultValue: name,
      readOnly: true,
    },
    { name: "mensagem", label: "Mensagem", type: "textarea" },
  ];

  return (
    <LeadForm
      leadType="interesse"
      fields={fields}
      submitLabel="Tenho interesse"
      context={{ slug }}
    />
  );
}
