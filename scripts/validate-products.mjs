#!/usr/bin/env node
/**
 * Validate data/products.json (and perfume-vibes productId references).
 *
 *   npm run products:validate
 */
import { validateProductsFromDisk } from "./lib/validate-products.mjs";

const r = validateProductsFromDisk();
if (!r.ok) {
  console.error("Validation failed:\n");
  for (const e of r.errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("OK — data/products.json is valid.");
