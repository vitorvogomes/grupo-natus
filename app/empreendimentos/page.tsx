import type { Metadata } from "next";
import { getAllDevelopments } from "@/content/developments";
import { DevelopmentCatalog } from "@/features/developments/DevelopmentCatalog";
import { parseDevelopmentFilters } from "@/features/developments/searchParams";

export const metadata: Metadata = {
  title: "Empreendimentos",
  description:
    "Conheça os empreendimentos do Grupo Natus em Minas Gerais e no Rio de Janeiro.",
};

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
