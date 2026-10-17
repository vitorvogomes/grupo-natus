import { SITE_URL, SOCIAL } from "@/lib/site";
import type { Development } from "@/types/development";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Grupo Natus",
    url: SITE_URL,
    areaServed: ["Minas Gerais", "Rio de Janeiro"],
    sameAs: Object.values(SOCIAL),
    // Sem `taxID` por ora: o CNPJ do rodapé consta em registro público como
    // de outra razão social. Entra junto com `legalName`, quando confirmada
    // (docs/CONTENT-GAPS.md §6).
  };
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
      ...(dev.location.postalCode ? { postalCode: dev.location.postalCode } : {}),
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
