import { CalendarClock, Info } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { canonicalStages, formatProgressDate } from "./progress";
import type { ConstructionProgress } from "@/types/development";

type ProgressTimelineProps = {
  progress: ConstructionProgress;
};

export function ProgressTimeline({ progress }: ProgressTimelineProps) {
  const stages = canonicalStages(progress);

  return (
    <div className="flex flex-col gap-8">
      {/* Total Construído = percentual geral, em destaque. */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <ProgressBar
          value={progress.overallPercentage}
          label="Total Construído"
          size="lg"
        />
        <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarClock aria-hidden="true" className="size-4 shrink-0" />
          Última atualização: {formatProgressDate(progress.updatedAt)}
        </p>
      </div>

      {progress.isPreview ? (
        <p className="inline-flex items-center gap-2 rounded-md bg-surface-muted px-3 py-2 text-xs text-muted-foreground">
          <Info aria-hidden="true" className="size-4 shrink-0" />
          Percentuais ilustrativos — a confirmar com a empresa.
        </p>
      ) : null}

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Etapas da obra
        </h3>
        <ol className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {stages.map((stage) => (
            <li key={stage.name} className="px-5 py-4">
              <ProgressBar value={stage.percentage} label={stage.name} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
