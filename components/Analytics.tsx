"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { EVENTOS, analiticaConfigurada, track, umamiId, umamiSrc } from "@/lib/analytics";

/**
 * Analítica y eventos de conversión.
 *
 * Dos cosas en un solo componente de cliente:
 *
 *  1. Carga el script de Umami **solo si está configurado**. Sin variables no se
 *     pide nada a ningún tercero.
 *  2. Un único escuchador de clics en todo el documento detecta cuándo alguien
 *     pulsa un enlace de WhatsApp —el paso que de verdad importa en esta
 *     página— y manda el evento con la sección de origen y el gancho del
 *     mensaje. Se hace así, con delegación, para no tener que tocar los cinco
 *     enlaces uno por uno ni acordarse de hacerlo cuando se añada el sexto.
 */

/** De dónde salió el clic: la sección que lo contiene, el pie, o el flotante. */
function origenDelEnlace(enlace: Element): string {
  const seccion = enlace.closest("section[id]");
  if (seccion?.id) return seccion.id;
  if (enlace.closest("footer")) return "pie";
  if (enlace.closest("header")) return "cabecera";
  return "flotante";
}

/** El gancho del mensaje prellenado: sirve para medir la campaña («FUGA»). */
function ganchoDelEnlace(href: string): string {
  try {
    const texto = new URL(href).searchParams.get("text") ?? "";
    if (/fuga/i.test(texto)) return "fuga";
    if (/cupo/i.test(texto)) return "cupos";
    return "diagnostico";
  } catch {
    return "desconocido";
  }
}

export function Analytics() {
  useEffect(() => {
    const alHacerClic = (evento: MouseEvent) => {
      const objetivo = evento.target as HTMLElement | null;
      const enlace = objetivo?.closest?.('a[href*="wa.me"]');
      if (!enlace) return;

      track(EVENTOS.whatsapp, {
        origen: origenDelEnlace(enlace),
        gancho: ganchoDelEnlace(enlace.getAttribute("href") ?? ""),
      });
    };

    // En captura: se registra el clic aunque otro manejador detenga la burbuja.
    document.addEventListener("click", alHacerClic, true);
    return () => document.removeEventListener("click", alHacerClic, true);
  }, []);

  if (!analiticaConfigurada) return null;

  return <Script src={umamiSrc} data-website-id={umamiId} strategy="afterInteractive" defer />;
}
