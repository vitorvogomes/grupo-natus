export type DevSection = {
  id: string;
  label: string;
};

/**
 * Catálogo de âncoras da página do empreendimento, na ordem em que as seções
 * aparecem. É só o vocabulário: quais entram na barra depende do que a página
 * de fato renderizou — com 5 dos 12 empreendimentos sem imagem e 1 com obra,
 * uma lista fixa levaria a âncoras que não existem no documento.
 */
export const DEV_SECTIONS = {
  empreendimento: { id: "empreendimento", label: "Empreendimento" },
  imagens: { id: "imagens", label: "Imagens" },
  oferece: { id: "o-que-oferece", label: "O que oferece" },
  localizacao: { id: "localizacao", label: "Localização" },
  obra: { id: "estagio-de-obra", label: "Estágio de Obra" },
  contato: { id: "falar-com-consultor", label: "Falar com Consultor" },
} as const satisfies Record<string, DevSection>;

type DevelopmentAnchorNavProps = {
  /** Seções realmente presentes no documento, na ordem de leitura. */
  sections: readonly DevSection[];
};

export function DevelopmentAnchorNav({ sections }: DevelopmentAnchorNavProps) {
  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="Seções do empreendimento"
      className="sticky top-16 z-30 border-y border-navy-500 bg-navy-600"
    >
      <ul className="mx-auto flex max-w-[var(--container-max)] flex-wrap justify-center gap-x-8 gap-y-1 px-4 py-3 text-sm font-medium text-navy-50 sm:px-6 lg:px-8">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="inline-block border-b-2 border-transparent pb-1 transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
