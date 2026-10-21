import { CONTACT, HEADQUARTERS, SITE_URL, SOCIAL } from "@/lib/site";
import type { Development } from "@/types/development";
import { pickHeroImage } from "@/features/developments/pickHeroImage";

const absolute = (path: string) => `${SITE_URL}${path}`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Grupo Natus",
    url: SITE_URL,
    logo: absolute("/brand/grupo-natus-principal.png"),
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: HEADQUARTERS.street,
      addressLocality: HEADQUARTERS.city,
      addressRegion: HEADQUARTERS.state,
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: CONTACT.phone,
      email: CONTACT.email,
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
    areaServed: ["Minas Gerais", "Rio de Janeiro"],
    sameAs: Object.values(SOCIAL),
    // Sem `taxID` por ora: o CNPJ do rodapé consta em registro público como
    // de outra razão social. Entra junto com `legalName`, quando confirmada
    // (docs/CONTENT-GAPS.md §6).
  };
}

/** Só na home: nome do site. Sem SearchAction (a busca não tem URL de texto livre). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Grupo Natus",
    url: SITE_URL,
    inLanguage: "pt-BR",
  };
}

export function developmentSchema(dev: Development) {
  const { lat, lng } = dev.location;
  const cover = pickHeroImage(dev.images);
  return {
    "@context": "https://schema.org",
    // Condomínio de apartamentos tem tipo próprio; o resto fica genérico.
    "@type": dev.propertyType === "apartamento" ? "ApartmentComplex" : "Residence",
    name: dev.name,
    description: dev.summary,
    url: absolute(`/empreendimentos/${dev.slug}`),
    ...(cover ? { image: absolute(cover.src) } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: dev.location.city,
      addressRegion: dev.location.state,
      addressCountry: "BR",
      ...(dev.location.address ? { streetAddress: dev.location.address } : {}),
      ...(dev.location.postalCode ? { postalCode: dev.location.postalCode } : {}),
    },
    ...(lat != null && lng != null
      ? { geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng } }
      : {}),
  };
}

export function breadcrumbSchema(dev: Development) {
  const trail = [
    ["Início", absolute("/")],
    ["Empreendimentos", absolute("/empreendimentos")],
    [dev.name, absolute(`/empreendimentos/${dev.slug}`)],
  ] as const;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, item], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item,
    })),
  };
}

type JsonLdProps = {
  data: object;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // `<` escapado: nenhum texto do dado consegue fechar o <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
