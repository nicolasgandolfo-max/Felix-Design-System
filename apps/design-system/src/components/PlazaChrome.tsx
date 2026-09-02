import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { GlobeIcon, CaretDownIcon } from "@phosphor-icons/react";
import { FelixPlazaLogo } from "./FelixPlazaLogo";
import { useLang, useTr } from "../i18n";

/**
 * Chrome compartido por las páginas standalone (landing de patrones y páginas
 * de patrón): exactamente el mismo wrapper `.plaza`, nav y footer que
 * PlazaHome — mismas clases, mismo logo, mismo selector de idioma. Lo único
 * que varía entre páginas es el contenido del medio.
 */
export function PlazaChrome({ children }: { children: ReactNode }) {
  const tr = useTr();
  const { lang, setLang } = useLang();

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
        <img src="../assets/plaza/heartfelix.png" alt="" />
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
