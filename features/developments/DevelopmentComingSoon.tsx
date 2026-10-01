import { BellRing, Images } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { STATUS_META, type Development } from "@/types/development";

type DevelopmentComingSoonProps = {
  development: Development;
};

/**
 * Página de empreendimento sem material (5 dos 12 lançamentos hoje).
 *
 * O que existe de verdade — status, praça e tipologia — vira o conteúdo, em
 * vez de a página inteira ser uma sequência de seções dizendo "em breve". A
 * pessoa que chegou aqui por um anúncio ou por busca sai com algo na mão e um
 * caminho para ser avisada, que é o melhor desfecho possível sem renders.
 */
export function DevelopmentComingSoon({
  development,
}: DevelopmentComingSoonProps) {
  const { name, status, location, features } = development;
  const href = buildWhatsAppUrl({
    message: `Olá! Quero receber as novidades do empreendimento ${name}.`,
  });

  const facts = [
    { label: "Status", value: STATUS_META[status].label },
    { label: "Localização", value: `${location.city}/${location.state}` },
    ...features.map((f) => ({ label: f.label, value: f.value ?? "—" })),
  ];

  return (
    <section className="rounded-2xl border border-border bg-surface-muted p-8 sm:p-10 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
        <div>
          <Badge status={status} />
          <h2 className="mt-4 text-balance text-3xl font-semibold text-ink md:text-4xl">
            {name}
          </h2>
          <p className="mt-4 max-w-prose text-ink-soft">
            As imagens e os detalhes deste empreendimento estão sendo
            finalizados. Fale com a gente para receber o material em primeira
            mão — plantas, valores e condições.
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "mt-8")}
          >
            <BellRing aria-hidden="true" />
            Quero ser avisado
          </a>
        </div>

        {/* O rodapé fica fora do <dl>: o modelo de conteúdo da lista de
            definições só admite div/dt/dd, e um <p> solto ali é inválido. */}
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <dl className="divide-y divide-border">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-6 px-5 py-4"
              >
                <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                <dd className="text-right font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="flex items-center gap-2 border-t border-border bg-surface-muted px-5 py-4 text-sm text-muted-foreground">
            <Images aria-hidden="true" className="size-4 shrink-0" />
            Galeria em produção
          </p>
        </div>
      </div>
    </section>
  );
}
