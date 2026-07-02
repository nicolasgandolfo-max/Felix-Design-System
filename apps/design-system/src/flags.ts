// SVGs live in public/flags/, sourced from packages/ui/assets/Flags.
export interface Flag {
  es: string;
  en: string;
  pt: string;
  file: string;
}

export const FLAGS: Flag[] = [
  { es: "Brasil", en: "Brazil", pt: "Brasil", file: "Brasil.svg" },
  { es: "Colombia", en: "Colombia", pt: "Colômbia", file: "Colombia.svg" },
  { es: "Costa Rica", en: "Costa Rica", pt: "Costa Rica", file: "Costa Rica.svg" },
  { es: "Ecuador", en: "Ecuador", pt: "Equador", file: "Ecuador.svg" },
  { es: "El Salvador", en: "El Salvador", pt: "El Salvador", file: "El Salvador.svg" },
  { es: "Guatemala", en: "Guatemala", pt: "Guatemala", file: "Guatemala.svg" },
  { es: "Honduras", en: "Honduras", pt: "Honduras", file: "Honduras.svg" },
  { es: "México", en: "Mexico", pt: "México", file: "Mexico.svg" },
  { es: "Nicaragua", en: "Nicaragua", pt: "Nicarágua", file: "Nicaragua.svg" },
  { es: "Perú", en: "Peru", pt: "Peru", file: "Perú.svg" },
  { es: "República Dominicana", en: "Dominican Republic", pt: "República Dominicana", file: "Republica Dominicana.svg" },
  { es: "Estados Unidos", en: "United States", pt: "Estados Unidos", file: "USA.svg" },
];
