import { SITE_URL } from "@/lib/site";
import type { Development } from "@/types/development";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Grupo Natus",
    url: SITE_URL,
    areaServed: ["Minas Gerais", "Rio de Janeiro"],
  } as const;
}

export function developmentSchema(dev: Development) {
  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: dev.name,
    description: dev.summary,
    url: `${SITE_URL}/empreendimentos/${dev.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: dev.location.city,
      addressRegion: dev.location.state,
      ...(dev.location.address ? { streetAddress: dev.location.address } : {}),
    },
  };
}

type JsonLdProps = {
  data: object;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
