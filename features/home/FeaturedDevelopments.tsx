"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { DevelopmentCard } from "@/features/developments/DevelopmentCard";
import {
  CAROUSEL_SLIDE_CLASS,
  CAROUSEL_TRACK_CLASS,
  isTrackAtEnd,
  prevIndex,
  scrollTrackTo,
  visibleIndex,
} from "@/features/developments/carouselTrack";
import { cn } from "@/lib/utils";
import type { Development } from "@/types/development";

type FeaturedDevelopmentsProps = {
  developments: readonly Development[];
};

const navButtonClass = cn(
  "inline-flex size-11 items-center justify-center rounded-full",
  "border border-border bg-surface text-ink shadow-sm transition-colors",
  "hover:border-brand hover:text-brand-strong",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
);

/**
 * Carrossel do catálogo na Home: 3 cards por vez no desktop (2 no tablet, 1
 * com o vizinho espiando no celular), alinhados pelo início — ref. Novolar.
 *
 * O trilho é scroll nativo com snap — swipe e teclado saem de graça do
 * browser — e o índice (o card na borda esquerda) acompanha a rolagem em vez
 * de comandá-la sozinho, para que arrastar com o dedo também conte. Por isso
 * as setas nunca ficam `disabled`: elas circulam, e um limite calculado a
 * partir de um índice que pode estar defasado mentiria para o usuário.
 */
export function FeaturedDevelopments({
  developments,
}: FeaturedDevelopmentsProps) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);
  /** Rolagem disparada por nós: enquanto dura, o scroll não manda no índice. */
  const steering = useRef(false);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();
  const total = developments.length;
  const many = total > 1;

  /** No fim do trilho, "próximo" volta ao início (ver `isTrackAtEnd`). */
  function next() {
    goTo(isTrackAtEnd(trackRef.current) ? 0 : index + 1);
  }

  function goTo(next: number) {
    const target = (next + total) % total;
    setIndex(target);
    // Sem esta trava, os eventos de scroll da própria animação reescreveriam o
    // índice e cliques rápidos em sequência avançariam um só slide.
    steering.current = true;
    if (settle.current) clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      steering.current = false;
    }, 600);
    scrollTrackTo(trackRef.current, target, !reduce);
  }

  /** O índice acompanha a rolagem (swipe), exceto durante a nossa. */
  function syncIndexToScroll() {
    const track = trackRef.current;
    if (!track || steering.current) return;
    setIndex(visibleIndex(track));
  }

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Empreendimentos do Grupo Natus"
      className="py-20"
    >
      <div className="mx-auto mb-10 flex max-w-[var(--container-max)] flex-wrap items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-strong">
            Portfólio
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-ink md:text-4xl">
            Nossos empreendimentos
          </h2>
        </div>

        {many ? (
          <div className="flex items-center gap-3">
            <p className="mr-1 text-sm tabular-nums text-muted-foreground">
              <span className="font-semibold text-ink">{index + 1}</span> /{" "}
              {total}
            </p>
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
              onClick={next}
              className={navButtonClass}
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        ) : null}
      </div>

      {/* O trilho vive dentro do container da página: "3 por vez" é 3 na
          largura do conteúdo, alinhados ao título — não 3 de ponta a ponta. */}
      <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
        <ul
          ref={trackRef}
          onScroll={syncIndexToScroll}
          className={cn(CAROUSEL_TRACK_CLASS, "pb-6")}
        >
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

      <div className="mx-auto mt-6 flex max-w-[var(--container-max)] flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {many ? (
          <ul className="flex flex-wrap">
            {developments.map((development, i) => (
              <li key={development.slug}>
                {/* A barra é o traço visível; o botão a envolve com padding
                    para chegar aos 24x24 mínimos (WCAG 2.5.8) sem engordar o
                    desenho. */}
                <button
                  type="button"
                  aria-label={`Ir para o empreendimento ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => goTo(i)}
                  className="group/dot flex size-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span
                    className={cn(
                      "h-2 rounded-full transition-[width,background-color] duration-200",
                      i === index
                        ? "w-8 bg-brand-strong"
                        : "w-2 bg-border group-hover/dot:bg-brand",
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <Link
          href="/empreendimentos"
          className="ml-auto font-medium text-brand-strong hover:text-ink"
        >
          Ver todos os empreendimentos →
        </Link>
      </div>
    </section>
  );
}
