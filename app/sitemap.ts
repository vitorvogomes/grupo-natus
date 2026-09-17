import type { MetadataRoute } from "next";
import { getAllDevelopments } from "@/content/developments";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/empreendimentos",
    "/engenharia",
    "/quem-somos",
    "/negocie-seu-terreno",
    "/contato",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
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
