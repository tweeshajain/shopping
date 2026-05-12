/**
 * Removes `.next/` using Node's rmSync (works better under OneDrive on Windows
 * than Next's internal cleanup, which can throw EINVAL on readlink).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = path.join(root, ".next");

if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  process.stdout.write("Cleaned .next\n");
}
