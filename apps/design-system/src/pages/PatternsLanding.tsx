import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@felix/ui";
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
    <PlazaChrome activeNav="patterns">
      <main className="mx-auto w-full max-w-[1360px] flex-1 px-10 pb-16">
        {/* ── Hero ──────────────────────────────────────────────────────────
            Mismo hero que el home (el diseño reusa el frame). Acá el botón
            baja a la grilla en lugar de navegar, porque ya estamos en la
            página que ese botón abre desde el home.

            Panel permanentemente oscuro, igual que `.plaza-footer`: usa los
            tokens de marca `--slate` / `--linen`, que no invierten con el tema.
            Ojo: `--secondary` en este DS es `#adaa9e` (gris cálido), no el
            slate — no sirve para este panel. */}
        <section className="mt-4 grid items-center gap-10 rounded-3xl bg-(--slate) p-8 md:grid-cols-[1fr_1.05fr] md:p-14">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 text-(--linen)">
              <p className="font-sans text-base uppercase">FÉLIX · PATTERNS</p>
              <h1 className="font-heading text-5xl leading-none tracking-display md:text-60">
                Conversational Design
              </h1>
            </div>
            <p className="max-w-[448px] font-sans text-base text-(--linen)">
              {tr(
                "Los patrones que reutilizamos en el bot, cada uno con cuándo usarlo, cuándo no, un ejemplo y el porqué. Agrupados en dos familias: cómo preguntamos y qué decimos.",
                "The patterns we reuse across the bot, each with when to use it, when not to, an example, and the reason why. Grouped in two families: how we ask, and what we say.",
                "Os padrões que reutilizamos no bot, cada um com quando usar, quando não usar, um exemplo e o porquê. Agrupados em duas famílias: como perguntamos e o que dizemos."
              )}
            </p>
            <Button asChild variant="primary" size="md" className="self-start">
              <a href="#browse">
                {tr("Explorar patrones", "Browse patterns", "Explorar padrões")}
              </a>
            </Button>
          </div>

          <img
            src="/assets/plaza/hero-home.png"
            alt={tr(
              "Capturas de conversaciones del bot de Félix en WhatsApp",
              "Screenshots of Félix bot conversations on WhatsApp",
              "Capturas de conversas do bot do Félix no WhatsApp"
            )}
            className="w-full"
          />
        </section>

        {/* ── Grilla de patrones ────────────────────────────────────────────
            Se deriva del registro en `patterns/content.ts`: agregar un patrón
            ahí lo suma acá, en las rutas y en los links cruzados. */}
        <h2
          id="browse"
          className="mt-16 scroll-mt-8 font-heading text-4xl tracking-display text-foreground"
        >
          {tr("Explorar patrones", "Browse patterns", "Explorar padrões")}
        </h2>

        <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PATTERNS.map((p) => (
            <article
              key={p.slug}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
            >
              <div className="flex h-[175px] items-center justify-center overflow-hidden rounded-xl bg-muted">
                <img
                  src={p.hero}
                  alt=""
                  className="max-h-full w-auto object-contain"
                />
              </div>

              <p className="font-sans text-xs uppercase tracking-wider text-secondary">
                FÉLIX · PATTERNS
              </p>
              <h3 className="font-heading text-3xl leading-tight tracking-heading text-foreground">
                {tr(p.name.es, p.name.en)}
              </h3>
              <p className="flex-1 font-sans text-sm text-foreground">
                {tr(p.cardBody.es, p.cardBody.en)}
              </p>

              <Button asChild variant="primary" size="sm" className="self-start">
                <Link to={`/patrones/${p.slug}`}>
                  {tr(
                    "Ver las guías del patrón",
                    "Go to pattern guidelines",
                    "Ver as diretrizes do padrão"
                  )}
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </main>
    </PlazaChrome>
  );
}
