"use client";

import * as Progress from "@radix-ui/react-progress";
import { motion, useReducedMotion } from "motion/react";
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
            large ? "font-heading text-2xl font-semibold text-brand-strong" : "text-sm font-medium",
          )}
        >
          {pct}%
        </span>
      </div>
      <Progress.Root
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
            whileInView={{ scaleX: target }}
            viewport={{ once: true, amount: 0.3 }}
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
