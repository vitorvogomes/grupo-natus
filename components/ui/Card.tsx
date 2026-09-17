import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/cx";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Elemento raiz (default: div). Útil para semântica (ex.: article). */
  as?: ElementType;
};

export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cx(
        "rounded-lg border border-border bg-surface shadow-sm",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
