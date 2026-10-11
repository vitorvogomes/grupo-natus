"use client";

import * as Progress from "@radix-ui/react-progress";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  label: string;
  size?: "sm" | "lg";
  className?: string;
};

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function ProgressBar({
  value,
  label,
  size = "sm",
  className,
}: ProgressBarProps) {
  const pct = clamp(value);
  const large = size === "lg";
  const reduce = useReducedMotion();
  const target = pct / 100;
  // Observa o TRILHO, não o preenchimento: o indicador nasce em scaleX(0), e
  // uma caixa de largura zero não cruza o limiar do IntersectionObserver de
  // forma confiável — a barra poderia nunca encher.
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(trackRef, { once: true, amount: 0.3 });

  return (
    <div className={className}>
      <div
        className={cn(
          "flex items-baseline justify-between gap-4",
          large ? "mb-2" : "mb-1.5",
        )}
      >
        <span
          className={cn(
            large ? "text-base font-medium text-ink" : "text-sm text-ink",
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "tabular-nums text-ink",
            // Sem `font-heading`: a Outfit não tem figuras tabulares, e o utilitário
            // `tabular-nums` acima viraria no-op — o número dançaria de largura
            // enquanto a barra anima. A Inter tem, então o percentual fica firme.
            large ? "text-2xl font-semibold text-brand-strong" : "text-sm font-medium",
          )}
        >
          {pct}%
        </span>
      </div>
      <Progress.Root
        ref={trackRef}
        aria-label={label}
        value={pct}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-surface-muted",
          large ? "h-3" : "h-2",
        )}
      >
        <Progress.Indicator asChild>
          <motion.div
            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-brand to-brand-strong"
            initial={{ scaleX: reduce ? target : 0 }}
            animate={{ scaleX: reduce || inView ? target : 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }
          />
        </Progress.Indicator>
      </Progress.Root>
    </div>
  );
}
