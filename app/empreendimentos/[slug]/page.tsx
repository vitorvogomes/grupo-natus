import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllDevelopments, getDevelopmentBySlug } from "@/content/developments";
import { DevelopmentHero } from "@/features/developments/DevelopmentHero";
import { DevelopmentAnchorNav } from "@/features/developments/DevelopmentAnchorNav";
import { Gallery } from "@/features/developments/Gallery";
import { DevelopmentOverview } from "@/features/developments/DevelopmentOverview";
import { DevelopmentDetails } from "@/features/developments/DevelopmentDetails";
import { DevelopmentAmenities } from "@/features/developments/DevelopmentAmenities";
import { DevelopmentLocation } from "@/features/developments/DevelopmentLocation";
import { ProgressTimeline } from "@/features/developments/ProgressTimeline";
import { DevelopmentCta } from "@/features/developments/DevelopmentCta";
import { InterestForm } from "@/features/contact/InterestForm";
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
  "mx-auto max-w-[var(--container-max)] scroll-mt-32 px-4 py-14 sm:px-6 lg:px-8";

export default async function DevelopmentPage({ params }: PageParams) {
  const { slug } = await params;
  const development = getDevelopmentBySlug(slug);
  if (!development) notFound();

  return (
    <main>
      <JsonLd data={developmentSchema(development)} />
      <DevelopmentHero development={development} />
      <DevelopmentAnchorNav />

      <Reveal>
        <section id="empreendimento" className="bg-surface-muted">
          <div className={sectionClass}>
            <DevelopmentOverview development={development} />
            <div className="mt-14">
              <DevelopmentDetails development={development} />
            </div>
            <div className="mt-14">
              <DevelopmentAmenities development={development} />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="imagens" className={sectionClass}>
          <h2 className="mb-6 text-2xl font-semibold text-ink">Imagens</h2>
          <Gallery images={development.images} />
        </section>
      </Reveal>

      <Reveal>
        <section id="localizacao" className={sectionClass}>
          <DevelopmentLocation
            name={development.name}
            location={development.location}
          />
        </section>
      </Reveal>

      <Reveal>
        <section id="estagio-de-obra" className="bg-surface-muted">
          <div className={sectionClass}>
            <h2 className="mb-6 text-2xl font-semibold text-ink">
              Estágio de Obra
            </h2>
            {development.progress ? (
              <ProgressTimeline progress={development.progress} />
            ) : (
              <p className="text-muted-foreground">
                Acompanhamento da evolução da obra em breve.
              </p>
            )}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="falar-com-consultor" className={sectionClass}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <DevelopmentCta development={development} />
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-ink">
                Tenho interesse
              </h2>
              <InterestForm slug={development.slug} name={development.name} />
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
