import { Image } from "@/components/ui/Image";
import { Reveal } from "@/components/motion/Reveal";
import { CERTIFICATIONS, CERTIFICATIONS_TAGLINE } from "./content";

/**
 * Bloco de certificações (Quem Somos e Engenharia). Os selos têm proporções
 * diferentes: a caixa de altura fixa com object-contain alinha os dois
 * textos na mesma linha de base.
 */
export function Certifications({ className }: { className?: string }) {
  return (
    <section className={className}>
      <Reveal>
        <h2 className="text-2xl font-semibold text-ink">Certificações</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">{CERTIFICATIONS_TAGLINE}</p>
      </Reveal>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {CERTIFICATIONS.map((cert, i) => (
          <Reveal key={cert.title} delay={i * 0.08}>
            <div className="flex h-full flex-col gap-5 rounded-lg border border-border bg-surface-muted p-6">
              <div className="flex h-20 items-center">
                <Image
                  src={cert.logo.src}
                  alt={cert.logo.alt}
                  width={cert.logo.width}
                  height={cert.logo.height}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-ink">{cert.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{cert.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
