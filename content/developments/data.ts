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
  /**
   * Tipo de produto — faceta de busca. Preencher SÓ com evidência no material
   * do empreendimento (tipologia declarada, plantas, alt das imagens).
   * Ausente = não confirmado; ver docs/CONTENT-GAPS.md.
   */
  propertyType?: Development["propertyType"];
  summary?: string; // resumo factual (quando derivável de dados confirmados)
  images?: DevelopmentImage[]; // imagens reais atribuídas
  extraFeatures?: DevelopmentFeature[]; // features visíveis nos assets reais
  amenities?: Development["amenities"];
  progress?: ConstructionProgress; // mock rotulado (isPreview) até dado real
  /** Descrição real. Sem ela, fromSeed mantém o placeholder rotulado. */
  description?: string;
  /** Localização precisa — sem ela o mapa degrada para link (lib/maps). */
  address?: string;
  lat?: number;
  lng?: number;
  googleMapsUrl?: string;
  locationNote?: string;
  /** Enquadrado no MCMV — só com evidência no material. */
  mcmv?: boolean;
};

const SEEDS: readonly Seed[] = [
  {
    slug: "residenziale-colonnello-figueiredo",
    name: "Residenziale Colonnello Figueiredo",
    status: "pronto",
    city: "Nova Lima",
    state: "MG",
    // Evidência: feature "Apartamentos: 2 e 3 quartos" + plantas de 2 e 3 quartos.
    propertyType: "apartamento",
    summary:
      "Residencial em Nova Lima/MG com 20 unidades — apartamentos de 2 e 3 quartos e coberturas lineares, a 10 minutos do BH Shopping.",
    // Fatos do portfólio do site atual. A seção de visão geral mostra descrição
    // em texto corrido, não bullets com check — uma linha vira um parágrafo.
    description: [
      "20 unidades: apartamentos de 2 e 3 quartos e coberturas lineares.",
      "Varandas em todas as unidades.",
      "A 10 minutos do BH Shopping, próximo ao Supermercado BH.",
    ].join("\n"),
    extraFeatures: [
      { label: "Apartamentos", value: "2 e 3 quartos (69 e 79 m²)" },
      { label: "Coberturas", value: "lineares de 138 e 158 m²" },
      { label: "Vagas", value: "1 a 2 por unidade" },
    ],
    images: [
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/fachada-rua.webp", alt: "Fachada vista da rua", kind: "imagens" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/cobertura-fachada.webp", alt: "Cobertura — vista da fachada", kind: "imagens" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/cobertura.webp", alt: "Cobertura", kind: "imagens" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/sala-de-estar.webp", alt: "Sala de estar (perspectiva)", kind: "imagens" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/sala-de-estar-2.webp", alt: "Sala de estar (perspectiva)", kind: "imagens" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/fachada.webp", alt: "Fachada do Residenziale Colonnello Figueiredo", kind: "imagens" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/planta-3-quartos.webp", alt: "Planta — apartamento de 3 quartos", kind: "planta" },
      { src: "/empreendimentos/residenziale-colonnello-figueiredo/planta-2-quartos.webp", alt: "Planta — apartamento de 2 quartos", kind: "planta" },
    ],
  },
  {
    slug: "viver-mais",
    name: "Viver Mais",
    status: "pronto",
    city: "Itaboraí",
    state: "RJ",
    // TODO: CONTENT REQUIRED — propertyType (só há perspectivas e fotos de obra).
    images: [
      { src: "/empreendimentos/viver-mais/lazer.webp", alt: "Área de lazer do Residencial Viver Mais", kind: "imagens" },
      { src: "/empreendimentos/viver-mais/perspectiva-2.webp", alt: "Perspectiva do Residencial Viver Mais", kind: "imagens" },
      { src: "/empreendimentos/viver-mais/perspectiva-3.webp", alt: "Perspectiva do Residencial Viver Mais", kind: "imagens" },
      { src: "/empreendimentos/viver-mais/perspectiva-4.webp", alt: "Perspectiva do Residencial Viver Mais", kind: "imagens" },
      { src: "/empreendimentos/viver-mais/perspectiva-5.webp", alt: "Perspectiva do Residencial Viver Mais", kind: "imagens" },
      { src: "/empreendimentos/viver-mais/perspectiva-6.webp", alt: "Perspectiva do Residencial Viver Mais", kind: "imagens" },
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
    // Evidência: os renders internos mostram sala e cozinha de unidade
    // residencial (perspectiva-4 e -5); perspectiva-3 é foto de obra.
    propertyType: "apartamento",
    images: [
      { src: "/empreendimentos/residencial-denver/perspectiva-2.webp", alt: "Perspectiva do Residencial Denver", kind: "imagens" },
      { src: "/empreendimentos/residencial-denver/perspectiva-4.webp", alt: "Perspectiva do Residencial Denver", kind: "imagens" },
      { src: "/empreendimentos/residencial-denver/perspectiva-5.webp", alt: "Perspectiva do Residencial Denver", kind: "imagens" },
      { src: "/empreendimentos/residencial-denver/perspectiva-6.webp", alt: "Perspectiva do Residencial Denver", kind: "imagens" },
      { src: "/empreendimentos/residencial-denver/perspectiva-1.webp", alt: "Perspectiva do Residencial Denver", kind: "imagens" },
      { src: "/empreendimentos/residencial-denver/perspectiva-3.webp", alt: "Perspectiva do Residencial Denver", kind: "obra" },
    ],
  },
  {
    slug: "torres-da-lagoa",
    name: "Torres da Lagoa",
    status: "pronto",
    city: "Lagoa Santa",
    state: "MG",
    // Evidência: alt "Planta humanizada — apartamento tipo".
    propertyType: "apartamento",
    images: [
      { src: "/empreendimentos/torres-da-lagoa/fachada.webp", alt: "Fachada dos blocos do Torres da Lagoa", kind: "imagens" },
      { src: "/empreendimentos/torres-da-lagoa/piscina.webp", alt: "Piscina do Torres da Lagoa", kind: "imagens" },
      { src: "/empreendimentos/torres-da-lagoa/espaco-gourmet.webp", alt: "Espaço gourmet", kind: "imagens" },
      { src: "/empreendimentos/torres-da-lagoa/guarita.webp", alt: "Guarita e entrada", kind: "imagens" },
      { src: "/empreendimentos/torres-da-lagoa/sala.webp", alt: "Sala decorada", kind: "imagens" },
      { src: "/empreendimentos/torres-da-lagoa/cozinha.webp", alt: "Cozinha decorada", kind: "imagens" },
      { src: "/empreendimentos/torres-da-lagoa/quarto.webp", alt: "Quarto decorado", kind: "imagens" },
      { src: "/empreendimentos/torres-da-lagoa/varanda-gourmet.webp", alt: "Varanda gourmet", kind: "imagens" },
      { src: "/empreendimentos/torres-da-lagoa/planta-tipo.webp", alt: "Planta humanizada — apartamento tipo", kind: "planta" },
    ],
  },
  {
    slug: "follow-savassi",
    name: "Follow Savassi",
    status: "em_construcao",
    city: "Belo Horizonte",
    state: "MG",
    // Evidência: alts "Apartamento decorado (unidade 1001/1003/303)".
    propertyType: "apartamento",
    summary:
      "Empreendimento em construção na Savassi, em Belo Horizonte/MG, com fachada contemporânea e área de lazer no rooftop.",
    // Descrição e diferenciais fornecidos pelo cliente (2026-10-01), verbatim.
    // Cada linha vira um parágrafo em DevelopmentOverview.
    description: [
      "Rooftop com piscina de borda infinita, espaço fitness e área gourmet.",
      "Automação residencial, janelas acústicas e fechadura eletrônica em todas as unidades.",
      "Localização privilegiada no encontro da Contorno com a Getúlio Vargas, no coração da Savassi.",
      "Projeto arquitetônico assinado por Estela Netto.",
    ].join("\n"),
    address: "Av. Getúlio Vargas, 1.676 — Savassi",
    // Coordenadas do place no link enviado pelo cliente (!3d / !4d).
    lat: -19.9393436,
    lng: -43.9383469,
    googleMapsUrl:
      "https://www.google.com/maps/place/Av.+Get%C3%BAlio+Vargas,+1676+-+Funcion%C3%A1rios,+Belo+Horizonte+-+MG,+30112-024/@-19.9393436,-43.9409272,17z",
    locationNote:
      "No encontro da Av. do Contorno com a Getúlio Vargas, no coração da Savassi.",
    images: [
      { src: "/empreendimentos/follow-savassi/fachada-diurna.webp", alt: "Fachada diurna do Follow Savassi", kind: "imagens" },
      { src: "/empreendimentos/follow-savassi/fachada-noturna.webp", alt: "Fachada noturna do Follow Savassi", kind: "imagens" },
      { src: "/empreendimentos/follow-savassi/voo-do-passaro.webp", alt: "Vista aérea do Follow Savassi", kind: "imagens" },
      { src: "/empreendimentos/follow-savassi/rooftop-piscina.webp", alt: "Piscina no rooftop", kind: "imagens" },
      { src: "/empreendimentos/follow-savassi/rooftop-gourmet.webp", alt: "Espaço gourmet no rooftop", kind: "imagens" },
      { src: "/empreendimentos/follow-savassi/academia.webp", alt: "Academia", kind: "imagens" },
      { src: "/empreendimentos/follow-savassi/hall.webp", alt: "Hall de entrada", kind: "imagens" },
      { src: "/empreendimentos/follow-savassi/apartamento-1001.webp", alt: "Apartamento decorado (unidade 1001)", kind: "imagens" },
      { src: "/empreendimentos/follow-savassi/apartamento-1003.webp", alt: "Apartamento decorado (unidade 1003)", kind: "imagens" },
      { src: "/empreendimentos/follow-savassi/apartamento-303.webp", alt: "Apartamento decorado (unidade 303)", kind: "imagens" },
      { src: "/empreendimentos/follow-savassi/suite-702.webp", alt: "Suíte decorada (unidade 702)", kind: "imagens" },
      { src: "/empreendimentos/follow-savassi/rooftop-terraco.webp", alt: "Terraço no rooftop", kind: "imagens" },
    ],
    // Chips do card no catálogo/carrossel (features) — recorte curto do que os
    // grupos abaixo detalham na página. São superfícies diferentes: 3 chips não
    // comportam os 11 itens do accordion.
    extraFeatures: [
      { label: "Apartamentos", value: "1 a 3 suítes" },
      { label: "Área", value: "37 a 168 m²" },
      { label: "Lazer", value: "Rooftop com piscina" },
    ],
    // Grupos oficiais enviados pelo cliente (2026-10-01). Os emojis do texto de
    // origem viram ícones lucide em DevelopmentAmenities (regra: zero emoji).
    amenities: [
      {
        category: "Características",
        items: [
          "Apartamentos de 1 a 3 suítes, de 37 a 168 m²",
          "Projeto arquitetônico assinado por Estela Netto",
          "Localização no encontro da Av. do Contorno com a Getúlio Vargas, Savassi",
          "Loja comercial de 268 m² integrada ao empreendimento",
        ],
      },
      {
        category: "Área de lazer",
        items: [
          "Rooftop com piscina de borda infinita",
          "Espaço fitness",
          "Área gourmet",
        ],
      },
      {
        category: "Comodidades",
        items: [
          "Automação residencial",
          "Janelas acústicas",
          "Fechadura eletrônica",
        ],
      },
      { category: "Segurança", items: ["Portaria eletrônica 24h"] },
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
    // Evidência: alts "Sala do apartamento" e "Planta — apartamento tipo".
    propertyType: "apartamento",
    images: [
      { src: "/empreendimentos/golden-ville-residence/fachada.webp", alt: "Fachada do Golden Ville Residence", kind: "imagens" },
      { src: "/empreendimentos/golden-ville-residence/piscina.webp", alt: "Piscina", kind: "imagens" },
      { src: "/empreendimentos/golden-ville-residence/academia.webp", alt: "Academia", kind: "imagens" },
      { src: "/empreendimentos/golden-ville-residence/salao-de-festas.webp", alt: "Salão de festas", kind: "imagens" },
      { src: "/empreendimentos/golden-ville-residence/churrasqueira.webp", alt: "Espaço churrasqueira", kind: "imagens" },
      { src: "/empreendimentos/golden-ville-residence/sala.webp", alt: "Sala do apartamento (perspectiva)", kind: "imagens" },
      { src: "/empreendimentos/golden-ville-residence/quarto.webp", alt: "Quarto do apartamento (perspectiva)", kind: "imagens" },
      { src: "/empreendimentos/golden-ville-residence/cozinha.webp", alt: "Cozinha do apartamento (perspectiva)", kind: "imagens" },
      { src: "/empreendimentos/golden-ville-residence/planta-tipo.webp", alt: "Planta humanizada — apartamento tipo", kind: "planta" },
      { src: "/empreendimentos/golden-ville-residence/planta-terreo.webp", alt: "Planta humanizada — térreo", kind: "planta" },
    ],
  },
  {
    slug: "gutierrez",
    name: "Gutierrez",
    status: "lancamento",
    city: "Belo Horizonte",
    state: "MG",
    // TODO: CONTENT REQUIRED — propertyType ("20 un. alto luxo" não diz o produto).
    highlight: "20 un. alto luxo",
    images: [
      { src: "/empreendimentos/gutierrez/maquete-5.webp", alt: "Maquete do empreendimento no Gutierrez", kind: "imagens" },
      { src: "/empreendimentos/gutierrez/maquete-6.webp", alt: "Maquete do empreendimento no Gutierrez", kind: "imagens" },
      { src: "/empreendimentos/gutierrez/maquete-1.webp", alt: "Maquete do empreendimento no Gutierrez", kind: "imagens" },
      { src: "/empreendimentos/gutierrez/maquete-2.webp", alt: "Maquete do empreendimento no Gutierrez", kind: "imagens" },
      { src: "/empreendimentos/gutierrez/maquete-3.webp", alt: "Maquete do empreendimento no Gutierrez", kind: "imagens" },
      { src: "/empreendimentos/gutierrez/maquete-4.webp", alt: "Maquete do empreendimento no Gutierrez", kind: "imagens" },
    ],
  },
  // TODO: CONTENT REQUIRED — propertyType ("un. MCMV" não diz se é apto ou casa).
  { mcmv: true, slug: "solar-manilha", name: "Solar Manilha", status: "lancamento", city: "Itaboraí", state: "RJ", highlight: "368 un. MCMV" },
  // Evidência: highlight "180 studios".
  { slug: "one-studios", name: "One Studios", status: "lancamento", city: "Niterói", state: "RJ", highlight: "180 studios", propertyType: "studio" },
  // Evidência: highlight "508 lotes".
  { slug: "vista-do-lago", name: "Vista do Lago", status: "lancamento", city: "Nova Lima", state: "MG", highlight: "508 lotes", propertyType: "lote" },
  // TODO: CONTENT REQUIRED — propertyType ("un. MCMV" não diz se é apto ou casa).
  { mcmv: true, slug: "sunset-ville-residence", name: "Sunset Ville Residence", status: "lancamento", city: "Belo Horizonte", state: "MG", highlight: "72 un. MCMV" },
  // Evidência: highlight "96 casas MCMV".
  { mcmv: true, slug: "royal-ville-residence", name: "Royal Ville Residence", status: "lancamento", city: "Vespasiano", state: "MG", highlight: "96 casas MCMV", propertyType: "casa" },
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
    location: {
      city: seed.city,
      state: seed.state,
      ...(seed.address ? { address: seed.address } : {}),
      ...(seed.lat != null ? { lat: seed.lat } : {}),
      ...(seed.lng != null ? { lng: seed.lng } : {}),
      ...(seed.googleMapsUrl ? { googleMapsUrl: seed.googleMapsUrl } : {}),
      ...(seed.locationNote ? { note: seed.locationNote } : {}),
    },
    ...(seed.propertyType ? { propertyType: seed.propertyType } : {}),
    ...(seed.mcmv ? { mcmv: true } : {}),
    summary: seed.summary ?? `${TODO} — resumo de ${seed.name}`,
    description: seed.description ?? `${TODO} — descrição completa de ${seed.name}`,
    images: seed.images ?? [], // TODO: mapear renders/plantas de img/ por empreendimento
    features,
    ...(seed.amenities ? { amenities: seed.amenities } : {}),
    ...(seed.progress ? { progress: seed.progress } : {}),
  };
}

export const developments: readonly Development[] = SEEDS.map(fromSeed);
