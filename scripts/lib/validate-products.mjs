import { PERFUME_VIBES_JSON, PRODUCTS_JSON, readJson } from "./io.mjs";

export const SECTION_SLUGS = new Set([
  "rebought",
  "currently-using",
  "wishlist",
  "perfume-moods",
  "makeup-bag",
  "shelf",
]);

/**
 * @param {unknown} data
 * @returns {{ ok: true, products: object[] } | { ok: false, errors: string[] }}
 */
export function validateProductsFile(data) {
  const errors = [];
  if (!Array.isArray(data)) {
    return { ok: false, errors: ["Root must be a JSON array of products."] };
  }

  const ids = new Set();
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const prefix = `products[${i}]`;
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      errors.push(`${prefix}: must be an object.`);
      continue;
    }
    const id = typeof row.id === "string" ? row.id.trim() : "";
    if (!id) errors.push(`${prefix}.id: required non-empty string.`);
    else if (ids.has(id)) errors.push(`Duplicate id "${id}".`);
    else ids.add(id);

    if (typeof row.name !== "string" || !row.name.trim()) {
      errors.push(`${prefix}.name: required string.`);
    }
    if (typeof row.section !== "string" || !SECTION_SLUGS.has(row.section)) {
      errors.push(
        `${prefix}.section: must be one of: ${[...SECTION_SLUGS].join(", ")}.`,
      );
    }
    if (typeof row.category !== "string") {
      errors.push(`${prefix}.category: required string.`);
    }
    if (typeof row.review !== "string") {
      errors.push(`${prefix}.review: required string.`);
    }
    if (!Array.isArray(row.tags)) {
      errors.push(`${prefix}.tags: must be an array of strings.`);
    } else if (!row.tags.every((t) => typeof t === "string")) {
      errors.push(`${prefix}.tags: every entry must be a string.`);
    }
    if (typeof row.affiliateLink !== "string") {
      errors.push(`${prefix}.affiliateLink: required string (URL or empty).`);
    }
    if (typeof row.image !== "string" || !row.image.trim()) {
      errors.push(`${prefix}.image: required non-empty string (URL).`);
    }
    if (
      row.mood !== null &&
      row.mood !== undefined &&
      typeof row.mood !== "string"
    ) {
      errors.push(`${prefix}.mood: must be string or null.`);
    }
    if (typeof row.rebought !== "boolean") {
      errors.push(`${prefix}.rebought: required boolean.`);
    }
    if (typeof row.wishlist !== "boolean") {
      errors.push(`${prefix}.wishlist: required boolean.`);
    }
  }

  /** @type {string[]} */
  const vibeErrors = [];
  try {
    const vibes = readJson(PERFUME_VIBES_JSON);
    if (Array.isArray(vibes)) {
      for (let vi = 0; vi < vibes.length; vi++) {
        const v = vibes[vi];
        const pids = Array.isArray(v?.productIds) ? v.productIds : [];
        for (const pid of pids) {
          if (typeof pid === "string" && pid && !ids.has(pid)) {
            vibeErrors.push(
              `perfume-vibes[${vi}] (${v?.id ?? "?"}): unknown productId "${pid}" — add it to products.json first.`,
            );
          }
        }
      }
    }
  } catch {
    // optional file
  }

  const all = errors.concat(vibeErrors);
  if (all.length) return { ok: false, errors: all };
  return { ok: true, products: /** @type {object[]} */ (data) };
}

export function validateProductsFromDisk() {
  const data = readJson(PRODUCTS_JSON);
  return validateProductsFile(data);
}
