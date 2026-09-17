import { Badge } from "@/components/ui/Badge";
import type { Development } from "@/types/development";

type DevelopmentDetailsProps = {
  development: Development;
};

export function DevelopmentDetails({ development }: DevelopmentDetailsProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Badge status={development.status} />
        <span className="text-sm text-muted">
          {development.location.city}/{development.location.state}
        </span>
      </div>

      <p className="max-w-3xl text-lg text-ink-soft">
        {development.description}
      </p>

      <div>
        <h2 className="mb-3 text-xl font-semibold text-ink">Características</h2>
        {development.features.length > 0 ? (
          <dl className="grid gap-3 sm:grid-cols-2">
            {development.features.map((feature) => (
              <div
                key={feature.label}
                className="flex justify-between gap-4 rounded-md border border-border px-4 py-3"
              >
                <dt className="text-ink">{feature.label}</dt>
                {feature.value ? (
                  <dd className="font-medium text-ink">{feature.value}</dd>
                ) : null}
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-muted">Características em breve.</p>
        )}
      </div>
    </section>
  );
}
