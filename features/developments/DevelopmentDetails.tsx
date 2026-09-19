import { Check } from "lucide-react";
import type { Development } from "@/types/development";

type DevelopmentDetailsProps = {
  development: Development;
};

function isTodo(text: string): boolean {
  return text.trim().toUpperCase().startsWith("TODO");
}

export function DevelopmentDetails({ development }: DevelopmentDetailsProps) {
  const hasDescription =
    development.description.length > 0 && !isTodo(development.description);

  return (
    <section className="flex flex-col gap-8">
      {hasDescription ? (
        <p className="max-w-3xl text-lg text-ink-soft">
          {development.description}
        </p>
      ) : (
        <p className="max-w-3xl text-ink-soft">Descrição detalhada em breve.</p>
      )}

      <div>
        <h2 className="mb-4 text-xl font-semibold text-ink">Características</h2>
        {development.features.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {development.features.map((feature) => (
              <li
                key={feature.label}
                className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-brand-strong"
                />
                <div>
                  <p className="font-medium text-ink">{feature.label}</p>
                  {feature.value ? (
                    <p className="text-sm text-muted-foreground">
                      {feature.value}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Características em breve.</p>
        )}
      </div>
    </section>
  );
}
