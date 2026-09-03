import type {
  DirectoryEntry,
  Pattern,
  PatternStub,
  ResourceRow,
} from "./types";
import { standardTabs } from "./blocks";

const ASSETS = "/assets/patterns";

const FIGMA_WA_LIBRARY_URL =
  "https://www.figma.com/design/N9dG8uXXR7FkLkuSZT5oex/DRAFT-Conversational-Guidelines";

const WA_LIST_DOCS_URL =
  "https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/interactive-list-messages";

/* Los tres patrones comparten la misma grilla de recursos por ahora. Cuando
   alguno se desvíe, copia el array en su entrada y edítalo ahí. */
const SHARED_RESOURCES: ResourceRow[] = [
  {
    type: { es: "Diseño", en: "Design" },
    resource: {
      es: "Librería de WhatsApp (Figma)",
      en: "WhatsApp Library (Figma)",
    },
    href: FIGMA_WA_LIBRARY_URL,
    status: "ok",
  },
  {
    type: { es: "Copy", en: "Copy" },
    resource: { es: "Documento de contenido", en: "Content doc" },
    status: "draft",
  },
  {
    type: { es: "Datos", en: "Data" },
    resource: { es: "Cruce con Amplitude", en: "Amplitude cross-check" },
    status: "tbd",
  },
];

// ─── Entrada cerrada ─────────────────────────────────────────────────────────

const closedInput: Pattern = {
  slug: "closed-input",
  family: "interaction",
  name: { es: "Closed Input", en: "Closed Input" },
  lede: {
    es: "Botones o una lista cuando el conjunto de respuestas posibles se conoce. El usuario elige; nunca tiene que adivinar cómo escribirlo.",
    en: "Buttons or a list when the set of possible answers is known. The user picks; they never have to guess the wording.",
  },
  cardBody: {
    es: "Botones o una lista cuando el conjunto de respuestas posibles se conoce. El usuario elige; nunca tiene que adivinar cómo escribirlo.",
    en: "Buttons or a list when the set of possible answers is known. The user picks; they never have to guess the wording.",
  },
  hero: `${ASSETS}/closed-input-hero.png`,
  heroDetail: [`${ASSETS}/closed-input-hero.png`],
  heroAlt: {
    es: "Pantalla de WhatsApp mostrando una pregunta con botones de respuesta",
    en: "WhatsApp screen showing a question with reply buttons",
  },

  tabs: standardTabs({
    overview: {
      usage: [
        {
          es: "Usa botones cuando hay de 1 a 3 opciones conocidas.",
          en: "Use buttons when there are 1 to 3 known options.",
        },
        {
          es: "Usa una lista cuando hay de 4 a 10 opciones conocidas.",
          en: "Use a list when there are 4 to 10 known options.",
        },
        {
          es: "Más de 10 opciones: repiensa la pregunta, es demasiado amplia para un solo paso.",
          en: "Beyond 10 options, rethink the question, it is too broad for a single step.",
        },
        {
          es: "Nunca hagas que el usuario adivine cómo escribir algo de un conjunto que ya conoces.",
          en: "Never make the user guess the wording for a set you already know.",
        },
      ],
      metric: {
        title: {
          es: "Por qué funciona · métricas por confirmar",
          en: "Why this works · metrics TBD",
        },
        body: [
          {
            es: "La entrada cerrada mantiene las respuestas no clasificables cerca de cero, mientras que el texto libre genera la mayoría de las fallas del bot (`NOT_ASSIGNED_YET` = 64% del total de fallas). Los botones sostienen el flujo de modificación: ahí el texto libre es apenas 1,6%.",
            en: "Closed input keeps unclassifiable answers near zero, where open text drives the majority of bot failures (`NOT_ASSIGNED_YET` = 64% of failures overall). Buttons carry the modify flow: free text there is only 1.6%.",
          },
        ],
        note: {
          es: "Por medir: ratio de taps en botón vs. escritura, y abandono en este paso. Ver el mapa de cruce con Amplitude.",
          en: "To pull: button-tap vs typed ratio and abandonment at this step. See the Amplitude cross-check map.",
        },
      },
      resources: SHARED_RESOURCES,
    },

    specs: {
      intro: {
        es: "Los límites de WhatsApp que definen este patrón. Diseña dentro de ellos.",
        en: "The WhatsApp limits that define this pattern. Design within them.",
      },
      tables: [
        {
          heading: { es: "Botones de respuesta", en: "Reply buttons" },
          columns: [
            { es: "Componente", en: "Component" },
            { es: "Límite", en: "Spec" },
          ],
          rows: [
            [
              { es: "Botones por mensaje", en: "Buttons per message" },
              { es: "Hasta 3", en: "Up to 3" },
            ],
            [
              { es: "Etiqueta del botón", en: "Button label" },
              { es: "Máx. 20 caracteres", en: "Max 20 characters" },
            ],
          ],
        },
        {
          heading: { es: "Mensaje de lista", en: "List message" },
          columns: [
            { es: "Elemento", en: "Element" },
            { es: "Límite", en: "Limit" },
          ],
          rows: [
            [
              { es: "Secciones", en: "Sections" },
              {
                es: "Hasta 10 secciones, hasta 10 filas en total entre todas las secciones",
                en: "Up to 10 sections, up to 10 rows total across all sections combined",
              },
            ],
            [
              { es: "Botón (abre la lista)", en: "Button (opens the list)" },
              {
                es: "Un botón, etiqueta máx. 20 caracteres",
                en: "One button, label max 20 characters",
              },
            ],
            [
              { es: "Encabezado", en: "Header" },
              {
                es: "Opcional, solo texto, máx. 60 caracteres",
                en: "Optional, text only, max 60 characters",
              },
            ],
            [
              { es: "Cuerpo", en: "Body" },
              { es: "Máx. 4.096 caracteres", en: "Max 4,096 characters" },
            ],
            [
              { es: "Pie", en: "Footer" },
              {
                es: "Opcional, máx. 60 caracteres",
                en: "Optional, max 60 characters",
              },
            ],
            [
              { es: "Título de fila", en: "Row title" },
              { es: "Máx. 24 caracteres", en: "Max 24 characters" },
            ],
            [
              { es: "Descripción de fila", en: "Row description" },
              {
                es: "Opcional, máx. 72 caracteres",
                en: "Optional, max 72 characters",
              },
            ],
          ],
        },
        {
          heading: {
            es: "Decisión: cómo preguntar",
            en: "Decision: how to ask",
          },
          columns: [
            { es: "Opciones", en: "Options" },
            { es: "Componente", en: "Pattern" },
          ],
          rows: [
            [
              { es: "1 a 3 opciones", en: "1 to 3 options" },
              { es: "Botones de respuesta", en: "Reply buttons" },
            ],
            [
              { es: "4 a 10 opciones", en: "4 to 10 options" },
              { es: "Mensaje de lista", en: "List message" },
            ],
            [
              { es: "Más de 10", en: "More than 10" },
              { es: "Repensar el flujo", en: "Rethink the flow" },
            ],
          ],
        },
      ],
      source: {
        es: "Fuente: WhatsApp Cloud API, mensajes de lista interactivos (actualizado jul. 2026). ",
        en: "Source: WhatsApp Cloud API, interactive list messages (updated Jul 2026). ",
      },
      sourceHref: WA_LIST_DOCS_URL,
      sourceLinkText: "developers.facebook.com",
    },

    guidelines: {
      usage: {
        es: "Recurre a la entrada cerrada siempre que el conjunto de respuestas se conozca de antemano. Mantiene a la gente en un camino que el bot puede leer, y le saca la adivinanza a un paso que si no se trabaría.",
        en: "Reach for closed input whenever the set of answers is known in advance. It keeps people on a path the bot can read, and it takes the guesswork out of a step that would otherwise stall.",
      },
      tips: {
        es: "Escribe cada opción como la diría el usuario, no como la guarda el sistema. Mantén las etiquetas cortas, asegúrate de que ninguna se solape con otra, y ordénalas por frecuencia de uso o en una secuencia que ya tenga sentido (de menor a mayor monto, del destino más al menos común).",
        en: "Write each option the way the user would say it, not the way the system stores it. Keep the labels short, make sure no two overlap, and order them by how often they get picked or in a sequence that already makes sense (lowest to highest amount, most to least common destination).",
      },
      examples: [
        {
          tone: "do",
          img: `${ASSETS}/closed-input-do-1.png`,
          alt: {
            es: "Pregunta de WhatsApp con las opciones conocidas como botones",
            en: "WhatsApp question offering the known options as reply buttons",
          },
          caption: {
            es: "Ofrece las opciones conocidas como botones. Un tap, sin escribir.",
            en: "Offer the known options as buttons. One tap, no typing.",
          },
        },
        {
          tone: "dont",
          img: `${ASSETS}/closed-input-dont-1.png`,
          alt: {
            es: "Pregunta de WhatsApp dejando un conjunto conocido como texto abierto",
            en: "WhatsApp question leaving a known set as open text",
          },
          caption: {
            es: "No dejes un conjunto conocido como texto abierto. La respuesta se vuelve difícil de interpretar.",
            en: "Don't leave a known set as open text. The reply gets hard to parse.",
          },
        },
        {
          tone: "do",
          img: `${ASSETS}/closed-input-do-2.png`,
          alt: {
            es: "Pregunta de WhatsApp usando un mensaje de lista para más de tres opciones",
            en: "WhatsApp question using a list message for more than three options",
          },
          caption: {
            es: "Usa una lista cuando hay más de 3 opciones.",
            en: "Use a list when there are more than 3 options.",
          },
        },
        {
          tone: "dont",
          img: `${ASSETS}/closed-input-dont-2.png`,
          alt: {
            es: "Pregunta de WhatsApp amontonando muchas opciones en un solo mensaje",
            en: "WhatsApp question cramming many options into a single message",
          },
          caption: {
            es: "No amontones muchas opciones en un mensaje ni en botones.",
            en: "Don't cram many options into one message or into buttons.",
          },
        },
      ],
    },
  }),
};

// ─── Entrada abierta ─────────────────────────────────────────────────────────

const openInput: Pattern = {
  slug: "open-input",
  family: "interaction",
  name: { es: "Open Input", en: "Open Input" },
  lede: {
    es: "Una pregunta que se responde con texto libre, para cuando la respuesta no se puede listar de antemano (un nombre, un monto a medida, una ciudad). El usuario escribe, y el bot tiene que leer lo que venga.",
    en: "A question answered with free text, for when the answer can't be listed in advance (a name, a custom amount, a city). The user types, and the bot has to read whatever comes back.",
  },
  cardBody: {
    es: "Una pregunta que se responde con texto libre, para cuando la respuesta no se puede listar de antemano (un nombre, un monto a medida, una ciudad). El usuario escribe, y el bot tiene que leer lo que venga.",
    en: "A question answered with free text, for when the answer can't be listed in advance (a name, a custom amount, a city). The user types, and the bot has to read whatever comes back.",
  },
  hero: `${ASSETS}/open-input-hero.png`,
  heroDetail: [
    `${ASSETS}/open-input-hero-a.png`,
    `${ASSETS}/open-input-hero-b.png`,
  ],
  heroAlt: {
    es: "Pantalla de WhatsApp preguntando a quién enviar dinero, con una pista de formato y un ejemplo",
    en: "WhatsApp screen asking who to send money to, with a format hint and a worked example",
  },

  tabs: standardTabs({
    overview: {
      usage: [
        {
          es: "Usa entrada abierta solo cuando el conjunto de respuestas es genuinamente impredecible (un nombre completo, un monto a medida, una ciudad libre).",
          en: "Use open input only when the set of answers is genuinely unpredictable (a full name, a custom amount, a free city).",
        },
        {
          es: "Si las respuestas se conocen, usa entrada cerrada (botones para 1 a 3, una lista para 4 a 10).",
          en: "If the answers are known, use Closed input instead (buttons for 1 to 3, a list for 4 to 10).",
        },
        {
          es: "Acompaña siempre la pregunta con una pista de formato, para que el usuario sepa cómo responder.",
          en: "Always pair the question with a format hint, so the user knows how to answer.",
        },
        {
          es: "Pregunta una sola cosa por mensaje. Dos preguntas en una burbuja duplican las formas de malinterpretar la respuesta.",
          en: "Ask one thing per message. Two questions in one bubble double the ways a reply can be misread.",
        },
        {
          es: 'Muestra un ejemplo resuelto ("Ejemplo: Juan Pérez López") las primeras una o dos veces que el usuario llega a este paso, y retíralo cuando el patrón ya se aprendió. Cuándo dejar de mostrarlo está por definirse.',
          en: 'Show a worked example ("Ejemplo: Juan Pérez López") the first one or two times a user reaches this step, then retire it once the pattern is learned. When exactly to stop showing it is TBD.',
        },
      ],
      metric: {
        title: {
          es: "Por qué funciona · métricas por confirmar",
          en: "Why this works · metrics TBD",
        },
        body: [
          {
            es: "El texto abierto es inevitable cuando el espacio de respuestas no tiene límite, pero también es donde el bot falla más. Las respuestas sin clasificar (`NOT_ASSIGNED_YET`) son el 64% de todas las fallas del bot, y el paso de mayor fricción que tenemos (cuenta bancaria) está en 129s de mediana, ambos empujados por la entrada libre. La pista de formato y el ejemplo de la primera vez existen para bajar esos números.",
            en: "Open text is unavoidable when the answer space is unbounded, but it is also where the bot fails most. Unclassified replies (`NOT_ASSIGNED_YET`) are 64% of all bot failures, and the highest-friction step we have (bank account) sits at a 129s median, both driven by free-form entry. The format hint and the first-run example exist to pull those numbers down.",
          },
        ],
        note: {
          es: "Por medir: tasa de parseo exitoso en el paso, mediana de tiempo en el paso (comparada contra los 129s del paso de cuenta bancaria), y tasa de loop o abandono. Para la variante con ejemplo, comparar parseo y tiempo con la pista visible vs. oculta, para decidir cuánto tiempo seguir mostrándola.",
          en: "To pull: parse-success rate at the step, median time at step (benchmark against the 129s bank-account step), and loop or abandon rate. For the example variant, compare parse-success and time at step with the hint shown vs hidden, to decide how long to keep showing it.",
        },
      },
      resources: SHARED_RESOURCES,
    },

    specs: {
      intro: {
        es: "Los límites de WhatsApp que definen este patrón.",
        en: "The WhatsApp limits that define this pattern.",
      },
      tables: [
        {
          heading: { es: "Mensaje de texto", en: "Text message" },
          columns: [
            { es: "Componente", en: "Component" },
            { es: "Límite", en: "Spec" },
          ],
          rows: [
            [
              { es: "Cuerpo del mensaje", en: "Prompt message body" },
              { es: "Hasta 4.096 caracteres", en: "Up to 4,096 characters" },
            ],
            [
              { es: "Componente interactivo", en: "Interactive component" },
              {
                es: "Ninguno (mensaje de texto plano)",
                en: "None (plain text message)",
              },
            ],
            [
              { es: "Respuesta del usuario", en: "User reply" },
              {
                es: "Texto libre, sin payload estructurado",
                en: "Free-form text, no structured payload",
              },
            ],
            [
              { es: "Validación", en: "Validation" },
              {
                es: "Ninguna del lado de WhatsApp; el bot parsea el texto crudo",
                en: "None on WhatsApp's side; the bot parses the raw text",
              },
            ],
            [
              {
                es: "Ventana de respuesta libre",
                en: "Free-form reply window",
              },
              {
                es: "Solo dentro de la ventana de atención de 24 horas; fuera de ella se reabre con una plantilla",
                en: "Only inside the 24-hour customer service window; outside it you reopen with a template",
              },
            ],
          ],
        },
        {
          heading: { es: "Casos de uso", en: "Use cases" },
          columns: [
            { es: "Respuesta", en: "Answer" },
            { es: "Patrón", en: "Pattern" },
          ],
          rows: [
            [
              {
                es: "Sin límite (nombre como en el documento, monto a medida, ciudad libre)",
                en: "Unbounded (name as on document, custom amount, free city)",
              },
              {
                es: "Entrada abierta (texto libre)",
                en: "Open input (free text)",
              },
            ],
            [
              { es: "Conjunto conocido, 1 a 3", en: "Known set, 1 to 3" },
              {
                es: "Botones de respuesta (ver entrada cerrada)",
                en: "Reply buttons (see Closed input)",
              },
            ],
            [
              { es: "Conjunto conocido, 4 a 10", en: "Known set, 4 to 10" },
              {
                es: "Mensaje de lista (ver entrada cerrada)",
                en: "List message (see Closed input)",
              },
            ],
          ],
        },
      ],
      notes: [
        {
          es: 'Sobre la línea de ejemplo: los mensajes de texto de WhatsApp no tienen campo de placeholder ni de ejemplo. La pista "Ejemplo:" es copy dentro del cuerpo del mensaje, así que mostrarla solo en la primera o segunda vez es lógica del bot, no una función de la plataforma.',
          en: 'Note on the example line: WhatsApp text messages have no placeholder or example field. The "Ejemplo:" hint is copy inside the message body, so showing it only on the first or second run is bot logic, not a platform feature.',
        },
      ],
      source: {
        es: "Fuente: WhatsApp Cloud API, mensajes de texto y la ventana de atención de 24 horas. Confirmar en ",
        en: "Source: WhatsApp Cloud API, text messages and the 24-hour customer service window. Confirm on ",
      },
      sourceHref: "https://developers.facebook.com",
      sourceLinkText: "developers.facebook.com",
    },

    guidelines: {
      usage: {
        es: "Recurre a la entrada abierta solo cuando realmente no puedes enumerar las respuestas. Cada paso abierto es un lugar donde el bot puede malinterpretar, entrar en loop o perder al usuario, así que la vara para usarlo debería ser alta.",
        en: "Reach for open input only when you truly can't enumerate the answers. Every open step is a place the bot can misread, loop, or lose the user, so the bar for using it should be high.",
      },
      tips: {
        es: "Empieza con la pregunta, después la pista de formato en su propia línea, y después el ejemplo. Mantén la pista concreta y en las palabras del usuario. Si te encuentras escribiendo una pista que lista las respuestas válidas, es señal de que el paso debería ser entrada cerrada, no abierta.",
        en: "Lead with the question, then the format hint on its own line, then the example. Keep the hint concrete and in the user's own words. If you find yourself writing a hint that lists the valid answers, that is a sign the step should be closed input, not open.",
      },
      examples: [
        {
          tone: "do",
          img: `${ASSETS}/open-input-do-1.png`,
          alt: {
            es: "Pregunta de WhatsApp con una pista de formato clara y un ejemplo resuelto",
            en: "WhatsApp question with a clear format hint and a worked example",
          },
          caption: {
            es: "Una sola pregunta, una pista clara y un ejemplo para la primera vez.",
            en: "One question, a clear hint, and a first-run example.",
          },
        },
        {
          tone: "dont",
          img: `${ASSETS}/open-input-dont-1.png`,
          alt: {
            es: "Mensaje de WhatsApp con dos preguntas apiladas en una sola burbuja",
            en: "WhatsApp message with two questions stacked in one bubble",
          },
          caption: {
            es: "No pidas texto abierto para algo que podrías ofrecer como opciones.",
            en: "Don't ask open text for something you could offer as options.",
          },
        },
      ],
    },
  }),
};

// ─── Entrada mixta ───────────────────────────────────────────────────────────

const mixedInput: Pattern = {
  slug: "mixed-input",
  family: "interaction",
  name: { es: "Mixed input", en: "Mixed input" },
  title: {
    es: "Mixed input (buttons and open question)",
    en: "Mixed input (buttons and open question)",
  },
  lede: {
    es: "Una pregunta que ofrece las respuestas más comunes como botones y todavía deja escribir la propia. Un camino rápido para la mayoría, una puerta abierta para la cola larga.",
    en: "A question that offers the most common answers as buttons and still lets the user type their own. A fast path for the majority, an open door for the long tail.",
  },
  cardBody: {
    es: "Una pregunta que ofrece las respuestas más comunes como botones y todavía deja escribir la propia. Un camino rápido para la mayoría, una puerta abierta para la cola larga.",
    en: "A question that offers the most common answers as buttons and still lets the user type their own. A fast path for the majority, an open door for the long tail.",
  },
  hero: `${ASSETS}/mixed-input-hero.png`,
  heroDetail: [
    `${ASSETS}/mixed-input-hero-a.png`,
    `${ASSETS}/mixed-input-hero-b.png`,
  ],
  heroAlt: {
    es: "Pantalla de WhatsApp con botones de montos comunes y la opción de escribir un monto propio",
    en: "WhatsApp screen with common amount buttons plus the option to type a custom amount",
  },

  tabs: standardTabs({
    overview: {
      usage: [
        {
          es: "Usa entrada mixta cuando unos pocos valores cubren a la mayoría pero no a todos (montos frecuentes de envío, ciudades habituales), y todavía quieres aceptar cualquier cosa fuera de los presets.",
          en: "Use mixed input when a few values cover most people but not everyone (common send amounts, frequent cities), and you still want to accept anything outside the presets.",
        },
        {
          es: "Pon las 2 o 3 respuestas más comunes en botones. Deja el camino abierto para el resto.",
          en: "Put the 2 to 3 most common answers on buttons. Keep the open path for the rest.",
        },
        {
          es: 'Di los dos caminos en voz alta en el copy, por ejemplo "Puedes elegir una opción o escribir el monto que prefieras".',
          en: 'Say both paths out loud in the copy, for example "Puedes elegir una opción o escribir el monto que prefieras".',
        },
        {
          es: "WhatsApp siempre deja escribir, así que incluso un mensaje de solo botones es en realidad mixto. Diseña la respuesta escrita a propósito, no por accidente.",
          en: "WhatsApp always lets people type, so even a buttons-only message is really mixed. Design for the typed reply on purpose, not by accident.",
        },
      ],
      metric: {
        title: {
          es: "Por qué funciona · métricas por confirmar",
          en: "Why this works · metrics TBD",
        },
        body: [
          {
            es: "Cuando se ofrecen botones, casi todos los usan: en el flujo de modificación, el texto libre se usó solo el 1,6% de las veces. La entrada mixta le da ese camino rápido a la mayoría y mantiene la puerta abierta para valores que no puedes predecir, sin forzar a todos a pasar por texto abierto propenso a errores.",
            en: "When buttons are offered, almost everyone takes them: in the modify flow, free text was used only 1.6% of the time. Mixed input gives that fast path to the majority while keeping the door open for values you can't predict, without forcing everyone through error-prone open text.",
          },
        ],
        note: {
          es: "Por medir: ratio de taps en botón vs. escritura en el paso, y completado vs. abandono por camino. Si el uso escrito se mantiene mínimo, los presets están bien; si sube, a los botones les falta una respuesta común.",
          en: "To pull: button-tap vs typed ratio at the step, and completion vs abandon per path. If typed usage stays tiny, the presets are right; if it climbs, the buttons are missing a common answer.",
        },
      },
      resources: SHARED_RESOURCES,
    },

    specs: {
      intro: {
        es: "Los límites de WhatsApp que definen este patrón.",
        en: "The WhatsApp limits that define this pattern.",
      },
      tables: [
        {
          heading: { es: "Botones de respuesta", en: "Reply buttons" },
          columns: [
            { es: "Componente", en: "Component" },
            { es: "Límite", en: "Spec" },
          ],
          rows: [
            [
              { es: "Botones por mensaje", en: "Buttons per message" },
              { es: "Hasta 3", en: "Up to 3" },
            ],
            [
              { es: "Etiqueta del botón", en: "Button label" },
              { es: "Máx. 20 caracteres", en: "Max 20 characters" },
            ],
          ],
        },
        {
          heading: { es: "Camino abierto", en: "Open path" },
          columns: [
            { es: "Componente", en: "Component" },
            { es: "Límite", en: "Spec" },
          ],
          rows: [
            [
              { es: "Respuesta del usuario", en: "User reply" },
              {
                es: "Texto libre (hasta 4.096 caracteres), sin payload estructurado",
                en: "Free-form text (up to 4,096 characters), no structured payload",
              },
            ],
            [
              { es: "Validación", en: "Validation" },
              {
                es: "Ninguna; el bot parsea las respuestas escritas",
                en: "None; the bot parses typed replies",
              },
            ],
          ],
        },
        {
          heading: { es: "Casos de uso", en: "Use cases" },
          columns: [
            { es: "Camino", en: "Path" },
            { es: "Cuándo", en: "When" },
          ],
          rows: [
            [
              { es: "Botones", en: "Buttons" },
              {
                es: "Las 2 o 3 respuestas más frecuentes (camino rápido)",
                en: "The 2 to 3 most frequent answers (fast path)",
              },
            ],
            [
              { es: "Pregunta abierta", en: "Open question" },
              {
                es: "Cualquier valor fuera de los presets (cola larga)",
                en: "Any value outside the presets (long tail)",
              },
            ],
            [
              {
                es: "Más de 3 presets comunes",
                en: "More than 3 common presets",
              },
              {
                es: "Pasar la parte cerrada a un mensaje de lista",
                en: "Switch the closed part to a list message",
              },
            ],
          ],
        },
      ],
      notes: [
        {
          es: "WhatsApp no tiene un solo componente que combine botones con un campo de texto. La entrada mixta es un mensaje de botones de respuesta (o de lista) más el parseo deliberado de cualquier respuesta escrita.",
          en: "WhatsApp has no single component that combines buttons with a text field. Mixed input is a reply-buttons (or list) message plus deliberate parsing of any typed reply.",
        },
      ],
      source: {
        es: "Fuente: WhatsApp Cloud API, botones de respuesta interactivos y mensajes. Confirmar en ",
        en: "Source: WhatsApp Cloud API, interactive reply buttons and messages. Confirm on ",
      },
      sourceHref: "https://developers.facebook.com",
      sourceLinkText: "developers.facebook.com",
    },

    guidelines: {
      usage: {
        es: "Recurre a la entrada mixta cuando las respuestas comunes merecen un atajo de un tap pero la cola larga es real. Es el punto medio entre la entrada cerrada (todas las respuestas conocidas) y la abierta (ninguna conocida).",
        en: "Reach for mixed input when the common answers are worth a one-tap shortcut but the tail is real. It is the middle ground between closed input (all answers known) and open input (nothing known).",
      },
      tips: {
        es: "Nombra los presets que la gente realmente elige, en sus propias palabras, y ordénalos por frecuencia. Haz explícita la opción abierta en el copy, así escribir no se siente como romper el flujo. Mantén los botones en las respuestas top de verdad; si necesitas más de 3, pasa la parte cerrada a una lista.",
        en: "Name the presets people actually pick, in their own words, and order them by frequency. Make the open option explicit in the copy so typing doesn't feel like breaking the flow. Keep buttons to the true top answers; if you need more than 3, switch the closed part to a list.",
      },
      examples: [
        {
          tone: "do",
          img: `${ASSETS}/mixed-input-do-1.png`,
          alt: {
            es: "Pantalla de WhatsApp con botones de montos comunes y la invitación a escribir un monto propio",
            en: "WhatsApp screen with common amount buttons and an invitation to type a custom amount",
          },
          caption: {
            es: "Los montos comunes a un tap, y el monto a medida igual de bienvenido.",
            en: "Common amounts one tap away, a custom amount still welcome.",
          },
        },
        {
          tone: "dont",
          img: `${ASSETS}/mixed-input-dont-1.png`,
          alt: {
            es: "Pantalla de WhatsApp con seis botones de monto y la opción abierta escondida",
            en: "WhatsApp screen with six amount buttons and the open option buried",
          },
          caption: {
            es: "No escondas el camino abierto, y no sobrecargues los botones.",
            en: "Don't hide the open path, and don't overload the buttons.",
          },
        },
      ],
    },
  }),
};

// ─── Use of emojis ───────────────────────────────────────────────────────────

/* Estructura propia: solo Overview y Guidelines, sin specs ni do/don't. Los
   ejemplos de copy del bot ("Tu envío está en camino") quedan en español tal
   cual porque son texto de producto, no de la guía. */
const useOfEmojis: Pattern = {
  slug: "use-of-emojis",
  family: "conversational",
  name: { es: "Use of emojis", en: "Use of emojis" },
  lede: { es: "Cuándo y cuántos usar.", en: "When and how many to use." },
  cardBody: { es: "Cuándo y cuántos usar.", en: "When and how many to use." },
  hero: `${ASSETS}/emojis-hero.png`,
  heroDetail: [`${ASSETS}/emojis-hero.png`],
  heroAlt: {
    es: "Conjunto de emojis ilustrados: caras, manos, dinero y un banco",
    en: "A cluster of illustrated emoji: faces, hands, money and a bank",
  },
  tabs: [
    {
      id: "overview",
      label: { es: "Resumen", en: "Overview", pt: "Resumo" },
      blocks: [
        { type: "heading", text: { es: "Reglas", en: "Rules" } },
        {
          type: "table",
          columns: [
            { es: "Regla", en: "Rule" },
            { es: "Estándar", en: "Standard" },
            { es: "Ejemplo", en: "Example" },
          ],
          rows: [
            [
              { es: "Marca estado, no ánimo", en: "Marks state, not mood" },
              {
                es: "Un emoji señala el estado de un mensaje: hecho, en curso, requiere atención. La calidez la lleva la oración, no el ícono.",
                en: "An emoji signals the state of a message — done, in progress, needs attention. Warmth is carried by the sentence, not by the icon.",
              },
              {
                es: 'Un emoji de estado abriendo "Tu envío está en camino" ✓',
                en: 'A state emoji opening "Tu envío está en camino" ✓',
              },
            ],
            [
              {
                es: "Uno por mensaje, al inicio",
                en: "One per message, at the start",
              },
              {
                es: "Máximo un emoji, anclado al inicio de la línea que califica. Nunca disperso a mitad de oración ni junto a un monto, donde compite con la cifra que el usuario vino a verificar.",
                en: "Maximum one emoji, anchored at the start of the line it qualifies. Never scattered mid-sentence and never adjacent to an amount, where it competes with the figure the user came to verify.",
              },
              {
                es: "Un emoji a cada lado del monto ✗",
                en: "An emoji on either side of the amount ✗",
              },
            ],
            [
              { es: "Nunca carga el significado", en: "Never load-bearing" },
              {
                es: "Un emoji nunca lleva un significado que el texto no lleve también. El renderizado varía entre dispositivos y los lectores de pantalla los anuncian literalmente.",
                en: "An emoji never carries meaning the text does not also carry. Rendering differs across devices and screen readers announce them literally.",
              },
              {
                es: "Un emoji en lugar de la palabra de estado ✗",
                en: "An emoji in place of the status word ✗",
              },
            ],
            [
              { es: "Contextos prohibidos", en: "Prohibited contexts" },
              {
                es: "Sin emojis en transacciones fallidas, copy de KYC o compliance, avisos legales, derivación a un agente humano o estados de falla parcial. Junto a dinero demorado o retenido, un emoji se lee como minimizar el problema.",
                en: "No emoji in failed transactions, KYC or compliance copy, legal disclosures, handoff to a human agent, or partial-failure states. Next to money that is late or held, an emoji reads as minimizing the problem.",
              },
              {
                es: "Error que involucra fondos ✗",
                en: "Error involving funds ✗",
              },
            ],
            [
              { es: "No en etiquetas de botón", en: "Not in button labels" },
              {
                es: "Las etiquetas tienen un tope de 20 caracteres con espacios (ver guías de Voz y Tono). Un emoji gasta caracteres y se renderiza de forma inconsistente entre clientes.",
                en: "Labels are capped at 20 characters including spaces (see Voice & Tone guidelines). An emoji spends characters and renders inconsistently across clients.",
              },
              { es: "-", en: "-" },
            ],
          ],
        },
      ],
    },
    {
      id: "guidelines",
      label: { es: "Guías", en: "Guidelines", pt: "Diretrizes" },
      blocks: [
        {
          type: "heading",
          text: { es: "Conjunto aprobado de emojis", en: "Approved emoji set" },
        },
        {
          type: "prose",
          text: {
            es: "Un conjunto cerrado mapeado a tipos de mensaje. Las reglas de la tabla anterior valen sin importar qué emojis estén en el conjunto; esta sección define el conjunto y su mapeo.",
            en: "A closed set mapped to message types. The rules in the table above hold regardless of which emoji are in the set; this section defines the set and its mapping.",
          },
        },
        {
          type: "callout",
          title: { es: "Criterios de selección.", en: "Selection criteria." },
          body: {
            es: "Cada emoji del conjunto es un solo codepoint con presentación de emoji por defecto: sin selector de variación (U+FE0F), sin tono de piel, sin género, sin secuencia ZWJ.",
            en: "Every emoji in the set is a single codepoint with default emoji presentation — no variation selector (U+FE0F), no skin tone, no gender, no ZWJ sequence.",
          },
        },
        {
          type: "table",
          columns: [
            { es: "Tipo de mensaje", en: "Message type" },
            { es: "Emoji", en: "Emoji" },
            { es: "Codepoint", en: "Codepoint" },
            { es: "Aplica a", en: "Applies to" },
            { es: "Por qué este", en: "Why this one" },
          ],
          rows: [
            [
              { es: "Éxito / completado", en: "Success / completed" },
              { es: "✅", en: "✅" },
              { es: "U+2705", en: "U+2705" },
              {
                es: "Transferencia entregada, identidad verificada, pago recibido",
                en: "Transfer delivered, identity verified, payment received",
              },
              {
                es: "Presentación nativa de emoji, sin selector de variación. Forma autocontenida, legible en tamaños pequeños, independiente del color de fondo",
                en: "Native emoji presentation, no variation selector. Self-contained shape, legible at small sizes, independent of background color",
              },
            ],
            [
              { es: "En curso", en: "In progress" },
              { es: "⏳", en: "⏳" },
              { es: "U+23F3", en: "U+23F3" },
              {
                es: "Transferencia en proceso, verificación en marcha",
                en: "Transfer processing, verification underway",
              },
              {
                es: "Marca el paso del tiempo, no la demora. ⏛ (U+231B) se lee como terminado; ⏰ se lee como una operación del sistema y no como un estado de la transferencia",
                en: "Marks time elapsing rather than delay. ⏛ (U+231B) reads as finished; ⏰ reads as a system operation rather than a transfer state",
              },
            ],
            [
              { es: "Requiere atención", en: "Needs attention" },
              { es: "⚠️", en: "⚠️" },
              { es: "U+1F514", en: "U+1F514" },
              {
                es: "Campo faltante, tasa por vencer, documento pendiente",
                en: "Missing field, rate about to expire, document pending",
              },
              {
                es: "Se lee como un recordatorio, no como una alarma. Reservado solo para estados accionables por el usuario, nunca para fallas: esas caen en contextos prohibidos",
                en: "Reads as a reminder, not an alarm. Reserved for user-actionable states only, never for failures — those fall under prohibited contexts",
              },
            ],
            [
              { es: "Información", en: "Information" },
              { es: "(ninguno)", en: "(none)" },
              { es: "—", en: "—" },
              {
                es: "Tasas, límites, detalles de corredor, copy de cómo funciona",
                en: "Rates, limits, corridor details, how-it-works copy",
              },
              {
                es: "La información es una categoría de contenido, no un estado de transacción. Un marcador en cada mensaje informativo deja de señalar y se vuelve decoración del párrafo",
                en: "Information is a content category, not a transaction state. A marker on every informational message stops signalling and becomes paragraph decoration",
              },
            ],
          ],
        },
        {
          type: "heading",
          text: { es: "Banderas de países", en: "Country flags" },
        },
        {
          type: "prose",
          text: {
            es: "Las banderas están permitidas, pero no son emojis de estado y no participan del mapeo anterior.",
            en: "Flags are permitted, but they are not state emoji and do not participate in the mapping above.",
          },
        },
        {
          type: "table",
          columns: [
            { es: "Regla", en: "Rule" },
            { es: "Estándar", en: "Standard" },
          ],
          rows: [
            [
              {
                es: "Etiqueta un destino, no un estado",
                en: "Labels a destination, not a state",
              },
              {
                es: "Una bandera identifica un corredor o un país. Nunca sustituye a un emoji de estado ni aparece junto a uno en el mismo mensaje",
                en: "A flag identifies a corridor or country. It never substitutes for, or appears alongside, a state emoji in the same message",
              },
            ],
            [
              {
                es: "Una por línea, en contextos de lista",
                en: "One per line, in list contexts",
              },
              {
                es: "Permitida en listas de selección de corredor y en etiquetas de país, donde cada bandera va en su propia línea. No permitida a mitad de oración en prosa",
                en: "Permitted in corridor selection lists and country labels, where each flag sits on its own line. Not permitted mid-sentence in prose",
              },
            ],
            [
              {
                es: "Nunca junto a un monto",
                en: "Never adjacent to an amount",
              },
              {
                es: "Misma restricción que los emojis de estado. Una bandera junto a una cifra compite con el número que el usuario vino a verificar",
                en: "Same constraint as state emoji. A flag next to a figure competes with the number the user came to verify",
              },
            ],
            [
              {
                es: "Nunca una señal de idioma",
                en: "Never a language signal",
              },
              {
                es: "Una bandera marca a dónde va el dinero. No marca qué idioma lee el usuario, dónde vive ni la nacionalidad del destinatario",
                en: "A flag marks where the money is going. It does not mark what language the user reads, where the user lives, or the recipient's nationality",
              },
            ],
          ],
        },
        {
          type: "prose",
          text: {
            es: "Corredores soportados: 🇲🇽 MX · 🇨🇴 CO · 🇬🇹 GT · 🇻🇪 VE · 🇧🇷 BR · 🇨🇷 CR",
            en: "Supported corridors: 🇲🇽 MX · 🇨🇴 CO · 🇬🇹 GT · 🇻🇪 VE · 🇧🇷 BR · 🇨🇷 CR",
          },
        },
        {
          type: "prose",
          text: {
            es: "Las banderas son dos símbolos indicadores regionales y no un solo codepoint (MX = U+1F1F2 U+1F1FD). Se renderizan como la bandera esperada en los clientes móviles de WhatsApp y caen a un código de dos letras en algunas superficies de escritorio y web. Confirma el renderizado en las superficies objetivo antes de lanzar un flujo que dependa de ellas.",
            en: "Flags are two regional indicator symbols rather than a single codepoint (MX = U+1F1F2 U+1F1FD). They render as the intended flag on mobile WhatsApp clients and fall back to a two-letter code on some desktop and web surfaces. Confirm rendering on target surfaces before shipping a flow that depends on them.",
          },
        },
        {
          type: "table",
          columns: [
            { es: "Excluidos", en: "Excluded" },
            { es: "Motivo", en: "Reason" },
          ],
          rows: [
            [
              { es: "⚠️  ❗️  ❌", en: "⚠️  ❗️  ❌" },
              {
                es: "Escalan a alarma. Donde la advertencia sería precisa, los emojis ya están prohibidos",
                en: "Escalate to alarm. Where the warning would be accurate, emoji are already prohibited",
              },
            ],
            [
              { es: "💰  💵  💸  🤑", en: "💰  💵  💸  🤑" },
              {
                es: "Prohibidos junto a montos por la regla anterior. El registro además celebra el dinero en un producto donde enviar suele ser una obligación, no un logro",
                en: "Prohibited next to amounts by the rule above. The register also celebrates money in a product where sending is usually an obligation, not an achievement",
              },
            ],
            [
              { es: "🎉  🥳  🙌  👏", en: "🎉  🥳  🙌  👏" },
              {
                es: "Celebrar una transferencia completada enmarca un deber cumplido como una victoria",
                en: "Celebration on a completed transfer frames a duty fulfilled as a win",
              },
            ],
            [
              { es: "👍  👉  🤷", en: "👍  👉  🤷" },
              {
                es: "Variantes de tono de piel y género; secuencias de varios codepoints",
                en: "Skin tone and gender variants; multi-codepoint sequences",
              },
            ],
            [
              { es: "❤️  💚  🏡  👥", en: "❤️  💚  🏡  👥" },
              {
                es: "Ánimo, no estado. Instrumentaliza la relación familiar",
                en: "Mood, not state. Instrumentalizes the family relationship",
              },
            ],
          ],
        },
        {
          type: "heading",
          text: { es: "Implementación", en: "Implementation" },
        },
        {
          type: "prose",
          text: {
            es: "El emoji pertenece al estado del mensaje, no al idioma. Se guarda como un token (global.icon.success, global.icon.pending, global.icon.action) y se concatena en la capa de plantilla, nunca embebido dentro de una cadena traducible. Embeberlo implica que el carácter puede alterarse o perderse por locale, y se duplica en cada cadena que lleve ese estado.",
            en: "The emoji belongs to the message state, not to the language. It is stored as a token — global.icon.success, global.icon.pending, global.icon.action — and concatenated at the template layer, never embedded inside a translatable string. Embedding it means the character can be altered or dropped per locale, and duplicates across every string carrying that state.",
          },
        },
        {
          type: "callout",
          title: { es: "Señal de validación:", en: "Validation signal —" },
          body: {
            es: "Mayormente cualitativa. No hay un evento limpio para el uso de emojis: las grabaciones de sesión y los tickets de CX son la evidencia disponible, no una métrica.",
            en: "Mostly qualitative. There is no clean event for emoji use — session recordings and CX tickets are the available evidence, not a metric.",
          },
        },
      ],
    },
  ],
};

// ─── Patrones del mapa que todavía no tienen contenido ───────────────────────

/* Están en el directorio de Figma con nombre propio pero sin copy escrita, así
   que se listan sin enlace en lugar de publicar descripciones de relleno.
   El reparto de familias es provisional: Michelle va a ir indicando a cuál
   pertenece cada uno a medida que los escriba. */
const UPCOMING: PatternStub[] = [
  {
    slug: "confirmation-step",
    name: { es: "Confirmation Step", en: "Confirmation Step" },
    family: "interaction",
    comingSoon: true,
  },
  {
    slug: "error-recovery",
    name: { es: "Error Recovery", en: "Error Recovery" },
    family: "interaction",
    comingSoon: true,
  },
  {
    slug: "system-feedback",
    name: { es: "System Feedback", en: "System Feedback" },
    family: "interaction",
    comingSoon: true,
  },
  {
    slug: "contextual-routing",
    name: { es: "Contextual Routing", en: "Contextual Routing" },
    family: "conversational",
    comingSoon: true,
  },
  {
    slug: "escalation-path",
    name: { es: "Escalation Path", en: "Escalation Path" },
    family: "conversational",
    comingSoon: true,
  },
  {
    slug: "session-handoff",
    name: { es: "Session Handoff", en: "Session Handoff" },
    family: "conversational",
    comingSoon: true,
  },
];

/** Registro. El orden aquí es el orden de la grilla en la landing. */
export const PATTERNS: Pattern[] = [
  closedInput,
  openInput,
  mixedInput,
  useOfEmojis,
];

export const getPattern = (slug: string): Pattern | undefined =>
  PATTERNS.find((p) => p.slug === slug);

/** Los otros patrones, para la sección "Explorar patrones" de cada página. */
export const otherPatterns = (slug: string): Pattern[] =>
  PATTERNS.filter((p) => p.slug !== slug);

/** Todo lo que muestra la grilla del directorio, publicado y pendiente. */
export const DIRECTORY: DirectoryEntry[] = [...PATTERNS, ...UPCOMING];
