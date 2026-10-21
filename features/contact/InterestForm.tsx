import { LeadForm, type LeadField } from "./LeadForm";

type InterestFormProps = {
  slug: string;
};

/**
 * Formulário de interesse da página do empreendimento — três campos.
 *
 * O empreendimento não é mais um campo na tela: a página já sabe qual é, e um
 * input somente-leitura só ocupava espaço e dava ao formulário a aparência de
 * ser mais longo do que é. Segue só o `slug`: o servidor resolve nome e ID no
 * CRM pelo dado. A página e a UTM (o anúncio traz o visitante até aqui) vão
 * junto, lidas da URL no envio.
 */
export function InterestForm({ slug }: InterestFormProps) {
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
      context={{ slug }}
      withPageContext
    />
  );
}
