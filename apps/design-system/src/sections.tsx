import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@felix/ui";
import {
  StarIcon,
  PaletteIcon,
  TextAaIcon,
  PuzzlePieceIcon,
  CubeIcon,
  PencilSimpleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowSquareOutIcon,
  PaperPlaneTiltIcon,
  HeartIcon,
  ShieldCheckIcon,
  GlobeIcon,
  ClockIcon,
  UserIcon,
  BellIcon,
  CreditCardIcon,
  WalletIcon,
  HouseIcon,
  CurrencyDollarIcon,
  ChatCircleTextIcon,
  BankIcon,
  ReceiptIcon,
  CheckIcon,
  DownloadSimpleIcon,
  CopyIcon,
  // Money & finance
  CoinIcon,
  CoinsIcon,
  PiggyBankIcon,
  HandCoinsIcon,
  ChartLineUpIcon,
  PercentIcon,
  InvoiceIcon,
  VaultIcon,
  // Communication
  EnvelopeIcon,
  PhoneIcon,
  ChatsCircleIcon,
  VideoCameraIcon,
  MegaphoneIcon,
  // People & account
  UsersIcon,
  UserCircleIcon,
  IdentificationCardIcon,
  UserPlusIcon,
  FingerprintIcon,
  LockIcon,
  // Navigation & actions
  CaretDownIcon,
  MagnifyingGlassIcon,
  GearIcon,
  ListIcon,
  DotsThreeIcon,
  PlusIcon,
  XIcon,
  TrashIcon,
  UploadSimpleIcon,
  ShareNetworkIcon,
  // Status & feedback
  CheckCircleIcon,
  XCircleIcon,
  WarningIcon,
  InfoIcon,
  HourglassIcon,
  ThumbsUpIcon,
  SmileyIcon,
  // Places & world
  MapPinIcon,
  AirplaneIcon,
  CalendarIcon,
  FlagIcon,
  CompassIcon,
  type Icon,
} from "@phosphor-icons/react";
import designMd from "../../../DESIGN.md?raw";
import componentsMd from "../../../components.md?raw";
import { useTr } from "./i18n";
import {
  BRAND_COLORS,
  STATUS_COLORS,
  COLOR_TOKENS,
  RADIUS_TOKENS,
  SPACE_TOKENS,
  SHADOW_TOKENS,
  TYPE_SCALE,
  type Swatch,
} from "./data";
import { ILLUSTRATIONS, ILLUSTRATION_COUNT } from "./illustrations";
import { FLAGS } from "./flags";
import { EXTRA_ICONS } from "./icons-extra";
import { GLOSSARY } from "./glossary";

/* ─────────────────────────── Hero / Overview ─────────────────────────── */
export function Hero() {
  const tr = useTr();
  return (
    <header className="hero sec" id="overview">
      <span className="kicker">
        {tr(
          "Felix Pago · Identidad de producto",
          "Felix Pago · Product identity",
          "Felix Pago · Identidade de produto"
        )}
      </span>
      <h1>
        {tr(
          "Las remesas no son transacciones. Son ",
          "Remittances aren't transactions. They're ",
          "Remessas não são transações. São "
        )}
        <em>
          {tr("actos de presencia", "acts of presence", "atos de presença")}
        </em>
        .
      </h1>
      <p className="desc">
        {tr(
          "El sistema de diseño de Felix: cálido, eléctrico y radicalmente transparente. Un compañero financiero para la comunidad latina en Estados Unidos — no un banco.",
          "Felix's design system: warm, electric, and radically transparent. A financial compañero for the Latin American community in the US — not a bank.",
          "O sistema de design da Felix: caloroso, elétrico e radicalmente transparente. Um companheiro financeiro para a comunidade latina nos Estados Unidos — não um banco."
        )}
      </p>
      <div className="meta">
        <div>
          <span className="k">{tr("Versión", "Version", "Versão")}</span>
          <span className="v">1.0.0 · alpha</span>
        </div>
        <div>
          <span className="k">
            {tr("Componentes", "Components", "Componentes")}
          </span>
          <span className="v">43</span>
        </div>
        <div>
          <span className="k">{tr("Idioma", "Language", "Idioma")}</span>
          <span className="v">ES · EN · PT</span>
        </div>
        <div>
          <span className="k">Stack</span>
          <span className="v">React 19 · Tailwind v4</span>
        </div>
      </div>
    </header>
  );
}

/* ──────────────────────────── Start grid ─────────────────────────────── */
function Tile({
  icon: I,
  to,
  title,
  desc,
  go,
}: {
  icon: Icon;
  to: string;
  title: string;
  desc: string;
  go: string;
}) {
  return (
    <Link className="tile" to={to}>
      <span className="ic">
        <I />
      </span>
      <b>{title}</b>
      <span className="d">{desc}</span>
      <span className="go">{go} →</span>
    </Link>
  );
}
export function StartGrid() {
  const tr = useTr();
  return (
    <section className="sec flush">
      <div className="eyebrow">
        <span>
          {tr("Por dónde empezar", "Where to start", "Por onde começar")}
        </span>
      </div>
      <div className="grid">
        <Tile
          icon={StarIcon}
          to="/principios"
          title={tr("Principios", "Principles", "Princípios")}
          desc={tr(
            "Las cuatro ideas que guían cada decisión de diseño.",
            "The four ideas that guide every design decision.",
            "As quatro ideias que guiam cada decisão de design."
          )}
          go={tr("Leer", "Read", "Ler")}
        />
        <Tile
          icon={PaletteIcon}
          to="/colores"
          title={tr("Colores", "Colors", "Cores")}
          desc={tr(
            "Turquesa, slate y una base neutra cálida. Paleta pequeña a propósito.",
            "Turquoise, slate, and a warm neutral base. A deliberately small palette.",
            "Turquesa, slate e uma base neutra quente. Paleta pequena de propósito."
          )}
          go={tr("Ver paleta", "View palette", "Ver paleta")}
        />
        <Tile
          icon={TextAaIcon}
          to="/tipografia"
          title={tr("Tipografía", "Typography", "Tipografia")}
          desc={tr(
            "Plain para los momentos de impacto, Saans para todo lo demás.",
            "Plain for moments of impact, Saans for everything else.",
            "Plain para os momentos de impacto, Saans para todo o resto."
          )}
          go={tr("Ver escala", "View scale", "Ver escala")}
        />
        <Tile
          icon={PuzzlePieceIcon}
          to="/componentes"
          title={tr("Componentes", "Components", "Componentes")}
          desc={tr(
            "43 piezas en React, construidas sobre Radix y accesibles por defecto.",
            "43 React pieces, built on Radix and accessible by default.",
            "43 peças em React, construídas sobre Radix e acessíveis por padrão."
          )}
          go={tr("Explorar", "Explore", "Explorar")}
        />
        <Tile
          icon={CubeIcon}
          to="/tokens"
          title="Tokens"
          desc={tr(
            "Variables CSS y Tailwind. Una sola fuente de verdad para light y dark.",
            "CSS & Tailwind variables. One source of truth for light and dark.",
            "Variáveis CSS e Tailwind. Uma única fonte de verdade para light e dark."
          )}
          go={tr("Ver tokens", "View tokens", "Ver tokens")}
        />
        <Tile
          icon={PencilSimpleIcon}
          to="/editorial"
          title={tr("Voz y copy", "Voice & copy", "Voz e copy")}
          desc={tr(
            "Español primero, tú siempre. Claro, cálido, sin jerga.",
            "Spanish-first, informal tú always. Clear, warm, jargon-free.",
            "Espanhol primeiro, você sempre. Claro, caloroso, sem jargão."
          )}
          go={tr("Leer guía", "Read guide", "Ler o guia")}
        />
      </div>
    </section>
  );
}

/* ───────────────────────────── Overview page ─────────────────────────── */
export function Overview() {
  return (
    <>
      <Hero />
      <StartGrid />
    </>
  );
}

/* ──────────────────────────── Principles ─────────────────────────────── */
export function Principles() {
  const tr = useTr();
  const items = [
    {
      n: "01",
      t: tr(
        "Cálido, no corporativo",
        "Warm, not corporate",
        "Caloroso, não corporativo"
      ),
      d: tr(
        "Lienzo blanco cálido, esquinas redondeadas, turquesa vivo. El producto se siente como un compañero, no como una sucursal.",
        "A warm white canvas, rounded corners, living turquoise. The product feels like a compañero, not a bank branch.",
        "Tela branca e quente, cantos arredondados, turquesa vivo. O produto se sente como um companheiro, não como uma agência bancária."
      ),
    },
    {
      n: "02",
      t: tr(
        "Radicalmente transparente",
        "Radically transparent",
        "Radicalmente transparente"
      ),
      d: tr(
        "Cada comisión es una línea visible — incluso cuando es cero. Nunca sorprendemos con costos.",
        "Every fee is a visible line item — even when it's zero. We never surprise with costs.",
        "Cada taxa é uma linha visível — mesmo quando é zero. Nunca surpreendemos com custos."
      ),
    },
    {
      n: "03",
      t: tr(
        "Claro en dos idiomas",
        "Clear in two languages",
        "Claro em dois idiomas"
      ),
      d: tr(
        "Español primero, sin jerga, tú siempre. El inglés solo para contextos internacionales o B2B.",
        "Spanish-first, jargon-free, informal tú always. English only for international or B2B contexts.",
        "Espanhol primeiro, sem jargão, você sempre. O inglês só para contextos internacionais ou B2B."
      ),
    },
    {
      n: "04",
      t: tr(
        "Accesible por defecto",
        "Accessible by default",
        "Acessível por padrão"
      ),
      d: tr(
        "Contraste WCAG AA, foco siempre visible, construido sobre primitivas Radix con ARIA correcto.",
        "WCAG AA contrast, always-visible focus, built on Radix primitives with correct ARIA.",
        "Contraste WCAG AA, foco sempre visível, construído sobre primitivas Radix com ARIA correto."
      ),
    },
  ];
  return (
    <section className="sec" id="principles">
      <div className="eyebrow">
        <span className="n">01</span>
        <span>
          {tr(
            "Principios de diseño",
            "Design principles",
            "Princípios de design"
          )}
        </span>
      </div>
      <h2 className="h2">
        {tr(
          "Cuatro ideas, una misma intención",
          "Four ideas, one intent",
          "Quatro ideias, uma mesma intenção"
        )}
      </h2>
      <p className="lead">
        {tr(
          "Felix trata el dinero como un acto de cuidado entre familias. Estos principios mantienen el producto humano, no clínico.",
          "Felix treats money as an act of care between families. These principles keep the product human, not clinical.",
          "A Felix trata o dinheiro como um ato de cuidado entre famílias. Esses princípios mantêm o produto humano, não clínico."
        )}
      </p>
      <div className="princ">
        {items.map((p) => (
          <div className="p" key={p.n}>
            <div className="num">{p.n}</div>
            <b>{p.t}</b>
            <span>{p.d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────── Colors ──────────────────────────────── */
function SwatchCard({ s }: { s: Swatch }) {
  const tr = useTr();
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(s.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1100);
  };
  return (
    <button
      className="sw"
      onClick={copy}
      title={tr("Clic para copiar", "Click to copy", "Clique para copiar")}
    >
      <div
        className="chip"
        style={{
          background: s.hex,
          boxShadow: s.light ? "inset 0 0 0 1px rgba(8,36,34,.08)" : undefined,
        }}
      />
      <div className="m2">
        <div className="nm">{s.name}</div>
        <div className="hx">
          {copied ? tr("Copiado ✓", "Copied ✓", "Copiado ✓") : s.hex}
        </div>
      </div>
    </button>
  );
}
export function Colors() {
  const tr = useTr();
  return (
    <section className="sec" id="colors">
      <div className="eyebrow">
        <span className="n">02</span>
        <span>{tr("Color", "Color", "Cor")}</span>
      </div>
      <h2 className="h2">
        {tr(
          "Dos héroes y una base cálida",
          "Two heroes and a warm base",
          "Dois heróis e uma base quente"
        )}
      </h2>
      <p className="lead">
        {tr(
          "La paleta es deliberadamente pequeña: cada color se gana su lugar. El turquesa lleva la energía de marca; el slate, el peso y la autoridad.",
          "The palette is deliberately small — every color earns its place. Turquoise carries the brand energy; slate carries weight and authority.",
          "A paleta é deliberadamente pequena: cada cor conquista seu lugar. O turquesa carrega a energia da marca; o slate, o peso e a autoridade."
        )}
      </p>
      <p className="copyhint">
        {tr(
          "Tip: hacé clic en cualquier muestra para copiar su hex.",
          "Tip: click any swatch to copy its hex.",
          "Dica: clique em qualquer amostra para copiar o hex."
        )}
      </p>
      <h3 className="h3">
        {tr("Marca y base", "Brand & base", "Marca e base")}
      </h3>
      <div className="swatches">
        {BRAND_COLORS.map((s) => (
          <SwatchCard key={s.name} s={s} />
        ))}
      </div>
      <h3 className="h3">
        {tr("Estados semánticos", "Semantic status", "Estados semânticos")}
      </h3>
      <div className="swatches">
        {STATUS_COLORS.map((s) => (
          <SwatchCard key={s.name} s={s} />
        ))}
      </div>
      <p className="scale-note">
        {tr(
          "Cada color semántico vive como escala completa (50–900) en theme.css y se expone como token: --primary, --status-success, --interactive-primary-hover, etc.",
          "Each semantic color lives as a full 50–900 scale in theme.css and is exposed as a token: --primary, --status-success, --interactive-primary-hover, etc.",
          "Cada cor semântica vive como uma escala completa (50–900) no theme.css e é exposta como token: --primary, --status-success, --interactive-primary-hover, etc."
        )}
      </p>
    </section>
  );
}

/* ──────────────────────────── Typography ─────────────────────────────── */
const TYPE_CATEGORY_LABELS: Record<
  string,
  { es: string; en: string; pt: string }
> = {
  Display: { es: "Display", en: "Display", pt: "Display" },
  Headings: { es: "Encabezados", en: "Headings", pt: "Títulos" },
  Body: { es: "Cuerpo", en: "Body", pt: "Corpo" },
  Caption: { es: "Captions", en: "Captions", pt: "Legendas" },
};
const TYPE_CATEGORIES = ["Display", "Headings", "Body", "Caption"] as const;

export function Typography() {
  const tr = useTr();
  return (
    <section className="sec" id="typography">
      <div className="eyebrow">
        <span className="n">03</span>
        <span>{tr("Tipografía", "Typography", "Tipografia")}</span>
      </div>
      <h2 className="h2">
        {tr(
          "Dos familias, dos registros",
          "Two families, two registers",
          "Duas famílias, dois registros"
        )}
      </h2>
      <p className="lead">
        {tr(
          "Plain para el impacto — el monto que envías, el titular de éxito. Saans para la claridad — cada etiqueta, botón y párrafo.",
          "Plain for impact — the amount you send, the success headline. Saans for clarity — every label, button, and paragraph.",
          "Plain para o impacto — o valor que você envia, o título de sucesso. Saans para a clareza — cada label, botão e parágrafo."
        )}
      </p>
      <div className="fam-card">
        <div className="fam">
          <div className="big disp">Ag</div>
          <div className="lab">Plain · Display</div>
          <div className="glyphs">
            Black 900 · Extrabold 800
            <br />
            AaBbCc · 0123456789 · $1,200
          </div>
        </div>
        <div className="fam">
          <div className="big" style={{ fontWeight: 600 }}>
            Ag
          </div>
          <div className="lab">Saans · UI</div>
          <div className="glyphs">
            Regular 400 · SemiBold 600
            <br />
            AaBbCc · 0123456789 · áéíóúñ
          </div>
        </div>
      </div>
      {TYPE_CATEGORIES.map((cat) => {
        const label = TYPE_CATEGORY_LABELS[cat];
        const items = TYPE_SCALE.filter((t) => t.category === cat);
        return (
          <div key={cat}>
            <h3 className="h3">{tr(label.es, label.en, label.pt)}</h3>
            <div className="spec">
              {items.map((t) => (
                <div className="row" key={t.token}>
                  <div
                    className="sample"
                    style={{
                      fontFamily:
                        t.family === "Plain"
                          ? "var(--font-heading)"
                          : "var(--font-sans)",
                      fontWeight: t.weight,
                      fontSize: t.size,
                      lineHeight: t.lineHeight,
                      letterSpacing: t.letterSpacing,
                    }}
                  >
                    {tr(t.es, t.en, t.pt)}
                  </div>
                  <div className="info">
                    {t.token} · {t.family} {t.weight} · {t.size}/{t.lineHeight}{" "}
                    · {t.letterSpacing}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

/* ─────────────────────────── Illustrations ───────────────────────────── */
const ILLUSTRATION_CATEGORY_LABELS: Record<
  string,
  { es: string; en: string; pt: string }
> = {
  "Brand & Characters": {
    es: "Marca y personajes",
    en: "Brand & Characters",
    pt: "Marca e personagens",
  },
  Hands: { es: "Manos", en: "Hands", pt: "Mãos" },
  "Money & Payments": {
    es: "Dinero y pagos",
    en: "Money & Payments",
    pt: "Dinheiro e pagamentos",
  },
  Communication: {
    es: "Comunicación",
    en: "Communication",
    pt: "Comunicação",
  },
  "Status & Alerts": {
    es: "Estados y alertas",
    en: "Status & Alerts",
    pt: "Estados e alertas",
  },
  "Navigation & Maps": {
    es: "Navegación y mapas",
    en: "Navigation & Maps",
    pt: "Navegação e mapas",
  },
  Other: { es: "Otras", en: "Other", pt: "Outras" },
};

const PHOSPHOR_CATEGORIES: {
  es: string;
  en: string;
  pt: string;
  icons: Icon[];
}[] = [
  {
    es: "Dinero y finanzas",
    en: "Money & finance",
    pt: "Dinheiro e finanças",
    icons: [
      CurrencyDollarIcon,
      WalletIcon,
      BankIcon,
      CreditCardIcon,
      CoinIcon,
      CoinsIcon,
      PiggyBankIcon,
      HandCoinsIcon,
      ReceiptIcon,
      ChartLineUpIcon,
      PercentIcon,
      InvoiceIcon,
      VaultIcon,
    ],
  },
  {
    es: "Comunicación",
    en: "Communication",
    pt: "Comunicação",
    icons: [
      ChatCircleTextIcon,
      ChatsCircleIcon,
      EnvelopeIcon,
      PhoneIcon,
      PaperPlaneTiltIcon,
      BellIcon,
      VideoCameraIcon,
      MegaphoneIcon,
    ],
  },
  {
    es: "Personas y cuenta",
    en: "People & account",
    pt: "Pessoas e conta",
    icons: [
      UserIcon,
      UsersIcon,
      UserCircleIcon,
      IdentificationCardIcon,
      UserPlusIcon,
      FingerprintIcon,
      ShieldCheckIcon,
      LockIcon,
    ],
  },
  {
    es: "Navegación y acciones",
    en: "Navigation & actions",
    pt: "Navegação e ações",
    icons: [
      HouseIcon,
      ArrowRightIcon,
      ArrowLeftIcon,
      CaretDownIcon,
      MagnifyingGlassIcon,
      GearIcon,
      ListIcon,
      DotsThreeIcon,
      PlusIcon,
      XIcon,
      CheckIcon,
      TrashIcon,
      PencilSimpleIcon,
      DownloadSimpleIcon,
      UploadSimpleIcon,
      CopyIcon,
      ShareNetworkIcon,
    ],
  },
  {
    es: "Estados y feedback",
    en: "Status & feedback",
    pt: "Estados e feedback",
    icons: [
      CheckCircleIcon,
      XCircleIcon,
      WarningIcon,
      InfoIcon,
      ClockIcon,
      HourglassIcon,
      StarIcon,
      HeartIcon,
      ThumbsUpIcon,
      SmileyIcon,
    ],
  },
  {
    es: "Lugares y mundo",
    en: "Places & world",
    pt: "Lugares e mundo",
    icons: [
      GlobeIcon,
      MapPinIcon,
      AirplaneIcon,
      CalendarIcon,
      FlagIcon,
      CompassIcon,
    ],
  },
];

export function Illustrations() {
  const tr = useTr();
  const { hash } = useLocation();

  // Jump to the requested subsection whenever the hash changes (Sidebar links use #id).
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    el?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [hash]);

  return (
    <section className="sec" id="illustrations">
      <div className="eyebrow">
        <span className="n">04</span>
        <span>{tr("Ilustraciones", "Illustrations", "Ilustrações")}</span>
      </div>
      <h2 className="h2">
        {tr(
          "Ilustraciones, banderas e íconos",
          "Illustrations, flags & icons",
          "Ilustrações, bandeiras e ícones"
        )}
      </h2>
      <p className="lead">
        {tr(
          "Todo el sistema visual de apoyo de Felix en un solo lugar: ilustraciones de marca, banderas de país, iconografía Phosphor y los íconos de métodos de pago.",
          "Felix's whole supporting visual system in one place: brand illustrations, country flags, Phosphor iconography, and payment method icons.",
          "Todo o sistema visual de apoio da Felix em um só lugar: ilustrações de marca, bandeiras de países, iconografia Phosphor e os ícones de métodos de pagamento."
        )}
      </p>

      {/* ── Felix illustrations ─────────────────────────────────────────── */}
      <div id="felix-illustrations" className="illo-section">
        <h3 className="h3">
          {tr(
            "Ilustraciones de Felix",
            "Felix illustrations",
            "Ilustrações da Felix"
          )}{" "}
          · {ILLUSTRATION_COUNT}
        </h3>
        <p className="copyhint">
          {tr(
            "Formas redondeadas, paleta de marca y un gesto humano para momentos de celebración, estados vacíos y onboarding.",
            "Rounded shapes, brand palette, and a human gesture for moments of celebration, empty states, and onboarding.",
            "Formas arredondadas, paleta da marca e um gesto humano para momentos de celebração, estados vazios e onboarding."
          )}
        </p>
        {ILLUSTRATIONS.map((cat) => {
          const label = ILLUSTRATION_CATEGORY_LABELS[cat.category] ?? {
            es: cat.category,
            en: cat.category,
            pt: cat.category,
          };
          return (
            <div key={cat.category}>
              <h4 className="h4">
                {tr(label.es, label.en, label.pt)} · {cat.items.length}
              </h4>
              <div className="gallery-grid">
                {cat.items.map((ill) => {
                  const src = `/illustrations/${encodeURIComponent(ill.file)}`;
                  return (
                    <figure className="gallery-card" key={ill.file}>
                      <div className="gallery-preview">
                        <img src={src} alt={ill.name} loading="lazy" />
                      </div>
                      <figcaption className="gallery-meta">
                        <span className="gallery-name" title={ill.name}>
                          {ill.name}
                        </span>
                        <a
                          className="gallery-dl"
                          href={src}
                          download={ill.file}
                        >
                          {tr("SVG", "SVG", "SVG")}
                        </a>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Flags ────────────────────────────────────────────────────────── */}
      <div id="flags" className="illo-section">
        <h3 className="h3">
          {tr("Banderas", "Flags", "Bandeiras")} · {FLAGS.length}
        </h3>
        <p className="copyhint">
          {tr(
            "Un país por corredor de envío, listas para selectores y tarjetas de destino.",
            "One country per remittance corridor, ready for selectors and destination cards.",
            "Um país por corredor de remessa, prontas para seletores e cards de destino."
          )}
        </p>
        <div className="gallery-grid">
          {FLAGS.map((f) => {
            const src = `/flags/${encodeURIComponent(f.file)}`;
            return (
              <figure className="gallery-card" key={f.file}>
                <div className="gallery-preview flag-size">
                  <img src={src} alt={tr(f.es, f.en, f.pt)} loading="lazy" />
                </div>
                <figcaption className="gallery-meta">
                  <span className="gallery-name">{tr(f.es, f.en, f.pt)}</span>
                  <a className="gallery-dl" href={src} download={f.file}>
                    {tr("SVG", "SVG", "SVG")}
                  </a>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* ── Phosphor icons ───────────────────────────────────────────────── */}
      <div id="phosphor" className="illo-section">
        <h3 className="h3">
          {tr(
            "Iconografía Phosphor",
            "Phosphor iconography",
            "Iconografia Phosphor"
          )}
        </h3>
        <p className="lead">
          {tr(
            "El sistema usa Phosphor Icons — duotone para estados en reposo, fill para activos. Nunca Lucide en producto. Trazo consistente, esquinas redondeadas.",
            "The system uses Phosphor Icons — duotone at rest, fill when active. Never Lucide in product. Consistent stroke, rounded corners.",
            "O sistema usa Phosphor Icons — duotone para estados em repouso, fill para ativos. Nunca Lucide no produto. Traço consistente, cantos arredondados."
          )}
        </p>
        {PHOSPHOR_CATEGORIES.map((cat) => (
          <div key={cat.en}>
            <h4 className="h4">
              {tr(cat.es, cat.en, cat.pt)} · {cat.icons.length}
            </h4>
            <div className="gallery-grid">
              {cat.icons.map((I, i) => (
                <div className="gallery-card" key={i}>
                  <div className="gallery-preview icon-size">
                    <I weight="duotone" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <a
          className="btn-link"
          href="https://phosphoricons.com"
          target="_blank"
          rel="noreferrer"
        >
          {tr(
            "Ver la galería completa en phosphoricons.com",
            "Browse the full gallery on phosphoricons.com",
            "Veja a galeria completa em phosphoricons.com"
          )}{" "}
          <ArrowSquareOutIcon />
        </a>
      </div>

      {/* ── Extra / payment icons ────────────────────────────────────────── */}
      <div id="extra-icons" className="illo-section">
        <h3 className="h3">
          {tr("Íconos extras", "Extra icons", "Ícones extras")} ·{" "}
          {EXTRA_ICONS.length}
        </h3>
        <p className="copyhint">
          {tr(
            "Marcas de tarjetas y métodos de pago, para checkout y pantallas de fondeo.",
            "Card brands and payment methods, for checkout and funding screens.",
            "Bandeiras de cartão e métodos de pagamento, para o checkout e as telas de adição de saldo."
          )}
        </p>
        <div className="gallery-grid">
          {EXTRA_ICONS.map((ic) => {
            const src = `/icons-extra/${encodeURIComponent(ic.file)}`;
            return (
              <figure className="gallery-card" key={ic.file}>
                <div className="gallery-preview flag-size">
                  <img src={src} alt={ic.name} loading="lazy" />
                </div>
                <figcaption className="gallery-meta">
                  <span className="gallery-name">{ic.name}</span>
                  <a className="gallery-dl" href={src} download={ic.file}>
                    {tr("PNG", "PNG", "PNG")}
                  </a>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Tokens ──────────────────────────────── */
export function Tokens() {
  const tr = useTr();
  return (
    <section className="sec" id="tokens">
      <div className="eyebrow">
        <span className="n">06</span>
        <span>Design Tokens</span>
      </div>
      <h2 className="h2">
        {tr(
          "Una sola fuente de verdad",
          "One source of truth",
          "Uma única fonte de verdade"
        )}
      </h2>
      <p className="lead">
        {tr(
          "Todos los tokens viven en theme.css (generado desde tokens.ts) y se exponen como variables CSS y utilidades Tailwind v4. Los nombres cortos no existen — usá los reales.",
          "Every token lives in theme.css (generated from tokens.ts) and is exposed as CSS variables and Tailwind v4 utilities. Short names don't exist — use the real ones.",
          "Todos os tokens vivem no theme.css (gerado a partir de tokens.ts) e são expostos como variáveis CSS e utilitários do Tailwind v4. Os nomes curtos não existem — use os reais."
        )}
      </p>

      <h3 className="h3">
        {tr("Color semántico", "Semantic color", "Cor semântica")}
      </h3>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>{tr("Variable CSS", "CSS variable", "Variável CSS")}</th>
              <th>{tr("Valor", "Value", "Valor")}</th>
              <th>{tr("Uso", "Use", "Uso")}</th>
            </tr>
          </thead>
          <tbody>
            {COLOR_TOKENS.map((r) => (
              <tr key={r.v}>
                <td className="mono">
                  <span className="swatch-dot" style={{ background: r.hex }} />
                  {r.v}
                </td>
                <td className="mono">{r.hex}</td>
                <td>{tr(r.es, r.en, r.pt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="h3">
        {tr("Radio de borde", "Border radius", "Raio de borda")}
      </h3>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Token</th>
              <th>{tr("Valor", "Value", "Valor")}</th>
              <th>{tr("Aplicación", "Applies to", "Aplicação")}</th>
            </tr>
          </thead>
          <tbody>
            {RADIUS_TOKENS.map((r) => (
              <tr key={r.t}>
                <td className="mono">{r.t}</td>
                <td className="mono">{r.v}</td>
                <td>{tr(r.es, r.en, r.pt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="h3">
        {tr(
          "Espaciado · grilla base 4px",
          "Spacing · 4px base grid",
          "Espaçamento · grade base de 4px"
        )}
      </h3>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Token</th>
              <th>{tr("Valor", "Value", "Valor")}</th>
              <th>rem</th>
            </tr>
          </thead>
          <tbody>
            {SPACE_TOKENS.map((r) => (
              <tr key={r.t}>
                <td className="mono">{r.t}</td>
                <td className="mono">{r.v}</td>
                <td className="mono">{r.rem}rem</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="h3">
        {tr(
          "Sombras · slate-tinted",
          "Shadows · slate-tinted",
          "Sombras · slate-tinted"
        )}
      </h3>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Token</th>
              <th>{tr("Uso", "Use", "Uso")}</th>
            </tr>
          </thead>
          <tbody>
            {SHADOW_TOKENS.map((r) => (
              <tr key={r.t}>
                <td className="mono">{r.t}</td>
                <td>{tr(r.es, r.en, r.pt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ────────────────────────────── Editorial ────────────────────────────── */
const UX_PRINCIPLES: {
  es: string;
  en: string;
  pt: string;
  descEs: string;
  descEn: string;
  descPt: string;
}[] = [
  {
    es: "Claridad",
    en: "Clarity",
    pt: "Clareza",
    descEs:
      "Un mensaje, una idea. Sin ambigüedad sobre qué pasa con tu dinero.",
    descEn:
      "One message, one idea. No ambiguity about what happens to your money.",
    descPt:
      "Uma mensagem, uma ideia. Sem ambiguidade sobre o que acontece com seu dinheiro.",
  },
  {
    es: "Concisión",
    en: "Concision",
    pt: "Concisão",
    descEs: "Decí lo necesario, nada más. Cada palabra se gana su lugar.",
    descEn: "Say what's needed, nothing more. Every word earns its place.",
    descPt: "Diga o necessário, nada mais. Cada palavra conquista seu lugar.",
  },
  {
    es: "Consistencia",
    en: "Consistency",
    pt: "Consistência",
    descEs:
      "El mismo término para lo mismo, siempre — comisión es comisión, no tarifa.",
    descEn:
      "The same term for the same thing, always — a fee is a fee, not a charge.",
    descPt:
      "O mesmo termo para a mesma coisa, sempre — taxa é taxa, não tarifa.",
  },
  {
    es: "Utilidad",
    en: "Utility",
    pt: "Utilidade",
    descEs: "El copy ayuda a decidir y actuar, no solo a informar.",
    descEn: "Copy helps people decide and act, not just inform.",
    descPt: "O copy ajuda a decidir e agir, não só a informar.",
  },
  {
    es: "Precisión",
    en: "Accuracy",
    pt: "Precisão",
    descEs: "Sin errores de tipeo ni de género. La exactitud genera confianza.",
    descEn: "No typos, no gender mismatches. Accuracy builds trust.",
    descPt: "Sem erros de digitação nem de gênero. A exatidão gera confiança.",
  },
  {
    es: "Voz y tono",
    en: "Voice & tone",
    pt: "Voz e tom",
    descEs: "Cálida y cercana de principio a fin — tú, nunca usted.",
    descEn: "Warm and close from start to finish — tú, never usted.",
    descPt: "Calorosa e próxima do começo ao fim — você, nunca “o senhor”.",
  },
  {
    es: "Accesibilidad",
    en: "Accessibility",
    pt: "Acessibilidade",
    descEs: "Lenguaje simple, legible en cualquier nivel de lectura.",
    descEn: "Simple language, legible at any reading level.",
    descPt: "Linguagem simples, legível em qualquer nível de leitura.",
  },
  {
    es: "Deleite",
    en: "Delight",
    pt: "Encantamento",
    descEs: "Un gesto humano en el momento justo, sin sacrificar claridad.",
    descEn: "A human touch at the right moment, without sacrificing clarity.",
    descPt: "Um gesto humano na hora certa, sem sacrificar a clareza.",
  },
];

const CASE_STUDY_ROWS: {
  titleEs: string;
  titleEn: string;
  titlePt: string;
  beforeEs: string;
  beforeEn: string;
  beforePt: string;
  afterEs: string;
  afterEn: string;
  afterPt: string;
}[] = [
  {
    titleEs: "Sobrecarga cognitiva",
    titleEn: "Cognitive overload",
    titlePt: "Sobrecarga cognitiva",
    beforeEs:
      "“Contamos con varios métodos seguros para que pagues como prefieras” — mezcla seguridad y variedad, y promete opciones que la pantalla no mostraba.",
    beforeEn:
      "“We offer several secure methods so you can pay however you prefer” — bundles security and variety, and promises options the screen didn't show.",
    beforePt:
      "“Contamos com vários métodos seguros para você pagar como preferir” — mistura segurança e variedade, e promete opções que a tela não mostrava.",
    afterEs: "“Tus pagos están protegidos.”",
    afterEn: "“Your payments are protected.”",
    afterPt: "“Seus pagamentos estão protegidos.”",
  },
  {
    titleEs: "Voz inconsistente",
    titleEn: "Inconsistent voice",
    titlePt: "Voz inconsistente",
    beforeEs:
      "El consentimiento pasaba a “usted” formal en un flujo que habla “tú” — frío justo en el momento de mayor confianza.",
    beforeEn:
      "Consent shifted to formal “usted” in a flow that otherwise speaks “tú” — cold right at the moment of trust.",
    beforePt:
      "O consentimento passava para o “usted” formal em um fluxo que fala “tú” — frio bem no momento de maior confiança.",
    afterEs:
      "Consentimiento en “tú” de punta a punta: autorizás, podés, seleccionás.",
    afterEn: "Consent in “tú” end to end: you authorize, you can, you select.",
    afterPt:
      "Consentimento em “tú” de ponta a ponta: você autoriza, você pode, você seleciona.",
  },
  {
    titleEs: "Errores en una pantalla de dinero",
    titleEn: "Errors on a money screen",
    titlePt: "Erros em uma tela de dinheiro",
    beforeEs:
      "“opciones rápidas”, “métodos”, “Pagar después”, “Tarjeta de Débito” y el error de género “Listo para usar”.",
    beforeEn:
      "“quick options,” “methods,” “Pay later,” “Debit Card,” and the gender mismatch “Ready to use.”",
    beforePt:
      "“opções rápidas”, “métodos”, “Pagar depois”, “Cartão de Débito” e o erro de gênero “Listo para usar”.",
    afterEs: "Cada error corregido: “Tarjeta de débito”, “Lista para usar”.",
    afterEn:
      "Every error fixed: “Debit card,” “Ready to use” (correct gender agreement).",
    afterPt:
      "Cada erro corrigido: “Cartão de débito”, “Lista para usar” (concordância de gênero correta).",
  },
  {
    titleEs: "Sin vocabulario compartido",
    titleEn: "No shared vocabulary",
    titlePt: "Sem vocabulário compartilhado",
    beforeEs:
      "La comisión se llamaba “Tarifa” y “Sin impuestos”; el checkbox decía “De acuerdo” contra el legal “Estoy de acuerdo”.",
    beforeEn:
      "The fee was called “Tarifa” and “Sin impuestos”; the checkbox said “Agreed” against the legal text's “I agree.”",
    beforePt:
      "A taxa se chamava “Tarifa” e “Sin impuestos”; o checkbox dizia “De acordo” contra o “Estou de acordo” do texto legal.",
    afterEs:
      "Un solo vocabulario: “Comisión de Félix” / “Sin comisiones”; el checkbox ahora dice “Estoy de acuerdo”.",
    afterEn:
      "One shared vocabulary: “Félix fee” / “No fees”; the checkbox now reads “I agree.”",
    afterPt:
      "Um único vocabulário: “Taxa da Félix” / “Sem taxas”; o checkbox agora diz “Estou de acordo”.",
  },
  {
    titleEs: "El lenguaje no describía la acción real",
    titleEn: "Language ≠ reality",
    titlePt: "A linguagem não descrevia a ação real",
    beforeEs:
      "“Al hacer clic…” — pero la acción real era seleccionar un checkbox, no hacer clic.",
    beforeEn:
      "“By clicking…” — but the real action was selecting a checkbox, not clicking.",
    beforePt:
      "“Ao clicar…” — mas a ação real era selecionar um checkbox, não clicar.",
    afterEs:
      "Decí lo que realmente pasa: “Si seleccionás ‘Estoy de acuerdo’…”.",
    afterEn: "Say what actually happens: “If you select ‘I agree’…”",
    afterPt:
      "Diga o que realmente acontece: “Se você selecionar ‘Estou de acordo’…”.",
  },
  {
    titleEs: "Fuera de contexto y verboso",
    titleEn: "Out of context & verbose",
    titlePt: "Fora de contexto e verboso",
    beforeEs:
      "Mención de “préstamo” dentro de un flujo de remesas; legal denso y repetitivo.",
    beforeEn:
      "A “loan” mention inside a remittance flow; dense, repetitive legalese.",
    beforePt:
      "Menção a “empréstimo” dentro de um fluxo de remessas; texto legal denso e repetitivo.",
    afterEs:
      "La razón correcta, en contexto: “Necesitamos revisar tu cuenta…”; “Vinculá tu banco”.",
    afterEn:
      "The right reason, in context: “We need to review your account…”; “Link your bank.”",
    afterPt:
      "O motivo certo, no contexto: “Precisamos revisar sua conta…”; “Vincule seu banco”.",
  },
];

export function Editorial() {
  const tr = useTr();
  const voices = [
    {
      b: tr("Cálida", "Warm", "Calorosa"),
      p: tr(
        "“Tu dinero ya está en camino a casa.”",
        "“Your money is already on its way home.”",
        "“Seu dinheiro já está a caminho de casa.”"
      ),
    },
    {
      b: tr("Directa", "Direct", "Direta"),
      p: tr(
        "“Sin comisión. El tipo de cambio es 17.00.”",
        "“No fee. The exchange rate is 17.00.”",
        "“Sem taxa. O câmbio é 17.00.”"
      ),
    },
    {
      b: tr("Cercana", "Close", "Próxima"),
      p: tr(
        "“¿Listo para enviar? Te toma 30 segundos.”",
        "“Ready to send? It takes you 30 seconds.”",
        "“Pronto para enviar? Leva só 30 segundos.”"
      ),
    },
  ];
  const dos = [
    tr(
      "Escribí en español primero, con tú informal.",
      "Write Spanish-first, with informal tú.",
      "Escreva em espanhol primeiro, com o tú informal."
    ),
    tr(
      "Mostrá el código de moneda en cada monto ($60.00 USD).",
      "Show the currency code on every amount ($60.00 USD).",
      "Mostre o código da moeda em cada valor ($60.00 USD)."
    ),
    tr(
      "Mostrá la comisión como línea visible, aunque sea cero.",
      "Show the fee as a visible line item, even when zero.",
      "Mostre a taxa como uma linha visível, mesmo quando for zero."
    ),
    tr(
      "Usá un solo botón primario por pantalla.",
      "Use a single primary button per screen.",
      "Use um único botão primário por tela."
    ),
    tr(
      "Usá el mismo término para lo mismo, siempre (comisión, no tarifa).",
      "Use the same term for the same thing, always (fee, not charge).",
      "Use o mesmo termo para a mesma coisa, sempre (taxa, não tarifa)."
    ),
  ];
  const donts = [
    tr(
      "Usar usted o lenguaje corporativo.",
      "Use usted or corporate language.",
      "Usar “o senhor” ou linguagem corporativa."
    ),
    tr(
      "Gradientes o emoji en UI de producto.",
      "Gradients or emoji in product UI.",
      "Gradientes ou emoji na UI do produto."
    ),
    tr(
      "Naranja para advertencias — eso es amarillo.",
      "Orange for warnings — that's yellow.",
      "Laranja para avisos — isso é amarelo."
    ),
    tr(
      "Borde y sombra juntos en la misma card.",
      "Border and shadow together on the same card.",
      "Borda e sombra juntas no mesmo card."
    ),
    tr(
      "Prometer opciones que la pantalla no muestra.",
      "Promise options the screen doesn't show.",
      "Prometer opções que a tela não mostra."
    ),
  ];
  return (
    <section className="sec" id="editorial">
      <div className="eyebrow">
        <span className="n">07</span>
        <span>
          {tr("Guía editorial", "Editorial guidelines", "Guia editorial")}
        </span>
      </div>
      <h2 className="h2">
        {tr("La voz de Felix", "Felix's voice", "A voz da Felix")}
      </h2>
      <p className="lead">
        {tr(
          "Calmada, directa, cálida, transparente. Nunca corporativa. Felix habla de tú, jamás de usted, en español y en inglés.",
          "Calm, direct, warm, transparent. Never corporate. Felix speaks informally — tú, never usted — in Spanish and English.",
          "Calma, direta, calorosa, transparente. Nunca corporativa. A Felix fala de forma informal — você, nunca “o senhor” — em espanhol e em inglês."
        )}
      </p>
      <div className="voice">
        {voices.map((v) => (
          <div className="v" key={v.b}>
            <b>{v.b}</b>
            <p>{v.p}</p>
          </div>
        ))}
      </div>

      <h3 className="h3">
        {tr(
          "Principios de UX writing",
          "UX writing principles",
          "Princípios de UX writing"
        )}
      </h3>
      <p className="copyhint">
        {tr(
          "Ocho ideas que guían cada revisión de contenido, del checkout a la guía de un componente.",
          "Eight ideas that guide every content review, from checkout copy to a component's help text.",
          "Oito ideias que guiam cada revisão de conteúdo, do checkout ao texto de ajuda de um componente."
        )}
      </p>
      <div className="ux-principles">
        {UX_PRINCIPLES.map((p) => (
          <div className="ux-principle" key={p.en}>
            <b>{tr(p.es, p.en, p.pt)}</b>
            <span>{tr(p.descEs, p.descEn, p.descPt)}</span>
          </div>
        ))}
      </div>

      <h3 className="h3">
        {tr(
          "Caso de estudio · Checkout & Payment",
          "Case study · Checkout & Payment",
          "Estudo de caso · Checkout & Payment"
        )}
      </h3>
      <p className="copyhint">
        {tr(
          "De una revisión real de contenido UX (2026): en una pantalla de remesas, la claridad es confianza. Seis problemas de la versión original y cómo se resolvieron.",
          "From a real UX content review (2026): on a remittance screen, clarity is trust. Six problems in the original flow and how they were fixed.",
          "De uma revisão real de conteúdo UX (2026): em uma tela de remessas, clareza é confiança. Seis problemas da versão original e como foram resolvidos."
        )}
      </p>
      <div className="case-study">
        {CASE_STUDY_ROWS.map((row) => (
          <div className="case-row" key={row.titleEn}>
            <div className="case-label">
              {tr(row.titleEs, row.titleEn, row.titlePt)}
            </div>
            <div className="case-before">
              <span className="case-tag before">
                {tr("Antes", "Before", "Antes")}
              </span>
              {tr(row.beforeEs, row.beforeEn, row.beforePt)}
            </div>
            <div className="case-after">
              <span className="case-tag after">
                {tr("Después", "After", "Depois")}
              </span>
              {tr(row.afterEs, row.afterEn, row.afterPt)}
            </div>
          </div>
        ))}
      </div>
      <p className="copyhint">
        {tr(
          "Heurísticas aplicadas: “consistencia y estándares” y “correspondencia entre el sistema y el mundo real” (Nielsen).",
          "Heuristics applied: “consistency & standards” and “match between system and the real world” (Nielsen).",
          "Heurísticas aplicadas: “consistência e padrões” e “correspondência entre o sistema e o mundo real” (Nielsen)."
        )}
      </p>

      <h3 className="h3">
        {tr(
          "Glosario · Product design content",
          "Glossary · Product design content",
          "Glossário · Product design content"
        )}
      </h3>
      <p className="copyhint">
        {tr(
          "Términos clave alineados entre diseño, producto e ingeniería, del Félix Web Localization Glossary. Los términos EN/ES/PT son el contenido del glosario: no cambian con el idioma del sitio.",
          "Key terms aligned across design, product, and engineering, from the Félix Web Localization Glossary. The EN/ES/PT terms are the glossary content itself: they don't change with the site language.",
          "Termos-chave alinhados entre design, produto e engenharia, do Félix Web Localization Glossary. Os termos EN/ES/PT são o conteúdo do glossário: não mudam com o idioma do site."
        )}
      </p>
      <div className="tbl-wrap gloss">
        <table className="tbl">
          <thead>
            <tr>
              <th>{tr("Término (EN)", "Term (EN)", "Termo (EN)")}</th>
              <th>{tr("Español", "Spanish", "Espanhol")}</th>
              <th>{tr("Portugués", "Portuguese", "Português")}</th>
              <th>{tr("Cuándo usarlo", "When to use", "Quando usar")}</th>
              <th>{tr("Cuándo no", "When not to use", "Quando não usar")}</th>
              <th>{tr("Registro", "Register", "Registro")}</th>
            </tr>
          </thead>
          <tbody>
            {GLOSSARY.map((group) => (
              <Fragment key={group.id}>
                <tr className="gloss-group">
                  <td colSpan={6}>{tr(group.label.es, group.label.en, group.label.pt)}</td>
                </tr>
                {group.entries.map((e) => (
                  <Fragment key={e.term}>
                    <tr>
                      <td className="gloss-term">{e.term}</td>
                      <td className="gloss-lang">{e.termEs}</td>
                      <td className="gloss-lang">{e.termPt}</td>
                      <td className="gloss-guide">{tr(e.use.es, e.use.en, e.use.pt)}</td>
                      <td className="gloss-guide">
                        {e.avoid ? tr(e.avoid.es, e.avoid.en, e.avoid.pt) : "—"}
                      </td>
                      <td className="gloss-reg">{tr(e.register.es, e.register.en, e.register.pt)}</td>
                    </tr>
                    {e.note && (
                      <tr className="gloss-note">
                        <td colSpan={6}>
                          <b>{tr("Nota · marketing", "Note · marketing", "Nota · marketing")}</b>{" "}
                          {tr(e.note.es, e.note.en, e.note.pt)}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="h3">
        {tr("Hacé y evitá", "Do and don't", "Faça e evite")}
      </h3>
      <div className="dd" style={{ marginTop: 4 }}>
        <div className="col do">
          <div className="ch">{tr("Hacé", "Do", "Faça")}</div>
          <ul>
            {dos.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="col dont">
          <div className="ch">{tr("Evitá", "Don't", "Evite")}</div>
          <ul>
            {donts.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────── Markdown ───────────────────────────── */
/** Download/copy card for one markdown file the user can feed to an LLM. */
function MdFileCard({
  filename,
  content,
  title,
  desc,
}: {
  filename: string;
  content: string;
  title: string;
  desc: string;
}) {
  const tr = useTr();
  const [copied, setCopied] = useState(false);

  const download = () => {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      // Clipboard API can be permission-gated (embedded browsers); fall back to execCommand.
      const ta = document.createElement("textarea");
      ta.value = content;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="md-file">
      <span className="md-file-name">{filename}</span>
      <b>{title}</b>
      <p>{desc}</p>
      <div className="cluster">
        <Button variant="primary" size="sm" onClick={download}>
          <DownloadSimpleIcon />
          {tr("Descargar", "Download", "Baixar")}
        </Button>
        <Button variant="line" size="sm" onClick={copy}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied
            ? tr("¡Copiado!", "Copied!", "Copiado!")
            : tr("Copiar para tu LLM", "Copy for your LLM", "Copiar para seu LLM")}
        </Button>
      </div>
    </div>
  );
}

export function MarkdownFiles() {
  const tr = useTr();

  const tools: { name: string; es: string; en: string; pt: string }[] = [
    {
      name: "Cursor",
      es: "Arrastrá los archivos al chat o referencialos con @DESIGN.md y @components.md. Cursor los toma como contexto al generar UI.",
      en: "Drag the files into chat or reference them with @DESIGN.md and @components.md. Cursor uses them as context when generating UI.",
      pt: "Arraste os arquivos para o chat ou referencie com @DESIGN.md e @components.md. O Cursor usa como contexto ao gerar UI.",
    },
    {
      name: "Claude Code",
      es: "Pedile que lea DESIGN.md y components.md del repo (o adjuntalos) antes de generar pantallas; respeta tokens, voz y los componentes reales de @felix/ui.",
      en: "Ask it to read DESIGN.md and components.md from the repo (or attach them) before generating screens; it respects tokens, voice, and the real @felix/ui components.",
      pt: "Peça para ele ler o DESIGN.md e o components.md do repositório (ou anexe os arquivos) antes de gerar telas; ele respeita tokens, voz e os componentes reais do @felix/ui.",
    },
    {
      name: "v0",
      es: "Pegá DESIGN.md como Project Instructions; v0 reskinnea shadcn con la estética de Felix. Ver V0_SETUP.md.",
      en: "Paste DESIGN.md as Project Instructions; v0 reskins shadcn with Felix's look. See V0_SETUP.md.",
      pt: "Cole o DESIGN.md como Project Instructions; o v0 reestiliza o shadcn com a estética da Felix. Veja o V0_SETUP.md.",
    },
    {
      name: "ChatGPT · Gemini · otros",
      es: "Usá «Copiar para tu LLM» y pegá los archivos al inicio de la conversación: DESIGN.md como contexto de marca, components.md cuando pidas pantallas con componentes.",
      en: "Use “Copy for your LLM” and paste the files at the start of the conversation: DESIGN.md as brand context, components.md when asking for screens built from components.",
      pt: "Use «Copiar para seu LLM» e cole os arquivos no começo da conversa: DESIGN.md como contexto de marca, components.md quando pedir telas com componentes.",
    },
  ];

  return (
    <section className="sec" id="markdown">
      <div className="eyebrow">
        <span className="n">08</span>
        <span>Markdown</span>
      </div>
      <h2 className="h2">
        {tr(
          "El sistema, en archivos que la IA entiende",
          "The system, in files AI understands",
          "O sistema, em arquivos que a IA entende"
        )}
      </h2>
      <p className="lead">
        {tr(
          "Dos archivos legibles por personas y por IA resumen todo el sistema. Descargalos o copialos y pegáselos a tu herramienta de IA para que genere interfaces fieles a la marca, con los componentes reales de @felix/ui.",
          "Two files readable by people and AI capture the whole system. Download or copy them into your AI tool so it generates on-brand interfaces using the real @felix/ui components.",
          "Dois arquivos legíveis por pessoas e por IA resumem todo o sistema. Baixe ou copie e cole na sua ferramenta de IA para que ela gere interfaces fiéis à marca, com os componentes reais do @felix/ui."
        )}
      </p>
      <div className="md-files">
        <MdFileCard
          filename="DESIGN.md"
          content={designMd}
          title={tr("El contrato de identidad", "The identity contract", "O contrato de identidade")}
          desc={tr(
            "Colores, tipografía, tokens, formas, voz y reglas del sistema en un solo archivo. Usalo como contexto base en cualquier conversación donde la IA genere UI de Felix.",
            "Colors, typography, tokens, shapes, voice, and system rules in a single file. Use it as base context in any conversation where AI generates Felix UI.",
            "Cores, tipografia, tokens, formas, voz e regras do sistema em um único arquivo. Use como contexto base em qualquer conversa em que a IA gere UI da Felix."
          )}
        />
        <MdFileCard
          filename="components.md"
          content={componentsMd}
          title={tr("La referencia de componentes", "The component reference", "A referência de componentes")}
          desc={tr(
            "Los 43 componentes de @felix/ui: para qué sirve cada uno, cómo se usa y qué exporta. Sumalo cuando le pidas a la IA pantallas armadas con componentes existentes en vez de HTML desde cero.",
            "All 43 @felix/ui components: what each is for, how to use it, and what it exports. Add it when asking AI for screens built from existing components instead of raw HTML.",
            "Os 43 componentes do @felix/ui: para que serve cada um, como usar e o que exporta. Adicione quando pedir à IA telas montadas com componentes existentes em vez de HTML do zero."
          )}
        />
      </div>
      <h3 className="h3">{tr("Cómo usarlos", "How to use them", "Como usar")}</h3>
      <div className="voice" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        {tools.map((t) => (
          <div className="v" key={t.name}>
            <b>{t.name}</b>
            <p>{tr(t.es, t.en, t.pt)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export function Footer() {
  const tr = useTr();
  return (
    <footer className="foot">
      {tr(
        "Felix Pago · Sistema de diseño · v1.0.0 alpha — generado desde DESIGN.md y @felix/ui.",
        "Felix Pago · Design System · v1.0.0 alpha — generated from DESIGN.md and @felix/ui.",
        "Felix Pago · Sistema de design · v1.0.0 alpha — gerado a partir do DESIGN.md e do @felix/ui."
      )}
    </footer>
  );
}
