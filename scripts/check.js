import { existsSync, readFileSync } from "node:fs";

const required = ["index.html", "assets/agent-workflow.svg", "README.md", "package.json", "LICENSE"];
const missing = required.filter((file) => !existsSync(file));
if (missing.length) throw new Error(`Missing files: ${missing.join(", ")}`);

const html = readFileSync("index.html", "utf8");
for (const text of [
  "OpenAI-Compatible Agent Tooling",
  "https://www.tken.shop/?utm_source=github_pages",
  "tken-awesome-openai-compatible",
  "openai-compatible-mcp-server",
  "claude-desktop-mcp-openai-compatible-bridge-kit",
  "openai-compatible-provider-migration-ci-kit",
  "openai-compatible-prompt-regression-ci-kit",
  "openai-compatible-gateway-eval-harness",
  "openai-compatible-cost-guardrail-kit",
  "Disclosure"
]) {
  if (!html.includes(text)) throw new Error(`index.html missing: ${text}`);
}

const risky = /\bofficial partner\b|\bguaranteed\b|\bunlimited\b|\bcheapest\b/i;
if (risky.test(html)) throw new Error("index.html contains risky claim language");

console.log("check ok");
