import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatProgressDate, sortedStages } from "./progress";
import type { ConstructionProgress } from "@/types/development";

type ProgressTimelineProps = {
  progress: ConstructionProgress;
};

export function ProgressTimeline({ progress }: ProgressTimelineProps) {
  const stages = sortedStages(progress);

  return (
    <div className="flex flex-col gap-6">
      <ProgressBar value={progress.overallPercentage} label="Progresso geral" />

      <p className="text-sm text-muted">
        Última atualização: {formatProgressDate(progress.updatedAt)}
      </p>

      {progress.isPreview ? (
        <p className="rounded-md bg-surface-muted px-3 py-2 text-xs text-muted">
          Percentuais ilustrativos — a confirmar com a empresa.
        </p>
      ) : null}

      <ol className="flex flex-col gap-4">
        {stages.map((stage) => (
          <li key={stage.name}>
            <ProgressBar value={stage.percentage} label={stage.name} />
          </li>
        ))}
      </ol>
    </div>
  );
}
