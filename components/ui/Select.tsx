import type { SelectHTMLAttributes } from "react";
import { cx } from "@/lib/cx";

export type SelectOption = { value: string; label: string };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  options: readonly SelectOption[];
  error?: string;
  placeholder?: string;
};

export function Select({
  id,
  label,
  options,
  error,
  required,
  placeholder,
  className,
  ...props
}: SelectProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cx(
          "rounded-md border bg-surface px-3 py-2 text-ink outline-none focus-visible:ring-2 focus-visible:ring-brand",
          error ? "border-status-em-construcao" : "border-border",
          className,
        )}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-status-em-construcao">
          {error}
        </p>
      ) : null}
    </div>
  );
}
