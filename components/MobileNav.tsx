"use client";

import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Navegação mobile como Sheet (Radix Dialog lateral). Acessível: trigger com
 * aria-expanded, diálogo modal com foco preso, fecha por Escape/overlay/link.
 */
export function MobileNav() {
  return (
    <div className="lg:hidden">
      <DialogPrimitive.Root>
        <DialogPrimitive.Trigger
          aria-label="Abrir menu"
          className="inline-flex size-10 items-center justify-center rounded-md text-ink"
        >
          <Menu aria-hidden="true" className="size-5" />
        </DialogPrimitive.Trigger>

        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            data-testid="mobile-nav-overlay"
            className={cn(
              "fixed inset-0 z-50 bg-navy-900/40",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
            )}
          />
          <DialogPrimitive.Content
            className={cn(
              "fixed inset-y-0 right-0 z-50 w-72 max-w-[85vw] bg-surface p-6 shadow-xl",
              "data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
              "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right",
            )}
          >
            <DialogPrimitive.Title className="sr-only">
              Menu de navegação
            </DialogPrimitive.Title>
            <div className="mb-6 flex justify-end">
              <DialogPrimitive.Close
                aria-label="Fechar menu"
                className="inline-flex size-9 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-surface-muted"
              >
                <X aria-hidden="true" className="size-5" />
              </DialogPrimitive.Close>
            </div>
            <nav aria-label="Navegação mobile">
              <ul className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <DialogPrimitive.Close asChild>
                      <Link href={link.href} className="block text-lg text-ink">
                        {link.label}
                      </Link>
                    </DialogPrimitive.Close>
                  </li>
                ))}
              </ul>
            </nav>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}
