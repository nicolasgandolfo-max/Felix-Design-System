import { Fragment, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  CaretRightIcon,
  PuzzlePieceIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";
import {
  NAV,
  VOICE_TONE_NAV,
  INVENTORY,
  GROUP_SLUGS,
  GROUP_ICONS,
  GROUP_LABELS,
  ILLUSTRATION_SECTIONS,
  slugify,
  type NavGroup,
} from "./data";
import { useTr } from "./i18n";
import { PATTERN_FAMILIES, patternIcon, patternsOf } from "./patterns/nav";

const itemClass = ({ isActive }: { isActive: boolean }) =>
  "sys-nav-item" + (isActive ? " active" : "");

/**
 * Renderiza un árbol de nav (hoy sólo `NAV`). Dos casos especiales:
 * "illustrations", que despliega sus anclas, y los ítems cuyo `path` ya trae un
 * ancla — `NavLink` no marca activo por hash, así que lo resolvemos a mano.
 */
function NavTree({
  groups,
  showComponents = false,
  onNavigate,
}: {
  groups: NavGroup[];
  showComponents?: boolean;
  onNavigate: () => void;
}) {
  const tr = useTr();
  const { pathname, hash } = useLocation();

  const [manualOpen, setManualOpen] = useState<Record<string, boolean>>({});
  const isGroupOpen = (id: string, active: boolean) => manualOpen[id] ?? active;
  const toggleGroup = (id: string, active: boolean) =>
    setManualOpen((m) => ({ ...m, [id]: !isGroupOpen(id, active) }));

  return (
    <>
      {groups.map((g) => (
        <div key={g.group.en} className="sys-nav-group">
          <span className="sys-group-label">
            {tr(g.group.es, g.group.en, g.group.pt)}
          </span>
          {g.items.map((it) => {
            const Icon = it.icon;
            if (it.path.includes("#")) {
              const isActive = pathname + hash === it.path;
              return (
                <Link
                  key={it.id}
                  to={it.path}
                  onClick={onNavigate}
                  className={itemClass({ isActive })}
                >
                  <Icon size={18} weight={isActive ? "fill" : "regular"} />
                  <span>{tr(it.es, it.en, it.pt)}</span>
                </Link>
              );
            }
            if (it.id !== "illustrations") {
              return (
                <NavLink
                  key={it.id}
                  to={it.path}
                  end={it.end}
                  onClick={onNavigate}
                  className={itemClass}
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={18} weight={isActive ? "fill" : "regular"} />
                      <span>{tr(it.es, it.en, it.pt)}</span>
                    </>
                  )}
                </NavLink>
              );
            }
            const active = pathname === it.path;
            const expanded = isGroupOpen("illustrations", active);
            return (
              <Fragment key={it.id}>
                <div className="nav-row-plaza">
                  <NavLink
                    to={it.path}
                    onClick={onNavigate}
                    className={itemClass}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          weight={isActive ? "fill" : "regular"}
                        />
                        <span>{tr(it.es, it.en, it.pt)}</span>
                      </>
                    )}
                  </NavLink>
                  <button
                    type="button"
                    className={"nav-caret-plaza" + (expanded ? " open" : "")}
                    aria-expanded={expanded}
                    aria-label={
                      expanded
                        ? tr("Colapsar", "Collapse", "Recolher")
                        : tr("Expandir", "Expand", "Expandir")
                    }
                    onClick={() => toggleGroup("illustrations", active)}
                  >
                    <CaretRightIcon size={14} />
                  </button>
                </div>
                {expanded &&
                  ILLUSTRATION_SECTIONS.map((s) => (
                    <Link
                      key={s.id}
                      to={`/ilustraciones#${s.id}`}
                      onClick={onNavigate}
                      className="sys-sub-item"
                    >
                      <span>{tr(s.es, s.en, s.pt)}</span>
                    </Link>
                  ))}
              </Fragment>
            );
          })}
        </div>
      ))}

      {showComponents && (
        <div className="sys-nav-group">
          <span className="sys-group-label">
            {tr("Componentes", "Components", "Componentes")}
          </span>
          <NavLink
            to="/componentes"
            end
            onClick={onNavigate}
            className={itemClass}
          >
            {({ isActive }) => (
              <>
                <PuzzlePieceIcon
                  size={18}
                  weight={isActive ? "fill" : "regular"}
                />
                <span>{tr("Visión general", "Overview", "Visão geral")}</span>
              </>
            )}
          </NavLink>
          {INVENTORY.map((group) => {
            const groupSlug = GROUP_SLUGS[group.group];
            const GroupIcon = GROUP_ICONS[group.group];
            const active = pathname === `/componentes/${groupSlug}`;
            const expanded = isGroupOpen(groupSlug, active);
            return (
              <Fragment key={group.group}>
                <div className="nav-row-plaza">
                  <NavLink
                    to={`/componentes/${groupSlug}`}
                    onClick={onNavigate}
                    className={itemClass}
                  >
                    {({ isActive }) => (
                      <>
                        <GroupIcon
                          size={18}
                          weight={isActive ? "fill" : "regular"}
                        />
                        <span>
                          {tr(
                            GROUP_LABELS[group.group].es,
                            GROUP_LABELS[group.group].en,
                            GROUP_LABELS[group.group].pt
                          )}
                        </span>
                      </>
                    )}
                  </NavLink>
                  <button
                    type="button"
                    className={"nav-caret-plaza" + (expanded ? " open" : "")}
                    aria-expanded={expanded}
                    aria-label={
                      expanded
                        ? tr("Colapsar", "Collapse", "Recolher")
                        : tr("Expandir", "Expand", "Expandir")
                    }
                    onClick={() => toggleGroup(groupSlug, active)}
                  >
                    <CaretRightIcon size={14} />
                  </button>
                </div>
                {expanded &&
                  group.items.map((name) => (
                    <Link
                      key={name}
                      to={`/componentes/${groupSlug}#${slugify(name)}`}
                      onClick={onNavigate}
                      className="sys-sub-item"
                    >
                      <span>{name}</span>
                    </Link>
                  ))}
              </Fragment>
            );
          })}
        </div>
      )}
    </>
  );
}

/** Lo que el layout le pasa a cada panel lateral. */
export interface SidebarProps {
  open: boolean;
  onNavigate: () => void;
  /** Título de la sección: va arriba del panel, no en el header. */
  title: string;
  /** Versión o estado de la sección, debajo del título. */
  badge?: ReactNode;
}

/**
 * Shell del panel lateral: cabecera con el título y la versión de la sección
 * (según Figma "home" 386:987) y, debajo, el árbol de nav que cambia por
 * sección.
 */
function SidebarShell({
  open,
  title,
  badge,
  children,
}: {
  open: boolean;
  title: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  const tr = useTr();
  return (
    <aside className={"plaza-sys-sidebar" + (open ? " open" : "")} id="sidebar">
      <div className="sys-sidebar-head">
        <span className="sys-title">{title}</span>
        {badge}
      </div>
      <nav
        className="sys-nav"
        aria-label={tr("Secciones", "Sections", "Seções")}
      >
        {children}
      </nav>
    </aside>
  );
}

/** Panel lateral del sistema de diseño: fundamentos, construcción y componentes. */
export function Sidebar({ onNavigate, open, title, badge }: SidebarProps) {
  return (
    <SidebarShell open={open} title={title} badge={badge}>
      <NavTree groups={NAV} showComponents onNavigate={onNavigate} />
    </SidebarShell>
  );
}

/** Panel lateral de la Guía editorial. */
/**
 * Menú de Voice & Tone. A diferencia de `NavTree`, aquí el que se pliega es el
 * grupo entero, no un ítem con hijos: son 17 secciones en seis grupos y seis
 * encabezados plegables se recorren de un vistazo. Un grupo se abre solo
 * cuando la ruta activa está adentro.
 */
function VoiceToneNavTree({ onNavigate }: { onNavigate: () => void }) {
  const tr = useTr();
  const { pathname, hash } = useLocation();
  const [manualOpen, setManualOpen] = useState<Record<string, boolean>>({});

  return (
    <>
      {VOICE_TONE_NAV.map((g) => {
        const hasActive = g.items.some((it) =>
          it.path.includes("#")
            ? pathname + hash === it.path
            : pathname === it.path
        );
        // El grupo de la ruta activa manda; después, lo que haya elegido quien lee.
        const expanded = manualOpen[g.id] ?? (hasActive || !g.collapsed);
        return (
          <div key={g.id} className="sys-nav-group vt-nav-group">
            <button
              type="button"
              className={"vt-group-toggle" + (expanded ? " open" : "")}
              aria-expanded={expanded}
              onClick={() =>
                setManualOpen((m) => ({ ...m, [g.id]: !expanded }))
              }
            >
              <CaretRightIcon size={12} weight="bold" />
              <span className="sys-group-label">
                {tr(g.group.es, g.group.en, g.group.pt)}
              </span>
            </button>
            {expanded &&
              g.items.map((it) => {
                const Icon = it.icon;
                /* Los ítems de la versión anterior son anclas de una misma
                   página: `NavLink` no marca activo por hash. */
                if (it.path.includes("#")) {
                  const isActive = pathname + hash === it.path;
                  return (
                    <Link
                      key={it.id}
                      to={it.path}
                      onClick={onNavigate}
                      className={itemClass({ isActive })}
                    >
                      <Icon size={18} weight={isActive ? "fill" : "regular"} />
                      <span>{tr(it.es, it.en, it.pt)}</span>
                    </Link>
                  );
                }
                return (
                  <NavLink
                    key={it.id}
                    to={it.path}
                    end={it.end}
                    onClick={onNavigate}
                    className={itemClass}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          weight={isActive ? "fill" : "regular"}
                        />
                        <span>{tr(it.es, it.en, it.pt)}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
          </div>
        );
      })}
    </>
  );
}

export function VoiceToneSidebar({
  onNavigate,
  open,
  title,
  badge,
}: SidebarProps) {
  const tr = useTr();
  const { pathname } = useLocation();
  return (
    <SidebarShell open={open} title={title} badge={badge}>
      <div className="sys-nav-group">
        <NavLink
          to="/voz-y-tono"
          end
          onClick={onNavigate}
          className={itemClass({ isActive: pathname === "/voz-y-tono" })}
        >
          <SquaresFourIcon
            size={18}
            weight={pathname === "/voz-y-tono" ? "fill" : "regular"}
          />
          <span>{tr("Visión general", "Overview", "Visão geral")}</span>
        </NavLink>
      </div>
      <VoiceToneNavTree onNavigate={onNavigate} />
    </SidebarShell>
  );
}

/**
 * Panel lateral de las guías conversacionales: la visión general y, debajo,
 * un grupo por familia con un ítem por patrón. Se deriva del registro en
 * `patterns/content.ts`, igual que la visión general.
 */
export function PatternsSidebar({
  onNavigate,
  open,
  title,
  badge,
}: SidebarProps) {
  const tr = useTr();
  return (
    <SidebarShell open={open} title={title} badge={badge}>
      <div className="sys-nav-group">
        <NavLink to="/patrones" end onClick={onNavigate} className={itemClass}>
          {({ isActive }) => (
            <>
              <SquaresFourIcon
                size={18}
                weight={isActive ? "fill" : "regular"}
              />
              <span>{tr("Visión general", "Overview", "Visão geral")}</span>
            </>
          )}
        </NavLink>
      </div>
      {PATTERN_FAMILIES.map((family) => (
        <div key={family.id} className="sys-nav-group">
          <span className="sys-group-label">
            {tr(family.label.es, family.label.en, family.label.pt)}
          </span>
          {patternsOf(family.id).map((p) => {
            const Icon = patternIcon(p);
            return (
              <NavLink
                key={p.slug}
                to={`/patrones/${p.slug}`}
                onClick={onNavigate}
                className={itemClass}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} weight={isActive ? "fill" : "regular"} />
                    <span>{tr(p.name.es, p.name.en, p.name.pt)}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      ))}
    </SidebarShell>
  );
}
