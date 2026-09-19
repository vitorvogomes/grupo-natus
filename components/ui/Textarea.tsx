import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";
import { fieldControlClass } from "./Input";

type TextareaProps = ComponentPropsWithRef<"textarea"> & {
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
  ref,
  ...props
}: TextareaProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <textarea
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          fieldControlClass,
          "min-h-24 resize-y",
          error ? "border-status-em-construcao" : "border-input",
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
