import { useEffect, type ReactNode } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon, BookOpenIcon } from "@phosphor-icons/react";
import { VT_ICONS } from "../data";
import { useTr } from "../i18n";
import {
  VT_GROUPS,
  VT_INTRO,
  VT_RESOURCES,
  VT_SECTIONS,
  getSection,
  shortTitle,
  siblings,
  type VtBlock,
  type VtTable,
} from "../voiceTone";

/**
 * Renderiza el formato inline del contenido: `**negrita**`, `` `código` `` y
 * `[[section-id]]` / `[[section-id#ancla|texto]]`, que enlaza otra sección.
 * Alcanza para lo que trae el Notion; no es un parser de Markdown.
 *
 * El token de referencia existe porque el original numeraba las secciones y
 * se citaba a sí mismo como "§7". Sin numeración a la vista, ese "§7" no
 * llevaría a ningún lado: acá cada cita es un enlace con el nombre.
 */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  // Un solo split por todos los delimitadores para no anidar pasadas.
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[\[[^\]]+\]\])/g);
  parts.forEach((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      out.push(<b key={i}>{part.slice(2, -2)}</b>);
    } else if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      out.push(
        <code className="vt-code" key={i}>
          {part.slice(1, -1)}
        </code>
      );
    } else if (part.startsWith("[[") && part.endsWith("]]")) {
      const [target, label] = part.slice(2, -2).split("|");
      const [id, anchor] = target.split("#");
      const section = getSection(id);
      // Una referencia a una sección que ya no existe se lee igual, sin enlace.
      if (!section) {
        out.push(label ?? id);
        return;
      }
      out.push(
        <Link
          className="vt-ref"
          key={i}
          to={`/voz-y-tono/${id}${anchor ? `#${anchor}` : ""}`}
        >
          {label ?? shortTitle(section.title)}
        </Link>
      );
    } else if (part) {
      out.push(part);
    }
  });
  return out;
}

function VtTableBlock({ table }: { table: VtTable }) {
  return (
    <div className={"tbl-wrap vt-tbl" + (table.headerColumn ? " head-col" : "")}>
      <table className="tbl">
        {table.cols && (
          <thead>
            <tr>
              {table.cols.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{inline(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ block }: { block: VtBlock }) {
  switch (block.k) {
    case "p":
      return <p className="vt-p">{inline(block.t)}</p>;
    case "h":
      return (
        <h3 className="h3 vt-h3" id={block.id}>
          {block.t}
        </h3>
      );
    case "table":
      return <VtTableBlock table={block.table} />;
    case "code":
      return (
        <div className="vt-example">
          {block.label && <span className="vt-example-label">{block.label}</span>}
          <div className="code-block">
            <pre>{block.t}</pre>
          </div>
        </div>
      );
    case "callout":
      return (
        <div className={"vt-callout " + block.tone}>
          <span className="vt-callout-icon" aria-hidden="true">
            {block.icon}
          </span>
          <p>{inline(block.t)}</p>
        </div>
      );
    case "ul":
      return (
        <ul className="vt-list">
          {block.items.map((it, i) => (
            <li key={i}>{inline(it)}</li>
          ))}
        </ul>
      );
    case "link":
      return (
        <p className="vt-p">
          <a className="btn-link" href={block.href} target="_blank" rel="noreferrer">
            {block.t}
          </a>
        </p>
      );
  }
}

/** Fija el título del documento mientras la página está montada. */
function useDocTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
}

/* ── Visión general ──────────────────────────────────────────────────────── */

export function VoiceToneOverview() {
  const tr = useTr();
  useDocTitle("Voice & Tone Guidelines · Félix");

  return (
    <>
      <div className="sys-hero-eyebrow">
        <span className="dash" />
        <span>FELIX PAGO · VOICE &amp; TONE</span>
      </div>

      <h1 className="sys-hero-title">
        {tr("Cómo suena Félix,", "How Félix sounds,", "Como o Félix soa,")}
        <br />
        <span className="hero-highlight">
          {tr("regla por regla.", "rule by rule.", "regra por regra.")}
        </span>
      </h1>

      <p className="sys-hero-desc">
        {tr(
          "La referencia viva de las decisiones de contenido y UX writing de Félix, compartida entre producto, diseño y marketing. Es la fuente de verdad: 17 secciones que van del formato de montos a la derivación con un agente humano.",
          "The living reference for the content and UX writing decisions made for Félix, shared across product, design, and marketing. It is the source of truth: 17 sections, from amount formatting to human handoff.",
          "A referência viva das decisões de conteúdo e UX writing do Félix, compartilhada entre produto, design e marketing. É a fonte da verdade: 17 seções, do formato de valores à transferência para um agente humano."
        )}
      </p>

      <div className="sys-meta-strip">
        <div className="meta-col">
          <span className="lbl">{tr("VERSIÓN", "VERSION", "VERSÃO")}</span>
          <span className="val">v0.4</span>
        </div>
        <div className="meta-col">
          <span className="lbl">{tr("SECCIONES", "SECTIONS", "SEÇÕES")}</span>
          <span className="val">{VT_SECTIONS.length}</span>
        </div>
        <div className="meta-col">
          <span className="lbl">{tr("TRATAMIENTO", "FORMALITY", "TRATAMENTO")}</span>
          <span className="val">Tú (informal)</span>
        </div>
        <div className="meta-col">
          <span className="lbl">{tr("MANTIENE", "OWNER", "MANTÉM")}</span>
          <span className="val">Content Design</span>
        </div>
      </div>

      <div className="vt-callout info vt-intro">
        <span className="vt-callout-icon" aria-hidden="true">
          {VT_INTRO.icon}
        </span>
        <p>{inline(VT_INTRO.t)}</p>
      </div>

      {/* Índice por grupo: el mismo orden que el menú lateral. Cada grupo
          lleva su color, así se distinguen de un vistazo y no dependen sólo
          del encabezado para separarse. */}
      {VT_GROUPS.map((g) => (
        <section
          className="sec vt-group-sec"
          key={g.id}
          data-accent={g.accent}
        >
          <h2 className="sys-section-title vt-group-title">
            <span className="vt-group-dot" aria-hidden="true" />
            {tr(g.es, g.en, g.pt).toUpperCase()}
          </h2>
          <div className="vt-group-grid">
            {g.ids.map((id) => {
              const s = getSection(id)!;
              const Icon = VT_ICONS[s.id] ?? BookOpenIcon;
              return (
                <Link className="vt-group-card" to={`/voz-y-tono/${s.id}`} key={s.id}>
                  <span className="vt-card-icon">
                    <Icon size={20} weight="regular" />
                  </span>
                  <span className="vt-card-title">{shortTitle(s.title)}</span>
                  <span className="vt-card-blurb">{s.blurb}</span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <section className="sec vt-sec" id="resources">
        <h2 className="h2 vt-h2">{tr("Recursos", "Resources", "Recursos")}</h2>
        <ul className="vt-resources">
          {VT_RESOURCES.map((r) => (
            <li key={r.label}>
              <span className="vt-res-icon" aria-hidden="true">
                {r.icon}
              </span>
              <span>
                {r.href ? (
                  r.href.startsWith("/") ? (
                    <Link to={r.href}>{r.label}</Link>
                  ) : (
                    <a href={r.href} target="_blank" rel="noreferrer">
                      {r.label}
                    </a>
                  )
                ) : (
                  <b>{r.label}</b>
                )}{" "}
                — {r.note}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

/* ── Una sección por página ──────────────────────────────────────────────── */

export function VoiceToneSection() {
  const tr = useTr();
  const { slug } = useParams();
  const { hash } = useLocation();
  const section = getSection(slug);
  useDocTitle(section ? `${section.title} · Voice & Tone` : "Voice & Tone");

  /* Las referencias entre secciones pueden apuntar a un subtítulo. El salto
     espera al frame siguiente a propósito: hacerlo en el mismo tick mide
     contra el layout de la sección de la que venimos —más alta— y se pasa de
     largo. Leer `offsetHeight` fuerza el recálculo antes de medir, y las
     fuentes se reintentan porque al cargar corren el contenido. */
  useEffect(() => {
    if (!hash) return;
    let cancelled = false;
    const jump = () => {
      if (cancelled) return;
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      void document.documentElement.offsetHeight;
      el.scrollIntoView({ block: "start", behavior: "instant" });
    };
    const raf = requestAnimationFrame(jump);
    document.fonts?.ready.then(jump);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [hash, slug]);

  // Un slug inexistente vuelve al índice en lugar de dar una página en blanco.
  if (!section) return <Navigate to="/voz-y-tono" replace />;

  const { prev, next } = siblings(section.id);
  const group = VT_GROUPS.find((g) => g.ids.includes(section.id));

  return (
    <>
      {group && (
        <div className="eyebrow vt-sec-eyebrow">
          <span>{tr(group.es, group.en, group.pt)}</span>
        </div>
      )}
      <h1 className="h2 vt-page-title">{section.title}</h1>

      {section.blocks.map((b, i) => (
        <Block block={b} key={i} />
      ))}

      <nav className="vt-pager" aria-label={tr("Secciones", "Sections", "Seções")}>
        {prev ? (
          <Link className="vt-pager-link prev" to={`/voz-y-tono/${prev.id}`}>
            <ArrowLeftIcon size={16} />
            <span>
              <small>{tr("Anterior", "Previous", "Anterior")}</small>
              {shortTitle(prev.title)}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link className="vt-pager-link next" to={`/voz-y-tono/${next.id}`}>
            <span>
              <small>{tr("Siguiente", "Next", "Próxima")}</small>
              {shortTitle(next.title)}
            </span>
            <ArrowRightIcon size={16} />
          </Link>
        )}
      </nav>
    </>
  );
}
