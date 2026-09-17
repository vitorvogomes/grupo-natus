import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
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
      <span className={cx(BASE, meta.badgeClassName, className)}>
        {meta.label}
      </span>
    );
  }
  return (
    <span className={cx(BASE, "bg-surface-muted text-ink", className)}>
      {children}
    </span>
  );
}
