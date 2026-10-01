import { LeadForm, type LeadField } from "./LeadForm";

type InterestFormProps = {
  slug: string;
  name: string;
};

/**
 * Formulário de interesse da página do empreendimento — três campos.
 *
 * O empreendimento não é mais um campo na tela: a página já sabe qual é, e um
 * input somente-leitura só ocupava espaço e dava ao formulário a aparência de
 * ser mais longo do que é. Ele segue no payload via `context`, então o e-mail
 * do lead continua dizendo de qual empreendimento veio (lib/email serializa
 * todas as chaves).
 */
export function InterestForm({ slug, name }: InterestFormProps) {
  const fields: LeadField[] = [
    { name: "nome", label: "Nome", required: true },
    { name: "telefone", label: "Telefone", type: "tel", required: true },
    { name: "email", label: "E-mail", type: "email", required: true },
  ];

  return (
    <LeadForm
      leadType="interesse"
      fields={fields}
      submitLabel="Quero saber mais!"
      context={{ slug, empreendimento: name }}
    />
  );
}
