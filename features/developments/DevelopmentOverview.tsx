import { Image } from "@/components/ui/Image";
import { DevelopmentBadges } from "./DevelopmentBadges";
import { coverSizes } from "./coverSizes";
import { formatLocality } from "./locality";
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
            // Bloco 4:3 com object-cover: foto mais larga pede largura extra
            // para cobrir a altura (ver coverSizes).
            sizes={coverSizes(image, [
              { upTo: 768, vw: 100, aspect: 4 / 3 },
              { vw: 50, aspect: 4 / 3 },
            ])}
            quality={90}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Imagem em breve
          </div>
        )}
      </div>

      <div>
        {/* "100% vendido" fica só no card: aqui a página inteira já é do
            empreendimento, e a faixa disputaria com o título. */}
        <DevelopmentBadges development={development} />
        {/* Titula pela praça (ref. Novolar): o nome já é o <h1> do hero logo
            acima, e repeti-lo só poluiria o outline. O endereço completo fica
            na seção Localização. */}
        <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-ink md:text-4xl">
          {/* O espaço antes do <br> mantém o nome acessível "MG, Savassi…"
              — sem ele, leitores de tela juntam "MG,Savassi". */}
          {development.location.state},{" "}
          <br />
          {formatLocality(development.location)}
        </h2>

        {/* Um item por linha, separados por fio: são os destaques do produto,
            não uma lista de conferência (sem check — a lista com ícone está
            no accordion). */}
        <ul className="mt-6 divide-y divide-ink/15 border-b border-ink/15 text-ink-soft">
          {paragraphs.map((line) => (
            <li key={line} className="py-3">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
