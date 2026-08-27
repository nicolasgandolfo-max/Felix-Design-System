import { useEffect, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import {
  ListIcon,
  CaretLeftIcon,
  GlobeIcon,
  CaretDownIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Sidebar, Logo } from "./Sidebar";
import { Footer } from "./sections";
import { useLang, useTr } from "./i18n";

export function Layout() {
  const tr = useTr();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  // Reset scroll to top on every navigation, unless link targets an anchor
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="plaza-sys">
      {/* ── Top Header Bar (Plaza Style) ──────────────────────────────── */}
      <header className="plaza-sys-header">
        <div className="header-left">
          <button
            className="menu-btn-plaza"
            aria-label={tr("Abrir menú", "Open menu", "Abrir menu")}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <XIcon size={20} /> : <ListIcon size={20} />}
          </button>
          <Link
            to="/"
            className="back-link"
            aria-label={tr(
              "Volver a Plaza Félix",
              "Back to Plaza Félix",
              "Voltar para Plaza Félix"
            )}
          >
            <CaretLeftIcon size={18} weight="bold" />
          </Link>
          <Link to="/" className="brand-pill" aria-label="Plaza Félix">
            <Logo />
          </Link>
        </div>

        <div className="header-center">
          <h1 className="sys-title">
            {tr("Sistema de Diseño", "Design System", "Sistema de Design")}
          </h1>
          <span className="sys-version-badge">
            <span className="dot" />v 1.0.0. - Alpha
          </span>
        </div>

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

      {/* ── Scrim backdrop for mobile ─────────────────────────────────── */}
      <div
        className={"scrim" + (open ? " show" : "")}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ── Main Layout Grid ─────────────────────────────────────────── */}
      <div className="plaza-sys-container">
        <Sidebar open={open} onNavigate={() => setOpen(false)} />
        <main className="plaza-sys-main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
