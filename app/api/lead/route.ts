import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { guardarLead, type Lead } from "@/lib/leads";

/**
 * POST /api/lead — donde queda el lead que llega por el formulario.
 *
 * Antes de esto el formulario solo abría WhatsApp: si el visitante no enviaba
 * el mensaje, no quedaba nada. Aquí se guarda primero y después el navegador
 * abre WhatsApp.
 *
 * Endurecido porque es público: tope de tamaño, límite por IP, honeypot y
 * largos máximos. Un formulario abierto en una campaña de Facebook se llena de
 * basura en horas.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITE_BYTES = 8 * 1024;
const MAX = { nombre: 120, negocio: 120, detalle: 2000, origen: 40 };

function limpiar(valor: unknown, largo: number): string {
  return typeof valor === "string" ? valor.trim().slice(0, largo) : "";
}

export async function POST(req: Request) {
  const declarado = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(declarado) && declarado > LIMITE_BYTES) {
    return NextResponse.json({ ok: false, error: "payload_demasiado_grande" }, { status: 413 });
  }

  const ip = clientIp(req);
  const limite = rateLimit(`lead:${ip}`, 6, 60 * 60 * 1000);
  if (!limite.ok) {
    return NextResponse.json(
      { ok: false, error: "demasiados_envios", reintentarEnMs: limite.resetAt - Date.now() },
      { status: 429 }
    );
  }

  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "json_invalido" }, { status: 400 });
  }

  // Honeypot: el campo está oculto en el formulario; si viene lleno, es un bot.
  // Se responde «ok» para no darle pistas, pero no se guarda nada.
  if (limpiar(cuerpo.trampa, 50).length > 0) {
    return NextResponse.json({ ok: true, guardado: false, webhook: false });
  }

  const nombre = limpiar(cuerpo.nombre, MAX.nombre);
  const negocio = limpiar(cuerpo.negocio, MAX.negocio);
  const detalle = limpiar(cuerpo.detalle, MAX.detalle);
  const origen = limpiar(cuerpo.origen, MAX.origen) || "landing";

  if (nombre.length < 2 || negocio.length < 2 || detalle.length < 2) {
    return NextResponse.json({ ok: false, error: "campos_incompletos" }, { status: 400 });
  }

  const lead: Lead = {
    nombre,
    negocio,
    detalle,
    origen,
    recibidoEn: new Date().toISOString(),
    ip,
    userAgent: req.headers.get("user-agent")?.slice(0, 200) ?? "",
  };

  const resultado = await guardarLead(lead);

  // Si no se pudo guardar en ninguna parte, se dice: el navegador igual abre
  // WhatsApp, pero el visitante merece saber que su caso no quedó registrado y
  // que escriba por WhatsApp sí o sí.
  return NextResponse.json(
    { ok: true, guardado: resultado.guardado, webhook: resultado.webhook },
    { status: 200 }
  );
}
