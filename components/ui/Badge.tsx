import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  STATUS_META,
  type DevelopmentStatus,
} from "@/types/development";

type BadgeProps = {
  children?: ReactNode;
  /** Quando informado, renderiza a badge de status do empreendimento. */
  status?: DevelopmentStatus;
  className?: string;
};

/**
 * Um selo só, branco com contorno: status e MCMV têm o mesmo peso visual. A
 * faixa "100% vendido" é o único destaque colorido do card; cor por status
 * competiria com ela e com a foto.
 */
const BASE =
  "inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink ring-1 ring-border";

export function Badge({ children, status, className }: BadgeProps) {
  return (
    <span className={cn(BASE, className)}>
      {status ? STATUS_META[status].label : children}
    </span>
  );
}
