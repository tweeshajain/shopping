#!/usr/bin/env node
/**
 * Upsert product(s) into data/products.json (no backend).
 *
 *   npm run products:add -- --stdin < new-product.json
 *   npm run products:add -- --json "{\"id\":\"p9\",...}"
 *   npm run products:add -- --file ./product.json
 *
 * AI: emit one JSON object per data/products.schema.json and pipe to --stdin.
 * Starter JSON: scripts/templates/product.template.json
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  readJson,
  writeProductsPretty,
  PRODUCTS_JSON,
} from "./lib/io.mjs";
import { validateProductsFile } from "./lib/validate-products.mjs";

function parseArgs(argv) {
  const out = { mode: null, json: null, file: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--stdin") out.mode = "stdin";
    else if (a === "--json" && argv[i + 1]) {
      out.mode = "json";
      out.json = argv[++i];
    } else if (a === "--file" && argv[i + 1]) {
      out.mode = "file";
      out.file = argv[++i];
    }
  }
  return out;
}

async function readStdinJson() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) throw new Error("stdin was empty");
  return JSON.parse(raw);
}

function readJsonFile(userPath) {
  const abs = resolve(process.cwd(), userPath);
  return JSON.parse(readFileSync(abs, "utf8"));
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.mode) {
    console.error(`Usage:
  npm run products:add -- --stdin < product.json
  npm run products:add -- --json '{"id":"x",...}'
  npm run products:add -- --file ./product.json
`);
    process.exit(1);
  }

  let incoming;
  if (args.mode === "stdin") {
    incoming = await readStdinJson();
  } else if (args.mode === "json") {
    incoming = JSON.parse(args.json);
  } else if (args.mode === "file") {
    incoming = readJsonFile(args.file);
  }

  const incomingList = Array.isArray(incoming) ? incoming : [incoming];
  const existing = readJson(PRODUCTS_JSON);
  if (!Array.isArray(existing)) {
    console.error("products.json must be an array.");
    process.exit(1);
  }

  const byId = new Map(existing.map((p, idx) => [p.id, idx]));
  const next = [...existing];
  for (const row of incomingList) {
    if (!row || typeof row.id !== "string" || !row.id.trim()) {
      console.error("Each product must include a non-empty id.");
      process.exit(1);
    }
    const id = row.id.trim();
    const idx = byId.get(id);
    const base = idx !== undefined ? next[idx] : {};
    const merged = { ...base, ...row, id };
    if (idx !== undefined) {
      next[idx] = merged;
      console.log(`Updated: ${id}`);
    } else {
      next.push(merged);
      byId.set(id, next.length - 1);
      console.log(`Added: ${id}`);
    }
  }

  const check = validateProductsFile(next);
  if (!check.ok) {
    console.error("Validation failed — nothing written:\n");
    for (const e of check.errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  writeProductsPretty(next);
  console.log(`Wrote ${PRODUCTS_JSON}`);
}

run().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
