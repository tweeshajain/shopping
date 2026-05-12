import vibesJson from "../../data/perfume-vibes.json";
import { PRODUCTS } from "./products";
import type { Product } from "./types";

export type PerfumeVibeGradient = {
  a: string;
  b: string;
  c: string;
  spot: string;
};

export type PerfumeVibe = {
  id: string;
  label: string;
  whisper: string;
  productIds: string[];
  gradient: PerfumeVibeGradient;
  tone?: "light" | "dark";
};

export type PerfumeVibeScene = PerfumeVibe & {
  products: Product[];
};

function parseVibes(raw: unknown): PerfumeVibe[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((row) => {
    const r = row as Record<string, unknown>;
    const g = r.gradient as Record<string, unknown> | undefined;
    return {
      id: String(r.id ?? ""),
      label: String(r.label ?? ""),
      whisper: String(r.whisper ?? ""),
      productIds: Array.isArray(r.productIds)
        ? r.productIds.filter((x): x is string => typeof x === "string")
        : [],
      gradient: {
        a: String(g?.a ?? "#fbf8f3"),
        b: String(g?.b ?? "#f1eadd"),
        c: String(g?.c ?? "#ede3d2"),
        spot: String(g?.spot ?? "rgba(237,207,195,0.3)"),
      },
      tone: r.tone === "dark" ? "dark" : "light",
    };
  });
}

const RAW_VIBES = parseVibes(vibesJson);

const byId = new Map(PRODUCTS.map((p) => [p.id, p]));

export function getPerfumeMoodScenes(): PerfumeVibeScene[] {
  return RAW_VIBES.map((v) => ({
    ...v,
    products: v.productIds
      .map((id) => byId.get(id))
      .filter((p): p is Product => Boolean(p)),
  })).filter((v) => v.products.length > 0);
}
