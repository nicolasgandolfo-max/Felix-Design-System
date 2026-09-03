/**
 * Esquema de contenido de un patrón conversacional.
 *
 * Las tres páginas de patrón (y las que se agreguen) comparten el template
 * `PatternPage`; lo único propio de cada una es un objeto `Pattern`. Para sumar
 * un patrón nuevo: agrega su entrada en `content.ts` y listo — la landing, las
 * rutas y los links cruzados de "Explorar patrones" se derivan del registro.
 */

/** Texto localizado. Si falta `pt`, el portugués cae a inglés vía `useTr`. */
export type Localized = { es: string; en: string; pt?: string };

/** Familia con la que filtra el sidebar del directorio. */
export type PatternFamily = "interaction" | "conversational";

/** Tabla de especificaciones: dos columnas, N filas. */
export type SpecTable = {
  heading?: Localized;
  columns: [Localized, Localized];
  rows: Array<[Localized, Localized]>;
};

/** Estado de disponibilidad de un recurso. */
export type ResourceStatus = "ok" | "draft" | "tbd";

export type ResourceRow = {
  type: Localized;
  resource: Localized;
  /** Con `href`, el recurso se renderiza como botón; sin él, como texto. */
  href?: string;
  status: ResourceStatus;
};

/** Pantalla de una galería de casos de uso: imagen más etiqueta debajo. */
export type GalleryItem = { img: string; label: Localized; alt: Localized };

/** Ejemplo de "sí" / "no". La imagen es la pantalla de WhatsApp sola: la barra
 *  de color la pone el template con tokens, no viene quemada en el PNG. */
export type Example = {
  tone: "do" | "dont";
  img: string;
  alt: Localized;
  caption: Localized;
};

export type Pattern = {
  /** Segmento de URL: /patrones/<slug>. */
  slug: string;
  /** Familia con la que agrupa el directorio. */
  family: PatternFamily;
  /** Nombre corto — tarjetas, breadcrumb, links cruzados. */
  name: Localized;
  /** Título del hero cuando es más largo que `name`. Si falta, usa `name`. */
  title?: Localized;
  /** Línea bajo el título (p. ej. "List message" bajo "Menu"). */
  subtitle?: Localized;
  /** Bajada del hero. */
  lede: Localized;
  /** Descripción en la tarjeta de la landing. */
  cardBody: Localized;
  /** Arte del patrón: se usa en la tarjeta y en el hero de la página. */
  hero: string;
  heroAlt: Localized;
  /** Láminas del hero del detalle (burbujas exportadas de Figma), apiladas en
   *  columna. Si falta, el hero usa `hero`. */
  heroDetail?: string[];

  /** Pestañas con su contenido, en orden. */
  tabs: PatternTab[];
};

// ─── Contenido por bloques ────────────────────────────────────────────────────

/**
 * Cada pestaña de un patrón es una lista de bloques. Así un patrón puede tener
 * tablas de N columnas, callouts o prosa donde lo necesite (Use of emojis no
 * tiene specs ni do/don't) sin tocar el template.
 */
export type Block =
  | { type: "heading"; text: Localized }
  /** Párrafo 20/28. */
  | { type: "prose"; text: Localized }
  | { type: "bullets"; items: Localized[] }
  /** Lista numerada, para pasos con orden de preferencia. */
  | { type: "ordered"; items: Localized[] }
  | {
      type: "table";
      heading?: Localized;
      columns: Localized[];
      rows: TableCell[][];
    }
  /** Caja light-sky con título opcional en negrita seguido del cuerpo. */
  | { type: "callout"; title?: Localized; body: Localized }
  /** Panel "por qué funciona" en Secondary Sky. */
  | { type: "metric"; title: Localized; body: Localized[]; note?: Localized }
  | { type: "resources"; rows: ResourceRow[] }
  | { type: "examples"; items: Example[] }
  /** Fila de pantallas etiquetadas (casos de uso), sin veredicto. */
  | { type: "gallery"; items: GalleryItem[] }
  /** Nota con borde izquierdo (aclaraciones de specs). */
  | { type: "note"; text: Localized }
  | { type: "source"; text: Localized; href?: string; linkText?: string }
  /** Dos columnas lado a lado (Usage | Metric, Usage | Tips). */
  | { type: "columns"; left: Block[]; right: Block[] };

/**
 * Celda de tabla: texto suelto, o una lista de bloques cuando la regla no
 * entra en una línea (párrafos más una lista numerada, por ejemplo).
 */
export type TableCell = Localized | Block[];

export type PatternTab = { id: string; label: Localized; blocks: Block[] };

/**
 * Forma "estándar" de las tres pestañas (Overview / Specs / Guidelines) con la
 * que se escribieron los primeros patrones. `standardTabs()` la convierte en
 * bloques; los patrones con otra estructura escriben `tabs` directamente.
 */
export type StandardSections = {
  overview: {
    usage: Localized[];
    /** Los backticks en `body` se renderizan como `<code>`. */
    metric: { title: Localized; body: Localized[]; note?: Localized };
    resources: ResourceRow[];
  };

  specs: {
    intro: Localized;
    tables: SpecTable[];
    notes?: Localized[];
    source: Localized;
    sourceHref?: string;
    sourceLinkText?: string;
  };

  guidelines: {
    usage: Localized;
    tips: Localized;
    examples: Example[];
  };
};
