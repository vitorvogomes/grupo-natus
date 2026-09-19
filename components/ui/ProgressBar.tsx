import * as Progress from "@radix-ui/react-progress";
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
            large
              ? "font-heading text-2xl font-semibold text-brand-strong tabular-nums"
              : "text-sm font-medium text-muted-foreground tabular-nums",
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
        <Progress.Indicator
          className="h-full w-full flex-1 rounded-full bg-gradient-to-r from-brand to-brand-strong transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${100 - pct}%)` }}
        />
      </Progress.Root>
    </div>
  );
}
