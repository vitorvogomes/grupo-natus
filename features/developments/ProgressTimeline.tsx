import { CalendarClock, Camera, Info } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Gallery } from "./Gallery";
import { canonicalStages, formatProgressDate } from "./progress";
import type {
  ConstructionProgress,
  DevelopmentImage,
} from "@/types/development";

type ProgressTimelineProps = {
  progress: ConstructionProgress;
  /** Fotos do canteiro (kind "obra"). Vazio = painel de "em breve". */
  photos?: readonly DevelopmentImage[];
};

export function ProgressTimeline({
  progress,
  photos = [],
}: ProgressTimelineProps) {
  const stages = canonicalStages(progress);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
      <div className="flex flex-col gap-8">
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

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Acompanhamento no canteiro
        </h3>
        {photos.length > 0 ? (
          <Gallery images={photos} />
        ) : (
          // Caixa desenhada, e não uma linha cinza solta: a ausência de foto é
          // um estado previsto da obra (recém-iniciada), não uma falha da
          // página. Ver docs/CONTENT-GAPS.md.
          <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface-muted px-6 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-surface text-brand-strong shadow-sm">
              <Camera aria-hidden="true" className="size-6" strokeWidth={1.75} />
            </span>
            <p className="font-medium text-ink">Fotos da obra em breve</p>
            <p className="max-w-xs text-sm text-ink-soft">
              O registro do canteiro é publicado aqui conforme a obra avança.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
