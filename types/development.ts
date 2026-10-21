/**
 * Modelo do empreendimento (entidade central — AD-2).
 * Shape canônico: PRD §4. Fonte de verdade estática em content/developments.
 */

/**
 * Status do portfólio. A ordem é a prioridade de exibição: lançamentos são os
 * destaques (página completa), "breve lançamento" é a fase embrionária (seção
 * mínima). "100% vendido" não é status — é a marca `soldOut` sobre "pronto".
 */
export const DEVELOPMENT_STATUSES = [
  "lancamento",
  "em_construcao",
  "pronto",
  "breve_lancamento",
] as const;

export type DevelopmentStatus = (typeof DEVELOPMENT_STATUSES)[number];

/**
 * Tipo de produto do empreendimento — faceta de busca do catálogo.
 * Só é preenchido quando há evidência no material do próprio empreendimento
 * (tipologia declarada, plantas, alt das imagens); nunca por suposição.
 */
export const PROPERTY_TYPES = [
  "apartamento",
  "casa",
  "lote",
  "studio",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  apartamento: "Apartamentos",
  casa: "Casas",
  lote: "Lotes",
  studio: "Studios",
};

type StatusMeta = {
  readonly label: string;
};

export const STATUS_META: Record<DevelopmentStatus, StatusMeta> = {
  lancamento: {
    label: "Lançamento",
  },
  em_construcao: {
    label: "Em construção",
  },
  pronto: {
    label: "Pronto para morar",
  },
  breve_lancamento: {
    label: "Breve lançamento",
  },
};

/**
 * Categorias de contexto da galeria (abas). A ordem aqui é a ordem das abas —
 * derivar da ordem de aparição no dado faria a mesma galeria trocar de ordem
 * conforme alguém reorganizasse o array de imagens.
 *
 * "imagens" cobre render externo, área comum e interior: a separação
 * externa/apartamento que existia antes dividia o acervo em duas abas quase
 * idênticas (34 contra 18) sem ajudar a escolher. Aba de vídeo entra quando
 * houver arquivo.
 */
export const DEVELOPMENT_IMAGE_KINDS = ["imagens", "planta", "obra"] as const;

export type DevelopmentImageKind = (typeof DEVELOPMENT_IMAGE_KINDS)[number];

export const IMAGE_KIND_LABELS: Record<DevelopmentImageKind, string> = {
  imagens: "Imagens",
  planta: "Plantas",
  obra: "Obra",
};

export type DevelopmentImage = {
  src: string;
  alt: string;
  kind?: DevelopmentImageKind;
  /** Dimensões do arquivo (manifesto do pipeline) — usadas no `sizes`. */
  width?: number;
  height?: number;
};

export type DevelopmentFeature = {
  label: string;
  value?: string;
};

export type DevelopmentLocation = {
  city: string;
  state: string;
  /** Bairro — compõe o título do resumo ("Bairro - Cidade"). */
  neighborhood?: string;
  address?: string;
  /** CEP (formato 00000-000). */
  postalCode?: string;
  lat?: number;
  lng?: number;
  googleMapsUrl?: string;
  /** Texto curto sobre o entorno/bairro, exibido na seção Localização. */
  note?: string;
};

export type ConstructionStage = {
  name: string;
  percentage: number;
  order: number;
};

export type ConstructionProgress = {
  overallPercentage: number;
  /** ISO 8601. Opcional: o site oficial nem sempre informa a data. */
  updatedAt?: string;
  stages: ConstructionStage[];
  /** true = dados ilustrativos/mock (a UI rotula; nunca apresentar como real). */
  isPreview?: boolean;
};

/** Grupo de itens do bloco "O que o empreendimento oferece". */
export type DevelopmentAmenityGroup = {
  category: string;
  items: string[];
};

export type Development = {
  slug: string;
  name: string;
  status: DevelopmentStatus;
  location: DevelopmentLocation;
  /** Tipo de produto (faceta de busca). Ausente = ainda não confirmado. */
  propertyType?: PropertyType;
  /**
   * Enquadrado no Minha Casa, Minha Vida. Preencher só com evidência no
   * material: exibir a marca federal num empreendimento fora do programa
   * sugere credenciamento que não existe.
   */
  mcmv?: boolean;
  /**
   * 100% vendido. Só faz sentido em "pronto" (o teste de conteúdo garante):
   * vira uma faixa no card (`SoldOutBand`), não um badge a mais.
   */
  soldOut?: boolean;
  /**
   * `idempreendimento` no CV CRM: liga o lead do formulário ao empreendimento
   * certo. Ausente = o lead entra no CRM sem empreendimento.
   */
  crmId?: number;
  /** Tipologia curta para o hero (ex.: "2 e 3 quartos"). */
  tagline?: string;
  summary: string;
  description: string;
  images: DevelopmentImage[];
  features: DevelopmentFeature[];
  /** Diferenciais agrupados por categoria (accordion). */
  amenities?: DevelopmentAmenityGroup[];
  /**
   * `src` da imagem ao lado do accordion (uma de `images`). Ausente = a
   * terceira imagem, para nenhuma foto repetir na rolagem.
   */
  amenitiesImage?: string;
  /** URL de vídeo de apresentação ("assista ao vídeo"). */
  videoUrl?: string;
  progress?: ConstructionProgress;
  contact?: { whatsappMessage?: string };
};
