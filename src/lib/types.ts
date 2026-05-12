export type SectionSlug =
  | "rebought"
  | "currently-using"
  | "wishlist"
  | "perfume-moods"
  | "makeup-bag"
  | "shelf";

/** Mirrors `data/products.json` — single source of truth for catalog data. */
export type Product = {
  id: string;
  name: string;
  section: SectionSlug;
  category: string;
  review: string;
  tags: string[];
  affiliateLink: string;
  image: string;
  mood: string | null;
  rebought: boolean;
  wishlist: boolean;
};

export type SectionMeta = {
  slug: SectionSlug;
  label: string;
  headline: string;
  subline: string;
  ambient: string;
};
