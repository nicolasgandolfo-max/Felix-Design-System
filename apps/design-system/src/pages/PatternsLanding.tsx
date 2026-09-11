import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PATTERNS } from "../patterns/content";
import { PATTERN_FAMILIES, patternIcon, patternsOf } from "../patterns/nav";
import type { Localized } from "../patterns/types";
import { useTr } from "../i18n";

/**
 * Visión general de las guías conversacionales, con la misma estructura que
 * la del sistema de diseño: eyebrow, hero, franja de metadatos y una sección
 * de tarjetas por familia (las mismas subsecciones que el panel lateral).
 * Todo se deriva del registro en `patterns/content.ts`: sumar un patrón ahí
 * lo agrega a su familia y actualiza los contadores.
 */
export function PatternsLanding() {
  const tr = useTr();
  const L = (l: Localized) => tr(l.es, l.en, l.pt);

  useEffect(() => {
    const prev = document.title;
    document.title = `${tr(
      "Guías conversacionales",
      "Conversational guidelines",
      "Guias de conversa"
    )} · Félix`;
    return () => {
      document.title = prev;
    };
  }, [tr]);

  return (
    <>
      <div className="sys-hero-eyebrow">
        <span className="dash" />
        <span>FÉLIX · CONVERSATIONAL GUIDELINES</span>
      </div>

      <h1 className="sys-hero-title">
        Conversational
        <br />
        <span className="hero-highlight">Design</span>
      </h1>

      <p className="sys-hero-desc">
        {tr(
          "Los patrones que reutilizamos en el bot, cada uno con cuándo usarlo, cuándo no, un ejemplo y el porqué. Agrupados en dos familias: cómo preguntamos y qué decimos.",
          "The patterns we reuse across the bot, each with when to use it, when not to, an example, and the reason why. Grouped in two families: how we ask, and what we say.",
          "Os padrões que reutilizamos no bot, cada um com quando usar, quando não usar, um exemplo e o porquê. Agrupados em duas famílias: como perguntamos e o que dizemos."
        )}
      </p>

      <div className="sys-meta-strip">
        <div className="meta-col">
          <span className="lbl">{tr("PATRONES", "PATTERNS", "PADRÕES")}</span>
          <span className="val">{PATTERNS.length}</span>
        </div>
        <div className="meta-col">
          <span className="lbl">{tr("FAMILIAS", "FAMILIES", "FAMÍLIAS")}</span>
          <span className="val">{PATTERN_FAMILIES.length}</span>
        </div>
        <div className="meta-col">
          <span className="lbl">{tr("CANAL", "CHANNEL", "CANAL")}</span>
          <span className="val">WhatsApp</span>
        </div>
        <div className="meta-col">
          <span className="lbl">{tr("FUENTE", "SOURCE", "FONTE")}</span>
          <span className="val">Figma · Conversational Guidelines</span>
        </div>
      </div>

      {PATTERN_FAMILIES.map((family) => {
        const items = patternsOf(family.id);
        return (
          <section key={family.id} className="sys-grid-section">
            <div className="sys-section-head">
              <h2 className="sys-section-title">
                {L(family.label)} · {items.length}
              </h2>
              <p>{L(family.blurb)}</p>
            </div>

            <div className="sys-cards-grid">
              {items.map((p) => {
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
                    <h3 className="tile-title">{L(p.name)}</h3>
                    <p className="tile-desc">{L(p.cardBody)}</p>
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
        );
      })}
    </>
  );
}
