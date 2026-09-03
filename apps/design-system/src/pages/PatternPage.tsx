import { useEffect, useMemo, type ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
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
  ResourceRow,
  ResourceStatus,
  TableCell as Cell,
} from "../patterns/types";
import { useTr } from "../i18n";

type Tr = (es: string, en: string, pt?: string) => string;

/** Resuelve un texto localizado con el traductor activo. Sin `pt`, cae a EN. */
const L = (tr: Tr, l: Localized) => tr(l.es, l.en, l.pt);

/* Trazo `stroke/soft` de Figma — el mismo que usan .plaza-hero y .plaza-card.
   El token --border del DS es #cfcabf y no corresponde aquí. */
const STROKE_SOFT = "border-[rgba(8,36,34,0.12)]";

/* Título de sección según Figma: Saans/Inter Medium 30px, no display. */
const SECTION_H =
  "font-sans text-30 font-medium tracking-[-0.01em] text-foreground";

const TH = "font-sans text-base font-medium uppercase text-foreground/50";

const STATUS_CLASSES: Record<ResourceStatus, string> = {
  ok: "bg-status-success-bg text-status-success-text",
  /* `muted-foreground` es demasiado claro sobre `muted`; `foreground` invierte
     bien con el tema y mantiene el contraste. */
  draft: "bg-muted text-foreground",
  tbd: "bg-status-warning-bg text-status-warning-text",
};

const STATUS_LABELS: Record<ResourceStatus, Localized> = {
  ok: { es: "Disponible", en: "Available" },
  draft: { es: "Borrador", en: "Draft" },
  tbd: { es: "Por confirmar", en: "TBD" },
};

/** Renderiza los tramos entre backticks como `<code>`. */
function withInlineCode(text: string): ReactNode[] {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="rounded-sm bg-foreground/10 px-2 py-1 font-mono text-sm"
      >
        {part}
      </code>
    ) : (
      part
    )
  );
}

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
                <TableCell key={c} className="align-top text-base">
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

function ResourcesTable({ rows, tr }: { rows: ResourceRow[]; tr: Tr }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {[
              tr("Tipo", "Type", "Tipo"),
              tr("Recurso", "Resource", "Recurso"),
              tr("Estado", "Status", "Estado"),
            ].map((h) => (
              <TableHead key={h} className={TH}>
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={i}>
              <TableCell className="text-base">{L(tr, r.type)}</TableCell>
              <TableCell className="text-base">
                {r.href ? (
                  <Button asChild variant="primary" size="sm">
                    <a href={r.href} target="_blank" rel="noreferrer">
                      {L(tr, r.resource)}
                    </a>
                  </Button>
                ) : (
                  L(tr, r.resource)
                )}
              </TableCell>
              <TableCell className="text-base">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 font-sans text-xs font-semibold ${STATUS_CLASSES[r.status]}`}
                >
                  {L(tr, STATUS_LABELS[r.status])}
                </span>
              </TableCell>
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
          <span className="font-heading text-base font-extrabold tracking-[-0.01em] text-white">
            {isDo ? tr("Sí", "Do") : tr("No", "Don't")}
          </span>
        </div>
      </div>
      <p className="mt-4 font-sans text-base font-medium tracking-[-0.01em] text-foreground">
        {L(tr, example.caption)}
      </p>
    </div>
  );
}

function BlockView({ block, tr }: { block: Block; tr: Tr }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className={`mt-12 first:mt-0 ${SECTION_H}`}>{L(tr, block.text)}</h2>
      );

    case "prose":
      return (
        <p className="mt-3 font-sans text-lg leading-7 text-foreground first:mt-0">
          {L(tr, block.text)}
        </p>
      );

    case "bullets":
      return (
        <ul className="mt-5 list-disc space-y-1 pl-6 font-sans text-lg leading-7 text-foreground first:mt-0">
          {block.items.map((item, i) => (
            <li key={i}>{L(tr, item)}</li>
          ))}
        </ul>
      );

    case "ordered":
      return (
        <ol className="mt-5 list-decimal space-y-2 pl-6 font-sans text-lg leading-7 text-foreground first:mt-0">
          {block.items.map((item, i) => (
            <li key={i}>{L(tr, item)}</li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div className="mt-6 first:mt-0">
          {block.heading && (
            <h3 className={`mb-4 mt-12 ${SECTION_H}`}>
              {L(tr, block.heading)}
            </h3>
          )}
          <DataTable columns={block.columns} rows={block.rows} tr={tr} />
        </div>
      );

    /* Light Sky (--light-sky #d4fffe) con borde stroke/soft, radio 20. */
    case "callout":
      return (
        <div
          className={`mt-8 rounded-xl border ${STROKE_SOFT} bg-(--light-sky) px-7 py-8 font-sans text-lg leading-7 text-foreground first:mt-0`}
        >
          {block.title && (
            <strong className="font-semibold">{L(tr, block.title)} </strong>
          )}
          {L(tr, block.body)}
        </div>
      );

    /* "Secondary Sky" (--sky #8dfdfa), radio 31 como los paneles de la Plaza. */
    case "metric":
      return (
        <div
          className={`rounded-3xl border ${STROKE_SOFT} bg-(--sky) p-8 text-(--slate)`}
        >
          <h2 className="font-sans text-30 font-medium tracking-[-0.01em]">
            {L(tr, block.title)}
          </h2>
          {block.body.map((p, i) => (
            <p key={i} className="mt-4 font-sans text-base leading-6">
              {withInlineCode(L(tr, p))}
            </p>
          ))}
          {block.note && (
            <p className="mt-4 font-sans text-base leading-6">
              {L(tr, block.note)}
            </p>
          )}
        </div>
      );

    case "resources":
      return (
        <div className="mt-4 first:mt-0">
          <ResourcesTable rows={block.rows} tr={tr} />
        </div>
      );

    case "examples":
      return (
        <div className="mt-10 [display:grid] items-start gap-x-12 gap-y-10 first:mt-0 md:grid-cols-2">
          {block.items.map((ex, i) => (
            <ExampleFigure key={i} example={ex} tr={tr} />
          ))}
        </div>
      );

    case "note":
      return (
        <p className="mt-8 border-l-2 border-primary pl-4 font-sans text-base leading-6 text-foreground first:mt-0">
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
        <div className="mt-10 [display:grid] items-start gap-11 first:mt-0 md:grid-cols-2">
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

  return (
    <PlazaChrome>
      <main className="plaza-main pb-16">
        {/* ── Hero ─────────────────────────────────────────────────────────
            Panel linen 463px con borde stroke/soft; título Plain Black 60/54
            y bajada 16/24 en slate, como el hero del home. */}
        <section
          className={`mt-4 [display:grid] min-h-[464px] items-center gap-10 rounded-3xl border ${STROKE_SOFT} bg-card p-8 md:grid-cols-2 md:px-24 md:py-12`}
        >
          <div>
            <Breadcrumb className="mb-2">
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

            <h1 className="font-heading text-60 font-black leading-[54px] tracking-[-0.01em] text-foreground">
              {heroTitle}
            </h1>

            <p className="mt-4 max-w-[448px] font-sans text-base leading-6 text-foreground">
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
            Segmentado según Figma: track linen full-width con borde
            stroke/soft (alto 79), pill activo slate de 59 con texto linen,
            labels display 24px. Las pestañas salen del contenido, así que un
            patrón puede tener dos o tres. `key` por slug: al navegar entre
            patrones el componente no se remonta, y sin esto el tab elegido
            persistiría. */}
        <Tabs
          key={pattern.slug}
          defaultValue={pattern.tabs[0]?.id}
          className="mt-12"
        >
          {/* Con una sola pestaña la barra no aporta: el patrón se lee como
              una página corrida. */}
          <TabsList
            className={`w-full gap-2 rounded-full border ${STROKE_SOFT} bg-card p-2 ${
              pattern.tabs.length < 2 ? "hidden" : ""
            }`}
          >
            {pattern.tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="h-15 justify-center rounded-full px-10 font-heading text-xl font-black tracking-[-0.01em] text-foreground data-[state=active]:bg-(--slate) data-[state=active]:text-(--linen) data-[state=active]:shadow-none"
              >
                {L(tr, tab.label)}
              </TabsTrigger>
            ))}
          </TabsList>

          {pattern.tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="pt-10">
              <Blocks blocks={tab.blocks} tr={tr} />
            </TabsContent>
          ))}
        </Tabs>

        {/* ── Explorar patrones ────────────────────────────────────────────
            Mismas tarjetas que los "enlaces útiles" del home. */}
        <h2 className="plaza-links-title">
          {tr("Explorar patrones", "Explore patterns", "Explorar padrões")}
        </h2>
        <div className="[display:grid] gap-6 md:grid-cols-2">
          {explore.map((p) => (
            <article key={p.slug} className="plaza-link-card">
              <h3>{L(tr, p.name)}</h3>
              <p className="plaza-body">{L(tr, p.cardBody)}</p>
              <Link className="plaza-btn" to={`/patrones/${p.slug}`}>
                {tr(
                  "Ver las guías del patrón",
                  "Go to pattern guidelines",
                  "Ver as diretrizes do padrão"
                )}
              </Link>
            </article>
          ))}
        </div>
      </main>
    </PlazaChrome>
  );
}
