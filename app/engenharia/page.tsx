import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Home, Map, Warehouse, Workflow, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Image } from "@/components/ui/Image";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Serviços de Engenharia",
  description:
    "OASI Engenharia — obras por administração do Grupo Natus: residências de alto padrão, condomínios e galpões comerciais, com gestão da qualidade ISO 9001:2015.",
};

// Portfólio real (site atual: seção "Serviços de Engenharia", três cards
// "OBRA POR ADMINISTRAÇÃO"). Imagens: material da própria empresa (img/Servico -*).
// Primeira imagem de cada categoria é a capa (span 2 no grid).
const PORTFOLIO = [
  {
    id: "residencial",
    title: "Casa de alto padrão — Alphaville",
    icon: Home,
    images: [
      {
        src: "/engenharia/residencial-1.webp",
        alt: "Área gourmet e deck com vista para a serra em residência de alto padrão",
      },
      {
        src: "/engenharia/residencial-2.webp",
        alt: "Piscina com deck de madeira e vista para a mata",
      },
      {
        src: "/engenharia/residencial-3.webp",
        alt: "Fachada da residência ao entardecer, com paisagismo",
      },
      {
        src: "/engenharia/residencial-4.webp",
        alt: "Fachada e garagem coberta da residência",
      },
      {
        src: "/engenharia/residencial-5.webp",
        alt: "Varanda gourmet integrada à área externa da residência",
      },
    ],
  },
  {
    id: "condominio",
    title: "Condomínio — Avenida Condomínio",
    icon: Map,
    images: [
      {
        src: "/engenharia/loteamento-1.webp",
        alt: "Masterplan do condomínio com lotes demarcados sobre imagem aérea",
      },
      {
        src: "/engenharia/loteamento-2.webp",
        alt: "Infraestrutura viária do condomínio em execução",
      },
    ],
  },
  {
    id: "comercial",
    title: "Galpão comercial",
    icon: Warehouse,
    images: [
      {
        src: "/engenharia/comercial-1.webp",
        alt: "Fachada frontal do galpão comercial concluído",
      },
      {
        src: "/engenharia/comercial-2.webp",
        alt: "Vista lateral do galpão comercial",
      },
    ],
  },
] as const;

export default function EngenhariaPage() {
  return (
    <main>
      {/* Hero — obra residencial de alto padrão (LCP: preload, sem Reveal). */}
      <section className="relative isolate overflow-hidden bg-navy-700 text-navy-50">
        <Image
          src="/engenharia/residencial-1.webp"
          alt="Área externa de residência de alto padrão executada pela engenharia do Grupo Natus"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-navy-900/25" />
        <div className="relative mx-auto max-w-[var(--container-max)] px-4 py-24 sm:px-6 md:py-28 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand">
            OASI Engenharia
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl">
            Serviços de Engenharia
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-100">
            Obras por administração — do canteiro à entrega, com gestão da
            qualidade certificada.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 lg:px-8">
        {/* Posicionamento. */}
        <Reveal>
          <section className="max-w-3xl">
            <p className="text-lg leading-relaxed text-ink-soft">
              A engenharia do Grupo Natus executa obras por administração —
              conduzindo residências de alto padrão, condomínios e galpões
              comerciais com metodologia e processos bem estruturados e alta
              eficiência.
            </p>
          </section>
        </Reveal>

        {/* Como trabalhamos: Metodologia + Capacidade técnica. */}
        <section className="mt-14">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <Card className="flex h-full flex-col gap-3 p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-surface-muted text-brand-strong">
                  <Workflow aria-hidden="true" className="size-6" />
                </span>
                <h2 className="text-xl font-semibold text-ink">Metodologia</h2>
                <p className="text-ink-soft">
                  Metodologia e processos bem estruturados, com alta eficiência
                  na condução de cada obra — do planejamento à entrega.
                </p>
                <p className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-brand-strong">
                  <BadgeCheck aria-hidden="true" className="size-4" />
                  Gestão da qualidade NBR ISO 9001:2015
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.08}>
              <Card className="flex h-full flex-col gap-3 p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-surface-muted text-brand-strong">
                  <Wrench aria-hidden="true" className="size-6" />
                </span>
                <h2 className="text-xl font-semibold text-ink">
                  Capacidade técnica
                </h2>
                <p className="text-ink-soft">
                  Equipe e experiência em obras residenciais, condomínios e
                  comerciais.
                </p>
                <p className="text-sm text-muted-foreground">
                  TODO: CONTENT REQUIRED — equipe, certificações e números de
                  capacidade (a validar com a empresa).
                </p>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* Obras por administração — portfólio real. */}
        <section className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">
              Obras por administração
            </h2>
            <p className="mt-2 max-w-2xl text-ink-soft">
              Seleção de obras conduzidas pela engenharia do grupo.
            </p>
          </Reveal>

          <div className="mt-8 space-y-12">
            {PORTFOLIO.map((project, p) => {
              const Icon = project.icon;
              return (
                <Reveal key={project.id} delay={p * 0.05}>
                  <article>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-lg bg-surface-muted text-brand-strong">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-brand-strong">
                          Obra por administração
                        </p>
                        <h3 className="text-lg font-semibold text-ink">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {project.images.map((img, idx) => (
                        <div
                          key={img.src}
                          className={cn(
                            "relative overflow-hidden rounded-lg bg-surface-muted",
                            idx === 0
                              ? "col-span-2 aspect-[16/10]"
                              : "aspect-square",
                          )}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes={
                              idx === 0
                                ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 800px"
                                : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                            }
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* CTA. */}
        <Reveal>
          <section className="mt-16 rounded-lg bg-navy-600 p-8 text-navy-50">
            <h2 className="text-2xl font-semibold text-white">
              Precisa de um parceiro de engenharia?
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
