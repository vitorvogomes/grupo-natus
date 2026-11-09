import { describe, expect, it } from "vitest";
import type { NewsEdition } from "@/types/news";
import { getDevelopmentBySlug } from "@/content/developments";
import dimensions from "@/content/image-dimensions.json";
import { editions as seed } from "./data";
import { getAllEditions } from "./index";

const MANIFEST: Record<string, readonly number[]> = dimensions;

/** Todo texto da edição, para as checagens de conteúdo. */
function allText(edition: NewsEdition): string {
  return JSON.stringify(edition);
}

describe("Natus News: conteúdo das edições", () => {
  const editions = getAllEditions();

  it("o índice expõe todas as edições do seed", () => {
    expect(editions).toHaveLength(seed.length);
  });

  it("publica a Edição 0 em /news/edicao-0", () => {
    expect(editions.map((e) => e.slug)).toContain("edicao-0");
  });

  it.each(editions.map((e) => [e.slug, e] as const))(
    "%s: data ISO, slug de URL e resumo do tamanho de uma meta description",
    (_, edition) => {
      expect(edition.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(edition.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(edition.publishedAt))).toBe(false);
      expect(edition.description.length).toBeGreaterThanOrEqual(50);
      expect(edition.description.length).toBeLessThanOrEqual(200);
    },
  );

  it.each(editions.map((e) => [e.slug, e] as const))(
    "%s: nenhuma variável do ActiveCampaign nem TODO na página",
    (_, edition) => {
      // %FIRSTNAME%, %WEBCOPY%, %UNSUBSCRIBELINK%… só fazem sentido no e-mail.
      expect(allText(edition)).not.toMatch(/%[A-Z_]+%/);
      expect(allText(edition)).not.toMatch(/TODO/);
      expect(allText(edition)).not.toMatch(/ver no navegador|não quero mais receber/i);
    },
  );

  it.each(editions.map((e) => [e.slug, e] as const))(
    "%s: imagens servidas pelo site, com as dimensões do manifesto",
    (_, edition) => {
      const images = [edition.banner, ...edition.updates.items.map((u) => u.image)];
      for (const image of images) {
        // Nada do provedor de e-mail: seria um terceiro sem consentimento.
        expect(image.src, image.src).toMatch(new RegExp(`^/news/${edition.slug}/[a-z0-9-]+\\.webp$`));
        expect(MANIFEST[image.src], image.src).toEqual([image.width, image.height]);
        expect(image.alt.length, image.src).toBeGreaterThan(10);
      }
    },
  );

  it.each(editions.map((e) => [e.slug, e] as const))(
    "%s: o rótulo de cada novidade termina na cidade/UF do cadastro do empreendimento",
    (_, edition) => {
      for (const update of edition.updates.items) {
        const { city, state } = getDevelopmentBySlug(update.developmentSlug)!.location;
        expect(update.eyebrow, update.developmentSlug).toMatch(
          new RegExp(`${`${city}/${state}`.toUpperCase()}$`),
        );
      }
    },
  );

  it.each(editions.map((e) => [e.slug, e] as const))(
    "%s: links externos em https e empreendimentos que existem no portfólio",
    (_, edition) => {
      for (const item of edition.radar.items) expect(item.url).toMatch(/^https:\/\//);
      expect(edition.invite.cta.href).toMatch(/^https:\/\//);
      for (const update of edition.updates.items) {
        expect(getDevelopmentBySlug(update.developmentSlug), update.developmentSlug).toBeDefined();
      }
    },
  );
});
