"use client";

import { ArrowUp } from "lucide-react";

/** Botão "voltar ao topo". Usa scroll-behavior global (smooth / auto no reduced-motion). */
export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      className="inline-flex items-center gap-1.5 text-sm text-navy-100 transition-colors hover:text-brand"
    >
      <ArrowUp aria-hidden="true" className="size-4" />
      Voltar ao topo
    </button>
  );
}
