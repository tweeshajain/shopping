import productsJson from "../../data/products.json";
import type { Product, SectionSlug } from "./types";

const SECTION_SLUGS = new Set<SectionSlug>([
  "the-ritual",
  "the-glow-edit",
  "scent-moods",
  "basically-mine"
]);

function parseProducts(raw: unknown): Product[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((row) => {
      const r = row as Record<string, unknown>;
      const section = r.section;

      if (typeof section !== "string" || !SECTION_SLUGS.has(section as SectionSlug)) {
        return null;
      }

      return {
        id: String(r.id ?? ""),
        name: String(r.name ?? ""),
        section: section as SectionSlug,
        category: String(r.category ?? "Beauty object"),
        review: String(r.review ?? ""),
        tags: Array.isArray(r.tags)
          ? r.tags.filter((tag): tag is string => typeof tag === "string")
          : [],
        affiliateLink: String(r.affiliateLink ?? ""),
        image: String(r.image ?? ""),
        mood: typeof r.mood === "string" ? r.mood : null,
        rebought: Boolean(r.rebought),
        wishlist: Boolean(r.wishlist)
      } satisfies Product;
    })
    .filter((product): product is Product => Boolean(product?.id && product.name));
}

export const PRODUCTS = parseProducts(productsJson);

export function productsForSection(slug: SectionSlug) {
  return PRODUCTS.filter((product) => product.section === slug);
}

export function productsForHomeWhispers() {
  const priority = ["r3", "p5", "c1", "w1"];
  const byId = new Map(PRODUCTS.map((product) => [product.id, product]));

  return priority
    .map((id) => byId.get(id))
    .filter((product): product is Product => Boolean(product));
}
