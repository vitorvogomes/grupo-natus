/**
 * Mecânica comum aos carrosséis de empreendimentos (Home e "explore").
 *
 * Rola o próprio trilho com `scrollTo`, nunca com `scrollIntoView`: este
 * último rola TODOS os ancestrais roláveis para trazer o slide à vista —
 * inclusive o documento — e, nos últimos cards (que não chegam à borda
 * esquerda), desloca a página na horizontal.
 */

/** Largura dos slides: 1 com o vizinho espiando, 2 no tablet, 3 no desktop. */
export const CAROUSEL_SLIDE_CLASS =
  // Os cálculos descontam o gap-6 (1.5rem) para 2 e 3 fecharem exatos.
  "w-[82%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]";

/**
 * Trilho: scroll nativo com snap e sem barra visível.
 *
 * `relative` é obrigatório: o overflow do trilho só recorta descendentes
 * `absolute` cujo bloco de contenção esteja dentro dele. Sem isso, um
 * `sr-only` de card (absolute, 1px) se ancora num ancestral transformado (o
 * `Reveal`) e, nos cards fora da tela, alarga o documento.
 */
export const CAROUSEL_TRACK_CLASS =
  "relative flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export function scrollTrackTo(
  track: HTMLElement | null,
  index: number,
  smooth: boolean,
): void {
  const slide = track?.children[index] as HTMLElement | undefined;
  const first = track?.firstElementChild as HTMLElement | null | undefined;
  if (!track || !slide || !first) return;
  // offsetLeft é relativo ao ancestral posicionado; subtrair o do primeiro
  // slide dá a posição dentro do trilho, seja qual for o layout em volta.
  track.scrollTo({
    left: slide.offsetLeft - first.offsetLeft,
    behavior: smooth ? "smooth" : "auto",
  });
}

/**
 * Com vários cards na tela, os últimos nunca chegam à borda esquerda: no fim
 * do trilho, avançar o índice não moveria nada. "Fim" = o último card na
 * tela, com até meio gap (12 px) de folga: o snap para no início de um card
 * e pode deixar o último alguns px cortado (medido: 7 px no desktop). Sem
 * overflow (poucos cards) não há fim; sem layout (jsdom), cai nas métricas
 * de rolagem.
 */
/** Meio gap-6 (1.5rem = 24 px). */
const END_TOLERANCE_PX = 12;

export function isTrackAtEnd(track: HTMLElement | null): boolean {
  if (!track || track.scrollWidth <= track.clientWidth) return false;
  const last = track.lastElementChild as HTMLElement | null;
  const lastBox = last?.getBoundingClientRect();
  if (lastBox && lastBox.width > 0) {
    return (
      lastBox.right <= track.getBoundingClientRect().right + END_TOLERANCE_PX
    );
  }
  return track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
}

/**
 * O slide mais perto da borda esquerda do trilho. As distâncias saem de
 * `getBoundingClientRect` (viewport), não de `offsetLeft`: um padding no
 * container daria viés constante e elegeria o slide errado.
 */
export function leftmostIndex(track: HTMLElement): number {
  const start = track.getBoundingClientRect().left;
  let closest = 0;
  let shortest = Infinity;
  for (let i = 0; i < track.children.length; i += 1) {
    const box = (track.children[i] as HTMLElement).getBoundingClientRect();
    const distance = Math.abs(box.left - start);
    if (distance < shortest) {
      shortest = distance;
      closest = i;
    }
  }
  return closest;
}

/**
 * Índice que o contador deve mostrar: o slide na borda esquerda — ou, no fim
 * do trilho, o último, que está na tela mas nunca chega à borda.
 */
export function visibleIndex(track: HTMLElement): number {
  return isTrackAtEnd(track) ? track.children.length - 1 : leftmostIndex(track);
}

/**
 * Destino da seta "anterior". No fim do trilho o índice pode estar à frente
 * da borda (ver `visibleIndex`); decrementá-lo daria cliques que não movem
 * nada, então recua a partir do slide que está de fato na borda.
 */
export function prevIndex(
  track: HTMLElement | null,
  index: number,
  total: number,
): number {
  const from = track && isTrackAtEnd(track) ? leftmostIndex(track) : index;
  return (from - 1 + total) % total;
}
