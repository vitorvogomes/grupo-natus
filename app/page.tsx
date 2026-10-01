import { Hero } from "@/features/home/Hero";
import { FeaturedDevelopments } from "@/features/home/FeaturedDevelopments";
import { MinhaCasaMinhaVida } from "@/features/mcmv/MinhaCasaMinhaVida";
import { AboutNatus } from "@/features/home/AboutNatus";
import { DevelopmentSearchBar } from "@/features/developments/DevelopmentSearchBar";
import { Reveal } from "@/components/motion/Reveal";
import {
  getAllDevelopments,
  getHomeDevelopments,
} from "@/content/developments";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Alvo da seta do hero; a busca é a primeira coisa depois da dobra.
          `scroll-mt-20` desconta o header, que na Home é `fixed` e cobriria o
          topo da seção ao saltar para a âncora. */}
      <section
        id="buscar"
        className="scroll-mt-20 bg-surface-muted py-10 sm:py-12"
      >
        <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
          <DevelopmentSearchBar developments={getAllDevelopments()} />
        </div>
      </section>

      <Reveal>
        <FeaturedDevelopments developments={getHomeDevelopments()} />
      </Reveal>
      {/* Sem Reveal aqui: estas duas seções animam por dentro (painel e cards
          em cascata), e um fade por cima duplicaria o movimento. */}
      <MinhaCasaMinhaVida />
      <AboutNatus />
    </main>
  );
}
