import type { Pattern, PatternSection, StandardContent } from "./types";
import { standardSections } from "./blocks";

const ASSETS = "/assets/patterns";

const WA_LIST_DOCS_URL =
  "https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/interactive-list-messages";

// ─── Entrada cerrada ─────────────────────────────────────────────────────────

const closedInput: Pattern = {
  slug: "closed-input",
  family: "interaction",
  name: { es: "Closed Input", en: "Closed Input", pt: "Closed Input" },
  lede: {
    es: "Botones o una lista cuando el conjunto de respuestas posibles se conoce. El usuario elige; nunca tiene que adivinar cómo escribirlo.",
    en: "Buttons or a list when the set of possible answers is known. The user picks; they never have to guess the wording.",
    pt: "Botões ou uma lista quando o conjunto de respostas possíveis é conhecido. O usuário escolhe; nunca precisa adivinhar como escrever.",
  },
  cardBody: {
    es: "Botones o una lista cuando el conjunto de respuestas posibles se conoce. El usuario elige; nunca tiene que adivinar cómo escribirlo.",
    en: "Buttons or a list when the set of possible answers is known. The user picks; they never have to guess the wording.",
    pt: "Botões ou uma lista quando o conjunto de respostas possíveis é conhecido. O usuário escolhe; nunca precisa adivinhar como escrever.",
  },
  hero: `${ASSETS}/closed-input-hero.png`,
  heroDetail: [`${ASSETS}/closed-input-hero.png`],
  heroAlt: {
    es: "Pantalla de WhatsApp mostrando una pregunta con botones de respuesta",
    en: "WhatsApp screen showing a question with reply buttons",
    pt: "Tela do WhatsApp mostrando uma pergunta com botões de resposta",
  },

  sections: standardSections({
    overview: {
      usage: [
        {
          es: "Usa botones cuando hay de 1 a 3 opciones conocidas.",
          en: "Use buttons when there are 1 to 3 known options.",
          pt: "Use botões quando há de 1 a 3 opções conhecidas.",
        },
        {
          es: "Usa una lista cuando hay de 4 a 10 opciones conocidas.",
          en: "Use a list when there are 4 to 10 known options.",
          pt: "Use uma lista quando há de 4 a 10 opções conhecidas.",
        },
        {
          es: "Más de 10 opciones: repiensa la pregunta, es demasiado amplia para un solo paso.",
          en: "Beyond 10 options, rethink the question, it is too broad for a single step.",
          pt: "Mais de 10 opções: repense a pergunta, ela é ampla demais para um único passo.",
        },
        {
          es: "Nunca hagas que el usuario adivine cómo escribir algo de un conjunto que ya conoces.",
          en: "Never make the user guess the wording for a set you already know.",
          pt: "Nunca faça o usuário adivinhar como escrever algo de um conjunto que você já conhece.",
        },
      ],
      metric: {
        title: {
          es: "Por qué funciona",
          en: "Why this works",
          pt: "Por que funciona",
        },
        body: [
          {
            es: "La entrada cerrada mantiene las respuestas no clasificables cerca de cero, mientras que el texto libre genera la mayoría de las fallas del bot (`NOT_ASSIGNED_YET` = 64% del total de fallas). Los botones sostienen el flujo de modificación: ahí el texto libre es apenas 1,6%.",
            en: "Closed input keeps unclassifiable answers near zero, where open text drives the majority of bot failures (`NOT_ASSIGNED_YET` = 64% of failures overall). Buttons carry the modify flow: free text there is only 1.6%.",
            pt: "A entrada fechada mantém as respostas não classificáveis perto de zero, enquanto o texto livre gera a maioria das falhas do bot (`NOT_ASSIGNED_YET` = 64% do total de falhas). Os botões sustentam o fluxo de modificação: ali o texto livre é só 1,6%.",
          },
        ],
        note: {
          es: "Por medir: ratio de taps en botón vs. escritura, y abandono en este paso. Ver el mapa de cruce con Amplitude.",
          en: "To pull: button-tap vs typed ratio and abandonment at this step. See the Amplitude cross-check map.",
          pt: "A medir: proporção de toques em botão vs. digitação, e abandono neste passo. Ver o mapa de cruzamento com o Amplitude.",
        },
      },
    },

    specs: {
      intro: {
        es: "Los límites de WhatsApp que definen este patrón. Diseña dentro de ellos.",
        en: "The WhatsApp limits that define this pattern. Design within them.",
        pt: "Os limites do WhatsApp que definem este padrão. Projete dentro deles.",
      },
      tables: [
        {
          heading: {
            es: "Botones de respuesta",
            en: "Reply buttons",
            pt: "Botões de resposta",
          },
          columns: [
            { es: "Componente", en: "Component", pt: "Componente" },
            { es: "Límite", en: "Spec", pt: "Limite" },
          ],
          rows: [
            [
              {
                es: "Botones por mensaje",
                en: "Buttons per message",
                pt: "Botões por mensagem",
              },
              { es: "Hasta 3", en: "Up to 3", pt: "Até 3" },
            ],
            [
              {
                es: "Etiqueta del botón",
                en: "Button label",
                pt: "Rótulo do botão",
              },
              {
                es: "Máx. 20 caracteres",
                en: "Max 20 characters",
                pt: "Máx. 20 caracteres",
              },
            ],
          ],
        },
        {
          heading: {
            es: "Mensaje de lista",
            en: "List message",
            pt: "Mensagem de lista",
          },
          columns: [
            { es: "Elemento", en: "Element", pt: "Elemento" },
            { es: "Límite", en: "Spec", pt: "Limite" },
          ],
          rows: [
            [
              { es: "Secciones", en: "Sections", pt: "Seções" },
              {
                es: "Hasta 10 secciones, hasta 10 filas en total entre todas las secciones",
                en: "Up to 10 sections, up to 10 rows total across all sections combined",
                pt: "Até 10 seções, até 10 linhas no total entre todas as seções",
              },
            ],
            [
              {
                es: "Botón (abre la lista)",
                en: "Button (opens the list)",
                pt: "Botão (abre a lista)",
              },
              {
                es: "Un botón, etiqueta máx. 20 caracteres",
                en: "One button, label max 20 characters",
                pt: "Um botão, rótulo de máx. 20 caracteres",
              },
            ],
            [
              { es: "Encabezado", en: "Header", pt: "Cabeçalho" },
              {
                es: "Opcional, solo texto, máx. 60 caracteres",
                en: "Optional, text only, max 60 characters",
                pt: "Opcional, só texto, máx. 60 caracteres",
              },
            ],
            [
              { es: "Cuerpo", en: "Body", pt: "Corpo" },
              {
                es: "Máx. 4.096 caracteres",
                en: "Max 4,096 characters",
                pt: "Máx. 4.096 caracteres",
              },
            ],
            [
              { es: "Pie", en: "Footer", pt: "Rodapé" },
              {
                es: "Opcional, máx. 60 caracteres",
                en: "Optional, max 60 characters",
                pt: "Opcional, máx. 60 caracteres",
              },
            ],
            [
              { es: "Título de fila", en: "Row title", pt: "Título da linha" },
              {
                es: "Máx. 24 caracteres",
                en: "Max 24 characters",
                pt: "Máx. 24 caracteres",
              },
            ],
            [
              {
                es: "Descripción de fila",
                en: "Row description",
                pt: "Descrição da linha",
              },
              {
                es: "Opcional, máx. 72 caracteres",
                en: "Optional, max 72 characters",
                pt: "Opcional, máx. 72 caracteres",
              },
            ],
          ],
        },
        {
          heading: {
            es: "Decisión: cómo preguntar",
            en: "Decision: how to ask",
            pt: "Decisão: como perguntar",
          },
          columns: [
            { es: "Opciones", en: "Options", pt: "Opções" },
            { es: "Patrón", en: "Pattern", pt: "Padrão" },
          ],
          rows: [
            [
              {
                es: "1 a 3 opciones",
                en: "1 to 3 options",
                pt: "1 a 3 opções",
              },
              {
                es: "Botones de respuesta",
                en: "Reply buttons",
                pt: "Botões de resposta",
              },
            ],
            [
              {
                es: "4 a 10 opciones",
                en: "4 to 10 options",
                pt: "4 a 10 opções",
              },
              {
                es: "Mensaje de lista",
                en: "List message",
                pt: "Mensagem de lista",
              },
            ],
            [
              { es: "Más de 10", en: "More than 10", pt: "Mais de 10" },
              {
                es: "Repensar el flujo",
                en: "Rethink the flow",
                pt: "Repensar o fluxo",
              },
            ],
          ],
        },
      ],
      source: {
        es: "Fuente: WhatsApp Cloud API, mensajes de lista interactivos (actualizado jul. 2026). ",
        en: "Source: WhatsApp Cloud API, interactive list messages (updated Jul 2026). ",
        pt: "Fonte: WhatsApp Cloud API, mensagens de lista interativas (atualizado em jul. 2026). ",
      },
      sourceHref: WA_LIST_DOCS_URL,
      sourceLinkText: "developers.facebook.com",
    },

    guidelines: {
      usage: {
        es: "Recurre a la entrada cerrada siempre que el conjunto de respuestas se conozca de antemano. Mantiene a la gente en un camino que el bot puede leer, y le saca la adivinanza a un paso que si no se trabaría.",
        en: "Reach for closed input whenever the set of answers is known in advance. It keeps people on a path the bot can read, and it takes the guesswork out of a step that would otherwise stall.",
        pt: "Recorra à entrada fechada sempre que o conjunto de respostas for conhecido de antemão. Ela mantém as pessoas em um caminho que o bot consegue ler e tira a adivinhação de um passo que, sem isso, travaria.",
      },
      tips: {
        es: "Escribe cada opción como la diría el usuario, no como la guarda el sistema. Mantén las etiquetas cortas, asegúrate de que ninguna se solape con otra, y ordénalas por frecuencia de uso o en una secuencia que ya tenga sentido (de menor a mayor monto, del destino más al menos común).",
        en: "Write each option the way the user would say it, not the way the system stores it. Keep the labels short, make sure no two overlap, and order them by how often they get picked or in a sequence that already makes sense (lowest to highest amount, most to least common destination).",
        pt: "Escreva cada opção como o usuário a diria, não como o sistema a guarda. Mantenha os rótulos curtos, garanta que nenhum se sobreponha a outro e ordene por frequência de uso ou em uma sequência que já faça sentido (do menor ao maior valor, do destino mais ao menos comum).",
      },
      examples: [
        {
          tone: "do",
          img: `${ASSETS}/closed-input-do-1.png`,
          alt: {
            es: "Pregunta de WhatsApp con las opciones conocidas como botones",
            en: "WhatsApp question offering the known options as reply buttons",
            pt: "Pergunta do WhatsApp com as opções conhecidas como botões",
          },
          caption: {
            es: "Ofrece las opciones conocidas como botones. Un tap, sin escribir.",
            en: "Offer the known options as buttons. One tap, no typing.",
            pt: "Ofereça as opções conhecidas como botões. Um toque, sem digitar.",
          },
        },
        {
          tone: "dont",
          img: `${ASSETS}/closed-input-dont-1.png`,
          alt: {
            es: "Pregunta de WhatsApp dejando un conjunto conocido como texto abierto",
            en: "WhatsApp question leaving a known set as open text",
            pt: "Pergunta do WhatsApp deixando um conjunto conhecido como texto aberto",
          },
          caption: {
            es: "No dejes un conjunto conocido como texto abierto. La respuesta se vuelve difícil de interpretar.",
            en: "Don't leave a known set as open text. The reply gets hard to parse.",
            pt: "Não deixe um conjunto conhecido como texto aberto. A resposta fica difícil de interpretar.",
          },
        },
        {
          tone: "do",
          img: `${ASSETS}/closed-input-do-2.png`,
          alt: {
            es: "Pregunta de WhatsApp usando un mensaje de lista para más de tres opciones",
            en: "WhatsApp question using a list message for more than three options",
            pt: "Pergunta do WhatsApp usando uma mensagem de lista para mais de três opções",
          },
          caption: {
            es: "Usa una lista cuando hay más de 3 opciones.",
            en: "Use a list when there are more than 3 options.",
            pt: "Use uma lista quando há mais de 3 opções.",
          },
        },
        {
          tone: "dont",
          img: `${ASSETS}/closed-input-dont-2.png`,
          alt: {
            es: "Pregunta de WhatsApp amontonando muchas opciones en un solo mensaje",
            en: "WhatsApp question cramming many options into a single message",
            pt: "Pergunta do WhatsApp amontoando muitas opções em uma única mensagem",
          },
          caption: {
            es: "No amontones muchas opciones en un mensaje ni en botones.",
            en: "Don't cram many options into one message or into buttons.",
            pt: "Não amontoe muitas opções em uma mensagem nem em botões.",
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
  name: { es: "Open Input", en: "Open Input", pt: "Open Input" },
  lede: {
    es: "Una pregunta que se responde con texto libre, para cuando la respuesta no se puede listar de antemano (un nombre, un monto a medida, una ciudad). El usuario escribe, y el bot tiene que leer lo que venga.",
    en: "A question answered with free text, for when the answer can't be listed in advance (a name, a custom amount, a city). The user types, and the bot has to read whatever comes back.",
    pt: "Uma pergunta respondida com texto livre, para quando a resposta não pode ser listada de antemão (um nome, um valor personalizado, uma cidade). O usuário digita, e o bot precisa ler o que vier.",
  },
  cardBody: {
    es: "Una pregunta que se responde con texto libre, para cuando la respuesta no se puede listar de antemano (un nombre, un monto a medida, una ciudad). El usuario escribe, y el bot tiene que leer lo que venga.",
    en: "A question answered with free text, for when the answer can't be listed in advance (a name, a custom amount, a city). The user types, and the bot has to read whatever comes back.",
    pt: "Uma pergunta respondida com texto livre, para quando a resposta não pode ser listada de antemão (um nome, um valor personalizado, uma cidade). O usuário digita, e o bot precisa ler o que vier.",
  },
  hero: `${ASSETS}/open-input-hero-a.png`,
  heroDetail: [
    `${ASSETS}/open-input-hero-a.png`,
    `${ASSETS}/open-input-hero-b.png`,
  ],
  heroAlt: {
    es: "Pantalla de WhatsApp preguntando a quién enviar dinero, con una pista de formato y un ejemplo",
    en: "WhatsApp screen asking who to send money to, with a format hint and a worked example",
    pt: "Tela do WhatsApp perguntando para quem enviar dinheiro, com uma dica de formato e um exemplo",
  },

  sections: standardSections({
    overview: {
      usage: [
        {
          es: "Usa entrada abierta solo cuando el conjunto de respuestas es genuinamente impredecible (un nombre completo, un monto a medida, una ciudad libre).",
          en: "Use open input only when the set of answers is genuinely unpredictable (a full name, a custom amount, a free city).",
          pt: "Use entrada aberta só quando o conjunto de respostas é genuinamente imprevisível (um nome completo, um valor personalizado, uma cidade livre).",
        },
        {
          es: "Si las respuestas se conocen, usa entrada cerrada (botones para 1 a 3, una lista para 4 a 10).",
          en: "If the answers are known, use Closed input instead (buttons for 1 to 3, a list for 4 to 10).",
          pt: "Se as respostas são conhecidas, use entrada fechada (botões para 1 a 3, uma lista para 4 a 10).",
        },
        {
          es: "Acompaña siempre la pregunta con una pista de formato, para que el usuario sepa cómo responder.",
          en: "Always pair the question with a format hint, so the user knows how to answer.",
          pt: "Acompanhe sempre a pergunta com uma dica de formato, para que o usuário saiba como responder.",
        },
        {
          es: "Pregunta una sola cosa por mensaje. Dos preguntas en una burbuja duplican las formas de malinterpretar la respuesta.",
          en: "Ask one thing per message. Two questions in one bubble double the ways a reply can be misread.",
          pt: "Pergunte uma só coisa por mensagem. Duas perguntas em um balão dobram as formas de interpretar mal a resposta.",
        },
        {
          es: 'Muestra un ejemplo resuelto ("Ejemplo: Juan Pérez López") las primeras una o dos veces que el usuario llega a este paso, y retíralo cuando el patrón ya se aprendió. Cuándo dejar de mostrarlo está por definirse.',
          en: 'Show a worked example ("Ejemplo: Juan Pérez López") the first one or two times a user reaches this step, then retire it once the pattern is learned. When exactly to stop showing it is TBD.',
          pt: 'Mostre um exemplo resolvido ("Ejemplo: Juan Pérez López") nas primeiras uma ou duas vezes que o usuário chega a este passo, e retire quando o padrão já foi aprendido. Quando parar de mostrar ainda está por definir.',
        },
      ],
      metric: {
        title: {
          es: "Por qué funciona",
          en: "Why this works",
          pt: "Por que funciona",
        },
        body: [
          {
            es: "El texto abierto es inevitable cuando el espacio de respuestas no tiene límite, pero también es donde el bot falla más. Las respuestas sin clasificar (`NOT_ASSIGNED_YET`) son el 64% de todas las fallas del bot, y el paso de mayor fricción que tenemos (cuenta bancaria) está en 129s de mediana, ambos empujados por la entrada libre. La pista de formato y el ejemplo de la primera vez existen para bajar esos números.",
            en: "Open text is unavoidable when the answer space is unbounded, but it is also where the bot fails most. Unclassified replies (`NOT_ASSIGNED_YET`) are 64% of all bot failures, and the highest-friction step we have (bank account) sits at a 129s median, both driven by free-form entry. The format hint and the first-run example exist to pull those numbers down.",
            pt: "O texto aberto é inevitável quando o espaço de respostas não tem limite, mas também é onde o bot mais falha. As respostas sem classificar (`NOT_ASSIGNED_YET`) são 64% de todas as falhas do bot, e o passo de maior atrito que temos (conta bancária) está em 129 s de mediana, ambos puxados pela entrada livre. A dica de formato e o exemplo da primeira vez existem para baixar esses números.",
          },
        ],
        note: {
          es: "Por medir: tasa de parseo exitoso en el paso, mediana de tiempo en el paso (comparada contra los 129s del paso de cuenta bancaria), y tasa de loop o abandono. Para la variante con ejemplo, comparar parseo y tiempo con la pista visible vs. oculta, para decidir cuánto tiempo seguir mostrándola.",
          en: "To pull: parse-success rate at the step, median time at step (benchmark against the 129s bank-account step), and loop or abandon rate. For the example variant, compare parse-success and time at step with the hint shown vs hidden, to decide how long to keep showing it.",
          pt: "A medir: taxa de parse bem-sucedido no passo, mediana de tempo no passo (comparada com os 129 s do passo de conta bancária) e taxa de loop ou abandono. Para a variante com exemplo, comparar parse e tempo com a dica visível vs. oculta, para decidir por quanto tempo continuar mostrando.",
        },
      },
    },

    specs: {
      intro: {
        es: "Los límites de WhatsApp que definen este patrón.",
        en: "The WhatsApp limits that define this pattern.",
        pt: "Os limites do WhatsApp que definem este padrão.",
      },
      tables: [
        {
          heading: {
            es: "Mensaje de texto",
            en: "Text message",
            pt: "Mensagem de texto",
          },
          columns: [
            { es: "Componente", en: "Component", pt: "Componente" },
            { es: "Límite", en: "Spec", pt: "Limite" },
          ],
          rows: [
            [
              {
                es: "Cuerpo del mensaje",
                en: "Prompt message body",
                pt: "Corpo da mensagem",
              },
              {
                es: "Hasta 4.096 caracteres",
                en: "Up to 4,096 characters",
                pt: "Até 4.096 caracteres",
              },
            ],
            [
              {
                es: "Componente interactivo",
                en: "Interactive component",
                pt: "Componente interativo",
              },
              {
                es: "Ninguno (mensaje de texto plano)",
                en: "None (plain text message)",
                pt: "Nenhum (mensagem de texto simples)",
              },
            ],
            [
              {
                es: "Respuesta del usuario",
                en: "User reply",
                pt: "Resposta do usuário",
              },
              {
                es: "Texto libre, sin payload estructurado",
                en: "Free-form text, no structured payload",
                pt: "Texto livre, sem payload estruturado",
              },
            ],
            [
              { es: "Validación", en: "Validation", pt: "Validação" },
              {
                es: "Ninguna del lado de WhatsApp; el bot parsea el texto crudo",
                en: "None on WhatsApp's side; the bot parses the raw text",
                pt: "Nenhuma do lado do WhatsApp; o bot faz o parse do texto bruto",
              },
            ],
            [
              {
                es: "Ventana de respuesta libre",
                en: "Free-form reply window",
                pt: "Janela de resposta livre",
              },
              {
                es: "Solo dentro de la ventana de atención de 24 horas; fuera de ella se reabre con una plantilla",
                en: "Only inside the 24-hour customer service window; outside it you reopen with a template",
                pt: "Só dentro da janela de atendimento de 24 horas; fora dela, reabre com um template",
              },
            ],
          ],
        },
        {
          heading: { es: "Casos de uso", en: "Use cases", pt: "Casos de uso" },
          columns: [
            { es: "Respuesta", en: "Answer", pt: "Resposta" },
            { es: "Patrón", en: "Pattern", pt: "Padrão" },
          ],
          rows: [
            [
              {
                es: "Sin límite (nombre como en el documento, monto a medida, ciudad libre)",
                en: "Unbounded (name as on document, custom amount, free city)",
                pt: "Sem limite (nome como no documento, valor personalizado, cidade livre)",
              },
              {
                es: "Entrada abierta (texto libre)",
                en: "Open input (free text)",
                pt: "Entrada aberta (texto livre)",
              },
            ],
            [
              {
                es: "Conjunto conocido, 1 a 3",
                en: "Known set, 1 to 3",
                pt: "Conjunto conhecido, 1 a 3",
              },
              {
                es: "Botones de respuesta (ver entrada cerrada)",
                en: "Reply buttons (see Closed input)",
                pt: "Botões de resposta (ver entrada fechada)",
              },
            ],
            [
              {
                es: "Conjunto conocido, 4 a 10",
                en: "Known set, 4 to 10",
                pt: "Conjunto conhecido, 4 a 10",
              },
              {
                es: "Mensaje de lista (ver entrada cerrada)",
                en: "List message (see Closed input)",
                pt: "Mensagem de lista (ver entrada fechada)",
              },
            ],
          ],
        },
      ],
      notes: [
        {
          es: 'Sobre la línea de ejemplo: los mensajes de texto de WhatsApp no tienen campo de placeholder ni de ejemplo. La pista "Ejemplo:" es copy dentro del cuerpo del mensaje, así que mostrarla solo en la primera o segunda vez es lógica del bot, no una función de la plataforma.',
          en: 'Note on the example line: WhatsApp text messages have no placeholder or example field. The "Ejemplo:" hint is copy inside the message body, so showing it only on the first or second run is bot logic, not a platform feature.',
          pt: 'Sobre a linha de exemplo: as mensagens de texto do WhatsApp não têm campo de placeholder nem de exemplo. A dica "Ejemplo:" é copy dentro do corpo da mensagem, então mostrá-la só na primeira ou segunda vez é lógica do bot, não um recurso da plataforma.',
        },
      ],
      source: {
        es: "Fuente: WhatsApp Cloud API, mensajes de texto y la ventana de atención de 24 horas. Confirmar en ",
        en: "Source: WhatsApp Cloud API, text messages and the 24-hour customer service window. Confirm on ",
        pt: "Fonte: WhatsApp Cloud API, mensagens de texto e a janela de atendimento de 24 horas. Confirmar em ",
      },
      sourceHref: "https://developers.facebook.com",
      sourceLinkText: "developers.facebook.com",
    },

    guidelines: {
      usage: {
        es: "Recurre a la entrada abierta solo cuando realmente no puedes enumerar las respuestas. Cada paso abierto es un lugar donde el bot puede malinterpretar, entrar en loop o perder al usuario, así que la vara para usarlo debería ser alta.",
        en: "Reach for open input only when you truly can't enumerate the answers. Every open step is a place the bot can misread, loop, or lose the user, so the bar for using it should be high.",
        pt: "Recorra à entrada aberta só quando realmente não puder enumerar as respostas. Cada passo aberto é um lugar onde o bot pode interpretar mal, entrar em loop ou perder o usuário, então a régua para usá-lo deve ser alta.",
      },
      tips: {
        es: "Empieza con la pregunta, después la pista de formato en su propia línea, y después el ejemplo. Mantén la pista concreta y en las palabras del usuario. Si te encuentras escribiendo una pista que lista las respuestas válidas, es señal de que el paso debería ser entrada cerrada, no abierta.",
        en: "Lead with the question, then the format hint on its own line, then the example. Keep the hint concrete and in the user's own words. If you find yourself writing a hint that lists the valid answers, that is a sign the step should be closed input, not open.",
        pt: "Comece com a pergunta, depois a dica de formato em sua própria linha, e depois o exemplo. Mantenha a dica concreta e nas palavras do usuário. Se você se pegar escrevendo uma dica que lista as respostas válidas, é sinal de que o passo deveria ser entrada fechada, não aberta.",
      },
      examples: [
        {
          tone: "do",
          img: `${ASSETS}/open-input-do-1.png`,
          alt: {
            es: "Pregunta de WhatsApp con una pista de formato clara y un ejemplo resuelto",
            en: "WhatsApp question with a clear format hint and a worked example",
            pt: "Pergunta do WhatsApp com uma dica de formato clara e um exemplo resolvido",
          },
          caption: {
            es: "Una sola pregunta, una pista clara y un ejemplo para la primera vez.",
            en: "One question, a clear hint, and a first-run example.",
            pt: "Uma só pergunta, uma dica clara e um exemplo para a primeira vez.",
          },
        },
        {
          tone: "dont",
          img: `${ASSETS}/open-input-dont-1.png`,
          alt: {
            es: "Mensaje de WhatsApp con dos preguntas apiladas en una sola burbuja",
            en: "WhatsApp message with two questions stacked in one bubble",
            pt: "Mensagem do WhatsApp com duas perguntas empilhadas em um único balão",
          },
          caption: {
            es: "No pidas texto abierto para algo que podrías ofrecer como opciones.",
            en: "Don't ask open text for something you could offer as options.",
            pt: "Não peça texto aberto para algo que você poderia oferecer como opções.",
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
  name: { es: "Mixed input", en: "Mixed input", pt: "Mixed input" },
  subtitle: {
    es: "Closed and open",
    en: "Closed and open",
    pt: "Closed and open",
  },
  lede: {
    es: "Una pregunta que ofrece las respuestas más comunes como botones y todavía deja escribir la propia. Un camino rápido para la mayoría, una puerta abierta para la cola larga.",
    en: "A question that offers the most common answers as buttons and still lets the user type their own. A fast path for the majority, an open door for the long tail.",
    pt: "Uma pergunta que oferece as respostas mais comuns como botões e ainda deixa digitar a própria. Um caminho rápido para a maioria, uma porta aberta para a cauda longa.",
  },
  cardBody: {
    es: "Una pregunta que ofrece las respuestas más comunes como botones y todavía deja escribir la propia. Un camino rápido para la mayoría, una puerta abierta para la cola larga.",
    en: "A question that offers the most common answers as buttons and still lets the user type their own. A fast path for the majority, an open door for the long tail.",
    pt: "Uma pergunta que oferece as respostas mais comuns como botões e ainda deixa digitar a própria. Um caminho rápido para a maioria, uma porta aberta para a cauda longa.",
  },
  hero: `${ASSETS}/mixed-input-hero-a.png`,
  heroDetail: [
    `${ASSETS}/mixed-input-hero-a.png`,
    `${ASSETS}/mixed-input-hero-b.png`,
  ],
  heroAlt: {
    es: "Pantalla de WhatsApp con botones de montos comunes y la opción de escribir un monto propio",
    en: "WhatsApp screen with common amount buttons plus the option to type a custom amount",
    pt: "Tela do WhatsApp com botões de valores comuns e a opção de digitar um valor próprio",
  },

  sections: standardSections({
    overview: {
      usage: [
        {
          es: "Usa entrada mixta cuando unos pocos valores cubren a la mayoría pero no a todos (montos frecuentes de envío, ciudades habituales), y todavía quieres aceptar cualquier cosa fuera de los presets.",
          en: "Use mixed input when a few values cover most people but not everyone (common send amounts, frequent cities), and you still want to accept anything outside the presets.",
          pt: "Use entrada mista quando poucos valores cobrem a maioria mas não todos (valores frequentes de envio, cidades habituais), e você ainda quer aceitar qualquer coisa fora dos presets.",
        },
        {
          es: "Pon las 2 o 3 respuestas más comunes en botones. Deja el camino abierto para el resto.",
          en: "Put the 2 to 3 most common answers on buttons. Keep the open path for the rest.",
          pt: "Coloque as 2 ou 3 respostas mais comuns em botões. Deixe o caminho aberto para o resto.",
        },
        {
          es: 'Di los dos caminos en voz alta en el copy, por ejemplo "Puedes elegir una opción o escribir el monto que prefieras".',
          en: 'Say both paths out loud in the copy, for example "Puedes elegir una opción o escribir el monto que prefieras".',
          pt: 'Diga os dois caminhos em voz alta no copy, por exemplo "Puedes elegir una opción o escribir el monto que prefieras".',
        },
        {
          es: "WhatsApp siempre deja escribir, así que incluso un mensaje de solo botones es en realidad mixto. Diseña la respuesta escrita a propósito, no por accidente.",
          en: "WhatsApp always lets people type, so even a buttons-only message is really mixed. Design for the typed reply on purpose, not by accident.",
          pt: "O WhatsApp sempre deixa digitar, então até uma mensagem só de botões é, na prática, mista. Projete a resposta digitada de propósito, não por acidente.",
        },
      ],
      metric: {
        title: {
          es: "Por qué funciona",
          en: "Why this works",
          pt: "Por que funciona",
        },
        body: [
          {
            es: "Cuando se ofrecen botones, casi todos los usan: en el flujo de modificación, el texto libre se usó solo el 1,6% de las veces. La entrada mixta le da ese camino rápido a la mayoría y mantiene la puerta abierta para valores que no puedes predecir, sin forzar a todos a pasar por texto abierto propenso a errores.",
            en: "When buttons are offered, almost everyone takes them: in the modify flow, free text was used only 1.6% of the time. Mixed input gives that fast path to the majority while keeping the door open for values you can't predict, without forcing everyone through error-prone open text.",
            pt: "Quando botões são oferecidos, quase todo mundo os usa: no fluxo de modificação, o texto livre foi usado só 1,6% das vezes. A entrada mista dá esse caminho rápido à maioria e mantém a porta aberta para valores que você não consegue prever, sem forçar todo mundo a passar por texto aberto propenso a erros.",
          },
        ],
        note: {
          es: "Por medir: ratio de taps en botón vs. escritura en el paso, y completado vs. abandono por camino. Si el uso escrito se mantiene mínimo, los presets están bien; si sube, a los botones les falta una respuesta común.",
          en: "To pull: button-tap vs typed ratio at the step, and completion vs abandon per path. If typed usage stays tiny, the presets are right; if it climbs, the buttons are missing a common answer.",
          pt: "A medir: proporção de toques em botão vs. digitação no passo, e conclusão vs. abandono por caminho. Se o uso digitado se mantém mínimo, os presets estão certos; se sobe, falta uma resposta comum nos botões.",
        },
      },
    },

    specs: {
      intro: {
        es: "Los límites de WhatsApp que definen este patrón.",
        en: "The WhatsApp limits that define this pattern.",
        pt: "Os limites do WhatsApp que definem este padrão.",
      },
      tables: [
        {
          heading: {
            es: "Botones de respuesta",
            en: "Reply buttons",
            pt: "Botões de resposta",
          },
          columns: [
            { es: "Componente", en: "Component", pt: "Componente" },
            { es: "Límite", en: "Spec", pt: "Limite" },
          ],
          rows: [
            [
              {
                es: "Botones por mensaje",
                en: "Buttons per message",
                pt: "Botões por mensagem",
              },
              { es: "Hasta 3", en: "Up to 3", pt: "Até 3" },
            ],
            [
              {
                es: "Etiqueta del botón",
                en: "Button label",
                pt: "Rótulo do botão",
              },
              {
                es: "Máx. 20 caracteres",
                en: "Max 20 characters",
                pt: "Máx. 20 caracteres",
              },
            ],
          ],
        },
        {
          heading: {
            es: "Camino abierto",
            en: "Open path",
            pt: "Caminho aberto",
          },
          columns: [
            { es: "Componente", en: "Component", pt: "Componente" },
            { es: "Límite", en: "Spec", pt: "Limite" },
          ],
          rows: [
            [
              {
                es: "Respuesta del usuario",
                en: "User reply",
                pt: "Resposta do usuário",
              },
              {
                es: "Texto libre (hasta 4.096 caracteres), sin payload estructurado",
                en: "Free-form text (up to 4,096 characters), no structured payload",
                pt: "Texto livre (até 4.096 caracteres), sem payload estruturado",
              },
            ],
            [
              { es: "Validación", en: "Validation", pt: "Validação" },
              {
                es: "Ninguna; el bot parsea las respuestas escritas",
                en: "None; the bot parses typed replies",
                pt: "Nenhuma; o bot faz o parse das respostas digitadas",
              },
            ],
          ],
        },
        {
          heading: { es: "Casos de uso", en: "Use cases", pt: "Casos de uso" },
          columns: [
            { es: "Camino", en: "Path", pt: "Caminho" },
            { es: "Cuándo", en: "When", pt: "Quando" },
          ],
          rows: [
            [
              { es: "Botones", en: "Buttons", pt: "Botões" },
              {
                es: "Las 2 o 3 respuestas más frecuentes (camino rápido)",
                en: "The 2 to 3 most frequent answers (fast path)",
                pt: "As 2 ou 3 respostas mais frequentes (caminho rápido)",
              },
            ],
            [
              {
                es: "Pregunta abierta",
                en: "Open question",
                pt: "Pergunta aberta",
              },
              {
                es: "Cualquier valor fuera de los presets (cola larga)",
                en: "Any value outside the presets (long tail)",
                pt: "Qualquer valor fora dos presets (cauda longa)",
              },
            ],
            [
              {
                es: "Más de 3 presets comunes",
                en: "More than 3 common presets",
                pt: "Mais de 3 presets comuns",
              },
              {
                es: "Pasar la parte cerrada a un mensaje de lista",
                en: "Switch the closed part to a list message",
                pt: "Passar a parte fechada para uma mensagem de lista",
              },
            ],
          ],
        },
      ],
      notes: [
        {
          es: "WhatsApp no tiene un solo componente que combine botones con un campo de texto. La entrada mixta es un mensaje de botones de respuesta (o de lista) más el parseo deliberado de cualquier respuesta escrita.",
          en: "WhatsApp has no single component that combines buttons with a text field. Mixed input is a reply-buttons (or list) message plus deliberate parsing of any typed reply.",
          pt: "O WhatsApp não tem um único componente que combine botões com um campo de texto. A entrada mista é uma mensagem de botões de resposta (ou de lista) mais o parse deliberado de qualquer resposta digitada.",
        },
      ],
      source: {
        es: "Fuente: WhatsApp Cloud API, botones de respuesta interactivos y mensajes. Confirmar en ",
        en: "Source: WhatsApp Cloud API, interactive reply buttons and messages. Confirm on ",
        pt: "Fonte: WhatsApp Cloud API, botões de resposta interativos e mensagens. Confirmar em ",
      },
      sourceHref: "https://developers.facebook.com",
      sourceLinkText: "developers.facebook.com",
    },

    guidelines: {
      usage: {
        es: "Recurre a la entrada mixta cuando las respuestas comunes merecen un atajo de un tap pero la cola larga es real. Es el punto medio entre la entrada cerrada (todas las respuestas conocidas) y la abierta (ninguna conocida).",
        en: "Reach for mixed input when the common answers are worth a one-tap shortcut but the tail is real. It is the middle ground between closed input (all answers known) and open input (nothing known).",
        pt: "Recorra à entrada mista quando as respostas comuns merecem um atalho de um toque, mas a cauda longa é real. É o meio-termo entre a entrada fechada (todas as respostas conhecidas) e a aberta (nenhuma conhecida).",
      },
      tips: {
        es: "Nombra los presets que la gente realmente elige, en sus propias palabras, y ordénalos por frecuencia. Haz explícita la opción abierta en el copy, así escribir no se siente como romper el flujo. Mantén los botones en las respuestas top de verdad; si necesitas más de 3, pasa la parte cerrada a una lista.",
        en: "Name the presets people actually pick, in their own words, and order them by frequency. Make the open option explicit in the copy so typing doesn't feel like breaking the flow. Keep buttons to the true top answers; if you need more than 3, switch the closed part to a list.",
        pt: "Nomeie os presets que as pessoas realmente escolhem, nas palavras delas, e ordene por frequência. Deixe a opção aberta explícita no copy, assim digitar não parece quebrar o fluxo. Mantenha os botões nas respostas realmente mais escolhidas; se precisar de mais de 3, passe a parte fechada para uma lista.",
      },
      examples: [
        {
          tone: "do",
          img: `${ASSETS}/mixed-input-do-1.png`,
          alt: {
            es: "Pantalla de WhatsApp con botones de montos comunes y la invitación a escribir un monto propio",
            en: "WhatsApp screen with common amount buttons and an invitation to type a custom amount",
            pt: "Tela do WhatsApp com botões de valores comuns e o convite para digitar um valor próprio",
          },
          caption: {
            es: "Los montos comunes a un tap, y el monto a medida igual de bienvenido.",
            en: "Common amounts one tap away, a custom amount still welcome.",
            pt: "Os valores comuns a um toque, e o valor personalizado igualmente bem-vindo.",
          },
        },
        {
          tone: "dont",
          img: `${ASSETS}/mixed-input-dont-1.png`,
          alt: {
            es: "Pantalla de WhatsApp con seis botones de monto y la opción abierta escondida",
            en: "WhatsApp screen with six amount buttons and the open option buried",
            pt: "Tela do WhatsApp com seis botões de valor e a opção aberta escondida",
          },
          caption: {
            es: "No escondas el camino abierto, y no sobrecargues los botones.",
            en: "Don't hide the open path, and don't overload the buttons.",
            pt: "Não esconda o caminho aberto, e não sobrecarregue os botões.",
          },
        },
      ],
    },
  }),
};

// ─── Menu (list message) ─────────────────────────────────────────────────────

/* El brazo de lista de Closed input: botones para 1 a 3, menú de 4 en adelante.
   Misma forma estándar de tres subsecciones, más una galería de casos de uso al
   final de Specs (las tres pantallas de `user-cases-menu` en Figma).
   Los ejemplos de copy del bot quedan en español tal cual (son de producto). */
const menuSections: StandardContent = {
  overview: {
    usage: [
      {
        es: "Usa un menú cuando las opciones se conocen pero son más de 3, el punto donde los botones de respuesta se agotan (tienen un tope de 3). Es el brazo de lista de Closed input.",
        en: "Use a menu when the options are known but there are more than 3, the point where reply buttons run out (buttons cap at 3). This is the list arm of Closed input.",
        pt: "Use um menu quando as opções são conhecidas, mas são mais de 3, o ponto em que os botões de resposta se esgotam (o limite é 3). É o braço de lista do Closed input.",
      },
      {
        es: "Dale a cada fila un título corto que se sostenga solo. Agrega una línea de descripción solo cuando ayuda al usuario a distinguir filas o a decidir.",
        en: "Give each row a short, self-standing title. Add a description line only when it helps the user tell rows apart or decide.",
        pt: "Dê a cada linha um título curto que se sustente sozinho. Adicione uma linha de descrição só quando ajuda o usuário a distinguir linhas ou a decidir.",
      },
      {
        es: "Las filas pueden mezclarse: algunas con descripción y otras sin ella en la misma lista. La descripción es secundaria, así que úsala donde se gana su lugar, no en todas las filas.",
        en: "Rows can mix: some with a description, some without, in the same list. The description is secondary, so use it where it earns its place, not on every row.",
        pt: "As linhas podem se misturar: algumas com descrição e outras sem, na mesma lista. A descrição é secundária, então use onde ela ganha o seu lugar, não em todas as linhas.",
      },
      {
        es: "Cuando el conjunto tiene grupos naturales (por estado, por tipo), divídelo en secciones con título para que el usuario recorra por grupo en lugar de leer cada fila. Los títulos de sección son encabezados, no filas: mantenlos tan cortos como los títulos de fila.",
        en: "When the set has natural groups (by status, by type), split it into titled sections so the user scans by group instead of reading every row. Section titles are headers, not rows: keep them as short as row titles.",
        pt: "Quando o conjunto tem grupos naturais (por status, por tipo), divida em seções com título para que o usuário percorra por grupo em vez de ler cada linha. Os títulos de seção são cabeçalhos, não linhas: mantenha-os tão curtos quanto os títulos de linha.",
      },
      {
        es: 'Cuando el conjunto real es más largo de lo que entra en una lista, pagina ("Mis envíos" 1/3, 2/3, 3/3) con "Volver" y "Ver más envíos", y mantén una fila de escape como "No encuentro mi envío".',
        en: 'When the real set is longer than one list can hold, paginate ("Mis envíos" 1/3, 2/3, 3/3) with "Volver" and "Ver más envíos", and keep an escape row like "No encuentro mi envío".',
        pt: 'Quando o conjunto real é mais longo do que cabe em uma lista, pagine ("Mis envíos" 1/3, 2/3, 3/3) com "Volver" e "Ver más envíos", e mantenha uma linha de saída como "No encuentro mi envío".',
      },
      {
        es: "Si el conjunto es de 1 a 3, usa botones de respuesta. Si no tiene límite, usa Open input.",
        en: "If the set is 1 to 3, use reply buttons instead. If it is unbounded, use Open input.",
        pt: "Se o conjunto é de 1 a 3, use botões de resposta. Se não tem limite, use Open input.",
      },
    ],
    metric: {
      title: {
        es: "Por qué funciona",
        en: "Why this works",
        pt: "Por que funciona",
      },
      body: [
        {
          es: "Un menú mantiene analizable un conjunto conocido más largo: cada elección devuelve un payload estructurado, así que se mantiene fuera de las fallas de texto libre donde `NOT_ASSIGNED_YET` es el 64% de todas las fallas del bot. También sostiene los flujos donde el espacio de elección es real pero finito (modificar, beneficiario, método de entrega), los mismos flujos donde el texto abierto se traba.",
          en: "A menu keeps a longer known set parseable: every pick returns a structured payload, so it stays out of the free-text failures where `NOT_ASSIGNED_YET` is 64% of all bot failures. It also carries flows where the choice space is real but finite (modify, beneficiary, delivery method), the same flows where open text stalls.",
          pt: "Um menu mantém analisável um conjunto conhecido mais longo: cada escolha devolve um payload estruturado, então fica fora das falhas de texto livre em que `NOT_ASSIGNED_YET` é 64% de todas as falhas do bot. Também sustenta os fluxos em que o espaço de escolha é real mas finito (modificar, beneficiário, método de entrega), os mesmos fluxos em que o texto aberto trava.",
        },
      ],
      note: {
        es: 'Por medir: tasa de selección por fila y por posición (¿hay sesgo hacia la primera fila?), qué tan profundo paginan (proporción que llega a 2/3 y 3/3), con qué frecuencia tocan la fila de escape ("No encuentro mi envío") y el abandono dentro del menú.',
        en: 'To pull: selection rate per row and per position (is there a top-row bias), how deep people page (share reaching 2/3 and 3/3), how often they tap the escape row ("No encuentro mi envío"), and abandonment inside the menu.',
        pt: 'A medir: taxa de seleção por linha e por posição (há viés para a primeira linha?), quão fundo as pessoas paginam (proporção que chega a 2/3 e 3/3), com que frequência tocam a linha de saída ("No encuentro mi envío") e o abandono dentro do menu.',
      },
    },
  },

  specs: {
    intro: {
      es: "Los límites de WhatsApp que definen este patrón.",
      en: "The WhatsApp limits that define this pattern.",
      pt: "Os limites do WhatsApp que definem este padrão.",
    },
    tables: [
      {
        heading: {
          es: "Mensaje de lista",
          en: "List message",
          pt: "Mensagem de lista",
        },
        columns: [
          { es: "Componente", en: "Component", pt: "Componente" },
          { es: "Límite", en: "Spec", pt: "Limite" },
        ],
        rows: [
          [
            {
              es: "Filas, en total entre todas las secciones",
              en: "Rows, total across all sections",
              pt: "Linhas, no total entre todas as seções",
            },
            { es: "Hasta 10", en: "Up to 10", pt: "Até 10" },
          ],
          [
            { es: "Secciones", en: "Sections", pt: "Seções" },
            { es: "Hasta 10", en: "Up to 10", pt: "Até 10" },
          ],
          [
            { es: "Título de fila", en: "Row title", pt: "Título da linha" },
            {
              es: "Máx. 24 caracteres",
              en: "Max 24 characters",
              pt: "Máx. 24 caracteres",
            },
          ],
          [
            {
              es: "Descripción de fila (el texto de apoyo)",
              en: "Row description (the support text)",
              pt: "Descrição da linha (o texto de apoio)",
            },
            {
              es: "Opcional, máx. 72 caracteres",
              en: "Optional, max 72 characters",
              pt: "Opcional, máx. 72 caracteres",
            },
          ],
          [
            {
              es: "Título de sección",
              en: "Section title",
              pt: "Título de seção",
            },
            {
              es: "Máx. 24 caracteres",
              en: "Max 24 characters",
              pt: "Máx. 24 caracteres",
            },
          ],
          [
            {
              es: "Botón que abre la lista",
              en: "Button that opens the list",
              pt: "Botão que abre a lista",
            },
            {
              es: "Máx. 20 caracteres",
              en: "Max 20 characters",
              pt: "Máx. 20 caracteres",
            },
          ],
          [
            {
              es: "Encabezado, opcional, solo texto",
              en: "Header, optional, text only",
              pt: "Cabeçalho, opcional, só texto",
            },
            {
              es: "Máx. 60 caracteres",
              en: "Max 60 characters",
              pt: "Máx. 60 caracteres",
            },
          ],
          [
            { es: "Cuerpo", en: "Body", pt: "Corpo" },
            {
              es: "Máx. 4.096 caracteres",
              en: "Max 4,096 characters",
              pt: "Máx. 4.096 caracteres",
            },
          ],
          [
            {
              es: "Pie, opcional",
              en: "Footer, optional",
              pt: "Rodapé, opcional",
            },
            {
              es: "Máx. 60 caracteres",
              en: "Max 60 characters",
              pt: "Máx. 60 caracteres",
            },
          ],
          [
            {
              es: "Respuesta del usuario",
              en: "User reply",
              pt: "Resposta do usuário",
            },
            {
              es: "Payload estructurado (el id de la fila), no texto libre",
              en: "Structured payload (the row id), not free text",
              pt: "Payload estruturado (o id da linha), não texto livre",
            },
          ],
        ],
      },
      {
        heading: { es: "Casos de uso", en: "Use cases", pt: "Casos de uso" },
        columns: [
          { es: "Opciones", en: "Options", pt: "Opções" },
          { es: "Patrón", en: "Pattern", pt: "Padrão" },
        ],
        rows: [
          [
            { es: "1 a 3 opciones", en: "1 to 3 options", pt: "1 a 3 opções" },
            {
              es: "Botones de respuesta",
              en: "Reply buttons",
              pt: "Botões de resposta",
            },
          ],
          [
            {
              es: "4 a 10 opciones",
              en: "4 to 10 options",
              pt: "4 a 10 opções",
            },
            {
              es: "Menú (mensaje de lista)",
              en: "Menu (list message)",
              pt: "Menu (mensagem de lista)",
            },
          ],
          [
            { es: "Más de 10", en: "More than 10", pt: "Mais de 10" },
            {
              es: "Paginar el menú, o repensar el paso",
              en: "Paginate the menu, or rethink the step",
              pt: "Paginar o menu, ou repensar o passo",
            },
          ],
        ],
      },
    ],
    notes: [
      {
        es: "Regla propia: usa el menú solo cuando hay más de 3 opciones. Por debajo de eso, botones de respuesta. WhatsApp permite una lista de una sola fila, pero ese es trabajo de un botón.",
        en: "Our own rule: use the menu only when there are more than 3 options. Below that, reply buttons. WhatsApp allows a one-row list, but that is a button's job.",
        pt: "Regra nossa: use o menu só quando há mais de 3 opções. Abaixo disso, botões de resposta. O WhatsApp permite uma lista de uma só linha, mas esse é trabalho de um botão.",
      },
      {
        es: 'Paginación: 10 filas es el tope de la plataforma para una sola lista. Para conjuntos más largos (envíos recientes), divide en páginas en el título (1/3, 2/3, 3/3) y ofrece "Volver", "Ver más envíos" y una fila de escape como "No encuentro mi envío" en la última página. Máximo 3 páginas.',
        en: 'Pagination: 10 rows is the platform cap for a single list. For longer sets (recent sends), split into pages in the title (1/3, 2/3, 3/3) and offer "Volver", "Ver más envíos", and an escape row like "No encuentro mi envío" in the last page. Max 3 pages.',
        pt: 'Paginação: 10 linhas é o limite da plataforma para uma única lista. Para conjuntos mais longos (envios recentes), divida em páginas no título (1/3, 2/3, 3/3) e ofereça "Volver", "Ver más envíos" e uma linha de saída como "No encuentro mi envío" na última página. Máximo de 3 páginas.',
      },
      {
        es: "El total es de 10 filas entre todas las secciones por página.",
        en: "Total is 10 rows across all sections per page.",
        pt: "O total é de 10 linhas entre todas as seções por página.",
      },
      {
        es: "Secciones: el título de sección es un encabezado, no una fila tocable, así que no cuenta para el total de 10 filas. Hasta 10 secciones por lista, con títulos de máx. 24 caracteres.",
        en: "Sections: a section title is a header, not a tappable row, so it does not count toward the 10-row total. Up to 10 sections per list, titles max 24 characters.",
        pt: "Seções: o título de seção é um cabeçalho, não uma linha tocável, então não conta para o total de 10 linhas. Até 10 seções por lista, com títulos de máx. 24 caracteres.",
      },
    ],
    source: {
      es: "Fuente: WhatsApp Cloud API, mensajes de lista interactivos (actualizado jul. 2026). ",
      en: "Source: WhatsApp Cloud API, interactive list messages (updated Jul 2026). ",
      pt: "Fonte: WhatsApp Cloud API, mensagens de lista interativas (atualizado em jul. 2026). ",
    },
    sourceHref: WA_LIST_DOCS_URL,
    sourceLinkText: "developers.facebook.com",
  },

  guidelines: {
    usage: {
      es: "Recurre a un menú cuando tienes un conjunto conocido demasiado largo para botones. El título de la fila lleva la elección; la descripción, cuando está, existe para ayudar al usuario a elegir, nada más.",
      en: "Reach for a menu when you have a known set that is too long for buttons. The row title carries the choice; the description, when present, is there to help the user pick, nothing more.",
      pt: "Recorra a um menu quando você tem um conjunto conhecido longo demais para botões. O título da linha carrega a escolha; a descrição, quando existe, está ali para ajudar o usuário a escolher, nada mais.",
    },
    tips: {
      es: 'Mantén los títulos de fila cortos y capaces de sostenerse solos (24 caracteres es el tope duro; apunta bien por debajo). Agrega una descripción solo cuando desambigua o lleva un estado que el usuario necesita (un número de referencia, "Listo para recoger", "No disponible por ahora"). Haz que la descripción apoye lo que dice el título. Si repite el título o se lee como decoración, quítala. Es normal tener algunas filas con descripción y otras sin ella en la misma lista. Ordena las filas como piensa el usuario (más reciente, más probable, de menor a mayor monto), y cuando una fila está presente pero no se puede usar, muéstrala deshabilitada con el motivo como descripción en lugar de ocultarla. Si una fila lleva un mensaje de alerta, puede ir en rojo para señalarlo. Las secciones con título funcionan igual: úsalas cuando las filas caen en grupos que el usuario ya reconoce, nunca como decoración.',
      en: 'Keep row titles short and able to stand on their own (24 characters is the hard cap, aim well under). Add a description only when it disambiguates or carries a status the user needs (a reference number, "Listo para recoger", "No disponible por ahora"). Make the description support what the title says. If it repeats the title or reads as decoration, drop it. It is normal to have some rows with a description and some without in the same list. Order rows the way the user thinks (most recent, most likely, lowest to highest amount), and when a row is present but not usable, show it disabled with the reason as its description rather than hiding it. If a row carries an alert message, it can be shown in red to flag it. Titled sections work the same way: use them when the rows fall into groups the user already recognizes, never as decoration.',
      pt: 'Mantenha os títulos de linha curtos e capazes de se sustentar sozinhos (24 caracteres é o limite duro; mire bem abaixo). Adicione uma descrição só quando ela desambigua ou carrega um status de que o usuário precisa (um número de referência, "Listo para recoger", "No disponible por ahora"). Faça a descrição apoiar o que o título diz. Se ela repete o título ou parece decoração, retire. É normal ter algumas linhas com descrição e outras sem na mesma lista. Ordene as linhas como o usuário pensa (mais recente, mais provável, do menor ao maior valor), e quando uma linha está presente mas não pode ser usada, mostre-a desabilitada com o motivo como descrição em vez de escondê-la. Se uma linha carrega uma mensagem de alerta, pode ir em vermelho para sinalizar. As seções com título funcionam igual: use-as quando as linhas caem em grupos que o usuário já reconhece, nunca como decoração.',
    },
    examples: [
      {
        tone: "do",
        img: `${ASSETS}/menu-do-1.png`,
        alt: {
          es: 'Fila de menú "10 USD a Eva Mariana Ugarte" con la descripción "Listo para recoger | A234567893"',
          en: 'Menu row "10 USD a Eva Mariana Ugarte" with the description "Listo para recoger | A234567893"',
          pt: 'Linha de menu "10 USD a Eva Mariana Ugarte" com a descrição "Listo para recoger | A234567893"',
        },
        caption: {
          es: "El título es la elección; la descripción agrega el estado y la referencia que la distinguen.",
          en: "The title is the choice, the description adds the status and reference that tell it apart.",
          pt: "O título é a escolha; a descrição adiciona o status e a referência que a distinguem.",
        },
      },
      {
        tone: "dont",
        img: `${ASSETS}/menu-dont-1.png`,
        alt: {
          es: "Menú cuyas descripciones repiten el título o agregan texto sin relación",
          en: "Menu whose descriptions repeat the title or add unrelated text",
          pt: "Menu cujas descrições repetem o título ou adicionam texto sem relação",
        },
        caption: {
          es: "No rellenes las filas con texto de apoyo que no ayuda al usuario a elegir.",
          en: "Don't pad rows with support text that doesn't help the user choose.",
          pt: "Não preencha as linhas com texto de apoio que não ajuda o usuário a escolher.",
        },
      },
      {
        tone: "do",
        img: `${ASSETS}/menu-do-2.png`,
        alt: {
          es: 'Menú que mezcla "Jose Del Mar" sin descripción con "Nuevo beneficiario" y la descripción "Alguien que no está en tu lista"',
          en: 'Menu mixing "Jose Del Mar" with no description next to "Nuevo beneficiario" with "Alguien que no está en tu lista"',
          pt: 'Menu que mistura "Jose Del Mar" sem descrição com "Nuevo beneficiario" e a descrição "Alguien que no está en tu lista"',
        },
        caption: {
          es: "Agrega la descripción solo donde se gana su lugar.",
          en: "Add the description only where it earns its place.",
          pt: "Adicione a descrição só onde ela ganha o seu lugar.",
        },
      },
      {
        tone: "dont",
        img: `${ASSETS}/menu-dont-2.png`,
        alt: {
          es: "Doce envíos amontonados en una sola lista sin paginación",
          en: "Twelve sends crammed into one list with no pagination",
          pt: "Doze envios amontoados em uma única lista sem paginação",
        },
        caption: {
          es: 'Pasado el tope de 10 filas, pagina con "Volver" y "Ver más envíos" en lugar de desbordar.',
          en: 'Past the 10-row cap, paginate with "Volver" and "Ver más envíos" instead of overflowing.',
          pt: 'Passado o limite de 10 linhas, pagine com "Volver" e "Ver más envíos" em vez de transbordar.',
        },
      },
    ],
  },
};

const menu: Pattern = {
  slug: "menu",
  family: "interaction",
  name: { es: "Menu", en: "Menu", pt: "Menu" },
  subtitle: { es: "List message", en: "List message", pt: "List message" },
  lede: {
    es: "Una lista para tocar, para cuando la respuesta es una de un conjunto conocido pero más largo (envíos recientes, un método de entrega, un beneficiario). El usuario abre el menú y elige una fila, y cada elección vuelve como una respuesta limpia y estructurada.",
    en: "A tappable list for when the answer is one of a known but longer set (recent sends, a delivery method, a beneficiary). The user opens the menu and picks a row, and every choice comes back as a clean, structured reply.",
    pt: "Uma lista para tocar, para quando a resposta é uma de um conjunto conhecido mas mais longo (envios recentes, um método de entrega, um beneficiário). O usuário abre o menu e escolhe uma linha, e cada escolha volta como uma resposta limpa e estruturada.",
  },
  cardBody: {
    es: "Una lista para tocar, para cuando la respuesta es una de un conjunto conocido pero más largo. El usuario elige una fila y cada elección vuelve estructurada.",
    en: "A tappable list for when the answer is one of a known but longer set. The user picks a row and every choice comes back structured.",
    pt: "Uma lista para tocar, para quando a resposta é uma de um conjunto conhecido mas mais longo. O usuário escolhe uma linha e cada escolha volta estruturada.",
  },
  hero: `${ASSETS}/menu-hero.png`,
  heroDetail: [`${ASSETS}/menu-hero.png`],
  heroAlt: {
    es: 'Menú de WhatsApp "Mis envíos" con filas que muestran estado y referencia',
    en: 'WhatsApp "Mis envíos" menu with rows showing status and reference',
    pt: 'Menu do WhatsApp "Mis envíos" com linhas que mostram status e referência',
  },
  // Las tres subsecciones estándar, con la galería de casos de uso al final de
  // Specs.
  sections: standardSections(menuSections).map(
    (section): PatternSection =>
      section.id !== "specs"
        ? section
        : {
            ...section,
            blocks: [
              ...section.blocks,
              {
                type: "heading",
                text: {
                  es: "Pantallas de ejemplo",
                  en: "Example screens",
                  pt: "Telas de exemplo",
                },
              },
              {
                type: "gallery",
                items: [
                  {
                    img: `${ASSETS}/menu-mixed.png`,
                    label: {
                      es: "Menú mixto",
                      en: "Mixed menu",
                      pt: "Menu misto",
                    },
                    alt: {
                      es: 'Lista "¿A quién quieres enviarle tu dinero?" que mezcla filas con y sin descripción',
                      en: 'List "¿A quién quieres enviarle tu dinero?" mixing rows with and without descriptions',
                      pt: 'Lista "¿A quién quieres enviarle tu dinero?" que mistura linhas com e sem descrição',
                    },
                  },
                  {
                    img: `${ASSETS}/menu-descriptions.png`,
                    label: {
                      es: "Menú con descripciones",
                      en: "Menu with descriptions",
                      pt: "Menu com descrições",
                    },
                    alt: {
                      es: 'Lista "Mis envíos", cada fila con estado y referencia',
                      en: 'List "Mis envíos", each row with status and reference',
                      pt: 'Lista "Mis envíos", cada linha com status e referência',
                    },
                  },
                  {
                    img: `${ASSETS}/menu-alerts.png`,
                    label: {
                      es: "Menú con mensajes de alerta",
                      en: "Menu with alert messages",
                      pt: "Menu com mensagens de alerta",
                    },
                    alt: {
                      es: 'Lista "Elige otro método de entrega" con una fila deshabilitada y "No disponible por ahora" como descripción',
                      en: 'List "Elige otro método de entrega" with a disabled row and "No disponible por ahora" as the description',
                      pt: 'Lista "Elige otro método de entrega" com uma linha desabilitada e "No disponible por ahora" como descrição',
                    },
                  },
                  {
                    img: `${ASSETS}/menu-sections.png`,
                    label: {
                      es: "Menú con títulos de sección",
                      en: "Menu with section titles",
                      pt: "Menu com títulos de seção",
                    },
                    alt: {
                      es: "Lista dividida en secciones con título, cada grupo con sus filas",
                      en: "List split into titled sections, each group with its rows",
                      pt: "Lista dividida em seções com título, cada grupo com suas linhas",
                    },
                  },
                  {
                    img: `${ASSETS}/menu-pagination.png`,
                    label: {
                      es: "Menú con paginación",
                      en: "Menu with pagination",
                      pt: "Menu com paginação",
                    },
                    alt: {
                      es: 'Lista "Mis envíos" paginada, con el número de página en el título y filas para volver y ver más',
                      en: 'Paginated "Mis envíos" list, with the page number in the title and rows to go back and see more',
                      pt: 'Lista "Mis envíos" paginada, com o número da página no título e linhas para voltar e ver mais',
                    },
                  },
                  {
                    img: `${ASSETS}/menu-button.png`,
                    label: {
                      es: "Menú con botón activo",
                      en: "Menu with button active",
                      pt: "Menu com botão ativo",
                    },
                    alt: {
                      es: "Lista con un botón de acción activo en el pie",
                      en: "List with an active call-to-action button in the footer",
                      pt: "Lista com um botão de ação ativo no rodapé",
                    },
                  },
                ],
              },
            ],
          }
  ),
};

// ─── Use of emojis ───────────────────────────────────────────────────────────

/* Estructura propia: solo Overview y Guidelines, sin specs ni do/don't. Los
   ejemplos de copy del bot ("Tu envío está en camino") quedan en español tal
   cual porque son texto de producto, no de la guía. */
const useOfEmojis: Pattern = {
  slug: "use-of-emojis",
  family: "conversational",
  name: { es: "Use of emojis", en: "Use of emojis", pt: "Use of emojis" },
  lede: {
    es: "Cuándo y cuántos usar.",
    en: "When and how many to use.",
    pt: "Quando e quantos usar.",
  },
  cardBody: {
    es: "Cuándo y cuántos usar.",
    en: "When and how many to use.",
    pt: "Quando e quantos usar.",
  },
  hero: `${ASSETS}/emojis-hero.png`,
  heroDetail: [`${ASSETS}/emojis-hero.png`],
  heroAlt: {
    es: "Conjunto de emojis ilustrados: caras, manos, dinero y un banco",
    en: "A cluster of illustrated emoji: faces, hands, money and a bank",
    pt: "Conjunto de emojis ilustrados: rostos, mãos, dinheiro e um banco",
  },
  sections: [
    {
      id: "overview",
      label: { es: "Resumen", en: "Overview", pt: "Resumo" },
      blocks: [
        { type: "heading", text: { es: "Reglas", en: "Rules", pt: "Regras" } },
        {
          type: "table",
          columns: [
            { es: "Regla", en: "Rule", pt: "Regra" },
            { es: "Estándar", en: "Standard", pt: "Padrão" },
            { es: "Ejemplo", en: "Example", pt: "Exemplo" },
          ],
          rows: [
            [
              {
                es: "Marca estado, no ánimo",
                en: "Marks state, not mood",
                pt: "Marca estado, não humor",
              },
              {
                es: "Un emoji señala el estado de un mensaje: hecho, en curso, requiere atención. La calidez la lleva la oración, no el ícono.",
                en: "An emoji signals the state of a message — done, in progress, needs attention. Warmth is carried by the sentence, not by the icon.",
                pt: "Um emoji sinaliza o estado de uma mensagem: concluído, em andamento, requer atenção. O calor vem da frase, não do ícone.",
              },
              {
                es: 'Un emoji de estado abriendo "Tu envío está en camino" ✓',
                en: 'A state emoji opening "Tu envío está en camino" ✓',
                pt: 'Um emoji de estado abrindo "Tu envío está en camino" ✓',
              },
            ],
            [
              {
                es: "Uno por mensaje, al inicio",
                en: "One per message, at the start",
                pt: "Um por mensagem, no início",
              },
              {
                es: "Máximo un emoji, anclado al inicio de la línea que califica. Nunca disperso a mitad de oración ni junto a un monto, donde compite con la cifra que el usuario vino a verificar.",
                en: "Maximum one emoji, anchored at the start of the line it qualifies. Never scattered mid-sentence and never adjacent to an amount, where it competes with the figure the user came to verify.",
                pt: "No máximo um emoji, ancorado no início da linha que qualifica. Nunca espalhado no meio da frase nem ao lado de um valor, onde compete com a cifra que o usuário veio verificar.",
              },
              {
                es: "Un emoji a cada lado del monto ✗",
                en: "An emoji on either side of the amount ✗",
                pt: "Um emoji de cada lado do valor ✗",
              },
            ],
            [
              {
                es: "Nunca carga el significado",
                en: "Never load-bearing",
                pt: "Nunca carrega o significado",
              },
              {
                es: "Un emoji nunca lleva un significado que el texto no lleve también. El renderizado varía entre dispositivos y los lectores de pantalla los anuncian literalmente.",
                en: "An emoji never carries meaning the text does not also carry. Rendering differs across devices and screen readers announce them literally.",
                pt: "Um emoji nunca carrega um significado que o texto também não carregue. A renderização varia entre dispositivos e os leitores de tela os anunciam literalmente.",
              },
              {
                es: "Un emoji en lugar de la palabra de estado ✗",
                en: "An emoji in place of the status word ✗",
                pt: "Um emoji no lugar da palavra de status ✗",
              },
            ],
            [
              {
                es: "Contextos prohibidos",
                en: "Prohibited contexts",
                pt: "Contextos proibidos",
              },
              {
                es: "Sin emojis en transacciones fallidas, copy de KYC o compliance, avisos legales, derivación a un agente humano o estados de falla parcial. Junto a dinero demorado o retenido, un emoji se lee como minimizar el problema.",
                en: "No emoji in failed transactions, KYC or compliance copy, legal disclosures, handoff to a human agent, or partial-failure states. Next to money that is late or held, an emoji reads as minimizing the problem.",
                pt: "Sem emojis em transações com falha, copy de KYC ou compliance, avisos legais, transferência para um agente humano ou estados de falha parcial. Ao lado de dinheiro atrasado ou retido, um emoji soa como minimizar o problema.",
              },
              {
                es: "Error que involucra fondos ✗",
                en: "Error involving funds ✗",
                pt: "Erro que envolve fundos ✗",
              },
            ],
            [
              {
                es: "No en etiquetas de botón",
                en: "Not in button labels",
                pt: "Não em rótulos de botão",
              },
              {
                es: "Las etiquetas tienen un tope de 20 caracteres con espacios (ver guías de Voz y Tono). Un emoji gasta caracteres y se renderiza de forma inconsistente entre clientes.",
                en: "Labels are capped at 20 characters including spaces (see Voice & Tone guidelines). An emoji spends characters and renders inconsistently across clients.",
                pt: "Os rótulos têm limite de 20 caracteres com espaços (ver as diretrizes de Voz e Tom). Um emoji gasta caracteres e renderiza de forma inconsistente entre clientes.",
              },
              { es: "—", en: "—", pt: "—" },
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
          text: {
            es: "Conjunto aprobado de emojis",
            en: "Approved emoji set",
            pt: "Conjunto aprovado de emojis",
          },
        },
        {
          type: "prose",
          text: {
            es: "Un conjunto cerrado mapeado a tipos de mensaje. Las reglas de la tabla anterior valen sin importar qué emojis estén en el conjunto; esta sección define el conjunto y su mapeo.",
            en: "A closed set mapped to message types. The rules in the table above hold regardless of which emoji are in the set; this section defines the set and its mapping.",
            pt: "Um conjunto fechado mapeado para tipos de mensagem. As regras da tabela anterior valem independentemente de quais emojis estão no conjunto; esta seção define o conjunto e seu mapeamento.",
          },
        },
        {
          type: "callout",
          title: {
            es: "Criterios de selección.",
            en: "Selection criteria.",
            pt: "Critérios de seleção.",
          },
          body: {
            es: "Cada emoji del conjunto es un solo codepoint con presentación de emoji por defecto: sin selector de variación (U+FE0F), sin tono de piel, sin género, sin secuencia ZWJ.",
            en: "Every emoji in the set is a single codepoint with default emoji presentation — no variation selector (U+FE0F), no skin tone, no gender, no ZWJ sequence.",
            pt: "Cada emoji do conjunto é um único codepoint com apresentação de emoji por padrão: sem seletor de variação (U+FE0F), sem tom de pele, sem gênero, sem sequência ZWJ.",
          },
        },
        {
          type: "table",
          columns: [
            {
              es: "Tipo de mensaje",
              en: "Message type",
              pt: "Tipo de mensagem",
            },
            { es: "Emoji", en: "Emoji", pt: "Emoji" },
            { es: "Codepoint", en: "Codepoint", pt: "Codepoint" },
            { es: "Aplica a", en: "Applies to", pt: "Aplica-se a" },
            { es: "Por qué este", en: "Why this one", pt: "Por que este" },
          ],
          rows: [
            [
              {
                es: "Éxito / completado",
                en: "Success / completed",
                pt: "Sucesso / concluído",
              },
              { es: "✅", en: "✅", pt: "✅" },
              { es: "U+2705", en: "U+2705", pt: "U+2705" },
              {
                es: "Transferencia entregada, identidad verificada, pago recibido",
                en: "Transfer delivered, identity verified, payment received",
                pt: "Transferência entregue, identidade verificada, pagamento recebido",
              },
              {
                es: "Presentación nativa de emoji, sin selector de variación. Forma autocontenida, legible en tamaños pequeños, independiente del color de fondo",
                en: "Native emoji presentation, no variation selector. Self-contained shape, legible at small sizes, independent of background color",
                pt: "Apresentação nativa de emoji, sem seletor de variação. Forma autocontida, legível em tamanhos pequenos, independente da cor de fundo",
              },
            ],
            [
              { es: "En curso", en: "In progress", pt: "Em andamento" },
              { es: "⏳", en: "⏳", pt: "⏳" },
              { es: "U+23F3", en: "U+23F3", pt: "U+23F3" },
              {
                es: "Transferencia en proceso, verificación en marcha",
                en: "Transfer processing, verification underway",
                pt: "Transferência em processamento, verificação em curso",
              },
              {
                es: "Marca el paso del tiempo, no la demora. ⌛ (U+231B) se lee como terminado; ⏰ se lee como una operación del sistema y no como un estado de la transferencia",
                en: "Marks time elapsing rather than delay. ⌛ (U+231B) reads as finished; ⏰ reads as a system operation rather than a transfer state",
                pt: "Marca a passagem do tempo, não o atraso. ⌛ (U+231B) soa como terminado; ⏰ soa como uma operação do sistema e não como um estado da transferência",
              },
            ],
            [
              {
                es: "Requiere atención",
                en: "Needs attention",
                pt: "Requer atenção",
              },
              { es: "🔔", en: "🔔", pt: "🔔" },
              { es: "U+1F514", en: "U+1F514", pt: "U+1F514" },
              {
                es: "Campo faltante, tasa por vencer, documento pendiente",
                en: "Missing field, rate about to expire, document pending",
                pt: "Campo faltando, taxa prestes a vencer, documento pendente",
              },
              {
                es: "Se lee como un recordatorio, no como una alarma. Reservado solo para estados accionables por el usuario, nunca para fallas: esas caen en contextos prohibidos",
                en: "Reads as a reminder, not an alarm. Reserved for user-actionable states only, never for failures — those fall under prohibited contexts",
                pt: "Soa como um lembrete, não como um alarme. Reservado só para estados acionáveis pelo usuário, nunca para falhas: essas caem em contextos proibidos",
              },
            ],
            [
              { es: "Información", en: "Information", pt: "Informação" },
              { es: "(ninguno)", en: "(none)", pt: "(nenhum)" },
              { es: "—", en: "—", pt: "—" },
              {
                es: "Tasas, límites, detalles de corredor, copy de cómo funciona",
                en: "Rates, limits, corridor details, how-it-works copy",
                pt: "Taxas, limites, detalhes de corredor, copy de como funciona",
              },
              {
                es: "La información es una categoría de contenido, no un estado de transacción. Un marcador en cada mensaje informativo deja de señalar y se vuelve decoración del párrafo",
                en: "Information is a content category, not a transaction state. A marker on every informational message stops signalling and becomes paragraph decoration",
                pt: "Informação é uma categoria de conteúdo, não um estado de transação. Um marcador em cada mensagem informativa deixa de sinalizar e vira decoração do parágrafo",
              },
            ],
          ],
        },
        {
          type: "heading",
          text: {
            es: "Banderas de países",
            en: "Country flags",
            pt: "Bandeiras de países",
          },
        },
        {
          type: "prose",
          text: {
            es: "Las banderas están permitidas, pero no son emojis de estado y no participan del mapeo anterior.",
            en: "Flags are permitted, but they are not state emoji and do not participate in the mapping above.",
            pt: "As bandeiras são permitidas, mas não são emojis de estado e não participam do mapeamento acima.",
          },
        },
        {
          type: "table",
          columns: [
            { es: "Regla", en: "Rule", pt: "Regra" },
            { es: "Estándar", en: "Standard", pt: "Padrão" },
          ],
          rows: [
            [
              {
                es: "Etiqueta un destino, no un estado",
                en: "Labels a destination, not a state",
                pt: "Rotula um destino, não um estado",
              },
              {
                es: "Una bandera identifica un corredor o un país. Nunca sustituye a un emoji de estado ni aparece junto a uno en el mismo mensaje",
                en: "A flag identifies a corridor or country. It never substitutes for, or appears alongside, a state emoji in the same message",
                pt: "Uma bandeira identifica um corredor ou um país. Nunca substitui um emoji de estado nem aparece ao lado de um na mesma mensagem",
              },
            ],
            [
              {
                es: "Una por línea, en contextos de lista",
                en: "One per line, in list contexts",
                pt: "Uma por linha, em contextos de lista",
              },
              {
                es: "Permitida en listas de selección de corredor y en etiquetas de país, donde cada bandera va en su propia línea. No permitida a mitad de oración en prosa",
                en: "Permitted in corridor selection lists and country labels, where each flag sits on its own line. Not permitted mid-sentence in prose",
                pt: "Permitida em listas de seleção de corredor e em rótulos de país, onde cada bandeira vai em sua própria linha. Não permitida no meio da frase em prosa",
              },
            ],
            [
              {
                es: "Nunca junto a un monto",
                en: "Never adjacent to an amount",
                pt: "Nunca ao lado de um valor",
              },
              {
                es: "Misma restricción que los emojis de estado. Una bandera junto a una cifra compite con el número que el usuario vino a verificar",
                en: "Same constraint as state emoji. A flag next to a figure competes with the number the user came to verify",
                pt: "Mesma restrição dos emojis de estado. Uma bandeira ao lado de uma cifra compete com o número que o usuário veio verificar",
              },
            ],
            [
              {
                es: "Nunca una señal de idioma",
                en: "Never a language signal",
                pt: "Nunca um sinal de idioma",
              },
              {
                es: "Una bandera marca a dónde va el dinero. No marca qué idioma lee el usuario, dónde vive ni la nacionalidad del destinatario",
                en: "A flag marks where the money is going. It does not mark what language the user reads, where the user lives, or the recipient's nationality",
                pt: "Uma bandeira marca para onde o dinheiro vai. Não marca que idioma o usuário lê, onde ele mora nem a nacionalidade do destinatário",
              },
            ],
          ],
        },
        {
          type: "prose",
          text: {
            es: "Corredores soportados: 🇲🇽 MX · 🇨🇴 CO · 🇬🇹 GT · 🇻🇪 VE · 🇧🇷 BR · 🇨🇷 CR",
            en: "Supported corridors: 🇲🇽 MX · 🇨🇴 CO · 🇬🇹 GT · 🇻🇪 VE · 🇧🇷 BR · 🇨🇷 CR",
            pt: "Corredores suportados: 🇲🇽 MX · 🇨🇴 CO · 🇬🇹 GT · 🇻🇪 VE · 🇧🇷 BR · 🇨🇷 CR",
          },
        },
        {
          type: "prose",
          text: {
            es: "Las banderas son dos símbolos indicadores regionales y no un solo codepoint (MX = U+1F1F2 U+1F1FD). Se renderizan como la bandera esperada en los clientes móviles de WhatsApp y caen a un código de dos letras en algunas superficies de escritorio y web. Confirma el renderizado en las superficies objetivo antes de lanzar un flujo que dependa de ellas.",
            en: "Flags are two regional indicator symbols rather than a single codepoint (MX = U+1F1F2 U+1F1FD). They render as the intended flag on mobile WhatsApp clients and fall back to a two-letter code on some desktop and web surfaces. Confirm rendering on target surfaces before shipping a flow that depends on them.",
            pt: "As bandeiras são dois símbolos indicadores regionais e não um único codepoint (MX = U+1F1F2 U+1F1FD). Renderizam como a bandeira esperada nos clientes móveis do WhatsApp e caem para um código de duas letras em algumas superfícies de desktop e web. Confirme a renderização nas superfícies-alvo antes de lançar um fluxo que dependa delas.",
          },
        },
        {
          type: "table",
          columns: [
            { es: "Excluidos", en: "Excluded", pt: "Excluídos" },
            { es: "Motivo", en: "Reason", pt: "Motivo" },
          ],
          rows: [
            [
              { es: "⚠️  ❗️  ❌", en: "⚠️  ❗️  ❌", pt: "⚠️  ❗️  ❌" },
              {
                es: "Escalan a alarma. Donde la advertencia sería precisa, los emojis ya están prohibidos",
                en: "Escalate to alarm. Where the warning would be accurate, emoji are already prohibited",
                pt: "Escalam para alarme. Onde o aviso seria preciso, os emojis já estão proibidos",
              },
            ],
            [
              {
                es: "💰  💵  💸  🤑",
                en: "💰  💵  💸  🤑",
                pt: "💰  💵  💸  🤑",
              },
              {
                es: "Prohibidos junto a montos por la regla anterior. El registro además celebra el dinero en un producto donde enviar suele ser una obligación, no un logro",
                en: "Prohibited next to amounts by the rule above. The register also celebrates money in a product where sending is usually an obligation, not an achievement",
                pt: "Proibidos ao lado de valores pela regra anterior. O registro também celebra o dinheiro em um produto em que enviar costuma ser uma obrigação, não uma conquista",
              },
            ],
            [
              {
                es: "🎉  🥳  🙌  👏",
                en: "🎉  🥳  🙌  👏",
                pt: "🎉  🥳  🙌  👏",
              },
              {
                es: "Celebrar una transferencia completada enmarca un deber cumplido como una victoria",
                en: "Celebration on a completed transfer frames a duty fulfilled as a win",
                pt: "Celebrar uma transferência concluída enquadra um dever cumprido como uma vitória",
              },
            ],
            [
              { es: "👍  👉  🤷", en: "👍  👉  🤷", pt: "👍  👉  🤷" },
              {
                es: "Variantes de tono de piel y género; secuencias de varios codepoints",
                en: "Skin tone and gender variants; multi-codepoint sequences",
                pt: "Variantes de tom de pele e gênero; sequências de vários codepoints",
              },
            ],
            [
              {
                es: "❤️  💚  🏡  👥",
                en: "❤️  💚  🏡  👥",
                pt: "❤️  💚  🏡  👥",
              },
              {
                es: "Ánimo, no estado. Instrumentaliza la relación familiar",
                en: "Mood, not state. Instrumentalizes the family relationship",
                pt: "Humor, não estado. Instrumentaliza a relação familiar",
              },
            ],
          ],
        },
        {
          type: "heading",
          text: {
            es: "Implementación",
            en: "Implementation",
            pt: "Implementação",
          },
        },
        {
          type: "prose",
          text: {
            es: "El emoji pertenece al estado del mensaje, no al idioma. Se guarda como un token (global.icon.success, global.icon.pending, global.icon.action) y se concatena en la capa de plantilla, nunca embebido dentro de una cadena traducible. Embeberlo implica que el carácter puede alterarse o perderse por locale, y se duplica en cada cadena que lleve ese estado.",
            en: "The emoji belongs to the message state, not to the language. It is stored as a token — global.icon.success, global.icon.pending, global.icon.action — and concatenated at the template layer, never embedded inside a translatable string. Embedding it means the character can be altered or dropped per locale, and duplicates across every string carrying that state.",
            pt: "O emoji pertence ao estado da mensagem, não ao idioma. É guardado como um token (global.icon.success, global.icon.pending, global.icon.action) e concatenado na camada de template, nunca embutido dentro de uma string traduzível. Embuti-lo significa que o caractere pode ser alterado ou perdido por locale, e se duplica em cada string que carregue esse estado.",
          },
        },
        {
          type: "callout",
          title: {
            es: "Señal de validación:",
            en: "Validation signal —",
            pt: "Sinal de validação:",
          },
          body: {
            es: "Mayormente cualitativa. No hay un evento limpio para el uso de emojis: las grabaciones de sesión y los tickets de CX son la evidencia disponible, no una métrica.",
            en: "Mostly qualitative. There is no clean event for emoji use — session recordings and CX tickets are the available evidence, not a metric.",
            pt: "Majoritariamente qualitativa. Não há um evento limpo para o uso de emojis: as gravações de sessão e os tickets de CX são a evidência disponível, não uma métrica.",
          },
        },
      ],
    },
  ],
};

// ─── Use of images ──────────────────────────────────────────────────────────

/* Una sola subsección: el contenido son las reglas más las dos notas de medición.
   El hero se recortó del cluster de `hero-home.png`, donde la burbuja vive
   aplanada — cuando haya un export propio del nodo, reemplazar el archivo.
   El ejemplo "como ves en la imagen" queda en español porque es copy de
   producto, no de la guía. */
const useOfImages: Pattern = {
  slug: "use-of-images",
  family: "conversational",
  name: { es: "Use of images", en: "Use of images", pt: "Use of images" },
  lede: {
    es: "Cuándo una imagen ayuda y cuándo distrae en un mensaje.",
    en: "When an image helps vs distracts in a message.",
    pt: "Quando uma imagem ajuda e quando distrai em uma mensagem.",
  },
  cardBody: {
    es: "Cuándo una imagen ayuda y cuándo distrae en un mensaje.",
    en: "When an image helps vs distracts in a message.",
    pt: "Quando uma imagem ajuda e quando distrai em uma mensagem.",
  },
  hero: `${ASSETS}/images-hero.png`,
  heroDetail: [`${ASSETS}/images-hero.png`],
  heroAlt: {
    es: "Mensaje de WhatsApp con una ilustración de tarjetas sobre el texto de pago y un botón para completar el pago",
    en: "WhatsApp message with a card illustration above the payment copy and a button to complete the payment",
    pt: "Mensagem do WhatsApp com uma ilustração de cartões sobre o texto de pagamento e um botão para concluir o pagamento",
  },
  sections: [
    {
      id: "overview",
      label: { es: "Resumen", en: "Overview", pt: "Resumo" },
      blocks: [
        { type: "heading", text: { es: "Reglas", en: "Rules", pt: "Regras" } },
        {
          type: "table",
          columns: [
            { es: "Regla", en: "Rule", pt: "Regra" },
            { es: "Estándar", en: "Standard", pt: "Padrão" },
            { es: "Ejemplo", en: "Example", pt: "Exemplo" },
          ],
          rows: [
            [
              {
                es: "Función, no decoración",
                en: "Function, not decoration",
                pt: "Função, não decoração",
              },
              {
                es: "Una imagen se envía solo cuando lleva información que el texto no puede dar: dónde aparece un campo en un estado de cuenta, cómo se ve un comprobante de pago válido. Una imagen decorativa agrega un paso de carga y un scroll a un flujo donde el usuario ya está ansioso.",
                en: "An image ships only when it carries information the text cannot: where a field appears on a bank statement, what a valid proof of payment looks like. A decorative image adds a load step and a scroll to a flow where the user is already anxious.",
                pt: "Uma imagem é enviada só quando carrega informação que o texto não consegue dar: onde um campo aparece em um extrato bancário, como é um comprovante de pagamento válido. Uma imagem decorativa adiciona um passo de carregamento e um scroll a um fluxo em que o usuário já está ansioso.",
              },
              {
                es: "Dónde aparece el número de cuenta en un estado ✓ · Una ilustración de saludo ✗",
                en: "Where the account number appears on a statement ✓ · A greeting illustration ✗",
                pt: "Onde o número da conta aparece em um extrato ✓ · Uma ilustração de saudação ✗",
              },
            ],
            [
              {
                es: "El texto se sostiene solo",
                en: "The text stands alone",
                pt: "O texto se sustenta sozinho",
              },
              {
                es: "El mensaje debe estar completo sin la imagen. Las imágenes fallan en conexiones de bajo ancho de banda y los lectores de pantalla no las leen en voz alta.",
                en: "The message must be complete without the image. Images fail on low-bandwidth connections and are not read aloud by screen readers.",
                pt: "A mensagem deve estar completa sem a imagem. As imagens falham em conexões de baixa largura de banda e os leitores de tela não as leem em voz alta.",
              },
              {
                es: 'Nunca "como ves en la imagen"',
                en: 'Never "como ves en la imagen"',
                pt: 'Nunca "como ves en la imagen"',
              },
            ],
            [
              {
                es: "Nunca el único portador",
                en: "Never the only carrier",
                pt: "Nunca o único portador",
              },
              {
                es: "Los montos, las comisiones, las fechas límite y las instrucciones nunca viven solo dentro de una imagen. El texto en una imagen no se puede seleccionar, corregir, tokenizar ni localizar: es una cadena fuera del pipeline.",
                en: "Amounts, fees, deadlines and instructions never live only inside an image. Text in an image cannot be selected, corrected, tokenized or localized — it is a string outside the pipeline.",
                pt: "Valores, tarifas, prazos e instruções nunca vivem só dentro de uma imagem. O texto em uma imagem não pode ser selecionado, corrigido, tokenizado nem localizado: é uma string fora do pipeline.",
              },
              {
                es: "Un monto renderizado dentro de una imagen ✗",
                en: "An amount rendered inside an image ✗",
                pt: "Um valor renderizado dentro de uma imagem ✗",
              },
            ],
            [
              {
                es: "Una burbuja, una decisión",
                en: "One bubble, one decision",
                pt: "Um balão, uma decisão",
              },
              {
                es: "Una imagen nunca comparte mensaje con una pregunta. Primero muestra, después pregunta.",
                en: "An image never shares a message with a question. Show first, ask after.",
                pt: "Uma imagem nunca compartilha a mensagem com uma pergunta. Primeiro mostre, depois pergunte.",
              },
              {
                es: "Imagen → después la pregunta, en un mensaje aparte",
                en: "Image → then the question, in a separate message",
                pt: "Imagem → depois a pergunta, em uma mensagem separada",
              },
            ],
          ],
        },
        {
          type: "callout",
          title: {
            es: "Señal de validación:",
            en: "Validation signal —",
            pt: "Sinal de validação:",
          },
          body: {
            es: "¿Los usuarios continúan o abandonan en los pasos que incluyen una imagen? Comparación de embudo a nivel de paso contra pasos equivalentes sin una.",
            en: "Do users continue or drop at steps that include an image? Step-level funnel comparison against equivalent steps without one.",
            pt: "Os usuários continuam ou abandonam nos passos que incluem uma imagem? Comparação de funil no nível do passo contra passos equivalentes sem imagem.",
          },
        },
        {
          type: "callout",
          title: { es: "Pendiente:", en: "Open item —", pt: "Pendente:" },
          body: {
            es: "Confirmar si hoy existe un evento a nivel de paso que distinga los pasos que incluyen una imagen (Jose / analytics). Sin ese evento, el patrón queda como una convención y no se puede medir.",
            en: "Confirm whether a step-level event today distinguishes steps that include an image (Jose / analytics). Without that event the pattern stays a convention and cannot be measured.",
            pt: "Confirmar se hoje existe um evento no nível do passo que distinga os passos que incluem uma imagem (Jose / analytics). Sem esse evento, o padrão fica como uma convenção e não pode ser medido.",
          },
        },
      ],
    },
  ],
};

// ─── Text formatting & message length ───────────────────────────────────────

/* Misma forma que los otros conversacionales: una subsección con la tabla de
   reglas y los dos callouts de medición. La regla de longitud sale de la tabla
   a su propia sección: su contenido son tres párrafos más una lista numerada,
   que en una celda de 13px quedaría ilegible.
   Los ejemplos de copy del bot quedan en español tal cual (son de producto). */
const textFormatting: Pattern = {
  slug: "text-formatting",
  family: "conversational",
  name: {
    es: "Text formatting & message length",
    en: "Text formatting & message length",
    pt: "Text formatting & message length",
  },
  lede: {
    es: "Formato de texto y longitud del mensaje.",
    en: "Text formatting and message length.",
    pt: "Formatação de texto e comprimento da mensagem.",
  },
  cardBody: {
    es: "Formato de texto y longitud del mensaje.",
    en: "Text formatting and message length.",
    pt: "Formatação de texto e comprimento da mensagem.",
  },
  hero: `${ASSETS}/length-format-hero.png`,
  heroDetail: [`${ASSETS}/length-format-hero.png`],
  heroAlt: {
    es: "Mensaje de WhatsApp mostrando el largo de una burbuja de texto",
    en: "WhatsApp message showing the length of a text bubble",
    pt: "Mensagem do WhatsApp mostrando o comprimento de um balão de texto",
  },
  sections: [
    {
      id: "overview",
      label: { es: "Resumen", en: "Overview", pt: "Resumo" },
      blocks: [
        { type: "heading", text: { es: "Reglas", en: "Rules", pt: "Regras" } },
        {
          type: "table",
          columns: [
            { es: "Regla", en: "Rule", pt: "Regra" },
            { es: "Estándar", en: "Standard", pt: "Padrão" },
            { es: "Ejemplo", en: "Example", pt: "Exemplo" },
          ],
          rows: [
            [
              {
                es: "La negrita marca lo que hay que verificar",
                en: "Bold marks what must be verified",
                pt: "O negrito marca o que precisa ser verificado",
              },
              {
                es: "La negrita se reserva para la variable que el usuario tiene que revisar antes de continuar: monto, nombre del destinatario, fecha de entrega. Un solo elemento en negrita por mensaje; dos solo en un resumen de transacción. Si todo está en negrita, nada lo está.",
                en: "Bold is reserved for the variable the user has to check before continuing: amount, recipient name, delivery date. One bold element per message; two only in a transaction summary. If everything is bold, nothing is.",
                pt: "O negrito é reservado para a variável que o usuário precisa conferir antes de continuar: valor, nome do destinatário, data de entrega. Um único elemento em negrito por mensagem; dois só em um resumo de transação. Se tudo está em negrito, nada está.",
              },
              {
                es: '"Envías *$200* a *Ana*"',
                en: '"Envías *$200* a *Ana*"',
                pt: '"Envías *$200* a *Ana*"',
              },
            ],
            [
              {
                es: "Itálicas: evitarlas",
                en: "Italics: avoid",
                pt: "Itálico: evitar",
              },
              {
                es: "La itálica pierde legibilidad en tamaños chicos y en modo oscuro, y no agrega jerarquía que la negrita no dé ya. No se usa en copy transaccional.",
                en: "Italic loses legibility at small sizes and in dark mode, and adds no hierarchy that bold does not already provide. Not used in transactional copy.",
                pt: "O itálico perde legibilidade em tamanhos pequenos e no modo escuro, e não adiciona hierarquia que o negrito já não dê. Não se usa em copy transacional.",
              },
              { es: "—", en: "—", pt: "—" },
            ],
            [
              {
                es: "Solo sintaxis de WhatsApp",
                en: "WhatsApp syntax only",
                pt: "Só sintaxe do WhatsApp",
              },
              {
                es: "WhatsApp usa *negrita* y _itálica_. El Markdown escrito en documentos (**, ##) se renderiza literalmente como caracteres y hay que convertirlo antes de publicar.",
                en: "WhatsApp uses *bold* and _italic_. Markdown authored in docs (**, ##) renders literally as characters and must be converted before it ships.",
                pt: "O WhatsApp usa *negrito* e _itálico_. O Markdown escrito em documentos (**, ##) renderiza literalmente como caracteres e precisa ser convertido antes de publicar.",
              },
              {
                es: '"**Total**" se envía como "**Total**" ✗',
                en: '"**Total**" ships as "**Total**" ✗',
                pt: '"**Total**" é enviado como "**Total**" ✗',
              },
            ],
            [
              {
                es: "La longitud es un objetivo, no el techo",
                en: "Length is a target, not the ceiling",
                pt: "O comprimento é um alvo, não o teto",
              },
              [
                {
                  type: "prose",
                  text: {
                    es: "1.024 caracteres es el límite de la plataforma para un mensaje con botones (4.096 en texto plano o lista), no una meta. Un mensaje, una idea, una pregunta.",
                    en: "1,024 characters is the platform limit for a message with buttons (4,096 for plain text or a list), not a goal. One message, one idea, one question.",
                    pt: "1.024 caracteres é o limite da plataforma para uma mensagem com botões (4.096 em texto simples ou lista), não uma meta. Uma mensagem, uma ideia, uma pergunta.",
                  },
                },
                {
                  type: "prose",
                  text: {
                    es: "Apunta a menos de ~300 caracteres por burbuja, unas 4 o 5 líneas en un Android de gama media. Un mensaje de más de ~500 caracteres es una señal, no una violación: tiene que justificar por qué no puede ser una de estas opciones, en este orden:",
                    en: "Target under ~300 characters per bubble — about 4–5 lines on a mid-range Android. A message over ~500 characters is a signal, not a violation: it must justify why it can't be one of the following, in this order:",
                    pt: "Mire em menos de ~300 caracteres por balão, umas 4 ou 5 linhas em um Android intermediário. Uma mensagem com mais de ~500 caracteres é um sinal, não uma violação: ela precisa justificar por que não pode ser uma destas opções, nesta ordem:",
                  },
                },
                {
                  type: "ordered",
                  items: [
                    {
                      es: "Dos mensajes. Corta en el límite de la idea, no a mitad de un pensamiento.",
                      en: "Two messages. Split at the idea boundary, not mid-thought.",
                      pt: "Duas mensagens. Corte no limite da ideia, não no meio de um pensamento.",
                    },
                    {
                      es: "Un componente nativo. Los mensajes de lista o los botones de respuesta llevan las opciones sin agregar prosa.",
                      en: "A native component. List messages or reply buttons carry options without adding prose.",
                      pt: "Um componente nativo. As mensagens de lista ou os botões de resposta carregam as opções sem adicionar prosa.",
                    },
                    {
                      es: "Un Flow (todavía no disponible en nuestra conversación). Cuando esté activo, úsalo solo si el contenido es una tarea (corregir datos, elegir una cuenta), nunca una lectura. Un Flow agrega un tap y tiempo de carga, y saca al usuario del hilo de la conversación. Hasta entonces, por defecto van las opciones 1 y 2.",
                      en: "A Flow (not yet available in our conversation). Once live, use it only when the content is a task (correcting data, choosing an account), never a reading. A Flow adds a tap, load time, and pulls the user out of the conversation thread. Until then, default to options 1 and 2.",
                      pt: "Um Flow (ainda não disponível na nossa conversa). Quando estiver ativo, use só se o conteúdo é uma tarefa (corrigir dados, escolher uma conta), nunca uma leitura. Um Flow adiciona um toque e tempo de carregamento, e tira o usuário do fio da conversa. Até então, o padrão são as opções 1 e 2.",
                    },
                  ],
                },
                {
                  type: "prose",
                  text: {
                    es: "Nunca escribas hacia el objetivo. Escribe lo que el mensaje necesita y después contrástalo contra el objetivo.",
                    en: "Never write toward the target. Write what the message needs, then check it against the target.",
                    pt: "Nunca escreva em direção ao alvo. Escreva o que a mensagem precisa e depois confira contra o alvo.",
                  },
                },
              ],
              { es: "—", en: "—", pt: "—" },
            ],
            [
              {
                es: "No repitas la lógica de los botones",
                en: "Do not restate button logic",
                pt: "Não repita a lógica dos botões",
              },
              {
                es: "El cuerpo enuncia el hecho; los botones llevan la acción. La lógica condicional que ya resuelven dos botones no va en el cuerpo (ver Voz y Tono §7).",
                en: "The body states the fact; the buttons carry the action. Conditional logic already resolved by two buttons does not belong in the body (see Voice & Tone §7).",
                pt: "O corpo enuncia o fato; os botões carregam a ação. A lógica condicional que dois botões já resolvem não vai no corpo (ver Voz e Tom §7).",
              },
              {
                es: '"si el problema continúa…" ✗',
                en: '"si el problema continúa…" ✗',
                pt: '"si el problema continúa…" ✗',
              },
            ],
          ],
        },
        {
          type: "callout",
          title: {
            es: "Señal de validación:",
            en: "Validation signal —",
            pt: "Sinal de validação:",
          },
          body: {
            es: "Mayormente cualitativa. El proxy débil disponible son los loops y las repreguntas en pasos verbosos: si los usuarios vuelven a preguntar algo que el mensaje ya respondía, el mensaje es demasiado largo para leerse.",
            en: "Mostly qualitative. The weak proxy available is loops and re-asks on verbose steps: if users re-ask a question the message already answered, the message is too long to be read.",
            pt: "Majoritariamente qualitativa. O proxy fraco disponível são os loops e as novas perguntas em passos verbosos: se os usuários voltam a perguntar algo que a mensagem já respondia, a mensagem é longa demais para ser lida.",
          },
        },
        {
          type: "callout",
          title: { es: "Pendiente:", en: "Open item —", pt: "Pendente:" },
          body: {
            es: "Objetivos de caracteres por tipo de mensaje: pregunta, confirmación, error. No se pueden fijar sin una línea base del inventario de cadenas actual. Es un entregable de contenido, no una decisión de ruteo.",
            en: "Character targets per message type — question, confirmation, error. These cannot be set without a baseline from the current string inventory. Content deliverable, not a decision to route.",
            pt: "Alvos de caracteres por tipo de mensagem: pergunta, confirmação, erro. Não podem ser fixados sem uma linha de base do inventário atual de strings. É uma entrega de conteúdo, não uma decisão de roteamento.",
          },
        },
      ],
    },
  ],
};

/** Registro. El orden aquí es el orden de la grilla en la landing. */
export const PATTERNS: Pattern[] = [
  closedInput,
  openInput,
  mixedInput,
  menu,
  useOfEmojis,
  useOfImages,
  textFormatting,
];

export const getPattern = (slug: string): Pattern | undefined =>
  PATTERNS.find((p) => p.slug === slug);

/** Los otros patrones, para la sección "Explorar patrones" de cada página. */
export const otherPatterns = (slug: string): Pattern[] =>
  PATTERNS.filter((p) => p.slug !== slug);
