import { Fragment, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CaretRightIcon, PuzzlePieceIcon } from "@phosphor-icons/react";
import {
  NAV,
  INVENTORY,
  GROUP_SLUGS,
  GROUP_ICONS,
  GROUP_LABELS,
  ILLUSTRATION_SECTIONS,
  slugify,
} from "./data";
import { useTr } from "./i18n";

export function Logo() {
  return (
    <svg
      width="200"
      height="42"
      viewBox="0 0 200 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_113_4040)">
        <path
          d="M50.6382 28.9693C48.9127 34.7316 44.1952 38.9989 35.9755 38.9989C26.7923 38.9989 21.4644 33.0766 21.4644 23.9007C21.4644 15.2583 27.5531 9.17589 36.2796 9.17589C45.0062 9.17589 50.9423 14.7781 50.9423 24.9678C50.9423 25.4479 50.9423 25.8214 50.8911 26.515H32.0166C32.1682 29.7163 33.6397 31.4237 36.2284 31.4237C38.6635 31.4237 39.6783 29.9831 40.0336 28.9693H50.6371H50.6382ZM37.6803 8.00101L39.13 0H50.1826L48.6904 8.00101H37.6803ZM40.3889 20.7005C40.0848 17.766 38.7648 16.272 36.381 16.272C33.7933 16.272 32.4232 17.9794 32.069 20.7005H40.39H40.3889Z"
          fill="#082422"
        />
        <path d="M52.9011 38.1463V0H63.7586V38.1463H52.9011Z" fill="#082422" />
        <path
          d="M66.3311 0H77.1886V8.00101H66.3311V0ZM66.3311 38.1463V10.1363H77.1886V38.1452H66.3311V38.1463Z"
          fill="#082422"
        />
        <path
          d="M86.8785 23.9016L77.7966 10.1372H90.0242C90.9878 12.1113 92.1039 13.8187 93.3225 16.2196C94.3373 14.1388 95.3009 12.5382 96.5697 10.1372H108.188C105.753 14.2455 101.998 19.8466 99.5628 23.8482C102.252 28.3834 106.26 33.7177 109 38.1462H97.0765C95.0469 34.4113 93.9809 32.9174 93.2201 31.4235C91.9513 33.9312 90.8352 35.8519 89.4661 38.1462H77.7454L86.8785 23.9016Z"
          fill="#082422"
        />
        <path
          d="M11.6292 25.4401H19.3595L21.0762 15.9136H16.1571C7.97989 15.9136 0.89925 21.0269 0.60822 29.6834L0 38.1461H10.743L11.6292 25.4401Z"
          fill="#082422"
        />
        <path
          d="M12.4479 8.38102H27.5836L29.1074 0H1.8836C1.8836 0 1.37021 2.52617 1.24377 4.07019C0.714028 10.5098 5.15142 15.1418 11.5443 15.3302L11.9912 15.3378L12.449 8.38102H12.4479Z"
          fill="#082422"
        />
        <path
          d="M185.807 10.25L123.19 10.25C115.491 10.25 109.248 16.4712 109.25 24.1406C109.25 31.8119 115.491 38.0313 123.192 38.0313L184.131 38.0313L184.096 38.3125L183.672 41.6455C183.694 41.6384 183.717 41.6318 183.741 41.624C184.024 41.5317 184.435 41.3908 184.941 41.1982C185.954 40.8131 187.351 40.2209 188.883 39.3936C191.855 37.7879 195.313 35.3086 197.482 31.7578L197.688 31.4102L197.692 31.4043L197.931 31.0029C199.088 28.9781 199.75 26.6368 199.75 24.1406C199.75 16.4713 193.508 10.2503 185.807 10.25Z"
          fill="#2BF2F1"
          stroke="#082422"
          strokeWidth="0.5"
          strokeMiterlimit="10"
        />
        <path
          d="M175.299 32.0001C172.805 32.0001 171.15 30.7201 171.15 28.5574C171.15 26.6374 172.717 25.5781 174.99 25.0264C176.071 24.7616 177.307 24.6071 178.587 24.5409V24.4085C178.587 23.0623 178.035 22.5988 177.042 22.5988C176.093 22.5988 175.563 23.1064 175.453 23.9671H171.613C171.768 21.4071 173.82 19.8623 177.108 19.8623C180.595 19.8623 182.515 21.1864 182.515 25.1147V28.3367C182.515 29.5946 182.537 30.8305 182.758 31.7794H179.05C179.006 31.4042 178.984 31.007 178.984 30.6098H178.94C178.057 31.4925 177.042 32.0001 175.299 32.0001ZM176.579 29.6387C177.748 29.6387 178.609 28.9988 178.609 27.1229V26.7919L177.925 26.8802C175.983 27.1229 175.078 27.476 175.078 28.447C175.078 29.1974 175.674 29.6387 176.579 29.6387Z"
          fill="#082422"
        />
        <path
          d="M159.279 31.7789V28.8217C161.464 26.5928 164.09 23.9887 164.841 23.2384C164.819 23.2384 164.797 23.2163 164.819 23.2163C163.87 23.2604 163.164 23.2604 162.082 23.2604H159.478V20.1929H169.762V23.1501C168.107 25.0259 165.26 27.7845 164.267 28.7114V28.7335C165.26 28.7114 166.077 28.6893 167.202 28.6893H170.093V31.7789H159.279Z"
          fill="#082422"
        />
        <path
          d="M150.32 32.0001C147.827 32.0001 146.172 30.7201 146.172 28.5574C146.172 26.6374 147.738 25.5781 150.011 25.0264C151.093 24.7616 152.329 24.6071 153.609 24.5409V24.4085C153.609 23.0623 153.057 22.5988 152.064 22.5988C151.115 22.5988 150.585 23.1064 150.475 23.9671H146.635C146.789 21.4071 148.842 19.8623 152.13 19.8623C155.617 19.8623 157.537 21.1864 157.537 25.1147V28.3367C157.537 29.5946 157.559 30.8305 157.78 31.7794H154.072C154.028 31.4042 154.006 31.007 154.006 30.6098H153.962C153.079 31.4925 152.064 32.0001 150.32 32.0001ZM151.6 29.6387C152.77 29.6387 153.631 28.9988 153.631 27.1229V26.7919L152.947 26.8802C151.005 27.1229 150.1 27.476 150.1 28.447C150.1 29.1974 150.696 29.6387 151.6 29.6387Z"
          fill="#082422"
        />
        <path d="M140.283 31.7791V16H144.521V31.7791H140.283Z" fill="#082422" />
        <path
          d="M126 31.7791V16H131.517C132.268 16 132.51 16 133.216 16.0221C136.77 16.1324 138.778 18.1848 138.778 21.2965C138.778 22.9958 138.094 24.5185 136.858 25.4454C135.644 26.3723 133.856 26.5488 131.694 26.5488H130.612V31.7791H126ZM130.612 23.0399H131.914C133.437 23.0399 134.32 22.5323 134.32 21.2524C134.32 20.0165 133.57 19.4869 131.848 19.4869H130.612V23.0399Z"
          fill="#082422"
        />
      </g>
      <defs>
        <clipPath id="clip0_113_4040">
          <rect width="200" height="42" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const itemClass = ({ isActive }: { isActive: boolean }) =>
  "sys-nav-item" + (isActive ? " active" : "");

export function Sidebar({
  onNavigate,
  open,
}: {
  onNavigate: () => void;
  open: boolean;
}) {
  const tr = useTr();
  const { pathname } = useLocation();

  const [manualOpen, setManualOpen] = useState<Record<string, boolean>>({});
  const isGroupOpen = (id: string, active: boolean) => manualOpen[id] ?? active;
  const toggleGroup = (id: string, active: boolean) =>
    setManualOpen((m) => ({ ...m, [id]: !isGroupOpen(id, active) }));

  return (
    <aside
      className={"plaza-sys-sidebar" + (open ? " open" : "")}
      id="sidebar"
    >
      <nav className="sys-nav" aria-label={tr("Secciones", "Sections", "Seções")}>
        {NAV.map((g) => (
          <div key={g.group.en} className="sys-nav-group">
            <span className="sys-group-label">
              {tr(g.group.es, g.group.en, g.group.pt)}
            </span>
            {g.items.map((it) => {
              const Icon = it.icon;
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
                          <Icon size={18} weight={isActive ? "fill" : "regular"} />
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

        {/* Componentes section */}
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
                <PuzzlePieceIcon size={18} weight={isActive ? "fill" : "regular"} />
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
                        <GroupIcon size={18} weight={isActive ? "fill" : "regular"} />
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
      </nav>
    </aside>
  );
}
