import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Logo } from "@felix/ui";
import { GlobeIcon, CaretDownIcon } from "@phosphor-icons/react";
import { useLang, useTr } from "../i18n";

/* Destinos aún sin sección propia en el portal — mismo criterio que PlazaHome. */
const FIGMA_GUIDELINES_URL =
  "https://www.figma.com/design/N9dG8uXXR7FkLkuSZT5oex/DRAFT-Conversational-Guidelines";

const ASSETS = "/assets/patterns";

/** Un patrón en la grilla. `to` en null = la página todavía no existe. */
type PatternCard = {
  key: string;
  title: { es: string; en: string };
  body: { es: string; en: string };
  img: string;
  to: string | null;
};

/* Los tres patrones con contenido real en Figma (node 327:4077). Las otras seis
   tarjetas del diseño son placeholders con el título "Pattern" y copy
   reciclado, así que no se portan hasta que tengan contenido propio. */
const PATTERNS: PatternCard[] = [
  {
    key: "closed-input",
    title: { es: "Entrada cerrada", en: "Closed Input" },
    body: {
      es: "Botones o una lista cuando el conjunto de respuestas posibles se conoce. El usuario elige; nunca tiene que adivinar cómo escribirlo.",
      en: "Buttons or a list when the set of possible answers is known. The user picks; they never have to guess the wording.",
    },
    img: `${ASSETS}/closed-input-card.png`,
    to: "/patrones/entrada-cerrada",
  },
  {
    key: "open-input",
    title: { es: "Entrada abierta", en: "Open Input" },
    body: {
      es: "Una pregunta que se responde con texto libre, para cuando la respuesta no se puede listar de antemano (un nombre, un monto a medida, una ciudad). El usuario escribe, y el bot tiene que leer lo que venga.",
      en: "A question answered with free text, for when the answer can't be listed in advance (a name, a custom amount, a city). The user types, and the bot has to read whatever comes back.",
    },
    img: `${ASSETS}/open-input-card.png`,
    to: null,
  },
  {
    key: "mixed-input",
    title: { es: "Entrada mixta", en: "Mixed input" },
    body: {
      es: "Una pregunta que ofrece las respuestas más comunes como botones y todavía deja escribir la propia. Un camino rápido para la mayoría, una puerta abierta para la cola larga.",
      en: "A question that offers the most common answers as buttons and still lets the user type their own. A fast path for the majority, an open door for the long tail.",
    },
    img: `${ASSETS}/mixed-input-card.png`,
    to: null,
  },
];

export function PatternsLanding() {
  const tr = useTr();
  const { lang, setLang } = useLang();

  useEffect(() => {
    const prev = document.title;
    document.title = `${tr("Patrones", "Patterns", "Padrões")} · Félix`;
    return () => {
      document.title = prev;
    };
  }, [tr]);

  return (
    /* Wrapper con tokens en lugar de `.plaza`, que tiene `background: #fff`
       hardcodeado y dejaría la página clara en dark mode. */
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="plaza-nav">
        <Link to="/" className="plaza-brand" aria-label="Plaza Félix — inicio">
          <Logo type="logotype" height={42} />
        </Link>
        <nav
          className="plaza-nav-links"
          aria-label={tr("Secciones", "Sections", "Seções")}
        >
          <Link to="/">{tr("Inicio", "Home", "Início")}</Link>
          <Link to="/sistema">Design System</Link>
          <a href={FIGMA_GUIDELINES_URL} target="_blank" rel="noreferrer">
            {tr("Voz y tono", "Voice and tone", "Voz e tom")}
          </a>
          <Link to="/patrones" aria-current="page">
            {tr(
              "Guías conversacionales",
              "Conversational guidelines",
              "Guias de conversa"
            )}
          </Link>
        </nav>
        <div className="header-right">
          <div className="lang-dropdown">
            <GlobeIcon size={18} />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "es" | "en" | "pt")}
              aria-label={tr(
                "Seleccionar idioma",
                "Select language",
                "Selecionar idioma"
              )}
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="pt">PT</option>
            </select>
            <CaretDownIcon size={14} className="caret" />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1360px] flex-1 px-10 pb-16">
        {/* ── Hero ──────────────────────────────────────────────────────────
            Mismo hero que el home (el diseño reusa el frame). Acá el botón
            baja a la grilla en lugar de navegar, porque ya estamos en la
            página que ese botón abre desde el home. */}
        {/* Panel permanentemente oscuro, igual que `.plaza-footer`: usa los
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

        {/* ── Grilla de patrones ────────────────────────────────────────── */}
        <h2
          id="browse"
          className="mt-16 scroll-mt-8 font-heading text-4xl tracking-display text-foreground"
        >
          {tr("Explorar patrones", "Browse patterns", "Explorar padrões")}
        </h2>

        <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PATTERNS.map((p) => (
            <article
              key={p.key}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
            >
              <div className="flex h-[175px] items-center justify-center overflow-hidden rounded-xl bg-muted">
                <img
                  src={p.img}
                  alt=""
                  className="max-h-full w-auto object-contain"
                />
              </div>

              <p className="font-sans text-xs uppercase tracking-wider text-secondary">
                FÉLIX · PATTERNS
              </p>
              <h3 className="font-heading text-3xl leading-tight tracking-heading text-foreground">
                {tr(p.title.es, p.title.en)}
              </h3>
              <p className="flex-1 font-sans text-sm text-foreground">
                {tr(p.body.es, p.body.en)}
              </p>

              {p.to ? (
                <Button asChild variant="primary" size="sm" className="self-start">
                  <Link to={p.to}>
                    {tr(
                      "Ver las guías del patrón",
                      "Go to pattern guidelines",
                      "Ver as diretrizes do padrão"
                    )}
                  </Link>
                </Button>
              ) : (
                <Button variant="line" size="sm" disabled className="self-start">
                  {tr("Próximamente", "Coming soon", "Em breve")}
                </Button>
              )}
            </article>
          ))}
        </div>
      </main>

      <footer className="plaza-footer">
        <p>
          {tr(
            "Hecho con amor por el equipo de diseño de Félix",
            "Made with love by Félix Design Team",
            "Feito com amor pela equipe de design do Félix"
          )}
        </p>
        <p>
          © 2026 Felix Technologies Inc.{" "}
          {tr(
            "Todos los derechos reservados.",
            "All rights reserved.",
            "Todos os direitos reservados."
          )}
        </p>
      </footer>
    </div>
  );
}
