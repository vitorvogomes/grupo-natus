"use client";

import { useRef, useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ZoomIn } from "lucide-react";
import { Image } from "@/components/ui/Image";
import type { DevelopmentImage } from "@/types/development";

type FeaturedImageProps = {
  image: DevelopmentImage;
  onOpen: () => void;
};

// Hover-zoom (estilo 21st.dev): ao passar o mouse a imagem amplia e "panora"
// seguindo o cursor (transform-origin no ponto sob o mouse). Só ponteiro fino
// e respeitando prefers-reduced-motion.
const ZOOM = 1.9;

export function FeaturedImage({ image, onOpen }: FeaturedImageProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [zooming, setZooming] = useState(false);
  const reduce = useReducedMotion();

  function isMouse(event: PointerEvent<HTMLButtonElement>) {
    return !reduce && event.pointerType === "mouse";
  }

  function handleMove(event: PointerEvent<HTMLButtonElement>) {
    if (!isMouse(event) || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    setOrigin({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label={`Ampliar imagem: ${image.alt}`}
      onClick={onOpen}
      onPointerEnter={(event) => {
        if (isMouse(event)) setZooming(true);
      }}
      onPointerMove={handleMove}
      onPointerLeave={() => setZooming(false)}
      className="group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-lg bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <motion.div
        data-zoom={zooming ? "on" : "off"}
        className="absolute inset-0"
        style={{ transformOrigin: `${origin.x}% ${origin.y}%` }}
        animate={{ scale: zooming ? ZOOM : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />
      </motion.div>

      <span className="pointer-events-none absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-navy-900/70 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <ZoomIn aria-hidden="true" className="size-3.5" />
        Ampliar
      </span>
    </button>
  );
}
