import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  ChatCircleTextIcon,
  CursorClickIcon,
} from "@phosphor-icons/react";
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

/* El diseño deja el tile de ícono como placeholder repetido en las 9 tarjetas.
   Lo resolvemos por familia, que es el único dato real disponible; cuando haya
   íconos propios por patrón, se reemplaza acá. */
const FAMILY_ICONS: Record<PatternFamily, typeof ChatCircleTextIcon> = {
  conversational: ChatCircleTextIcon,
  interaction: CursorClickIcon,
};

/** Tarjeta del directorio. Sin contenido escrito todavía, va sin enlace. */
function DirectoryCard({ entry }: { entry: DirectoryEntry }) {
  const tr = useTr();
  const published = isPublished(entry);
  const FamilyIcon = FAMILY_ICONS[entry.family];

  const card = (
    <article
      className={`flex h-full min-h-56 flex-col gap-4 rounded-xl border ${STROKE_SOFT} bg-white p-6 transition-shadow ${
        published ? "group-hover:shadow-md" : ""
      }`}
    >
      <div className="flex w-full items-center gap-4">
        {/* Miniatura 76px: el arte del patrón, o la caja vacía si está pendiente. */}
        <div
          className={`flex size-19 shrink-0 items-center justify-center overflow-hidden rounded-lg border ${STROKE_SOFT} bg-(--stone)`}
        >
          {published && (
            <img
              src={entry.hero}
              alt=""
              className="size-full object-contain p-1"
            />
          )}
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--turquoise-100)">
          <FamilyIcon size={20} aria-hidden="true" />
        </div>
        <h3 className="min-w-0 flex-1 font-heading text-base font-black leading-tight text-foreground">
          {tr(entry.name.es, entry.name.en)}
        </h3>
      </div>

      <p className="flex-1 font-sans text-sm leading-normal text-foreground">
        {published
          ? tr(entry.cardBody.es, entry.cardBody.en)
          : tr(
              "Este patrón todavía no tiene contenido escrito.",
              "This pattern doesn't have its content written yet."
            )}
      </p>

      {published ? (
        <span className="flex items-center gap-1 font-sans text-sm font-bold text-(--turquoise-800)">
          {tr("Ver", "View", "Ver")}
          <ArrowRightIcon size={16} aria-hidden="true" />
        </span>
      ) : (
        <span className="font-sans text-sm font-bold text-foreground/40">
          {tr("Próximamente", "Coming soon", "Em breve")}
        </span>
      )}
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
      {/* Banda linen a todo el ancho detrás del directorio, con el trazo
          stroke/soft arriba y abajo. El contenido queda dentro de
          `.plaza-main`, que da 1280px y 80px de margen a 1440. */}
      <main className={`flex-1 border-y ${STROKE_SOFT} bg-(--linen)`}>
        <div className="plaza-main py-20">
          <h1 className="mb-20 font-heading text-[32px] font-black tracking-[-0.01em] text-foreground">
            {tr(
              "Explorar el directorio de Félix",
              "Explore Félix Directory",
              "Explorar o diretório do Félix"
            )}
          </h1>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <nav
              className={`shrink-0 rounded-2xl border ${STROKE_SOFT} bg-background p-6 lg:w-[280px]`}
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
        </div>
      </main>
    </PlazaChrome>
  );
}
