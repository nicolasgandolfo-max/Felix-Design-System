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
  Card,
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
        <h3 className="mt-10 font-heading text-lg tracking-heading text-foreground">
          {L(tr, table.heading)}
        </h3>
      )}
      <div className="mt-3 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{L(tr, table.columns[0])}</TableHead>
              <TableHead>{L(tr, table.columns[1])}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.rows.map(([a, b], i) => (
              <TableRow key={i}>
                <TableCell>{L(tr, a)}</TableCell>
                <TableCell>{L(tr, b)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

/** Par sí / no. La barra de color la pone el template, no el PNG. */
function ExampleFigure({ example, tr }: { example: Example; tr: Tr }) {
  const isDo = example.tone === "do";
  /* Los tokens de status no invierten entre temas, así que el texto va en
     `primary-foreground`, que es slate oscuro en claro y en oscuro. */
  const bar = isDo
    ? "bg-status-success text-primary-foreground"
    : "bg-status-error text-primary-foreground";

  return (
    <figure className="m-0 overflow-hidden rounded-lg border border-border">
      <div
        className={`flex items-center gap-2 px-4 py-3 font-sans text-sm font-bold ${bar}`}
      >
        <span aria-hidden="true">{isDo ? "✓" : "✕"}</span>
        {isDo ? tr("Sí", "Do") : tr("No", "Don't")}
      </div>
      <div className="bg-muted p-4">
        <img
          src={example.img}
          alt={L(tr, example.alt)}
          className="mx-auto block max-w-full"
        />
      </div>
      <figcaption className="px-4 pb-4 pt-3 font-sans text-sm text-secondary">
        {L(tr, example.caption)}
      </figcaption>
    </figure>
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

  return (
    <PlazaChrome>
      <main className="plaza-main pb-16">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="mt-4 [display:grid] items-center gap-10 rounded-3xl bg-card p-8 md:grid-cols-2 md:p-14">
          <div>
            <Breadcrumb className="mb-4">
              <BreadcrumbList className="uppercase tracking-wider">
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

            <h1 className="font-heading text-5xl leading-none tracking-display text-foreground md:text-6xl">
              {heroTitle}
            </h1>

            <p className="mt-4 max-w-[42ch] font-sans text-lg text-secondary">
              {L(tr, pattern.lede)}
            </p>
          </div>

          <img
            src={pattern.hero}
            alt={L(tr, pattern.heroAlt)}
            className="mx-auto w-full max-w-[420px]"
          />
        </section>

        {/* ── Tabs ──────────────────────────────────────────────────────── */}
        {/* `key` por slug: al navegar entre patrones el componente no se
            remonta, así que sin esto el tab elegido persiste y caés en
            Guidelines del patrón nuevo en lugar de Resumen. */}
        <Tabs key={pattern.slug} defaultValue="overview" className="mt-10">
          {/* `--card` y `--background` son el mismo valor en claro, así que el
              track va en `bg-muted` para que el pill activo (`bg-background`
              por defecto en el DS) tenga contraste en ambos temas. */}
          <TabsList className="w-full max-w-[540px] rounded-full bg-muted p-2">
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
                className="flex-1 rounded-full px-4 py-3 font-heading text-base"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── Resumen ──────────────────────────────────────────────── */}
          <TabsContent value="overview" className="pt-8">
            <div className="[display:grid] items-start gap-11 md:grid-cols-2">
              <div>
                <h2 className="font-heading text-3xl tracking-heading text-foreground">
                  {tr("Cuándo usarlo", "Usage", "Quando usar")}
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-6 font-sans text-base text-foreground">
                  {overview.usage.map((item, i) => (
                    <li key={i}>{L(tr, item)}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-primary p-7 text-primary-foreground">
                <h2 className="font-heading text-2xl tracking-heading">
                  {L(tr, overview.metric.title)}
                </h2>
                {overview.metric.body.map((p, i) => (
                  <p key={i} className="mt-3 font-sans text-base">
                    {withInlineCode(L(tr, p))}
                  </p>
                ))}
                {overview.metric.note && (
                  <p className="mt-3 font-sans text-sm opacity-80">
                    {L(tr, overview.metric.note)}
                  </p>
                )}
              </div>
            </div>

            <section className="mt-14">
              <h2 className="font-heading text-3xl tracking-heading text-foreground">
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
                      <TableHead>{tr("Tipo", "Type", "Tipo")}</TableHead>
                      <TableHead>
                        {tr("Recurso", "Resource", "Recurso")}
                      </TableHead>
                      <TableHead>{tr("Estado", "Status", "Estado")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overview.resources.map((r, i) => (
                      <TableRow key={i}>
                        <TableCell>{L(tr, r.type)}</TableCell>
                        <TableCell>
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
                        <TableCell>
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
          <TabsContent value="specs" className="pt-8">
            <h2 className="font-heading text-3xl tracking-heading text-foreground">
              {tr("Especificaciones", "Specs", "Especificações")}
            </h2>
            <p className="mt-2 font-sans text-base text-secondary">
              {L(tr, specs.intro)}
            </p>

            {specs.tables.map((table, i) => (
              <SpecTableBlock key={i} table={table} tr={tr} />
            ))}

            {specs.notes?.map((note, i) => (
              <p
                key={i}
                className="mt-6 border-l-2 border-primary pl-4 font-sans text-sm text-secondary"
              >
                {L(tr, note)}
              </p>
            ))}

            <p className="mt-6 font-sans text-sm text-secondary">
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
          <TabsContent value="guidelines" className="pt-8">
            <h2 className="font-heading text-3xl tracking-heading text-foreground">
              {tr("Guías", "Guidelines", "Diretrizes")}
            </h2>

            <div className="mt-6 [display:grid] gap-11 md:grid-cols-2">
              <div>
                <h3 className="font-heading text-lg tracking-heading text-foreground">
                  {tr("Cuándo usarlo", "Usage", "Quando usar")}
                </h3>
                <p className="mt-2 font-sans text-base text-foreground">
                  {L(tr, guidelines.usage)}
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg tracking-heading text-foreground">
                  {tr("Tips", "Tips", "Dicas")}
                </h3>
                <p className="mt-2 font-sans text-base text-foreground">
                  {L(tr, guidelines.tips)}
                </p>
              </div>
            </div>

            <div className="mt-8 [display:grid] gap-5 md:grid-cols-2">
              {guidelines.examples.map((ex, i) => (
                <ExampleFigure key={i} example={ex} tr={tr} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* ── Explorar patrones ─────────────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="font-heading text-3xl tracking-heading text-foreground">
            {tr("Explorar patrones", "Explore patterns", "Explorar padrões")}
          </h2>
          <div className="mt-4 [display:grid] gap-5 md:grid-cols-2">
            {otherPatterns(pattern.slug).map((p) => (
              <Card key={p.slug}>
                <h3 className="font-heading text-lg tracking-heading text-foreground">
                  {L(tr, p.title ?? p.name)}
                </h3>
                <p className="font-sans text-sm text-secondary">
                  {L(tr, p.cardBody)}
                </p>
                <Button asChild variant="line" size="sm" className="self-start">
                  <Link to={`/patrones/${p.slug}`}>
                    {tr("Ver el patrón", "Go to pattern", "Ver o padrão")}
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </PlazaChrome>
  );
}
