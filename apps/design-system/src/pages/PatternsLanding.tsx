import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PlazaChrome } from "../components/PlazaChrome";
import { PATTERNS } from "../patterns/content";
import { useTr } from "../i18n";

export function PatternsLanding() {
  const tr = useTr();

  useEffect(() => {
    const prev = document.title;
    document.title = `${tr("Patrones", "Patterns", "Padrões")} · Félix`;
    return () => {
      document.title = prev;
    };
  }, [tr]);

  return (
    <PlazaChrome>
      <main className="plaza-main">
        {/* ── Hero ──────────────────────────────────────────────────────────
            El mismo hero del home, clases incluidas — el diseño reusa el
            frame tal cual. Acá el botón baja a la grilla en lugar de navegar,
            porque ya estamos en la página que ese botón abre desde el home. */}
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

        {/* ── Grilla de patrones ────────────────────────────────────────────
            Se deriva del registro en `patterns/content.ts`: agregar un patrón
            ahí lo suma acá, en las rutas y en los links cruzados. Dentro de
            `.plaza-main`, la grilla ocupa todo el ancho (80px de margen por
            lado a 1440). */}
        <h2 id="browse" className="plaza-links-title">
          {tr("Explorar patrones", "Browse patterns", "Explorar padrões")}
        </h2>

        <div className="mb-24 [display:grid] gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PATTERNS.map((p) => (
            <article key={p.slug} className="plaza-card">
              <div className="plaza-card-media">
                {/* La regla `.plaza-card-media img` fija width 79% (pensada
                    para las artes anchas del home); estas son verticales, así
                    que se dimensionan por altura para no desbordar la caja. */}
                <img
                  src={p.hero}
                  alt=""
                  style={{ width: "auto", height: "86%" }}
                />
              </div>
              <p className="plaza-eyebrow">FÉLIX · PATTERNS</p>
              {/* h3 con el tamaño de tarjeta del diseño (31px) — la regla
                  `.plaza-card h2` (48px) está pensada para las cards de a dos
                  del home y queda enorme de a tres. */}
              <h3 className="-mt-2 font-heading text-[31px] font-black leading-[35px] tracking-[-0.01em]">
                {tr(p.name.es, p.name.en)}
              </h3>
              <p className="plaza-body flex-1">{tr(p.cardBody.es, p.cardBody.en)}</p>
              <Link className="plaza-btn self-start" to={`/patrones/${p.slug}`}>
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
