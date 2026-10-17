import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Image } from "@/components/ui/Image";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { Certifications } from "@/features/institutional/Certifications";
import { OPERATION_STATS, VALUES } from "@/features/institutional/content";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "O Grupo Natus é uma holding de incorporação e construção, atuando do Minha Casa Minha Vida ao alto luxo em Minas Gerais e no Rio de Janeiro.",
};

export default function QuemSomosPage() {
  return (
    <main>
      {/* Hero — parede da recepção do grupo (LCP: preload, sem Reveal). */}
      <section className="relative isolate overflow-hidden bg-navy-700 text-navy-50">
        <Image
          src="/quem-somos/hero.webp"
          alt="Recepção do Grupo Natus com a marca e as empresas ALIATTO Incorporadora e OASI Engenharia"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-navy-900/25" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-4 py-24 sm:px-6 md:py-28 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand">
            Grupo Natus
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl">
            Uma holding de incorporação e engenharia
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-100">
            Do Minha Casa Minha Vida ao alto luxo, em Minas Gerais e no Rio de
            Janeiro.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 lg:px-8">
        {/* Posicionamento (texto do cliente, revisões v3 e v4). */}
        <Reveal>
          <section className="max-w-3xl">
            <p className="text-lg leading-relaxed text-ink-soft">
              Somos uma holding de incorporação e construção que estrutura e
              executa empreendimentos residenciais em todo o espectro do
              mercado.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Nossa atuação cobre o ciclo completo do produto imobiliário:
              prospecção e viabilidade de terrenos, incorporação, aprovação,
              execução de obra e comercialização. É esse controle de ponta a
              ponta que nos permite operar em praças e segmentos distintos com o
              mesmo padrão de governança e de cumprimento de cronograma.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Hoje atuamos entre Belo Horizonte, região metropolitana e Leste
              Fluminense. Boa parte dos nossos empreendimentos nascem de
              parcerias com proprietários de terreno, construtores e
              investidores.
            </p>
          </section>
        </Reveal>

        {/* Valores. */}
        <section className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">Valores</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(VALUES).map((value, i) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.label} delay={i * 0.05}>
                  <div className="flex h-full gap-4 rounded-lg border border-border bg-surface p-5">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-brand-strong">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink">{value.label}</h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <Certifications className="mt-16" />

        {/* Números confirmados pela empresa. */}
        <section className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">Números</h2>
          </Reveal>
          <dl className="mt-4 grid grid-cols-3 gap-4">
            {OPERATION_STATS.map((stat) => (
              <div
                key={stat.title}
                className="rounded-lg border border-border p-4 text-center"
              >
                <dt className="text-xs text-muted-foreground">{stat.title}</dt>
                <dd className="mt-1 text-2xl font-semibold text-brand-strong">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA. */}
        <Reveal>
          <section className="mt-16 rounded-lg bg-navy-600 p-8 text-navy-50">
            <Logo negative className="h-8 w-auto" />
            <h2 className="mt-6 text-2xl font-semibold text-white">
              Vamos conversar sobre seu próximo imóvel?
            </h2>
            <Link href="/contato" className="mt-4 inline-block">
              <Button>Fale conosco</Button>
            </Link>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
