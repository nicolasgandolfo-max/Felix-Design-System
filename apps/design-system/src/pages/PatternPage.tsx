import { useEffect, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@felix/ui";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { getPattern, otherPatterns } from "../patterns/content";
import { PATTERN_FAMILIES, patternIcon } from "../patterns/nav";
import type {
  Block,
  Example,
  Localized,
  TableCell as Cell,
} from "../patterns/types";
import { useTr } from "../i18n";

type Tr = (es: string, en: string, pt?: string) => string;

/** Resuelve un texto localizado con el traductor activo. Sin `pt`, cae a EN. */
const L = (tr: Tr, l: Localized) => tr(l.es, l.en, l.pt);

/* Trazo `stroke/soft` de Figma — el mismo que usan .plaza-hero y .plaza-card.
   El token --border del DS es #cfcabf y no corresponde aquí. */
const STROKE_SOFT = "border-[rgba(8,36,34,0.12)]";

/* Misma escala que el resto del portal: `.h3` (1.15rem / 600) para los títulos
   de sección dentro de una página, 15px para la prosa y 14px en tablas. */
const SECTION_H =
  "font-sans text-md font-semibold tracking-[-0.01em] text-foreground";

const TH =
  "font-sans text-[11px] font-semibold uppercase tracking-wide text-foreground/50";

/** Prosa corrida: 15px / 1.65, como `.vt-p` en Voice & Tone. */
const PROSE =
  "font-sans text-[15px] leading-[1.65] text-pretty text-foreground";

// ─── Bloques ─────────────────────────────────────────────────────────────────
// Cada pestaña es una lista de bloques (ver `patterns/types.ts`). Los márgenes
// superiores llevan `first:mt-0` para que el primer bloque de una pestaña o de
// una columna quede al ras.

function DataTable({
  columns,
  rows,
  tr,
}: {
  columns: Localized[];
  rows: Cell[][];
  tr: Tr;
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c, i) => (
              <TableHead key={i} className={TH}>
                {L(tr, c)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, r) => (
            <TableRow key={r}>
              {row.map((cell, c) => (
                <TableCell key={c} className="align-top text-sm tabular-nums">
                  {Array.isArray(cell) ? (
                    <Blocks blocks={cell} tr={tr} />
                  ) : (
                    L(tr, cell)
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/** Par sí / no según Figma: tarjeta linen con la pantalla adentro, barra de
 *  veredicto abajo (cactus / papaya) y el caption afuera, debajo. */
function ExampleFigure({ example, tr }: { example: Example; tr: Tr }) {
  const isDo = example.tone === "do";
  return (
    <div>
      <div
        className={`flex flex-col overflow-hidden rounded-3xl border ${STROKE_SOFT} bg-card`}
      >
        <div className="flex min-h-56 flex-1 items-center justify-center p-6">
          <img
            loading="lazy"
            src={example.img}
            alt={L(tr, example.alt)}
            className="h-auto w-full max-w-[220px]"
          />
        </div>
        <div
          className={`flex h-12 shrink-0 items-center gap-2 border-t ${STROKE_SOFT} px-5 ${
            isDo ? "bg-(--cactus)" : "bg-(--papaya)"
          }`}
        >
          {isDo ? (
            <CheckCircleIcon size={20} color="white" aria-hidden="true" />
          ) : (
            <XCircleIcon size={20} color="white" aria-hidden="true" />
          )}
          <span className="font-heading text-sm font-extrabold tracking-[-0.01em] text-white">
            {isDo ? tr("Sí", "Do") : tr("No", "Don't")}
          </span>
        </div>
      </div>
      <p className="mt-3 font-sans text-sm font-medium leading-[1.6] tracking-[-0.01em] text-pretty text-foreground">
        {L(tr, example.caption)}
      </p>
    </div>
  );
}

function BlockView({ block, tr }: { block: Block; tr: Tr }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className={`mt-10 text-balance first:mt-0 ${SECTION_H}`}>
          {L(tr, block.text)}
        </h2>
      );

    case "prose":
      return <p className={`mt-3 first:mt-0 ${PROSE}`}>{L(tr, block.text)}</p>;

    case "bullets":
      return (
        <ul className={`mt-4 list-disc space-y-1 pl-6 first:mt-0 ${PROSE}`}>
          {block.items.map((item, i) => (
            <li key={i}>{L(tr, item)}</li>
          ))}
        </ul>
      );

    case "ordered":
      return (
        <ol
          className={`mt-4 list-decimal space-y-1.5 pl-6 first:mt-0 ${PROSE}`}
        >
          {block.items.map((item, i) => (
            <li key={i}>{L(tr, item)}</li>
          ))}
        </ol>
      );

    case "gallery":
      return (
        <div className="mt-6 [display:grid] gap-5 first:mt-0 md:grid-cols-3">
          {block.items.map((item, i) => (
            <figure key={i} className="m-0">
              <div
                className={`flex min-h-56 items-center justify-center rounded-3xl border ${STROKE_SOFT} bg-card p-6`}
              >
                <img
                  loading="lazy"
                  src={item.img}
                  alt={L(tr, item.alt)}
                  className="h-auto w-full max-w-[220px]"
                />
              </div>
              <figcaption className="mt-3 font-sans text-sm font-medium leading-[1.6] tracking-[-0.01em] text-pretty text-foreground">
                {L(tr, item.label)}
              </figcaption>
            </figure>
          ))}
        </div>
      );

    case "table":
      return (
        <div className="mt-6 first:mt-0">
          {block.heading && (
            <h3 className={`mb-3 mt-10 text-balance ${SECTION_H}`}>
              {L(tr, block.heading)}
            </h3>
          )}
          <DataTable columns={block.columns} rows={block.rows} tr={tr} />
        </div>
      );

    /* Light Sky (--light-sky #d4fffe) con borde stroke/soft, como .vt-callout. */
    case "callout":
      return (
        <div
          className={`mt-6 rounded-xl border ${STROKE_SOFT} bg-(--light-sky) px-5 py-4 font-sans text-sm leading-[1.6] text-foreground first:mt-0`}
        >
          {block.title && (
            <strong className="font-semibold">{L(tr, block.title)} </strong>
          )}
          {L(tr, block.body)}
        </div>
      );

    /* "Secondary Sky" (--sky #8dfdfa). El cuerpo y la nota siguen en
       content.ts pero no se muestran: las métricas todavía no existen, así que
       el box queda en "Coming Soon" hasta que haya datos. */
    case "metric":
      return (
        <div
          className={`rounded-2xl border ${STROKE_SOFT} bg-(--sky) p-6 text-(--slate)`}
        >
          <h2 className="font-sans text-md font-semibold tracking-[-0.01em] text-balance">
            {L(tr, block.title)}
          </h2>
          <p className="mt-2 font-sans text-[15px] leading-[1.65]">
            {tr("Próximamente", "Coming Soon", "Em breve")}
          </p>
        </div>
      );

    case "examples":
      return (
        <div className="mt-8 [display:grid] items-start gap-x-8 gap-y-8 first:mt-0 md:grid-cols-2">
          {block.items.map((ex, i) => (
            <ExampleFigure key={i} example={ex} tr={tr} />
          ))}
        </div>
      );

    case "note":
      return (
        <p className="mt-6 border-l-2 border-primary pl-4 font-sans text-sm leading-[1.6] text-pretty text-foreground first:mt-0">
          {L(tr, block.text)}
        </p>
      );

    case "source":
      return (
        <p className="mt-8 font-sans text-xs font-medium leading-7 text-foreground/50 first:mt-0">
          {L(tr, block.text)}
          {block.href && (
            <a
              href={block.href}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {block.linkText ?? block.href}
            </a>
          )}
        </p>
      );

    case "columns":
      return (
        <div className="mt-8 [display:grid] items-start gap-8 first:mt-0 md:grid-cols-2">
          <div>
            <Blocks blocks={block.left} tr={tr} />
          </div>
          <div>
            <Blocks blocks={block.right} tr={tr} />
          </div>
        </div>
      );
  }
}

function Blocks({ blocks, tr }: { blocks: Block[]; tr: Tr }) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} tr={tr} />
      ))}
    </>
  );
}

/** Dos patrones al azar para "Explorar patrones" (Fisher-Yates sobre copia). */
function pickTwo<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, 2);
}

// ─── Página ──────────────────────────────────────────────────────────────────

export function PatternPage() {
  const { slug = "" } = useParams();
  const tr = useTr();
  const pattern = getPattern(slug);
  const heroTitle = pattern && L(tr, pattern.title ?? pattern.name);

  /* Se barajan una vez por visita (clave: slug), así un cambio de idioma o
     de pestaña no reordena las tarjetas debajo del lector. */
  const explore = useMemo(() => pickTwo(otherPatterns(slug)), [slug]);

  useEffect(() => {
    if (!heroTitle) return;
    const prev = document.title;
    document.title = `${heroTitle} · Félix`;
    return () => {
      document.title = prev;
    };
  }, [heroTitle]);

  /* Slug desconocido: de vuelta a la landing en lugar de un 404 sin salida. */
  if (!pattern) return <Navigate to="/patrones" replace />;

  const heroImgs = pattern.heroDetail ?? [pattern.hero];
  const family = PATTERN_FAMILIES.find((f) => f.id === pattern.family);

  /* La página vive dentro de `PatternsLayout` (menú, panel lateral y footer
     compartidos), así que acá va sólo el contenido. */
  return (
    <>
      {/* ── Cabecera ─────────────────────────────────────────────────────
            La misma que el resto de las internas del portal (.eyebrow, .h2,
            .lead), con las láminas de referencia chicas a la derecha del
            título en lugar del hero a media pantalla. */}
      <header className="sec flush [display:grid] items-start gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <div className="eyebrow">
            {family && <span className="n">{L(tr, family.label)}</span>}
            <span>
              {tr(
                "Guías conversacionales",
                "Conversational guidelines",
                "Guias de conversa"
              )}
            </span>
          </div>

          <h1 className="h2">{heroTitle}</h1>
          {pattern.subtitle && (
            <p className="-mt-1 mb-3 font-sans text-base font-medium text-foreground/70">
              {L(tr, pattern.subtitle)}
            </p>
          )}
          <p className="lead">{L(tr, pattern.lede)}</p>
        </div>

        <div className="flex flex-wrap items-start gap-3 md:max-w-[340px] md:justify-end">
          {heroImgs.map((src, i) => (
            <img
              key={i}
              /* El alt describe el conjunto; las láminas extra son decorativas. */
              alt={i === 0 ? L(tr, pattern.heroAlt) : ""}
              src={src}
              className="h-auto w-[160px] max-w-full"
            />
          ))}
        </div>
      </header>

      {/* ── Tabs ─────────────────────────────────────────────────────────
            Segmentado compacto: track blanco con borde stroke/soft, pill
            activo slate con texto linen y labels de 14px, en la misma escala
            que el resto del portal. Las pestañas salen del contenido, así que
            un patrón puede tener dos o tres. `key` por slug: al navegar entre
            patrones el componente no se remonta, y sin esto el tab elegido
            persistiría. */}
      <Tabs
        key={pattern.slug}
        defaultValue={pattern.tabs[0]?.id}
        className="mt-8"
      >
        {/* Sticky a 16px del borde para que las pestañas acompañen el scroll.
              Con una sola pestaña la barra no aporta y se oculta. */}
        <TabsList
          className={`sticky top-4 z-30 w-fit gap-1 rounded-full border ${STROKE_SOFT} bg-white p-1 ${
            pattern.tabs.length < 2 ? "hidden" : ""
          }`}
        >
          {pattern.tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="h-8 justify-center rounded-full px-4 font-sans text-sm font-semibold text-foreground data-[state=active]:bg-(--slate) data-[state=active]:text-(--linen) data-[state=active]:shadow-none"
            >
              {L(tr, tab.label)}
            </TabsTrigger>
          ))}
        </TabsList>

        {pattern.tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="pt-8">
            <Blocks blocks={tab.blocks} tr={tr} />
          </TabsContent>
        ))}
      </Tabs>

      {/* ── Explorar patrones ────────────────────────────────────────────
            Las mismas tarjetas que la visión general de la sección. */}
      <section className="sys-grid-section mt-16">
        <h2 className="sys-section-title">
          {tr("Explorar patrones", "Explore patterns", "Explorar padrões")}
        </h2>
        <div className="[display:grid] gap-5 md:grid-cols-2">
          {explore.map((p) => {
            const Icon = patternIcon(p);
            return (
              <Link
                key={p.slug}
                to={`/patrones/${p.slug}`}
                className="sys-card-tile"
              >
                <div className="tile-icon-badge">
                  <Icon size={22} weight="regular" />
                </div>
                <h3 className="tile-title">{L(tr, p.name)}</h3>
                <p className="tile-desc">{L(tr, p.cardBody)}</p>
                <span className="tile-link">
                  {tr(
                    "Ver las guías del patrón",
                    "Go to pattern guidelines",
                    "Ver as diretrizes do padrão"
                  )}{" "}
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
