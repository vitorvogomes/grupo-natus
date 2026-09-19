import { DevelopmentCard } from "./DevelopmentCard";
import type { Development } from "@/types/development";

type DevelopmentGridProps = {
  developments: readonly Development[];
};

export function DevelopmentGrid({ developments }: DevelopmentGridProps) {
  if (developments.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        Nenhum empreendimento encontrado com os filtros selecionados.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {developments.map((development) => (
        <DevelopmentCard key={development.slug} development={development} />
      ))}
    </div>
  );
}
