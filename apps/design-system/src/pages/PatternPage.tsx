import { useEffect, type ReactNode } from "react";
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
  Example,
  Localized,
  ResourceStatus,
  SpecTable,
} from "../patterns/types";
import { useTr } from "../i18n";

type Tr = (es: string, en: string, pt?: string) => string;

/** Resuelve un texto localizado con el traductor activo. PT cae a EN. */
const L = (tr: Tr, l: Localized) => tr(l.es, l.en);

/* Trazo `stroke/soft` de Figma — el mismo que usan .plaza-hero y .plaza-card.
   El token --border del DS es #cfcabf y no corresponde acá. */
const STROKE_SOFT = "border-[rgba(8,36,34,0.12)]";

/* Título de sección según Figma: Saans/Inter Medium 30px, no display. */
const SECTION_H = "font-sans text-[30px] font-medium tracking-[-0.01em] text-foreground";

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
        className="rounded-xs bg-foreground/10 px-1.5 py-0.5 font-mono text-sm"
      >
        {part}
      </code>
    ) : (
      part
    )
  );
}

function SpecTableBlock({ table, tr }: { table: SpecTable; tr: Tr }) {
  return (
    <>
      {table.heading && (
        <h3 className={`mt-12 ${SECTION_H}`}>{L(tr, table.heading)}</h3>
      )}
      <div className="mt-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {table.columns.map((col, i) => (
                <TableHead
                  key={i}
                  className="font-sans text-base font-medium uppercase text-foreground/50"
                >
                  {L(tr, col)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.rows.map(([a, b], i) => (
              <TableRow key={i}>
                <TableCell className="text-base">{L(tr, a)}</TableCell>
                <TableCell className="text-base">{L(tr, b)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

/** Par sí / no según Figma: tarjeta linen con la pantalla adentro, barra de
 *  veredicto abajo (cactus / papaya) y el caption afuera, debajo. */
function ExampleFigure({ example, tr }: { example: Example; tr: Tr }) {
  const isDo = example.tone === "do";

  return (
    <div>
      <div
        className={`flex flex-col overflow-hidden rounded-[31px] border ${STROKE_SOFT} bg-card`}
      >
        <div className="flex min-h-[283px] flex-1 items-center justify-center p-8">
          <img
            src={example.img}
            alt={L(tr, example.alt)}
            className="h-auto w-full max-w-[300px]"
          />
        </div>
        <div
          className={`flex h-[59px] shrink-0 items-center gap-3 border-t ${STROKE_SOFT} px-6 ${
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

export function PatternPage() {
  const { slug = "" } = useParams();
  const tr = useTr();
  const pattern = getPattern(slug);
  const heroTitle = pattern && L(tr, pattern.title ?? pattern.name);

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

  const { overview, specs, guidelines } = pattern;
  const heroImgs = pattern.heroDetail ?? [pattern.hero];

  return (
    <PlazaChrome>
      <main className="plaza-main pb-16">
        {/* ── Hero ─────────────────────────────────────────────────────────
            Panel linen 463px con borde stroke/soft; título Plain Black 60/54
            y bajada 16/24 en slate, como el hero del home. */}
        <section
          className={`mt-4 [display:grid] min-h-[463px] items-center gap-10 rounded-[31px] border ${STROKE_SOFT} bg-card p-8 md:grid-cols-2 md:px-24 md:py-12`}
        >
          <div>
            <Breadcrumb className="mb-1.5">
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

            <h1 className="font-heading text-[60px] font-black leading-[54px] tracking-[-0.01em] text-foreground">
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
            labels display 24px. */}
        <Tabs key={pattern.slug} defaultValue="overview" className="mt-12">
          <TabsList
            className={`w-full gap-1.5 rounded-full border ${STROKE_SOFT} bg-card p-[9px]`}
          >
            {(
              [
                ["overview", tr("Resumen", "Overview", "Resumo")],
                ["specs", tr("Especificaciones", "Specs", "Especificações")],
                ["guidelines", tr("Guías", "Guidelines", "Diretrizes")],
              ] as const
            ).map(([value, label]) => (
              <TabsTrigger
                key={value}
                value={value}
                className="h-[59px] justify-center rounded-full px-10 font-heading text-[24px] font-black tracking-[-0.01em] text-foreground data-[state=active]:bg-(--slate) data-[state=active]:text-(--linen) data-[state=active]:shadow-none"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── Resumen ──────────────────────────────────────────────── */}
          <TabsContent value="overview" className="pt-10">
            <div className="[display:grid] items-start gap-11 md:grid-cols-2">
              <div>
                <h2 className={SECTION_H}>
                  {tr("Cuándo usarlo", "Usage", "Quando usar")}
                </h2>
                <ul className="mt-5 list-disc space-y-1 pl-6 font-sans text-[20px] leading-7 text-foreground">
                  {overview.usage.map((item, i) => (
                    <li key={i}>{L(tr, item)}</li>
                  ))}
                </ul>
              </div>

              {/* "Secondary Sky" de la paleta Félix (--sky #8dfdfa). */}
              <div
                className={`rounded-[31px] border ${STROKE_SOFT} bg-(--sky) p-8 text-(--slate)`}
              >
                <h2 className="font-sans text-[30px] font-medium tracking-[-0.01em]">
                  {L(tr, overview.metric.title)}
                </h2>
                {overview.metric.body.map((p, i) => (
                  <p key={i} className="mt-4 font-sans text-base leading-6">
                    {withInlineCode(L(tr, p))}
                  </p>
                ))}
                {overview.metric.note && (
                  <p className="mt-4 font-sans text-base leading-6">
                    {L(tr, overview.metric.note)}
                  </p>
                )}
              </div>
            </div>

            <section className="mt-16">
              <h2 className={SECTION_H}>
                {tr(
                  "Recursos y disponibilidad",
                  "Resources & availability",
                  "Recursos e disponibilidade"
                )}
              </h2>
              <div className="mt-4 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {(
                        [
                          tr("Tipo", "Type", "Tipo"),
                          tr("Recurso", "Resource", "Recurso"),
                          tr("Estado", "Status", "Estado"),
                        ] as const
                      ).map((h) => (
                        <TableHead
                          key={h}
                          className="font-sans text-base font-medium uppercase text-foreground/50"
                        >
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overview.resources.map((r, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-base">
                          {L(tr, r.type)}
                        </TableCell>
                        <TableCell className="text-base">
                          {r.href ? (
                            <Button asChild variant="primary" size="sm">
                              <a
                                href={r.href}
                                target="_blank"
                                rel="noreferrer"
                              >
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
            </section>
          </TabsContent>

          {/* ── Especificaciones ─────────────────────────────────────── */}
          <TabsContent value="specs" className="pt-10">
            <h2 className={SECTION_H}>
              {tr("Especificaciones", "Specs", "Especificações")}
            </h2>
            <p className="mt-3 font-sans text-[20px] leading-7 text-foreground">
              {L(tr, specs.intro)}
            </p>

            {specs.tables.map((table, i) => (
              <SpecTableBlock key={i} table={table} tr={tr} />
            ))}

            {specs.notes?.map((note, i) => (
              <p
                key={i}
                className="mt-8 border-l-2 border-primary pl-4 font-sans text-base leading-6 text-foreground"
              >
                {L(tr, note)}
              </p>
            ))}

            <p className="mt-8 font-sans text-xs font-medium leading-7 text-foreground/50">
              {L(tr, specs.source)}
              {specs.sourceHref && (
                <a
                  href={specs.sourceHref}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {specs.sourceLinkText ?? specs.sourceHref}
                </a>
              )}
            </p>
          </TabsContent>

          {/* ── Guías ────────────────────────────────────────────────── */}
          <TabsContent value="guidelines" className="pt-10">
            <div className="[display:grid] gap-11 md:grid-cols-2">
              <div>
                <h2 className={SECTION_H}>
                  {tr("Cuándo usarlo", "Usage", "Quando usar")}
                </h2>
                <p className="mt-3 font-sans text-[20px] leading-7 text-foreground">
                  {L(tr, guidelines.usage)}
                </p>
              </div>
              <div>
                <h2 className={SECTION_H}>{tr("Tips", "Tips", "Dicas")}</h2>
                <p className="mt-3 font-sans text-[20px] leading-7 text-foreground">
                  {L(tr, guidelines.tips)}
                </p>
              </div>
            </div>

            <div className="mt-10 [display:grid] items-start gap-x-12 gap-y-10 md:grid-cols-2">
              {guidelines.examples.map((ex, i) => (
                <ExampleFigure key={i} example={ex} tr={tr} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* ── Explorar patrones ────────────────────────────────────────────
            Mismas tarjetas que los "enlaces útiles" del home. */}
        <h2 className="plaza-links-title">
          {tr("Explorar patrones", "Explore patterns", "Explorar padrões")}
        </h2>
        <div className="[display:grid] gap-6 md:grid-cols-2">
          {otherPatterns(pattern.slug).map((p) => (
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
