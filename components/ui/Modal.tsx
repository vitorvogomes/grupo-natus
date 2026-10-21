"use client";

import { useRef, type ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  // Controlado por estado, o Modal não tem `Dialog.Trigger`, e o Radix só
  // devolve o foco ao trigger. Então ele lembra quem estava focado ao abrir e
  // volta para lá ao fechar (WCAG 2.4.3), se o elemento ainda existir.
  const returnFocusTo = useRef<HTMLElement | null>(null);
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          data-testid="modal-overlay"
          className={cn(
            "fixed inset-0 z-50 bg-navy-900/50",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          )}
        />
        <DialogPrimitive.Content
          onOpenAutoFocus={() => {
            returnFocusTo.current =
              document.activeElement instanceof HTMLElement ? document.activeElement : null;
          }}
          onCloseAutoFocus={(event) => {
            if (returnFocusTo.current?.isConnected) {
              event.preventDefault();
              returnFocusTo.current.focus();
            }
          }}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
            "rounded-lg bg-surface p-6 shadow-xl",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className,
          )}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <DialogPrimitive.Title className="text-xl font-semibold text-ink">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Fechar"
              className="inline-flex size-8 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-surface-muted"
            >
              <X aria-hidden="true" className="size-5" />
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
