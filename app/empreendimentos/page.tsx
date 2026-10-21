import type { Metadata } from "next";
import { getAllDevelopments } from "@/content/developments";
import { DevelopmentCatalog } from "@/features/developments/DevelopmentCatalog";
import { parseDevelopmentFilters } from "@/features/developments/searchParams";
import { pageMetadata } from "@/features/seo/metadata";

// Cidades tiradas do portfólio, para a descrição nunca sair do ar com o dado.
const cities = [...new Set(getAllDevelopments().map((d) => d.location.city))];

// Canônica sem a query: os filtros (?status=…&cidade=…) não viram páginas
// duplicadas no Google.
export const metadata: Metadata = pageMetadata({
  title: "Empreendimentos — Apartamentos e casas em MG e RJ",
  description: `Lançamentos, imóveis em construção e prontos para morar do Grupo Natus em ${new Intl.ListFormat("pt-BR").format(cities)}. Filtre por status, cidade e tipo.`,
  path: "/empreendimentos",
});

type EmpreendimentosPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * Catálogo completo. Os filtros chegam pela URL (a busca da home navega para
 * cá), então o HTML já sai filtrado — sem flash de 12 cards antes de reduzir.
 */
export default async function EmpreendimentosPage({
  searchParams,
}: EmpreendimentosPageProps) {
  const developments = getAllDevelopments();
  const initialFilters = parseDevelopmentFilters(
    await searchParams,
    developments,
  );

  return (
    <main className="mx-auto max-w-[var(--container-max)] px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-ink md:text-4xl">
          Empreendimentos
        </h1>
        <p className="mt-2 text-ink-soft">
          {developments.length} empreendimentos em Minas Gerais e no Rio de
          Janeiro.
        </p>
      </header>
      {/* O <h2> fecha o salto h1 → h3 (os títulos dos cards): sem ele a
          estrutura da página pula um nível para quem navega por cabeçalhos. */}
      <h2 className="sr-only">Catálogo de empreendimentos</h2>
      <DevelopmentCatalog
        developments={developments}
        initialFilters={initialFilters}
      />
    </main>
  );
}
