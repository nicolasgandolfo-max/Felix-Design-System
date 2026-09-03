import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang, useTr } from "../i18n";
import { GlobeIcon, CaretDownIcon } from "@phosphor-icons/react";
import { FelixPlazaLogo } from "../components/FelixPlazaLogo";

/* Enlaces externos de la sección "Enlaces útiles": destinos que viven en Figma
   y no tienen (ni van a tener) sección propia en el portal. */
const FIGMA_GUIDELINES_URL =
  "https://www.figma.com/design/N9dG8uXXR7FkLkuSZT5oex/DRAFT-Conversational-Guidelines";
const FIGMA_DS_FILE_URL = FIGMA_GUIDELINES_URL;

function FigmaIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 23 23"
      fill="none"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.35643 9.68347C8.33696 9.68347 7.51051 10.5096 7.51051 11.5287C7.51051 12.5479 8.33696 13.374 9.35643 13.374H11.2522V11.5287V9.68347H9.35643ZM13.9962 8.78577L14.0461 8.78576C15.0655 8.78576 15.892 7.9596 15.892 6.94048C15.892 5.92136 15.0655 5.0952 14.0461 5.0952H12.1503V8.78576L13.9962 8.78577ZM15.5508 9.23462C16.2972 8.7444 16.79 7.89997 16.79 6.94048C16.79 5.42558 15.5615 4.1975 14.0461 4.1975H12.1503H11.7013H11.2522H9.35643C7.841 4.1975 6.6125 5.42558 6.6125 6.94048C6.6125 7.89997 7.10531 8.7444 7.85171 9.23462C7.10531 9.72483 6.6125 10.5693 6.6125 11.5287C6.6125 12.4882 7.10531 13.3327 7.85171 13.8229C7.10531 14.3131 6.6125 15.1575 6.6125 16.117C6.6125 17.6351 7.85656 18.86 9.36884 18.86C10.8949 18.86 12.1503 17.6239 12.1503 16.0921V14.2717V13.8229V13.5583C12.6377 14.0015 13.2854 14.2717 13.9962 14.2717H14.0461C15.5615 14.2717 16.79 13.0437 16.79 11.5287C16.79 10.5693 16.2972 9.72483 15.5508 9.23462ZM14.0461 9.68347L13.9962 9.68347C12.9767 9.68347 12.1503 10.5096 12.1503 11.5287C12.1503 12.5479 12.9767 13.374 13.9962 13.374H14.0461C15.0655 13.374 15.892 12.5479 15.892 11.5287C15.892 10.5096 15.0655 9.68347 14.0461 9.68347ZM7.51051 16.117C7.51051 15.0979 8.33696 14.2717 9.35643 14.2717H11.2522V16.0921C11.2522 17.1218 10.4052 17.9623 9.36884 17.9623C8.34621 17.9623 7.51051 17.133 7.51051 16.117ZM11.2522 8.78576H9.35643C8.33696 8.78576 7.51051 7.9596 7.51051 6.94048C7.51051 5.92136 8.33696 5.0952 9.35643 5.0952H11.2522V8.78576Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PlazaHome() {
  const tr = useTr();
  const { lang, setLang } = useLang();

  useEffect(() => {
    const prev = document.title;
    document.title = "Plaza Félix";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="plaza">
      <header className="plaza-nav">
        <Link to="/" className="plaza-brand" aria-label="Plaza Félix — inicio">
          <FelixPlazaLogo />
        </Link>
        <nav
          className="plaza-nav-links"
          aria-label={tr("Secciones", "Sections", "Seções")}
        >
          <Link to="/">{tr("Inicio", "Home", "Início")}</Link>
          <Link to="/sistema">Design System</Link>
          <Link to="/voz-y-tono">
            {tr("Voz y tono", "Voice and tone", "Voz e tom")}
          </Link>
          <Link to="/patrones">
            {tr(
              "Guías conversacionales",
              "Conversational guidelines",
              "Guias de conversa"
            )}
          </Link>
        </nav>
        <div className="header-right">
          <div className="lang-dropdown">
            <GlobeIcon size={18} aria-hidden="true" />
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
            <CaretDownIcon size={14} className="caret" aria-hidden="true" />
          </div>
        </div>
      </header>

      <main className="plaza-main">
        {/* ── Hero: Conversational Design ─────────────────────────────── */}
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
            <Link className="plaza-btn" to="/patrones">
              {tr("Explorar patrones", "Browse patterns", "Explorar padrões")}
            </Link>
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

        {/* ── Feature cards ───────────────────────────────────────────── */}
        <section className="plaza-cards">
          <article className="plaza-card">
            <div className="plaza-card-media">
              <img src="/assets/plaza/card-ds.png" alt="" />
            </div>
            <p className="plaza-eyebrow">FÉLIX · FOUNDATIONS</p>
            <h2>Design System</h2>
            <p className="plaza-body">
              {tr(
                "Las bases visuales sobre las que está construido Félix: color, tipografía, espaciado y los componentes de WhatsApp con los que diseñamos —botones, listas y Flows— junto con los límites que fija Meta para cada uno.",
                "The visual foundations Félix is built on: color, type, spacing, and the WhatsApp components we design with — buttons, lists, and Flows — along with the hard limits Meta sets for each.",
                "As bases visuais sobre as quais o Félix foi construído: cor, tipografia, espaçamento e os componentes de WhatsApp com que desenhamos — botões, listas e Flows — junto com os limites que a Meta define para cada um."
              )}
            </p>
            <Link className="plaza-btn" to="/sistema">
              {tr(
                "Ir al Design System",
                "Go to Design System",
                "Ir para o Design System"
              )}
            </Link>
          </article>

          <article className="plaza-card">
            <div className="plaza-card-media is-full">
              <img src="/assets/plaza/card-voice.png" alt="" />
            </div>
            <p className="plaza-eyebrow">FÉLIX · VOICE</p>
            <h2>{tr("Voz y tono", "Voice and tone", "Voz e tom")}</h2>
            <p className="plaza-body">
              {tr(
                "Cómo suena Félix en toda la experiencia: la personalidad detrás del bot, los principios que lo mantienen claro y cálido, y ejemplos de antes y después para escribir.",
                "How Félix sounds across the whole experience: the personality behind the bot, the principles that keep it clear and warm, and before/after examples to write from.",
                "Como o Félix soa em toda a experiência: a personalidade por trás do bot, os princípios que o mantêm claro e caloroso, e exemplos de antes e depois para escrever."
              )}
            </p>
            <Link className="plaza-btn" to="/voz-y-tono">
              {tr("Leer la guía", "Read the guide", "Ler o guia")}
            </Link>
          </article>
        </section>

        {/* ── Useful links ────────────────────────────────────────────── */}
        <h2 className="plaza-links-title">
          {tr("Enlaces útiles", "Useful links", "Links úteis")}
        </h2>
        <section className="plaza-links">
          <article className="plaza-link-card">
            <h3>Félix Design System</h3>
            <p className="plaza-body">
              {tr(
                "La librería completa de componentes y tokens.",
                "The full component library and tokens.",
                "A biblioteca completa de componentes e tokens."
              )}
            </p>
            <a
              className="plaza-btn"
              href={FIGMA_DS_FILE_URL}
              target="_blank"
              rel="noreferrer"
            >
              {tr(
                "Abrir archivo de Figma",
                "Open Figma File",
                "Abrir arquivo do Figma"
              )}
              <FigmaIcon />
            </a>
          </article>

          <article className="plaza-link-card">
            <h3>
              {tr(
                "Buenas prácticas de conversación para ninjas",
                "Conversation best practices for ninjas",
                "Boas práticas de conversa para ninjas"
              )}
            </h3>
            <p className="plaza-body">
              {tr(
                "Guías de escritura para el equipo de atención al cliente.",
                "Writing guidelines for the customer service team.",
                "Diretrizes de escrita para a equipe de atendimento ao cliente."
              )}
            </p>
            <a
              className="plaza-btn"
              href={FIGMA_GUIDELINES_URL}
              target="_blank"
              rel="noreferrer"
            >
              {tr("Leer la guía", "Read the guide", "Ler o guia")}
            </a>
          </article>
        </section>
      </main>

      <footer className="plaza-footer">
        <p>
          {tr(
            "Hecho con amor por el equipo de diseño de Félix",
            "Made with love by Félix Design Team",
            "Feito com amor pela equipe de design do Félix"
          )}
        </p>
        <img src="/assets/plaza/heartfelix.png" alt="" />
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
