import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Hero da Home. Copy factual (atuação confirmada: incorporação + engenharia,
 * MG e RJ). Titulação editorial final a validar com a empresa.
 */
export function Hero() {
  return (
    <section className="bg-navy-600 text-navy-50">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-8 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand">
            Grupo Natus
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Incorporação e engenharia em Minas Gerais e no Rio de Janeiro
          </h1>
          <p className="mt-4 text-lg text-navy-100">
            Conheça os empreendimentos do Grupo Natus — do lançamento à entrega.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/empreendimentos">
              <Button size="lg">Ver empreendimentos</Button>
            </Link>
            <Link href="/contato">
              <Button size="lg" variant="outlineInverse">
                Falar com o time
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
