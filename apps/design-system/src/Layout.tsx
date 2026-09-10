import { useEffect, useState, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PlazaHeader } from "./components/PlazaHeader";
import {
  PatternsSidebar,
  Sidebar,
  VoiceToneSidebar,
  type SidebarProps,
} from "./Sidebar";
import { Footer } from "./sections";
import { PATTERNS } from "./patterns/content";
import { useTr } from "./i18n";

/**
 * Estructura compartida por todas las secciones internas (sistema de diseño,
 * Voice & Tone y guías conversacionales): el mismo menú del home arriba, un
 * panel lateral con el título y la versión de la sección más su árbol de
 * secciones y subsecciones, y el footer. Cada sección pasa su título, su badge
 * y su propio panel lateral.
 */
function SectionLayout({
  title,
  badge,
  sidebar,
  footerNote,
}: {
  title: string;
  badge?: ReactNode;
  sidebar: (props: SidebarProps) => ReactNode;
  footerNote?: string;
}) {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  // Reset scroll to top on every navigation, unless link targets an anchor
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="plaza-sys">
      <PlazaHeader menu={{ open, onToggle: () => setOpen((o) => !o) }} />

      {/* ── Scrim backdrop for mobile ─────────────────────────────────── */}
      <div
        className={"scrim" + (open ? " show" : "")}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ── Main Layout Grid ─────────────────────────────────────────── */}
      <div className="plaza-sys-container">
        {sidebar({ open, onNavigate: () => setOpen(false), title, badge })}
        <main className="plaza-sys-main">
          <Outlet />
        </main>
      </div>
      <Footer note={footerNote} />
    </div>
  );
}

export function Layout() {
  const tr = useTr();
  return (
    <SectionLayout
      title={tr("Sistema de Diseño", "Design System", "Sistema de Design")}
      badge={
        <span className="sys-version-badge">
          <span className="dot" />v 1.0.0. - Alpha
        </span>
      }
      sidebar={(props) => <Sidebar {...props} />}
    />
  );
}

/**
 * Voice & Tone: sección propia, hermana de la guía editorial. Su contenido es
 * la transcripción del Notion que mantiene Content Design, así que el badge
 * lleva la versión de esa fuente, no la del portal.
 */
export function VoiceToneLayout() {
  const tr = useTr();
  return (
    <SectionLayout
      title="Voice & Tone"
      badge={
        <span className="sys-version-badge">
          <span className="dot" />
          v0.4
        </span>
      }
      sidebar={(props) => <VoiceToneSidebar {...props} />}
      footerNote={tr(
        "Felix Pago · Voice & Tone Guidelines v0.4 — mantenido por Content Design.",
        "Felix Pago · Voice & Tone Guidelines v0.4 — maintained by Content Design.",
        "Felix Pago · Voice & Tone Guidelines v0.4 — mantido por Content Design."
      )}
    />
  );
}

/**
 * Guías conversacionales: los patrones del bot. El badge no lleva versión
 * porque el registro no la tiene; muestra cuántos patrones hay publicados.
 */
export function PatternsLayout() {
  const tr = useTr();
  return (
    <SectionLayout
      title={tr(
        "Guías conversacionales",
        "Conversational guidelines",
        "Guias de conversa"
      )}
      badge={
        <span className="sys-version-badge">
          <span className="dot" />
          {PATTERNS.length} {tr("patrones", "patterns", "padrões")}
        </span>
      }
      sidebar={(props) => <PatternsSidebar {...props} />}
    />
  );
}
