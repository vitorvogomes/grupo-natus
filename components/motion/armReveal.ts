import { inView } from "motion";
import { animate } from "motion/mini";

/**
 * Ease de marca, espelho de `--ease-brand` (styles/theme.css). O WAAPI não lê
 * variável CSS no `easing`; um teste garante que os dois não divergem.
 */
export const BRAND_EASE = [0.22, 1, 0.36, 1] as const;

type RevealStyle = Partial<Record<"opacity" | "transform", string>>;

type ArmRevealOptions = {
  /** Estilos de partida, aplicados só se o elemento ainda estiver abaixo da tela. */
  from: RevealStyle;
  /** Estado final — o mesmo que o servidor entrega. */
  to: RevealStyle;
  delay?: number;
  duration?: number;
} & Pick<NonNullable<Parameters<typeof inView>[2]>, "margin" | "amount">;

type Job = {
  el: HTMLElement;
  trigger: Element;
  options: ArmRevealOptions;
  cancelled: boolean;
  stop?: () => void;
};

let queue: Job[] = [];

/**
 * Um lote por commit: grava o estado final de todos, mede todos e só então
 * esconde os que estão abaixo da tela. Intercalar leitura e escrita por
 * elemento forçaria um recálculo de estilo a cada reveal da página.
 */
function flush() {
  const jobs = queue.filter((job) => !job.cancelled);
  queue = [];
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  for (const job of jobs) Object.assign(job.el.style, job.options.to);
  const below = jobs.filter(
    (job) => job.trigger.getBoundingClientRect().top >= window.innerHeight,
  );
  for (const job of below) {
    const { from, to, delay = 0, duration = 0.5, margin, amount } = job.options;
    Object.assign(job.el.style, from);
    let animation: { stop: () => void } | undefined;
    const stopObserving = inView(
      job.trigger,
      () => {
        animation = animate(job.el, to, { duration, delay, ease: BRAND_EASE });
      },
      { margin, amount },
    );
    job.stop = () => {
      stopObserving();
      animation?.stop();
    };
  }
}

/**
 * Reveal ao rolar que não depende do JS para mostrar o conteúdo.
 *
 * O servidor entrega o elemento no estado final, visível. Quando o JS chega,
 * só o que ainda está abaixo da tela volta ao estado inicial e anima ao
 * entrar na viewport; o que a pessoa já vê fica onde está. Chamar num
 * `useLayoutEffect`: o lote roda numa microtask, antes da pintura.
 *
 * A limpeza para observador e animação e devolve o estado final — um
 * elemento nunca fica escondido ou parado no meio.
 */
export function armReveal(
  el: HTMLElement,
  trigger: Element,
  options: ArmRevealOptions,
): () => void {
  const job: Job = { el, trigger, options, cancelled: false };
  if (queue.length === 0) queueMicrotask(flush);
  queue.push(job);
  return () => {
    job.cancelled = true;
    job.stop?.();
    Object.assign(el.style, options.to);
  };
}
