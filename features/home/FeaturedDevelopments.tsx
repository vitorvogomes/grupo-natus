"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { DevelopmentCard } from "@/features/developments/DevelopmentCard";
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
 * Carrossel do catálogo na Home, em modo centralizado: o slide ativo fica no
 * meio e em tamanho cheio, os vizinhos espiam reduzidos dos dois lados.
 *
 * O trilho é scroll nativo com snap — swipe e teclado saem de graça do
 * browser — e o índice acompanha a rolagem em vez de comandá-la sozinho, para
 * que arrastar com o dedo também mude quem está em destaque. Por isso as setas
 * nunca ficam `disabled`: elas circulam, e um limite calculado a partir de um
 * índice que pode estar defasado mentiria para o usuário.
 *
 * As margens percentuais do primeiro e do último slide são o que permite que
 * as pontas cheguem ao centro (padding no container de scroll é tratado de
 * forma inconsistente entre browsers).
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

  function slideAt(position: number): HTMLElement | undefined {
    return trackRef.current?.children[position] as HTMLElement | undefined;
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
    slideAt(target)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  /**
   * Quem estiver mais perto do centro do trilho é o slide ativo.
   * As distâncias saem de `getBoundingClientRect`, que mede na viewport: usar
   * `offsetLeft` daria a posição relativa ao ancestral posicionado e só
   * coincidiria enquanto o trilho começasse em x=0 — um padding no container
   * introduziria um viés constante e elegeria o slide errado.
   */
  function syncIndexToScroll() {
    const track = trackRef.current;
    if (!track || steering.current) return;
    const trackBox = track.getBoundingClientRect();
    const center = trackBox.left + trackBox.width / 2;
    let closest = 0;
    let shortest = Infinity;
    for (let i = 0; i < track.children.length; i += 1) {
      const box = (track.children[i] as HTMLElement).getBoundingClientRect();
      const distance = Math.abs(box.left + box.width / 2 - center);
      if (distance < shortest) {
        shortest = distance;
        closest = i;
      }
    }
    setIndex(closest);
  }

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Empreendimentos do Grupo Natus"
      className="overflow-hidden py-20"
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
          </div>
        ) : null}
      </div>

      <ul
        ref={trackRef}
        onScroll={syncIndexToScroll}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {developments.map((development, i) => (
          <li
            key={development.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}`}
            className={cn(
              "shrink-0 snap-center",
              "transition-[transform,opacity] duration-300 ease-out",
              // Largura < 50% garante vizinhos espiando dos dois lados; a
              // margem das pontas é metade do espaço restante, para que o
              // primeiro e o último também consigam centralizar.
              "w-[82%] first:ml-[9%] last:mr-[9%]",
              "sm:w-[56%] sm:first:ml-[22%] sm:last:mr-[22%]",
              "lg:w-[40%] lg:first:ml-[30%] lg:last:mr-[30%]",
              i === index
                ? "opacity-100"
                : "scale-[0.92] opacity-55 hover:opacity-80",
            )}
          >
            <DevelopmentCard development={development} />
          </li>
        ))}
      </ul>

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
                      "h-2 rounded-full transition-all",
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
