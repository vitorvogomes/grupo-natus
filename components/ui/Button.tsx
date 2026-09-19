import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
    "disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-px",
    // Ícones lucide dentro do botão herdam tamanho/estado.
    "[&_svg]:pointer-events-none [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-navy-900 shadow-sm hover:bg-brand-strong hover:text-white",
        secondary:
          "border border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
        ghost: "bg-transparent text-ink hover:bg-surface-muted",
        // Para superfícies escuras (ex.: hero navy) — visível sobre fundo escuro.
        outlineInverse:
          "border border-white/40 bg-transparent text-white hover:bg-white/10",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
