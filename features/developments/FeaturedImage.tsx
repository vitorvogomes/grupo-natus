"use client";

import { useRef, useState, type PointerEvent } from "react";
import { useReducedMotion } from "motion/react";
import { ZoomIn } from "lucide-react";
import { Image } from "@/components/ui/Image";
import type { DevelopmentImage } from "@/types/development";

type FeaturedImageProps = {
  image: DevelopmentImage;
  onOpen: () => void;
};

type LensState = { x: number; y: number; w: number; h: number };

// Lupa (loupe): diâmetro da lente e fator de ampliação.
const LENS = 176;
const ZOOM = 2.2;

function clamp(value: number, max: number): number {
  return Math.max(0, Math.min(max, value));
}

export function FeaturedImage({ image, onOpen }: FeaturedImageProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [lens, setLens] = useState<LensState | null>(null);
  const reduce = useReducedMotion();

  function handleMove(event: PointerEvent<HTMLButtonElement>) {
    // Só ponteiro fino (mouse) e sem reduce-motion; toque/caneta ignoram a lupa.
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    setLens({
      x: clamp(event.clientX - rect.left, rect.width),
      y: clamp(event.clientY - rect.top, rect.height),
      w: rect.width,
      h: rect.height,
    });
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label={`Ampliar imagem: ${image.alt}`}
      onClick={onOpen}
      onPointerMove={handleMove}
      onPointerLeave={() => setLens(null)}
      className="group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-xl bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 66vw"
        className="object-cover"
      />

      <span
        className="pointer-events-none absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-navy-900/70 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
        style={lens ? { opacity: 0 } : undefined}
      >
        <ZoomIn aria-hidden="true" className="size-3.5" />
        Ampliar
      </span>

      {lens ? (
        <span
          data-testid="magnifier-lens"
          aria-hidden="true"
          className="pointer-events-none absolute z-20 rounded-full border-2 border-white/80 shadow-xl ring-1 ring-navy-900/10"
          style={{
            width: LENS,
            height: LENS,
            left: lens.x - LENS / 2,
            top: lens.y - LENS / 2,
            backgroundImage: `url("${image.src}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${lens.w * ZOOM}px ${lens.h * ZOOM}px`,
            backgroundPosition: `${LENS / 2 - lens.x * ZOOM}px ${LENS / 2 - lens.y * ZOOM}px`,
          }}
        />
      ) : null}
    </button>
  );
}
