"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Atraso em segundos (para escalonar blocos irmãos). */
  delay?: number;
};

/**
 * Reveal sutil ao entrar na viewport (fade + rise), uma única vez.
 * Só transform/opacity (GPU); ease de marca; respeita prefers-reduced-motion
 * (renderiza estático, conteúdo visível — protege CWV e no-JS). Usar apenas
 * em conteúdo abaixo da dobra (nunca no elemento de LCP).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, transform: "translateY(16px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
