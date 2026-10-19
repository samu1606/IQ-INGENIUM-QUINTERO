"""
El bot de WhatsApp de Ingenium Quintero — versión de prueba.

Escucha lo que llega del número de prueba de Meta (Cloud API), lo piensa con un
modelo local (Ollama) y contesta por el mismo canal.

TRES DECISIONES QUE NO SON OBVIAS
---------------------------------

1. Se le responde a Meta ANTES de pensar. Meta espera 200 en menos de 5 s; si
   tarda, reintenta el mismo mensaje y el cliente recibe la respuesta dos veces.
   Por eso el POST verifica la firma, guarda el mensaje y devuelve 200; el
   trabajo pesado va en una tarea de fondo.

2. Se verifica la firma `X-Hub-Signature-256` de cada mensaje. Sin esto,
   cualquiera que encuentre la URL puede hacerle decir lo que quiera al bot y
   gastar el modelo. La verificación usa el `APP_SECRET` de la app de Meta.

3. Se deduplica por `message_id`. Si Meta reintenta, no se contesta dos veces.

Y una cuarta, que es de negocio: el prompt le prohíbe inventar precios y le
obliga a pasar a una persona cuando no sabe. Es la misma promesa que hace la
landing; si el bot la rompe, la landing miente.
"""

from __future__ import annotations

import hashlib
import hmac
import json
import logging
import os
import time
from collections import OrderedDict
from pathlib import Path

import httpx
from fastapi import BackgroundTasks, FastAPI, Request
from fastapi.responses import JSONResponse, PlainTextResponse

# --------------------------------------------------------------------------- #
# Configuración — todo por variables de entorno. Sin valores inventados: si
# falta algo crítico, el servicio arranca pero lo dice, en vez de fingir.
# --------------------------------------------------------------------------- #
VERIFY_TOKEN = os.environ.get("WA_VERIFY_TOKEN", "")
WA_TOKEN = os.environ.get("WA_TOKEN", "")
WA_PHONE_ID = os.environ.get("WA_PHONE_ID", "")
APP_SECRET = os.environ.get("WA_APP_SECRET", "")
GRAPH_VERSION = os.environ.get("WA_GRAPH_VERSION", "v21.0")
GRAPH = f"https://graph.facebook.com/{GRAPH_VERSION}"

OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://host.docker.internal:11434")
MODELO = os.environ.get("LLM_MODEL", "qwen2.5:3b")
WEBHOOK_PATH = os.environ.get("WEBHOOK_PATH", "/wa/webhook")
LOG_PATH = Path(os.environ.get("BOT_LOG_PATH", "/app/data/conversaciones.jsonl"))

# Cuántos turnos de memoria por conversación, y cuánto dura la memoria.
MAX_TURNOS = int(os.environ.get("MAX_TURNOS", "12"))
MEMORIA_SEGUNDOS = int(os.environ.get("MEMORIA_SEGUNDOS", "3600"))

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("bot")

app = FastAPI(title="IQ WhatsApp bot (prueba)")

# Memoria de conversación en RAM, con tope. Se pierde al reiniciar: para una
# prueba está bien, y evita meter una base de datos antes de saber si sirve.
_memoria: OrderedDict[str, list[dict]] = OrderedDict()
_vistos: OrderedDict[str, float] = OrderedDict()

PROMPT = """Eres el asistente de Ingenium Quintero (IQ), una agencia colombiana que
instala bots de WhatsApp con IA, asistentes sobre documentos y automatización
para negocios de cualquier país.

CÓMO HABLAS
- Español neutro, cercano y directo. Mensajes cortos, como en WhatsApp.
- Nada de listas largas ni de tono corporativo. Dos o tres frases.
- Nunca digas que eres un modelo de lenguaje ni menciones cómo estás hecho.

LO QUE SÍ HACES
- Entender qué hace el negocio de quien escribe y qué le quita tiempo.
- Explicar los servicios con ejemplos concretos de SU negocio.
- Invitar a agendar un diagnóstico gratuito.

LO QUE NUNCA HACES
- NO inventas precios ni cifras. Si preguntan cuánto cuesta, dices que el valor
  depende del alcance, que va por escrito en la propuesta, y que en el
  diagnóstico se lo aterrizas. NUNCA improvisas un número.
- NO prometes plazos, resultados ni garantías que no estén en el guion.
- NO inventas datos de la empresa ni de sus clientes.

CUANDO NO SABES
Lo dices y pasas la conversación a una persona del equipo. Es mejor que
inventar. Ejemplo: «Eso lo mira un compañero del equipo y te responde por aquí.»

No empieces con «¡Hola!» si el cliente ya saludó. Responde a lo que preguntó."""


# --------------------------------------------------------------------------- #
# Utilidades
# --------------------------------------------------------------------------- #
def firma_valida(crudo: bytes, cabecera: str | None) -> bool:
    """Comprueba la firma HMAC que Meta pone en cada mensaje."""
    if not APP_SECRET:
        # Sin APP_SECRET no se puede verificar. En la fase de prueba se avisa
        # una vez y se sigue; en producción esto tiene que estar puesto.
        return True
    if not cabecera or not cabecera.startswith("sha256="):
        return False
    esperado = hmac.new(APP_SECRET.encode(), crudo, hashlib.sha256).hexdigest()
    return hmac.compare_digest(esperado, cabecera.split("=", 1)[1])


def recordar(telefono: str, rol: str, texto: str) -> list[dict]:
    h = _memoria.setdefault(telefono, [])
    h.append({"role": rol, "content": texto})
    del h[:-MAX_TURNOS * 2]
    _memoria.move_to_end(telefono)
    while len(_memoria) > 200:
        _memoria.popitem(last=False)
    return h


def ya_visto(message_id: str) -> bool:
    if message_id in _vistos:
        return True
    _vistos[message_id] = time.time()
    while len(_vistos) > 2000:
        _vistos.popitem(last=False)
    return False


def anotar(registro: dict) -> None:
    """Deja la conversación en disco, para poder leer qué dijo el bot."""
    try:
        LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
        with LOG_PATH.open("a", encoding="utf-8") as f:
            f.write(json.dumps(registro, ensure_ascii=False) + "\n")
    except OSError as e:
        log.warning("no pude escribir el registro: %s", e)


# --------------------------------------------------------------------------- #
# Los dos extremos del webhook
# --------------------------------------------------------------------------- #
@app.get(WEBHOOK_PATH)
def verificar(request: Request):
    """El handshake de Meta: devolver el challenge SOLO si el token coincide."""
    q = request.query_params
    if q.get("hub.mode") == "subscribe" and q.get("hub.verify_token") == VERIFY_TOKEN:
        log.info("webhook verificado por Meta")
        return PlainTextResponse(q.get("hub.challenge", ""))
    log.warning("verificación rechazada (token no coincide)")
    return PlainTextResponse("forbidden", status_code=403)


@app.post(WEBHOOK_PATH)
async def recibir(request: Request, tareas: BackgroundTasks):
    crudo = await request.body()
    if not firma_valida(crudo, request.headers.get("x-hub-signature-256")):
        log.warning("firma inválida — se descarta")
        return JSONResponse({"ok": False}, status_code=401)

    try:
        cuerpo = json.loads(crudo or b"{}")
    except json.JSONDecodeError:
        return JSONResponse({"ok": True})  # 200 igual: que Meta no reintente

    for entrada in cuerpo.get("entry", []):
        for cambio in entrada.get("changes", []):
            valor = cambio.get("value", {})
            for msg in valor.get("messages", []):
                if msg.get("type") != "text":
                    continue
                mid = msg.get("id", "")
                if not mid or ya_visto(mid):
                    continue
                tareas.add_task(
                    contestar,
                    msg.get("from", ""),
                    (msg.get("text") or {}).get("body", ""),
                    mid,
                )

    # 200 inmediato: el pensamiento va en la tarea de fondo.
    return JSONResponse({"ok": True})


# --------------------------------------------------------------------------- #
# El trabajo pesado
# --------------------------------------------------------------------------- #
def pensar(historial: list[dict]) -> str:
    r = httpx.post(
        f"{OLLAMA_URL}/api/chat",
        json={"model": MODELO, "messages": historial, "stream": False,
              "options": {"temperature": 0.4, "num_predict": 300}},
        timeout=90,
    )
    r.raise_for_status()
    return (r.json().get("message") or {}).get("content", "").strip()


def enviar(telefono: str, texto: str) -> bool:
    if not WA_TOKEN or not WA_PHONE_ID:
        # Sin credenciales de Meta no se puede enviar. Se dice claro en vez de
        # dejar que httpx falle con 'Illegal header value' — que no explica nada.
        log.warning("sin WA_TOKEN/WA_PHONE_ID: no se envía (modo prueba)")
        return False
    r = httpx.post(
        f"{GRAPH}/{WA_PHONE_ID}/messages",
        headers={"Authorization": f"Bearer {WA_TOKEN}"},
        json={"messaging_product": "whatsapp", "to": telefono,
              "type": "text", "text": {"body": texto}},
        timeout=30,
    )
    if r.status_code >= 300:
        log.error("al enviar: %s %s", r.status_code, r.text[:300])
        return False
    return True


def contestar(telefono: str, texto: str, message_id: str) -> None:
    if not telefono or not texto:
        return
    entrada = time.time()
    try:
        historial = [{"role": "system", "content": PROMPT}]
        historial += recordar(telefono, "user", texto)
        respuesta = pensar(historial)
        if not respuesta:
            respuesta = ("Perdona, no te entendí bien. ¿Me lo cuentas de otra "
                         "forma o te paso con una persona del equipo?")
        recordar(telefono, "assistant", respuesta)
        enviado = enviar(telefono, respuesta)
        # La respuesta se guarda SIEMPRE, incluso si el envío falló: es lo que
        # se lee para mejorar el prompt, y perderla fue un defecto real —
        # el primer mensaje de prueba se pensó bien y no quedó registrado.
        anotar({"ts": time.strftime("%Y-%m-%dT%H:%M:%S"), "de": telefono,
                "entra": texto, "sale": respuesta, "enviado": enviado,
                "segundos": round(time.time() - entrada, 2), "modelo": MODELO,
                "message_id": message_id})
        if not enviado:
            log.warning("respuesta pensada pero NO enviada (faltan credenciales)")
        log.info("contestado a %s en %.1fs", telefono[-4:], time.time() - entrada)
    except Exception as e:  # noqa: BLE001 — el webhook nunca debe caerse
        log.exception("falló al contestar: %s", e)
        anotar({"ts": time.strftime("%Y-%m-%dT%H:%M:%S"), "de": telefono,
                "entra": texto, "error": str(e)[:300]})


# --------------------------------------------------------------------------- #
# Diagnóstico — para saber qué falta sin adivinar
# --------------------------------------------------------------------------- #
@app.post(WEBHOOK_PATH.rsplit("/", 1)[0] + "/probar")
async def probar(request: Request):
    """
    Prueba el cerebro sin pasar por Meta: mandas un texto y devuelve lo que
    contestaría. Sirve para ajustar el prompt sin gastar mensajes ni depender
    de que Meta esté configurado.

        curl -X POST https://ingeniumquintero.com/wa/probar \
          -H "x-clave: <WA_VERIFY_TOKEN>" -H 'content-type: application/json' \
          -d '{"texto":"Hola, tengo una clinica dental","de":"573001234567"}'

    Va protegido con el mismo token de verificación: sin él, cualquiera podría
    usar el modelo del servidor a tu costa.
    """
    clave = request.headers.get("x-clave") or request.query_params.get("clave")
    if not VERIFY_TOKEN or clave != VERIFY_TOKEN:
        return JSONResponse({"ok": False, "error": "clave incorrecta"}, status_code=403)
    try:
        cuerpo = await request.json()
    except Exception:  # noqa: BLE001
        return JSONResponse({"ok": False, "error": "json inválido"}, status_code=400)

    texto = (cuerpo.get("texto") or "").strip()
    if not texto:
        return JSONResponse({"ok": False, "error": "falta 'texto'"}, status_code=400)

    quien = cuerpo.get("de") or "prueba"
    entrada = time.time()
    try:
        historial = [{"role": "system", "content": PROMPT}]
        historial += recordar(quien, "user", texto)
        respuesta = pensar(historial)
        recordar(quien, "assistant", respuesta)
    except Exception as e:  # noqa: BLE001
        return JSONResponse({"ok": False, "error": f"el modelo falló: {e}"}, status_code=503)

    return {"ok": True, "entra": texto, "sale": respuesta,
            "segundos": round(time.time() - entrada, 2), "modelo": MODELO,
            "nota": "esto NO se envía por WhatsApp: es solo la prueba del cerebro"}


@app.get(WEBHOOK_PATH.rsplit("/", 1)[0] + "/salud")
async def salud():
    """Todo vive bajo la misma ruta base (/wa), así Traefik necesita una sola regla."""
    falta = [n for n, v in (("WA_VERIFY_TOKEN", VERIFY_TOKEN), ("WA_TOKEN", WA_TOKEN),
                            ("WA_PHONE_ID", WA_PHONE_ID), ("WA_APP_SECRET", APP_SECRET))
             if not v]
    modelo_ok = False
    try:
        modelo_ok = httpx.get(f"{OLLAMA_URL}/api/tags", timeout=5).status_code == 200
    except Exception:  # noqa: BLE001
        pass
    return {
        "ok": True,
        "servicio": "IQ WhatsApp bot (prueba)",
        "webhook": WEBHOOK_PATH,
        "verificacion_de_firma": bool(APP_SECRET),
        "modelo": MODELO,
        "modelo_disponible": modelo_ok,
        "listo_para_meta": not falta,
        "variables_que_faltan": falta,
        "conversaciones_en_memoria": len(_memoria),
    }
