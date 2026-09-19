import type {
  ConstructionProgress,
  Development,
  DevelopmentFeature,
  DevelopmentImage,
} from "@/types/development";

/**
 * Seed dos 12 empreendimentos ativos do Grupo Natus.
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
  {
    slug: "viver-mais",
    name: "Viver Mais",
    status: "pronto",
    city: "Itaboraí",
    state: "RJ",
    images: [
      { src: "/empreendimentos/viver-mais/lazer.webp", alt: "Área de lazer do Residencial Viver Mais", kind: "externa" },
      { src: "/empreendimentos/viver-mais/perspectiva-2.webp", alt: "Perspectiva do Residencial Viver Mais", kind: "externa" },
      { src: "/empreendimentos/viver-mais/perspectiva-3.webp", alt: "Perspectiva do Residencial Viver Mais", kind: "externa" },
      { src: "/empreendimentos/viver-mais/perspectiva-4.webp", alt: "Perspectiva do Residencial Viver Mais", kind: "externa" },
      { src: "/empreendimentos/viver-mais/perspectiva-5.webp", alt: "Perspectiva do Residencial Viver Mais", kind: "externa" },
      { src: "/empreendimentos/viver-mais/perspectiva-6.webp", alt: "Perspectiva do Residencial Viver Mais", kind: "externa" },
      { src: "/empreendimentos/viver-mais/obra-1.webp", alt: "Obra do Residencial Viver Mais", kind: "obra" },
      { src: "/empreendimentos/viver-mais/obra-2.webp", alt: "Obra do Residencial Viver Mais", kind: "obra" },
      { src: "/empreendimentos/viver-mais/obra-estrutura-1.webp", alt: "Estrutura em construção", kind: "obra" },
      { src: "/empreendimentos/viver-mais/obra-3.webp", alt: "Andamento da obra", kind: "obra" },
    ],
  },
  {
    slug: "residencial-denver",
    name: "Residencial Denver",
    status: "pronto",
    city: "Belo Horizonte",
    state: "MG",
    images: [
      { src: "/empreendimentos/residencial-denver/perspectiva-1.webp", alt: "Perspectiva do Residencial Denver", kind: "externa" },
      { src: "/empreendimentos/residencial-denver/perspectiva-2.webp", alt: "Perspectiva do Residencial Denver", kind: "externa" },
      { src: "/empreendimentos/residencial-denver/perspectiva-3.webp", alt: "Perspectiva do Residencial Denver", kind: "externa" },
      { src: "/empreendimentos/residencial-denver/perspectiva-4.webp", alt: "Perspectiva do Residencial Denver", kind: "externa" },
      { src: "/empreendimentos/residencial-denver/perspectiva-5.webp", alt: "Perspectiva do Residencial Denver", kind: "externa" },
      { src: "/empreendimentos/residencial-denver/perspectiva-6.webp", alt: "Perspectiva do Residencial Denver", kind: "externa" },
    ],
  },
  {
    slug: "torres-da-lagoa",
    name: "Torres da Lagoa",
    status: "pronto",
    city: "Lagoa Santa",
    state: "MG",
    images: [
      { src: "/empreendimentos/torres-da-lagoa/fachada.webp", alt: "Fachada dos blocos do Torres da Lagoa", kind: "externa" },
      { src: "/empreendimentos/torres-da-lagoa/piscina.webp", alt: "Piscina do Torres da Lagoa", kind: "externa" },
      { src: "/empreendimentos/torres-da-lagoa/espaco-gourmet.webp", alt: "Espaço gourmet", kind: "externa" },
      { src: "/empreendimentos/torres-da-lagoa/guarita.webp", alt: "Guarita e entrada", kind: "externa" },
      { src: "/empreendimentos/torres-da-lagoa/sala.webp", alt: "Sala decorada", kind: "apartamento" },
      { src: "/empreendimentos/torres-da-lagoa/cozinha.webp", alt: "Cozinha decorada", kind: "apartamento" },
      { src: "/empreendimentos/torres-da-lagoa/quarto.webp", alt: "Quarto decorado", kind: "apartamento" },
      { src: "/empreendimentos/torres-da-lagoa/varanda-gourmet.webp", alt: "Varanda gourmet", kind: "apartamento" },
      { src: "/empreendimentos/torres-da-lagoa/planta-tipo.webp", alt: "Planta humanizada — apartamento tipo", kind: "planta" },
    ],
  },
  {
    slug: "follow-savassi",
    name: "Follow Savassi",
    status: "em_construcao",
    city: "Belo Horizonte",
    state: "MG",
    summary:
      "Empreendimento em construção na Savassi, em Belo Horizonte/MG, com fachada contemporânea e área de lazer no rooftop.",
    images: [
      { src: "/empreendimentos/follow-savassi/fachada-diurna.webp", alt: "Fachada diurna do Follow Savassi", kind: "externa" },
      { src: "/empreendimentos/follow-savassi/fachada-noturna.webp", alt: "Fachada noturna do Follow Savassi", kind: "externa" },
      { src: "/empreendimentos/follow-savassi/voo-do-passaro.webp", alt: "Vista aérea do Follow Savassi", kind: "externa" },
      { src: "/empreendimentos/follow-savassi/rooftop-piscina.webp", alt: "Piscina no rooftop", kind: "externa" },
      { src: "/empreendimentos/follow-savassi/rooftop-gourmet.webp", alt: "Espaço gourmet no rooftop", kind: "externa" },
      { src: "/empreendimentos/follow-savassi/academia.webp", alt: "Academia", kind: "externa" },
      { src: "/empreendimentos/follow-savassi/hall.webp", alt: "Hall de entrada", kind: "apartamento" },
      { src: "/empreendimentos/follow-savassi/apartamento-1001.webp", alt: "Apartamento decorado (unidade 1001)", kind: "apartamento" },
      { src: "/empreendimentos/follow-savassi/apartamento-1003.webp", alt: "Apartamento decorado (unidade 1003)", kind: "apartamento" },
      { src: "/empreendimentos/follow-savassi/apartamento-303.webp", alt: "Apartamento decorado (unidade 303)", kind: "apartamento" },
      { src: "/empreendimentos/follow-savassi/suite-702.webp", alt: "Suíte decorada (unidade 702)", kind: "apartamento" },
      { src: "/empreendimentos/follow-savassi/rooftop-terraco.webp", alt: "Terraço no rooftop", kind: "externa" },
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
    // Progresso REAL do site oficial (natusgrupo.com.br) — obra recém-iniciada.
    // O site não informa data (updatedAt omitido). canonicalStages preenche 0%.
    progress: {
      overallPercentage: 0,
      stages: [{ name: "Terraplanagem", percentage: 100, order: 1 }],
    },
  },
  {
    slug: "golden-ville-residence",
    name: "Golden Ville Residence",
    status: "em_construcao",
    city: "São Gonçalo",
    state: "RJ",
    images: [
      { src: "/empreendimentos/golden-ville-residence/fachada.webp", alt: "Fachada do Golden Ville Residence", kind: "externa" },
      { src: "/empreendimentos/golden-ville-residence/piscina.webp", alt: "Piscina", kind: "externa" },
      { src: "/empreendimentos/golden-ville-residence/academia.webp", alt: "Academia", kind: "externa" },
      { src: "/empreendimentos/golden-ville-residence/salao-de-festas.webp", alt: "Salão de festas", kind: "externa" },
      { src: "/empreendimentos/golden-ville-residence/churrasqueira.webp", alt: "Espaço churrasqueira", kind: "externa" },
      { src: "/empreendimentos/golden-ville-residence/sala.webp", alt: "Sala do apartamento (perspectiva)", kind: "apartamento" },
      { src: "/empreendimentos/golden-ville-residence/quarto.webp", alt: "Quarto do apartamento (perspectiva)", kind: "apartamento" },
      { src: "/empreendimentos/golden-ville-residence/cozinha.webp", alt: "Cozinha do apartamento (perspectiva)", kind: "apartamento" },
      { src: "/empreendimentos/golden-ville-residence/planta-tipo.webp", alt: "Planta humanizada — apartamento tipo", kind: "planta" },
      { src: "/empreendimentos/golden-ville-residence/planta-terreo.webp", alt: "Planta humanizada — térreo", kind: "planta" },
    ],
  },
  { slug: "solar-manilha", name: "Solar Manilha", status: "lancamento", city: "Itaboraí", state: "RJ", highlight: "368 un. MCMV" },
  { slug: "one-studios", name: "One Studios", status: "lancamento", city: "Niterói", state: "RJ", highlight: "180 studios" },
  { slug: "vista-do-lago", name: "Vista do Lago", status: "lancamento", city: "Nova Lima", state: "MG", highlight: "508 lotes" },
  { slug: "sunset-ville-residence", name: "Sunset Ville Residence", status: "lancamento", city: "Belo Horizonte", state: "MG", highlight: "72 un. MCMV" },
  { slug: "royal-ville-residence", name: "Royal Ville Residence", status: "lancamento", city: "Vespasiano", state: "MG", highlight: "96 casas MCMV" },
  {
    slug: "gutierrez",
    name: "Gutierrez",
    status: "lancamento",
    city: "Belo Horizonte",
    state: "MG",
    highlight: "20 un. alto luxo",
    images: [
      { src: "/empreendimentos/gutierrez/maquete-1.webp", alt: "Maquete do empreendimento no Gutierrez", kind: "externa" },
      { src: "/empreendimentos/gutierrez/maquete-2.webp", alt: "Maquete do empreendimento no Gutierrez", kind: "externa" },
      { src: "/empreendimentos/gutierrez/maquete-3.webp", alt: "Maquete do empreendimento no Gutierrez", kind: "externa" },
      { src: "/empreendimentos/gutierrez/maquete-4.webp", alt: "Maquete do empreendimento no Gutierrez", kind: "externa" },
      { src: "/empreendimentos/gutierrez/maquete-5.webp", alt: "Maquete do empreendimento no Gutierrez", kind: "externa" },
      { src: "/empreendimentos/gutierrez/maquete-6.webp", alt: "Maquete do empreendimento no Gutierrez", kind: "externa" },
    ],
  },
  {
    // 12º empreendimento (portfólio do site atual: natusgrupo.com.br).
    // Pronto para morar (confirmado pelo cliente) — obra 100%.
    slug: "residenziale-colonnello-figueiredo",
    name: "Residenziale Colonnello Figueiredo",
    status: "pronto",
    city: "Nova Lima",
    state: "MG",
    summary:
      "Residencial em Nova Lima/MG com 20 unidades — apartamentos de 2 e 3 quartos e coberturas lineares, a 10 minutos do BH Shopping.",
    highlights: [
      "20 unidades: apartamentos de 2 e 3 quartos e coberturas lineares",
      "Varandas em todas as unidades",
      "A 10 minutos do BH Shopping, próximo ao Supermercado BH",
    ],
    extraFeatures: [
      { label: "Apartamentos", value: "2 e 3 quartos (69 e 79 m²)" },
      { label: "Coberturas", value: "lineares de 138 e 158 m²" },
      { label: "Vagas", value: "1 a 2 por unidade" },
    ],
    images: [
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/fachada.webp", alt: "Fachada do Residenziale Colonnello Figueiredo", kind: "externa" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/fachada-rua.webp", alt: "Fachada vista da rua", kind: "externa" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/cobertura-fachada.webp", alt: "Cobertura — vista da fachada", kind: "externa" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/cobertura.webp", alt: "Cobertura", kind: "externa" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/sala-de-estar.webp", alt: "Sala de estar (perspectiva)", kind: "apartamento" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/sala-de-estar-2.webp", alt: "Sala de estar (perspectiva)", kind: "apartamento" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/planta-3-quartos.webp", alt: "Planta — apartamento de 3 quartos", kind: "planta" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/planta-2-quartos.webp", alt: "Planta — apartamento de 2 quartos", kind: "planta" },
    ],
  },
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
