import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(__dirname, "../..");
export const PRODUCTS_JSON = resolve(REPO_ROOT, "data/products.json");
export const PERFUME_VIBES_JSON = resolve(REPO_ROOT, "data/perfume-vibes.json");

export function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function writeProductsPretty(products) {
  writeFileSync(PRODUCTS_JSON, `${JSON.stringify(products, null, 2)}\n`, "utf8");
}
