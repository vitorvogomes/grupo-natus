import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Grupo Natus — incorporação e engenharia em Minas Gerais e no Rio de Janeiro.",
};

// Valores confirmados no product-brief (§ posicionamento).
const VALUES = [
  "Confiança",
  "Qualidade",
  "Sofisticação",
  "Transparência",
  "Solidez",
  "Capacidade de execução",
  "Proximidade",
];

const STATS = ["Anos de mercado", "Empreendimentos entregues", "Unidades"];

function TodoText({ children }: { children: string }) {
  return <span className="text-muted">{children}</span>;
}

export default function QuemSomosPage() {
  return (
    <main className="mx-auto max-w-[var(--container-max)] px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-ink md:text-4xl">Quem Somos</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        O Grupo Natus atua em incorporação imobiliária e engenharia em Minas
        Gerais e no Rio de Janeiro.{" "}
        <TodoText>(TODO: CONTENT REQUIRED — texto institucional definitivo)</TodoText>
      </p>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-ink">Nossa história</h2>
        <p className="mt-3 max-w-3xl text-ink-soft">
          <TodoText>
            TODO: CONTENT REQUIRED — história, fundação e trajetória do grupo.
          </TodoText>
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-ink">Empresas do grupo</h2>
        <p className="mt-3 max-w-3xl text-ink-soft">
          <TodoText>
            TODO: CONTENT REQUIRED — empresas que compõem o Grupo Natus.
          </TodoText>
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-ink">Valores</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {VALUES.map((value) => (
            <li
              key={value}
              className="rounded-full bg-surface-muted px-4 py-2 text-sm text-ink"
            >
              {value}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-ink">Números</h2>
        <dl className="mt-4 grid grid-cols-3 gap-4">
          {STATS.map((label) => (
            <div
              key={label}
              className="rounded-lg border border-border p-4 text-center"
            >
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">
                TODO: CONTENT REQUIRED
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 rounded-lg bg-navy-600 p-8 text-navy-50">
        <h2 className="text-2xl font-semibold text-white">
          Vamos conversar sobre seu próximo imóvel?
        </h2>
        <Link href="/contato" className="mt-4 inline-block">
          <Button>Fale conosco</Button>
        </Link>
      </section>
    </main>
  );
}
