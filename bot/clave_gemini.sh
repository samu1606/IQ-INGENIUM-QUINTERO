#!/usr/bin/env bash
# Cambia el modelo del bot a Google Gemini (API de AI Studio).
#
# La clave se pega aquí, oculta, y se queda en bot/.env (chmod 600, ignorado
# por git). No pasa por el chat ni por el historial de la terminal.
#
# Uso:  bash clave_gemini.sh
set -euo pipefail
cd "$(dirname "$0")"

MODELO="${GEMINI_MODELO:-gemini-flash-latest}"
BASE="https://generativelanguage.googleapis.com/v1beta/openai"

# Todos los avisos van a stderr: si algún día esto se usa dentro de $(...),
# no se meten en el valor como pasó con configurar.sh.
echo "── Clave de Gemini ──" >&2
echo "   Pégala y pulsa Enter. No se verá en pantalla." >&2
printf "   clave: " >&2
read -rs CLAVE
echo >&2

if [ -z "${CLAVE}" ]; then
  echo "✗ No pegaste nada. Nada cambió." >&2
  exit 1
fi

# Limpieza de lo que se pega. Un solo carácter invisible —un salto de línea, un
# espacio, un tabulador que viaja con el texto— rompe la cabecera y curl
# devuelve 000 en vez del error de Google, que es lo que despista. Ya pasó con
# un token de Meta que llegó con tres bytes basura.
CLAVE=$(printf '%s' "$CLAVE" | tr -d '[:space:]' | LC_ALL=C tr -cd '[:print:]')
echo "   clave recibida: ${#CLAVE} caracteres (se limpiaron espacios e invisibles)" >&2

# Dos formatos válidos de Google: el clásico AIzaSy… y el nuevo AQ.…
# Yo solo conocía el primero y rechacé una clave buena por eso.
case "$CLAVE" in
  AIza*|AQ.*) : ;;
  *)
    echo "⚠ No parece una clave de Google. Los formatos válidos empiezan por" >&2
    echo "   AIzaSy (el clásico) o AQ. (el nuevo de AI Studio)." >&2
    echo "   Si pegaste la de otro proveedor (OpenCode, OpenAI…), no sirve aquí." >&2
    echo "   Nada cambió." >&2
    exit 1
    ;;
esac

# 1. Comprobación en vivo ANTES de tocar el .env: si la clave no sirve, el bot
#    no se queda sin modelo.
echo >&2
echo "── Probando la clave contra Gemini ──" >&2
RESP=$(curl -s -m 30 -X POST "${BASE}/chat/completions" \
  -H "Authorization: Bearer ${CLAVE}" \
  -H 'content-type: application/json' \
  -d "{\"model\":\"${MODELO}\",\"messages\":[{\"role\":\"user\",\"content\":\"Responde solo: listo\"}],\"max_tokens\":40}" \
  -w '\n%{http_code}' 2>/dev/null) || true

CODIGO=$(printf '%s' "$RESP" | tail -1)
CUERPO=$(printf '%s' "$RESP" | sed '$d')

if [ "$CODIGO" != "200" ]; then
  echo "✗ Gemini respondió ${CODIGO}. NO toqué el .env; el bot sigue como estaba." >&2
  printf '%s\n' "$CUERPO" | head -c 400 | sed 's/^/   /' >&2
  exit 1
fi
echo "   ✔ la clave responde, y el modelo ${MODELO} existe" >&2

# 2. Escribir el .env (sin duplicar claves, permisos 600)
python3 - "$CLAVE" "$MODELO" "$BASE" <<'PY'
import os, pathlib, sys
clave, modelo, base = sys.argv[1], sys.argv[2], sys.argv[3]
env = pathlib.Path(".env")
t = env.read_text(encoding="utf-8") if env.exists() else ""
lineas = [l for l in t.splitlines()
          if not l.startswith(("LLM_BASE_URL=", "LLM_MODEL=", "LLM_API_KEY="))]
lineas += [
    "",
    "# Modelo: Google Gemini por su endpoint compatible con OpenAI.",
    f"LLM_BASE_URL={base}",
    f"LLM_MODEL={modelo}",
    f"LLM_API_KEY={clave}",
]
env.write_text("\n".join(lineas).rstrip("\n") + "\n", encoding="utf-8")
os.chmod(env, 0o600)
print(f"   .env escrito · permisos {oct(env.stat().st_mode)[-3:]}", file=sys.stderr)
PY

# 3. Recrear y probar
echo >&2
echo "── Reiniciando el bot ──" >&2
docker compose -p iqbot -f docker-compose.yml up -d >&2
sleep 14

VT=$(grep -m1 '^WA_VERIFY_TOKEN=' .env | cut -d= -f2-)
echo >&2
echo "── Prueba real: cuatro mensajes ──" >&2
for T in "Hi" "Abogado quiero una aplicación" "Soy una clínica dental y a las 11 de la noche nadie contesta" "cuanto cuesta"; do
  printf '\n   ENTRA: %s\n' "$T" >&2
  curl -s -m 90 -X POST "https://ingeniumquintero.com/wa/probar" \
    -H "x-clave: ${VT}" -H 'content-type: application/json' \
    -d "{\"texto\":$(python3 -c 'import json,sys;print(json.dumps(sys.argv[1]))' "$T")}" \
    2>/dev/null | python3 -c '
import sys, json, re
try: d = json.load(sys.stdin)
except Exception:
    print("   (sin respuesta)"); raise SystemExit
if d.get("error"):
    print("   ERROR:", str(d["error"])[:180]); raise SystemExit
r = d.get("sale") or ""
print("   BOT  :", r.replace("\n", " ")[:400])
print(f"   → {len(r.split())} palabras · {d.get(\"segundos\", \"?\")} s")
low = " " + r.lower() + " "
mal = []
if re.search(r"\b(tú|tu|te|ti|tus)\b", low): mal.append("TUTEA")
if re.search(r"(cliente:|tú:|usuario:)", low): mal.append("DIALOGO")
if "20 minutos" in low: mal.append("20min")
if re.search(r"\b\d{3,}\b", r): mal.append("CIFRA")
if len(r.split()) > 55: mal.append("LARGO")
print("   →", ("✗ " + " · ".join(mal)) if mal else "✔ limpio")'
done

echo >&2
echo "── Atrás se puede volver ──" >&2
echo "   bash clave_gemini.sh  y pega otra clave, o edita bot/.env" >&2
