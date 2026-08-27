import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  StarIcon,
  PaletteIcon,
  TextAaIcon,
  CubeIcon,
  PencilSimpleIcon,
  PuzzlePieceIcon,
} from "@phosphor-icons/react";
import { useTr } from "../i18n";

export function PlazaSistema() {
  const tr = useTr();

  useEffect(() => {
    const prev = document.title;
    document.title = "Sistema de Diseño · Félix";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <>
      {/* Eyebrow / Kicker */}
      <div className="sys-hero-eyebrow">
        <span className="dash" />
        <span>FELIX PAGO · IDENTIDAD DE PRODUCTO</span>
      </div>

      {/* Hero Title */}
      <h1 className="sys-hero-title">
        {tr(
          "Las remesas no son transacciones.",
          "Remittances are not transactions.",
          "Remessas não são transações."
        )}
        <br />
        <span className="hero-highlight">
          {tr(
            "Son actos de presencia.",
            "They are acts of presence.",
            "São atos de presença."
          )}
        </span>
      </h1>

      {/* Subtitle / Description */}
      <p className="sys-hero-desc">
        {tr(
          "El sistema de diseño de Felix: cálido, eléctrico y radicalmente transparente. Un compañero financiero para la comunidad latina en Estados Unidos — no un banco.",
          "Felix's design system: warm, electric, and radically transparent. A financial compañero for the Latin American community in the US — not a bank.",
          "O sistema de design da Felix: caloroso, elétrico e radicalmente transparente. Um companheiro financeiro para a comunidade latina nos Estados Unidos — não um banco."
        )}
      </p>

      {/* Specs / Meta Strip */}
      <div className="sys-meta-strip">
        <div className="meta-col">
          <span className="lbl">{tr("VERSIÓN", "VERSION", "VERSÃO")}</span>
          <span className="val">1.0.0 · alpha</span>
        </div>
        <div className="meta-col">
          <span className="lbl">
            {tr("COMPONENTES", "COMPONENTS", "COMPONENTES")}
          </span>
          <span className="val">43</span>
        </div>
        <div className="meta-col">
          <span className="lbl">{tr("IDIOMA", "LANGUAGE", "IDIOMA")}</span>
          <span className="val">ES · EN · PT</span>
        </div>
        <div className="meta-col">
          <span className="lbl">STACK</span>
          <span className="val">React 19 · Tailwind v4</span>
        </div>
      </div>

      {/* Section: Por dónde empezar */}
      <section className="sys-grid-section">
        <h2 className="sys-section-title">
          {tr("POR DÓNDE EMPEZAR", "WHERE TO START", "POR ONDE COMEÇAR")}
        </h2>

        <div className="sys-cards-grid">
          {/* Tile 1: Principios */}
          <Link to="/principios" className="sys-card-tile">
            <div className="tile-icon-badge">
              <StarIcon size={22} weight="regular" />
            </div>
            <h3 className="tile-title">
              {tr("Principios", "Principles", "Princípios")}
            </h3>
            <p className="tile-desc">
              {tr(
                "Las cuatro ideas que guían cada decisión de diseño.",
                "The four ideas that guide every design decision.",
                "As quatro ideias que guiam cada decisão de design."
              )}
            </p>
            <span className="tile-link">{tr("Leer", "Read", "Ler")} →</span>
          </Link>

          {/* Tile 2: Colores */}
          <Link to="/colores" className="sys-card-tile">
            <div className="tile-icon-badge">
              <PaletteIcon size={22} weight="regular" />
            </div>
            <h3 className="tile-title">{tr("Colores", "Colors", "Cores")}</h3>
            <p className="tile-desc">
              {tr(
                "Turquesa, slate y una base neutra cálida. Paleta pequeña a propósito.",
                "Turquoise, slate, and a warm neutral base. Deliberately small palette.",
                "Turquesa, slate e uma base neutra quente. Paleta pequena de propósito."
              )}
            </p>
            <span className="tile-link">
              {tr("Ver paleta", "View palette", "Ver paleta")} →
            </span>
          </Link>

          {/* Tile 3: Tipografía */}
          <Link to="/tipografia" className="sys-card-tile">
            <div className="tile-icon-badge">
              <TextAaIcon size={22} weight="regular" />
            </div>
            <h3 className="tile-title">
              {tr("Tipografía", "Typography", "Tipografia")}
            </h3>
            <p className="tile-desc">
              {tr(
                "Plain para los momentos de impacto, Saans para todo lo demás.",
                "Plain for impact moments, Saans for everything else.",
                "Plain para os momentos de impacto, Saans para todo o resto."
              )}
            </p>
            <span className="tile-link">
              {tr("Ver escala", "View scale", "Ver escala")} →
            </span>
          </Link>

          {/* Tile 4: Componentes */}
          <Link to="/componentes" className="sys-card-tile">
            <div className="tile-icon-badge">
              <PuzzlePieceIcon size={22} weight="regular" />
            </div>
            <h3 className="tile-title">
              {tr("Componentes", "Components", "Componentes")}
            </h3>
            <p className="tile-desc">
              {tr(
                "43 piezas en React, construidas sobre Radix y accesibles por defecto.",
                "43 React pieces, built on Radix and accessible by default.",
                "43 peças em React, construídas sobre Radix e acessíveis por padrão."
              )}
            </p>
            <span className="tile-link">
              {tr("Explorar", "Explore", "Explorar")} →
            </span>
          </Link>

          {/* Tile 5: Tokens */}
          <Link to="/tokens" className="sys-card-tile">
            <div className="tile-icon-badge">
              <CubeIcon size={22} weight="regular" />
            </div>
            <h3 className="tile-title">Tokens</h3>
            <p className="tile-desc">
              {tr(
                "Variables CSS y Tailwind. Una sola fuente de verdad para light y dark.",
                "CSS and Tailwind variables. Single source of truth for light and dark.",
                "Variáveis CSS e Tailwind. Uma única fonte de verdade para light e dark."
              )}
            </p>
            <span className="tile-link">
              {tr("Ver tokens", "View tokens", "Ver tokens")} →
            </span>
          </Link>

          {/* Tile 6: Voz y copy */}
          <Link to="/editorial" className="sys-card-tile">
            <div className="tile-icon-badge">
              <PencilSimpleIcon size={22} weight="regular" />
            </div>
            <h3 className="tile-title">
              {tr("Voz y copy", "Voice & copy", "Voz e copy")}
            </h3>
            <p className="tile-desc">
              {tr(
                "Español primero, tú siempre. Claro, cálido, sin jerga.",
                "Spanish-first, informal tú always. Clear, warm, jargon-free.",
                "Espanhol primeiro, você sempre. Claro, caloroso, sem jargão."
              )}
            </p>
            <span className="tile-link">
              {tr("Leer guía", "Read guide", "Ler guia")} →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
