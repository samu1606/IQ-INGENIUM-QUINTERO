/**
 * Analítica. Sin esto, la campaña de lanzamiento se mide con la memoria.
 *
 * La herramienta es Umami (auto-hospedado en el propio VPS, sin cookies de
 * terceros ni banner de consentimiento), pero **el código no depende de ella**:
 * si las variables no están puestas, no se carga ningún script y `track()`
 * queda en nada. Así el repo no queda acoplado a un proveedor y la página no
 * carga un rastro que nadie está leyendo.
 *
 * Las variables son `NEXT_PUBLIC_*` porque el script lo carga el navegador y
 * Next las incrusta en el bundle AL CONSTRUIR: cambiarlas exige reconstruir la
 * imagen, no solo reiniciar el contenedor.
 */

export const EVENTOS = {
  whatsapp: "whatsapp_click",
  formulario: "lead_form_submit",
  demo: "demo_mensaje",
  precios: "precios_cta",
} as const;

export type Evento = (typeof EVENTOS)[keyof typeof EVENTOS];

export const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC ?? "";
export const umamiId = process.env.NEXT_PUBLIC_UMAMI_ID ?? "";

export const analiticaConfigurada = Boolean(umamiSrc && umamiId);

declare global {
  interface Window {
    umami?: {
      track: (evento: string, datos?: Record<string, unknown>) => void;
    };
  }
}

/** Manda un evento si hay analítica cargada; si no, no hace nada (ni falla). */
export function track(evento: Evento, datos?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    window.umami?.track(evento, datos);
  } catch {
    // Una analítica caída no puede romper el clic de un cliente.
  }
}
