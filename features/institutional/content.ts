import {
  Award,
  Building2,
  Compass,
  Gauge,
  Handshake,
  KeyRound,
  Scale,
  ShieldCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Textos institucionais fornecidos pelo cliente (revisão v3, 2026-10-11).
 * Fonte única para Quem Somos e Engenharia: as duas páginas citam as mesmas
 * empresas, valores e certificações, e uma cópia em cada uma divergiria na
 * primeira revisão de texto.
 */

export type Company = {
  name: string;
  role: string;
  icon: LucideIcon;
  description: string;
};

export const ALIATTO: Company = {
  name: "Aliatto Incorporadora",
  role: "Incorporação imobiliária",
  icon: Building2,
  description:
    "Da prospecção do terreno ao lançamento: estudo de viabilidade, definição do produto, aprovação e comercialização.",
};

export const OASI: Company = {
  name: "Oasi Engenharia",
  role: "Engenharia e execução de obras",
  icon: Compass,
  description:
    "Do canteiro à entrega das chaves: planejamento, execução e controle de obra, com custo previsível e cronograma cumprido.",
};

export const COMPANIES: readonly Company[] = [ALIATTO, OASI];

export const COMPANIES_TAGLINE =
  "Duas empresas, um ciclo completo: a Aliatto estrutura o empreendimento, a Oasi executa a obra.";

export type Value = { label: string; icon: LucideIcon; description: string };

// Qualidade certificada não é um valor aqui: tem o bloco próprio de
// Certificações, e listá-la nos dois repetiria a informação.
export const VALUES = {
  transparencia: {
    label: "Transparência",
    icon: ShieldCheck,
    description:
      "Informação clara para clientes, parceiros e investidores, do contrato à entrega das chaves.",
  },
  etica: {
    label: "Ética",
    icon: Scale,
    description:
      "Conduta íntegra na negociação do terreno, na obra e no pós-venda.",
  },
  lealdade: {
    label: "Lealdade",
    icon: Handshake,
    description:
      "Relações de longo prazo com quem compra, investe e constrói com a gente.",
  },
  eficiencia: {
    label: "Eficiência",
    icon: Gauge,
    description:
      "Custo previsível e cronograma cumprido, em qualquer segmento.",
  },
  metodo: {
    label: "Método",
    icon: Workflow,
    description:
      "O mesmo processo do MCMV ao alto luxo: o produto muda, o rigor de execução não.",
  },
  parceria: {
    label: "Parceria",
    icon: Users,
    description:
      "Empreendimentos estruturados junto a proprietários de terreno, construtores e investidores.",
  },
} as const satisfies Record<string, Value>;

export type Certification = {
  title: string;
  logo: { src: string; alt: string; width: number; height: number };
  description: string;
};

export const CERTIFICATIONS_TAGLINE =
  "Processos auditados por organismos independentes, da gestão à obra.";

export const CERTIFICATIONS: readonly Certification[] = [
  {
    title: "NBR ISO 9001:2015",
    logo: {
      src: "/quem-somos/iso-9001.webp",
      alt: "Selo de Sistema de Gestão da Qualidade certificado NBR ISO 9001:2015",
      width: 395,
      height: 150,
    },
    description:
      "Sistema de Gestão da Qualidade certificado conforme a norma internacional, com auditorias periódicas de processos.",
  },
  {
    title: "PBQP-H · SiAC Nível A",
    logo: {
      src: "/quem-somos/pbqp-h.webp",
      alt: "Selo PBQP-H — Programa Brasileiro da Qualidade e Produtividade do Habitat",
      width: 600,
      height: 384,
    },
    description:
      "Certificação no programa federal de qualidade da construção habitacional, exigida para obras do Minha Casa Minha Vida.",
  },
];

export type OperationStat = {
  icon: LucideIcon;
  value: string;
  /** Unidade junto do número (Home: "10 anos"). */
  unit?: string;
  /** Complemento após o número (Home: "de experiência"). */
  label: string;
  /** Rótulo autônomo, acima do número (Quem Somos: "Anos de experiência"). */
  title: string;
};

/**
 * Números da operação (empresa, 2026-09-30; unidades revistas em 2026-10-11).
 * O "10" é literal, não calculado a partir de 2016: data no render traria
 * divergência servidor/cliente e teste não determinístico. Revisar em 2027.
 */
export const OPERATION_STATS: readonly OperationStat[] = [
  {
    icon: Award,
    value: "10",
    unit: "anos",
    label: "de experiência",
    title: "Anos de experiência",
  },
  {
    icon: Building2,
    value: "100 mil",
    unit: "m²",
    label: "de área construída",
    title: "Área construída (m²)",
  },
  {
    icon: KeyRound,
    value: "+500",
    label: "unidades entregues",
    title: "Unidades entregues",
  },
];
