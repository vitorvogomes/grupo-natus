import { CalendarClock, Info } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Gallery } from "./Gallery";
import { canonicalStages, formatProgressDate } from "./progress";
import type {
  ConstructionProgress,
  DevelopmentImage,
} from "@/types/development";

type ProgressTimelineProps = {
  progress: ConstructionProgress;
  /** Fotos do canteiro (kind "obra"). Vazio = sem painel de canteiro. */
  photos?: readonly DevelopmentImage[];
};

export function ProgressTimeline({
  progress,
  photos = [],
}: ProgressTimelineProps) {
  const stages = canonicalStages(progress);
  const hasPhotos = photos.length > 0;

  const total = (
    <div className="flex flex-col gap-4">
      {/* Total Construído = percentual geral, em destaque. */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <ProgressBar
          value={progress.overallPercentage}
          label="Total Construído"
          size="lg"
        />
        {progress.updatedAt ? (
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarClock aria-hidden="true" className="size-4 shrink-0" />
            Última atualização: {formatProgressDate(progress.updatedAt)}
          </p>
        ) : null}
      </div>

      {progress.isPreview ? (
        <p className="inline-flex items-center gap-2 rounded-md bg-surface-muted px-3 py-2 text-xs text-muted-foreground">
          <Info aria-hidden="true" className="size-4 shrink-0" />
          Percentuais ilustrativos — a confirmar com a empresa.
        </p>
      ) : null}
    </div>
  );

  // Só o total, sem etapas detalhadas, é um estado válido: a lista vazia não
  // entra.
  const etapas =
    stages.length > 0 ? (
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
    ) : null;

  // Sem fotos do canteiro não há painel reservado: o total e as etapas
  // dividem a largura (ou o total fica sozinho, numa coluna estreita).
  if (!hasPhotos) {
    return etapas ? (
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
        {total}
        {etapas}
      </div>
    ) : (
      <div className="max-w-xl">{total}</div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
      <div className="flex flex-col gap-8">
        {total}
        {etapas}
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Acompanhamento no canteiro
        </h3>
        {/* Meia coluna do container no desktop (~600px), não o palco inteiro. */}
        <Gallery images={photos} desktopWidth={600} />
      </div>
    </div>
  );
}
