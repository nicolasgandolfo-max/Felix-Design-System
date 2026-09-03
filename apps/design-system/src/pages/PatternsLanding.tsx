import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { PlazaChrome } from "../components/PlazaChrome";
import { DIRECTORY } from "../patterns/content";
import {
  isPublished,
  type DirectoryEntry,
  type PatternFamily,
} from "../patterns/types";
import { useTr } from "../i18n";

/* Trazo `stroke/soft` de Figma, el mismo de todos los paneles del portal. */
const STROKE_SOFT = "border-[rgba(8,36,34,0.12)]";

type Filter = "all" | PatternFamily;

const FAMILY_LABELS: Record<PatternFamily, { es: string; en: string }> = {
  conversational: { es: "Conversational", en: "Conversational" },
  interaction: { es: "Interaction", en: "Interaction" },
};

/**
 * Tarjeta del directorio, en el layout horizontal del diseño: la miniatura
 * ocupa una columna de 128px a la izquierda y el contenido va a la derecha.
 * La miniatura es la misma imagen que el hero de la página del patrón.
 * Sin contenido escrito todavía, la tarjeta va sin enlace.
 */
function DirectoryCard({ entry }: { entry: DirectoryEntry }) {
  const tr = useTr();
  const published = isPublished(entry);

  const card = (
    <article
      className={`flex h-full min-h-44 gap-4 rounded-xl border ${STROKE_SOFT} bg-card p-5 transition-shadow ${
        published ? "group-hover:shadow-md" : ""
      }`}
    >
      <div className="flex w-32 shrink-0 items-center justify-center self-stretch overflow-hidden rounded-lg bg-(--stone)">
        {published && (
          <img
            src={entry.hero}
            alt=""
            className="size-full object-contain p-2"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-sans text-xxs font-bold uppercase text-foreground/60">
            FÉLIX · PATTERNS
          </p>
          <h3 className="font-heading text-lg font-black leading-tight text-foreground">
            {tr(entry.name.es, entry.name.en)}
          </h3>
        </div>

        <p className="flex-1 font-sans text-sm leading-5 text-foreground">
          {published
            ? tr(entry.cardBody.es, entry.cardBody.en)
            : tr(
                "Este patrón todavía no tiene contenido escrito.",
                "This pattern doesn't have its content written yet."
              )}
        </p>

        {published ? (
          <span className="flex items-center gap-1 font-sans text-xs font-bold text-foreground">
            {tr(
              "Ver las guías del patrón",
              "Go to pattern guidelines",
              "Ver as diretrizes do padrão"
            )}
            <ArrowRightIcon size={16} aria-hidden="true" />
          </span>
        ) : (
          <span className="font-sans text-xs font-bold text-foreground/40">
            {tr("Próximamente", "Coming soon", "Em breve")}
          </span>
        )}
      </div>
    </article>
  );

  return published ? (
    <Link to={`/patrones/${entry.slug}`} className="group block">
      {card}
    </Link>
  ) : (
    card
  );
}

export function PatternsLanding() {
  const tr = useTr();
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const prev = document.title;
    document.title = `${tr("Patrones", "Patterns", "Padrões")} · Félix`;
    return () => {
      document.title = prev;
    };
  }, [tr]);

  const counts = useMemo(
    () => ({
      all: DIRECTORY.length,
      interaction: DIRECTORY.filter((e) => e.family === "interaction").length,
      conversational: DIRECTORY.filter((e) => e.family === "conversational")
        .length,
    }),
    []
  );

  const visible = useMemo(
    () =>
      filter === "all"
        ? DIRECTORY
        : DIRECTORY.filter((e) => e.family === filter),
    [filter]
  );

  const filters: Array<{ key: Filter; label: string }> = [
    {
      key: "all",
      label: `${tr("Todos los patrones", "All Patterns", "Todos os padrões")} (${counts.all})`,
    },
    {
      key: "conversational",
      label: `${tr(FAMILY_LABELS.conversational.es, FAMILY_LABELS.conversational.en)} (${counts.conversational})`,
    },
    {
      key: "interaction",
      label: `${tr(FAMILY_LABELS.interaction.es, FAMILY_LABELS.interaction.en)} (${counts.interaction})`,
    },
  ];

  return (
    <PlazaChrome>
      <main className="plaza-main">
        {/* ── Hero ──────────────────────────────────────────────────────────
            El mismo hero del home, clases incluidas — el diseño reusa el
            frame tal cual. Aquí el botón baja al directorio en lugar de
            navegar, porque ya estamos en la página que ese botón abre. */}
        <section className="plaza-hero">
          <div className="plaza-hero-copy">
            <p className="plaza-eyebrow">FÉLIX · PATTERNS</p>
            <h1>Conversational Design</h1>
            <p className="plaza-body">
              {tr(
                "Los patrones que reutilizamos en el bot, cada uno con cuándo usarlo, cuándo no, un ejemplo y el porqué. Agrupados en dos familias: cómo preguntamos y qué decimos.",
                "The patterns we reuse across the bot, each with when to use it, when not to, an example, and the reason why. Grouped in two families: how we ask, and what we say.",
                "Os padrões que reutilizamos no bot, cada um com quando usar, quando não usar, um exemplo e o porquê. Agrupados em duas famílias: como perguntamos e o que dizemos."
              )}
            </p>
            <a className="plaza-btn" href="#browse">
              {tr("Explorar patrones", "Browse patterns", "Explorar padrões")}
            </a>
          </div>
          <img
            className="plaza-hero-img"
            src="/assets/plaza/hero-home.png"
            alt={tr(
              "Capturas de conversaciones del bot de Félix en WhatsApp",
              "Screenshots of Félix bot conversations on WhatsApp",
              "Capturas de conversas do bot do Félix no WhatsApp"
            )}
          />
        </section>

        {/* ── Directorio ────────────────────────────────────────────────────
            Sidebar de familias + grilla de dos columnas. Todo se deriva del
            registro en `patterns/content.ts`: sumar un patrón ahí lo agrega a
            la grilla y actualiza los contadores del filtro. */}
        <h2
          id="browse"
          className="mb-8 mt-20 scroll-mt-8 font-heading text-[32px] font-black tracking-[-0.01em] text-foreground"
        >
          {tr(
            "Explorar el directorio de Félix",
            "Explore Félix Directory",
            "Explorar o diretório do Félix"
          )}
        </h2>

        <div className="mb-24 flex flex-col gap-8 lg:flex-row lg:items-start">
          <nav
            className={`shrink-0 rounded-2xl border ${STROKE_SOFT} bg-card p-6 lg:w-[280px]`}
            aria-label={tr(
              "Familias de patrones",
              "Pattern families",
              "Famílias de padrões"
            )}
          >
            <p className="mb-3 font-sans text-sm font-extrabold uppercase text-foreground/50">
              {tr(
                "Familias de patrones",
                "Pattern Families",
                "Famílias de padrões"
              )}
            </p>
            <ul className="flex flex-col">
              {filters.map((f) => {
                const active = filter === f.key;
                return (
                  <li key={f.key}>
                    <button
                      type="button"
                      onClick={() => setFilter(f.key)}
                      aria-current={active ? "true" : undefined}
                      className={`w-full cursor-pointer py-2 text-left font-sans text-sm transition-colors ${
                        active
                          ? "font-extrabold text-foreground"
                          : "font-medium text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      {f.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* `[display:grid]` en lugar de `grid`: la clase `.grid` legacy del
              portal (3 columnas, 6 sobre 1440) le gana a la utility. */}
          <div className="[display:grid] flex-1 gap-5 md:grid-cols-2">
            {visible.map((entry) => (
              <DirectoryCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>
      </main>
    </PlazaChrome>
  );
}
