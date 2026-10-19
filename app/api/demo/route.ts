import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  DEMO_LIMITES,
  PROMPT_DEMO,
  demoConfigurado,
  demoEndpoint,
  normalizarMensajes,
} from "@/lib/demo";

/**
 * POST /api/demo — el agente de la demo pública.
 *
 * El modelo vive en el servidor: la clave (si la hay) nunca llega al navegador.
 * Sin `DEMO_LLM_BASE_URL` ni `DEMO_LLM_MODEL` responde `configurado: false` y el
 * widget manda a WhatsApp, en vez de mostrar un cuadro de chat muerto.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!demoConfigurado()) {
    return NextResponse.json({ ok: true, configurado: false });
  }

  const ip = clientIp(req);
  const limite = rateLimit(`demo:${ip}`, DEMO_LIMITES.peticiones, DEMO_LIMITES.ventanaMs);
  if (!limite.ok) {
    return NextResponse.json(
      { ok: false, configurado: true, error: "limite", reintentarEnMs: limite.resetAt - Date.now() },
      { status: 429 }
    );
  }

  let cuerpo: { mensajes?: unknown };
  try {
    cuerpo = (await req.json()) as { mensajes?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "json_invalido" }, { status: 400 });
  }

  const mensajes = normalizarMensajes(cuerpo.mensajes);
  if (mensajes.length === 0) {
    return NextResponse.json({ ok: false, error: "sin_mensajes" }, { status: 400 });
  }

  const clave = process.env.DEMO_LLM_API_KEY?.trim();

  try {
    const respuesta = await fetch(demoEndpoint(), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(clave ? { authorization: `Bearer ${clave}` } : {}),
      },
      body: JSON.stringify({
        model: process.env.DEMO_LLM_MODEL,
        messages: [{ role: "system", content: PROMPT_DEMO }, ...mensajes],
        temperature: 0.4,
        max_tokens: 300,
        stream: false,
      }),
      signal: AbortSignal.timeout(DEMO_LIMITES.timeoutMs),
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.text().catch(() => "");
      console.error("[demo] el modelo respondió", respuesta.status, detalle.slice(0, 300));
      return NextResponse.json({ ok: false, configurado: true, error: "modelo" }, { status: 502 });
    }

    const datos = (await respuesta.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const texto = datos.choices?.[0]?.message?.content?.trim();

    if (!texto) {
      return NextResponse.json({ ok: false, configurado: true, error: "sin_respuesta" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, configurado: true, respuesta: texto });
  } catch (error) {
    const esTimeout = error instanceof Error && error.name === "TimeoutError";
    console.error("[demo] falló la llamada al modelo:", esTimeout ? "timeout" : error);
    return NextResponse.json(
      { ok: false, configurado: true, error: esTimeout ? "timeout" : "conexion" },
      { status: 504 }
    );
  }
}
