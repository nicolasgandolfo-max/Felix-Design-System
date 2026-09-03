import type { Block, PatternTab, StandardSections } from "./types";

const T = {
  overview: { es: "Resumen", en: "Overview", pt: "Resumo" },
  specs: { es: "Especificaciones", en: "Specs", pt: "Especificações" },
  guidelines: { es: "Guías", en: "Guidelines", pt: "Diretrizes" },
  usage: { es: "Cuándo usarlo", en: "Usage", pt: "Quando usar" },
  tips: { es: "Tips", en: "Tips", pt: "Dicas" },
};

/**
 * Convierte la forma estándar (Overview / Specs / Guidelines) en pestañas de
 * bloques, para que los patrones escritos con esa forma rindan con el mismo
 * template que los que definen sus bloques a mano.
 */
export function standardTabs(s: StandardSections): PatternTab[] {
  const overview: Block[] = [
    {
      type: "columns",
      left: [
        { type: "heading", text: T.usage },
        { type: "bullets", items: s.overview.usage },
      ],
      right: [{ type: "metric", ...s.overview.metric }],
    },
  ];

  const specs: Block[] = [
    { type: "heading", text: T.specs },
    { type: "prose", text: s.specs.intro },
    ...s.specs.tables.map(
      (t): Block => ({
        type: "table",
        heading: t.heading,
        columns: t.columns,
        rows: t.rows,
      })
    ),
    ...(s.specs.notes ?? []).map((n): Block => ({ type: "note", text: n })),
    {
      type: "source",
      text: s.specs.source,
      href: s.specs.sourceHref,
      linkText: s.specs.sourceLinkText,
    },
  ];

  const guidelines: Block[] = [
    {
      type: "columns",
      left: [
        { type: "heading", text: T.usage },
        { type: "prose", text: s.guidelines.usage },
      ],
      right: [
        { type: "heading", text: T.tips },
        { type: "prose", text: s.guidelines.tips },
      ],
    },
    { type: "examples", items: s.guidelines.examples },
  ];

  return [
    { id: "overview", label: T.overview, blocks: overview },
    { id: "specs", label: T.specs, blocks: specs },
    { id: "guidelines", label: T.guidelines, blocks: guidelines },
  ];
}
