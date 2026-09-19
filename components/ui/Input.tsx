import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

type InputProps = ComponentPropsWithRef<"input"> & {
  id: string;
  label: string;
  error?: string;
};

export const fieldControlClass = cn(
  "w-full rounded-md border bg-background px-3 py-2 text-sm text-ink outline-none transition-colors",
  "placeholder:text-muted-foreground",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

export function Input({
  id,
  label,
  error,
  required,
  className,
  ref,
  ...props
}: InputProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          fieldControlClass,
          error ? "border-destructive" : "border-input",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
