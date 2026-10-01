"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { DevelopmentCard } from "./DevelopmentCard";
import { cn } from "@/lib/utils";
import type { Development } from "@/types/development";

type ExploreDevelopmentsProps = {
  developments: readonly Development[];
};

const navButtonClass = cn(
  "inline-flex size-11 items-center justify-center rounded-full",
  "border border-border bg-surface text-ink shadow-sm transition-colors",
  "hover:border-brand hover:text-brand-strong",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
);

/**
 * Carrossel de saída da página do empreendimento.
 *
 * Deliberadamente mais simples que o `FeaturedDevelopments` da Home: aqui os
 * cards são todos do mesmo tamanho e as setas andam de um em um, sem modo
 * centralizado nem índice sincronizado à rolagem. Mexer naquele componente
 * para servir aos dois casos arriscaria regredir uma Home já aprovada, e os
 * dois comportamentos não são o mesmo — lá o carrossel é a atração, aqui é
 * uma porta de saída.
 */
export function ExploreDevelopments({
  developments,
}: ExploreDevelopmentsProps) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const total = developments.length;

  if (total === 0) return null;

  function goTo(next: number) {
    const target = (next + total) % total;
    setIndex(target);
    const slide = trackRef.current?.children[target] as HTMLElement | undefined;
    slide?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
  }

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Outros empreendimentos do Grupo Natus"
      className="overflow-hidden"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
        <h2 className="text-balance text-3xl font-semibold text-ink md:text-4xl">
          Explore nossos empreendimentos
        </h2>
        <p className="mt-3 max-w-prose text-ink-soft">
          Conheça as outras oportunidades do Grupo Natus em Minas Gerais e no
          Rio de Janeiro.
        </p>
      </div>

      <ul
        ref={trackRef}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {developments.map((development, i) => (
          <li
            key={development.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}`}
            className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
          >
            <DevelopmentCard development={development} />
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-8 flex max-w-[var(--container-max)] flex-wrap items-center justify-center gap-3 px-4 sm:px-6 lg:px-8">
        {total > 1 ? (
          <>
            {/* Sem `disabled` nas pontas: as setas circulam, então nenhuma
                delas chega a ser um botão morto. */}
            <button
              type="button"
              aria-label="Empreendimento anterior"
              onClick={() => goTo(index - 1)}
              className={navButtonClass}
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Próximo empreendimento"
              onClick={() => goTo(index + 1)}
              className={navButtonClass}
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </>
        ) : null}
        <Link
          href="/empreendimentos"
          className="ml-auto font-medium text-brand-strong hover:text-ink"
        >
          Ver todos →
        </Link>
      </div>
    </section>
  );
}
