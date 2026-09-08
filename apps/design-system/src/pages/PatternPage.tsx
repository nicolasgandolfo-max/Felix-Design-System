import { useEffect, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
import { PlazaChrome } from "../components/PlazaChrome";
import { getPattern, otherPatterns } from "../patterns/content";
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

// ─── Escala tipográfica ──────────────────────────────────────────────────────
// Una sola escala para todas las páginas de patrón: 60 (h1, Plain) · 30 (h2)
// · 24 (h3, subtítulo del hero, tarjetas) · 20 (cuerpo) · 16 (tabla, captions)
// · 14 (th, fuente) · 12 (breadcrumb). Saans no tiene cara Medium (500): el
// archivo Regular cubre 400–500 y el SemiBold 600–700, así que "medium" del
// Figma se pide como `font-semibold`. Los tamaños custom (`text-30`, `text-60`)
// no traen line-height: siempre van con `leading-*` explícito.

/* Título de sección (h2): Figma pide Saans Medium 30 → SemiBold 30/36. */
const SECTION_H =
  "font-sans text-30 font-semibold leading-9 tracking-heading text-foreground";

/* Subtítulo (h3 de tabla, título de métrica): SemiBold 24/32. */
const SUB_H =
  "font-sans text-xl font-semibold leading-8 tracking-heading text-foreground";

/* Cuerpo de lectura 20/28 y su variante compacta 16/24 para dentro de celdas. */
const BODY = "font-sans text-lg leading-7 text-pretty text-foreground";
const BODY_COMPACT =
  "font-sans text-base leading-6 text-pretty text-foreground";

/* Caption bajo cajas de ejemplo y galería: SemiBold 16/24, a 16px de la caja. */
const CAPTION =
  "mt-4 font-sans text-base font-semibold leading-6 tracking-heading text-pretty text-foreground";

/* Celdas de tabla. Sobrescriben el base de @felix/ui (h-8, p-2, tracking
   +0.25px, text-xs) vía tailwind-merge: la clase posterior gana. Filas de
   ≥56px; `first:pl-0 last:pr-0` alinea el texto con los títulos de arriba. */
const TH =
  "h-auto px-4 py-3 font-sans text-sm font-semibold uppercase leading-5 tracking-wide text-foreground/70 first:pl-0 last:pr-0";
const TD =
  "px-4 py-4 align-top font-sans text-base leading-6 tracking-normal tabular-nums text-foreground first:pl-0 last:pr-0";

// ─── Bloques ─────────────────────────────────────────────────────────────────
// Cada pestaña es una lista de bloques (ver `patterns/types.ts`). Los márgenes
// superiores llevan `first:mt-0` para que el primer bloque de una pestaña o de
// una columna quede al ras. Ritmo: título pegado a lo suyo (16), aire antes
// del siguiente bloque (32–56). Todo en múltiplos de 4.

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
                <TableCell key={c} className={TD}>
                  {Array.isArray(cell) ? (
                    <Blocks blocks={cell} tr={tr} compact />
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
        <div className="flex min-h-72 flex-1 items-center justify-center p-8">
          <img
            loading="lazy"
            src={example.img}
            alt={L(tr, example.alt)}
            className="h-auto w-full max-w-[300px]"
          />
        </div>
        <div
          className={`flex h-15 shrink-0 items-center gap-3 border-t ${STROKE_SOFT} px-6 ${
            isDo ? "bg-(--cactus)" : "bg-(--papaya)"
          }`}
        >
          {isDo ? (
            <CheckCircleIcon size={24} color="white" aria-hidden="true" />
          ) : (
            <XCircleIcon size={24} color="white" aria-hidden="true" />
          )}
          <span className="font-heading text-base font-black leading-6 tracking-heading text-white">
            {isDo ? tr("Sí", "Do") : tr("No", "Don't")}
          </span>
        </div>
      </div>
      <p className={CAPTION}>{L(tr, example.caption)}</p>
    </div>
  );
}

/** `compact`: dentro de una celda de tabla el cuerpo baja a 16/24 y los
 *  márgenes se achican para que la fila no crezca más que sus vecinas. */
function BlockView({
  block,
  tr,
  compact = false,
}: {
  block: Block;
  tr: Tr;
  compact?: boolean;
}) {
  const body = compact ? BODY_COMPACT : BODY;
  const gap = compact ? "mt-2" : "mt-4";
  const list = compact ? "mt-2 space-y-1 pl-5" : "mt-4 space-y-2 pl-6";

  switch (block.type) {
    case "heading":
      return (
        <h2 className={`mt-14 text-balance first:mt-0 ${SECTION_H}`}>
          {L(tr, block.text)}
        </h2>
      );

    case "prose":
      return <p className={`${gap} ${body} first:mt-0`}>{L(tr, block.text)}</p>;

    case "bullets":
      return (
        <ul className={`${list} list-disc ${body} first:mt-0`}>
          {block.items.map((item, i) => (
            <li key={i}>{L(tr, item)}</li>
          ))}
        </ul>
      );

    case "ordered":
      return (
        <ol className={`${list} list-decimal ${body} first:mt-0`}>
          {block.items.map((item, i) => (
            <li key={i}>{L(tr, item)}</li>
          ))}
        </ol>
      );

    case "gallery":
      return (
        <div className="mt-8 [display:grid] gap-8 first:mt-0 md:grid-cols-3">
          {block.items.map((item, i) => (
            <figure key={i} className="m-0">
              <div
                className={`flex min-h-72 items-center justify-center rounded-3xl border ${STROKE_SOFT} bg-card p-8`}
              >
                <img
                  loading="lazy"
                  src={item.img}
                  alt={L(tr, item.alt)}
                  className="h-auto w-full max-w-[300px]"
                />
              </div>
              <figcaption className={CAPTION}>{L(tr, item.label)}</figcaption>
            </figure>
          ))}
        </div>
      );

    /* El h3 no lleva margen superior propio: si lo tuviera colapsaría hacia
       afuera del wrapper y anularía el `first:mt-0`. El aire va en el wrapper. */
    case "table":
      return (
        <div className={`${block.heading ? "mt-12" : "mt-8"} first:mt-0`}>
          {block.heading && (
            <h3 className={`mb-4 text-balance ${SUB_H}`}>
              {L(tr, block.heading)}
            </h3>
          )}
          <DataTable columns={block.columns} rows={block.rows} tr={tr} />
        </div>
      );

    /* Light Sky (--light-sky #d4fffe) con borde stroke/soft, radio 16. */
    case "callout":
      return (
        <div
          className={`mt-8 rounded-xl border ${STROKE_SOFT} bg-(--light-sky) p-8 ${BODY} first:mt-0`}
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
          className={`rounded-3xl border ${STROKE_SOFT} bg-(--sky) p-8 text-(--slate)`}
        >
          <h2 className="font-sans text-xl font-semibold leading-8 tracking-heading text-balance">
            {L(tr, block.title)}
          </h2>
          <p className="mt-4 font-sans text-lg leading-7">
            {tr("Próximamente", "Coming Soon", "Em breve")}
          </p>
        </div>
      );

    case "examples":
      return (
        <div className="mt-12 [display:grid] items-start gap-12 first:mt-0 md:grid-cols-2">
          {block.items.map((ex, i) => (
            <ExampleFigure key={i} example={ex} tr={tr} />
          ))}
        </div>
      );

    case "note":
      return (
        <p className="mt-8 border-l-2 border-primary pl-4 font-sans text-base leading-6 text-pretty text-foreground first:mt-0">
          {L(tr, block.text)}
        </p>
      );

    case "source":
      return (
        <p className="mt-8 font-sans text-sm leading-5 text-foreground/70 first:mt-0">
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
        <div className="mt-12 [display:grid] items-start gap-12 first:mt-0 md:grid-cols-2">
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

function Blocks({
  blocks,
  tr,
  compact = false,
}: {
  blocks: Block[];
  tr: Tr;
  compact?: boolean;
}) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} tr={tr} compact={compact} />
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
  const hasTabStrip = pattern.tabs.length > 1;

  return (
    <PlazaChrome>
      <main className="plaza-main pb-24">
        {/* ── Hero ─────────────────────────────────────────────────────────
            Panel linen 464px con borde stroke/soft; título Plain Black 60/54,
            subtítulo opcional SemiBold 24/32 al 70% y lede 20/28 en slate. */}
        <section
          className={`mt-4 [display:grid] min-h-[464px] items-center gap-10 rounded-3xl border ${STROKE_SOFT} bg-card p-8 md:grid-cols-2 md:px-24 md:py-12`}
        >
          <div>
            <Breadcrumb className="mb-4">
              <BreadcrumbList className="uppercase">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/patrones">
                      {tr(
                        "Guías conversacionales",
                        "Conversational guidelines",
                        "Guias de conversa"
                      )}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{L(tr, pattern.name)}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="font-heading text-60 font-black leading-[54px] tracking-heading text-balance text-foreground">
              {heroTitle}
            </h1>
            {pattern.subtitle && (
              <p className="mt-3 font-sans text-xl font-semibold leading-8 tracking-heading text-foreground/70">
                {L(tr, pattern.subtitle)}
              </p>
            )}

            <p
              className={`${pattern.subtitle ? "mt-4" : "mt-6"} max-w-[448px] font-sans text-lg leading-7 text-pretty text-foreground`}
            >
              {L(tr, pattern.lede)}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            {heroImgs.map((src, i) => (
              <img
                key={i}
                /* El alt describe el conjunto; las láminas extra son decorativas. */
                alt={i === 0 ? L(tr, pattern.heroAlt) : ""}
                src={src}
                className="h-auto w-full max-w-[393px]"
              />
            ))}
          </div>
        </section>

        {/* ── Tabs ─────────────────────────────────────────────────────────
            Segmentado según Figma: track blanco full-width con borde
            stroke/soft (alto 86: pill de 60 + padding 12 + borde), pill
            activo slate con texto linen, labels display 24px. Las pestañas
            salen del contenido, así que un patrón puede tener dos o tres.
            `key` por slug: al navegar entre patrones el componente no se
            remonta, y sin esto el tab elegido persistiría. */}
        <Tabs
          key={pattern.slug}
          defaultValue={pattern.tabs[0]?.id}
          className="mt-12 gap-0"
        >
          {/* Mismo estilo que el header (.plaza-nav: blanco, pill) y sticky
              a 16px del borde para que las pestañas acompañen el scroll.
              Con una sola pestaña la barra no aporta y se oculta. */}
          <TabsList
            className={`sticky top-4 z-30 w-full gap-2 rounded-full border ${STROKE_SOFT} bg-white p-3 ${
              hasTabStrip ? "" : "hidden"
            }`}
          >
            {pattern.tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="h-15 justify-center rounded-full px-10 font-heading text-xl font-black tracking-heading text-foreground data-[state=active]:bg-(--slate) data-[state=active]:text-(--linen) data-[state=active]:shadow-none"
              >
                {L(tr, tab.label)}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* 48px bajo el strip; sin strip, el contenido queda a los 48px
              del `mt-12` del contenedor y no suma un hueco extra. */}
          {pattern.tabs.map((tab) => (
            <TabsContent
              key={tab.id}
              value={tab.id}
              className={hasTabStrip ? "pt-12" : "pt-0"}
            >
              <Blocks blocks={tab.blocks} tr={tr} />
            </TabsContent>
          ))}
        </Tabs>

        {/* ── Explorar patrones ────────────────────────────────────────────
            Tarjetas propias (no las `.plaza-link-card` del home, que llevan
            Plain 38 y gap 11): título de sección igual al resto de la página,
            tarjeta con título Plain 24/32 y cuerpo 16/24. */}
        <section className="mt-24">
          <h2 className={`text-balance ${SECTION_H}`}>
            {tr("Explorar patrones", "Explore patterns", "Explorar padrões")}
          </h2>
          <div className="mt-8 [display:grid] gap-8 md:grid-cols-2">
            {explore.map((p) => (
              <article
                key={p.slug}
                className={`flex flex-col gap-4 rounded-3xl border ${STROKE_SOFT} bg-card p-8 text-foreground`}
              >
                <h3 className="font-heading text-xl font-black leading-8 tracking-heading text-balance">
                  {L(tr, p.name)}
                </h3>
                <p className="font-sans text-base leading-6 text-pretty">
                  {L(tr, p.cardBody)}
                </p>
                <Link
                  className="plaza-btn mt-4 self-start"
                  to={`/patrones/${p.slug}`}
                >
                  {tr(
                    "Ver las guías del patrón",
                    "Go to pattern guidelines",
                    "Ver as diretrizes do padrão"
                  )}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PlazaChrome>
  );
}
