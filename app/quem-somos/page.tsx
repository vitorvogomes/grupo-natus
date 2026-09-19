import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Compass,
  Gauge,
  Handshake,
  Scale,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Image } from "@/components/ui/Image";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "O Grupo Natus é uma holding de incorporação e engenharia — ALIATTO Incorporadora e OASI Engenharia — atuando do médio econômico ao alto luxo em MG e RJ.",
};

// Empresas do grupo (site atual: "Hoje, o grupo está à frente das empresas
// ALIATTO INCORPORADORA e OASI ENGENHARIA"). Descrição institucional detalhada
// ainda é TODO — aqui só o papel evidente de cada empresa dentro da holding.
const COMPANIES = [
  {
    name: "ALIATTO Incorporadora",
    role: "Incorporação imobiliária",
    icon: Building2,
    description:
      "Braço de incorporação do grupo — da concepção do produto ao lançamento dos empreendimentos residenciais.",
  },
  {
    name: "OASI Engenharia",
    role: "Engenharia e execução de obras",
    icon: Compass,
    description:
      "Braço de engenharia e construção — responsável pelas obras, do canteiro à entrega, sob metodologia e processos estruturados.",
  },
] as const;

// Valores/princípios com lastro no site atual: "transparência, ética e lealdade",
// "metodologia e processos bem estruturados", "alta eficiência" + qualidade
// certificada (ISO 9001:2015, material da própria empresa).
const VALUES = [
  {
    label: "Transparência",
    icon: ShieldCheck,
    description: "Relações comerciais claras, do primeiro contato à entrega.",
  },
  {
    label: "Ética",
    icon: Scale,
    description: "Conduta íntegra em cada decisão e cada obra.",
  },
  {
    label: "Lealdade",
    icon: Handshake,
    description: "Compromisso de longo prazo com clientes e parceiros.",
  },
  {
    label: "Eficiência",
    icon: Gauge,
    description: "Alta eficiência na condução dos projetos e prazos.",
  },
  {
    label: "Método",
    icon: Workflow,
    description: "Metodologia e processos bem estruturados em toda a operação.",
  },
  {
    label: "Qualidade certificada",
    icon: BadgeCheck,
    description: "Gestão da qualidade certificada NBR ISO 9001:2015.",
  },
] as const;

const STATS = ["Anos de mercado", "Empreendimentos entregues", "Unidades"];

function TodoText({ children }: { children: string }) {
  return <span className="text-muted-foreground">{children}</span>;
}

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
            Do médio econômico ao alto luxo — em Minas Gerais e no Rio de
            Janeiro.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 lg:px-8">
        {/* Posicionamento (copy do site atual). */}
        <Reveal>
          <section className="max-w-3xl">
            <p className="text-lg leading-relaxed text-ink-soft">
              O Grupo Natus é uma holding criada para desenvolver
              empreendimentos imobiliários residenciais para o segmento médio
              econômico e alto luxo.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Com metodologia e processos bem estruturados, trabalha com alta
              eficiência, sempre buscando transparência, ética e lealdade em suas
              relações comerciais.
            </p>
          </section>
        </Reveal>

        {/* Empresas do grupo. */}
        <section className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">
              Empresas do grupo
            </h2>
            <p className="mt-2 max-w-2xl text-ink-soft">
              O grupo está à frente de duas empresas que se complementam — da
              incorporação à execução da obra.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {COMPANIES.map((company, i) => {
              const Icon = company.icon;
              return (
                <Reveal key={company.name} delay={i * 0.08}>
                  <Card className="flex h-full flex-col gap-3 p-6">
                    <span className="inline-flex size-11 items-center justify-center rounded-lg bg-surface-muted text-brand-strong">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <h3 className="text-lg font-semibold text-ink">
                      {company.name}
                    </h3>
                    <p className="text-sm font-medium uppercase tracking-wide text-brand-strong">
                      {company.role}
                    </p>
                    <p className="text-ink-soft">{company.description}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Valores. */}
        <section className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">Valores</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, i) => {
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

        {/* Selo de qualidade (material da própria empresa). */}
        <Reveal>
          <section className="mt-12 flex flex-col items-center gap-5 rounded-lg border border-border bg-surface-muted p-6 sm:flex-row sm:items-center">
            <Image
              src="/quem-somos/iso-9001.webp"
              alt="Selo de Sistema de Gestão da Qualidade certificado NBR ISO 9001:2015"
              width={220}
              height={82}
              className="h-auto w-[200px]"
            />
            <div>
              <h3 className="font-semibold text-ink">
                Gestão da qualidade certificada
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                Sistema de Gestão da Qualidade certificado conforme a norma NBR
                ISO 9001:2015.
              </p>
            </div>
          </section>
        </Reveal>

        {/* Nossa história — sem copy no site atual: pendente da empresa. */}
        <section className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">Nossa história</h2>
            <p className="mt-3 max-w-3xl text-ink-soft">
              <TodoText>
                TODO: CONTENT REQUIRED — história, fundação e trajetória do
                grupo (a validar com a empresa).
              </TodoText>
            </p>
          </Reveal>
        </section>

        {/* Números — dados: nunca inventar (TODO até a empresa fornecer). */}
        <section className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">Números</h2>
          </Reveal>
          <dl className="mt-4 grid grid-cols-3 gap-4">
            {STATS.map((label) => (
              <div
                key={label}
                className="rounded-lg border border-border p-4 text-center"
              >
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">
                  TODO: CONTENT REQUIRED
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA. */}
        <Reveal>
          <section className="mt-16 rounded-lg bg-navy-600 p-8 text-navy-50">
            <h2 className="text-2xl font-semibold text-white">
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
