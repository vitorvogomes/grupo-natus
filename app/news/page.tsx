import type { Metadata } from "next";
import { getAllEditions } from "@/content/news";
import { NewsEditionCard } from "@/features/news/NewsEditionCard";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Natus News",
  description:
    "Natus News, a newsletter mensal do Grupo Natus: o que movimentou o mercado imobiliário e as novidades dos nossos empreendimentos em MG e no RJ.",
  path: "/news",
});

/** Índice das edições da Natus News (a mais recente primeiro). */
export default function NewsIndexPage() {
  const editions = getAllEditions();

  return (
    <main>
      <section className="bg-navy-700 text-navy-50">
        <div className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand">
            Newsletter
          </p>
          <h1 className="text-4xl font-bold text-white md:text-5xl">Natus News</h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-100">
            Todo mês, um resumo do que movimentou o mercado imobiliário e as
            principais novidades dos nossos empreendimentos em Minas Gerais e
            no Rio de Janeiro.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 lg:px-8">
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {editions.map((edition) => (
            <li key={edition.slug}>
              <NewsEditionCard edition={edition} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
