/**
 * Metadatos de navegación de las guías conversacionales: familias con su
 * etiqueta e icono, y un icono por patrón. Los usan el panel lateral y la
 * visión general; el contenido sigue viviendo en `content.ts`.
 */
import {
  ChatCircleTextIcon,
  ClipboardTextIcon,
  HandTapIcon,
  ImageIcon,
  LightbulbIcon,
  ListBulletsIcon,
  RadioButtonIcon,
  SlideshowIcon,
  SlidersHorizontalIcon,
  SmileyIcon,
  TextAaIcon,
  TextboxIcon,
  type Icon,
} from "@phosphor-icons/react";
import { PATTERNS } from "./content";
import type { Localized, Pattern, PatternFamily } from "./types";

export const PATTERN_FAMILIES: Array<{
  id: PatternFamily;
  label: Localized;
  /** Qué agrupa la familia, para la visión general. */
  blurb: Localized;
  icon: Icon;
}> = [
  {
    id: "interaction",
    label: { es: "Interaction", en: "Interaction" },
    blurb: {
      es: "Cómo preguntamos: los mecanismos con los que el bot pide una respuesta y la forma que toma cada uno en WhatsApp.",
      en: "How we ask: the mechanisms the bot uses to request an answer, and the shape each one takes on WhatsApp.",
      pt: "Como perguntamos: os mecanismos com que o bot pede uma resposta e a forma que cada um toma no WhatsApp.",
    },
    icon: HandTapIcon,
  },
  {
    id: "conversational",
    label: { es: "Conversational", en: "Conversational" },
    blurb: {
      es: "Qué decimos: las reglas de formato, emojis e imágenes que mantienen la conversación clara y cálida.",
      en: "What we say: the formatting, emoji and image rules that keep the conversation clear and warm.",
      pt: "O que dizemos: as regras de formato, emojis e imagens que mantêm a conversa clara e calorosa.",
    },
    icon: ChatCircleTextIcon,
  },
];

const PATTERN_ICONS: Record<string, Icon> = {
  "closed-input": RadioButtonIcon,
  "open-input": TextboxIcon,
  "mixed-input": SlidersHorizontalIcon,
  menu: ListBulletsIcon,
  "flows-form": ClipboardTextIcon,
  "flows-visual": SlideshowIcon,
  "use-of-emojis": SmileyIcon,
  "use-of-images": ImageIcon,
  "text-formatting": TextAaIcon,
  "format-hints": LightbulbIcon,
};

/** Icono del patrón; un patrón nuevo sin icono propio toma el de su familia. */
export function patternIcon(pattern: Pattern): Icon {
  return (
    PATTERN_ICONS[pattern.slug] ??
    PATTERN_FAMILIES.find((f) => f.id === pattern.family)?.icon ??
    ChatCircleTextIcon
  );
}

export const patternsOf = (family: PatternFamily): Pattern[] =>
  PATTERNS.filter((p) => p.family === family);
