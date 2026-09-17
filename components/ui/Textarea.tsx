import type { TextareaHTMLAttributes } from "react";
import { cx } from "@/lib/cx";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  error?: string;
};

export function Textarea({
  id,
  label,
  error,
  required,
  className,
  ...props
}: TextareaProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cx(
          "rounded-md border px-3 py-2 text-ink outline-none focus-visible:ring-2 focus-visible:ring-brand",
          error ? "border-status-em-construcao" : "border-border",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-status-em-construcao">
          {error}
        </p>
      ) : null}
    </div>
  );
}
