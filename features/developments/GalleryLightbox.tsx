"use client";

import type { KeyboardEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Image } from "@/components/ui/Image";
import { cn } from "@/lib/utils";
import type { DevelopmentImage } from "@/types/development";

type GalleryLightboxProps = {
  images: readonly DevelopmentImage[];
  /** Índice ativo (na lista `images`); `null` = fechado. */
  index: number | null;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
};

const navButtonClass = cn(
  "absolute top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center",
  "rounded-full bg-surface/90 text-ink shadow-md transition-colors hover:bg-surface",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
);

export function GalleryLightbox({
  images,
  index,
  onOpenChange,
  onIndexChange,
}: GalleryLightboxProps) {
  const open = index !== null;
  const current = open ? images[index] : null;
  const many = images.length > 1;

  function go(delta: number) {
    if (index === null) return;
    onIndexChange((index + delta + images.length) % images.length);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-navy-900/80 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          )}
        />
        <DialogPrimitive.Content
          onKeyDown={onKeyDown}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            {current ? `Imagem ampliada: ${current.alt}` : "Imagem ampliada"}
          </DialogPrimitive.Title>

          {current ? (
            <div className="relative h-full max-h-[85vh] w-full max-w-5xl">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          ) : null}

          {many ? (
            <>
              <button
                type="button"
                aria-label="Imagem anterior"
                onClick={() => go(-1)}
                className={cn(navButtonClass, "left-4")}
              >
                <ChevronLeft aria-hidden="true" className="size-6" />
              </button>
              <button
                type="button"
                aria-label="Próxima imagem"
                onClick={() => go(1)}
                className={cn(navButtonClass, "right-4")}
              >
                <ChevronRight aria-hidden="true" className="size-6" />
              </button>
            </>
          ) : null}

          <DialogPrimitive.Close
            aria-label="Fechar"
            className={cn(
              "absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center",
              "rounded-full bg-surface/90 text-ink shadow-md transition-colors hover:bg-surface",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
            )}
          >
            <X aria-hidden="true" className="size-6" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
