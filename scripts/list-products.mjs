#!/usr/bin/env node
/**
 * Print a compact index of products (id, section, name) for humans / AI context.
 *
 *   npm run products:list
 *   npm run products:list -- --json   # full array as JSON
 */
import { readJson, PRODUCTS_JSON } from "./lib/io.mjs";

const wantJson = process.argv.includes("--json");
const products = readJson(PRODUCTS_JSON);

if (!Array.isArray(products)) {
  console.error("products.json must be an array.");
  process.exit(1);
}

if (wantJson) {
  console.log(JSON.stringify(products, null, 2));
  process.exit(0);
}

for (const p of products) {
  console.log(`${p.id}\t${p.section}\t${p.name}`);
}
