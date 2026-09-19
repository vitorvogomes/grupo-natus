/**
 * Modelo do empreendimento (entidade central — AD-2).
 * Shape canônico: PRD §4. Fonte de verdade estática em content/developments.
 */

export const DEVELOPMENT_STATUSES = [
  "lancamento",
  "em_construcao",
  "pronto",
] as const;

export type DevelopmentStatus = (typeof DEVELOPMENT_STATUSES)[number];

type StatusMeta = {
  readonly label: string;
  /** Classe Tailwind de fundo derivada dos tokens de status (AD-7). */
  readonly badgeClassName: string;
};

export const STATUS_META: Record<DevelopmentStatus, StatusMeta> = {
  lancamento: {
    label: "Lançamento",
    badgeClassName: "bg-status-lancamento text-white",
  },
  em_construcao: {
    label: "Em construção",
    badgeClassName: "bg-status-em-construcao text-white",
  },
  pronto: {
    label: "Pronto para morar",
    badgeClassName: "bg-status-pronto text-white",
  },
};

// Categorias de contexto da galeria (abas), inspiradas no site atual.
export type DevelopmentImageKind =
  | "externa"
  | "apartamento"
  | "planta"
  | "obra";

export type DevelopmentImage = {
  src: string;
  alt: string;
  kind?: DevelopmentImageKind;
};

export type DevelopmentFeature = {
  label: string;
  value?: string;
};

export type DevelopmentLocation = {
  city: string;
  state: string;
  address?: string;
  lat?: number;
  lng?: number;
  googleMapsUrl?: string;
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
  /** Tipologia curta para o hero (ex.: "2 e 3 quartos"). */
  tagline?: string;
  summary: string;
  description: string;
  images: DevelopmentImage[];
  features: DevelopmentFeature[];
  /** Destaques do empreendimento (bullets da seção de visão geral). */
  highlights?: string[];
  /** Diferenciais agrupados por categoria (accordion). */
  amenities?: DevelopmentAmenityGroup[];
  /** URL de vídeo de apresentação ("assista ao vídeo"). */
  videoUrl?: string;
  /** PDF de apresentação para download. */
  presentationUrl?: string;
  progress?: ConstructionProgress;
  contact?: { whatsappMessage?: string };
  seo?: { title?: string; description?: string; ogImage?: string };
};
