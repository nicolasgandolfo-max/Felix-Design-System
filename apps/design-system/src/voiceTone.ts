/**
 * Contenido de la guía Voice & Tone, transcrito desde el Notion que es la
 * fuente de verdad ("🗣️ Voice & Tone Guidelines", v0.4, Content Guidelines):
 * https://app.notion.com/p/3b409747501e8146a5a5f708ef75b908
 *
 * El bloque verde de novedades de versión ("What's new in v0.4") queda fuera
 * a propósito: es un changelog interno del Notion, no parte de la guía.
 *
 * El texto va literal, en el idioma en que está escrito en el origen (inglés,
 * con los ejemplos en español neutro). No se traduce con `tr()` porque
 * traducirlo sería inventar contenido que la fuente no tiene; el idioma del
 * sitio sólo cambia el chrome de la página.
 *
 * Formato inline soportado en cualquier `string`: `**negrita**`, `` `código` `` y
 * `[[section-id]]` / `[[section-id#ancla|texto]]` para enlazar otra sección.
 */

export interface VtTable {
  /** Encabezados de columna. Si falta, la primera columna hace de encabezado. */
  cols?: string[];
  rows: string[][];
  /** La primera columna es la etiqueta de la fila, no un dato más. */
  headerColumn?: boolean;
}

export type VtBlock =
  | { k: "p"; t: string }
  | { k: "h"; id: string; t: string }
  | { k: "table"; table: VtTable }
  | { k: "code"; t: string; label?: string }
  | {
      k: "callout";
      icon: string;
      tone: "info" | "warn" | "ok" | "alert";
      t: string;
    }
  | { k: "ul"; items: string[] }
  | { k: "link"; href: string; t: string };

export interface VtSection {
  id: string;
  title: string;
  /** Una línea para la tarjeta del índice: de qué se ocupa la sección. */
  blurb: string;
  blocks: VtBlock[];
}

/**
 * Etiqueta de la sección en el menú lateral: el título sin la aclaración que
 * viene después del guión largo. El menú es un enlace a la sección, no un
 * resumen — el título completo se lee ya dentro de la página.
 */
export const shortTitle = (title: string) => title.split(" — ")[0];

/**
 * Agrupación temática de las secciones para el menú lateral. El Notion es una
 * lista plana numerada; 17 ítems seguidos no se navegan. La numeración del
 * original no se muestra en ningún lado: las referencias cruzadas que en el
 * Notion decían "§4" son aquí enlaces con el nombre de la sección.
 */
export const VT_GROUPS: {
  id: string;
  /** Color del grupo; `--{accent}-100/-700` en el tema. */
  accent: string;
  es: string;
  en: string;
  pt: string;
  ids: string[];
}[] = [
  {
    id: "voice",
    accent: "turquoise",
    es: "La voz",
    en: "The voice",
    pt: "A voz",
    ids: ["bot-personality"],
  },
  {
    id: "language",
    accent: "blueberry",
    es: "Idioma",
    en: "Language",
    pt: "Idioma",
    ids: [
      "language-mechanics",
      "number-formatting",
      "dates-times",
      "inclusive-language",
    ],
  },
  {
    id: "messages",
    accent: "green",
    es: "Mensajes",
    en: "Messages",
    pt: "Mensagens",
    ids: [
      "message-structure",
      "error-messages",
      "confirmation-messages",
      "escalation",
    ],
  },
  {
    id: "interface",
    accent: "amber",
    es: "Interfaz",
    en: "Interface",
    pt: "Interface",
    ids: ["interface-labels", "form-card-copy", "buttons-ctas"],
  },
  {
    id: "standards",
    accent: "earth",
    es: "Estándares",
    en: "Standards",
    pt: "Padrões",
    ids: ["terms-glossary", "multi-corridor", "accessibility"],
  },
  {
    id: "governance",
    accent: "slate",
    es: "Gobernanza",
    en: "Governance",
    pt: "Governança",
    ids: ["supplementary-authority", "pending-definitions"],
  },
];

/** Callout de cabecera (el azul del Notion). */
export const VT_INTRO = {
  icon: "🗣️",
  t: "**Félix Voice & Tone Guidelines — v0.4.** The living reference for the content and UX writing decisions made for Félix, shared across product, design, and marketing. This page is the **source of truth**. The original Google Doc is archived at the bottom and no longer maintained. Sections marked **[ TO BE DEFINED ]** are open alignment items, not omissions.",
};

const RULE_COLS = ["Rule", "Standard", "Example"];

export const VT_SECTIONS: VtSection[] = [
  {
    id: "number-formatting",
    title: "Number & amount formatting",
    blurb: "Separators, decimals, and how two currencies sit in the same message.",
    blocks: [
      {
        k: "p",
        t: "The formatting of monetary amounts is a trust signal in a remittance product. Inconsistent notation — even when the correct amount is processed — creates doubt in the user. These rules apply to all amounts displayed in the interface, whether in bot messages, menus, or confirmation screens. They govern amounts the user sees: thresholds and figures cited in this documentation, including the row labels below, are not display copy and are not bound by them.",
      },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Under $1,000",
              "No thousands separator. The number is unambiguous in any locale.",
              "$100.00 · $500.00 · $999.00",
            ],
            [
              "$1,000 and above",
              "Separator follows the currency's own convention, not a single universal standard.",
              "See currency table below",
            ],
            [
              "Decimals",
              "Always two decimal places, always visible. A misread decimal is a real financial risk.",
              "$1,500.50 · R$1.500,50",
            ],
            [
              "Mixed currencies",
              "When two currencies appear in the same message, each uses its own notation. The currency symbol is the visual anchor.",
              "See example below",
            ],
          ],
        },
      },
      {
        k: "h",
        id: "currency-conventions",
        t: "Currency conventions at a glance",
      },
      {
        k: "table",
        table: {
          cols: ["Currency", "Thousands", "Decimal", "Formatted example"],
          rows: [
            [
              "USD — US Dollar · MXN — Mexican Peso",
              "`,` comma",
              "`.` period",
              "$1,500.50",
            ],
            ["BRL — Brazilian Real", "`.` period", "`,` comma", "R$1.500,50"],
            ["COP · ARS · CRC", "`.` period", "`,` comma", "$1.500,50"],
          ],
        },
      },
      {
        k: "code",
        label: "Mixed-currency message — correct format",
        t: "✓  You are sending $1,500.00 USD\n✓  Your recipient will receive R$26.250,75 BRL",
      },
    ],
  },
  {
    id: "interface-labels",
    title: "Interface labels — menus & navigation",
    blurb: "Twenty characters, sentence case, and when a label is a verb or a place.",
    blocks: [
      {
        k: "link",
        href: "https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/marketing-templates/custom-marketing-templates",
        t: "Review full specifications for WhatsApp Business →",
      },
      {
        k: "table",
        table: {
          headerColumn: true,
          rows: [
            [
              "Character limit",
              "20 characters maximum per label, including spaces.",
            ],
            [
              "Case",
              "Sentence case always. Never ALL CAPS or Title Case For Every Word.",
            ],
            [
              "Register",
              "Infinitive when the item performs an action; noun when it opens a place the user browses. The same criterion applies to every item in the menu. What is prohibited is mixing without a rule, not mixing. Examples: Modificar, Rastrear (actions) · Historial, Configuración (destinations).",
            ],
            [
              "Section labels",
              "Every group of items must have a section label that provides context. Items must not carry the cognitive load alone.",
            ],
            [
              "Abbreviations",
              "Avoid. Write the full word unless the abbreviation is universally understood by the target audience.",
            ],
          ],
        },
      },
    ],
  },
  {
    id: "form-card-copy",
    title: "Form card copy",
    blurb: "Two lines per card, functional over promotional, no internal jargon.",
    blocks: [
      {
        k: "p",
        t: "Each form card in the customer portal carries a short description that helps the user select the right option. The rules below apply to all card descriptions.",
      },
      {
        k: "table",
        table: {
          headerColumn: true,
          rows: [
            [
              "Length",
              "Maximum 2 lines of body text per card. One sentence per line is the ideal.",
            ],
            [
              "Tone",
              "Functional, not promotional. Tell the user what the form does, not why it is great.",
            ],
            ["Case", "Sentence case. No ALL CAPS, no title case."],
            [
              "Jargon",
              "Avoid internal terminology. Write for a customer who does not know the company's internal processes.",
            ],
            [
              "CTA",
              "Cards do not carry a CTA button label in the description. The card title is the action.",
            ],
          ],
        },
      },
    ],
  },
  {
    id: "language-mechanics",
    title: "Language mechanics — grammar, register & neutral Spanish",
    blurb: "Tú over usted, no gendered slashes, and the calques to keep out of neutral Spanish.",
    blocks: [
      {
        k: "p",
        t: "These rules come out of a full-flow review of core send and checkout conversational copy in neutral Spanish. They apply to **all Spanish copy across corridors** — translation pipelines should inherit them at the source rather than re-deriving them per string.",
      },
      { k: "h", id: "register-word-choice", t: "Register & word choice" },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Tú, not usted",
              "Keep the informal register consistent across an entire flow. Never mix in “usted” forms partway through.",
              "“tus comentarios”, not “sus comentarios”",
            ],
            [
              "Anglicisms & loanwords",
              "Naturalize English interjections into the neutral-Spanish equivalent already used elsewhere in the product, instead of leaving them in English.",
              "“Oops” → “Ups”",
            ],
            [
              "Gendered slash forms",
              "Avoid “/a” constructions. Rephrase the sentence to sidestep gendering rather than mark both.",
              "“Bienvenido/a” → “Te damos la bienvenida”",
            ],
            [
              "Precision over vagueness",
              "Prefer the specific, verifiable phrase over a vague shorthand, even when the vague version is technically understandable.",
              "“ya está en otra cuenta” → “ya está vinculada a otra cuenta”",
            ],
          ],
        },
      },
      { k: "h", id: "grammar-punctuation", t: "Grammar & punctuation" },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Gerund calques",
              "Don't calque English “try + gerund” constructions. Use the infinitive.",
              "“Intenta enviando” → “Intenta enviar”",
            ],
            [
              "Prepositions",
              "Keep prepositions complete, even where casual speech might drop them.",
              "“¿Quieres enviar tu moneda local otra vez?” → “¿Quieres enviar **en** tu moneda local otra vez?”",
            ],
            [
              "Contractions",
              "Required contractions are never optional.",
              "“a partir de el” → “a partir del”",
            ],
            [
              "Numeric ranges",
              "Use “entre X y Y.” A hyphen is not a substitute.",
              "“entre 10-20” → “entre 10 y 20”",
            ],
            [
              "Opening punctuation",
              "¡ and ¿ always open their exclamation or question — no exceptions for short phrases.",
              "“Muchas gracias” → “¡Muchas gracias!”",
            ],
          ],
        },
      },
      {
        k: "h",
        id: "empty-states",
        t: "Empty states & cross-corridor consistency",
      },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Empty & negative states",
              "Never open with a negation. Lead with a temporal marker instead (see also: softening empty states).",
              "“No tienes promos activas” → “Aún no tienes promos activas”",
            ],
            [
              "Cross-corridor consistency",
              "When the same message type exists for multiple countries, keep sentence construction and prepositions aligned. Only the country-specific detail should vary.",
              "GT and MX welcome messages unified on “por WhatsApp” / “desde Estados Unidos”",
            ],
          ],
        },
      },
    ],
  },
  {
    id: "multi-corridor",
    title: "Multi-corridor content accuracy",
    blurb: "A field that is right for one country's banking system can be plain wrong for another.",
    blocks: [
      {
        k: "p",
        t: "Payment-method and banking details are corridor-specific. A field or term that's correct for one country's banking system can be **factually wrong** — not just awkwardly worded — for another. This is a content-accuracy risk, distinct from tone.",
      },
      {
        k: "table",
        table: {
          headerColumn: true,
          rows: [
            [
              "Standard",
              "Corridor- and payment-method-specific fields (bank ID formats, wallet names) are never hardcoded across countries or copied between cells. Each is verified against the specific corridor and payment method it serves.",
            ],
            [
              "Why it matters here",
              "Flat, per-cell strings make this error easy to introduce and hard to catch. It's a concrete case for parametrizing corridor-specific fields as tokens rather than independent hardcoded strings — see the content tokenization framework.",
            ],
            [
              "Open item",
              "🟡 Confirm whether the same CLABE-for-non-Mexican-wallet pattern exists in other flows beyond the one already caught.",
            ],
          ],
        },
      },
    ],
  },
  {
    id: "terms-glossary",
    title: "Terms glossary",
    blurb: "Comisión, envío, formulario, destinatario — the terms ratified across corridors.",
    blocks: [
      {
        k: "link",
        href: "https://docs.google.com/spreadsheets/d/1eQcztEYhnMHBxG3YYv0Zphjt5ye3Ume5mUUzIcZ_VHA/edit?gid=342298366#gid=342298366",
        t: "Review the full glossary →",
      },
      {
        k: "p",
        t: "The full glossary — including Crédito, Préstamo, Cuenta, pesos mexicanos (MXN), and Referidos — lives in the sheet above. The terms below are the **newest additions**, ratified through the most recent conversational-flow review.",
      },
      {
        k: "table",
        table: {
          cols: ["EN term", "ES term (neutral)", "Use", "Avoid", "Register"],
          rows: [
            [
              "Fee",
              "**Comisión**",
              "Always, any fee display",
              "“Tarifa” as a row label — banking register. “Tarifa de Félix” in Fintech Office should be standardized to “Comisión de Félix.”",
              "Neutral",
            ],
            [
              "Send / Transfer (user-facing)",
              "**Envío**",
              "Conversational, user-facing contexts",
              "“Transferencia” — reserve for formal/technical bank-policy copy",
              "Informal / Neutral",
            ],
            [
              "Form",
              "**Formulario**",
              "Always",
              "“Formato” — Mexico-specific regionalism, ambiguous in other corridors",
              "Neutral",
            ],
            [
              "Recipient",
              "**Destinatario**",
              "CTAs and copy about who receives the money",
              "“Personas” (reads clinical/detached in Spanish) · generic “Contactos”",
              "Neutral, warm",
            ],
          ],
        },
      },
    ],
  },
  {
    id: "error-messages",
    title: "Error messages",
    blurb: "Never blame the user. State what happened and give exactly one next step.",
    blocks: [
      {
        k: "p",
        t: "First working definition — applies to validation errors, failed transactions, and system outages. Still subject to design and CX sign-off.",
      },
      {
        k: "table",
        table: {
          headerColumn: true,
          rows: [
            [
              "Never blame the user",
              "The error is never framed as the user's fault in the copy, even when it technically is.",
            ],
            [
              "Plain, human language",
              "Explain what happened without technical or internal terms.",
            ],
            ["One next step", "Give exactly one clear action to take next."],
            [
              "Match the moment",
              "Calibrate tone to the anxiety level of the situation — a failed transaction reads differently than a UI glitch.",
            ],
          ],
        },
      },
      {
        k: "p",
        t: "**Structure.** State the fact in a single sentence. Let the buttons carry the action — don't restate conditional logic (“if the problem continues…”) in the body when two buttons already resolve it.",
      },
      {
        k: "code",
        label: "Example",
        t: "¡Ups! Algo salió mal.\nNo pudimos cargar esta página. Inténtalo de nuevo o ábrela en otro navegador.\n\n[ Inténtalo de nuevo ]      [ Abrir en otro navegador ]",
      },
    ],
  },
  {
    id: "confirmation-messages",
    title: "Confirmation & success messages",
    blurb: "Say what happens next and when. Never leave a transaction on a bare status word.",
    blocks: [
      {
        k: "p",
        t: "First working definition — required elements for multi-corridor transaction summaries are still pending broader alignment (see **Still open** below).",
      },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "State a concrete expectation",
              "Never leave a transaction on a bare status word. Say what happens next and when.",
              "“Transferencia en proceso” → “Tu familia lo recibirá en X minutos. Te avisamos cuando llegue.”",
            ],
            [
              "Use ratified glossary terms",
              "Fee and total labels follow the Terms Glossary, not ad hoc phrasing.",
              "“Tarifa Total” → “Comisión Total”",
            ],
            [
              "Amount formatting applies",
              "Transaction summaries follow the [[number-formatting|number and amount formatting]] rules exactly — no exceptions for confirmation screens.",
              "See [[number-formatting]]",
            ],
          ],
        },
      },
      {
        k: "callout",
        icon: "🟡",
        tone: "warn",
        t: "**Still open.** Required elements for multi-corridor summary screens, and structure for partial-failure states (e.g. funds held but not delivered). Tracked for alignment alongside voice guide sign-off.",
      },
    ],
  },
  {
    id: "pending-definitions",
    title: "Pending definitions",
    blurb: "What is still open, and who has to sign it off before the guide is complete.",
    blocks: [
      {
        k: "p",
        t: "Pending alignment with **marketing, product, and CX**. Each item must be completed before these guidelines can be considered a complete working reference.",
      },
      {
        k: "table",
        table: {
          cols: ["Definition", "What it must cover"],
          rows: [
            [
              "🔴 **Language switching protocol**",
              "Rules for when and how the bot switches between English, Spanish, and Portuguese. Includes detection logic and fallback language.",
            ],
          ],
        },
      },
      {
        k: "p",
        t: "**Closed since v0.3.** Bot personality attributes and escalation language are now [[bot-personality]] and [[escalation]]. Emoji usage is no longer tracked here — it lives in the Conversational Patterns library. The two emoji rules in [[accessibility]] are accessibility requirements, not style preferences, and remain in force.",
      },
    ],
  },
  {
    id: "supplementary-authority",
    title: "Supplementary authority",
    blurb: "When a case is not covered here, the order to resolve it in — and where to stop.",
    blocks: [
      {
        k: "p",
        t: "When a case is not covered by these guidelines, resolve it in this order. Do not improvise, and do not re-litigate a level that a higher one already settles.",
      },
      {
        k: "table",
        table: {
          cols: ["Order", "Source", "Governs"],
          rows: [
            [
              "1",
              "**These guidelines**",
              "Anything stated here wins, including where it departs from general Spanish usage. Departures are deliberate.",
            ],
            [
              "2",
              "**Félix Official Glossary**",
              "Term choice, register per term, and EN · ES · PT equivalents.",
            ],
            [
              "3",
              "**WhatsApp Business platform specs**",
              "Hard character limits and component behaviour. A platform limit overrides a stylistic preference.",
            ],
            ["4", "**RAE**", "Spanish grammar, spelling and accentuation."],
            [
              "5",
              "**Fundéu**",
              "Usage questions RAE does not settle, especially financial and technology terms in Latin American Spanish.",
            ],
          ],
        },
      },
      {
        k: "p",
        t: "Anything resolved twice at level 4 or 5 should be promoted into these guidelines or the glossary. The point of a tiebreaker is to stop the same argument recurring.",
      },
    ],
  },
  {
    id: "dates-times",
    title: "Dates, times & durations",
    blurb: "Months in words, a 12-hour clock with its time zone, and durations that are not clock times.",
    blocks: [
      {
        k: "p",
        t: "Our central promise is temporal — “Tu familia lo recibirá en X minutos.” These formats are therefore part of the product claim, not decoration.",
      },
      {
        k: "p",
        t: "The reason a numeric date is unacceptable here is specific to a remittance corridor: the sender reads US order (month/day) and the recipient reads Latin American order (day/month). The same string means two different days on the two ends of one transfer.",
      },
      { k: "h", id: "dates", t: "Dates" },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Month always in words",
              "Never express a month as a digit. A numeric date is genuinely ambiguous across a corridor, not merely awkward.",
              "“el 3 de septiembre” — never “3/9” or “9/3”",
            ],
            [
              "Weekdays and months lowercase",
              "Spanish does not capitalise them.",
              "“lunes, 5 de agosto” — not “Lunes 5 de Agosto”",
            ],
            [
              "No leading zero",
              "A single-digit day is written with one digit.",
              "“1 de julio” — not “01 de julio”",
            ],
            [
              "Year only when ambiguous",
              "Include the year when the date falls outside the current cycle, or when a legal or fee condition depends on it.",
              "“válido hasta el 3 de enero de 2027”",
            ],
            [
              "No abbreviated ordinals",
              "Never 1ro, 2do, 3er.",
              "“El día 1 de cada mes” — not “El 1ro de cada mes”",
            ],
            [
              "Ranges do not repeat the month",
              "When a range sits inside one month, name the month once.",
              "“Del 4 al 8 de mayo” — not “Del 4 de mayo al 8 de mayo”",
            ],
          ],
        },
      },
      { k: "h", id: "times", t: "Times" },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "12-hour clock with a.m./p.m.",
              "Félix uses the 12-hour format across all corridors. Lowercase, with periods, and a space between the number and the marker. This matches how our senders in the United States read time and stays legible in every receiving corridor.",
              "“5:00 p.m.” — not “17:00” and not “17 hs”",
            ],
            [
              "Always name the time zone",
              "A time without a zone is unusable in a cross-border transaction. The sender and the recipient are rarely in the same one.",
              "“a las 6:00 p.m. (hora de Ciudad de México)”",
            ],
            [
              "Day before hour",
              "State the day first, then the hour.",
              "“el martes a las 5:00 p.m.”",
            ],
            [
              "Omit “:00” only in running prose",
              "In a data row or a summary, keep the minutes. In a sentence, the shorter form reads better.",
              "Prose: “a las 5 p.m.” · RESUMEN row: “5:00 p.m.”",
            ],
          ],
        },
      },
      { k: "h", id: "durations", t: "Durations" },
      {
        k: "p",
        t: "A duration is not a clock time. Confusing the two is the most consequential version of this error in a remittance product, because the delivery estimate *is* the promise.",
      },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Never use clock format for a duration",
              "Clock notation names a moment, not an elapsed span.",
              "“1 hora y 25 minutos” — not “1:25”",
            ],
            [
              "Full words by default",
              "Spell out “minutos”, “horas”, “días”. Abbreviate only where a hard character limit forces it.",
              "“en 20 minutos”",
            ],
            [
              "Never mix full and abbreviated",
              "Within one expression, pick one.",
              "“3 horas y 25 minutos” — not “3 horas y 25 min”",
            ],
            [
              "No hyphen in ranges",
              "A range uses “entre X y Y”. The hyphen is never a substitute, in durations or anywhere else. Confirms [[language-mechanics#grammar-punctuation|Grammar & punctuation]].",
              "“entre 10 y 20 minutos” — not “entre 10-20 minutos”",
            ],
            [
              "Qualify business days",
              "Always “días hábiles”, never bare “días” and never “días laborables”. The qualifier is what manages expectations about weekends and holidays.",
              "“entre 1 y 3 días hábiles”",
            ],
          ],
        },
      },
    ],
  },
  {
    id: "buttons-ctas",
    title: "Buttons & CTAs",
    blurb: "The button reuses the words of the message above it. Name the outcome, not the acknowledgement.",
    blocks: [
      {
        k: "p",
        t: "The [[interface-labels|interface-label rules]] govern the *form* of a label — 20 characters, sentence case, infinitive or noun. This section governs what the button says and where its words come from. In WhatsApp the button is visually detached from the bubble that justifies it, which makes the first rule below the most consequential one in this section.",
      },
      { k: "h", id: "what-the-button-says", t: "What the button says" },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Never introduce a new term",
              "The button reuses the exact words of the message that precedes it. Because the button is detached from its bubble, a synonym reads as a different action.",
              "Message says “Depósito en cuenta” → button reads “Depósito en cuenta”, never “Transferir al banco”",
            ],
            [
              "Name the outcome, not the acknowledgement",
              "The label says what happens on tap. A generic acknowledgement wastes the only affordance in the message.",
              "“Ver comprobante” — not “Entendido”",
            ],
            [
              "Infinitive, not imperative",
              "The imperative reads as an order in a flow the user is already navigating.",
              "“Modificar envío” — not “Modifica tu envío”",
            ],
            [
              "Drop articles and pronouns",
              "Unless removing them changes the meaning.",
              "“Agregar destinatario” — not “Agregar un destinatario”",
            ],
            [
              "No terminal punctuation",
              "No period, no ¡!, no ¿? in a label.",
              "“Ingresar datos” — not “¡Ingresar datos!”",
            ],
            [
              "The message must dialogue with the button",
              "If the body asks for one thing and the button offers another, the user stalls.",
              "Body: “Completa los datos de tu destinatario” → “Completar datos”, not “Ir a Mi cuenta”",
            ],
          ],
        },
      },
      { k: "h", id: "omissions", t: "Omissions" },
      {
        k: "p",
        t: "Shortening a label reduces cognitive load, but only when the surrounding message carries the missing part.",
      },
      {
        k: "table",
        table: {
          cols: ["Case", "Standard", "Example"],
          rows: [
            [
              "Omit the verb",
              "Only when the action is unmistakable from the pair of options.",
              "“[ Activar Félix Crédito ]  [ En otro momento ]” — not “[ Activar en otro momento ]”",
            ],
            [
              "Omit the complement",
              "Only when the preceding message already names the object.",
              "“Guarda los cambios para actualizar tu perfil → [ Guardar ]”",
            ],
            [
              "Keep the complement",
              "When two buttons appear together and the verb alone cannot distinguish them.",
              "“[ Usar cuenta guardada ]  [ Agregar otra cuenta ]” — not “[ Usar ]  [ Agregar ]”",
            ],
          ],
        },
      },
      { k: "h", id: "person-timing", t: "Person and timing" },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "First person only for real-world actions or persuasion",
              "Use it when the button reports something the user did outside the interface, or when it carries intent.",
              "“Ya pagué en la tienda” · “Quiero enviar de nuevo”",
            ],
            [
              "No “ahora”",
              "It adds urgency without information. The exception is when it genuinely distinguishes two timings.",
              "“Enviar” — not “Enviar ahora” · but “[ Verificar ahora ]  [ Más tarde ]” is correct",
            ],
          ],
        },
      },
    ],
  },
  {
    id: "message-structure",
    title: "Message structure, length & emphasis",
    blurb: "One idea per bubble, four sentences at most, and what bold is allowed to mark.",
    blocks: [
      {
        k: "p",
        t: "The bubble is the dominant unit of content in this product, and until now it was the only one without a length rule.",
      },
      { k: "h", id: "message-length", t: "Message length" },
      {
        k: "p",
        t: "Reading on a phone in a chat thread is more tiring than reading a page. The unit to control is the bubble, not the flow.",
      },
      {
        k: "table",
        table: {
          headerColumn: true,
          rows: [
            [
              "One idea per bubble",
              "If a bubble contains two things the user must act on, it is two bubbles — or one bubble and a button.",
            ],
            [
              "Four sentences maximum",
              "Beyond four, split. A bubble that needs scrolling has already failed.",
            ],
            [
              "Cap consecutive bubbles",
              "Never send more than three bubbles without an action or a question. An uninterrupted run of bot messages reads as a wall, not a conversation.",
            ],
            [
              "Front-load the fact",
              "The first sentence carries the outcome. Context, conditions and reassurance come after.",
            ],
          ],
        },
      },
      { k: "h", id: "bold", t: "Bold" },
      {
        k: "p",
        t: "WhatsApp offers bold as effectively the only emphasis available, which makes over-use the default failure mode. Bold marks the one thing the user would need if they read nothing else.",
      },
      {
        k: "p",
        t: "Bold is permitted in **both** contexts: as the treatment for data labels in the RESUMEN block, and for prose emphasis inside a message. What is not permitted is doing both in the same bubble.",
      },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Bold complete ideas",
              "The bolded fragment must make sense on its own, without the rest of the sentence.",
              "“Tu envío llega **entre 10 y 20 minutos**.”",
            ],
            [
              "Never bold single words",
              "A lone bolded word gives emphasis without meaning.",
              "not “Tu **envío** llega en minutos.”",
            ],
            [
              "Never bold a whole long sentence",
              "If everything is emphasised, nothing is.",
              "not “**Tu envío llega entre 10 y 20 minutos y te avisamos cuando esté listo.**”",
            ],
            [
              "Leave punctuation outside",
              "A period, comma or colon after a bolded phrase is not bolded.",
              "“**Comisión Total**: $3.99”",
            ],
            [
              "Data labels in RESUMEN",
              "Bold the label, never the value. The value is what the user is scanning for; bolding both removes the contrast that makes the row readable.",
              "“**Tipo de cambio**: 17.85 MXN por dólar”",
            ],
            [
              "One bolded idea per bubble",
              "Two competing emphases in one message cancel out. In a RESUMEN block, the labels are the emphasis — do not also bold a phrase in the surrounding text.",
              "—",
            ],
          ],
        },
      },
      { k: "h", id: "lists", t: "Lists" },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Always introduce the list",
              "A list without a lead-in makes the items carry the context alone.",
              "“Para completar tu envío necesitas:”",
            ],
            ["Never a one-item list", "A single item is a sentence.", "—"],
            [
              "Number only for sequence",
              "Numbers mean chronological order. If order is irrelevant, use bullets.",
              "Steps to pay in a store → numbered · accepted payment methods → bullets",
            ],
            [
              "Periods: always or never",
              "Full sentences take periods throughout. Fragments take none. Do not mix within one list.",
              "—",
            ],
            [
              "Never write “Paso a paso:”",
              "Name the goal instead.",
              "“Para retirar tu dinero, sigue estos pasos:”",
            ],
            [
              "One action per step",
              "A step containing two actions is two steps.",
              "—",
            ],
          ],
        },
      },
      { k: "h", id: "brackets-quotes", t: "Brackets and quotation marks" },
      {
        k: "p",
        t: "These two are not interchangeable. Brackets are notation; quotation marks are copy the user reads.",
      },
      {
        k: "table",
        table: {
          cols: ["Mark", "Use for", "Example"],
          rows: [
            [
              "**Brackets** `[ ]`",
              "Notation only, never user-facing copy: representing a button in documentation and specs, and marking a variable or token in a string.",
              "Spec: “[ Inténtalo de nuevo ]  [ Abrir en otro navegador ]” · String: “Hola, [nombre]”",
            ],
            [
              "**Quotation marks** `“ ”`",
              "Mentioning a button, a section or an option **inside a sentence the user reads**.",
              "Selecciona “Depósito en cuenta” para continuar.",
            ],
          ],
        },
      },
      {
        k: "p",
        t: "Quotation marks are also required when naming a section or an option in prose. They are **not** used for the name of a product, or for a section name that already sits inside a button or link label.",
      },
      {
        k: "table",
        table: {
          cols: ["Use quotes for", "Do not use quotes for"],
          rows: [
            [
              "Button text mentioned in a sentence — Selecciona “Efectivo”",
              "The name of a product — Félix Crédito, never “Félix Crédito”",
            ],
            [
              "A section — Ve a la sección “Historial”",
              "A section name already inside a button label — [ Ir a Historial ]",
            ],
            ["An option inside a flow — Elige “Billetera digital”", "—"],
          ],
        },
      },
      {
        k: "p",
        t: "Use straight double quotes. Never angle quotes (« »). Never italics or bold as a substitute. A closing period falls outside the quotes.",
      },
      { k: "h", id: "punctuation", t: "Punctuation" },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Exclamation ceiling",
              "One pair per message, maximum. Never two exclamations in the same bubble, and never combine ¡! with ¿? in one message.",
              "“¿Aún tienes dudas? Escríbenos.” — not “¿Aún tienes dudas? ¡Escríbenos!”",
            ],
            [
              "No exclamation on an imperative",
              "An order with an exclamation mark reads as shouting.",
              "“Agrega tu destinatario” — not “¡Agrega tu destinatario!”",
            ],
            [
              "Parentheses for low-priority detail only",
              "If the information matters, it is not a parenthetical. Recast the sentence.",
              "—",
            ],
            [
              "Acronym expansion order",
              "Spell out first, acronym in parentheses second — never the reverse.",
              "“número de cuenta bancaria de 18 dígitos (CLABE)” — not “CLABE (número de cuenta bancaria)”",
            ],
            ["No semicolons", "Use a comma or a period.", "—"],
            [
              "Colon before a list only",
              "Avoid colons that break the flow of a sentence. Lowercase after a colon that introduces an explanation, uppercase when it opens a list.",
              "—",
            ],
            [
              "Final period",
              "Message bodies and field validations take a final period. Buttons, labels and titles do not.",
              "—",
            ],
          ],
        },
      },
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    blurb: "Emoji after the punctuation, never data as an image alone, plain language over precision.",
    blocks: [
      {
        k: "p",
        t: "We write so that every person can complete a transfer, including people using a screen reader, people with low vision, and people reading in a language they learned as adults.",
      },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Emojis, never emoticons",
              "An emoji carries embedded alt text a screen reader announces. A punctuation-based face is read character by character as noise.",
              "“Listo 😀” — not “Listo =)”",
            ],
            [
              "Emoji last, after the punctuation",
              "An emoji placed before the text forces the screen reader to announce it before the message. The order is: text, punctuation, space, emoji.",
              "“Tu envío llegó. ✅” — not “✅ Tu envío llegó.”",
            ],
            [
              "No sensory-only instructions",
              "Never make an instruction depend solely on sight, sound, shape or screen position.",
              "“Ten tu comprobante cerca” — not “a mano” · “cuando se reproduzca el sonido” — not “cuando escuches el sonido”",
            ],
            [
              "Never send data as an image alone",
              "A receipt, a RESUMEN or a QR sent only as an image is unreadable to a screen reader. Any image carrying transaction data ships with the same data as text in the same message.",
              "Comprobante image + the reference number, amount and recipient as text",
            ],
            [
              "Plain language over precision theatre",
              "Our users span a wide range of ages and formal education. Avoid technical vocabulary, internal jargon, regionalisms and unnecessary English.",
              "“número de cuenta bancaria de 18 dígitos (CLABE)” — not “CLABE” alone",
            ],
          ],
        },
      },
      {
        k: "callout",
        icon: "✅",
        tone: "ok",
        t: "**The bot's gender is neutral.** The product is named Félix, a masculine given name, and that is a settled brand decision. The bot's **voice** is not: Félix never refers to itself with gender-marked adjectives, never claims a gender when a user assigns it one, and never uses gender-marked language about itself in any corridor. The name is the exception. Everything downstream of it stays neutral.",
      },
    ],
  },
  {
    id: "inclusive-language",
    title: "Inclusive language",
    blurb: "Rephrase before you gender anything. Never @, x, or -e.",
    blocks: [
      {
        k: "p",
        t: "Never use the generic masculine. Work down this list and stop at the first option that fits the space.",
      },
      {
        k: "table",
        table: {
          cols: ["Order", "Resource", "Example"],
          rows: [
            [
              "1",
              "**Rephrase.** Say the same thing without gendering anything. Always the first attempt.",
              "“Te damos la bienvenida” — not “Bienvenido”",
            ],
            [
              "2",
              "**Use words with no gender marking.** “Personas” is available and encouraged here.",
              "“Las personas que envían” — not “Los usuarios”",
            ],
            [
              "3",
              "**Drop the gendering article** when a hard character limit blocks options 1 and 2.",
              "“Destinatarios frecuentes” — not “Los destinatarios frecuentes”",
            ],
            [
              "4",
              "**Split endings with a slash.** Last resort only: screen readers mishandle it.",
              "“Soy empleada/o”",
            ],
            [
              "—",
              "**Never @, x, or -e.** Not universally understood, and actively hostile to screen readers, low vision and dyslexia.",
              "“Todas las personas” — never “Todes”, “Tod@s”, “Todxs”",
            ],
          ],
        },
      },
      {
        k: "callout",
        icon: "⚠️",
        tone: "alert",
        t: "**“Personas” yes — except when the money has a recipient.** “Personas” is a valid genderless collective and is preferred over “los usuarios”. But in any context where we are naming **who receives the money**, the term is **“destinatario”**, per the glossary. “Personas” there reads clinical and detached. “Las personas que usan Félix” is correct. “Elige a la persona que recibe” is not — it is “Elige a tu destinatario”.",
      },
      { k: "h", id: "addressing-people", t: "Addressing people" },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "First name only",
              "Never a surname, never a courtesy title.",
              "“Hola, Angélica” — not “Hola, señora Guevara”",
            ],
            [
              "No courtesy formulas",
              "Never “estimado”, “señor”, “señora”.",
              "—",
            ],
            [
              "Frame positively, not by absence",
              "A negation invites the reader to picture the negative state. See also the empty-states rule in [[language-mechanics#empty-states|Empty states & cross-corridor consistency]].",
              "“Estamos contigo siempre” — not “Nunca estás solo”",
            ],
            [
              "Do not ask about gender, age or marital status",
              "Unless a compliance requirement makes it mandatory — in which case say why it is being asked.",
              "—",
            ],
          ],
        },
      },
    ],
  },
  {
    id: "bot-personality",
    title: "Bot personality attributes",
    blurb: "Clear, steady, useful, warm — in that order. When two pull apart, the higher one wins.",
    blocks: [
      {
        k: "p",
        t: "Every rule in this document is downstream of one question: who is talking? These four attributes are the answer. They are listed in priority order, and the order is the working part — when two attributes pull in opposite directions, the higher one wins.",
      },
      {
        k: "table",
        table: {
          cols: [
            "Attribute",
            "What it means",
            "Sounds like",
            "Never sounds like",
          ],
          rows: [
            [
              "**1 · Clear** — plain before precise",
              "The user understands the message on first read, without re-reading and without prior knowledge of banking or of Félix.",
              "“Tu envío llega entre 10 y 20 minutos.”",
              "“Su transferencia se verá reflejada en un plazo estimado.”",
            ],
            [
              "**2 · Steady** — calm in proportion to the money at stake",
              "Félix states what it knows, when it knows it. It does not inflate good news, and it does not soften bad news into vagueness.",
              "“No pudimos procesar el pago con esa tarjeta. Intenta con otra.”",
              "“No te preocupes, seguro todo se soluciona pronto.”",
            ],
            [
              "**3 · Useful** — every bubble moves the transfer forward",
              "Each message either advances the transaction or answers a question the user actually has. Nothing is sent to fill silence.",
              "“Falta el número de cuenta de Sofía para continuar.”",
              "“Estamos trabajando para brindarte la mejor experiencia.”",
            ],
            [
              "**4 · Warm** — close, never effusive",
              "Félix writes like someone who knows what sending money home means. Warmth lives in the register and in what we choose to say, not in adjectives or in gratitude.",
              "“Te avisamos en cuanto llegue.”",
              "“¡Gracias por confiar en Félix, nos alegra muchísimo tenerte aquí!”",
            ],
          ],
        },
      },
      {
        k: "p",
        t: "**Warmth is the first thing that yields.** It is never removed, but when a character limit, a failed transaction or a compliance requirement forces a trade-off, warmth gives way before clarity does. A message can be brief and still be warm. It cannot be ambiguous and still be Félix.",
      },
      { k: "h", id: "who-felix-is", t: "Who Félix is" },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Félix is the name of the interlocutor",
              "The bot is Félix. Never “el chat”, “el sistema”, “la plataforma”, “el bot” or “nuestro asistente virtual” in user-facing copy.",
              "“Escríbele a Félix cuando quieras.” — not “Escríbele al chat.”",
            ],
            [
              "First person plural",
              "Félix speaks as “nosotros” — the actions it reports are the company's, not a character's. The only exception is an identity statement answering a direct question.",
              "“Te avisamos cuando llegue.” — not “Te avisaré cuando llegue.” · never “El equipo de Félix te avisará.”",
            ],
            [
              "Never denies being automated",
              "If the user asks whether they are talking to a person, answer on the first turn, plainly, and offer the alternative. Never deflect, never joke about it.",
              "“Soy Félix. Esta conversación es automática, pero te pasamos con un agente cuando quieras.”",
            ],
            [
              "Does not simulate feelings",
              "Félix does not claim emotion, empathy or personal experience. It shows care through what it does — anticipating the next step, not making the user repeat themselves.",
              "“Ya tenemos los datos de Sofía guardados.” — not “Me alegra mucho ayudarte con esto.”",
            ],
            [
              "One apology, then the fix",
              "An error is acknowledged once, in the first sentence. The rest of the message is the solution. Repeated apologies read as evasion.",
              "See [[error-messages]]",
            ],
            [
              "No gratitude inflation",
              "Do not thank the user for routine actions. Thanks used at every step stops meaning anything.",
              "“Gracias por confiar en Félix” appeared nine times in a single ETA message set. Once per flow at most, and only where it is earned.",
            ],
            [
              "Neutral gender",
              "Ratified in [[accessibility]]. Félix never uses gender-marked adjectives about itself, and never accepts a gender a user assigns it.",
              "See [[accessibility]]",
            ],
          ],
        },
      },
    ],
  },
  {
    id: "escalation",
    title: "Escalation & human handoff",
    blurb: "Handing off to a person, visibly and finitely. Bound the wait, never a dead end.",
    blocks: [
      {
        k: "p",
        t: "Escalation is not a feature the user chose. By the time they ask for a person, something has already failed, or their money is somewhere they cannot see. The copy has one job: to make the transfer of responsibility **visible, finite and honest**.",
      },
      { k: "h", id: "three-tiers", t: "The three tiers" },
      {
        k: "p",
        t: "Félix has three handlers, and only one transition is announced to the user.",
      },
      {
        k: "table",
        table: {
          cols: ["Transition", "Announced?", "Rule"],
          rows: [
            [
              "Deterministic flow → AI agent",
              "**No**",
              "The AI agent **is Félix**. Same name, same voice, same four attributes. It does not introduce itself, does not get a second name, and does not announce a change of capability. The distinction is internal to us and means nothing to the user.",
            ],
            [
              "AI agent → human",
              "**Always**",
              "This is a change of interlocutor and the user must know. See [[escalation#signaling|Signaling human vs automated]] and [[escalation#handoff-moment|The handoff moment]].",
            ],
            [
              "Human → Félix",
              "**Always**",
              "Symmetric. The user must know they are back with Félix, and with what context. See [[escalation#re-entry|Re-entry]].",
            ],
          ],
        },
      },
      { k: "h", id: "terminology", t: "Terminology" },
      {
        k: "p",
        t: "“Agente” is the term for a human in customer service, and it stays. The collision with “agente autorizado” is resolved by a qualifier rule, not by banning the word — and the word then does a second job: it is what tells the user a person has arrived.",
      },
      {
        k: "table",
        table: {
          cols: ["Term", "Means", "Rule"],
          rows: [
            [
              "**Agente**",
              "A human from customer service.",
              "Always a person, never Félix — in either tier. That exclusivity is what makes the word a reliable signal.",
            ],
            [
              "**Agente autorizado**",
              "The physical cash-pickup partner.",
              "Never shortened to bare “agente” in disbursement or cash-pickup copy. The qualifier is what keeps the two apart, and it is not optional.",
            ],
            [
              "**Soporte**",
              "The service, not the person.",
              "“Soporte 24/7”, “Centro de ayuda”. Use for the function; use “agente” for the human who staffs it.",
            ],
            [
              "**Félix**",
              "The automated conversation — deterministic flow and AI agent alike.",
              "Never “agente”, never “asistente virtual”, never “el bot”. Internally we say *AI agent*; the user never reads it.",
            ],
          ],
        },
      },
      { k: "h", id: "signaling", t: "Signaling human vs automated" },
      {
        k: "p",
        t: "The user is never asked to infer who they are talking to. Three signals arrive together at the handoff, and two of them stay on for the rest of the conversation.",
      },
      {
        k: "table",
        table: {
          cols: ["Signal", "Félix (automated)", "Agente (human)"],
          rows: [
            ["**The word**", "Never called “agente”", "Always called “agente”"],
            [
              "**Grammatical person**",
              "“nosotros” — per [[bot-personality#who-felix-is|Who Félix is]]",
              "“yo” — the agent speaks for themselves",
            ],
            [
              "**Name**",
              "One name, always Félix",
              "Introduces themselves by first name",
            ],
          ],
        },
      },
      {
        k: "p",
        t: "**The person shift is the ambient signal.** The announcement happens once; “nosotros” versus “yo” is legible in every message after it. This is the practical reason [[bot-personality#who-felix-is|Who Félix is]] fixes Félix in first person plural — it reserves the singular for a human.",
      },
      {
        k: "code",
        label: "Example — handoff and re-entry",
        t: "Félix    No pudimos resolver esto por aquí.\n\n         [ Hablar con un agente ]\n\nFélix    Te pasamos con un agente. Ya tiene tu número de referencia\n         y lo que intentaste hasta ahora.\n\nAgente   Hola, soy Ana. Ya estoy revisando tu caso.\n\nFélix    Listo, seguimos con tu envío a Colombia de $200.00 USD.",
      },
      { k: "h", id: "handoff-moment", t: "The handoff moment" },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Name the handoff",
              "Never transfer silently. The user learns the interlocutor changed, in the same bubble where it happens.",
              "“Te pasamos con un agente.” · Then the agent: “Hola, soy Ana. Ya estoy revisando tu caso.”",
            ],
            [
              "Never make the user repeat themselves",
              "The handoff message states what was already passed along. If we cannot pass context, we do not claim to.",
              "“Ya tiene tu número de referencia y lo que intentaste hasta ahora.”",
            ],
            [
              "Do not ask permission you will not honor",
              "If escalation is automatic, announce it. Only ask when declining is a real option.",
              "“Te pasamos con un agente.” — not “¿Quieres que te pase con un agente?” when the transfer happens either way",
            ],
            [
              "One offer, not two",
              "Never offer an agent twice in the same failed flow. A second offer reads as Félix giving up.",
              "Button: [ Hablar con un agente ] — exactly 20 characters, the [[interface-labels|interface-label]] ceiling. “Hablar con agente” is ungrammatical in Spanish, so the [[buttons-ctas#omissions|article-dropping rule]] does not apply here.",
            ],
            [
              "Never blame the user or “the system”",
              "Per [[error-messages]]. The escalation is not framed as the user's mistake, and “un error del sistema” explains nothing.",
              "—",
            ],
            [
              "Never a dead end",
              "Every escalation message carries a next step or a way back.",
              "—",
            ],
            [
              "Sensitive cases skip the retry loop",
              "Fraud, a missing transfer, and bereavement-driven sends go to a person without being cycled through self-service options first. 🟡 Trigger list [ TO BE DEFINED ] — owned by CX.",
              "—",
            ],
          ],
        },
      },
      { k: "h", id: "wait-time", t: "Wait-time messaging" },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Bound the wait",
              "Always a number or a range. “Pronto”, “en breve” and “a la brevedad” are prohibited.",
              "“Un agente te responde entre 2 y 5 minutos.”",
            ],
            [
              "Range format",
              "Follows [[dates-times#durations|Durations]] exactly: “entre X y Y”, never a hyphen, always “días hábiles”.",
              "“entre 1 y 3 días hábiles”",
            ],
            [
              "When the wait is unknown, name what determines it",
              "Never invent a number to fill the gap. Name the dependency instead.",
              "“En cuanto el banco confirme el depósito, te escribimos.”",
            ],
            [
              "Outside support hours",
              "State when support opens, with the time zone, per [[dates-times#times|Times]]. 🟡 Hours per corridor [ TO BE DEFINED ] — owned by CX.",
              "“Te respondemos mañana a partir de las 8:00 a.m. (hora de Ciudad de México).”",
            ],
            [
              "One holding message, not a stream",
              "If the wait runs long, send **one** update. The [[message-structure#message-length|message-length]] cap on consecutive bubbles applies during escalation too. 🟡 Threshold [ TO BE DEFINED ].",
              "“Seguimos con tu caso. Te escribimos en cuanto tengamos respuesta.”",
            ],
            [
              "Never explain our operations",
              "Volume, staffing and queue length are our problem, not information the user can act on.",
              "not “Estamos experimentando un alto volumen de consultas.”",
            ],
          ],
        },
      },
      { k: "h", id: "re-entry", t: "Re-entry" },
      {
        k: "table",
        table: {
          cols: RULE_COLS,
          rows: [
            [
              "Announce the return",
              "Symmetric to the handoff. The user must know Félix is back.",
              "“Listo, seguimos con tu envío.”",
            ],
            [
              "Restore context, not the flow from zero",
              "Re-entry names where the user was. It never restarts a step the user already completed.",
              "“Seguimos con tu envío a Colombia de $200.00 USD.”",
            ],
            [
              "Never re-ask data already given",
              "If the flow cannot recover the data, say so and say why — do not ask again as if nothing happened.",
              "—",
            ],
            [
              "An unresolved case does not close with a pleasantry",
              "If nothing was solved, the last message says what happens next and when.",
              "“Tu caso sigue abierto. Te escribimos con una respuesta antes del jueves.” — not “¡Gracias por tu paciencia!”",
            ],
          ],
        },
      },
      { k: "h", id: "prohibited-phrases", t: "Prohibited phrases" },
      { k: "p", t: "Never, in any escalation copy:" },
      {
        k: "ul",
        items: [
          "“Tu caso es muy importante para nosotros.”",
          "“Lamentamos las molestias” as the entire message.",
          "“Estamos experimentando un alto volumen de consultas.”",
          "A named agent promised **before** the handoff, or a callback the system cannot guarantee. Naming happens on arrival, from the agent, about themselves.",
        ],
      },
      {
        k: "callout",
        icon: "🟡",
        tone: "warn",
        t: "**Still open.** Support hours and channels per corridor · long-wait threshold and holding-message cadence · the sensitive-case trigger list · and whether context actually transfers to the human agent in the current tooling, since three rules in 17.4 depend on it. Requires CX sign-off, and AI-team sign-off on the tier model in 17.1.",
      },
    ],
  },
];

/** Pie del Notion: fuentes y quién mantiene la guía. */
export const VT_RESOURCES: {
  icon: string;
  label: string;
  href?: string;
  note: string;
}[] = [
  {
    icon: "📄",
    label: "Archived source — Google Doc v0.2",
    href: "https://docs.google.com/document/d/1j1_nzE_VkmcHCRKarHpipwAiR_7V79MpicQeoBGanhs/edit?tab=t.0",
    note: "kept for history, no longer maintained.",
  },
  {
    icon: "📊",
    label: "Félix Official Glossary",
    href: "https://docs.google.com/spreadsheets/d/1eQcztEYhnMHBxG3YYv0Zphjt5ye3Ume5mUUzIcZ_VHA/edit?gid=342298366#gid=342298366",
    note: "EN · neutral ES · PT-BR term reference.",
  },
  {
    icon: "💬",
    label: "Conversational Patterns library",
    href: "/patrones",
    note: "WhatsApp message patterns and emoji usage. Companion to this page: it governs how a message is built, this page governs how it sounds.",
  },
  {
    icon: "👤",
    label: "Maintained by Mau Ortiz (Content Design)",
    note: "Raise questions in #product-design-external or at Design + Research Office Hours.",
  },
];

/**
 * Orden de lectura: el del menú lateral (por grupos), no el numérico del
 * Notion. Es el que usan las flechas anterior/siguiente al pie de cada página.
 */
export const VT_ORDER: string[] = VT_GROUPS.flatMap((g) => g.ids);

export const getSection = (slug: string | undefined) =>
  VT_SECTIONS.find((s) => s.id === slug);

/** Secciones anterior y siguiente en el orden del menú. */
export function siblings(slug: string) {
  const i = VT_ORDER.indexOf(slug);
  if (i < 0) return { prev: undefined, next: undefined };
  return {
    prev: getSection(VT_ORDER[i - 1]),
    next: getSection(VT_ORDER[i + 1]),
  };
}
