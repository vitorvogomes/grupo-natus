import { ChevronDown } from "lucide-react";
import { Image } from "@/components/ui/Image";

/**
 * Hero da Home: imagem em tela cheia, sem texto sobreposto.
 *
 * A altura é explícita porque a `<Image fill>` é absoluta e não gera altura —
 * sem ela a seção colapsaria. `svh` (e não `vh`) evita o salto quando a barra
 * do navegador móvel se recolhe. 84svh (e não a tela inteira) deixa a borda da
 * busca assomar na dobra: sem isso a Home parece ter só a imagem.
 * É o elemento de LCP: sem `Reveal`, sem animação de entrada, com `preload`.
 */
export function Hero() {
  return (
    <section className="relative isolate h-[84svh] min-h-[460px] w-full overflow-hidden bg-navy-700">
      <h1 className="sr-only">
        Grupo Natus — incorporação e engenharia em Minas Gerais e no Rio de
        Janeiro
      </h1>

      <Image
        src="/home/hero.webp"
        alt="Fachada noturna de empreendimento do Grupo Natus, com entrada iluminada"
        fill
        preload
        sizes="100vw"
        // Render retrato num hero em paisagem: fixa a faixa visível na
        // entrada, não no meio da fachada.
        className="object-cover object-[center_75%]"
      />

      {/* Escurece topo e base o suficiente para o header e a seta lerem sobre
          qualquer imagem, deixando o miolo limpo. */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/45 via-transparent to-navy-900/40" />

      <a
        href="#buscar"
        aria-label="Ir para a busca de empreendimentos"
        className="absolute inset-x-0 bottom-10 z-10 mx-auto flex size-12 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ChevronDown aria-hidden="true" className="size-7 animate-bounce" />
      </a>
    </section>
  );
}
