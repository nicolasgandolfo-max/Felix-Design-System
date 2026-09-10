import { Link, useLocation } from "react-router-dom";
import {
  CaretDownIcon,
  GlobeIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";
import { FelixPlazaLogo } from "./FelixPlazaLogo";
import { useLang, useTr } from "../i18n";

type Section = "home" | "system" | "voice" | "patterns";

/**
 * Sección del portal a la que pertenece una ruta. El sistema de diseño no
 * cuelga de un prefijo único (/principios, /colores, /componentes…), así que es
 * el caso por defecto: todo lo que no es home, voz o patrones es sistema.
 */
function sectionOf(pathname: string): Section {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/voz-y-tono") || pathname === "/editorial") {
    return "voice";
  }
  if (pathname.startsWith("/patrones")) return "patterns";
  return "system";
}

/**
 * Menú del portal, el mismo en el home y en todas las secciones internas
 * (según Figma "home" 386:987): logo, cuatro enlaces con la sección actual
 * subrayada en turquesa y el selector de idioma. Las páginas con panel lateral
 * pasan `menu` para mostrar el botón hamburguesa en móvil.
 */
export function PlazaHeader({
  menu,
}: {
  menu?: { open: boolean; onToggle: () => void };
}) {
  const tr = useTr();
  const { lang, setLang } = useLang();
  const { pathname } = useLocation();
  const current = sectionOf(pathname);

  const links: Array<{ to: string; section: Section; label: string }> = [
    { to: "/", section: "home", label: tr("Inicio", "Home", "Início") },
    { to: "/sistema", section: "system", label: "Design System" },
    {
      to: "/voz-y-tono",
      section: "voice",
      label: tr("Voz y tono", "Voice and tone", "Voz e tom"),
    },
    {
      to: "/patrones",
      section: "patterns",
      label: tr(
        "Guías conversacionales",
        "Conversational guidelines",
        "Guias de conversa"
      ),
    },
  ];

  return (
    <header className="plaza-nav">
      <div className="header-left">
        {menu && (
          <button
            type="button"
            className="menu-btn-plaza"
            aria-label={
              menu.open
                ? tr("Cerrar menú", "Close menu", "Fechar menu")
                : tr("Abrir menú", "Open menu", "Abrir menu")
            }
            aria-expanded={menu.open}
            aria-controls="sidebar"
            onClick={menu.onToggle}
          >
            {menu.open ? <XIcon size={20} /> : <ListIcon size={20} />}
          </button>
        )}
        <Link to="/" className="plaza-brand" aria-label="Plaza Félix — inicio">
          <FelixPlazaLogo />
        </Link>
      </div>

      <nav
        className="plaza-nav-links"
        aria-label={tr("Secciones", "Sections", "Seções")}
      >
        {links.map((l) => {
          const active = l.section === current;
          return (
            <Link
              key={l.section}
              to={l.to}
              className={active ? "is-active" : undefined}
              aria-current={active ? "page" : undefined}
            >
              {l.label}
            </Link>
          );
        })}
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
  );
}
