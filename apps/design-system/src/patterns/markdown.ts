/**
 * Serializa las guías conversacionales a un solo archivo Markdown, para que el
 * visitante se lo lleve o se lo dé a un LLM como contexto (igual que DESIGN.md
 * y components.md en la sección Markdown).
 *
 * Se genera en el navegador a partir del mismo registro que pinta las páginas
 * (`content.ts`), así que nunca queda desfasado y sale en el idioma activo.
 * Dice lo mismo que la pantalla: donde `PatternPage` oculta algo (el cuerpo de
 * `metric` mientras no haya datos), aquí también se omite.
 */
import type { Lang } from "../i18n";
import { PATTERNS } from "./content";
import { PATTERN_FAMILIES, patternsOf } from "./nav";
import type { Block, Localized, TableCell } from "./types";

/** Misma regla que `useTr`: el portugués cae a inglés si falta. */
const pick = (lang: Lang) => (l: Localized) =>
  lang === "es" ? l.es : lang === "en" ? l.en : l.pt || l.en || l.es;

const UI = {
  title: {
    es: "Guías conversacionales",
    en: "Conversational guidelines",
    pt: "Guias de conversa",
  },
  desc: {
    es: "Los patrones que reutilizamos en el bot, cada uno con cuándo usarlo, cuándo no, un ejemplo y el porqué. Agrupados en dos familias: cómo preguntamos y qué decimos.",
    en: "The patterns we reuse across the bot, each with when to use it, when not to, an example, and the reason why. Grouped in two families: how we ask, and what we say.",
    pt: "Os padrões que reutilizamos no bot, cada um com quando usar, quando não usar, um exemplo e o porquê. Agrupados em duas famílias: como perguntamos e o que dizemos.",
  },
  patterns: { es: "Patrones", en: "Patterns", pt: "Padrões" },
  families: { es: "Familias", en: "Families", pt: "Famílias" },
  channel: { es: "Canal", en: "Channel", pt: "Canal" },
  source: { es: "Fuente", en: "Source", pt: "Fonte" },
  generated: { es: "Generado", en: "Generated", pt: "Gerado" },
  from: { es: "desde", en: "from", pt: "de" },
  comingSoon: { es: "Próximamente", en: "Coming Soon", pt: "Em breve" },
  do: { es: "Sí", en: "Do", pt: "Sim" },
  dont: { es: "No", en: "Don't", pt: "Não" },
} satisfies Record<string, Localized>;

/** Una celda de tabla GFM no admite saltos ni `|` sueltos. */
const cell = (s: string) =>
  s
    .replace(/\|/g, "\\|")
    .replace(/\s*\n\s*/g, "<br>")
    .trim();

/** URL absoluta de un asset del sitio, para que el .md sea legible fuera de él. */
const abs = (origin: string, path: string) =>
  /^https?:\/\//.test(path) ? path : `${origin}${path}`;

function blocksToMd(
  blocks: Block[],
  L: (l: Localized) => string,
  origin: string,
  depth: number
): string {
  return blocks.map((b) => blockToMd(b, L, origin, depth)).join("\n\n");
}

/** Versión en una línea de una celda con bloques (prosa + lista, típicamente). */
function cellBlocksToMd(blocks: Block[], L: (l: Localized) => string): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "prose":
        case "heading":
        case "note":
          return L(b.text);
        case "bullets":
          return b.items.map((i) => `• ${L(i)}`).join("<br>");
        case "ordered":
          return b.items.map((i, n) => `${n + 1}. ${L(i)}`).join("<br>");
        case "callout":
          return `${b.title ? `**${L(b.title)}** ` : ""}${L(b.body)}`;
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("<br><br>");
}

function tableCell(c: TableCell, L: (l: Localized) => string): string {
  return cell(Array.isArray(c) ? cellBlocksToMd(c, L) : L(c));
}

function blockToMd(
  b: Block,
  L: (l: Localized) => string,
  origin: string,
  depth: number
): string {
  const h = "#".repeat(Math.min(depth, 6));
  switch (b.type) {
    case "heading":
      return `${h} ${L(b.text)}`;
    case "prose":
      return L(b.text);
    case "bullets":
      return b.items.map((i) => `- ${L(i)}`).join("\n");
    case "ordered":
      return b.items.map((i, n) => `${n + 1}. ${L(i)}`).join("\n");
    case "table": {
      const head = `| ${b.columns.map((c) => cell(L(c))).join(" | ")} |`;
      const sep = `| ${b.columns.map(() => "---").join(" | ")} |`;
      const rows = b.rows.map(
        (r) => `| ${r.map((c) => tableCell(c, L)).join(" | ")} |`
      );
      const title = b.heading ? `${h} ${L(b.heading)}\n\n` : "";
      return `${title}${[head, sep, ...rows].join("\n")}`;
    }
    case "callout":
      return `> ${b.title ? `**${L(b.title)}** ` : ""}${L(b.body)}`;
    case "metric":
      // La pantalla muestra solo el título con "Coming Soon"; el .md no debe
      // filtrar un cuerpo que la guía todavía no publica.
      return `> **${L(b.title)}**\n> ${L(UI.comingSoon)}`;
    case "examples":
      return b.items
        .map(
          (ex) =>
            `**${L(ex.tone === "do" ? UI.do : UI.dont)}** — ${L(ex.caption)}\n\n![${L(ex.alt)}](${abs(origin, ex.img)})`
        )
        .join("\n\n");
    case "gallery":
      return b.items
        .map((g) => `![${L(g.alt)}](${abs(origin, g.img)})\n*${L(g.label)}*`)
        .join("\n\n");
    case "note":
      return `> ${L(b.text)}`;
    case "source":
      return b.href
        ? `_${L(b.text)} [${b.linkText ?? b.href}](${b.href})_`
        : `_${L(b.text)}_`;
    case "columns":
      return `${blocksToMd(b.left, L, origin, depth)}\n\n${blocksToMd(b.right, L, origin, depth)}`;
  }
}

/**
 * Markdown completo de las guías, en el idioma dado. `origin` es el origen del
 * sitio (`window.location.origin`) para que las imágenes apunten a URLs
 * absolutas y el archivo se lea fuera del portal.
 */
export function patternsToMarkdown(
  lang: Lang,
  origin: string,
  pageUrl: string
): string {
  const L = pick(lang);
  const date = new Date().toISOString().slice(0, 10);
  const out: string[] = [
    `# ${L(UI.title)}`,
    "",
    L(UI.desc),
    "",
    `- **${L(UI.patterns)}:** ${PATTERNS.length}`,
    `- **${L(UI.families)}:** ${PATTERN_FAMILIES.length}`,
    `- **${L(UI.channel)}:** WhatsApp`,
    `- **${L(UI.source)}:** Figma · Conversational Guidelines`,
    `- **${L(UI.generated)}:** ${date} ${L(UI.from)} ${pageUrl}`,
  ];

  for (const family of PATTERN_FAMILIES) {
    const items = patternsOf(family.id);
    out.push("", `## ${L(family.label)}`, "", L(family.blurb));
    for (const p of items) {
      out.push("", `### ${L(p.title ?? p.name)}`);
      if (p.subtitle) out.push("", `*${L(p.subtitle)}*`);
      out.push("", L(p.lede));
      for (const s of p.sections) {
        out.push(
          "",
          `#### ${L(s.label)}`,
          "",
          blocksToMd(s.blocks, L, origin, 5)
        );
      }
    }
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
}

/** Nombre del archivo: un .md por idioma. */
export const markdownFilename = (lang: Lang) =>
  `conversational-guidelines.${lang}.md`;
