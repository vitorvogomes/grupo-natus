import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Image } from "@/components/ui/Image";

/**
 * Hero da Home. Copy factual (atuação confirmada: incorporação + engenharia,
 * MG e RJ). Imagem de fundo full-bleed (LCP → preload) + overlay para leitura.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-700 text-navy-50">
      <Image
        src="/home/hero.webp"
        alt="Fachada noturna de empreendimento do Grupo Natus"
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      {/* Overlay para legibilidade do texto (tokens de marca). */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/55 to-navy-900/20" />

      <div className="relative mx-auto grid max-w-[var(--container-max)] gap-8 px-4 py-24 sm:px-6 md:py-32 lg:px-8">
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
