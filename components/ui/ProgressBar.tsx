import { cx } from "@/lib/cx";

type ProgressBarProps = {
  value: number;
  label: string;
  className?: string;
};

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const pct = clamp(value);
  return (
    <div className={className}>
      <div className="mb-1 flex justify-between text-sm text-ink">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2.5 w-full overflow-hidden rounded-full bg-surface-muted"
      >
        <div
          className={cx("h-full rounded-full bg-status-em-construcao")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
