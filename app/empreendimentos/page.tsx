import type { Metadata } from "next";
import { getAllDevelopments } from "@/content/developments";
import { DevelopmentCatalog } from "@/features/developments/DevelopmentCatalog";

export const metadata: Metadata = {
  title: "Empreendimentos",
  description:
    "Conheça os empreendimentos do Grupo Natus em Minas Gerais e no Rio de Janeiro.",
};

export default function EmpreendimentosPage() {
  const developments = getAllDevelopments();
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
      <DevelopmentCatalog developments={developments} />
    </main>
  );
}
