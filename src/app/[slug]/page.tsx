import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionView } from "@/components/SectionView";
import { PerfumeMoodsInstallation } from "@/components/perfume/PerfumeMoodsInstallation";
import { SECTIONS, getSection } from "@/lib/sections";
import { productsForSection } from "@/lib/products";
import { getPerfumeMoodScenes } from "@/lib/perfume-vibes";
import type { SectionSlug } from "@/lib/types";

const SLUGS = new Set<string>(SECTIONS.map((s) => s.slug));

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (!SLUGS.has(params.slug)) {
    return { title: "Atelier" };
  }
  const section = getSection(params.slug as SectionSlug)!;
  return {
    title: `${section.label} · Atelier`,
    description:
      params.slug === "scent-moods"
        ? "Drift through perfume as pure mood—hotel hush, vanilla heat, Italian sun. An immersive installation, not a catalog."
        : section.subline,
  };
}

export default function SectionPage({ params }: Props) {
  if (!SLUGS.has(params.slug)) {
    notFound();
  }
  const slug = params.slug as SectionSlug;
  const section = getSection(slug)!;

  if (slug === "scent-moods") {
    const scenes = getPerfumeMoodScenes();
    if (scenes.length > 0) {
      return <PerfumeMoodsInstallation scenes={scenes} />;
    }
  }

  const products = productsForSection(slug);
  return <SectionView section={section} products={products} />;
}
