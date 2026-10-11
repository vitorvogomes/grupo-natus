import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Development } from "@/types/development";

type DevelopmentBadgesProps = {
  development: Pick<Development, "status" | "mcmv" | "soldOut">;
  className?: string;
};

/**
 * Selos do empreendimento: o status e, quando enquadrado, o MCMV. "100%
 * vendido" fica de fora de propósito — é a `SoldOutBand`, uma faixa com peso
 * próprio, e não mais um selo disputando a mesma linha.
 */
export function DevelopmentBadges({
  development,
  className,
}: DevelopmentBadgesProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Badge status={development.status} />
      {development.mcmv ? (
        <Badge>Minha Casa Minha Vida</Badge>
      ) : null}
    </div>
  );
}

/** Faixa horizontal de "100% vendido" — só no card (o resumo usa os selos). */
export function SoldOutBand({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "bg-status-vendido px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white",
        className,
      )}
    >
      100% vendido
    </p>
  );
}
