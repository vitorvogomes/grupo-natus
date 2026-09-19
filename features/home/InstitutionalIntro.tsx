import Link from "next/link";

/**
 * Apresentação institucional resumida na Home.
 * Números são DADOS — não inventar: exibidos como TODO até a empresa fornecer.
 */
const STATS = [
  { label: "Anos de mercado" },
  { label: "Empreendimentos entregues" },
  { label: "Unidades" },
] as const;

export function InstitutionalIntro() {
  return (
    <section className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-3xl font-semibold text-ink">
            Uma holding de incorporação e engenharia
          </h2>
          <p className="mt-4 text-ink-soft">
            {/* Copy do site atual (posicionamento). */}
            O Grupo Natus é uma holding criada para desenvolver empreendimentos
            imobiliários residenciais para o segmento médio econômico e alto
            luxo — à frente das empresas ALIATTO Incorporadora e OASI
            Engenharia.
          </p>
          <Link
            href="/quem-somos"
            className="mt-6 inline-block font-medium text-brand-strong hover:text-ink"
          >
            Conheça a empresa →
          </Link>
        </div>

        <dl className="grid grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border p-4 text-center"
            >
              <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">
                TODO: CONTENT REQUIRED
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
