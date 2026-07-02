// Product design content glossary, sourced from the "Product Design section"
// sheet of the Félix Web Localization Glossary (Google Sheets).
// The `en`/`es`/`pt` term columns ARE the glossary content — they stay fixed
// regardless of the site language. Guidance columns are localized.

export interface LocalizedText {
  es: string;
  en: string;
  pt: string;
}

export interface GlossaryEntry {
  /** The EN term as it appears in the glossary. */
  term: string;
  /** Neutral Spanish term (glossary content, not UI copy). */
  termEs: string;
  /** Brazilian Portuguese term (glossary content, not UI copy). */
  termPt: string;
  use: LocalizedText;
  avoid?: LocalizedText;
  register: LocalizedText;
  /** Alignment note with marketing, when the sheet has one. */
  note?: LocalizedText;
}

export interface GlossaryGroup {
  id: string;
  label: LocalizedText;
  entries: GlossaryEntry[];
}

const REG_NEUTRAL: LocalizedText = { es: "Neutro", en: "Neutral", pt: "Neutro" };
const REG_FORMAL: LocalizedText = { es: "Formal", en: "Formal", pt: "Formal" };
const REG_FORMAL_INFORMAL: LocalizedText = { es: "Formal / Informal", en: "Formal / Informal", pt: "Formal / Informal" };

export const GLOSSARY: GlossaryGroup[] = [
  {
    id: "original",
    label: { es: "Entradas originales", en: "Original entries", pt: "Entradas originais" },
    entries: [
      {
        term: "Transfer",
        termEs: "Transferencia / Envío",
        termPt: "Transferência",
        use: {
          es: "Contextos técnicos.",
          en: "Technical contexts.",
          pt: "Contextos técnicos.",
        },
        avoid: {
          es: "Con usuarios — preferí “envío”.",
          en: "With users — prefer “envío”.",
          pt: "Com usuários — prefira “envío”.",
        },
        register: REG_FORMAL_INFORMAL,
      },
      {
        term: "Fee",
        termEs: "Comisión",
        termPt: "Taxa",
        use: {
          es: "Siempre visible para el usuario. Etiqueta de fila en el RESUMEN y los comprobantes (“Comisión de Félix”). “TARIFAS” es aceptable como encabezado de sección en WhatsApp, no como etiqueta de fila.",
          en: "Always visible to the user. Row label in RESUMEN and comprobantes (“Comisión de Félix”). “TARIFAS” is acceptable as a WhatsApp section header, not as a row label.",
          pt: "Sempre visível para o usuário. Rótulo de linha no RESUMEN e nos comprovantes (“Comisión de Félix”). “TARIFAS” é aceitável como cabeçalho de seção no WhatsApp, não como rótulo de linha.",
        },
        avoid: {
          es: "“Tarifa” como etiqueta de fila — registro bancario. “Tarifa de Félix” en Fintech Office debería estandarizarse a “Comisión de Félix”.",
          en: "“Tarifa” as a row label — banking register. “Tarifa de Félix” in Fintech Office should be standardized to “Comisión de Félix”.",
          pt: "“Tarifa” como rótulo de linha — registro bancário. “Tarifa de Félix” no Fintech Office deve ser padronizado para “Comisión de Félix”.",
        },
        register: REG_NEUTRAL,
        note: {
          es: "Marketing tiene dos entradas para el mismo concepto: “Comisión → Fee” y “Tarifa → Fee”. UX recomienda “Comisión” porque domina en los flujos del producto; si Marketing ya usa “comisión” como una de sus dos opciones, estandarizarla unifica ambos mundos con el menor cambio posible.",
          en: "Marketing has two separate entries for the same concept: “Comisión → Fee” and “Tarifa → Fee”. UX recommends “Comisión” because it's dominant across the product flows; if Marketing already uses “comisión” as one of its two options, standardizing on it unifies both worlds with the least change required.",
          pt: "O Marketing tem duas entradas para o mesmo conceito: “Comisión → Fee” e “Tarifa → Fee”. O UX recomenda “Comisión” porque domina nos fluxos do produto; se o Marketing já usa “comisión” como uma de suas duas opções, padronizá-la unifica os dois mundos com a menor mudança possível.",
        },
      },
      {
        term: "Recipient",
        termEs: "Destinatario",
        termPt: "Destinatário",
        use: {
          es: "Copy legal / de compliance y etiquetas de UI. Con usuarios usá “tu destinatario” para dar calidez.",
          en: "Legal / compliance copy and UI labels. Use “tu destinatario” with users for warmth.",
          pt: "Copy legal / de compliance e rótulos de UI. Com usuários, use “tu destinatario” para dar acolhimento.",
        },
        avoid: {
          es: "“Beneficiario” — registro bancario; evitalo en copy conversacional de WhatsApp.",
          en: "“Beneficiario” — banking register, avoid in conversational WhatsApp copy.",
          pt: "“Beneficiario” — registro bancário; evite em copy conversacional no WhatsApp.",
        },
        register: REG_FORMAL,
        note: {
          es: "Un usuario ve “beneficiario” en un anuncio, abre WhatsApp y lee “destinatario” — el mismo concepto, dos palabras distintas. “Destinatario” es más preciso (quien recibe) y menos bancario que “beneficiario” (que implica un tercero beneficiado).",
          en: "A user sees “beneficiario” in an ad, opens WhatsApp, and reads “destinatario” — same concept, two different words. “Destinatario” is more precise (the one who receives) and less banking-register than “beneficiario” (which implies a benefited third party).",
          pt: "Um usuário vê “beneficiario” em um anúncio, abre o WhatsApp e lê “destinatario” — o mesmo conceito, duas palavras diferentes. “Destinatario” é mais preciso (quem recebe) e menos bancário que “beneficiario” (que implica um terceiro beneficiado).",
        },
      },
      {
        term: "Sender",
        termEs: "Remitente",
        termPt: "Remetente",
        use: {
          es: "Solo contextos legales / de compliance.",
          en: "Legal / compliance contexts only.",
          pt: "Somente contextos legais / de compliance.",
        },
        avoid: {
          es: "Con usuarios — usá “tú” o “quién envía” en copy conversacional.",
          en: "With users — use “tú” or “quién envía” in conversational copy.",
          pt: "Com usuários — use “tú” ou “quién envía” em copy conversacional.",
        },
        register: REG_FORMAL,
      },
      {
        term: "Balance",
        termEs: "Saldo",
        termPt: "Saldo",
        use: {
          es: "Al referirse al saldo de la cuenta Félix de quien envía.",
          en: "When referring to the sender's Félix account balance.",
          pt: "Ao se referir ao saldo da conta Félix de quem envia.",
        },
        register: REG_NEUTRAL,
      },
      {
        term: "Exchange rate",
        termEs: "Tipo de cambio",
        termPt: "Taxa de câmbio",
        use: {
          es: "Siempre — en el RESUMEN de WhatsApp, el checkout de Fintech Office y los comprobantes. Forma conversacional: “El tipo de cambio es $X por dólar”.",
          en: "Always — in WhatsApp RESUMEN, Fintech Office checkout, and comprobantes. Conversational form: “El tipo de cambio es $X por dólar”.",
          pt: "Sempre — no RESUMEN do WhatsApp, no checkout do Fintech Office e nos comprovantes. Forma conversacional: “El tipo de cambio es $X por dólar”.",
        },
        avoid: {
          es: "“Tasa” sola — ambigua, puede confundirse con una tasa de interés. “Tasa de cambio” es aceptable como alternativa completa, pero no es el estándar.",
          en: "“Tasa” alone — ambiguous, may be confused with an interest rate. “Tasa de cambio” is acceptable as the full-form alternative but not the standard.",
          pt: "“Tasa” sozinha — ambígua, pode ser confundida com uma taxa de juros. “Tasa de cambio” é aceitável como alternativa por extenso, mas não é o padrão.",
        },
        register: REG_NEUTRAL,
        note: {
          es: "Marketing también usa “Mejor tipo de cambio” en su hoja de definiciones. Es un conflicto preexistente sin resolver. Propuesta: “Tipo de cambio” como forma conversacional estándar en todo el producto; “Tasa de cambio” puede sobrevivir en contextos formales o legales. Requiere alineación del equipo.",
          en: "Marketing also uses “Mejor tipo de cambio” (Best exchange rate) in their definitions sheet. It's a pre-existing unresolved conflict. Proposal: “Tipo de cambio” as the standard conversational form across the product; “Tasa de cambio” can survive in formal or legal contexts. Needs team alignment.",
          pt: "O Marketing também usa “Mejor tipo de cambio” em sua planilha de definições. É um conflito preexistente sem resolução. Proposta: “Tipo de cambio” como forma conversacional padrão em todo o produto; “Tasa de cambio” pode sobreviver em contextos formais ou legais. Precisa de alinhamento do time.",
        },
      },
      {
        term: "Account",
        termEs: "Cuenta",
        termPt: "Conta",
        use: {
          es: "La cuenta Félix de quien envía (saldo, perfil). Multiproducto: especificá “cuenta de Crédito Félix”, etc.",
          en: "The sender's Félix account (balance, profile). Multi-product: specify “cuenta de Crédito Félix”, etc.",
          pt: "A conta Félix de quem envia (saldo, perfil). Multiproduto: especifique “cuenta de Crédito Félix” etc.",
        },
        avoid: {
          es: "“Cuenta bancaria” — la cuenta bancaria externa del destinatario (ver entrada en P2). Nunca uses “cuenta” sola para referirte al banco del destinatario.",
          en: "“Cuenta bancaria” — the recipient's external bank account (see P2 entry). Never use “cuenta” alone when referring to the recipient's bank.",
          pt: "“Cuenta bancaria” — a conta bancária externa do destinatário (veja a entrada em P2). Nunca use “cuenta” sozinha para se referir ao banco do destinatário.",
        },
        register: REG_NEUTRAL,
      },
      {
        term: "Deposit",
        termEs: "Depósito",
        termPt: "Depósito",
        use: {
          es: "Como etiqueta en el comprobante para la cuenta bancaria donde se recibe el dinero (“Depósito: BBVA ···· 4412”).",
          en: "As a label in the comprobante for the bank account where money is received (“Depósito: BBVA ···· 4412”).",
          pt: "Como rótulo no comprovante para a conta bancária onde o dinheiro é recebido (“Depósito: BBVA ···· 4412”).",
        },
        avoid: {
          es: "Como CTA de método de entrega — usá “Depósito en cuenta” (ver entrada en P2).",
          en: "As a delivery method CTA — use “Depósito en cuenta” (see P2 entry).",
          pt: "Como CTA de método de entrega — use “Depósito en cuenta” (veja a entrada em P2).",
        },
        register: REG_NEUTRAL,
      },
      {
        term: "Identity verification",
        termEs: "Verificación de identidad",
        termPt: "Verificação de identidade",
        use: {
          es: "Flujos de KYC / compliance y onboarding. Con usuarios usá siempre la frase completa.",
          en: "KYC / compliance and onboarding flows. Always use the full phrase with users.",
          pt: "Fluxos de KYC / compliance e onboarding. Com usuários, use sempre a frase completa.",
        },
        avoid: {
          es: "“KYC” en copy visible para el usuario.",
          en: "“KYC” in user-facing copy.",
          pt: "“KYC” em copy visível para o usuário.",
        },
        register: REG_FORMAL,
      },
      {
        term: "Credit",
        termEs: "Crédito",
        termPt: "Crédito",
        use: {
          es: "Producto y funciones de Crédito Félix.",
          en: "Félix Credit product and features.",
          pt: "Produto e recursos do Crédito Félix.",
        },
        avoid: {
          es: "Para reembolsos usá “saldo a favor”, no “crédito”.",
          en: "“Saldo a favor” for refunds — not “crédito”.",
          pt: "Para reembolsos, use “saldo a favor”, não “crédito”.",
        },
        register: REG_FORMAL_INFORMAL,
      },
      {
        term: "Mexican pesos (MXN)",
        termEs: "Pesos mexicanos (MXN)",
        termPt: "Pesos mexicanos (MXN)",
        use: {
          es: "Montos visibles para el usuario, primera mención en un flujo.",
          en: "User-facing amounts, first mention in a flow.",
          pt: "Valores visíveis para o usuário, primeira menção em um fluxo.",
        },
        avoid: {
          es: "“MXN” a secas en tono conversacional; “pesos” a secas cuando lancen CO/RD.",
          en: "Bare “MXN” conversationally; bare “pesos” once CO/DR ship.",
          pt: "“MXN” sozinho em tom conversacional; “pesos” sozinho quando CO/RD forem lançados.",
        },
        register: REG_NEUTRAL,
      },
      {
        term: "Referrals",
        termEs: "Referidos",
        termPt: "Referidos",
        use: {
          es: "Etiqueta de la sección o feature (en la app).",
          en: "Feature/section label (in-app).",
          pt: "Rótulo da seção ou feature (no app).",
        },
        avoid: {
          es: "Encabezando un CTA — probá “invita a tu familia/amigos”.",
          en: "Leading a CTA — try “invita a tu familia/amigos”.",
          pt: "Iniciando um CTA — prefira “invita a tu familia/amigos”.",
        },
        register: {
          es: "Informal (CTA) / Neutro (etiqueta)",
          en: "Informal (CTA) / Neutral (label)",
          pt: "Informal (CTA) / Neutro (rótulo)",
        },
      },
    ],
  },
  {
    id: "p1",
    label: { es: "P1 — Urgente", en: "P1 — Urgent", pt: "P1 — Urgente" },
    entries: [
      {
        term: "Wallet",
        termEs: "Billetera / Billetera digital",
        termPt: "Carteira digital",
        use: {
          es: "Al referirse a apps de pago digitales (Nequi, Daviplata) como método de entrega. Usalo como botón de método de entrega (“Billetera digital”) y en la etiqueta del RESUMEN (“Billetera: Nequi”).",
          en: "When referring to digital payment apps (Nequi, Daviplata) as a delivery method. Use as a delivery method button (“Billetera digital”) and in the RESUMEN label (“Billetera: Nequi”).",
          pt: "Ao se referir a apps de pagamento digitais (Nequi, Daviplata) como método de entrega. Use como botão de método de entrega (“Billetera digital”) e no rótulo do RESUMEN (“Billetera: Nequi”).",
        },
        avoid: {
          es: "Como sinónimo de la cuenta Félix de quien envía. No es intercambiable con “cuenta bancaria”.",
          en: "As a synonym for the sender's Félix account. Not interchangeable with “cuenta bancaria”.",
          pt: "Como sinônimo da conta Félix de quem envia. Não é intercambiável com “cuenta bancaria”.",
        },
        register: { es: "Informal / Neutro", en: "Informal / Neutral", pt: "Informal / Neutro" },
      },
      {
        term: "Amount",
        termEs: "Monto",
        termPt: "Valor",
        use: {
          es: "En el bloque RESUMEN de WhatsApp y en labels de formulario para el valor del envío. Término estándar para el monto en dólares que se envía.",
          en: "In the WhatsApp RESUMEN block and form labels for the transfer value. Standard term for the dollar amount being sent.",
          pt: "No bloco RESUMEN do WhatsApp e nos labels de formulário para o valor do envio. Termo padrão para o valor em dólares sendo enviado.",
        },
        avoid: {
          es: "De forma intercambiable con “cantidad” — “monto” es el estándar de Félix para el valor del envío.",
          en: "Interchangeably with “cantidad” — “monto” is the Félix standard for transfer value.",
          pt: "De forma intercambiável com “cantidad” — “monto” é o padrão da Félix para o valor do envio.",
        },
        register: REG_NEUTRAL,
      },
      {
        term: "Reference number",
        termEs: "Número de referencia",
        termPt: "Número de referência",
        use: {
          es: "En recibos, comprobantes y contextos de soporte. Siempre la forma completa. Abreviá “Ref” solo en espacios de UI muy justos (ej. la burbuja de confirmación de WhatsApp).",
          en: "In receipts, comprobantes, and customer support contexts. Always the full form. Abbreviated “Ref” only in extremely tight UI spaces (e.g., WhatsApp confirmation bubble).",
          pt: "Em recibos, comprovantes e contextos de suporte. Sempre a forma completa. Abrevie “Ref” apenas em espaços de UI muito apertados (ex.: o balão de confirmação do WhatsApp).",
        },
        avoid: {
          es: "“No de referencia” en contextos formales. “Ref” suelto sin contexto alrededor.",
          en: "“No de referencia” in formal contexts. “Ref” standalone without surrounding context.",
          pt: "“No de referencia” em contextos formais. “Ref” isolado sem contexto ao redor.",
        },
        register: REG_NEUTRAL,
      },
      {
        term: "Transfer status",
        termEs: "Estado del envío",
        termPt: "Status do envio",
        use: {
          es: "Como etiquetas pill para los cuatro estados de la transacción: Enviado, En Espera, Error, Procesando. Cada estado tiene una etiqueta fija — sin sinónimos.",
          en: "As pill labels for the four transaction states: Enviado (delivered), En Espera (pending), Error (failed/rejected), Procesando (in progress). Each state has a fixed label — no synonyms.",
          pt: "Como rótulos pill para os quatro estados da transação: Enviado, En Espera, Error, Procesando. Cada estado tem um rótulo fixo — sem sinônimos.",
        },
        avoid: {
          es: "Mezclar las cuatro etiquetas. No uses “exitoso”, “completado” ni “en proceso” como sustitutos.",
          en: "Mixing the four labels. Don't use “exitoso”, “completado”, or “en proceso” as substitutes.",
          pt: "Misturar os quatro rótulos. Não use “exitoso”, “completado” nem “en proceso” como substitutos.",
        },
        register: REG_NEUTRAL,
      },
      {
        term: "Cash",
        termEs: "Efectivo",
        termPt: "Dinheiro / Em espécie",
        use: {
          es: "(1) Método de entrega: el destinatario retira efectivo en una tienda física (botón “Efectivo”). (2) Pago del remitente: quien envía paga en tienda (“Efectivo en tienda”). El contexto deja claro cuál aplica.",
          en: "(1) Delivery method: the recipient picks up cash at a physical store (“Efectivo” button). (2) Sender payment: the sender pays at a store (“Efectivo en tienda”). Context makes clear which applies.",
          pt: "(1) Método de entrega: o destinatário retira dinheiro em uma loja física (botão “Efectivo”). (2) Pagamento de quem envia: paga na loja (“Efectivo en tienda”). O contexto deixa claro qual se aplica.",
        },
        avoid: {
          es: "“Dinero en efectivo” — demasiado largo para labels de botón.",
          en: "“Dinero en efectivo” — too verbose for button labels.",
          pt: "“Dinero en efectivo” — verboso demais para labels de botão.",
        },
        register: REG_NEUTRAL,
      },
      {
        term: "Receipt / Proof of payment",
        termEs: "Recibo / Comprobante",
        termPt: "Recibo / Comprovante",
        use: {
          es: "“Recibo” para el email que recibe quien envía después del envío. “Comprobante” para la pantalla in-app con el registro completo de la transacción (número de referencia, QR, detalles).",
          en: "“Recibo” for the email sent to the sender after the transfer. “Comprobante” for the in-app screen showing the full transaction record (reference number, QR, transfer details).",
          pt: "“Recibo” para o e-mail enviado a quem envia após a transferência. “Comprobante” para a tela no app com o registro completo da transação (número de referência, QR, detalhes).",
        },
        avoid: {
          es: "De forma intercambiable — son dos artefactos distintos. No uses “recibo” para la pantalla in-app ni “comprobante” para el email.",
          en: "Interchangeably — they are two distinct artifacts. Don't use “recibo” for the in-app screen or “comprobante” for the email.",
          pt: "De forma intercambiável — são dois artefatos distintos. Não use “recibo” para a tela do app nem “comprobante” para o e-mail.",
        },
        register: {
          es: "Neutro (recibo) / Formal (comprobante)",
          en: "Neutral (recibo) / Formal (comprobante)",
          pt: "Neutro (recibo) / Formal (comprobante)",
        },
      },
      {
        term: "Payment method (sender)",
        termEs: "Método de pago",
        termPt: "Forma de pagamento",
        use: {
          es: "Cómo le paga a Félix quien envía: tarjeta de crédito/débito, cuenta bancaria, efectivo en tienda o BNPL. Usalo en el checkout de Fintech Office.",
          en: "How the sender pays Félix: credit/debit card, bank account, cash at store, or BNPL. Use in Fintech Office checkout.",
          pt: "Como quem envia paga a Félix: cartão de crédito/débito, conta bancária, dinheiro na loja ou BNPL. Use no checkout do Fintech Office.",
        },
        avoid: {
          es: "No lo confundas con el método de entrega (cómo llega el dinero al destinatario).",
          en: "Don't confuse with delivery method (how money reaches the recipient).",
          pt: "Não confunda com o método de entrega (como o dinheiro chega ao destinatário).",
        },
        register: { es: "Informal / Neutro", en: "Informal / Neutral", pt: "Informal / Neutro" },
      },
    ],
  },
  {
    id: "p2",
    label: { es: "P2 — Próximamente", en: "P2 — Coming soon", pt: "P2 — Em breve" },
    entries: [
      {
        term: "Cash pickup location",
        termEs: "Lugar de retiro",
        termPt: "Local de retirada",
        use: {
          es: "La tienda física donde el destinatario retira el efectivo (Elektra, CVS, etc.). Verbo para la acción: “recoger”. Sustantivo para el lugar: “lugar de retiro”.",
          en: "The physical store where the recipient picks up cash (Elektra, CVS, etc.). Verb for the action: “recoger”. Noun for the location: “lugar de retiro”.",
          pt: "A loja física onde o destinatário retira o dinheiro (Elektra, CVS etc.). Verbo para a ação: “recoger”. Substantivo para o lugar: “lugar de retiro”.",
        },
        avoid: {
          es: "“Punto de retiro” o “punto de pago” — no son el estándar de Félix.",
          en: "“Punto de retiro” or “punto de pago” — not the Félix standard.",
          pt: "“Punto de retiro” ou “punto de pago” — não são o padrão da Félix.",
        },
        register: REG_NEUTRAL,
      },
      {
        term: "Bank deposit (delivery)",
        termEs: "Depósito en cuenta",
        termPt: "Depósito em conta",
        use: {
          es: "El nombre del método de entrega cuando el dinero va directo a la cuenta bancaria del destinatario. Siempre en forma de sustantivo (“Depósito en cuenta”). Paralelo a “Billetera digital” y “Efectivo” como opciones.",
          en: "The delivery method name when money goes directly into the recipient's bank account. Always noun form (“Depósito en cuenta”). Parallel to “Billetera digital” and “Efectivo” as options.",
          pt: "O nome do método de entrega quando o dinheiro vai direto para a conta bancária do destinatário. Sempre na forma de substantivo (“Depósito en cuenta”). Paralelo a “Billetera digital” e “Efectivo” como opções.",
        },
        avoid: {
          es: "La forma verbal “Depositar en cuenta”. Intercambiarlo con “Cuenta bancaria” — esa es la cuenta en sí, no el método de entrega.",
          en: "Verb form “Depositar en cuenta”. Interchangeably with “Cuenta bancaria” — that's the account itself, not the delivery method.",
          pt: "A forma verbal “Depositar en cuenta”. Trocar por “Cuenta bancaria” — essa é a conta em si, não o método de entrega.",
        },
        register: REG_NEUTRAL,
      },
      {
        term: "Recipient's bank account",
        termEs: "Cuenta bancaria",
        termPt: "Conta bancária",
        use: {
          es: "La cuenta bancaria externa del destinatario. Especificá siempre “cuenta bancaria” o “cuenta en [banco]” para distinguirla de la cuenta Félix de quien envía. Ejemplo: “¿Cuál es el número de cuenta de Carlos en BCR?”.",
          en: "The recipient's external bank account. Always specify “cuenta bancaria” or “cuenta en [banco]” to distinguish from the sender's Félix account. Example: “¿Cuál es el número de cuenta de Carlos en BCR?”.",
          pt: "A conta bancária externa do destinatário. Sempre especifique “cuenta bancaria” ou “cuenta en [banco]” para distinguir da conta Félix de quem envia. Exemplo: “¿Cuál es el número de cuenta de Carlos en BCR?”.",
        },
        avoid: {
          es: "“Cuenta” sola cuando se habla de la cuenta del destinatario — en Félix, “cuenta” por defecto es la cuenta Félix de quien envía.",
          en: "“Cuenta” alone when the recipient's account is meant — in Félix, “cuenta” defaults to the sender's Félix account.",
          pt: "“Cuenta” sozinha quando se fala da conta do destinatário — na Félix, “cuenta” por padrão é a conta Félix de quem envia.",
        },
        register: REG_NEUTRAL,
      },
      {
        term: "No fee",
        termEs: "Sin comisiones",
        termPt: "Sem taxas",
        use: {
          es: "Cuando la comisión del envío es $0, como etiqueta de propuesta de valor o destacado de feature.",
          en: "When the transfer fee is $0 as a value proposition label or feature highlight.",
          pt: "Quando a taxa do envio é $0, como rótulo de proposta de valor ou destaque de feature.",
        },
        avoid: {
          es: "“Comisión: $0 dólares” como etiqueta promocional — ese formato pertenece a la fila de datos del RESUMEN. No uses “gratis”.",
          en: "“Comisión: $0 dólares” as a promotional label — that format belongs in the RESUMEN data row. Don't use “gratis”.",
          pt: "“Comisión: $0 dólares” como rótulo promocional — esse formato pertence à linha de dados do RESUMEN. Não use “gratis”.",
        },
        register: REG_NEUTRAL,
      },
      {
        term: "CLABE",
        termEs: "CLABE",
        termPt: "CLABE",
        use: {
          es: "Al pedir el número de cuenta bancaria mexicana del destinatario (18 dígitos). En la primera mención, explicalo como “número de cuenta bancaria de 18 dígitos (CLABE)” para quien no reconozca el término.",
          en: "When collecting the recipient's Mexican bank account number (18 digits). On first mention, explain as “número de cuenta bancaria de 18 dígitos (CLABE)” for users who may not recognize the term.",
          pt: "Ao coletar o número da conta bancária mexicana do destinatário (18 dígitos). Na primeira menção, explique como “número de cuenta bancaria de 18 dígitos (CLABE)” para quem não reconhecer o termo.",
        },
        avoid: {
          es: "Sin explicación ni pista de formato — CLABE no es un término que todos los remitentes reconozcan.",
          en: "Without explanation or format hint — CLABE is not universally recognized by remittance senders.",
          pt: "Sem explicação nem dica de formato — CLABE não é um termo que todos os remetentes reconhecem.",
        },
        register: { es: "Neutro / Técnico", en: "Neutral / Technical", pt: "Neutro / Técnico" },
      },
      {
        term: "IBAN",
        termEs: "IBAN",
        termPt: "IBAN",
        use: {
          es: "Al pedir el número de cuenta bancaria costarricense del destinatario. Formato: CR + 20 dígitos. En la primera mención, explicalo como “número de cuenta bancaria” y mostrá el formato (ej. “Ejemplo: CR21015201001026284066”).",
          en: "When collecting the recipient's Costa Rican bank account number. Format: CR + 20 digits. On first mention, explain as “número de cuenta bancaria” and show the format (e.g., “Ejemplo: CR21015201001026284066”).",
          pt: "Ao coletar o número da conta bancária costarriquenha do destinatário. Formato: CR + 20 dígitos. Na primeira menção, explique como “número de cuenta bancaria” e mostre o formato (ex.: “Ejemplo: CR21015201001026284066”).",
        },
        avoid: {
          es: "Sin la pista de formato — los usuarios necesitan la estructura para completarlo bien.",
          en: "Without the format hint — users need the structure to complete it correctly.",
          pt: "Sem a dica de formato — os usuários precisam da estrutura para preencher corretamente.",
        },
        register: { es: "Neutro / Técnico", en: "Neutral / Technical", pt: "Neutro / Técnico" },
      },
    ],
  },
  {
    id: "p3",
    label: { es: "P3 — A considerar", en: "P3 — To consider", pt: "P3 — A considerar" },
    entries: [
      {
        term: "Business days",
        termEs: "Días hábiles",
        termPt: "Dias úteis",
        use: {
          es: "Tiempos estimados de procesamiento para pagos con cuenta bancaria de quien envía (ej. “1-3 días hábiles”). Siempre “días hábiles”, no “días laborables”.",
          en: "Estimated processing times for bank account payments from the sender (e.g., “1-3 días hábiles”). Always “días hábiles”, not “días laborables”.",
          pt: "Prazos estimados de processamento para pagamentos com conta bancária de quem envia (ex.: “1-3 días hábiles”). Sempre “días hábiles”, não “días laborables”.",
        },
        avoid: {
          es: "“Días” solo — el calificador maneja las expectativas sobre fines de semana y feriados.",
          en: "“Días” alone — the qualifier manages user expectations about weekends and holidays.",
          pt: "“Días” sozinho — o qualificador administra as expectativas sobre fins de semana e feriados.",
        },
        register: REG_NEUTRAL,
      },
      {
        term: "Verification QR",
        termEs: "QR de verificación",
        termPt: "QR de verificação",
        use: {
          es: "El código QR del comprobante en flujos de retiro en efectivo. El destinatario lo escanea en el lugar de retiro (Elektra, etc.) para confirmar la recepción.",
          en: "The QR code in the comprobante of cash pickup flows. The recipient scans it at the pickup location (Elektra, etc.) to confirm receipt.",
          pt: "O código QR do comprovante nos fluxos de retirada em dinheiro. O destinatário o escaneia no local de retirada (Elektra etc.) para confirmar o recebimento.",
        },
        avoid: {
          es: "“Código QR” solo — el calificador “de verificación” lo distingue de otros usos de QR en el producto.",
          en: "“Código QR” alone — the “de verificación” qualifier distinguishes it from other QR uses in the product.",
          pt: "“Código QR” sozinho — o qualificador “de verificación” o distingue de outros usos de QR no produto.",
        },
        register: REG_NEUTRAL,
      },
    ],
  },
];
