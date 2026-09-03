import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChatCircleTextIcon,
  BookOpenIcon,
  BookmarksIcon,
} from "@phosphor-icons/react";
import { useTr } from "../i18n";
import { Editorial } from "../sections";

export function PlazaEditorial() {
  const tr = useTr();
  const { hash } = useLocation();

  useEffect(() => {
    const prev = document.title;
    document.title = "Guía Editorial · Voz y Tono · Félix";
    return () => {
      document.title = prev;
    };
  }, []);

  // Jump to the requested subsection whenever the hash changes (Sidebar links use #id).
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    el?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [hash]);

  return (
    <>
      {/* Eyebrow / Kicker */}
      <div className="sys-hero-eyebrow">
        <span className="dash" />
        <span>FELIX PAGO · GUÍA EDITORIAL</span>
      </div>

      {/* Hero Title */}
      <h1 className="sys-hero-title">
        {tr(
          "Español primero, tú siempre.",
          "Spanish-first, informal tú always.",
          "Espanhol primeiro, você sempre."
        )}
        <br />
        <span className="hero-highlight">
          {tr(
            "Claro, cálido, sin jerga.",
            "Clear, warm, jargon-free.",
            "Claro, caloroso, sem jargão."
          )}
        </span>
      </h1>

      {/* Subtitle / Description */}
      <p className="sys-hero-desc">
        {tr(
          "Cómo suena Félix en toda la experiencia: la personalidad detrás del bot, los principios de UX writing, un caso de estudio real sobre transparencia y el glosario oficial de producto.",
          "How Félix sounds across the experience: the personality behind the bot, UX writing principles, a real case study on transparency, and the official product glossary.",
          "Como o Félix soa em toda a experiência: a personalidade por trás do bot, os princípios de UX writing, um estudo de caso real sobre transparência e o glossário oficial do produto."
        )}
      </p>

      {/* Specs / Meta Strip */}
      <div className="sys-meta-strip">
        <div className="meta-col">
          <span className="lbl">
            {tr("TRATAMIENTO", "FORMALITY", "TRATAMENTO")}
          </span>
          <span className="val">Tú (informal)</span>
        </div>
        <div className="meta-col">
          <span className="lbl">
            {tr("PRINCIPIOS UX", "UX PRINCIPLES", "PRINCÍPIOS UX")}
          </span>
          <span className="val">{tr("8 reglas", "8 rules", "8 regras")}</span>
        </div>
        <div className="meta-col">
          <span className="lbl">
            {tr("CASO DE ESTUDIO", "CASE STUDY", "ESTUDO DE CASO")}
          </span>
          <span className="val">Checkout & Payment</span>
        </div>
        <div className="meta-col">
          <span className="lbl">{tr("GLOSARIO", "GLOSSARY", "GLOSSÁRIO")}</span>
          <span className="val">
            {tr("24 términos", "24 terms", "24 termos")}
          </span>
        </div>
      </div>

      {/* Navigation tiles grid */}
      <section className="sys-grid-section" style={{ marginBottom: "48px" }}>
        <h2 className="sys-section-title">
          {tr("SECCIONES DE LA GUÍA", "GUIDE SECTIONS", "SEÇÕES DO GUIA")}
        </h2>

        <div className="sys-cards-grid">
          <Link to="/voz-y-tono/version-anterior#voz" className="sys-card-tile">
            <div className="tile-icon-badge">
              <ChatCircleTextIcon size={22} weight="regular" />
            </div>
            <h3 className="tile-title">
              {tr("La voz de Felix", "Felix's voice", "A voz da Felix")}
            </h3>
            <p className="tile-desc">
              {tr(
                "Calmada, directa, cálida y transparente. Cómo mantener una voz personal sin sonar corporativo.",
                "Calm, direct, warm, and transparent. How to keep a personal voice without sounding corporate.",
                "Calma, direta, calorosa e transparente. Como manter uma voz pessoal sem soar corporativa."
              )}
            </p>
            <span className="tile-link">
              {tr("Ver guía", "View guide", "Ver guia")} →
            </span>
          </Link>

          <Link
            to="/voz-y-tono/version-anterior#ux-writing"
            className="sys-card-tile"
          >
            <div className="tile-icon-badge">
              <BookOpenIcon size={22} weight="regular" />
            </div>
            <h3 className="tile-title">
              {tr("Principios de UX", "UX principles", "Princípios de UX")}
            </h3>
            <p className="tile-desc">
              {tr(
                "Las 8 reglas de contenido que guían desde el checkout hasta los microcopias del bot.",
                "The 8 content rules that guide everything from checkout to bot microcopy.",
                "As 8 regras de conteúdo que guiam do checkout às microcópias do bot."
              )}
            </p>
            <span className="tile-link">
              {tr("Explorar", "Explore", "Explorar")} →
            </span>
          </Link>

          <Link
            to="/voz-y-tono/version-anterior#glosario"
            className="sys-card-tile"
          >
            <div className="tile-icon-badge">
              <BookmarksIcon size={22} weight="regular" />
            </div>
            <h3 className="tile-title">
              {tr(
                "Glosario de producto",
                "Product glossary",
                "Glossário de produto"
              )}
            </h3>
            <p className="tile-desc">
              {tr(
                "Términos clave en inglés, español y portugués alineados entre diseño, producto e ingeniería.",
                "Key terms in English, Spanish, and Portuguese aligned across design, product, and engineering.",
                "Termos-chave em inglês, espanhol e português alinhados entre design, produto e engenharia."
              )}
            </p>
            <span className="tile-link">
              {tr("Ver términos", "View terms", "Ver termos")} →
            </span>
          </Link>
        </div>
      </section>

      {/* Main Editorial Content */}
      <Editorial />
    </>
  );
}
