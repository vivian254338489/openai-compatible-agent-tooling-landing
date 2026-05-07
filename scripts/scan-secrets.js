import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const patterns = [/sk-[A-Za-z0-9_-]{20,}/, /Bearer\s+[A-Za-z0-9._-]{20,}/i, /ghp_[A-Za-z0-9_]{20,}/, /github_pat_[A-Za-z0-9_]{20,}/];
const ignored = new Set([".git", "node_modules"]);
const findings = [];

for (const file of walk(process.cwd())) {
  const text = readFileSync(file, "utf8");
  for (const pattern of patterns) if (pattern.test(text)) findings.push(file);
}

if (findings.length) {
  console.error(`Possible secrets found:\n${findings.join("\n")}`);
  process.exit(1);
}
console.log("secret scan ok");

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (ignored.has(entry)) continue;
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) yield* walk(path);
    else if (/\.(html|svg|md|js|json|css|txt)$/i.test(entry)) yield path;
  }
}
