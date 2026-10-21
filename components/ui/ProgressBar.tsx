"use client";

import * as Progress from "@radix-ui/react-progress";
import { useLayoutEffect, useRef } from "react";
import { armReveal } from "@/components/motion/armReveal";
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
  const target = pct / 100;
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  // Sai do servidor no valor; abaixo da tela, enche ao rolar (`armReveal`).
  // O gatilho é o TRILHO: o preenchimento em scaleX(0) tem largura zero e não
  // cruza o limiar do IntersectionObserver.
  useLayoutEffect(() => {
    if (!trackRef.current || !fillRef.current) return;
    return armReveal(fillRef.current, trackRef.current, {
      from: { transform: "scaleX(0)" },
      to: { transform: `scaleX(${target})` },
      duration: 0.8,
      amount: 0.3,
    });
  }, [target]);

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
          <div
            ref={fillRef}
            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-brand to-brand-strong"
            style={{ transform: `scaleX(${target})` }}
          />
        </Progress.Indicator>
      </Progress.Root>
    </div>
  );
}
