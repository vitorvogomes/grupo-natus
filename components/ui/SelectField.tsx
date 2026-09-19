"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectFieldOption = { value: string; label: string };

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: readonly SelectFieldOption[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
};

/**
 * Select shadcn/Radix para navegação/filtros — painel estilizado com os tokens
 * de marca. (No lead form seguimos com o `<select>` nativo, ver docs/adr/0001.)
 */
export function SelectField({
  id,
  label,
  value,
  onValueChange,
  options,
  placeholder,
  className,
  triggerClassName,
}: SelectFieldProps) {
  const labelId = `${id}-label`;
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label id={labelId} className="text-xs font-medium text-ink">
        {label}
      </label>
      <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger
          id={id}
          aria-labelledby={labelId}
          className={cn(
            "group inline-flex min-w-52 items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-ink outline-none transition-colors",
            "hover:border-brand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            "data-[state=open]:border-brand",
            triggerClassName,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            className={cn(
              "z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            )}
          >
            <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1 text-muted-foreground">
              <ChevronUp aria-hidden="true" className="size-4" />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="p-1">
              {options.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-3 pr-8 text-sm text-ink outline-none",
                    "focus:bg-surface-muted data-[state=checked]:font-medium data-[state=checked]:text-brand-strong",
                  )}
                >
                  <SelectPrimitive.ItemText>
                    {opt.label}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-2 inline-flex items-center">
                    <Check aria-hidden="true" className="size-4 text-brand-strong" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1 text-muted-foreground">
              <ChevronDown aria-hidden="true" className="size-4" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}
