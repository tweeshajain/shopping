import type { SectionMeta, SectionSlug } from "./types";

export type { SectionSlug };

export const SECTIONS: SectionMeta[] = [
  {
    slug: "rebought",
    label: "Rebought",
    headline: "The objects that keep earning their place.",
    subline:
      "Not backups. Not bargains. These are the formulas that became rituals and quietly returned to the room again and again.",
    ambient: "loyalty in glass"
  },
  {
    slug: "currently-using",
    label: "Currently Using",
    headline: "A small present-tense edit on the vanity.",
    subline:
      "Only what is open, warm from the hand, and close enough to be reached without thinking.",
    ambient: "within arm's reach"
  },
  {
    slug: "wishlist",
    label: "Wishlist",
    headline: "Objects observed before they are invited in.",
    subline:
      "The patient list: considered, revisited, and allowed to remain a little imaginary.",
    ambient: "desire, slowed down"
  },
  {
    slug: "perfume-moods",
    label: "Perfume Moods",
    headline: "Scent as atmosphere, not inventory.",
    subline:
      "Move through fragrances like rooms—hotel hush, dark florals, soft musk, citrus heat.",
    ambient: "weather in a bottle"
  },
  {
    slug: "makeup-bag",
    label: "Makeup Bag",
    headline: "The travelling few.",
    subline:
      "A capsule edit for pockets, dinner tables, and small mirrors. Everything earns the space it takes.",
    ambient: "the edit that leaves"
  },
  {
    slug: "shelf",
    label: "Shelf",
    headline: "The whole still life, with air around it.",
    subline:
      "A quiet arrangement of daily objects—spaced like furniture in a beautiful apartment.",
    ambient: "the room photographed"
  }
];

export const getSection = (slug: SectionSlug) =>
  SECTIONS.find((s) => s.slug === slug);
