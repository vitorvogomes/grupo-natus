"use client";

import { useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Image } from "@/components/ui/Image";
import { cn } from "@/lib/utils";
import { GalleryLightbox } from "./GalleryLightbox";
import { coverFactor } from "./coverSizes";
import { stageFit } from "./stageFit";
import {
  DEVELOPMENT_IMAGE_KINDS,
  IMAGE_KIND_LABELS,
  type DevelopmentImage,
  type DevelopmentImageKind,
} from "@/types/development";

type GalleryProps = {
  images: readonly DevelopmentImage[];
  /**
   * Largura do palco no desktop, em CSS px, para o `sizes`. Padrão: a
   * galeria compacta inteira; meia coluna (canteiro) declara a sua.
   */
  desktopWidth?: number;
};

const tabTriggerClass = cn(
  "rounded-full px-4 py-1.5 text-sm transition-colors",
  "data-[state=inactive]:bg-surface-muted data-[state=inactive]:text-ink",
  "data-[state=inactive]:hover:bg-nude-100",
  "data-[state=active]:bg-ink data-[state=active]:text-white",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
);

/** Proporção do palco (`aspect-[16/10]`). */
const STAGE_ASPECT = 16 / 10;

/** Largura máxima do palco (`max-w-5xl`), em CSS px. */
const STAGE_MAX = 1024;

/** Abaixo disto o palco ocupa a largura da tela (sem colunas). */
const FULL_WIDTH_UP_TO = 1024;

const stageNavClass = cn(
  "absolute top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center",
  "rounded-full bg-surface/85 text-ink shadow-md backdrop-blur-sm transition-colors",
  "hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
);

/**
 * Palco + régua de miniaturas.
 *
 * A régua não rola: a miniatura ativa cresce e as demais encolhem, então o
 * acervo inteiro continua visível de uma vez — é o que torna possível julgar
 * "quanto ainda tem" sem arrastar nada. O piso de `min-w-6` existe porque a
 * referência deixa as inativas com ~10 px de largura, abaixo do alvo mínimo de
 * 24x24 (WCAG 2.5.8); abaixo de ~360 px nem esse piso cabe e o `overflow-x`
 * entra como rede, em vez de espremer os alvos.
 */
function GalleryStage({
  list,
  onOpen,
  desktopWidth,
}: {
  list: readonly DevelopmentImage[];
  onOpen: (index: number) => void;
  desktopWidth: number;
}) {
  const [index, setIndex] = useState(0);
  const railRef = useRef<HTMLUListElement>(null);
  const total = list.length;
  const current = list[Math.min(index, total - 1)];
  const many = total > 1;

  if (!current) return null;
  const fit = stageFit(current, STAGE_ASPECT);
  // Em contain a foto cabe na largura do palco; em cover, pede a sobra do corte.
  const factor = fit === "contain" ? 1 : coverFactor(current, STAGE_ASPECT);

  function go(delta: number) {
    setIndex((i) => (i + delta + total) % total);
  }

  /** Move o foco junto com a seleção — o item ativo é o único tabulável. */
  function focusThumb(position: number) {
    const el = railRef.current?.children[position]?.querySelector("button");
    el?.focus();
  }

  /**
   * A régua é um widget composto: 12 miniaturas davam 12 paradas de Tab antes
   * da próxima seção (e a página de engenharia tem três réguas). Roving
   * tabindex + setas deixa o conjunto com uma parada só, como manda a APG.
   */
  function onRailKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const passos: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    const passo = passos[event.key];
    let alvo: number | null = null;
    if (passo !== undefined) alvo = (index + passo + total) % total;
    else if (event.key === "Home") alvo = 0;
    else if (event.key === "End") alvo = total - 1;
    if (alvo === null) return;
    event.preventDefault();
    setIndex(alvo);
    focusThumb(alvo);
  }

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-muted">
        <button
          type="button"
          aria-label={`Ampliar imagem: ${current.alt}`}
          onClick={() => onOpen(index)}
          className="group absolute inset-0 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
        >
          {fit === "contain" ? (
            // A foto inteira sobre ela mesma desfocada: sem faixas vazias e
            // sem o zoom do cover. A miniatura de 64px basta para um blur.
            <span aria-hidden="true" className="absolute inset-0">
              <Image
                src={current.src}
                alt=""
                fill
                sizes="64px"
                className="scale-110 object-cover opacity-70 blur-2xl"
              />
            </span>
          ) : null}
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes={`(max-width: ${FULL_WIDTH_UP_TO}px) ${Math.round(100 * factor)}vw, ${Math.round(desktopWidth * factor)}px`}
            // 90 (e não o 75 padrão): o palco mostra a foto quase no tamanho
            // da fonte, e renders pequenos não têm margem para mais perda.
            quality={90}
            className={fit === "contain" ? "object-contain" : "object-cover"}
          />
          <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-navy-900/70 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <ZoomIn aria-hidden="true" className="size-3.5" />
            Ampliar
          </span>
        </button>

        {many ? (
          <>
            <button
              type="button"
              aria-label="Imagem anterior"
              onClick={() => go(-1)}
              className={cn(stageNavClass, "left-3")}
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Próxima imagem"
              onClick={() => go(1)}
              className={cn(stageNavClass, "right-3")}
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
            <p
              aria-live="polite"
              className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-navy-900/70 px-3 py-1 text-xs font-medium tabular-nums text-white backdrop-blur-sm"
            >
              {index + 1} / {total}
            </p>
          </>
        ) : null}
      </div>

      {many ? (
        <ul
          ref={railRef}
          aria-label="Miniaturas da galeria"
          onKeyDown={onRailKeyDown}
          className="mt-3 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {list.map((img, i) => (
            <li
              key={img.src}
              className={cn(
                "h-16 min-w-6 basis-0 transition-[flex-grow] duration-300 ease-out sm:h-20",
                i === index ? "grow-[4]" : "grow",
              )}
            >
              <button
                type="button"
                aria-label={`Ver imagem: ${img.alt}`}
                aria-current={i === index ? "true" : undefined}
                tabIndex={i === index ? 0 : -1}
                onClick={() => setIndex(i)}
                className={cn(
                  "relative block size-full overflow-hidden rounded-md bg-surface-muted transition-opacity",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  i === index
                    ? "ring-2 ring-brand-strong ring-offset-2 ring-offset-surface"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 33vw, 240px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function Gallery({ images, desktopWidth = STAGE_MAX }: GalleryProps) {
  // Ordem canônica das abas (DEVELOPMENT_IMAGE_KINDS), não a de aparição no
  // dado: senão reordenar o array de imagens reordenaria as abas da página.
  const kinds = useMemo(
    () => DEVELOPMENT_IMAGE_KINDS.filter((k) => images.some((i) => i.kind === k)),
    [images],
  );
  const [chosen, setChosen] = useState<DevelopmentImageKind | undefined>(
    kinds[0],
  );
  const [lightbox, setLightbox] = useState<number | null>(null);

  /**
   * A aba escolhida só vale se existir no acervo atual.
   *
   * O App Router reaproveita a instância ao navegar entre dois `[slug]` — e o
   * carrossel "Explore nossos empreendimentos" faz exatamente isso. Sem este
   * guarda, sair de um empreendimento com a aba "Plantas" aberta para outro
   * que não tem plantas deixava a galeria inteira em branco.
   */
  const kind = chosen && kinds.includes(chosen) ? chosen : kinds[0];

  const tabbed = kinds.length > 1;
  const active = tabbed ? images.filter((i) => i.kind === kind) : images;

  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl bg-surface-muted text-muted-foreground">
        Imagens em breve
      </div>
    );
  }

  return (
    // Galeria compacta (1024px) em todo o site, abas incluídas: renders de
    // ~1500–2100 px chegam ao palco com densidade ≥ 1,5× em vez de serem
    // ampliados até a borda do container.
    <div className="mx-auto max-w-5xl">
      {tabbed ? (
        <TabsPrimitive.Root
          value={kind}
          onValueChange={(v) => {
            setChosen(v as DevelopmentImageKind);
          }}
        >
          <TabsPrimitive.List
            aria-label="Categorias de imagens"
            className="mb-4 flex flex-wrap gap-2"
          >
            {kinds.map((k) => (
              <TabsPrimitive.Trigger
                key={k}
                value={k}
                className={tabTriggerClass}
              >
                {IMAGE_KIND_LABELS[k]}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>
          {/* Radix desmonta a aba inativa, então existe um palco por vez e o
              índice volta a zero ao trocar de categoria — que é o esperado. */}
          {kinds.map((k) => (
            <TabsPrimitive.Content key={k} value={k}>
              <GalleryStage
                list={images.filter((i) => i.kind === k)}
                onOpen={setLightbox}
                desktopWidth={desktopWidth}
              />
            </TabsPrimitive.Content>
          ))}
        </TabsPrimitive.Root>
      ) : (
        <GalleryStage list={images} onOpen={setLightbox} desktopWidth={desktopWidth} />
      )}

      <GalleryLightbox
        images={active}
        index={lightbox}
        onOpenChange={(open) => {
          if (!open) setLightbox(null);
        }}
        onIndexChange={setLightbox}
      />
    </div>
  );
}
