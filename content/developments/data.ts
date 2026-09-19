import type {
  ConstructionProgress,
  Development,
  DevelopmentFeature,
  DevelopmentImage,
} from "@/types/development";

/**
 * Seed dos 11 empreendimentos ativos do Grupo Natus.
 * Fonte de verdade estática — AD-2.
 *
 * CONFIRMADO (site atual + product-brief): name, slug, cidade/UF, status e o
 * destaque de tipologia quando informado. Imagens do Follow Savassi vêm de
 * `img/Final - Follow Savassi/` (pasta atribuída ao empreendimento).
 * TODO: CONTENT REQUIRED — descrição, imagens dos demais, coordenadas, progresso.
 * **Nomes/status a validar com a empresa.**
 */

const TODO = "TODO: CONTENT REQUIRED";

type Seed = {
  slug: string;
  name: string;
  status: Development["status"];
  city: string;
  state: string;
  highlight?: string; // destaque confirmado (tipologia)
  summary?: string; // resumo factual (quando derivável de dados confirmados)
  images?: DevelopmentImage[]; // imagens reais atribuídas
  extraFeatures?: DevelopmentFeature[]; // features visíveis nos assets reais
  highlights?: string[]; // destaques (derivados de assets reais)
  amenities?: Development["amenities"];
  progress?: ConstructionProgress; // mock rotulado (isPreview) até dado real
};

const SEEDS: readonly Seed[] = [
  { slug: "viver-mais", name: "Viver Mais", status: "pronto", city: "Itaboraí", state: "RJ" },
  { slug: "residencial-denver", name: "Residencial Denver", status: "pronto", city: "Belo Horizonte", state: "MG" },
  { slug: "torres-da-lagoa", name: "Torres da Lagoa", status: "pronto", city: "Lagoa Santa", state: "MG" },
  {
    slug: "follow-savassi",
    name: "Follow Savassi",
    status: "em_construcao",
    city: "Belo Horizonte",
    state: "MG",
    summary:
      "Empreendimento em construção na Savassi, em Belo Horizonte/MG, com fachada contemporânea e área de lazer no rooftop.",
    images: [
      { src: "/empreendimentos/follow-savassi/fachada-diurna.jpg", alt: "Fachada diurna do Follow Savassi", kind: "hero" },
      { src: "/empreendimentos/follow-savassi/fachada-noturna.jpg", alt: "Fachada noturna do Follow Savassi", kind: "render" },
      { src: "/empreendimentos/follow-savassi/voo-do-passaro.jpg", alt: "Vista aérea do Follow Savassi", kind: "render" },
      { src: "/empreendimentos/follow-savassi/rooftop-piscina.jpg", alt: "Piscina no rooftop", kind: "render" },
      { src: "/empreendimentos/follow-savassi/rooftop-gourmet.jpg", alt: "Espaço gourmet no rooftop", kind: "render" },
      { src: "/empreendimentos/follow-savassi/academia.jpg", alt: "Academia", kind: "render" },
      { src: "/empreendimentos/follow-savassi/hall.jpg", alt: "Hall de entrada", kind: "render" },
      { src: "/empreendimentos/follow-savassi/apartamento-1001.jpg", alt: "Apartamento decorado (unidade 1001)", kind: "render" },
    ],
    extraFeatures: [
      { label: "Lazer", value: "Rooftop com piscina" },
      { label: "Academia" },
      { label: "Espaço gourmet" },
    ],
    highlights: [
      "Lazer no rooftop com piscina e espaço gourmet",
      "Academia no empreendimento",
      "Localização na Savassi, Belo Horizonte",
    ],
    amenities: [
      {
        category: "Área de lazer",
        items: ["Rooftop com piscina", "Espaço gourmet", "Terraço"],
      },
      { category: "Comodidades", items: ["Academia", "Hall de entrada"] },
    ],
    // MOCK rotulado (isPreview) — etapas oficiais da Natus; % reais são TODO
    // (docs/CONTENT-GAPS.md §2). "Total Construído" = overallPercentage.
    progress: {
      overallPercentage: 55,
      updatedAt: "2026-09-01T00:00:00.000Z",
      isPreview: true,
      stages: [
        { name: "Terraplanagem", percentage: 100, order: 1 },
        { name: "Infraestrutura", percentage: 100, order: 2 },
        { name: "Fundações", percentage: 100, order: 3 },
        { name: "Estrutura", percentage: 80, order: 4 },
        { name: "Instalações", percentage: 40, order: 5 },
        { name: "Revestimento", percentage: 15, order: 6 },
        { name: "Acabamentos", percentage: 0, order: 7 },
      ],
    },
  },
  { slug: "golden-ville-residence", name: "Golden Ville Residence", status: "em_construcao", city: "São Gonçalo", state: "RJ" },
  { slug: "solar-manilha", name: "Solar Manilha", status: "lancamento", city: "Itaboraí", state: "RJ", highlight: "368 un. MCMV" },
  { slug: "one-studios", name: "One Studios", status: "lancamento", city: "Niterói", state: "RJ", highlight: "180 studios" },
  { slug: "vista-do-lago", name: "Vista do Lago", status: "lancamento", city: "Nova Lima", state: "MG", highlight: "508 lotes" },
  { slug: "sunset-ville-residence", name: "Sunset Ville Residence", status: "lancamento", city: "Belo Horizonte", state: "MG", highlight: "72 un. MCMV" },
  { slug: "royal-ville-residence", name: "Royal Ville Residence", status: "lancamento", city: "Vespasiano", state: "MG", highlight: "96 casas MCMV" },
  { slug: "gutierrez", name: "Gutierrez", status: "lancamento", city: "Belo Horizonte", state: "MG", highlight: "20 un. alto luxo" },
];

function fromSeed(seed: Seed): Development {
  const features: DevelopmentFeature[] = [
    ...(seed.highlight ? [{ label: "Tipologia", value: seed.highlight }] : []),
    ...(seed.extraFeatures ?? []),
  ];
  return {
    slug: seed.slug,
    name: seed.name,
    status: seed.status,
    location: { city: seed.city, state: seed.state },
    summary: seed.summary ?? `${TODO} — resumo de ${seed.name}`,
    description: `${TODO} — descrição completa de ${seed.name}`,
    images: seed.images ?? [], // TODO: mapear renders/plantas de img/ por empreendimento
    features,
    ...(seed.highlights ? { highlights: seed.highlights } : {}),
    ...(seed.amenities ? { amenities: seed.amenities } : {}),
    ...(seed.progress ? { progress: seed.progress } : {}),
  };
}

export const developments: readonly Development[] = SEEDS.map(fromSeed);
