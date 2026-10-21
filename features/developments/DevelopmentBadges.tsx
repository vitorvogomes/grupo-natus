import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { SALES_BAND_LABELS, type Development, type SalesBand as SalesBandValue } from "@/types/development";

type DevelopmentBadgesProps = {
  development: Pick<Development, "status" | "mcmv">;
  className?: string;
};

/**
 * Selos do empreendimento: o status e, quando enquadrado, o MCMV. A fase de
 * vendas fica de fora de propósito — é a `SalesBand`, uma faixa com peso
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

/** Faixa horizontal da fase de vendas — só no card (o resumo usa os selos). */
export function SalesBand({ band, className }: { band: SalesBandValue; className?: string }) {
  return (
    <p
      className={cn(
        "bg-band px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white",
        className,
      )}
    >
      {SALES_BAND_LABELS[band]}
    </p>
  );
}
