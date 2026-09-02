import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Layout, VoiceToneLayout } from "./Layout";
import {
  Principles,
  Colors,
  Typography,
  Illustrations,
  Tokens,
  MarkdownFiles,
} from "./sections";
import { ComponentsIndex } from "./pages/ComponentsIndex";
import { ComponentGroupPage } from "./pages/ComponentGroupPage";
import { PlazaHome } from "./pages/PlazaHome";
import { PlazaSistema } from "./pages/PlazaSistema";
import { PlazaEditorial } from "./pages/PlazaEditorial";
import { VoiceToneOverview, VoiceToneSection } from "./pages/VoiceTone";
import { PatternsLanding } from "./pages/PatternsLanding";
import { PatternPage } from "./pages/PatternPage";
import { useTr } from "./i18n";

function NotFound() {
  const tr = useTr();
  return (
    <section className="sec flush">
      <div className="eyebrow"><span>404</span></div>
      <h2 className="h2">{tr("Página no encontrada", "Page not found", "Página não encontrada")}</h2>
      <p className="lead">{tr("Esa ruta no existe en el sistema.", "That route doesn't exist in the system.", "Essa rota não existe no sistema.")}</p>
      <Link className="btn-link" to="/">{tr("← Volver al inicio", "← Back to overview", "← Voltar ao início")}</Link>
    </section>
  );
}

export function App() {
  return (
    <Routes>
      {/* Plaza Félix — hub de entrada, standalone (sin sidebar). */}
      <Route index element={<PlazaHome />} />

      {/* Patrones conversacionales — standalone, misma chrome que la Plaza.
          `:slug` se resuelve contra el registro en `patterns/content.ts`, así
          que un patrón nuevo no necesita ruta propia. */}
      <Route path="patrones" element={<PatternsLanding />} />
      <Route path="patrones/:slug" element={<PatternPage />} />

      {/* Voice & Tone — transcripción del Notion de Content Design. Sección
          propia del portal, con su propio nav al costado. Cada sección de la
          guía es su propia página: `:slug` se resuelve contra `VT_SECTIONS`,
          así que una sección nueva del contenido no necesita ruta propia.
          La guía editorial cuelga de acá como "Previous version". */}
      <Route element={<VoiceToneLayout />}>
        <Route path="voz-y-tono" element={<VoiceToneOverview />} />
        <Route path="voz-y-tono/version-anterior" element={<PlazaEditorial />} />
        <Route path="voz-y-tono/:slug" element={<VoiceToneSection />} />
      </Route>

      {/* La guía editorial pasó a ser la versión anterior de Voice & Tone —
          mantiene vivos los enlaces viejos. */}
      <Route path="editorial" element={<Navigate to="/voz-y-tono/version-anterior" replace />} />

      <Route element={<Layout />}>
        <Route path="sistema" element={<PlazaSistema />} />
        <Route path="principios" element={<Principles />} />
        <Route path="colores" element={<Colors />} />
        <Route path="tipografia" element={<Typography />} />
        <Route path="ilustraciones" element={<Illustrations />} />
        {/* Iconography merged into Illustrations — keep old links working. */}
        <Route path="iconografia" element={<Navigate to="/ilustraciones" replace />} />
        <Route path="componentes" element={<ComponentsIndex />} />
        <Route path="componentes/:groupSlug" element={<ComponentGroupPage />} />
        <Route path="tokens" element={<Tokens />} />
        <Route path="markdown" element={<MarkdownFiles />} />
        {/* DESIGN.md section became Markdown (now also ships components.md) — keep old links working. */}
        <Route path="design-md" element={<Navigate to="/markdown" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
