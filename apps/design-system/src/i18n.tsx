import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en" | "pt";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "es",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Returns a translator: tr("Español", "English", "Português") → string for the active language. */
export function useTr() {
  const { lang } = useLang();
  return (es: string, en: string, pt?: string) => {
    if (lang === "es") return es;
    if (lang === "en") return en;
    return pt || en || es;
  };
}
