import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllDevelopments, getDevelopmentBySlug } from "@/content/developments";
import { DevelopmentHero } from "@/features/developments/DevelopmentHero";
import {
  DEV_SECTIONS,
  DevelopmentAnchorNav,
  type DevSection,
} from "@/features/developments/DevelopmentAnchorNav";
import { Gallery } from "@/features/developments/Gallery";
import { DevelopmentOverview } from "@/features/developments/DevelopmentOverview";
import { DevelopmentComingSoon } from "@/features/developments/DevelopmentComingSoon";
import { DevelopmentAmenities } from "@/features/developments/DevelopmentAmenities";
import { DevelopmentLocation } from "@/features/developments/DevelopmentLocation";
import { ProgressTimeline } from "@/features/developments/ProgressTimeline";
import { hasProgressToShow } from "@/features/developments/progress";
import { DevelopmentCta } from "@/features/developments/DevelopmentCta";
import { ExploreDevelopments } from "@/features/developments/ExploreDevelopments";
import { MinhaCasaMinhaVida } from "@/features/mcmv/MinhaCasaMinhaVida";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd, developmentSchema } from "@/features/seo/jsonLd";

type PageParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllDevelopments().map((dev) => ({ slug: dev.slug }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const development = getDevelopmentBySlug(slug);
  if (!development) return {};

  const title = development.seo?.title ?? development.name;
  const description = development.seo?.description ?? development.summary;
  const canonical = `/empreendimentos/${development.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: development.seo?.ogImage ? [development.seo.ogImage] : undefined,
    },
  };
}

const sectionClass =
  "mx-auto max-w-[var(--container-max)] scroll-mt-32 px-4 py-16 sm:px-6 lg:px-8";

export default async function DevelopmentPage({ params }: PageParams) {
  const { slug } = await params;
  const development = getDevelopmentBySlug(slug);
  if (!development) notFound();

  /**
   * Composição da página: o status diz quais seções fazem sentido e o dado
   * presente diz quais aparecem.
   *
   * - Lançamento: página completa (é o destaque do portfólio).
   * - Em construção / pronto: reduzida — só o que tiver material.
   * - Breve lançamento: seção mínima. É a fase embrionária; em vez de uma
   *   sequência de blocos dizendo "em breve", um painel com o que se sabe.
   */
  const images = development.images;
  const amenities = development.amenities ?? [];
  const obra = images.filter((img) => img.kind === "obra");

  const minimal = development.status === "breve_lancamento";
  const hasGallery = !minimal && images.length > 0;
  const hasAmenities = !minimal && amenities.length > 0;
  // Pronto não tem estágio a acompanhar. Em lançamento e em construção, a
  // seção entra quando há o que mostrar (total ou alguma etapa acima de 0).
  const progress =
    (development.status === "lancamento" ||
      development.status === "em_construcao") &&
    hasProgressToShow(development.progress)
      ? development.progress
      : undefined;

  // "Empreendimento" leva aos diferenciais quando existem (ref. Novolar);
  // sem eles, ao resumo — que aí abre a barra, por vir antes da galeria.
  const sections: DevSection[] = minimal
    ? []
    : [
        ...(hasAmenities ? [] : [DEV_SECTIONS.resumo]),
        ...(hasGallery ? [DEV_SECTIONS.imagens] : []),
        ...(hasAmenities ? [DEV_SECTIONS.oferece] : []),
        DEV_SECTIONS.localizacao,
        ...(progress ? [DEV_SECTIONS.obra] : []),
        DEV_SECTIONS.contato,
      ];

  const others = getAllDevelopments().filter((d) => d.slug !== development.slug);

  return (
    <main>
      <JsonLd data={developmentSchema(development)} />
      <DevelopmentHero development={development} />
      <DevelopmentAnchorNav sections={sections} />

      <Reveal>
        <section id={DEV_SECTIONS.resumo.id} className={sectionClass}>
          {minimal ? (
            <DevelopmentComingSoon development={development} />
          ) : (
            <DevelopmentOverview development={development} />
          )}
        </section>
      </Reveal>

      {hasGallery ? (
        <Reveal>
          <section
            id={DEV_SECTIONS.imagens.id}
            className={`${sectionClass} bg-surface-muted`}
          >
            <h2 className="mb-8 text-balance text-3xl font-semibold text-ink md:text-4xl">
              Galeria
            </h2>
            <Gallery images={images} />
          </section>
        </Reveal>
      ) : null}

      {hasAmenities ? (
        <Reveal>
          <section id={DEV_SECTIONS.oferece.id} className={sectionClass}>
            <DevelopmentAmenities
              name={development.name}
              groups={amenities}
              // Escolha do dado, se houver. Senão a terceira: a capa abriu o
              // hero e a segunda ilustrou a descrição — nenhuma foto repete.
              image={
                images.find((img) => img.src === development.amenitiesImage) ??
                images[2] ??
                images[0]
              }
            />
          </section>
        </Reveal>
      ) : null}

      {/* Faixa sangrada: a seção desenha o próprio painel navy e o mapa de
          ponta a ponta, então não entra no container das demais. */}
      {minimal ? null : (
        <div id={DEV_SECTIONS.localizacao.id} className="scroll-mt-32">
          <DevelopmentLocation
            name={development.name}
            location={development.location}
          />
        </div>
      )}

      {progress ? (
        <Reveal>
          <section
            id={DEV_SECTIONS.obra.id}
            className={`${sectionClass} bg-surface-muted`}
          >
            <h2 className="mb-8 text-balance text-3xl font-semibold text-ink md:text-4xl">
              Estágio de obra
            </h2>
            <ProgressTimeline progress={progress} photos={obra} />
          </section>
        </Reveal>
      ) : null}

      {/* No breve lançamento o painel já traz o "Quero ser avisado". */}
      {minimal ? null : (
        <Reveal>
          <section id={DEV_SECTIONS.contato.id} className={sectionClass}>
            <DevelopmentCta development={development} />
          </section>
        </Reveal>
      )}

      {/* Só nos empreendimentos efetivamente enquadrados: a marca é federal e
          exibi-la fora do programa sugere um credenciamento que não existe. */}
      {development.mcmv ? <MinhaCasaMinhaVida /> : null}

      <div className="py-16">
        <ExploreDevelopments developments={others} />
      </div>
    </main>
  );
}
