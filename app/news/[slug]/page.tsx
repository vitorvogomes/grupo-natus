import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllEditions, getEditionBySlug } from "@/content/news";
import { NewsEditionArticle } from "@/features/news/NewsEditionArticle";
import { JsonLd, breadcrumbSchema, newsArticleSchema } from "@/features/seo/jsonLd";
import { newsMetadata } from "@/features/seo/metadata";

type PageParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllEditions().map((edition) => ({ slug: edition.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const edition = getEditionBySlug(slug);
  return edition ? newsMetadata(edition) : {};
}

/** Uma edição da Natus News (o e-mail mensal, publicado no site). */
export default async function NewsEditionPage({ params }: PageParams) {
  const { slug } = await params;
  const edition = getEditionBySlug(slug);
  if (!edition) notFound();

  return (
    <main>
      <JsonLd data={newsArticleSchema(edition)} />
      <JsonLd
        data={breadcrumbSchema([
          ["Início", "/"],
          ["Natus News", "/news"],
          [edition.label, `/news/${edition.slug}`],
        ])}
      />
      <NewsEditionArticle edition={edition} />
    </main>
  );
}
