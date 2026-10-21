import type { Metadata } from "next";
import { pageMetadata } from "@/features/seo/metadata";
import Link from "next/link";
import { Home, Map, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Image } from "@/components/ui/Image";
import { Gallery } from "@/features/developments/Gallery";
import { Reveal } from "@/components/motion/Reveal";
import { Certifications } from "@/features/institutional/Certifications";
import {
  ENGINEERING_SUMMARY,
  VALUES,
} from "@/features/institutional/content";

export const metadata: Metadata = pageMetadata({
  title: "Engenharia e execução de obras",
  description:
    "Engenharia do Grupo Natus: planejamento, execução e controle de obra, com custo previsível e cronograma cumprido. Certificações ISO 9001:2015 e PBQP-H.",
  path: "/engenharia",
});

// Os três valores que descrevem a execução (os outros falam de relação
// comercial e ficam em Quem Somos). Texto do cliente, sem paráfrase.
const PRINCIPLES = [VALUES.metodo, VALUES.eficiencia, VALUES.transparencia];

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
      {
        src: "/engenharia/residencial-6.webp",
        alt: "Cozinha integrada com ilha e bancada para refeições",
      },
      {
        src: "/engenharia/residencial-7.webp",
        alt: "Área gourmet interna com ilha, churrasqueira e abertura para o jardim",
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
      {
        src: "/engenharia/comercial-3.webp",
        alt: "Interior do galpão, com estrutura metálica de cobertura e piso concretado",
      },
    ],
  },
] as const;

export default function EngenhariaPage() {
  return (
    <main>
      {/* Hero — obra residencial de alto padrão (LCP: preload, sem Reveal). */}
      <section className="relative isolate overflow-hidden bg-navy-700 text-navy-50">
        {/* Fachada, e não o deck: o deck é a capa da primeira obra logo abaixo,
            e a mesma foto duas vezes na mesma rolagem lia como erro. */}
        <Image
          src="/engenharia/residencial-3.webp"
          alt="Fachada de residência de alto padrão executada pela engenharia do Grupo Natus"
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
            Serviços de Engenharia
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-100">
            {ENGINEERING_SUMMARY}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 lg:px-8">
        {/* Posicionamento: além dos próprios empreendimentos, obras para terceiros. */}
        <Reveal>
          <section className="max-w-3xl">
            <p className="text-lg leading-relaxed text-ink-soft">
              Além dos empreendimentos do grupo, executamos obras por
              administração: residências de alto padrão, condomínios e galpões
              comerciais.
            </p>
          </section>
        </Reveal>

        {/* Como trabalhamos: os valores que descrevem a execução. */}
        <section className="mt-14">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">Como trabalhamos</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((value, i) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.label} delay={i * 0.08}>
                  <Card className="flex h-full flex-col gap-3 p-6">
                    <span className="inline-flex size-11 items-center justify-center rounded-lg bg-surface-muted text-brand-strong">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <h3 className="text-lg font-semibold text-ink">
                      {value.label}
                    </h3>
                    <p className="text-ink-soft">{value.description}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </section>

        <Certifications className="mt-16" />

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

                    {/* Mesma galeria da página do empreendimento: uma obra de
                        7 fotos cabe numa peça só, em vez de sete miniaturas
                        empilhando a página. */}
                    <div className="mt-5">
                      <Gallery images={project.images} />
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
