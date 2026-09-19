import { Hero } from "@/features/home/Hero";
import { InstitutionalIntro } from "@/features/home/InstitutionalIntro";
import { DevelopmentGrid } from "@/features/developments/DevelopmentGrid";
import { Reveal } from "@/components/motion/Reveal";
import { getAllDevelopments } from "@/content/developments";

export default function Home() {
  const developments = getAllDevelopments();
  return (
    <main>
      <Hero />
      <Reveal>
        <InstitutionalIntro />
      </Reveal>
      <Reveal>
        <section
          id="empreendimentos"
          className="mx-auto max-w-[var(--container-max)] px-4 pb-20 sm:px-6 lg:px-8"
        >
          <h2 className="mb-8 text-3xl font-semibold text-ink">
            Empreendimentos
          </h2>
          <DevelopmentGrid developments={developments} />
        </section>
      </Reveal>
    </main>
  );
}
