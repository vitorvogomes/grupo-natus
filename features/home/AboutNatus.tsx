import Link from "next/link";
import { ArrowRight, Award, Building2, KeyRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * O modelo de conteúdo de <dl> admite `div > dt + dd`, mas não um segundo div
 * entre eles — por isso o próprio Reveal (que renderiza o div animado) carrega
 * o estilo do cartão, em vez de envolver um <Card>.
 */
const STAT_CARD = cn(
  "rounded-lg border border-border bg-surface-muted shadow-sm",
  "grid grid-cols-[auto_1fr] items-center gap-x-5 p-6 sm:p-7",
);

/**
 * Números fornecidos pela empresa (2026-09-30). O "10" é literal, não
 * calculado a partir de 2016: data no render traria divergência
 * servidor/cliente e teste não determinístico. Revisar em 2027.
 */
const STATS: readonly {
  icon: LucideIcon;
  value: string;
  unit?: string;
  label: string;
}[] = [
  { icon: Award, value: "10", unit: "anos", label: "de experiência" },
  {
    icon: Building2,
    value: "100 mil",
    unit: "m²",
    label: "de área construída",
  },
  { icon: KeyRound, value: "+1.500", label: "unidades entregues" },
];

export function AboutNatus() {
  return (
    <section className="mx-auto max-w-[var(--container-max)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-strong">
            Quem somos
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-ink md:text-4xl">
            A essência do novo morar
          </h2>
          <p className="mt-6 text-ink-soft">
            Nascemos em 2016 com um objetivo muito claro: transformar a essência
            do novo morar em realidade. Ao longo da nossa história, construímos
            com método, eficiência e transparência para levar muitas famílias à
            conquista da casa própria. E agora chegou a sua vez.
          </p>
          <p className="mt-4 font-medium text-ink">
            É assim que a essência do novo morar sai do papel.
          </p>
          <p className="mt-4 text-sm text-ink-soft">
            Uma holding à frente da ALIATTO Incorporadora e da OASI Engenharia.
          </p>

          <Link
            href="/quem-somos"
            className={cn(buttonVariants({ size: "lg" }), "mt-8")}
          >
            Conheça a nossa história
            <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>

        {/* Empilhados: a leitura desce junto com o texto ao lado, e cada número
            entra em cascata — o olho percorre a lista em vez de recebê-la pronta.
            <dl> mantém o par rótulo↔valor associado para leitores de tela, como
            em /quem-somos; o grid inverte a ordem visual sem mexer no DOM. */}
        <dl className="grid gap-4">
          {STATS.map(({ icon: Icon, value, unit, label }, i) => (
            <Reveal key={label} delay={i * 0.09} className={STAT_CARD}>
              <span className="col-start-1 row-span-2 flex size-14 items-center justify-center rounded-full bg-navy-600 text-white shadow-sm">
                <Icon
                  aria-hidden="true"
                  className="size-6"
                  strokeWidth={1.75}
                />
              </span>
              <dt className="col-start-2 row-start-2 text-sm text-ink-soft">
                {label}
              </dt>
              <dd className="col-start-2 row-start-1 ml-0 text-3xl font-semibold leading-tight text-ink md:text-4xl">
                {value}
                {unit ? (
                  <span className="ml-1.5 text-xl font-medium text-brand-strong md:text-2xl">
                    {unit}
                  </span>
                ) : null}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
