export type DevSection = {
  id: string;
  label: string;
};

/** Âncoras de seção da página de empreendimento (estrutura ref.: novolar). */
export const DEV_SECTIONS: readonly DevSection[] = [
  { id: "empreendimento", label: "Empreendimento" },
  { id: "imagens", label: "Imagens" },
  { id: "localizacao", label: "Localização" },
  { id: "estagio-de-obra", label: "Estágio de Obra" },
  { id: "falar-com-consultor", label: "Falar com Consultor" },
];

export function DevelopmentAnchorNav() {
  return (
    <nav
      aria-label="Seções do empreendimento"
      className="sticky top-16 z-30 border-y border-navy-500 bg-navy-600"
    >
      <ul className="mx-auto flex max-w-[var(--container-max)] flex-wrap justify-center gap-x-8 gap-y-1 px-4 py-3 text-sm font-medium text-navy-50 sm:px-6 lg:px-8">
        {DEV_SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="inline-block border-b-2 border-transparent pb-1 transition-colors hover:border-brand hover:text-brand"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
