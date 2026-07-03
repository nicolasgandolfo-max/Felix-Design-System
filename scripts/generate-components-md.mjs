// Generates components.md at the repo root. Run: node scripts/generate-components-md.mjs
// Sources:
//  - apps/design-system/src/data.ts            (INVENTORY groups / display names)
//  - apps/design-system/src/components-registry.tsx (en descriptions + usage.en)
//  - packages/ui/src/components/**/*.tsx        (real exported symbols per file)
import fs from "fs";
import path from "path";

const ROOT = new URL("..", import.meta.url).pathname;
const registrySrc = fs.readFileSync(path.join(ROOT, "apps/design-system/src/components-registry.tsx"), "utf8");
const dataSrc = fs.readFileSync(path.join(ROOT, "apps/design-system/src/data.ts"), "utf8");

// ── INVENTORY: { group: "Atoms", items: [...] } ──────────────────────────────
const inventory = [];
const invMatch = dataSrc.match(/export const INVENTORY[^=]*=\s*\[([\s\S]*?)\n\];/);
for (const g of invMatch[1].matchAll(/group:\s*"([^"]+)"[\s\S]*?items:\s*\[([\s\S]*?)\]/g)) {
  const items = [...g[2].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  inventory.push({ group: g[1], items });
}

// slugify — mirror of apps/design-system/src/data.ts
const slugify = (n) => n.toLowerCase().replace(/\s+/g, "-");

// ── Registry: slug → { en, usageEn } ────────────────────────────────────────
// Entries look like:  slug: {\n es: "...", en: "...", pt: "...", usage: { es, en, pt }, ... }
const entries = {};
const entryRe = /^  (\w+): \{\n\s+es: "((?:[^"\\]|\\.)*)",\n\s+en: "((?:[^"\\]|\\.)*)",\n\s+pt: "((?:[^"\\]|\\.)*)",\n\s+usage: \{\n\s+es: "((?:[^"\\]|\\.)*)",\n\s+en: "((?:[^"\\]|\\.)*)",\n\s+pt: "((?:[^"\\]|\\.)*)",/gm;
for (const m of registrySrc.matchAll(entryRe)) {
  entries[m[1]] = { en: JSON.parse(`"${m[3]}"`), usageEn: JSON.parse(`"${m[6]}"`) };
}

// ── Real exports per component file in packages/ui ─────────────────────────
// slug (registry key, no separators) → component source file basename
const fileFor = (name) => name.toLowerCase().replace(/\s+/g, "-")
  .replace("coinloader", "coin-loader").replace("iconbutton", "icon-button")
  .replace("radiogroup", "radio-group").replace("choicecard", "choice-card")
  .replace("datepicker", "date-picker").replace("dropdownmenu", "dropdown-menu")
  .replace("hovercard", "hover-card").replace("navigationmenu", "navigation-menu")
  .replace("sidebarfooter", "sidebar-footer");

const exportsFor = {};
for (const groupDir of ["Atoms", "Molecules", "Organisms"]) {
  const dir = path.join(ROOT, "packages/ui/src/components", groupDir);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".tsx") || f.endsWith(".test.tsx")) continue;
    const src = fs.readFileSync(path.join(dir, f), "utf8");
    const names = new Set();
    for (const m of src.matchAll(/export (?:function|const) ([A-Z]\w*)/g)) names.add(m[1]);
    for (const m of src.matchAll(/export \{([\s\S]*?)\}/g))
      m[1].split(",").map((s) => s.trim().split(/\s+as\s+/).pop()).filter((s) => /^[A-Z]/.test(s)).forEach((s) => names.add(s));
    exportsFor[f.replace(".tsx", "")] = [...names];
  }
}

// ── Emit markdown ───────────────────────────────────────────────────────────
const out = [];
out.push(`# Felix Pago Design System — Component Reference

> Companion to [DESIGN.md](./DESIGN.md). One entry per component in \`@felix/ui\`,
> with what it's for, how to use it, and the exact symbols it exports.
> Generated from the design-system site registry
> (\`apps/design-system/src/components-registry.tsx\`) — the same source that
> powers the live showcases at the docs site, where each entry also carries
> Spanish and Portuguese copy and a live HTML snippet.

**Import everything from the package root:**

\`\`\`tsx
import { Button, Input, Dialog, DialogTrigger, DialogContent } from "@felix/ui";
\`\`\`

**System-wide rules (from DESIGN.md):**

- One primary button per screen. Interactive elements are pill-shaped.
- Focus is always visible: turquoise ring via \`--shadow-selection\`.
- Cards use border **or** shadow, never both.
- Icons are Phosphor (duotone at rest, fill when active) — never Lucide.
- Copy is Spanish-first, informal *tú*; fees always visible, even when zero.
`);

let total = 0;
for (const { group, items } of inventory) {
  out.push(`\n## ${group} · ${items.length}\n`);
  for (const name of items) {
    const slug = slugify(name).replace(/-/g, "");
    const entry = entries[slug] ?? entries[slugify(name)];
    const exp = exportsFor[fileFor(slugify(name))];
    out.push(`### ${name}\n`);
    if (entry) {
      out.push(`${entry.en}\n`);
      out.push(`**Usage.** ${entry.usageEn}\n`);
    } else {
      out.push(`_No registry entry — see Storybook._\n`);
    }
    if (exp?.length) out.push(`**Exports:** ${exp.map((e) => `\`${e}\``).join(", ")}\n`);
    total++;
  }
}
out.push(`\n---\n\n*${total} components · generated from the design-system registry. To regenerate after editing the registry, run \`node scripts/generate-components-md.mjs\`.*\n`);

fs.writeFileSync(path.join(ROOT, "components.md"), out.join("\n"));
console.log(`written: components.md (${total} components)`);
const missing = inventory.flatMap((g) => g.items).filter((n) => !entries[slugify(n).replace(/-/g, "")] && !entries[slugify(n)]);
console.log("missing registry entries:", missing.length ? missing.join(", ") : "none");
const noExports = inventory.flatMap((g) => g.items).filter((n) => !exportsFor[fileFor(slugify(n))]?.length);
console.log("missing exports:", noExports.length ? noExports.join(", ") : "none");
