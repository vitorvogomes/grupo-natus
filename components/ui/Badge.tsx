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

const BASE =
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";

export function Badge({ children, status, className }: BadgeProps) {
  if (status) {
    const meta = STATUS_META[status];
    return (
      <span className={cn(BASE, meta.badgeClassName, className)}>
        {meta.label}
      </span>
    );
  }
  return (
    <span className={cn(BASE, "bg-surface-muted text-ink", className)}>
      {children}
    </span>
  );
}
