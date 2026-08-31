import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@felix/ui";
import { GlobeIcon, CaretDownIcon } from "@phosphor-icons/react";
import { useLang, useTr } from "../i18n";

/* Destino aún sin sección propia en el portal — apunta al archivo de Figma
   hasta que exista como ruta. Mismo criterio que PlazaHome. */
const FIGMA_VOICE_URL =
  "https://www.figma.com/design/N9dG8uXXR7FkLkuSZT5oex/DRAFT-Conversational-Guidelines";

/**
 * Nav + footer compartidos por las páginas standalone (landing de patrones y
 * páginas de patrón).
 *
 * Reusa las clases `plaza-nav` / `plaza-footer` de `styles.css` para que el
 * chrome sea idéntico al del home, pero el wrapper va con tokens: la clase
 * `.plaza` tiene `background: #fff` hardcodeado y dejaría la página clara en
 * dark mode.
 *
 * Nota: `.plaza-nav` también trae `#fff` quemado, así que la barra de nav se
 * queda clara en dark mode. Arreglarlo implica tocar el CSS que comparte con
 * PlazaHome.
 */
export function PlazaChrome({
  children,
  activeNav,
}: {
  children: ReactNode;
  activeNav?: "home" | "system" | "voice" | "patterns";
}) {
  const tr = useTr();
  const { lang, setLang } = useLang();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="plaza-nav">
        <Link to="/" className="plaza-brand" aria-label="Plaza Félix — inicio">
          <Logo type="logotype" height={42} />
        </Link>

        <nav
          className="plaza-nav-links"
          aria-label={tr("Secciones", "Sections", "Seções")}
        >
          <Link to="/" aria-current={activeNav === "home" ? "page" : undefined}>
            {tr("Inicio", "Home", "Início")}
          </Link>
          <Link
            to="/sistema"
            aria-current={activeNav === "system" ? "page" : undefined}
          >
            Design System
          </Link>
          <a href={FIGMA_VOICE_URL} target="_blank" rel="noreferrer">
            {tr("Voz y tono", "Voice and tone", "Voz e tom")}
          </a>
          <Link
            to="/patrones"
            aria-current={activeNav === "patterns" ? "page" : undefined}
          >
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

      {children}

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
