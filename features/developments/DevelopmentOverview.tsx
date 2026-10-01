import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Image } from "@/components/ui/Image";
import { pickHeroImage } from "./pickHeroImage";
import type { Development } from "@/types/development";

type DevelopmentOverviewProps = {
  development: Development;
};

/** Placeholder rotulado nunca vai para a tela (regra do projeto). */
function isTodo(text: string): boolean {
  return text.trim().toUpperCase().startsWith("TODO");
}

export function DevelopmentOverview({ development }: DevelopmentOverviewProps) {
  // A capa já abriu a página no hero; aqui entra a segunda melhor imagem para
  // não repetir a mesma fachada duas vezes em meia tela de rolagem.
  const image = development.images[1] ?? pickHeroImage(development.images);
  const paragraphs = isTodo(development.description)
    ? [development.summary]
    : development.description.split("\n").filter((line) => line.trim());

  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-muted">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Imagem em breve
          </div>
        )}
      </div>

      <div>
        <Badge status={development.status} />
        {/* Não repete o nome: o hero logo acima já o anuncia como <h1>, e dois
            cabeçalhos seguidos com o mesmo texto só poluem o outline. O rótulo
            espelha a âncora "Empreendimento" da sub-nav. */}
        <h2 className="mt-4 text-balance text-3xl font-semibold text-ink md:text-4xl">
          O empreendimento
        </h2>
        <p className="mt-2 inline-flex items-center gap-1.5 text-ink-soft">
          <MapPin aria-hidden="true" className="size-4 shrink-0" />
          {development.location.address
            ? `${development.location.address} — `
            : null}
          {development.location.city}/{development.location.state}
        </p>

        {/* Texto corrido, sem check: os itens não são uma lista de conferência,
            são a descrição do produto. A lista com ícone está no accordion. */}
        <div className="mt-6 flex flex-col gap-3 text-ink-soft">
          {paragraphs.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
