import type { MetadataRoute } from "next";
import { getAllDevelopments } from "@/content/developments";
import { getAllEditions } from "@/content/news";
import { SITE_URL, STATIC_ROUTES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const editions = getAllEditions();
  // O índice da Natus News muda a cada edição: vale a data da mais recente.
  const newsUpdatedAt = editions[0]?.publishedAt;

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: route === "/" ? SITE_URL : `${SITE_URL}${route}`,
    ...(route === "/news" && newsUpdatedAt ? { lastModified: newsUpdatedAt } : {}),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route === "/politica-de-privacidade" ? 0.3 : 0.8,
  }));

  const developmentEntries: MetadataRoute.Sitemap = getAllDevelopments().map(
    (dev) => ({
      url: `${SITE_URL}/empreendimentos/${dev.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  // Edições da Natus News: conteúdo datado, que não muda depois de publicado.
  const newsEntries: MetadataRoute.Sitemap = editions.map((edition) => ({
    url: `${SITE_URL}/news/${edition.slug}`,
    lastModified: edition.publishedAt,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...developmentEntries, ...newsEntries];
}
