import { describe, expect, it } from "vitest";
import { readPageContext } from "./pageContext";

describe("readPageContext", () => {
  it("leva a página e só os parâmetros UTM do anúncio", () => {
    expect(
      readPageContext({
        pathname: "/empreendimentos/solar-manilha",
        search: "?utm_source=facebook&utm_campaign=solar&fbclid=abc&utm_term=",
      }),
    ).toEqual({
      pagina: "/empreendimentos/solar-manilha",
      utm_source: "facebook",
      utm_campaign: "solar",
    });
  });

  it("corta valores longos (o servidor recusaria acima de 200)", () => {
    const ctx = readPageContext({ pathname: "/x", search: `?utm_content=${"a".repeat(300)}` });
    expect(ctx.utm_content).toHaveLength(200);
  });
});
