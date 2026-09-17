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
            Solidez, execução e proximidade
          </h2>
          <p className="mt-4 text-ink-soft">
            {/* Texto editorial a validar com a empresa. */}
            O Grupo Natus atua em incorporação imobiliária e engenharia em Minas
            Gerais e no Rio de Janeiro.{" "}
            <span className="text-muted">
              (TODO: CONTENT REQUIRED — texto institucional definitivo)
            </span>
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
              <dt className="text-xs text-muted">{stat.label}</dt>
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
