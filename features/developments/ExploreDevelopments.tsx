"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { DevelopmentCard } from "./DevelopmentCard";
import {
  CAROUSEL_SLIDE_CLASS,
  CAROUSEL_TRACK_CLASS,
  isTrackAtEnd,
  prevIndex,
  scrollTrackTo,
} from "./carouselTrack";
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
 * Mesma geometria do `FeaturedDevelopments` da Home (3 por vez no desktop),
 * mas deliberadamente mais simples: sem contador, indicadores nem índice
 * sincronizado à rolagem. Lá o carrossel é a atração; aqui é uma porta de
 * saída, e os controles extras só competiriam com o CTA da página.
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
    scrollTrackTo(trackRef.current, target, !reduce);
  }

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Outros empreendimentos do Grupo Natus"
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

      {/* Dentro do container, como na Home: de ponta a ponta, 31% de uma
          tela larga dava cards enormes e colava o primeiro na borda. */}
      <div className="mx-auto mt-10 max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
        <ul ref={trackRef} className={cn(CAROUSEL_TRACK_CLASS, "pb-4")}>
          {developments.map((development, i) => (
            <li
              key={development.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${total}`}
              className={CAROUSEL_SLIDE_CLASS}
            >
              <DevelopmentCard development={development} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-8 flex max-w-[var(--container-max)] flex-wrap items-center justify-center gap-3 px-4 sm:px-6 lg:px-8">
        {total > 1 ? (
          <>
            {/* Sem `disabled` nas pontas: as setas circulam, então nenhuma
                delas chega a ser um botão morto. */}
            <button
              type="button"
              aria-label="Empreendimento anterior"
              onClick={() => goTo(prevIndex(trackRef.current, index, total))}
              className={navButtonClass}
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Próximo empreendimento"
              onClick={() =>
                goTo(isTrackAtEnd(trackRef.current) ? 0 : index + 1)
              }
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
