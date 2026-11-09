import type { NewsEdition, NewsImage } from "@/types/news";
import dimensions from "@/content/image-dimensions.json";

/**
 * Edições da Natus News publicadas no site. O texto é o do e-mail enviado pelo
 * ActiveCampaign (`img/news/<slug>/*.html`), sem reescrita; saem só as
 * variáveis e os links que fazem sentido apenas no e-mail ("Ver no navegador",
 * descadastro, %FIRSTNAME%). As imagens são baixadas para `img/news/<slug>/` e
 * otimizadas com `npm run optimize:images news`.
 */

const DIMENSIONS: Record<string, readonly number[]> = dimensions;

/** Imagem com as dimensões do manifesto; sem ele, a edição não carrega. */
function newsImage(src: string, alt: string): NewsImage {
  const [width, height] = DIMENSIONS[src] ?? [];
  if (width === undefined || height === undefined) {
    throw new Error(`Imagem fora do manifesto (rode npm run optimize:images news): ${src}`);
  }
  return { src, alt, width, height };
}

const edicao0: NewsEdition = {
  slug: "edicao-0",
  label: "Edição 0",
  monthLabel: "novembro de 2026",
  publishedAt: "2026-11-09",
  description:
    "Selic, crédito, vendas em BH e no Rio e as novidades das obras da Natus.",
  banner: newsImage(
    "/news/edicao-0/banner.webp",
    "Natus News, edição 0, novembro de 2026: o mercado imobiliário e a Natus, todo mês no seu e-mail",
  ),
  intro: [
    ["Boas-vindas à primeira edição da ", { strong: "Natus News" }, ", a newsletter mensal do Grupo Natus."],
    [
      "Todo mês, você recebe aqui um resumo do que movimentou o mercado imobiliário e as principais novidades dos nossos empreendimentos em Minas Gerais e no Rio de Janeiro.",
    ],
  ],
  stats: [
    { value: "10 anos", label: "de mercado em MG e no RJ" },
    { value: "100 mil m²", label: "construídos" },
    { value: "+500", label: "unidades entregues" },
  ],
  radar: {
    eyebrow: "RADAR NATUS",
    title: "O que movimentou o mercado",
    items: [
      {
        headline: "Selic faz uma pausa em 13,75%.",
        text: "No dia 4 de novembro, o Copom manteve a taxa, depois de cinco cortes seguidos que a trouxeram de 15% para 13,75%. A próxima reunião é em 8 e 9 de dezembro.",
        source: "Copom / Banco Central",
        url: "https://soubrasilia.com/copom-mantem-selic-13-75-unanimidade-4-novembro-2026/",
      },
      {
        headline: "Crédito imobiliário cresce 46,6% em agosto.",
        text: "Os financiamentos com recursos da poupança somaram R$ 16,97 bilhões no mês, o terceiro melhor agosto em 25 anos. No ano, já são R$ 132,5 bilhões, alta de 37,5%.",
        source: "Abecip",
        url: "https://www.jornaldocomercio.com/economia/2026/09/1265219-credito-imobiliario-totaliza-rs-1697-bilhoes-em-agosto-alta-de-466-em-um-ano-diz-abecip.html",
      },
      {
        headline: "Imóveis valorizam acima da inflação.",
        text: "Em outubro, o preço dos imóveis residenciais subiu 0,48% no país e acumula 5,44% em 12 meses, contra 4,82% do IPCA. No Rio, a alta em 12 meses chegou a 5,80%.",
        source: "Índice FipeZap",
        url: "https://bpmoney.com.br/educacao-financeira/preco-imoveis-sobe-048-outubro-cidades-mais-caras-fipezap/",
      },
      {
        headline: "BH volta a subir.",
        text: "Depois de dois meses de queda, o preço dos imóveis em Belo Horizonte voltou a subir em setembro. O metro quadrado médio na capital mineira é de R$ 10.686, acima da média nacional.",
        source: "Índice FipeZap",
        url: "https://diariodocomercio.com.br/economia/preco-imoveis-bh-setembro-2026/",
      },
      {
        headline: "FGTS garante R$ 144,5 bilhões para habitação em 2027.",
        text: "O Conselho Curador manteve o orçamento de habitação para o próximo ano, com R$ 13 bilhões em subsídios para o Minha Casa Minha Vida.",
        source: "Conselho Curador do FGTS",
        url: "https://www.folhape.com.br/economia/fgts-aprova-orcamento-de-r-1445-bilhoes-para-habitacao-em-2027/521423/",
      },
    ],
  },
  updates: {
    eyebrow: "NATUS NO MÊS",
    title: "Como estão os nossos empreendimentos",
    items: [
      {
        developmentSlug: "golden-ville-residence",
        eyebrow: "GOLDEN VILLE · MARIA PAULA, SÃO GONÇALO/RJ",
        headline: "Começou a primeira laje.",
        text: "O prédio terá 15 pavimentos, 2 de garagem e 13 de apartamentos, somando 104 unidades de 2 quartos com suíte no Minha Casa Minha Vida.",
        image: newsImage("/news/edicao-0/golden-ville-obra.webp", "Montagem da primeira laje do Golden Ville"),
      },
      {
        developmentSlug: "follow-savassi",
        eyebrow: "FOLLOW SAVASSI · BELO HORIZONTE/MG",
        headline: "Brises e pintura na fachada.",
        text: "A fachada recebeu a instalação dos brises e a pintura, e o prédio de alto padrão no encontro da Contorno com a Getúlio Vargas segue para a entrega, prevista para fevereiro de 2027.",
        image: newsImage("/news/edicao-0/follow-savassi-obra.webp", "Fachada do Follow Savassi com brises e pintura"),
      },
      {
        developmentSlug: "solar-manilha",
        eyebrow: "SOLAR MANILHA · ITABORAÍ/RJ",
        headline: "Começou a obra do stand.",
        text: "O stand de vendas do Solar Manilha está em construção, e o condomínio clube, com 368 unidades, tem lançamento previsto para o início de março de 2027.",
        image: newsImage("/news/edicao-0/solar-manilha-stand.webp", "Início da obra do stand de vendas do Solar Manilha"),
      },
    ],
  },
  invite: {
    eyebrow: "INVISTA COM A NATUS",
    title: "Quer ter acesso a oportunidades de investimento no mercado imobiliário?",
    text: "A Natus está abrindo oportunidades para investir junto com a gente nos nossos empreendimentos. Preencha o cadastro e receba as próximas oportunidades em primeira mão. Leva menos de 5 minutos.",
    cta: { label: "QUERO RECEBER AS OPORTUNIDADES", href: "https://forms.gle/xgUsDXcV7P4LKzmc9" },
  },
  closing: {
    signature: "GRUPO NATUS",
    lines: [
      "Natus News é a newsletter mensal do Grupo Natus.",
      "Este conteúdo é informativo e não constitui oferta pública de valores mobiliários nem recomendação de investimento.",
    ],
  },
};

export const editions: readonly NewsEdition[] = [edicao0];
