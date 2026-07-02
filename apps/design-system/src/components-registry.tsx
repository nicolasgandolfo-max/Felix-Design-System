import { useState, type ReactNode } from "react";
import {
  // Atoms
  Avatar, AvatarFallback,
  Badge, Button, Checkbox, CoinLoader, Dots, IconButton,
  Input, Label, Logo, Progress, RadioGroup, RadioGroupItem, Separator,
  Skeleton, Slider, Spinner, Switch, Text, Textarea,
  // Molecules
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Alert, AlertTitle, AlertDescription,
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
  Calendar,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  ChoiceCard, ChoiceCardGroup,
  Collapse, CollapseTrigger, CollapseContent,
  DatePicker,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  HoverCard, HoverCardTrigger, HoverCardContent,
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis,
  Popover, PopoverTrigger, PopoverContent,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter, SheetClose,
  SidebarFooter,
  Stepper,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Toaster, toast,
  Tooltip, TooltipProvider, TooltipTrigger, TooltipContent,
  // Organisms
  Sidebar, SidebarHeader, SidebarBody, SidebarSection, SidebarNavItem,
} from "@felix/ui";
import {
  PencilSimpleIcon,
  TrashIcon,
  PlusIcon,
  PaperPlaneTiltIcon,
  HeartIcon,
  HouseIcon,
  UserIcon,
} from "@phosphor-icons/react";

export interface Showcase {
  /** Short bilingual description shown under the component title. */
  es: string;
  en: string;
  pt: string;
  /** What the component is for and how to use it (shadcn-style docs paragraph). */
  usage: { es: string; en: string; pt: string };
  render: () => ReactNode;
  /** Compact, non-interactive visual used in the components index card. */
  preview: () => ReactNode;
  /** Use a taller preview box for components that don't compress well (Calendar, Sidebar). */
  previewTall?: boolean;
}

/** A labelled demo block. `col` stacks items vertically. */
function Demo({ label, children, col }: { label: string; children: ReactNode; col?: boolean }) {
  return (
    <div className="panel">
      <div className="ph">{label}</div>
      <div className="cluster" style={col ? { flexDirection: "column", alignItems: "flex-start", gap: 16 } : undefined}>
        {children}
      </div>
    </div>
  );
}

/**
 * Live showcases for the design system, keyed by component slug.
 * Each `render` mounts the REAL @felix/ui component. Add a component =
 * add an entry here (the index and detail pages pick it up automatically).
 */
export const SHOWCASES: Record<string, Showcase> = {
  avatar: {
    es: "Imagen de perfil con iniciales de respaldo, 5 tamaños y estado.",
    en: "Profile image with initials fallback, 5 sizes, and status.",
    pt: "Imagem de perfil com iniciais de reserva, 5 tamanhos e status.",
    usage: {
      es: "Representa a una persona en listas de destinatarios, headers y comprobantes. Importalo desde @felix/ui junto con AvatarFallback para las iniciales cuando no hay foto. Controlá el tamaño con size (xs a xl) y mostrá un punto de estado con status (success, warning, danger o neutral).",
      en: "Represents a person in recipient lists, headers, and receipts. Import it from @felix/ui together with AvatarFallback for initials when there's no photo. Control the size with size (xs to xl) and show a status dot with status (success, warning, danger, or neutral).",
      pt: "Representa uma pessoa em listas de destinatários, headers e comprovantes. Importe de @felix/ui junto com AvatarFallback para as iniciais quando não há foto. Controle o tamanho com size (xs a xl) e mostre um ponto de status com status (success, warning, danger ou neutral).",
    },
    preview: () => <Avatar size="lg"><AvatarFallback>MG</AvatarFallback></Avatar>,
    render: () => (
      <>
        <Demo label="Tamaños · xs → xl">
          <Avatar size="xs"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="sm"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="md"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="xl"><AvatarFallback>MG</AvatarFallback></Avatar>
        </Demo>
        <Demo label="Estado">
          <Avatar size="lg" status="success"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="lg" status="warning"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="lg" status="danger"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="lg" status="neutral"><AvatarFallback>MG</AvatarFallback></Avatar>
        </Demo>
      </>
    ),
  },
  badge: {
    es: "Etiqueta pill para estados y metadatos.",
    en: "Pill label for status and metadata.",
    pt: "Rótulo pill para status e metadados.",
    usage: {
      es: "Etiqueta compacta de solo lectura para estados y metadatos: promos, estados de envío, features beta. Importalo desde @felix/ui y elegí el estilo con variant: default, secondary, destructive, outline, ghost o dark. No es interactivo; si necesitás una acción, usá Button o IconButton.",
      en: "Compact read-only label for status and metadata: promos, transfer states, beta features. Import it from @felix/ui and pick the style with variant: default, secondary, destructive, outline, ghost, or dark. It's not interactive; if you need an action, use Button or IconButton.",
      pt: "Rótulo compacto somente leitura para status e metadados: promoções, estados de envio, features beta. Importe de @felix/ui e escolha o estilo com variant: default, secondary, destructive, outline, ghost ou dark. Não é interativo; se você precisa de uma ação, use Button ou IconButton.",
    },
    preview: () => (
      <div style={{ display: "flex", gap: 8 }}>
        <Badge variant="default">Nuevo</Badge>
        <Badge variant="secondary">Promo</Badge>
      </div>
    ),
    render: () => (
      <Demo label="Variantes">
        <Badge variant="default">Nuevo</Badge>
        <Badge variant="secondary">Promo</Badge>
        <Badge variant="destructive">Cancelado</Badge>
        <Badge variant="outline">Borrador</Badge>
        <Badge variant="ghost">Etiqueta</Badge>
        <Badge variant="dark">Beta</Badge>
      </Demo>
    ),
  },
  button: {
    es: "Acción principal. 5 variantes y 3 tamaños; pill siempre.",
    en: "Primary action. 5 variants and 3 sizes; always a pill.",
    pt: "Ação principal. 5 variantes e 3 tamanhos; sempre pill.",
    usage: {
      es: "La acción principal de cada pantalla, siempre con forma pill. Importalo desde @felix/ui y elegí variant (primary, secondary, ghost, line o danger) y size (sm, md o lg). Acepta disabled y fullWidth para ocupar todo el ancho. Regla del sistema: un solo botón primary por pantalla.",
      en: "The main action on every screen, always pill-shaped. Import it from @felix/ui and choose variant (primary, secondary, ghost, line, or danger) and size (sm, md, or lg). It accepts disabled and fullWidth to span the full width. System rule: only one primary button per screen.",
      pt: "A ação principal de cada tela, sempre em formato pill. Importe de @felix/ui e escolha variant (primary, secondary, ghost, line ou danger) e size (sm, md ou lg). Aceita disabled e fullWidth para ocupar toda a largura. Regra do sistema: um único botão primary por tela.",
    },
    preview: () => <Button variant="primary"><PaperPlaneTiltIcon />Enviar dinero</Button>,
    render: () => (
      <>
        <Demo label="Variantes">
          <Button variant="primary"><PaperPlaneTiltIcon />Enviar dinero</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="ghost">Ahora no</Button>
          <Button variant="line">Editar</Button>
          <Button variant="danger">Eliminar</Button>
        </Demo>
        <Demo label="Tamaños">
          <Button size="sm">sm · 36</Button>
          <Button size="md">md · 48</Button>
          <Button size="lg">lg · 56</Button>
        </Demo>
        <Demo label="Estados">
          <Button variant="primary" disabled>Deshabilitado</Button>
          <Button variant="primary" fullWidth>Ancho completo</Button>
        </Demo>
      </>
    ),
  },
  checkbox: {
    es: "Selección múltiple. Componer con Label vía id.",
    en: "Multi-select. Compose with Label via id.",
    pt: "Seleção múltipla. Combine com Label via id.",
    usage: {
      es: "Selección de una o varias opciones independientes, como aceptar términos o aplicar filtros. Importalo desde @felix/ui y combinalo con Label conectando id y htmlFor. Soporta defaultChecked y disabled; si no tiene etiqueta visible, pasale un aria-label.",
      en: "Select one or more independent options, like accepting terms or applying filters. Import it from @felix/ui and pair it with Label by connecting id and htmlFor. It supports defaultChecked and disabled; if there's no visible label, pass an aria-label.",
      pt: "Seleção de uma ou mais opções independentes, como aceitar termos ou aplicar filtros. Importe de @felix/ui e combine com Label conectando id e htmlFor. Suporta defaultChecked e disabled; se não houver rótulo visível, passe um aria-label.",
    },
    preview: () => (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Checkbox id="cb-prev" defaultChecked />
        <Label htmlFor="cb-prev">Acepto los términos</Label>
      </div>
    ),
    render: () => (
      <>
        <Demo label="Estados">
          <Checkbox defaultChecked aria-label="Marcado" />
          <Checkbox aria-label="Sin marcar" />
          <Checkbox defaultChecked disabled aria-label="Deshabilitado" />
        </Demo>
        <Demo label="Con etiqueta">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Checkbox id="cb-terms" defaultChecked />
            <Label htmlFor="cb-terms">Acepto los términos</Label>
          </div>
        </Demo>
      </>
    ),
  },
  coinloader: {
    es: "Loader de marca (la moneda de Felix) para esperas largas.",
    en: "Branded loader (Felix's coin) for longer waits.",
    pt: "Loader da marca (a moeda do Felix) para esperas mais longas.",
    usage: {
      es: "Loader de marca con la moneda de Felix para esperas largas, como procesar una transferencia. Importalo desde @felix/ui, ajustá el tamaño con size (sm, md o lg) y pasale un label descriptivo para lectores de pantalla. Para cargas cortas o en línea, preferí Spinner o Dots.",
      en: "Branded loader featuring Felix's coin for longer waits, like processing a transfer. Import it from @felix/ui, set the size with size (sm, md, or lg), and pass a descriptive label for screen readers. For short or inline loads, prefer Spinner or Dots.",
      pt: "Loader da marca com a moeda do Felix para esperas mais longas, como processar uma transferência. Importe de @felix/ui, ajuste o tamanho com size (sm, md ou lg) e passe um label descritivo para leitores de tela. Para cargas curtas ou em linha, prefira Spinner ou Dots.",
    },
    preview: () => <CoinLoader size="lg" label="Cargando" />,
    render: () => (
      <Demo label="Tamaños">
        <CoinLoader size="sm" label="Cargando" />
        <CoinLoader size="md" label="Cargando" />
        <CoinLoader size="lg" label="Cargando" />
      </Demo>
    ),
  },
  dots: {
    es: "Indicador de carga compacto en línea.",
    en: "Compact inline loading indicator.",
    pt: "Indicador de carregamento compacto em linha.",
    usage: {
      es: "Indicador de carga compacto para contextos en línea, como dentro de un botón o junto a un texto. Importalo desde @felix/ui, elegí el tamaño con size (sm, md o lg) y pasale un label accesible. Para esperas largas con presencia de marca, usá CoinLoader.",
      en: "Compact loading indicator for inline contexts, like inside a button or next to text. Import it from @felix/ui, pick the size with size (sm, md, or lg), and pass an accessible label. For longer branded waits, use CoinLoader.",
      pt: "Indicador de carregamento compacto para contextos em linha, como dentro de um botão ou ao lado de um texto. Importe de @felix/ui, escolha o tamanho com size (sm, md ou lg) e passe um label acessível. Para esperas longas com presença de marca, use CoinLoader.",
    },
    preview: () => <Dots size="lg" label="Cargando" />,
    render: () => (
      <Demo label="Tamaños">
        <Dots size="sm" label="Cargando" />
        <Dots size="md" label="Cargando" />
        <Dots size="lg" label="Cargando" />
      </Demo>
    ),
  },
  iconbutton: {
    es: "Botón solo-ícono. Mismas variantes que Button. aria-label obligatorio.",
    en: "Icon-only button. Same variants as Button. aria-label required.",
    pt: "Botão só de ícone. Mesmas variantes do Button. aria-label obrigatório.",
    usage: {
      es: "Botón de solo ícono para acciones compactas como editar, eliminar o agregar. Importalo desde @felix/ui, pasale el ícono por la prop icon y elegí variant (primary, secondary, ghost, line o danger) y size (sm, md o lg), igual que Button. El aria-label es obligatorio porque no hay texto visible.",
      en: "Icon-only button for compact actions like edit, delete, or add. Import it from @felix/ui, pass the icon through the icon prop, and choose variant (primary, secondary, ghost, line, or danger) and size (sm, md, or lg), same as Button. The aria-label is required because there's no visible text.",
      pt: "Botão só de ícone para ações compactas como editar, excluir ou adicionar. Importe de @felix/ui, passe o ícone pela prop icon e escolha variant (primary, secondary, ghost, line ou danger) e size (sm, md ou lg), igual ao Button. O aria-label é obrigatório porque não há texto visível.",
    },
    preview: () => <IconButton variant="primary" aria-label="Favorito" icon={<HeartIcon />} />,
    render: () => (
      <>
        <Demo label="Variantes">
          <IconButton variant="primary" aria-label="Agregar" icon={<PlusIcon />} />
          <IconButton variant="secondary" aria-label="Editar" icon={<PencilSimpleIcon />} />
          <IconButton variant="ghost" aria-label="Favorito" icon={<HeartIcon />} />
          <IconButton variant="line" aria-label="Editar" icon={<PencilSimpleIcon />} />
          <IconButton variant="danger" aria-label="Eliminar" icon={<TrashIcon />} />
        </Demo>
        <Demo label="Tamaños">
          <IconButton size="sm" aria-label="Agregar" icon={<PlusIcon />} />
          <IconButton size="md" aria-label="Agregar" icon={<PlusIcon />} />
          <IconButton size="lg" aria-label="Agregar" icon={<PlusIcon />} />
        </Demo>
      </>
    ),
  },
  input: {
    es: "Campo de texto con label flotante y helper/error.",
    en: "Text field with floating label and helper/error.",
    pt: "Campo de texto com label flutuante e helper/erro.",
    usage: {
      es: "Campo de texto de una línea con label flotante, ideal para montos, correos y datos del destinatario. Importalo desde @felix/ui y pasale el texto con la prop label. Usá description para un texto de ayuda debajo del campo y error para el mensaje de validación, que lo reemplaza y pinta el campo en rojo.",
      en: "Single-line text field with a floating label, ideal for amounts, emails, and recipient data. Import it from @felix/ui and pass the text through the label prop. Use description for helper text below the field and error for the validation message, which replaces it and turns the field red.",
      pt: "Campo de texto de uma linha com label flutuante, ideal para valores, e-mails e dados do destinatário. Importe de @felix/ui e passe o texto pela prop label. Use description para um texto de ajuda abaixo do campo e error para a mensagem de validação, que o substitui e deixa o campo em vermelho.",
    },
    preview: () => (
      <div style={{ width: 200 }}>
        <Input label="Monto a enviar" defaultValue="$60.00 USD" />
      </div>
    ),
    render: () => (
      <Demo label="Estados" col>
        <div style={{ maxWidth: 340, width: "100%" }}>
          <Input label="Monto a enviar" description="Comisión $0.00 — sin sorpresas." defaultValue="$60.00 USD" />
        </div>
        <div style={{ maxWidth: 340, width: "100%" }}>
          <Input label="Correo" error="Ingresá un correo válido." defaultValue="maria@" />
        </div>
      </Demo>
    ),
  },
  label: {
    es: "Etiqueta de formulario. 4 variantes.",
    en: "Form label. 4 variants.",
    pt: "Rótulo de formulário. 4 variantes.",
    usage: {
      es: "Etiqueta de formulario para acompañar Input, Checkbox, Switch o RadioGroup. Importala desde @felix/ui y conectala al control con htmlFor apuntando a su id. Elegí el estilo con variant: default, required, optional o disabled.",
      en: "Form label to accompany Input, Checkbox, Switch, or RadioGroup. Import it from @felix/ui and connect it to the control with htmlFor pointing to its id. Pick the style with variant: default, required, optional, or disabled.",
      pt: "Rótulo de formulário para acompanhar Input, Checkbox, Switch ou RadioGroup. Importe de @felix/ui e conecte ao controle com htmlFor apontando para o id dele. Escolha o estilo com variant: default, required, optional ou disabled.",
    },
    preview: () => <Label variant="required">Campo obligatorio</Label>,
    render: () => (
      <Demo label="Variantes" col>
        <Label variant="default">Etiqueta por defecto</Label>
        <Label variant="required">Campo obligatorio</Label>
        <Label variant="optional">Campo opcional</Label>
        <Label variant="disabled">Campo deshabilitado</Label>
      </Demo>
    ),
  },
  logo: {
    es: "Marca Felix: logotipo y símbolo.",
    en: "Felix mark: logotype and symbol.",
    pt: "Marca Felix: logotipo e símbolo.",
    usage: {
      es: "La marca Felix para headers, sidebars y pantallas de carga. Importalo desde @felix/ui y elegí la forma con type: logotype para el logotipo completo, symbol para el símbolo solo o symbol-circular para la versión en círculo. Controlá el tamaño con la altura vía style o className, sin deformarlo.",
      en: "The Felix mark for headers, sidebars, and loading screens. Import it from @felix/ui and pick the form with type: logotype for the full wordmark, symbol for the standalone symbol, or symbol-circular for the circular version. Control the size through the height via style or className, without distorting it.",
      pt: "A marca Felix para headers, sidebars e telas de carregamento. Importe de @felix/ui e escolha a forma com type: logotype para o logotipo completo, symbol para o símbolo sozinho ou symbol-circular para a versão circular. Controle o tamanho pela altura via style ou className, sem deformar.",
    },
    preview: () => <Logo type="symbol-circular" style={{ height: 44 }} />,
    render: () => (
      <Demo label="Tipos">
        <Logo type="logotype" style={{ height: 32 }} />
        <Logo type="symbol" style={{ height: 32 }} />
        <Logo type="symbol-circular" style={{ height: 36 }} />
      </Demo>
    ),
  },
  progress: {
    es: "Barra de progreso determinada.",
    en: "Determinate progress bar.",
    pt: "Barra de progresso determinada.",
    usage: {
      es: "Barra de progreso determinada para procesos con avance medible, como completar un perfil o subir un documento. Importala desde @felix/ui y pasale el porcentaje con value (0 a 100), más un aria-label que describa el avance. Si no conocés el progreso, usá Spinner o CoinLoader.",
      en: "Determinate progress bar for processes with measurable progress, like completing a profile or uploading a document. Import it from @felix/ui and pass the percentage with value (0 to 100), plus an aria-label describing the progress. If the progress is unknown, use Spinner or CoinLoader.",
      pt: "Barra de progresso determinada para processos com avanço mensurável, como completar um perfil ou enviar um documento. Importe de @felix/ui e passe a porcentagem com value (0 a 100), além de um aria-label descrevendo o avanço. Se você não conhece o progresso, use Spinner ou CoinLoader.",
    },
    preview: () => (
      <div style={{ width: 180 }}>
        <Progress value={62} aria-label="62%" />
      </div>
    ),
    render: () => (
      <Demo label="Valores" col>
        <div style={{ width: 320, maxWidth: "100%" }}><Progress value={25} aria-label="25%" /></div>
        <div style={{ width: 320, maxWidth: "100%" }}><Progress value={62} aria-label="62%" /></div>
        <div style={{ width: 320, maxWidth: "100%" }}><Progress value={100} aria-label="100%" /></div>
      </Demo>
    ),
  },
  radiogroup: {
    es: "Selección única entre opciones. Componer con Label.",
    en: "Single choice among options. Compose with Label.",
    pt: "Seleção única entre opções. Combine com Label.",
    usage: {
      es: "Selección única entre pocas opciones visibles, como el canal de notificación. Importá RadioGroup y RadioGroupItem desde @felix/ui, definí la opción inicial con defaultValue y combiná cada ítem con Label conectando id y htmlFor. Si las opciones piden más jerarquía visual, usá ChoiceCard.",
      en: "Single choice among a few visible options, like the notification channel. Import RadioGroup and RadioGroupItem from @felix/ui, set the initial option with defaultValue, and pair each item with Label by connecting id and htmlFor. If the options call for more visual weight, use ChoiceCard.",
      pt: "Seleção única entre poucas opções visíveis, como o canal de notificação. Importe RadioGroup e RadioGroupItem de @felix/ui, defina a opção inicial com defaultValue e combine cada item com Label conectando id e htmlFor. Se as opções pedem mais hierarquia visual, use ChoiceCard.",
    },
    preview: () => (
      <RadioGroup defaultValue="whatsapp" aria-label="Canal">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <RadioGroupItem value="email" id="rg-prev-email" /><Label htmlFor="rg-prev-email">Correo</Label>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <RadioGroupItem value="whatsapp" id="rg-prev-wa" /><Label htmlFor="rg-prev-wa">WhatsApp</Label>
          </div>
        </div>
      </RadioGroup>
    ),
    render: () => (
      <Demo label="Opciones" col>
        <RadioGroup defaultValue="email" aria-label="Canal de notificación">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["email", "Correo electrónico"],
              ["sms", "SMS"],
              ["whatsapp", "WhatsApp"],
            ].map(([v, l]) => (
              <div key={v} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <RadioGroupItem value={v} id={`rg-${v}`} />
                <Label htmlFor={`rg-${v}`}>{l}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </Demo>
    ),
  },
  separator: {
    es: "Divisor horizontal o vertical, con o sin etiqueta.",
    en: "Horizontal or vertical divider, with or without a label.",
    pt: "Divisor horizontal ou vertical, com ou sem rótulo.",
    usage: {
      es: "Divisor sutil para separar bloques de contenido relacionado. Importalo desde @felix/ui; por defecto es horizontal y con orientation en vertical separa elementos en línea, como links de un footer. Acepta la prop label para divisores con texto, como la típica letra o entre métodos de acceso.",
      en: "Subtle divider to separate related blocks of content. Import it from @felix/ui; it's horizontal by default, and with orientation set to vertical it separates inline elements, like footer links. It accepts a label prop for divider text, like the classic or between sign-in methods.",
      pt: "Divisor sutil para separar blocos de conteúdo relacionados. Importe de @felix/ui; por padrão é horizontal e com orientation em vertical separa elementos em linha, como links de um footer. Aceita a prop label para divisores com texto, como o clássico ou entre métodos de acesso.",
    },
    preview: () => (
      <div style={{ width: 160 }}>
        <Separator label="o" />
      </div>
    ),
    render: () => (
      <Demo label="Orientaciones" col>
        <div style={{ width: 320, maxWidth: "100%" }}><Separator /></div>
        <div style={{ width: 320, maxWidth: "100%" }}><Separator label="o" /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, height: 32 }}>
          <span>Inicio</span>
          <Separator orientation="vertical" />
          <span>Envíos</span>
          <Separator orientation="vertical" />
          <span>Perfil</span>
        </div>
      </Demo>
    ),
  },
  skeleton: {
    es: "Placeholder de carga: texto, bloque o círculo.",
    en: "Loading placeholder: text, block, or circle.",
    pt: "Placeholder de carregamento: texto, bloco ou círculo.",
    usage: {
      es: "Placeholder de carga que imita la forma del contenido mientras llega la data. Importalo desde @felix/ui y elegí la forma con type: text, block o circle. Dale tamaño con className usando utilidades como w-full o size-12, y combiná varios para replicar el layout real.",
      en: "Loading placeholder that mimics the shape of the content while data arrives. Import it from @felix/ui and pick the shape with type: text, block, or circle. Size it with className using utilities like w-full or size-12, and combine several to mirror the real layout.",
      pt: "Placeholder de carregamento que imita a forma do conteúdo enquanto os dados chegam. Importe de @felix/ui e escolha a forma com type: text, block ou circle. Dimensione com className usando utilitários como w-full ou size-12, e combine vários para replicar o layout real.",
    },
    preview: () => (
      <div style={{ display: "flex", alignItems: "center", gap: 12, width: 190 }}>
        <Skeleton type="circle" className="size-10" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <Skeleton type="text" className="w-full" />
          <Skeleton type="text" className="w-2/3" />
        </div>
      </div>
    ),
    render: () => (
      <Demo label="Formas" col>
        <div style={{ display: "flex", alignItems: "center", gap: 14, width: 320, maxWidth: "100%" }}>
          <Skeleton type="circle" className="size-12" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <Skeleton type="text" className="w-2/3" />
            <Skeleton type="text" className="w-1/2" />
          </div>
        </div>
        <Skeleton type="block" className="h-24 w-full max-w-[320px]" />
      </Demo>
    ),
  },
  slider: {
    es: "Selección de un valor o un rango.",
    en: "Select a single value or a range.",
    pt: "Seleção de um valor único ou um intervalo.",
    usage: {
      es: "Selección de un valor o un rango arrastrando sobre una pista, útil para montos o filtros. Importalo desde @felix/ui y pasale defaultValue como array: un elemento para valor único, dos para un rango. Agregale un aria-label cuando no haya etiqueta visible.",
      en: "Pick a single value or a range by dragging along a track, useful for amounts or filters. Import it from @felix/ui and pass defaultValue as an array: one element for a single value, two for a range. Add an aria-label when there's no visible label.",
      pt: "Seleção de um valor ou um intervalo arrastando sobre uma trilha, útil para valores ou filtros. Importe de @felix/ui e passe defaultValue como array: um elemento para valor único, dois para um intervalo. Adicione um aria-label quando não houver rótulo visível.",
    },
    preview: () => (
      <div style={{ width: 190 }}>
        <Slider defaultValue={[40]} aria-label="Valor" />
      </div>
    ),
    render: () => (
      <Demo label="Valor y rango" col>
        <div style={{ width: 320, maxWidth: "100%" }}><Slider defaultValue={[40]} aria-label="Valor" /></div>
        <div style={{ width: 320, maxWidth: "100%" }}><Slider defaultValue={[20, 80]} aria-label="Rango" /></div>
      </Demo>
    ),
  },
  spinner: {
    es: "Indicador de carga circular.",
    en: "Circular loading indicator.",
    pt: "Indicador de carregamento circular.",
    usage: {
      es: "Indicador de carga circular para esperas cortas y genéricas. Importalo desde @felix/ui, ajustá el tamaño con size (sm, md o lg) y pasale un label para accesibilidad. Para esperas largas con presencia de marca usá CoinLoader; para contextos en línea, Dots.",
      en: "Circular loading indicator for short, generic waits. Import it from @felix/ui, set the size with size (sm, md, or lg), and pass a label for accessibility. For longer branded waits use CoinLoader; for inline contexts, Dots.",
      pt: "Indicador de carregamento circular para esperas curtas e genéricas. Importe de @felix/ui, ajuste o tamanho com size (sm, md ou lg) e passe um label para acessibilidade. Para esperas longas com presença de marca use CoinLoader; para contextos em linha, Dots.",
    },
    preview: () => <Spinner size="lg" label="Cargando" />,
    render: () => (
      <Demo label="Tamaños">
        <Spinner size="sm" label="Cargando" />
        <Spinner size="md" label="Cargando" />
        <Spinner size="lg" label="Cargando" />
      </Demo>
    ),
  },
  switch: {
    es: "Interruptor on/off. Componer con Label vía id.",
    en: "On/off toggle. Compose with Label via id.",
    pt: "Interruptor on/off. Combine com Label via id.",
    usage: {
      es: "Interruptor on/off para preferencias que aplican al instante, como activar notificaciones. Importalo desde @felix/ui y combinalo con Label conectando id y htmlFor. Soporta defaultChecked y disabled; usá aria-label si no hay etiqueta visible. Para opciones que se confirman con un botón, preferí Checkbox.",
      en: "On/off toggle for preferences that apply instantly, like enabling notifications. Import it from @felix/ui and pair it with Label by connecting id and htmlFor. It supports defaultChecked and disabled; use aria-label when there's no visible label. For options confirmed with a button, prefer Checkbox.",
      pt: "Interruptor on/off para preferências que aplicam na hora, como ativar notificações. Importe de @felix/ui e combine com Label conectando id e htmlFor. Suporta defaultChecked e disabled; use aria-label se não houver rótulo visível. Para opções confirmadas com um botão, prefira Checkbox.",
    },
    preview: () => (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Switch id="sw-prev" defaultChecked />
        <Label htmlFor="sw-prev">Notificaciones</Label>
      </div>
    ),
    render: () => (
      <>
        <Demo label="Estados">
          <Switch defaultChecked aria-label="Activado" />
          <Switch aria-label="Desactivado" />
          <Switch defaultChecked disabled aria-label="Deshabilitado" />
        </Demo>
        <Demo label="Con etiqueta">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Switch id="sw-notif" defaultChecked />
            <Label htmlFor="sw-notif">Notificaciones por WhatsApp</Label>
          </div>
        </Demo>
      </>
    ),
  },
  text: {
    es: "Componente tipográfico con la escala del sistema.",
    en: "Typographic component using the system scale.",
    pt: "Componente tipográfico com a escala do sistema.",
    usage: {
      es: "Componente tipográfico que aplica la escala del sistema sin estilos a mano. Importalo desde @felix/ui y elegí la jerarquía con variant: display-md para montos protagonistas, heading-1 para títulos de sección, body para texto corrido y caption para metadatos. Usalo siempre en lugar de estilar etiquetas sueltas.",
      en: "Typographic component that applies the system scale without hand-rolled styles. Import it from @felix/ui and pick the hierarchy with variant: display-md for hero amounts, heading-1 for section titles, body for running text, and caption for metadata. Always use it instead of styling raw tags.",
      pt: "Componente tipográfico que aplica a escala do sistema sem estilos manuais. Importe de @felix/ui e escolha a hierarquia com variant: display-md para valores em destaque, heading-1 para títulos de seção, body para texto corrido e caption para metadados. Use sempre em vez de estilizar tags soltas.",
    },
    preview: () => <Text variant="heading-1">$1,020.00</Text>,
    render: () => (
      <Demo label="Variantes" col>
        <Text variant="display-md">$1,020.00</Text>
        <Text variant="heading-1">Título de sección</Text>
        <Text variant="body">Texto de cuerpo para instrucciones y descripciones claras.</Text>
        <Text variant="caption">RECIBIDO · HACE 2 MIN</Text>
      </Demo>
    ),
  },
  textarea: {
    es: "Entrada de texto multilínea con label flotante.",
    en: "Multi-line text input with floating label.",
    pt: "Entrada de texto multilinha com label flutuante.",
    usage: {
      es: "Entrada de texto multilínea con label flotante para mensajes y notas, como la dedicatoria de un envío. Importalo desde @felix/ui, pasale el texto con label y controlá la altura inicial con rows. Comparte estilo y estados con Input.",
      en: "Multi-line text input with a floating label for messages and notes, like the note on a transfer. Import it from @felix/ui, pass the text through label, and control the initial height with rows. It shares styling and states with Input.",
      pt: "Entrada de texto multilinha com label flutuante para mensagens e notas, como a dedicatória de um envio. Importe de @felix/ui, passe o texto com label e controle a altura inicial com rows. Compartilha estilo e estados com o Input.",
    },
    preview: () => (
      <div style={{ width: 200 }}>
        <Textarea label="Mensaje" rows={2} />
      </div>
    ),
    render: () => (
      <Demo label="Por defecto" col>
        <div style={{ maxWidth: 420, width: "100%" }}>
          <Textarea label="Mensaje para María" rows={4} />
        </div>
      </Demo>
    ),
  },

  /* ── Molecules ──────────────────────────────────────────────────────── */
  accordion: {
    es: "Secciones colapsables. Una abierta a la vez.",
    en: "Collapsible sections. One open at a time.",
    pt: "Seções recolhíveis. Uma aberta por vez.",
    usage: {
      es: "Organiza contenido en secciones colapsables donde solo una queda abierta a la vez, ideal para FAQs. Importá Accordion, AccordionItem, AccordionTrigger y AccordionContent desde @felix/ui. Usá type en single con collapsible para permitir cerrar todas, y dale a cada AccordionItem un value único.",
      en: "Organizes content into collapsible sections where only one stays open at a time, ideal for FAQs. Import Accordion, AccordionItem, AccordionTrigger, and AccordionContent from @felix/ui. Use type set to single with collapsible to allow closing them all, and give each AccordionItem a unique value.",
      pt: "Organiza conteúdo em seções recolhíveis onde só uma fica aberta por vez, ideal para FAQs. Importe Accordion, AccordionItem, AccordionTrigger e AccordionContent de @felix/ui. Use type em single com collapsible para permitir fechar todas, e dê a cada AccordionItem um value único.",
    },
    preview: () => (
      <Accordion type="single" collapsible style={{ width: 210 }}>
        <AccordionItem value="a">
          <AccordionTrigger>¿Hay comisión?</AccordionTrigger>
          <AccordionContent>No cobramos comisión.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    render: () => (
      <Demo label="Single · collapsible" col>
        <Accordion type="single" collapsible style={{ width: "100%", maxWidth: 480 }}>
          <AccordionItem value="a">
            <AccordionTrigger>¿Cuánto tarda un envío?</AccordionTrigger>
            <AccordionContent>La mayoría llega en minutos; algunos bancos pueden tardar hasta 30.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>¿Hay comisión?</AccordionTrigger>
            <AccordionContent>No cobramos comisión. El tipo de cambio se muestra antes de confirmar.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Demo>
    ),
  },
  alert: {
    es: "Mensaje contextual de estado.",
    en: "Contextual status message.",
    pt: "Mensagem contextual de status.",
    usage: {
      es: "Mensaje de estado que vive en la página, sin interrumpir: envío completado, en camino o con error. Importá Alert junto con AlertTitle y AlertDescription desde @felix/ui y elegí el tono con variant: success, warning o error. Para avisos efímeros usá toast; el Alert queda fijo en el layout.",
      en: "Status message that lives on the page without interrupting: transfer completed, on its way, or failed. Import Alert together with AlertTitle and AlertDescription from @felix/ui and pick the tone with variant: success, warning, or error. For transient notices use toast; Alert stays fixed in the layout.",
      pt: "Mensagem de status que vive na página, sem interromper: envio concluído, a caminho ou com erro. Importe Alert junto com AlertTitle e AlertDescription de @felix/ui e escolha o tom com variant: success, warning ou error. Para avisos efêmeros use toast; o Alert fica fixo no layout.",
    },
    preview: () => (
      <div style={{ width: 220 }}>
        <Alert variant="success"><AlertTitle>Transferencia completada</AlertTitle></Alert>
      </div>
    ),
    render: () => (
      <Demo label="Variantes" col>
        <Alert variant="success"><AlertTitle>Transferencia completada</AlertTitle><AlertDescription>María recibió $1,020.00 MXN.</AlertDescription></Alert>
        <Alert variant="warning"><AlertTitle>Envío en camino</AlertTitle><AlertDescription>Llega en aproximadamente 30 minutos.</AlertDescription></Alert>
        <Alert variant="error"><AlertTitle>No pudimos procesar el pago</AlertTitle><AlertDescription>Revisá tu método de pago e intentá de nuevo.</AlertDescription></Alert>
      </Demo>
    ),
  },
  breadcrumb: {
    es: "Ruta de navegación jerárquica.",
    en: "Hierarchical navigation trail.",
    pt: "Trilha de navegação hierárquica.",
    usage: {
      es: "Muestra la ruta jerárquica y deja volver a niveles anteriores en flujos profundos. Importá Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage y BreadcrumbSeparator desde @felix/ui. Usá BreadcrumbLink con href para los niveles navegables y BreadcrumbPage para la página actual.",
      en: "Shows the hierarchical trail and lets users go back up levels in deep flows. Import Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, and BreadcrumbSeparator from @felix/ui. Use BreadcrumbLink with href for navigable levels and BreadcrumbPage for the current page.",
      pt: "Mostra a trilha hierárquica e permite voltar a níveis anteriores em fluxos profundos. Importe Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage e BreadcrumbSeparator de @felix/ui. Use BreadcrumbLink com href para os níveis navegáveis e BreadcrumbPage para a página atual.",
    },
    preview: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Inicio</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Envíos</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    render: () => (
      <Demo label="Ruta">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">Inicio</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">Envíos</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Confirmar</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Demo>
    ),
  },
  calendar: {
    es: "Calendario para elegir una fecha.",
    en: "Calendar to pick a date.",
    pt: "Calendário para escolher uma data.",
    usage: {
      es: "Calendario para elegir una fecha directamente en la página, por ejemplo al programar un envío. Importalo desde @felix/ui con mode en single y controlá la selección con selected y onSelect. Si necesitás el calendario dentro de un campo de formulario, usá DatePicker.",
      en: "Calendar to pick a date directly on the page, for example when scheduling a transfer. Import it from @felix/ui with mode set to single and control the selection with selected and onSelect. If you need the calendar inside a form field, use DatePicker.",
      pt: "Calendário para escolher uma data diretamente na página, por exemplo ao agendar um envio. Importe de @felix/ui com mode em single e controle a seleção com selected e onSelect. Se você precisa do calendário dentro de um campo de formulário, use DatePicker.",
    },
    previewTall: true,
    preview: () => (
      <div style={{ transform: "scale(0.6)", transformOrigin: "top center" }}>
        <Calendar mode="single" />
      </div>
    ),
    render: () => {
      const [date, setDate] = useState<Date | undefined>(new Date(2026, 3, 15));
      return (
        <Demo label="Selección única" col>
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </Demo>
      );
    },
  },
  card: {
    es: "Contenedor de contenido. Borde o sombra, nunca ambos.",
    en: "Content container. Border or shadow, never both.",
    pt: "Contêiner de conteúdo. Borda ou sombra, nunca os dois.",
    usage: {
      es: "Contenedor base para agrupar información relacionada, como el resumen de un envío. Importá Card con CardHeader, CardTitle, CardDescription, CardContent y CardFooter desde @felix/ui y componé solo las partes que necesites. Regla del sistema: la Card lleva borde o sombra, nunca ambos.",
      en: "Base container to group related information, like a transfer summary. Import Card with CardHeader, CardTitle, CardDescription, CardContent, and CardFooter from @felix/ui and compose only the parts you need. System rule: a Card uses a border or a shadow, never both.",
      pt: "Contêiner base para agrupar informações relacionadas, como o resumo de um envio. Importe Card com CardHeader, CardTitle, CardDescription, CardContent e CardFooter de @felix/ui e componha só as partes que você precisa. Regra do sistema: o Card usa borda ou sombra, nunca os dois.",
    },
    preview: () => (
      <Card style={{ width: 190 }}>
        <CardHeader><CardTitle>Recibe María</CardTitle></CardHeader>
        <CardContent><div className="disp" style={{ fontSize: "1.5rem" }}>1,020.00</div></CardContent>
      </Card>
    ),
    render: () => (
      <Demo label="Composición" col>
        <Card style={{ maxWidth: 320 }}>
          <CardHeader>
            <CardTitle>Recibe María</CardTitle>
            <CardDescription>Banco · ****1234</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="disp" style={{ fontSize: "2rem", fontVariantNumeric: "tabular-nums" }}>
              1,020.00<span style={{ fontFamily: "var(--font-sans)", fontSize: ".85rem", fontWeight: 600, color: "var(--fg-subtle)", marginLeft: 6 }}>MXN</span>
            </div>
          </CardContent>
          <CardFooter><Button variant="primary" fullWidth>Confirmar</Button></CardFooter>
        </Card>
      </Demo>
    ),
  },
  choicecard: {
    es: "Tarjetas de opción excluyente (radio enriquecido).",
    en: "Mutually-exclusive option cards (rich radio).",
    pt: "Cards de opção exclusiva (radio enriquecido).",
    usage: {
      es: "Radio enriquecido en formato tarjeta para decisiones clave, como elegir entre efectivo o depósito bancario. Importá ChoiceCardGroup y ChoiceCard desde @felix/ui: controlá el grupo con value y onValueChange, y pasale a cada tarjeta value, icon, title y description. Usalo cuando las opciones merecen más jerarquía que un RadioGroup.",
      en: "Rich radio in card form for key decisions, like choosing between cash pickup and bank deposit. Import ChoiceCardGroup and ChoiceCard from @felix/ui: control the group with value and onValueChange, and give each card value, icon, title, and description. Use it when the options deserve more weight than a RadioGroup.",
      pt: "Radio enriquecido em formato de card para decisões-chave, como escolher entre dinheiro e depósito bancário. Importe ChoiceCardGroup e ChoiceCard de @felix/ui: controle o grupo com value e onValueChange, e passe a cada card value, icon, title e description. Use quando as opções merecem mais hierarquia que um RadioGroup.",
    },
    preview: () => (
      <div style={{ width: 210 }}>
        <ChoiceCardGroup value="bank" onValueChange={() => {}}>
          <ChoiceCard value="bank" icon={<img src="/illustrations/bank.svg" width={28} height={30} alt="" />} title="Banco" description="Depósito a cuenta" />
        </ChoiceCardGroup>
      </div>
    ),
    render: () => {
      const [value, setValue] = useState("bank");
      return (
        <Demo label="Grupo" col>
          <div style={{ width: 300, maxWidth: "100%" }}>
            <ChoiceCardGroup value={value} onValueChange={setValue}>
              <ChoiceCard value="cash" icon={<img src="/illustrations/cash.svg" width={35} height={37} alt="" />} title="Efectivo" description="Recibí en efectivo" />
              <ChoiceCard value="bank" icon={<img src="/illustrations/bank.svg" width={35} height={37} alt="" />} title="Banco" description="Depósito a cuenta" />
            </ChoiceCardGroup>
          </div>
        </Demo>
      );
    },
  },
  collapse: {
    es: "Contenido que se expande y colapsa.",
    en: "Content that expands and collapses.",
    pt: "Conteúdo que expande e recolhe.",
    usage: {
      es: "Muestra u oculta un bloque de contenido secundario, como el detalle del tipo de cambio. Importá Collapse, CollapseTrigger y CollapseContent desde @felix/ui y controlalo con open y onOpenChange. A diferencia del Accordion, es un solo bloque independiente.",
      en: "Shows or hides a block of secondary content, like the exchange rate detail. Import Collapse, CollapseTrigger, and CollapseContent from @felix/ui and control it with open and onOpenChange. Unlike Accordion, it's a single standalone block.",
      pt: "Mostra ou esconde um bloco de conteúdo secundário, como o detalhe do câmbio. Importe Collapse, CollapseTrigger e CollapseContent de @felix/ui e controle com open e onOpenChange. Diferente do Accordion, é um único bloco independente.",
    },
    preview: () => (
      <div style={{ width: 210 }}>
        <Collapse open={false} onOpenChange={() => {}}>
          <CollapseTrigger>Ver detalle del envío</CollapseTrigger>
          <CollapseContent>Tipo de cambio 17.00</CollapseContent>
        </Collapse>
      </div>
    ),
    render: () => {
      const [open, setOpen] = useState(false);
      return (
        <Demo label="Controlado" col>
          <div style={{ width: 320, maxWidth: "100%" }}>
            <Collapse open={open} onOpenChange={setOpen}>
              <CollapseTrigger>Ver detalle del envío</CollapseTrigger>
              <CollapseContent>Tipo de cambio 17.00 · Comisión $0.00 · Llega en ~30 min.</CollapseContent>
            </Collapse>
          </div>
        </Demo>
      );
    },
  },
  datepicker: {
    es: "Campo con calendario en popover.",
    en: "Field with a calendar in a popover.",
    pt: "Campo com calendário em popover.",
    usage: {
      es: "Campo de formulario que abre un calendario en un popover, ideal para elegir fechas sin ocupar toda la pantalla. Importalo desde @felix/ui y controlalo con value y onChange; personalizá el texto vacío con placeholder. Si la fecha es el centro de la pantalla, usá Calendar directo.",
      en: "Form field that opens a calendar in a popover, ideal for picking dates without taking over the screen. Import it from @felix/ui and control it with value and onChange; customize the empty text with placeholder. If the date is the focus of the screen, use Calendar directly.",
      pt: "Campo de formulário que abre um calendário em um popover, ideal para escolher datas sem ocupar a tela toda. Importe de @felix/ui e controle com value e onChange; personalize o texto vazio com placeholder. Se a data é o centro da tela, use o Calendar direto.",
    },
    preview: () => (
      <div style={{ width: 190 }}>
        <DatePicker value={undefined} onChange={() => {}} placeholder="Elegí una fecha" />
      </div>
    ),
    render: () => {
      const [date, setDate] = useState<Date | undefined>(undefined);
      return (
        <Demo label="Por defecto" col>
          <div style={{ width: 240 }}><DatePicker value={date} onChange={setDate} placeholder="Elegí una fecha" /></div>
        </Demo>
      );
    },
  },
  dialog: {
    es: "Diálogo modal centrado para confirmaciones.",
    en: "Centered modal dialog for confirmations.",
    pt: "Diálogo modal centralizado para confirmações.",
    usage: {
      es: "Modal centrado para confirmaciones que piden atención total, como confirmar un envío de dinero. Importá Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter y DialogClose desde @felix/ui. Envolvé el botón que lo abre con DialogTrigger asChild y cerralo con DialogClose. Para flujos largos en mobile, considerá Drawer.",
      en: "Centered modal for confirmations that demand full attention, like confirming a money transfer. Import Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, and DialogClose from @felix/ui. Wrap the opening button with DialogTrigger asChild and close it with DialogClose. For longer mobile flows, consider Drawer.",
      pt: "Modal centralizado para confirmações que pedem atenção total, como confirmar um envio de dinheiro. Importe Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter e DialogClose de @felix/ui. Envolva o botão que abre com DialogTrigger asChild e feche com DialogClose. Para fluxos longos no mobile, considere o Drawer.",
    },
    preview: () => (
      <Dialog>
        <DialogTrigger asChild><Button variant="primary">Abrir diálogo</Button></DialogTrigger>
      </Dialog>
    ),
    render: () => (
      <Demo label="Modal">
        <Dialog>
          <DialogTrigger asChild><Button variant="primary">Abrir diálogo</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar envío</DialogTitle>
              <DialogDescription>Vas a enviar $60.00 USD a María. Comisión $0.00.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild><Button variant="ghost">Cancelar</Button></DialogClose>
              <DialogClose asChild><Button variant="primary">Confirmar</Button></DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Demo>
    ),
  },
  drawer: {
    es: "Panel deslizante desde el borde (móvil-first).",
    en: "Edge-anchored sliding panel (mobile-first).",
    pt: "Painel deslizante a partir da borda (mobile-first).",
    usage: {
      es: "Panel que se desliza desde el borde de la pantalla, pensado mobile-first para detalles y acciones rápidas. Importá Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter y DrawerClose desde @felix/ui, y abrilo envolviendo el disparador con DrawerTrigger asChild. Para confirmaciones puntuales en desktop, preferí Dialog.",
      en: "Panel that slides in from the edge of the screen, mobile-first for details and quick actions. Import Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, and DrawerClose from @felix/ui, and open it by wrapping the trigger with DrawerTrigger asChild. For one-off confirmations on desktop, prefer Dialog.",
      pt: "Painel que desliza a partir da borda da tela, mobile-first para detalhes e ações rápidas. Importe Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter e DrawerClose de @felix/ui, e abra envolvendo o acionador com DrawerTrigger asChild. Para confirmações pontuais no desktop, prefira o Dialog.",
    },
    preview: () => (
      <Drawer>
        <DrawerTrigger asChild><Button variant="line">Abrir drawer</Button></DrawerTrigger>
      </Drawer>
    ),
    render: () => (
      <Demo label="Drawer">
        <Drawer>
          <DrawerTrigger asChild><Button variant="line">Abrir drawer</Button></DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Detalle del envío</DrawerTitle>
              <DrawerDescription>$60.00 USD → $1,020.00 MXN</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild><Button variant="primary">Listo</Button></DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Demo>
    ),
  },
  dropdownmenu: {
    es: "Menú contextual anclado a un disparador.",
    en: "Contextual menu anchored to a trigger.",
    pt: "Menu contextual ancorado a um acionador.",
    usage: {
      es: "Menú contextual de acciones anclado a un botón, como el menú de cuenta. Importá DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel y DropdownMenuSeparator desde @felix/ui. Envolvé el disparador con DropdownMenuTrigger asChild y agrupá acciones con DropdownMenuSeparator. Para elegir un valor de formulario, usá Select.",
      en: "Contextual action menu anchored to a button, like the account menu. Import DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, and DropdownMenuSeparator from @felix/ui. Wrap the trigger with DropdownMenuTrigger asChild and group actions with DropdownMenuSeparator. To pick a form value, use Select.",
      pt: "Menu contextual de ações ancorado a um botão, como o menu da conta. Importe DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel e DropdownMenuSeparator de @felix/ui. Envolva o acionador com DropdownMenuTrigger asChild e agrupe ações com DropdownMenuSeparator. Para escolher um valor de formulário, use Select.",
    },
    preview: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="line">Opciones</Button></DropdownMenuTrigger>
      </DropdownMenu>
    ),
    render: () => (
      <Demo label="Menú">
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="line">Opciones</Button></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Envíos</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Demo>
    ),
  },
  hovercard: {
    es: "Tarjeta que aparece al pasar el mouse.",
    en: "Card that appears on hover.",
    pt: "Card que aparece ao passar o mouse.",
    usage: {
      es: "Tarjeta con contexto extra que aparece al pasar el mouse, como el perfil de un destinatario. Importá HoverCard, HoverCardTrigger y HoverCardContent desde @felix/ui, envolviendo el elemento con HoverCardTrigger asChild. Como en touch no hay hover, no pongas ahí información crítica.",
      en: "Card with extra context that appears on hover, like a recipient's profile. Import HoverCard, HoverCardTrigger, and HoverCardContent from @felix/ui, wrapping the element with HoverCardTrigger asChild. Since there's no hover on touch, don't put critical information in it.",
      pt: "Card com contexto extra que aparece ao passar o mouse, como o perfil de um destinatário. Importe HoverCard, HoverCardTrigger e HoverCardContent de @felix/ui, envolvendo o elemento com HoverCardTrigger asChild. Como não existe hover no touch, não coloque ali informação crítica.",
    },
    preview: () => (
      <HoverCard>
        <HoverCardTrigger asChild><Button variant="line">@maria</Button></HoverCardTrigger>
      </HoverCard>
    ),
    render: () => (
      <Demo label="Hover">
        <HoverCard>
          <HoverCardTrigger asChild><Button variant="line">@maria</Button></HoverCardTrigger>
          <HoverCardContent>María González · recibió 12 envíos este año.</HoverCardContent>
        </HoverCard>
      </Demo>
    ),
  },
  navigationmenu: {
    es: "Navegación principal con menús desplegables.",
    en: "Primary navigation with dropdown menus.",
    pt: "Navegação principal com menus suspensos.",
    usage: {
      es: "Navegación principal horizontal con menús desplegables, típica del header del sitio. Importá NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent y NavigationMenuLink desde @felix/ui. Usá NavigationMenuTrigger con NavigationMenuContent para los desplegables y NavigationMenuLink con href para enlaces directos.",
      en: "Horizontal primary navigation with dropdown menus, typical of the site header. Import NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, and NavigationMenuLink from @felix/ui. Use NavigationMenuTrigger with NavigationMenuContent for dropdowns and NavigationMenuLink with href for direct links.",
      pt: "Navegação principal horizontal com menus suspensos, típica do header do site. Importe NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent e NavigationMenuLink de @felix/ui. Use NavigationMenuTrigger com NavigationMenuContent para os menus suspensos e NavigationMenuLink com href para links diretos.",
    },
    preview: () => (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem><NavigationMenuLink href="#">Productos</NavigationMenuLink></NavigationMenuItem>
          <NavigationMenuItem><NavigationMenuLink href="#">Ayuda</NavigationMenuLink></NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
    render: () => (
      <Demo label="Navegación">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: 8, minWidth: 200 }}>
                  <NavigationMenuLink href="#">Enviar dinero</NavigationMenuLink>
                  <NavigationMenuLink href="#">Recargas</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink href="#">Ayuda</NavigationMenuLink></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Demo>
    ),
  },
  pagination: {
    es: "Navegación entre páginas de resultados.",
    en: "Navigation across pages of results.",
    pt: "Navegação entre páginas de resultados.",
    usage: {
      es: "Navegación entre páginas de resultados largos, como el historial de envíos. Importá Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext y PaginationEllipsis desde @felix/ui. Marcá la página actual con isActive en PaginationLink y comprimí rangos largos con PaginationEllipsis.",
      en: "Navigation across long result sets, like the transfer history. Import Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, and PaginationEllipsis from @felix/ui. Mark the current page with isActive on PaginationLink and compress long ranges with PaginationEllipsis.",
      pt: "Navegação entre páginas de resultados longos, como o histórico de envios. Importe Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext e PaginationEllipsis de @felix/ui. Marque a página atual com isActive no PaginationLink e comprima intervalos longos com PaginationEllipsis.",
    },
    preview: () => (
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
    render: () => (
      <Demo label="Páginas">
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </Demo>
    ),
  },
  popover: {
    es: "Panel flotante anclado a un disparador.",
    en: "Floating panel anchored to a trigger.",
    pt: "Painel flutuante ancorado a um acionador.",
    usage: {
      es: "Panel flotante anclado a un disparador para contenido liviano, como el detalle del tipo de cambio. Importá Popover, PopoverTrigger y PopoverContent desde @felix/ui, envolviendo el botón con PopoverTrigger asChild. A diferencia del Tooltip se abre con clic y puede contener elementos interactivos.",
      en: "Floating panel anchored to a trigger for lightweight content, like the exchange rate detail. Import Popover, PopoverTrigger, and PopoverContent from @felix/ui, wrapping the button with PopoverTrigger asChild. Unlike Tooltip it opens on click and can hold interactive elements.",
      pt: "Painel flutuante ancorado a um acionador para conteúdo leve, como o detalhe do câmbio. Importe Popover, PopoverTrigger e PopoverContent de @felix/ui, envolvendo o botão com PopoverTrigger asChild. Diferente do Tooltip, abre com clique e pode conter elementos interativos.",
    },
    preview: () => (
      <Popover>
        <PopoverTrigger asChild><Button variant="line">Abrir popover</Button></PopoverTrigger>
      </Popover>
    ),
    render: () => (
      <Demo label="Popover">
        <Popover>
          <PopoverTrigger asChild><Button variant="line">Abrir popover</Button></PopoverTrigger>
          <PopoverContent>Tipo de cambio actual: 17.00 MXN/USD.</PopoverContent>
        </Popover>
      </Demo>
    ),
  },
  select: {
    es: "Selección de una opción de una lista.",
    en: "Select one option from a list.",
    pt: "Seleção de uma opção em uma lista.",
    usage: {
      es: "Para elegir una opción de una lista desplegable, como el país de destino. Importá Select, SelectTrigger, SelectValue, SelectContent y SelectItem desde @felix/ui. Poné el placeholder en SelectValue y dale a cada SelectItem un value único. Con pocas opciones, considerá RadioGroup para dejarlas todas visibles.",
      en: "Pick one option from a dropdown list, like the destination country. Import Select, SelectTrigger, SelectValue, SelectContent, and SelectItem from @felix/ui. Set the placeholder on SelectValue and give each SelectItem a unique value. With few options, consider RadioGroup to keep them all visible.",
      pt: "Escolha uma opção de uma lista suspensa, como o país de destino. Importe Select, SelectTrigger, SelectValue, SelectContent e SelectItem de @felix/ui. Coloque o placeholder no SelectValue e dê a cada SelectItem um value único. Com poucas opções, considere RadioGroup para deixá-las todas visíveis.",
    },
    preview: () => (
      <div style={{ width: 190 }}>
        <Select>
          <SelectTrigger><SelectValue placeholder="Elegí un país" /></SelectTrigger>
        </Select>
      </div>
    ),
    render: () => (
      <Demo label="Por defecto" col>
        <div style={{ width: 240 }}>
          <Select>
            <SelectTrigger><SelectValue placeholder="Elegí un país" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="mx">México</SelectItem>
              <SelectItem value="co">Colombia</SelectItem>
              <SelectItem value="gt">Guatemala</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Demo>
    ),
  },
  sheet: {
    es: "Panel lateral para flujos secundarios.",
    en: "Side panel for secondary flows.",
    pt: "Painel lateral para fluxos secundários.",
    usage: {
      es: "Panel lateral para flujos secundarios que no ameritan cambiar de página, como el detalle de un envío. Importá Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody y SheetFooter desde @felix/ui. Abrilo envolviendo el disparador con SheetTrigger asChild y cerralo con SheetClose.",
      en: "Side panel for secondary flows that don't warrant a page change, like a transfer's detail. Import Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody, and SheetFooter from @felix/ui. Open it by wrapping the trigger with SheetTrigger asChild and close it with SheetClose.",
      pt: "Painel lateral para fluxos secundários que não justificam trocar de página, como o detalhe de um envio. Importe Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody e SheetFooter de @felix/ui. Abra envolvendo o acionador com SheetTrigger asChild e feche com SheetClose.",
    },
    preview: () => (
      <Sheet>
        <SheetTrigger asChild><Button variant="line">Abrir panel</Button></SheetTrigger>
      </Sheet>
    ),
    render: () => (
      <Demo label="Sheet">
        <Sheet>
          <SheetTrigger asChild><Button variant="line">Abrir panel</Button></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Detalle del envío</SheetTitle>
              <SheetDescription>$60.00 USD → $1,020.00 MXN</SheetDescription>
            </SheetHeader>
            <SheetBody>Tipo de cambio 17.00 · Comisión $0.00 · Llega en ~30 min.</SheetBody>
            <SheetFooter><SheetClose asChild><Button variant="primary">Listo</Button></SheetClose></SheetFooter>
          </SheetContent>
        </Sheet>
      </Demo>
    ),
  },
  sidebarfooter: {
    es: "Pie del sidebar con la cuenta del usuario.",
    en: "Sidebar footer with the user's account.",
    pt: "Rodapé do sidebar com a conta do usuário.",
    usage: {
      es: "Pie del Sidebar que muestra la cuenta del usuario activo. Importalo desde @felix/ui y pasale name, email y un avatar, normalmente un Avatar con AvatarFallback en tamaño sm. Va como último hijo del Sidebar, debajo de SidebarBody.",
      en: "Sidebar footer showing the active user's account. Import it from @felix/ui and pass name, email, and an avatar, usually an Avatar with AvatarFallback at size sm. It goes as the Sidebar's last child, below SidebarBody.",
      pt: "Rodapé do Sidebar que mostra a conta do usuário ativo. Importe de @felix/ui e passe name, email e um avatar, normalmente um Avatar com AvatarFallback no tamanho sm. Vai como último filho do Sidebar, abaixo do SidebarBody.",
    },
    preview: () => (
      <div style={{ width: 210, border: "1px solid var(--border-strong)", borderRadius: 12, background: "var(--white)", overflow: "hidden" }}>
        <SidebarFooter name="María González" email="maria@felix.com" avatar={<Avatar size="sm"><AvatarFallback>MG</AvatarFallback></Avatar>} />
      </div>
    ),
    render: () => (
      <Demo label="Cuenta" col>
        <div style={{ width: 280, border: "1px solid var(--border-strong)", borderRadius: 12, background: "var(--white)", overflow: "hidden" }}>
          <SidebarFooter
            name="María González"
            email="maria@felix.com"
            avatar={<Avatar size="sm"><AvatarFallback>MG</AvatarFallback></Avatar>}
          />
        </div>
      </Demo>
    ),
  },
  stepper: {
    es: "Progreso por pasos en un flujo.",
    en: "Step progress through a flow.",
    pt: "Progresso por etapas em um fluxo.",
    usage: {
      es: "Muestra el avance por pasos de un flujo, como monto, destinatario y confirmación. Importá Stepper desde @felix/ui y definí cada paso con Stepper.Step como hijos. Indicá el paso actual con activeIndex (empieza en 0); los anteriores se marcan como completados.",
      en: "Shows step-by-step progress through a flow, like amount, recipient, and confirmation. Import Stepper from @felix/ui and define each step with Stepper.Step as children. Set the current step with activeIndex (zero-based); previous steps are marked as completed.",
      pt: "Mostra o avanço por etapas de um fluxo, como valor, destinatário e confirmação. Importe Stepper de @felix/ui e defina cada etapa com Stepper.Step como filhos. Indique a etapa atual com activeIndex (começa em 0); as anteriores ficam marcadas como concluídas.",
    },
    preview: () => (
      <div style={{ width: 210 }}>
        <Stepper activeIndex={1}>
          <Stepper.Step>Monto</Stepper.Step>
          <Stepper.Step>Destino</Stepper.Step>
          <Stepper.Step>Listo</Stepper.Step>
        </Stepper>
      </div>
    ),
    render: () => (
      <Demo label="3 pasos · activo en el 2º" col>
        <div style={{ width: "100%", maxWidth: 600 }}>
          <Stepper activeIndex={1}>
            <Stepper.Step>Monto</Stepper.Step>
            <Stepper.Step>Destinatario</Stepper.Step>
            <Stepper.Step>Confirmar</Stepper.Step>
          </Stepper>
        </div>
      </Demo>
    ),
  },
  table: {
    es: "Datos tabulares con encabezado.",
    en: "Tabular data with a header.",
    pt: "Dados tabulares com cabeçalho.",
    usage: {
      es: "Presenta datos tabulares como el historial de envíos. Importá Table, TableHeader, TableBody, TableRow, TableHead y TableCell desde @felix/ui. Usá TableHead para las celdas del encabezado y TableCell para las de datos. Para listas largas, sumá Pagination.",
      en: "Presents tabular data like the transfer history. Import Table, TableHeader, TableBody, TableRow, TableHead, and TableCell from @felix/ui. Use TableHead for header cells and TableCell for data cells. For long lists, add Pagination.",
      pt: "Apresenta dados tabulares como o histórico de envios. Importe Table, TableHeader, TableBody, TableRow, TableHead e TableCell de @felix/ui. Use TableHead para as células do cabeçalho e TableCell para as de dados. Para listas longas, adicione Pagination.",
    },
    previewTall: true,
    preview: () => (
      <div style={{ width: 220 }}>
        <Table>
          <TableHeader><TableRow><TableHead>Fecha</TableHead><TableHead>Monto</TableHead></TableRow></TableHeader>
          <TableBody>
            <TableRow><TableCell>12 jun</TableCell><TableCell>$60.00</TableCell></TableRow>
            <TableRow><TableCell>03 jun</TableCell><TableCell>$120.00</TableCell></TableRow>
          </TableBody>
        </Table>
      </div>
    ),
    render: () => (
      <Demo label="Historial" col>
        <div style={{ width: "100%", maxWidth: 520 }}>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Fecha</TableHead><TableHead>Destinatario</TableHead><TableHead>Monto</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>12 jun</TableCell><TableCell>María</TableCell><TableCell>$60.00 USD</TableCell></TableRow>
              <TableRow><TableCell>03 jun</TableCell><TableCell>Carlos</TableCell><TableCell>$120.00 USD</TableCell></TableRow>
              <TableRow><TableCell>28 may</TableCell><TableCell>Ana</TableCell><TableCell>$45.00 USD</TableCell></TableRow>
            </TableBody>
          </Table>
        </div>
      </Demo>
    ),
  },
  tabs: {
    es: "Vistas alternables bajo una misma área.",
    en: "Switchable views under one area.",
    pt: "Visualizações alternáveis em uma mesma área.",
    usage: {
      es: "Alterna entre vistas del mismo nivel dentro de un área, como envíos y recargas. Importá Tabs, TabsList, TabsTrigger y TabsContent desde @felix/ui. Definí la pestaña inicial con defaultValue y vinculá cada TabsTrigger con su TabsContent usando el mismo value.",
      en: "Switches between same-level views within one area, like transfers and top-ups. Import Tabs, TabsList, TabsTrigger, and TabsContent from @felix/ui. Set the initial tab with defaultValue and link each TabsTrigger to its TabsContent using the same value.",
      pt: "Alterna entre visualizações do mesmo nível dentro de uma área, como envios e recargas. Importe Tabs, TabsList, TabsTrigger e TabsContent de @felix/ui. Defina a aba inicial com defaultValue e vincule cada TabsTrigger ao seu TabsContent usando o mesmo value.",
    },
    preview: () => (
      <Tabs defaultValue="envios" style={{ width: 210 }}>
        <TabsList>
          <TabsTrigger value="envios">Envíos</TabsTrigger>
          <TabsTrigger value="recargas">Recargas</TabsTrigger>
        </TabsList>
      </Tabs>
    ),
    render: () => (
      <Demo label="Pestañas" col>
        <Tabs defaultValue="envios" style={{ width: "100%", maxWidth: 480 }}>
          <TabsList>
            <TabsTrigger value="envios">Envíos</TabsTrigger>
            <TabsTrigger value="recargas">Recargas</TabsTrigger>
          </TabsList>
          <TabsContent value="envios"><Text variant="body">Tu historial de envíos aparece acá.</Text></TabsContent>
          <TabsContent value="recargas"><Text variant="body">Tu historial de recargas aparece acá.</Text></TabsContent>
        </Tabs>
      </Demo>
    ),
  },
  toast: {
    es: "Notificación temporal. Disparar con toast(...).",
    en: "Transient notification. Fire with toast(...).",
    pt: "Notificação temporária. Dispare com toast(...).",
    usage: {
      es: "Notificación temporal que confirma una acción sin interrumpir, como un envío completado. Montá el Toaster una sola vez en la app (podés ubicarlo con position) e importá la función toast desde @felix/ui. Disparala con toast(titulo, opciones) pasando description, o usá toast.secondary para el estilo alternativo.",
      en: "Transient notification that confirms an action without interrupting, like a completed transfer. Mount the Toaster once in the app (you can place it with position) and import the toast function from @felix/ui. Fire it with toast(title, options) passing a description, or use toast.secondary for the alternate style.",
      pt: "Notificação temporária que confirma uma ação sem interromper, como um envio concluído. Monte o Toaster uma única vez no app (você pode posicionar com position) e importe a função toast de @felix/ui. Dispare com toast(titulo, opcoes) passando description, ou use toast.secondary para o estilo alternativo.",
    },
    preview: () => <Button variant="primary">Mostrar toast</Button>,
    render: () => (
      <Demo label="Disparadores">
        <Button variant="primary" onClick={() => toast("Transferencia completada", { description: "María recibió $1,020.00 MXN." })}>
          Mostrar toast
        </Button>
        <Button variant="line" onClick={() => toast.secondary("Envío en camino", { description: "Llega en ~30 min." })}>
          Toast secundario
        </Button>
        <Toaster position="top-right" />
      </Demo>
    ),
  },
  tooltip: {
    es: "Etiqueta breve al pasar el mouse o enfocar.",
    en: "Brief label on hover or focus.",
    pt: "Rótulo breve ao passar o mouse ou focar.",
    usage: {
      es: "Etiqueta breve que aclara un control al pasar el mouse o enfocar con teclado. Importá Tooltip, TooltipProvider, TooltipTrigger y TooltipContent desde @felix/ui. Envolvé la zona con TooltipProvider y el disparador con TooltipTrigger asChild. Solo texto corto y nunca información esencial: en touch no hay hover.",
      en: "Brief label that clarifies a control on hover or keyboard focus. Import Tooltip, TooltipProvider, TooltipTrigger, and TooltipContent from @felix/ui. Wrap the area with TooltipProvider and the trigger with TooltipTrigger asChild. Short text only and never essential information: there's no hover on touch.",
      pt: "Rótulo breve que esclarece um controle ao passar o mouse ou focar com o teclado. Importe Tooltip, TooltipProvider, TooltipTrigger e TooltipContent de @felix/ui. Envolva a área com TooltipProvider e o acionador com TooltipTrigger asChild. Só texto curto e nunca informação essencial: no touch não há hover.",
    },
    preview: () => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild><Button variant="line">Pasá el mouse</Button></TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    ),
    render: () => (
      <Demo label="Tooltip">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild><Button variant="line">Pasá el mouse</Button></TooltipTrigger>
            <TooltipContent>Tipo de cambio: 17.00 MXN/USD</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Demo>
    ),
  },

  /* ── Organisms ──────────────────────────────────────────────────────── */
  sidebar: {
    es: "Navegación lateral completa: header, secciones y footer.",
    en: "Full side navigation: header, sections, and footer.",
    pt: "Navegação lateral completa: header, seções e footer.",
    usage: {
      es: "Navegación lateral completa de la app: marca arriba, secciones de enlaces y cuenta abajo. Importá Sidebar, SidebarHeader, SidebarBody, SidebarSection y SidebarNavItem desde @felix/ui, y cerralo con SidebarFooter. Cada SidebarNavItem recibe href, icon y active para marcar la ruta actual; agrupá enlaces con SidebarSection y su prop title.",
      en: "The app's full side navigation: brand on top, link sections, and the account at the bottom. Import Sidebar, SidebarHeader, SidebarBody, SidebarSection, and SidebarNavItem from @felix/ui, and close it with SidebarFooter. Each SidebarNavItem takes href, icon, and active to mark the current route; group links with SidebarSection and its title prop.",
      pt: "Navegação lateral completa do app: marca no topo, seções de links e a conta embaixo. Importe Sidebar, SidebarHeader, SidebarBody, SidebarSection e SidebarNavItem de @felix/ui, e feche com SidebarFooter. Cada SidebarNavItem recebe href, icon e active para marcar a rota atual; agrupe links com SidebarSection e sua prop title.",
    },
    previewTall: true,
    preview: () => (
      <div style={{ transform: "scale(0.45)", transformOrigin: "top center" }}>
        <Sidebar style={{ height: 420, width: 240 }}>
          <SidebarHeader><Logo type="logotype" style={{ height: 24 }} /></SidebarHeader>
          <SidebarBody>
            <SidebarSection title="Menú">
              <SidebarNavItem href="#sb-home" icon={<HouseIcon />} active>Inicio</SidebarNavItem>
              <SidebarNavItem href="#sb-send" icon={<PaperPlaneTiltIcon />}>Enviar</SidebarNavItem>
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      </div>
    ),
    render: () => (
      <Demo label="Sidebar" col>
        <Sidebar style={{ height: 420, width: 240 }}>
          <SidebarHeader><Logo type="logotype" style={{ height: 24 }} /></SidebarHeader>
          <SidebarBody>
            <SidebarSection title="Menú">
              <SidebarNavItem href="#sb-home" icon={<HouseIcon />} active>Inicio</SidebarNavItem>
              <SidebarNavItem href="#sb-send" icon={<PaperPlaneTiltIcon />}>Enviar</SidebarNavItem>
              <SidebarNavItem href="#sb-profile" icon={<UserIcon />}>Perfil</SidebarNavItem>
            </SidebarSection>
          </SidebarBody>
          <SidebarFooter
            name="María González"
            email="maria@felix.com"
            avatar={<Avatar size="sm"><AvatarFallback>MG</AvatarFallback></Avatar>}
          />
        </Sidebar>
      </Demo>
    ),
  },
};
