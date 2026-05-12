import type { SectionMeta, SectionSlug } from "./types";

export type { SectionSlug };

export const SECTIONS: SectionMeta[] = [
  {
    slug: "the-ritual",
    label: "The Ritual",
    headline: "The products that actually do something.",
    subline:
      "Skincare that earned its place through results, not hype. Every single one has been tested, trusted, and repurchased.",
    ambient: "skin first, always"
  },
  {
    slug: "the-glow-edit",
    label: "The Glow Edit",
    headline: "My favorites, tried and approved.",
    subline:
      "The makeup I keep reaching for no matter what else I try. These ones never let me down.",
    ambient: "tried, tested, loved"
  },
  {
    slug: "scent-moods",
    label: "Scent Moods",
    headline: "A fragrance for every version of me.",
    subline:
      "Move through scents like moods — there's one for every day, every night, every feeling.",
    ambient: "weather in a bottle"
  },
  {
    slug: "basically-mine",
    label: "Basically Mine",
    headline: "It's in my head. It'll be in my hands soon.",
    subline:
      "The list I check when payday hits. Already decided — just waiting on the timing.",
    ambient: "not yet mine"
  }
];

export const getSection = (slug: SectionSlug) =>
  SECTIONS.find((s) => s.slug === slug);
