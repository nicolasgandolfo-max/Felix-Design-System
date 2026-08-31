import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  Logo,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@felix/ui";
import { GlobeIcon, CaretDownIcon } from "@phosphor-icons/react";
import { useLang, useTr } from "../i18n";

/* Destinos aún sin sección propia en el portal — apuntan al archivo de Figma
   hasta que existan como rutas. Mismo criterio que PlazaHome. */
const FIGMA_GUIDELINES_URL =
  "https://www.figma.com/design/N9dG8uXXR7FkLkuSZT5oex/DRAFT-Conversational-Guidelines";
const WA_LIST_DOCS_URL =
  "https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/interactive-list-messages";

/* Los PNG exportados viven en /public/assets/patterns. Mientras falten, el
   slot queda vacío pero el layout no se rompe. */
const ASSETS = "/assets/patterns";

/** Estado de disponibilidad de un recurso, mapeado a los tokens de status. */
type Availability = "ok" | "draft" | "tbd";

const AVAILABILITY_CLASSES: Record<Availability, string> = {
  ok: "bg-status-success-bg text-status-success-text",
  /* `muted-foreground` es demasiado claro sobre `muted`; `foreground` invierte
     bien con el tema y mantiene el contraste. */
  draft: "bg-muted text-foreground",
  tbd: "bg-status-warning-bg text-status-warning-text",
};

function AvailabilityPill({
  status,
  children,
}: {
  status: Availability;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-sans text-xs font-semibold ${AVAILABILITY_CLASSES[status]}`}
    >
      {children}
    </span>
  );
}

/** Par Do / Don't. La imagen es el screen de WhatsApp; la barra la ponemos acá. */
function Example({
  tone,
  label,
  src,
  alt,
  caption,
}: {
  tone: "do" | "dont";
  label: string;
  src: string;
  alt: string;
  caption: string;
}) {
  const bar =
    tone === "do"
      ? "bg-status-success text-primary-foreground"
      : "bg-status-error text-primary-foreground";

  return (
    <figure className="m-0 overflow-hidden rounded-lg border border-border">
      <div
        className={`flex items-center gap-2 px-4 py-3 font-sans text-sm font-bold ${bar}`}
      >
        <span aria-hidden="true">{tone === "do" ? "✓" : "✕"}</span>
        {label}
      </div>
      <div className="bg-muted p-4">
        <img src={src} alt={alt} className="mx-auto block max-w-full" />
      </div>
      <figcaption className="px-4 pb-4 pt-3 font-sans text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

export function PatternClosedInput() {
  const tr = useTr();
  const { lang, setLang } = useLang();

  useEffect(() => {
    const prev = document.title;
    document.title = `${tr("Entrada cerrada", "Closed input")} · Félix`;
    return () => {
      document.title = prev;
    };
  }, [tr]);

  return (
    /* Wrapper con tokens en lugar de `.plaza`, que tiene `background: #fff`
       hardcodeado y dejaría la página clara en dark mode. Las clases de chrome
       (`plaza-nav`, `plaza-footer`) sí se reusan para no duplicar CSS. */
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* ── Nav compartida: reusa las clases de PlazaHome para no duplicar CSS ── */}
      <header className="plaza-nav">
        <Link to="/" className="plaza-brand" aria-label="Plaza Félix — inicio">
          <Logo type="logotype" height={42} />
        </Link>
        <nav
          className="plaza-nav-links"
          aria-label={tr("Secciones", "Sections", "Seções")}
        >
          <Link to="/">{tr("Inicio", "Home", "Início")}</Link>
          <Link to="/sistema">Design System</Link>
          <a href={FIGMA_GUIDELINES_URL} target="_blank" rel="noreferrer">
            {tr("Voz y tono", "Voice and tone", "Voz e tom")}
          </a>
          <Link to="/patrones/entrada-cerrada" aria-current="page">
            {tr(
              "Guías conversacionales",
              "Conversational guidelines",
              "Guias de conversa"
            )}
          </Link>
        </nav>
        <div className="header-right">
          <div className="lang-dropdown">
            <GlobeIcon size={18} />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "es" | "en" | "pt")}
              aria-label={tr(
                "Seleccionar idioma",
                "Select language",
                "Selecionar idioma"
              )}
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="pt">PT</option>
            </select>
            <CaretDownIcon size={14} className="caret" />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-7 pb-16">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="mt-4 grid items-center gap-10 rounded-3xl bg-card p-8 md:grid-cols-2 md:p-14">
          <div>
            <Breadcrumb className="mb-4">
              <BreadcrumbList className="uppercase tracking-wider">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/patrones">
                      {tr(
                        "Guías conversacionales",
                        "Conversational guidelines",
                        "Guias de conversa"
                      )}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {tr("Entrada cerrada", "Closed input", "Entrada fechada")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="font-heading text-5xl leading-none tracking-display text-foreground md:text-6xl">
              {tr("Entrada cerrada", "Closed Input", "Entrada fechada")}
            </h1>

            <p className="mt-4 max-w-[42ch] font-sans text-lg text-secondary">
              {tr(
                "Botones o una lista cuando el conjunto de respuestas posibles se conoce. El usuario elige; nunca tiene que adivinar cómo escribirlo.",
                "Buttons or a list when the set of possible answers is known. The user picks; they never have to guess the wording."
              )}
            </p>
          </div>

          <img
            src={`${ASSETS}/closed-input-screens.png`}
            alt={tr(
              "Tres pantallas de WhatsApp mostrando preguntas con botones y con lista de opciones",
              "Three WhatsApp screens showing questions with reply buttons and with an options list",
              "Três telas de WhatsApp mostrando perguntas com botões e com lista de opções"
            )}
            className="w-full"
          />
        </section>

        {/* ── Tabs ──────────────────────────────────────────────────────── */}
        <Tabs defaultValue="overview" className="mt-10">
          {/* `--card` y `--background` son el mismo valor en claro, así que el
              track va en `bg-muted` para que el pill activo (`bg-background`
              por defecto en el DS) tenga contraste en ambos temas. */}
          <TabsList className="w-full max-w-[540px] rounded-full bg-muted p-2">
            {(
              [
                ["overview", tr("Resumen", "Overview", "Resumo")],
                ["specs", tr("Especificaciones", "Specs", "Especificações")],
                ["guidelines", tr("Guías", "Guidelines", "Diretrizes")],
              ] as const
            ).map(([value, label]) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex-1 rounded-full px-4 py-3 font-heading text-base"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── Overview ─────────────────────────────────────────────── */}
          <TabsContent value="overview" className="pt-8">
            <div className="grid items-start gap-11 md:grid-cols-2">
              <div>
                <h2 className="font-heading text-3xl tracking-heading text-foreground">
                  {tr("Cuándo usarlo", "Usage", "Quando usar")}
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-6 font-sans text-base text-foreground">
                  <li>
                    {tr(
                      "Usá botones cuando hay de 1 a 3 opciones conocidas.",
                      "Use buttons when there are 1 to 3 known options."
                    )}
                  </li>
                  <li>
                    {tr(
                      "Usá una lista cuando hay de 4 a 10 opciones conocidas.",
                      "Use a list when there are 4 to 10 known options."
                    )}
                  </li>
                  <li>
                    {tr(
                      "Más de 10 opciones: repensá la pregunta, es demasiado amplia para un solo paso.",
                      "Beyond 10 options, rethink the question, it is too broad for a single step."
                    )}
                  </li>
                  <li>
                    {tr(
                      "Nunca hagas que el usuario adivine cómo escribir algo de un conjunto que ya conocés.",
                      "Never make the user guess the wording for a set you already know."
                    )}
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-primary p-7 text-primary-foreground">
                <h2 className="font-heading text-2xl tracking-heading">
                  {tr(
                    "Por qué funciona · métricas por confirmar",
                    "Why this works · metrics TBD",
                    "Por que funciona · métricas a confirmar"
                  )}
                </h2>
                <p className="mt-3 font-sans text-base">
                  {tr(
                    "La entrada cerrada mantiene las respuestas no clasificables cerca de cero, mientras que el texto libre genera la mayoría de las fallas del bot (",
                    "Closed input keeps unclassifiable answers near zero, where open text drives the majority of bot failures ("
                  )}
                  <code className="rounded-xs bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">
                    NOT_ASSIGNED_YET
                  </code>
                  {tr(
                    " = 64% del total de fallas). Los botones sostienen el flujo de modificación: ahí el texto libre es apenas 1,6%.",
                    " = 64% of failures overall). Buttons carry the modify flow: free text there is only 1.6%."
                  )}
                </p>
                <p className="mt-3 font-sans text-sm opacity-80">
                  {tr(
                    "Por medir: ratio de taps en botón vs. tipeo, y abandono en este paso. Ver el mapa de cruce con Amplitude.",
                    "To pull: button-tap vs typed ratio and abandonment at this step. See the Amplitude cross-check map."
                  )}
                </p>
              </div>
            </div>

            <section className="mt-14">
              <h2 className="font-heading text-3xl tracking-heading text-foreground">
                {tr(
                  "Recursos y disponibilidad",
                  "Resources & availability",
                  "Recursos e disponibilidade"
                )}
              </h2>
              <div className="mt-4 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{tr("Tipo", "Type", "Tipo")}</TableHead>
                      <TableHead>
                        {tr("Recurso", "Resource", "Recurso")}
                      </TableHead>
                      <TableHead>{tr("Estado", "Status", "Estado")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{tr("Diseño", "Design", "Design")}</TableCell>
                      <TableCell>
                        <Button asChild variant="primary" size="sm">
                          <a
                            href={FIGMA_GUIDELINES_URL}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {tr(
                              "Librería de WhatsApp (Figma)",
                              "WhatsApp Library (Figma)",
                              "Biblioteca do WhatsApp (Figma)"
                            )}
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <AvailabilityPill status="ok">
                          {tr("Disponible", "Available", "Disponível")}
                        </AvailabilityPill>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{tr("Copy", "Copy", "Copy")}</TableCell>
                      <TableCell>
                        {tr(
                          "Documento de contenido",
                          "Content doc",
                          "Documento de conteúdo"
                        )}
                      </TableCell>
                      <TableCell>
                        <AvailabilityPill status="draft">
                          {tr("Borrador", "Draft", "Rascunho")}
                        </AvailabilityPill>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{tr("Datos", "Data", "Dados")}</TableCell>
                      <TableCell>
                        {tr(
                          "Cruce con Amplitude",
                          "Amplitude cross-check",
                          "Cruzamento com Amplitude"
                        )}
                      </TableCell>
                      <TableCell>
                        <AvailabilityPill status="tbd">
                          {tr("Por confirmar", "TBD", "A confirmar")}
                        </AvailabilityPill>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>
          </TabsContent>

          {/* ── Specs ────────────────────────────────────────────────── */}
          <TabsContent value="specs" className="pt-8">
            <h2 className="font-heading text-3xl tracking-heading text-foreground">
              {tr("Especificaciones", "Specs", "Especificações")}
            </h2>
            <p className="mt-2 font-sans text-base text-secondary">
              {tr(
                "Los límites de WhatsApp que definen este patrón. Diseñá dentro de ellos.",
                "The WhatsApp limits that define this pattern. Design within them."
              )}
            </p>

            <h3 className="mt-8 font-heading text-lg tracking-heading text-foreground">
              {tr("Botones de respuesta", "Reply buttons", "Botões de resposta")}
            </h3>
            <div className="mt-3 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      {tr("Componente", "Component", "Componente")}
                    </TableHead>
                    <TableHead>
                      {tr("Límite", "Spec", "Limite")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {tr(
                        "Botones por mensaje",
                        "Buttons per message",
                        "Botões por mensagem"
                      )}
                    </TableCell>
                    <TableCell>
                      {tr("Hasta", "Up to", "Até")} <strong>3</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {tr(
                        "Etiqueta del botón",
                        "Button label",
                        "Rótulo do botão"
                      )}
                    </TableCell>
                    <TableCell>
                      {tr("Máx.", "Max", "Máx.")} <strong>20</strong>{" "}
                      {tr("caracteres", "characters", "caracteres")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <h3 className="mt-10 font-heading text-lg tracking-heading text-foreground">
              {tr("Mensaje de lista", "List message", "Mensagem de lista")}
            </h3>
            <div className="mt-3 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      {tr("Elemento", "Element", "Elemento")}
                    </TableHead>
                    <TableHead>{tr("Límite", "Limit", "Limite")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {tr("Secciones", "Sections", "Seções")}
                    </TableCell>
                    <TableCell>
                      {tr(
                        "Hasta 10 secciones, hasta 10 filas en total entre todas las secciones",
                        "Up to 10 sections, up to 10 rows total across all sections combined"
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {tr(
                        "Botón (abre la lista)",
                        "Button (opens the list)",
                        "Botão (abre a lista)"
                      )}
                    </TableCell>
                    <TableCell>
                      {tr(
                        "Un botón, etiqueta máx. 20 caracteres",
                        "One button, label max 20 characters"
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{tr("Encabezado", "Header", "Cabeçalho")}</TableCell>
                    <TableCell>
                      {tr(
                        "Opcional, solo texto, máx. 60 caracteres",
                        "Optional, text only, max 60 characters"
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{tr("Cuerpo", "Body", "Corpo")}</TableCell>
                    <TableCell>
                      {tr(
                        "Máx. 4.096 caracteres",
                        "Max 4,096 characters",
                        "Máx. 4.096 caracteres"
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{tr("Pie", "Footer", "Rodapé")}</TableCell>
                    <TableCell>
                      {tr(
                        "Opcional, máx. 60 caracteres",
                        "Optional, max 60 characters"
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {tr("Título de fila", "Row title", "Título da linha")}
                    </TableCell>
                    <TableCell>
                      {tr("Máx. 24 caracteres", "Max 24 characters")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {tr(
                        "Descripción de fila",
                        "Row description",
                        "Descrição da linha"
                      )}
                    </TableCell>
                    <TableCell>
                      {tr(
                        "Opcional, máx. 72 caracteres",
                        "Optional, max 72 characters"
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className="mt-3 font-sans text-sm text-secondary">
              {tr(
                "Fuente: WhatsApp Cloud API, mensajes de lista interactivos (actualizado jul. 2026). ",
                "Source: WhatsApp Cloud API, interactive list messages (updated Jul 2026). "
              )}
              <a
                href={WA_LIST_DOCS_URL}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                developers.facebook.com
              </a>
            </p>

            <h3 className="mt-10 font-heading text-lg tracking-heading text-foreground">
              {tr(
                "Decisión: cómo preguntar",
                "Decision: how to ask",
                "Decisão: como perguntar"
              )}
            </h3>
            <div className="mt-3 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{tr("Opciones", "Options", "Opções")}</TableHead>
                    <TableHead>
                      {tr("Componente", "Variable", "Componente")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {tr("1 a 3 opciones", "1 to 3 options", "1 a 3 opções")}
                    </TableCell>
                    <TableCell>
                      {tr(
                        "Botones de respuesta",
                        "Reply buttons",
                        "Botões de resposta"
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {tr("4 a 10 opciones", "4 to 10 options", "4 a 10 opções")}
                    </TableCell>
                    <TableCell>
                      {tr("Mensaje de lista", "List message", "Mensagem de lista")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {tr("Más de 10", "More than 10", "Mais de 10")}
                    </TableCell>
                    <TableCell>
                      {tr(
                        "Repensar el flujo",
                        "Rethink the flow",
                        "Repensar o fluxo"
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* ── Guidelines ───────────────────────────────────────────── */}
          <TabsContent value="guidelines" className="pt-8">
            <h2 className="font-heading text-3xl tracking-heading text-foreground">
              {tr("Guías", "Guidelines", "Diretrizes")}
            </h2>

            <div className="mt-6 grid gap-11 md:grid-cols-2">
              <div>
                <h3 className="font-heading text-lg tracking-heading text-foreground">
                  {tr("Cuándo usarlo", "Usage", "Quando usar")}
                </h3>
                <p className="mt-2 font-sans text-base text-foreground">
                  {tr(
                    "Recurrí a la entrada cerrada siempre que el conjunto de respuestas se conozca de antemano. Mantiene a la gente en un camino que el bot puede leer, y le saca la adivinanza a un paso que si no se trabaría.",
                    "Reach for closed input whenever the set of answers is known in advance. It keeps people on a path the bot can read, and it takes the guesswork out of a step that would otherwise stall."
                  )}
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg tracking-heading text-foreground">
                  {tr("Tips", "Tips", "Dicas")}
                </h3>
                <p className="mt-2 font-sans text-base text-foreground">
                  {tr(
                    "Escribí cada opción como la diría el usuario, no como la guarda el sistema. Mantené las etiquetas cortas, asegurate de que ninguna se solape con otra, y ordenalas por frecuencia de uso o en una secuencia que ya tenga sentido (de menor a mayor monto, del destino más al menos común).",
                    "Write each option the way the user would say it, not the way the system stores it. Keep the labels short, make sure no two overlap, and order them by how often they get picked or in a sequence that already makes sense (lowest to highest amount, most to least common destination)."
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Example
                tone="do"
                label={tr("Sí", "Do", "Sim")}
                src={`${ASSETS}/do1.png`}
                alt={tr(
                  "Pregunta de WhatsApp con las opciones conocidas como botones",
                  "WhatsApp question offering the known options as reply buttons",
                  "Pergunta de WhatsApp com as opções conhecidas como botões"
                )}
                caption={tr(
                  "Ofrecé las opciones conocidas como botones. Un tap, sin tipear.",
                  "Offer the known options as buttons. One tap, no typing."
                )}
              />
              <Example
                tone="dont"
                label={tr("No", "Don't", "Não")}
                src={`${ASSETS}/dont1.png`}
                alt={tr(
                  "Pregunta de WhatsApp dejando un conjunto conocido como texto abierto",
                  "WhatsApp question leaving a known set as open text",
                  "Pergunta de WhatsApp deixando um conjunto conhecido como texto aberto"
                )}
                caption={tr(
                  "No dejes un conjunto conocido como texto abierto. La respuesta se vuelve difícil de interpretar.",
                  "Don't leave a known set as open text. The reply gets hard to parse."
                )}
              />
              <Example
                tone="do"
                label={tr("Sí", "Do", "Sim")}
                src={`${ASSETS}/do2.png`}
                alt={tr(
                  "Pregunta de WhatsApp usando un mensaje de lista para más de tres opciones",
                  "WhatsApp question using a list message for more than three options",
                  "Pergunta de WhatsApp usando uma mensagem de lista para mais de três opções"
                )}
                caption={tr(
                  "Usá una lista cuando hay más de 3 opciones.",
                  "Use a list when there are more than 3 options."
                )}
              />
              <Example
                tone="dont"
                label={tr("No", "Don't", "Não")}
                src={`${ASSETS}/dont2.png`}
                alt={tr(
                  "Pregunta de WhatsApp amontonando muchas opciones en un solo mensaje",
                  "WhatsApp question cramming many options into a single message",
                  "Pergunta de WhatsApp amontoando muitas opções em uma única mensagem"
                )}
                caption={tr(
                  "No amontones muchas opciones en un mensaje ni en botones.",
                  "Don't cram many options into one message or into buttons."
                )}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* ── Explorar patrones ─────────────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="font-heading text-3xl tracking-heading text-foreground">
            {tr("Explorar patrones", "Explore patterns", "Explorar padrões")}
          </h2>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <Card>
              <h3 className="font-heading text-lg tracking-heading text-foreground">
                {tr("Entrada abierta", "Open input", "Entrada aberta")}
              </h3>
              <p className="font-sans text-sm text-secondary">
                {tr(
                  "Cuando la respuesta no se puede anticipar y hay que dejar escribir.",
                  "When the answer can't be anticipated and you have to let people type."
                )}
              </p>
              <Button variant="line" size="sm" disabled>
                {tr("Próximamente", "Coming soon", "Em breve")}
              </Button>
            </Card>
            <Card>
              <h3 className="font-heading text-lg tracking-heading text-foreground">
                {tr(
                  "Entrada mixta (botones y pregunta abierta)",
                  "Mixed input (buttons and open question)",
                  "Entrada mista (botões e pergunta aberta)"
                )}
              </h3>
              <p className="font-sans text-sm text-secondary">
                {tr(
                  "Atajos conocidos como botones, con la puerta abierta a escribir otra cosa.",
                  "Known shortcuts as buttons, with the door open to type something else."
                )}
              </p>
              <Button variant="line" size="sm" disabled>
                {tr("Próximamente", "Coming soon", "Em breve")}
              </Button>
            </Card>
          </div>
        </section>
      </main>

      {/* ── Footer compartido ───────────────────────────────────────────── */}
      <footer className="plaza-footer">
        <p>
          {tr(
            "Hecho con amor por el equipo de diseño de Félix",
            "Made with love by Félix Design Team",
            "Feito com amor pela equipe de design do Félix"
          )}
        </p>
        <p>
          © 2026 Felix Technologies Inc.{" "}
          {tr(
            "Todos los derechos reservados.",
            "All rights reserved.",
            "Todos os direitos reservados."
          )}
        </p>
      </footer>
    </div>
  );
}
