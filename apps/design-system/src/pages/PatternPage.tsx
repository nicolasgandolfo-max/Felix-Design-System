import { useEffect, useMemo } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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

/* Las pantallas de `public/assets/patterns/` se exportan de Figma a 2x (ver el
   README). Declararlas como 2x hace que el navegador las dibuje a su tamaño
   real de Figma, así cada burbuja de WhatsApp sale a la misma escala en todas
   las páginas sin fijar anchos a mano. El placeholder SVG va como 1x, y la
   densidad se declara siempre: al navegar entre patrones React reusa el mismo
   <img>, y si solo se quitara el srcSet Chrome conservaría la densidad 2 del
   PNG anterior y dibujaría el placeholder a la mitad. */
const retina = (src: string) => `${src} ${src.endsWith(".png") ? 2 : 1}x`;

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
// Cada subsección es una lista de bloques (ver `patterns/types.ts`). Los
// márgenes superiores llevan `first:mt-0` para que el primer bloque de una
// subsección o de una columna quede al ras.

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
            srcSet={retina(example.img)}
            alt={L(tr, example.alt)}
            className="h-auto w-auto max-w-full"
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
            {isDo ? tr("Sí", "Do", "Sim") : tr("No", "Don't", "Não")}
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
                  className="h-auto w-auto max-w-full max-h-[620px]"
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
  const { hash } = useLocation();
  const tr = useTr();
  const pattern = getPattern(slug);
  const heroTitle = pattern && L(tr, pattern.title ?? pattern.name);

  /* Se barajan una vez por visita (clave: slug), así un cambio de idioma no
     reordena las tarjetas debajo del lector. */
  const explore = useMemo(() => pickTwo(otherPatterns(slug)), [slug]);

  useEffect(() => {
    if (!heroTitle) return;
    const prev = document.title;
    document.title = `${heroTitle} · Félix`;
    return () => {
      document.title = prev;
    };
  }, [heroTitle]);

  /* Las subsecciones se enlazan por ancla desde el panel lateral, y React
     Router no mueve el scroll al cambiar el hash. */
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (!el) return;

    const jump = () =>
      el.scrollIntoView({ block: "start", behavior: "instant" });
    jump();

    /* Las láminas del hero y de los ejemplos no reservan alto: al entrar con
       el ancla en la URL todavía no cargaron, y cuando lo hacen empujan el
       contenido y la sección queda corrida. Se repite el salto a medida que
       cargan y se deja de insistir en cuanto quien lee toca el scroll. */
    const pending = Array.from(document.images).filter((img) => !img.complete);
    if (!pending.length) return;

    const stop = () => {
      for (const img of pending) {
        img.removeEventListener("load", jump);
        img.removeEventListener("error", jump);
      }
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
    for (const img of pending) {
      img.addEventListener("load", jump);
      img.addEventListener("error", jump);
    }
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    return stop;
  }, [hash, slug]);

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

        <div className="flex items-start gap-3 md:max-w-[260px] md:justify-end xl:max-w-[440px]">
          {heroImgs.map((src, i) => (
            <img
              key={i}
              /* El alt describe el conjunto; las láminas extra son decorativas. */
              alt={i === 0 ? L(tr, pattern.heroAlt) : ""}
              src={src}
              srcSet={retina(src)}
              className="h-auto w-auto min-w-0 max-w-full max-h-[340px] xl:max-h-[400px]"
            />
          ))}
        </div>
      </header>

      {/* ── Subsecciones ─────────────────────────────────────────────────
            Lo que antes eran pestañas (Resumen / Especificaciones / Guías)
            son secciones apiladas de la misma página: se leen de corrido, se
            buscan con el buscador del navegador y se enlazan por ancla
            (`/patrones/<slug>#specs`) desde el panel lateral. Cada una lleva
            el título de sección del portal y, salvo la primera, una línea
            stroke/soft que la separa de la anterior. Con una sola subsección
            el título sobra — es la página entera —, igual que antes se
            ocultaba la barra de pestañas. */}
      {pattern.sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={
            i === 0
              ? "mt-12 scroll-mt-8"
              : `mt-14 scroll-mt-8 border-t ${STROKE_SOFT} pt-12`
          }
        >
          {pattern.sections.length > 1 && (
            <h2 className="sys-section-title">{L(tr, section.label)}</h2>
          )}
          {/* Los bloques van en su propio contenedor para que el primero siga
              siendo `:first-child` y su `first:mt-0` gane al título. */}
          <div className={pattern.sections.length > 1 ? "mt-6" : ""}>
            <Blocks blocks={section.blocks} tr={tr} />
          </div>
        </section>
      ))}

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
