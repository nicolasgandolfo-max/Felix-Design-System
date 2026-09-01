import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Lleva el scroll arriba en cada navegación.
 *
 * React Router no toca el scroll al cambiar de ruta, así que al entrar a un
 * patrón desde una tarjeta de la landing la página abría a media altura — donde
 * estaba el scroll al hacer clic.
 *
 * Dos excepciones:
 * - si la URL trae hash (`/patrones#browse`), gana el ancla;
 * - en POP (atrás/adelante del browser) se respeta la posición restaurada.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) return;
    if (navigationType === "POP") return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, navigationType]);

  return null;
}
