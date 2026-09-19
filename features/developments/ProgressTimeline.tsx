import { CalendarClock, Info } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatProgressDate, sortedStages } from "./progress";
import type { ConstructionProgress } from "@/types/development";

type ProgressTimelineProps = {
  progress: ConstructionProgress;
};

export function ProgressTimeline({ progress }: ProgressTimelineProps) {
  const stages = sortedStages(progress);

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <ProgressBar
          value={progress.overallPercentage}
          label="Progresso geral"
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

      {stages.length > 0 ? (
        <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {stages.map((stage) => (
            <li key={stage.name}>
              <ProgressBar value={stage.percentage} label={stage.name} />
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
