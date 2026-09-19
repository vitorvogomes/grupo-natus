import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";
import { fieldControlClass } from "./Input";

export type SelectOption = { value: string; label: string };

type SelectProps = ComponentPropsWithRef<"select"> & {
  id: string;
  label: string;
  options: readonly SelectOption[];
  error?: string;
  placeholder?: string;
};

// Select nativo (robusto em mobile/no-JS e no lead form) estilizado com os
// tokens shadcn — decisão em docs/adr/0001 / plano de modernização.
export function Select({
  id,
  label,
  options,
  error,
  required,
  placeholder,
  className,
  ref,
  ...props
}: SelectProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <select
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          fieldControlClass,
          "appearance-none bg-background",
          error ? "border-status-em-construcao" : "border-input",
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
