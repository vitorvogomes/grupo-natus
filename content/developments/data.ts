import type {
  ConstructionProgress,
  Development,
  DevelopmentFeature,
  DevelopmentImage,
} from "@/types/development";
import dimensions from "./image-dimensions.json";

/**
 * Seed dos 11 empreendimentos do portfólio do Grupo Natus.
 * Fonte de verdade estática — AD-2.
 *
 * CONFIRMADO pelo cliente (revisão v3, 2026-10-11): status, bairro/cidade,
 * descrições, localização e o programa MCMV. Os breve lançamentos seguem só
 * com o que o site atual informava (cidade e tipologia).
 * TODO: CONTENT REQUIRED — data de atualização da obra e o material dos
 * breve lançamentos.
 */

const TODO = "TODO: CONTENT REQUIRED";

type Seed = {
  slug: string;
  name: string;
  status: Development["status"];
  city: string;
  /** Bairro — título do resumo. Ausente = só a cidade. */
  neighborhood?: string;
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
  /** Imagem ao lado do accordion (src de uma das `images`). */
  amenitiesImage?: string;
  progress?: ConstructionProgress; // isPreview = mock rotulado; omitido quando o % vem do cliente
  /** Descrição real. Sem ela, fromSeed mantém o placeholder rotulado. */
  description?: string;
  /** Localização precisa — sem ela o mapa degrada para link (lib/maps). */
  address?: string;
  postalCode?: string;
  lat?: number;
  lng?: number;
  googleMapsUrl?: string;
  locationNote?: string;
  /** Enquadrado no MCMV — só com evidência no material. */
  mcmv?: boolean;
  /** 100% vendido — só em "pronto". */
  soldOut?: boolean;
  /** `idempreendimento` no CV CRM (lista da API, confirmada pelo cliente). */
  crmId?: number;
};

/** Atalho do seed: `slug` + nome curto do arquivo → caminho público. */
const img = (slug: string, file: string) => `/empreendimentos/${slug}/${file}.webp`;

/**
 * Ordem = prioridade do portfólio (lançamento → em construção → pronto →
 * breve lançamento). `index.ts` reordena por status de qualquer forma; manter
 * o seed na mesma ordem só deixa o arquivo legível de cima para baixo.
 *
 * Conteúdo da revisão v3 (cliente, 2026-10-11): descrições verbatim — cada
 * linha vira um item do resumo —, localização pelos links de mapa enviados
 * (coordenadas lidas do place; os dois links `share.google` foram resolvidos
 * pela busca do Maps até o endereço) e status novos.
 */
const SEEDS: readonly Seed[] = [
  {
    mcmv: true,
    slug: "solar-manilha",
    crmId: 4,
    name: "Solar Manilha",
    status: "lancamento",
    city: "Itaboraí",
    neighborhood: "Manilha",
    state: "RJ",
    // Evidência: "Unidades de 2 quartos" + planta "Apartamento Tipo".
    propertyType: "apartamento",
    summary:
      "Lançamento em Manilha, Itaboraí/RJ: 368 unidades de 2 quartos em condomínio fechado com lazer de clube, enquadrado no Minha Casa Minha Vida.",
    description: [
      "Lazer completo, para momentos únicos com toda a sua família.",
      "O sossego e a segurança de um condomínio fechado, rodeado de verde.",
      "Mais praticidade para a sua rotina.",
      "Plantas inteligentes, com cada espaço bem aproveitado.",
    ].join("\n"),
    address: "R. Carlota Maria do Amor Divino — Loteamento Santo Antônio, Manilha",
    postalCode: "24856-500",
    lat: -22.767126,
    lng: -42.918125,
    googleMapsUrl: "https://maps.app.goo.gl/fRVp7Sj4uppGjxRe8",
    images: [
      // Capa (escolha do cliente): o acesso principal.
      { src: img("solar-manilha", "acesso-principal"), alt: "Acesso principal do Solar Manilha ao entardecer", kind: "imagens" },
      // 2ª = foto do resumo (bloco 4:3). A implantação (1,48:1) encaixa nele
      // melhor que as cenas de 1,79:1 ou as panorâmicas. É um render aéreo
      // humanizado, não uma planta técnica — por isso entra como "imagens".
      { src: img("solar-manilha", "implantacao"), alt: "Vista aérea da implantação do condomínio Solar Manilha", kind: "imagens" },
      { src: img("solar-manilha", "vista-aerea"), alt: "Vista aérea do condomínio Solar Manilha", kind: "imagens" },
      { src: img("solar-manilha", "portaria"), alt: "Portaria com acesso de pedestres", kind: "imagens" },
      { src: img("solar-manilha", "piscinas"), alt: "Família nas piscinas adulto e infantil", kind: "imagens" },
      { src: img("solar-manilha", "quiosques-piscina"), alt: "Quiosque com churrasqueira ao lado da piscina", kind: "imagens" },
      { src: img("solar-manilha", "quadras"), alt: "Jovens jogando na quadra poliesportiva", kind: "imagens" },
      { src: img("solar-manilha", "espaco-criancas"), alt: "Crianças brincando no espaço kids", kind: "imagens" },
      { src: img("solar-manilha", "salao-de-festas"), alt: "Salão de festas com churrasqueira", kind: "imagens" },
      { src: img("solar-manilha", "salao-de-festas-interno"), alt: "Moradores no salão de festas", kind: "imagens" },
      { src: img("solar-manilha", "quiosque-academia"), alt: "Quiosque e academia ao ar livre", kind: "imagens" },
      { src: img("solar-manilha", "academia-aberta"), alt: "Moradores na academia ao ar livre", kind: "imagens" },
      { src: img("solar-manilha", "bicicletario"), alt: "Bicicletário", kind: "imagens" },
      { src: img("solar-manilha", "redario"), alt: "Redário", kind: "imagens" },
      { src: img("solar-manilha", "redario-2"), alt: "Casal descansando no redário", kind: "imagens" },
      { src: img("solar-manilha", "pet-place"), alt: "Pet place com circuito para cães", kind: "imagens" },
      { src: img("solar-manilha", "sala-de-estar"), alt: "Família na sala de estar decorada", kind: "imagens" },
      { src: img("solar-manilha", "sala-de-jantar"), alt: "Sala de jantar decorada", kind: "imagens" },
      { src: img("solar-manilha", "cozinha-jantar"), alt: "Cozinha integrada à sala de jantar", kind: "imagens" },
      { src: img("solar-manilha", "cozinha-garden"), alt: "Casal na cozinha com acesso ao garden", kind: "imagens" },
      { src: img("solar-manilha", "area-de-servico-garden"), alt: "Área de serviço e garden", kind: "imagens" },
      { src: img("solar-manilha", "garden"), alt: "Garden da unidade", kind: "imagens" },
      { src: img("solar-manilha", "quarto-casal"), alt: "Quarto de casal decorado", kind: "imagens" },
      { src: img("solar-manilha", "quarto-casal-2"), alt: "Quarto de casal decorado", kind: "imagens" },
      { src: img("solar-manilha", "quarto"), alt: "Quarto decorado", kind: "imagens" },
      { src: img("solar-manilha", "home-office"), alt: "Espaço de home office", kind: "imagens" },
      { src: img("solar-manilha", "apto-tipo-jantar"), alt: "Apartamento tipo — sala de jantar e cozinha", kind: "imagens" },
      { src: img("solar-manilha", "apto-tipo-cozinha"), alt: "Apartamento tipo — cozinha e área de serviço", kind: "imagens" },
      { src: img("solar-manilha", "apto-tipo-vista"), alt: "Apartamento tipo — vista para o condomínio", kind: "imagens" },
      { src: img("solar-manilha", "apto-tipo-quarto-casal"), alt: "Apartamento tipo — quarto de casal", kind: "imagens" },
      { src: img("solar-manilha", "apto-tipo-quarto"), alt: "Apartamento tipo — quarto com beliche", kind: "imagens" },
      { src: img("solar-manilha", "apto-tipo-banheiro"), alt: "Apartamento tipo — banheiro", kind: "imagens" },
      { src: img("solar-manilha", "planta-apartamento-tipo"), alt: "Planta humanizada — apartamento tipo", kind: "planta" },
      { src: img("solar-manilha", "planta-garden"), alt: "Planta humanizada — apartamento garden", kind: "planta" },
    ],
    // Escolha do cliente: a vista do apartamento tipo, ao lado da lista.
    amenitiesImage: img("solar-manilha", "apto-tipo-vista"),
    extraFeatures: [
      { label: "Apartamentos", value: "2 quartos e opções com garden" },
      { label: "Unidades", value: "368" },
      { label: "Lazer", value: "Lazer de clube" },
    ],
    amenities: [
      {
        category: "Características",
        items: [
          "Terreno com área total de 22.572,56 m²",
          "Unidades de 2 quartos e opções com garden",
          "23 blocos no total",
          "Todos os blocos com 4 pavimentos",
          "368 unidades no total",
          "Lazer de clube",
          "275 vagas de carro e 23 vagas de moto",
          "Enquadrado no Minha Casa Minha Vida",
        ],
      },
      {
        category: "Área de lazer",
        items: [
          "Piscina adulto",
          "Piscina infantil",
          "Churrasqueiras",
          "Redário",
          "Salão de festas",
          "Espaço fitness",
          "Quadra",
          "Espaço kids",
        ],
      },
      { category: "Comodidades", items: ["Bicicletário", "Pet place", "Car Wash"] },
      {
        category: "Segurança",
        items: [
          "Guarita 24h",
          "Condomínio fechado com cancela e portão eletrônico para veículos",
          "Câmera nos acessos de veículos e pedestres",
        ],
      },
    ],
  },
  {
    mcmv: true,
    slug: "golden-ville-residence",
    crmId: 2,
    name: "Golden Ville Residence",
    status: "em_construcao",
    city: "Niterói",
    neighborhood: "Maria Paula",
    state: "RJ",
    propertyType: "apartamento",
    summary:
      "Em construção em Maria Paula, Niterói/RJ: 104 apartamentos de 2 quartos com suíte e varanda, em condomínio fechado com lazer completo.",
    description: [
      "Apartamentos de 2 quartos com suíte e varanda.",
      "Lazer completo: piscina, academia, espaço gourmet e salão de festas.",
      "A 10 minutos dos centros de Niterói e São Gonçalo e a 14 km das praias da Região Oceânica.",
      "104 unidades em condomínio fechado, com portaria 24h.",
    ].join("\n"),
    // Grafia do cliente; conferir se o nome oficial é "Figueiredo".
    address: "R. Frederico Malesherbes Figueredo — Maria Paula",
    lat: -22.8750505,
    lng: -43.0312706,
    googleMapsUrl: "https://maps.app.goo.gl/EUBUJ4rRtfSnV5Jv9",
    images: [
      { src: img("golden-ville-residence", "fachada"), alt: "Fachada do Golden Ville Residence", kind: "imagens" },
      { src: img("golden-ville-residence", "piscina"), alt: "Piscina", kind: "imagens" },
      { src: img("golden-ville-residence", "academia"), alt: "Academia", kind: "imagens" },
      { src: img("golden-ville-residence", "salao-de-festas"), alt: "Salão de festas", kind: "imagens" },
      { src: img("golden-ville-residence", "churrasqueira"), alt: "Espaço churrasqueira", kind: "imagens" },
      { src: img("golden-ville-residence", "sala"), alt: "Sala do apartamento (perspectiva)", kind: "imagens" },
      { src: img("golden-ville-residence", "quarto"), alt: "Quarto do apartamento (perspectiva)", kind: "imagens" },
      { src: img("golden-ville-residence", "cozinha"), alt: "Cozinha do apartamento (perspectiva)", kind: "imagens" },
      { src: img("golden-ville-residence", "planta-tipo"), alt: "Planta humanizada — apartamento tipo", kind: "planta" },
      { src: img("golden-ville-residence", "planta-terreo"), alt: "Planta humanizada — térreo", kind: "planta" },
    ],
    extraFeatures: [
      { label: "Apartamentos", value: "2 quartos com suíte" },
      { label: "Unidades", value: "104" },
      { label: "Lazer", value: "Piscina e academia" },
    ],
    // Percentuais informados pelo cliente (2026-10-11): fase inicial — só a
    // fundação aparece.
    progress: {
      overallPercentage: 7,
      stages: [{ name: "Fundação", percentage: 70, order: 1 }],
    },
  },
  {
    slug: "follow-savassi",
    crmId: 3,
    name: "Follow Savassi",
    status: "lancamento",
    city: "Belo Horizonte",
    neighborhood: "Savassi",
    state: "MG",
    // Evidência: alts "Apartamento decorado (unidade 1001/1003/303)".
    propertyType: "apartamento",
    summary:
      "Lançamento na Savassi, em Belo Horizonte/MG: apartamentos de 1 a 3 suítes, rooftop com piscina de borda infinita e projeto de Estela Netto.",
    description: [
      "Rooftop com piscina de borda infinita, espaço fitness e área gourmet.",
      "Automação residencial, janelas acústicas e fechadura eletrônica em todas as unidades.",
      "Localização privilegiada no encontro da Contorno com a Getúlio Vargas, no coração da Savassi.",
      "Projeto arquitetônico assinado por Estela Netto.",
    ].join("\n"),
    address: "Av. Getúlio Vargas, 1.676 — Savassi",
    lat: -19.9393436,
    lng: -43.9383469,
    googleMapsUrl: "https://maps.app.goo.gl/dHHGEKMiT7vVRGxT7",
    locationNote:
      "No encontro da Av. do Contorno com a Getúlio Vargas, no coração da Savassi.",
    images: [
      { src: img("follow-savassi", "fachada-diurna"), alt: "Fachada diurna do Follow Savassi", kind: "imagens" },
      { src: img("follow-savassi", "fachada-noturna"), alt: "Fachada noturna do Follow Savassi", kind: "imagens" },
      { src: img("follow-savassi", "voo-do-passaro"), alt: "Vista aérea do Follow Savassi", kind: "imagens" },
      { src: img("follow-savassi", "rooftop-piscina"), alt: "Piscina no rooftop", kind: "imagens" },
      { src: img("follow-savassi", "rooftop-gourmet"), alt: "Espaço gourmet no rooftop", kind: "imagens" },
      { src: img("follow-savassi", "academia"), alt: "Academia", kind: "imagens" },
      { src: img("follow-savassi", "hall"), alt: "Hall de entrada", kind: "imagens" },
      { src: img("follow-savassi", "apartamento-1001"), alt: "Apartamento decorado (unidade 1001)", kind: "imagens" },
      { src: img("follow-savassi", "apartamento-1003"), alt: "Apartamento decorado (unidade 1003)", kind: "imagens" },
      { src: img("follow-savassi", "apartamento-303"), alt: "Apartamento decorado (unidade 303)", kind: "imagens" },
      { src: img("follow-savassi", "suite-702"), alt: "Suíte decorada (unidade 702)", kind: "imagens" },
      { src: img("follow-savassi", "rooftop-terraco"), alt: "Terraço no rooftop", kind: "imagens" },
    ],
    // Chips do card — recorte curto do que o accordion detalha na página.
    extraFeatures: [
      { label: "Apartamentos", value: "1 a 3 suítes" },
      { label: "Área", value: "37 a 168 m²" },
      { label: "Lazer", value: "Rooftop com piscina" },
    ],
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
        items: ["Rooftop com piscina de borda infinita", "Espaço fitness", "Área gourmet"],
      },
      {
        category: "Comodidades",
        items: ["Automação residencial", "Janelas acústicas", "Fechadura eletrônica"],
      },
      { category: "Segurança", items: ["Portaria eletrônica 24h"] },
    ],
    // Percentuais informados pelo cliente (2026-10-11).
    progress: {
      overallPercentage: 70,
      stages: [
        { name: "Fundação", percentage: 100, order: 1 },
        { name: "Estrutura", percentage: 100, order: 2 },
        { name: "Alvenaria", percentage: 90, order: 3 },
        { name: "Acabamento interno", percentage: 60, order: 4 },
        { name: "Acabamento externo", percentage: 50, order: 5 },
      ],
    },
  },
  {
    mcmv: true,
    soldOut: true,
    slug: "viver-mais",
    name: "Viver Mais",
    status: "pronto",
    city: "Itaboraí",
    state: "RJ",
    propertyType: "apartamento", // confirmado pelo cliente (2026-10-17)
    summary:
      "Condomínio entregue em Itaboraí/RJ: 256 unidades, 100% concluídas e vendidas, enquadrado no Minha Casa Minha Vida.",
    description: [
      "256 unidades entregues, 100% concluídas e vendidas.",
      "Condomínio implantado em um terreno de 19.000 m².",
      "Enquadrado no Minha Casa Minha Vida.",
      "Em uma das regiões que mais se transformam no Leste Fluminense.",
    ].join("\n"),
    address: "R. Arlindo Chaves",
    lat: -22.7449167,
    lng: -42.8748549,
    googleMapsUrl: "https://maps.app.goo.gl/eVkGqDbUasgrSRx77",
    extraFeatures: [
      { label: "Unidades", value: "256" },
      { label: "Terreno", value: "19.000 m²" },
    ],
    images: [
      { src: img("viver-mais", "lazer"), alt: "Área de lazer do Residencial Viver Mais", kind: "imagens" },
      { src: img("viver-mais", "perspectiva-2"), alt: "Perspectiva do Residencial Viver Mais", kind: "imagens" },
      { src: img("viver-mais", "perspectiva-3"), alt: "Perspectiva do Residencial Viver Mais", kind: "imagens" },
      { src: img("viver-mais", "perspectiva-4"), alt: "Perspectiva do Residencial Viver Mais", kind: "imagens" },
      { src: img("viver-mais", "perspectiva-5"), alt: "Perspectiva do Residencial Viver Mais", kind: "imagens" },
      { src: img("viver-mais", "perspectiva-6"), alt: "Perspectiva do Residencial Viver Mais", kind: "imagens" },
      { src: img("viver-mais", "obra-1"), alt: "Obra do Residencial Viver Mais", kind: "obra" },
      { src: img("viver-mais", "obra-2"), alt: "Obra do Residencial Viver Mais", kind: "obra" },
      { src: img("viver-mais", "obra-estrutura-1"), alt: "Estrutura em construção", kind: "obra" },
      { src: img("viver-mais", "obra-3"), alt: "Andamento da obra", kind: "obra" },
    ],
  },
  {
    soldOut: true,
    slug: "residencial-denver",
    name: "Residencial Denver",
    status: "pronto",
    city: "Belo Horizonte",
    neighborhood: "Santa Lúcia",
    state: "MG",
    // Evidência: "14 studios de 35 m²".
    propertyType: "studio",
    summary:
      "Empreendimento entregue no Santa Lúcia, região Centro-Sul de Belo Horizonte/MG: 14 studios de 35 m².",
    description: [
      "14 studios de 35 m².",
      "Empreendimento entregue, na região Centro-Sul de Belo Horizonte.",
    ].join("\n"),
    address: "R. Denver, 134 — Santa Lúcia",
    lat: -19.9708652,
    lng: -43.9492618,
    googleMapsUrl: "https://share.google/o1T6FdB69kOFKwHfU",
    extraFeatures: [{ label: "Studios", value: "14 de 35 m²" }],
    images: [
      { src: img("residencial-denver", "perspectiva-2"), alt: "Perspectiva do Residencial Denver", kind: "imagens" },
      { src: img("residencial-denver", "perspectiva-4"), alt: "Perspectiva do Residencial Denver", kind: "imagens" },
      { src: img("residencial-denver", "perspectiva-5"), alt: "Perspectiva do Residencial Denver", kind: "imagens" },
      { src: img("residencial-denver", "perspectiva-6"), alt: "Perspectiva do Residencial Denver", kind: "imagens" },
      { src: img("residencial-denver", "perspectiva-1"), alt: "Perspectiva do Residencial Denver", kind: "imagens" },
      { src: img("residencial-denver", "perspectiva-3"), alt: "Perspectiva do Residencial Denver", kind: "obra" },
    ],
  },
  {
    mcmv: true,
    soldOut: true,
    slug: "torres-da-lagoa",
    name: "Torres da Lagoa",
    status: "pronto",
    city: "Lagoa Santa",
    state: "MG",
    // Evidência: "112 apartamentos entregues".
    propertyType: "apartamento",
    summary:
      "Empreendimento entregue em Lagoa Santa/MG: 112 apartamentos, todas as unidades comercializadas, enquadrado no Minha Casa Minha Vida.",
    description: [
      "112 apartamentos entregues.",
      "Todas as unidades comercializadas.",
      "Enquadrado no Minha Casa Minha Vida.",
      "Realização em parceria com a Escon Engenharia.",
    ].join("\n"),
    address: "R. Firmino Gonçalves, 822 — Palmital",
    lat: -19.5941515,
    lng: -43.9049008,
    googleMapsUrl: "https://maps.app.goo.gl/PtHEBjT8E74Qiqyk7",
    extraFeatures: [{ label: "Apartamentos", value: "112" }],
    images: [
      { src: img("torres-da-lagoa", "fachada"), alt: "Fachada dos blocos do Torres da Lagoa", kind: "imagens" },
      { src: img("torres-da-lagoa", "piscina"), alt: "Piscina do Torres da Lagoa", kind: "imagens" },
      { src: img("torres-da-lagoa", "espaco-gourmet"), alt: "Espaço gourmet", kind: "imagens" },
      { src: img("torres-da-lagoa", "guarita"), alt: "Guarita e entrada", kind: "imagens" },
      { src: img("torres-da-lagoa", "sala"), alt: "Sala decorada", kind: "imagens" },
      { src: img("torres-da-lagoa", "cozinha"), alt: "Cozinha decorada", kind: "imagens" },
      { src: img("torres-da-lagoa", "quarto"), alt: "Quarto decorado", kind: "imagens" },
      { src: img("torres-da-lagoa", "varanda-gourmet"), alt: "Varanda gourmet", kind: "imagens" },
      { src: img("torres-da-lagoa", "planta-tipo"), alt: "Planta humanizada — apartamento tipo", kind: "planta" },
    ],
  },
  {
    soldOut: true,
    slug: "residenziale-colonnello-figueiredo",
    name: "Residenziale Colonnello Figueiredo",
    status: "pronto",
    city: "Nova Lima",
    neighborhood: "Pau Pombo",
    state: "MG",
    // Evidência: feature "Apartamentos: 2 e 3 quartos" + plantas de 2 e 3 quartos.
    propertyType: "apartamento",
    summary:
      "Residencial em Nova Lima/MG com 20 unidades — apartamentos de 2 e 3 quartos e coberturas lineares, a 10 minutos do BH Shopping.",
    description: [
      "20 unidades: apartamentos de 2 e 3 quartos e coberturas lineares.",
      "Varandas em todas as unidades.",
      "A 10 minutos do BH Shopping, próximo ao Supermercado BH.",
    ].join("\n"),
    address: "R. Manoel Moreira Silva, 70 — Pau Pombo",
    lat: -19.9989298,
    lng: -43.8911786,
    googleMapsUrl: "https://share.google/75yhAO11Zp8Wl2vsS",
    extraFeatures: [
      { label: "Apartamentos", value: "2 e 3 quartos (69 e 79 m²)" },
      { label: "Coberturas", value: "lineares 138 e 158 m²" },
    ],
    images: [
      { src: img("residenziale-colonnello-figueiredo", "fachada-rua"), alt: "Fachada vista da rua", kind: "imagens" },
      { src: img("residenziale-colonnello-figueiredo", "cobertura-fachada"), alt: "Cobertura — vista da fachada", kind: "imagens" },
      { src: img("residenziale-colonnello-figueiredo", "cobertura"), alt: "Cobertura", kind: "imagens" },
      { src: img("residenziale-colonnello-figueiredo", "sala-de-estar"), alt: "Sala de estar (perspectiva)", kind: "imagens" },
      { src: img("residenziale-colonnello-figueiredo", "sala-de-estar-2"), alt: "Sala de estar (perspectiva)", kind: "imagens" },
      { src: img("residenziale-colonnello-figueiredo", "fachada"), alt: "Fachada do Residenziale Colonnello Figueiredo", kind: "imagens" },
      { src: img("residenziale-colonnello-figueiredo", "planta-3-quartos"), alt: "Planta — apartamento de 3 quartos", kind: "planta" },
      { src: img("residenziale-colonnello-figueiredo", "planta-2-quartos"), alt: "Planta — apartamento de 2 quartos", kind: "planta" },
    ],
  },
  // Breve lançamento: fase embrionária, seção mínima com a foto padrão. As
  // maquetes do Gutierrez seguem em public/empreendimentos/gutierrez/ para
  // voltarem quando o lançamento tiver material aprovado.
  { slug: "gutierrez", name: "Mirante Gutierrez", status: "breve_lancamento", city: "Belo Horizonte", state: "MG", highlight: "20 un. alto luxo", propertyType: "apartamento" },
  // Evidência: highlight "180 studios".
  { slug: "one-studios", name: "One Studios", status: "breve_lancamento", city: "Niterói", state: "RJ", highlight: "180 studios", propertyType: "studio" },
  { mcmv: true, slug: "sunset-ville-residence", name: "Sunset Ville Residence", status: "breve_lancamento", city: "Belo Horizonte", state: "MG", highlight: "72 un. MCMV", propertyType: "apartamento" },
  // Evidência: highlight "96 casas MCMV".
  { mcmv: true, slug: "royal-ville-residence", name: "Royal Ville Residence", status: "breve_lancamento", city: "Vespasiano", state: "MG", highlight: "96 casas MCMV", propertyType: "casa" },
];

const DIMENSIONS: Record<string, readonly number[]> = dimensions;

/** Anexa largura/altura do manifesto (scripts/optimize-images.mjs). */
function withDimensions(image: DevelopmentImage): DevelopmentImage {
  const size = DIMENSIONS[image.src];
  return size ? { ...image, width: size[0], height: size[1] } : image;
}

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
      ...(seed.neighborhood ? { neighborhood: seed.neighborhood } : {}),
      ...(seed.address ? { address: seed.address } : {}),
      ...(seed.postalCode ? { postalCode: seed.postalCode } : {}),
      ...(seed.lat != null ? { lat: seed.lat } : {}),
      ...(seed.lng != null ? { lng: seed.lng } : {}),
      ...(seed.googleMapsUrl ? { googleMapsUrl: seed.googleMapsUrl } : {}),
      ...(seed.locationNote ? { note: seed.locationNote } : {}),
    },
    ...(seed.propertyType ? { propertyType: seed.propertyType } : {}),
    ...(seed.mcmv ? { mcmv: true } : {}),
    ...(seed.soldOut ? { soldOut: true } : {}),
    ...(seed.crmId ? { crmId: seed.crmId } : {}),
    // Sem resumo (breve lançamento): uma frase montada só do que o seed sabe.
    // Ela é a descrição da página no Google, então nunca leva o TODO.
    summary:
      seed.summary ??
      `${seed.name}: breve lançamento do Grupo Natus em ${seed.city}/${seed.state}${seed.highlight ? ` — ${seed.highlight}` : ""}.`,
    description: seed.description ?? `${TODO} — descrição completa de ${seed.name}`,
    images: (seed.images ?? []).map(withDimensions),
    features,
    ...(seed.amenities ? { amenities: seed.amenities } : {}),
    ...(seed.amenitiesImage ? { amenitiesImage: seed.amenitiesImage } : {}),
    ...(seed.progress ? { progress: seed.progress } : {}),
  };
}

export const developments: readonly Development[] = SEEDS.map(fromSeed);
