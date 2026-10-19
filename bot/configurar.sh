#!/usr/bin/env bash
# Configura el bot de WhatsApp de IQ.
#
#   bash /root/work/iq/bot/configurar.sh
#
# Pide los tres valores de Meta CON LA ENTRADA OCULTA (no se ven en pantalla y
# no quedan en el historial de la terminal), los guarda en bot/.env con permisos
# 600, reinicia el bot y verifica que quedó bien.
#
# También te muestra el Verify token, que NO es secreto: ese hay que copiarlo en
# la pantalla del webhook de Meta.

set -euo pipefail
cd "$(dirname "$0")"

ENV=".env"
[ -f "$ENV" ] || { echo "No encuentro $ENV"; exit 1; }

# --------------------------------------------------------------------------- #
echo
echo "════════════════════════════════════════════════════════"
echo "  BOT DE WHATSAPP DE IQ — configuración"
echo "════════════════════════════════════════════════════════"
echo

VT=$(grep -m1 '^WA_VERIFY_TOKEN=' "$ENV" | cut -d= -f2- || true)
if [ -z "$VT" ]; then
  VT="iq_$(python3 -c 'import secrets; print(secrets.token_urlsafe(32))')"
  echo "  Generé un Verify token nuevo."
fi

echo "  ┌──────────────────────────────────────────────────────────┐"
echo "  │  VERIFY TOKEN — copia esto en Meta (NO es secreto):      │"
echo "  └──────────────────────────────────────────────────────────┘"
echo
echo "     $VT"
echo
echo "  Va en:  developers.facebook.com → tu app → WhatsApp →"
echo "          Configuración → Webhook → Verify token"
echo

# --------------------------------------------------------------------------- #
# Los tres valores de Meta. `read -s`: lo que pegues no se ve ni se registra.
#
# OJO con una trampa: esta función se usa como `X=$(pedir ...)`, y eso captura
# TODO lo que salga por stdout. Por eso los avisos van a stderr (`>&2`): si
# salieran por stdout, el texto del aviso acabaría dentro del valor del .env.
pedir() {
  local etiqueta="$1" variable="$2" pista="$3" valor=""
  while [ -z "$valor" ]; do
    echo "  ── $etiqueta" >&2
    echo "     $pista" >&2
    printf "     pégalo aquí (no se verá) › " >&2
    read -rs valor
    echo >&2
    [ -n "$valor" ] || echo "     ⚠️  vacío — inténtalo de nuevo" >&2
  done
  printf '%s' "$valor"
}

echo "════════════════════════════════════════════════════════"
echo "  Los tres datos de Meta (de API Setup)"
echo "════════════════════════════════════════════════════════"
echo

TOKEN=$(pedir "Access token" WA_TOKEN "En API Setup, bajo el número de prueba. Empieza por EAA...")
echo
PHONE=$(pedir "Phone number ID" WA_PHONE_ID "En API Setup, junto al número de prueba. Es solo dígitos.")
echo
SECRET=$(pedir "App Secret" WA_APP_SECRET "En Configuración → Básica → App Secret → Mostrar.")
echo

echo "════════════════════════════════════════════════════════"
echo "  Y tu WhatsApp (para el pase a una persona)"
echo "════════════════════════════════════════════════════════"
echo
echo "  Cuando un cliente pide hablar con alguien, el bot marca la conversación" >&2
echo "  y te avisa. Sin este número, el bot promete un humano y no avisa a nadie." >&2
echo "  OJO: el número de prueba solo puede escribirle a destinatarios dados de" >&2
echo "  alta en Meta, así que tiene que ser uno que ya tengas ahí (por ejemplo el" >&2
echo "  tuyo, el mismo que agregaste a la lista 'To')." >&2
echo >&2
echo "  Formato internacional sin + ni espacios. Ejemplo: 573001234567" >&2
AVISO=$(pedir "Tu WhatsApp (WA_AVISO_A)" WA_AVISO_A "Para el aviso de pase a humano. Ej: 573001234567")
echo

# --------------------------------------------------------------------------- #
# Escribir el .env. Primero un respaldo, por si acaso.
GV=$(grep -m1 '^WA_GRAPH_VERSION=' "$ENV" | cut -d= -f2- || true)
[ -n "$GV" ] || GV="v21.0"
cp "$ENV" "$ENV.bak.$(date +%s)" 2>/dev/null || true

umask 077
cat > "$ENV" <<EOF
# Valores de Meta para el bot de WhatsApp de IQ.
# Escrito por configurar.sh — NO se commitea (está en el .gitignore).
WA_VERIFY_TOKEN=$VT
WA_TOKEN=$TOKEN
WA_PHONE_ID=$PHONE
WA_APP_SECRET=$SECRET
WA_AVISO_A=$AVISO
WA_GRAPH_VERSION=$GV
EOF
chmod 600 "$ENV"

echo "  ✔ guardado en $ENV (permisos 600)"
echo "  ✔ el token de Meta NO se imprimió en ningún momento"
echo

# --------------------------------------------------------------------------- #
echo "════════════════════════════════════════════════════════"
echo "  Reiniciando el bot y verificando"
echo "════════════════════════════════════════════════════════"
echo
docker compose -p iqbot -f docker-compose.yml up -d 2>&1 | tail -4
sleep 12

echo
echo "  ── el diagnóstico del propio bot ──"
curl -s --max-time 20 "https://ingeniumquintero.com/wa/salud?clave=$VT" \
  | python3 -m json.tool 2>/dev/null || echo "  (no respondió; mira: docker logs iqbot-bot-1)"

echo
echo "  ── el handshake con Meta ──"
RESP=$(curl -s --max-time 20 \
  "https://ingeniumquintero.com/wa/webhook?hub.mode=subscribe&hub.verify_token=$VT&hub.challenge=OK_CONFIGURADO")
if [ "$RESP" = "OK_CONFIGURADO" ]; then
  echo "     ✔ responde correctamente — ya puedes darle 'Verify and save' en Meta"
else
  echo "     ✗ respondió: ${RESP:0:80}"
fi
echo
echo "  Cuando Meta te acepte el webhook, NO olvides suscribir el campo"
echo "  'messages' — sin eso el webhook queda aceptado pero no llegan mensajes."
echo
