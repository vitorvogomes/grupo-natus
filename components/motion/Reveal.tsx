"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { armReveal } from "./armReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Atraso em segundos (para escalonar blocos irmãos). */
  delay?: number;
  /**
   * Elemento renderizado. `"li"` permite escalonar itens sem inserir um `div`
   * entre a lista e seus itens, o que quebraria a semântica de `ul`/`ol`.
   */
  as?: "div" | "li";
};

/**
 * Reveal sutil ao entrar na viewport (fade + rise), uma única vez, via
 * `armReveal`: o HTML sai visível e só o que está abaixo da tela anima.
 * Usar abaixo da dobra (nunca no elemento de LCP).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    return armReveal(el, el, {
      from: { opacity: "0", transform: "translateY(16px)" },
      // `none`, não translateY(0): transform em repouso criaria um bloco de
      // contenção para os `absolute` de dentro (ex.: o sr-only dos cards).
      to: { opacity: "1", transform: "none" },
      delay,
      margin: "0px 0px -10% 0px",
    });
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
