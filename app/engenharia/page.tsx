import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Serviços de Engenharia",
  description:
    "Atuação, metodologia e capacidade técnica em engenharia do Grupo Natus.",
};

const SECTIONS = [
  { title: "Atuação", body: "Áreas e segmentos de atuação em engenharia." },
  { title: "Metodologia", body: "Como o Grupo Natus conduz seus projetos." },
  { title: "Tipos de projeto", body: "Categorias de projeto atendidas." },
  { title: "Capacidade técnica", body: "Equipe, certificações e capacidade." },
  { title: "Obras realizadas", body: "Portfólio de obras entregues." },
  { title: "Diferenciais", body: "O que distingue a engenharia Natus." },
];

export default function EngenhariaPage() {
  return (
    <main className="mx-auto max-w-[var(--container-max)] px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-ink md:text-4xl">
        Serviços de Engenharia
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Engenharia com solidez e capacidade de execução.{" "}
        <span className="text-muted">
          (TODO: CONTENT REQUIRED — apresentação definitiva)
        </span>
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold text-ink">{section.title}</h2>
            <p className="mt-2 text-ink-soft">{section.body}</p>
            <p className="mt-1 text-sm text-muted">TODO: CONTENT REQUIRED</p>
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-lg bg-navy-600 p-8 text-navy-50">
        <h2 className="text-2xl font-semibold text-white">
          Precisa de um parceiro de engenharia?
        </h2>
        <Link href="/contato" className="mt-4 inline-block">
          <Button>Fale conosco</Button>
        </Link>
      </section>
    </main>
  );
}
