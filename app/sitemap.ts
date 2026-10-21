import type { MetadataRoute } from "next";
import { getAllDevelopments } from "@/content/developments";
import { SITE_URL, STATIC_ROUTES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: route === "/" ? SITE_URL : `${SITE_URL}${route}`,
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

  return [...staticEntries, ...developmentEntries];
}
