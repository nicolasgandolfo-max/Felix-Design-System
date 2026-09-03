/**
 * Esquema de contenido de un patrón conversacional.
 *
 * Las tres páginas de patrón (y las que se agreguen) comparten el template
 * `PatternPage`; lo único propio de cada una es un objeto `Pattern`. Para sumar
 * un patrón nuevo: agrega su entrada en `content.ts` y listo — la landing, las
 * rutas y los links cruzados de "Explorar patrones" se derivan del registro.
 */

/** Texto localizado. El portugués cae a inglés vía `useTr`. */
export type Localized = { es: string; en: string };

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

/**
 * Patrón que ya está en el directorio pero todavía no tiene contenido escrito.
 * Aparece en la grilla sin enlace hasta que se convierta en un `Pattern`
 * completo; así el directorio refleja el mapa real de patrones sin publicar
 * descripciones de relleno.
 */
export type PatternStub = {
  slug: string;
  name: Localized;
  family: PatternFamily;
  comingSoon: true;
};

/** Lo que renderiza una tarjeta del directorio: patrón completo o pendiente. */
export type DirectoryEntry = Pattern | PatternStub;

export const isPublished = (e: DirectoryEntry): e is Pattern =>
  !("comingSoon" in e);
