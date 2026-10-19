/**
 * Dónde queda un lead que llega por el formulario.
 *
 * El formulario ya abría WhatsApp con el resumen escrito, pero **no guardaba
 * nada en ninguna parte**: si el visitante no pulsaba «enviar» en WhatsApp —o
 * el navegador le bloqueaba la ventana—, el lead se perdía sin dejar rastro.
 * Como WhatsApp es un paso que depende del visitante, el registro tiene que
 * ocurrir ANTES y por un camino que controlemos.
 *
 * Dos destinos, ninguno obligatorio:
 *
 *  1. **Archivo** (`LEAD_STORE_PATH`, por defecto `./data/leads.jsonl`): una
 *     línea JSON por lead. En el contenedor hay que montar un volumen en esa
 *     carpeta o el `docker compose up --build` se lo lleva por delante.
 *  2. **Webhook** (`LEAD_WEBHOOK_URL`): un POST al n8n, a un Google Sheet o a
 *     lo que Edwin decida. Si falla, se anota y no se cae la petición: el
 *     visitante ya hizo su parte.
 *
 * No hay base de datos a propósito: para el volumen de un lanzamiento, un
 * archivo con una línea por lead se lee, se filtra y se respalda con menos
 * piezas que cualquier otra cosa.
 */

import { appendFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

export interface Lead {
  nombre: string;
  negocio: string;
  detalle: string;
  origen: string;
  recibidoEn: string;
  ip: string;
  userAgent: string;
}

export interface ResultadoLead {
  guardado: boolean;
  ruta?: string;
  webhook: boolean;
  error?: string;
}

const RUTA_POR_DEFECTO = join(process.cwd(), "data", "leads.jsonl");

function rutaArchivo(): string {
  const configurada = process.env.LEAD_STORE_PATH?.trim();
  return configurada && configurada.length > 0 ? configurada : RUTA_POR_DEFECTO;
}

async function guardarEnArchivo(lead: Lead): Promise<{ ok: boolean; ruta: string; error?: string }> {
  const ruta = rutaArchivo();
  try {
    await mkdir(dirname(ruta), { recursive: true });
    await appendFile(ruta, `${JSON.stringify(lead)}\n`, "utf8");
    return { ok: true, ruta };
  } catch (error) {
    return { ok: false, ruta, error: error instanceof Error ? error.message : String(error) };
  }
}

async function avisarWebhook(lead: Lead): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!url) return false;

  try {
    const respuesta = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tipo: "lead_landing_iq", ...lead }),
      // Sin esto, un n8n lento deja al visitante mirando la pantalla.
      signal: AbortSignal.timeout(4000),
    });
    return respuesta.ok;
  } catch (error) {
    console.error("[lead] el webhook falló:", error instanceof Error ? error.message : error);
    return false;
  }
}

export async function guardarLead(lead: Lead): Promise<ResultadoLead> {
  const archivo = await guardarEnArchivo(lead);
  const webhook = await avisarWebhook(lead);

  if (!archivo.ok) {
    console.error("[lead] no se pudo escribir en", archivo.ruta, "-", archivo.error);
  } else {
    console.log("[lead] guardado:", lead.negocio, "·", lead.origen);
  }

  return { guardado: archivo.ok, ruta: archivo.ok ? archivo.ruta : undefined, webhook, error: archivo.error };
}
