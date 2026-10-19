# Bot de WhatsApp de IQ — versión de prueba

Contesta en WhatsApp con IA, usando el **número de prueba** de Meta (gratis, sin
verificación de negocio, hasta 5 destinatarios). Sirve para probar de punta a
punta antes de meterse en el papeleo de la cuenta business.

```
WhatsApp ──► Meta (Cloud API) ──► https://ingeniumquintero.com/wa/webhook
                                              │
                                              ├─ verifica la firma
                                              ├─ responde 200 a Meta  (rápido)
                                              └─ piensa con Ollama y contesta
```

---

## Lo que ya está hecho

- El servicio, con el webhook, la verificación de firma y la deduplicación.
- Ollama en el VPS con un modelo local.
- La ruta pública en HTTPS, reutilizando el certificado de `ingeniumquintero.com`.
- Un registro en `conversaciones.jsonl` con cada mensaje y su respuesta.

## Lo que falta — y es tuyo

Son unos **10 minutos** en Meta. Yo no puedo hacerlo: es tu cuenta.

### 1. Crear la app

```
developers.facebook.com → My Apps → Create App
  Tipo:            Business
  Nombre:          IQ Bot Prueba
```

### 2. Agregarle WhatsApp

En el panel de la app → **Add Product** → **WhatsApp** → **Set up**.

Meta te crea un **número de prueba** y **5 destinatarios** de prueba. Agrega tu
número de WhatsApp (el tuyo, para probar) y verifícalo con el código que te
llega.

### 3. Sacar los cuatro datos

En **WhatsApp → API Setup** de la app:

| Dato | Dónde está | Variable |
|---|---|---|
| **Phone number ID** | arriba, junto al número de prueba | `WA_PHONE_ID` |
| **Access token** (temporal, 24 h) | bajo el número | `WA_TOKEN` |
| **App Secret** | Settings → Basic → App Secret | `WA_APP_SECRET` |
| **Verify token** | lo inventas tú, el que quieras | `WA_VERIFY_TOKEN` |

El **verify token** no te lo da Meta: lo eliges tú, lo pegas en el servidor y
luego escribes **el mismo** en Meta al configurar el webhook.

### 4. Pegarlos en el VPS

```bash
cd /root/work/iq
cat > bot/.env <<'EOF'
WA_VERIFY_TOKEN=elige-una-cadena-larga-y-aleatoria
WA_TOKEN=el-access-token-de-meta
WA_PHONE_ID=el-phone-number-id
WA_APP_SECRET=el-app-secret
EOF
chmod 600 bot/.env
```

**Este `.env` no se commitea.** Está en el `.gitignore`.

### 5. Configurar el webhook en Meta

En **WhatsApp → Configuration → Webhook → Edit**:

```
Callback URL:     https://ingeniumquintero.com/wa/webhook
Verify token:     (el mismo que pusiste arriba)
```

Le das **Verify and save**. Si el servidor está bien, Meta lo acepta al
instante. Si falla, revisa `docker logs iqbot-bot-1` — ahí queda el motivo.

Y luego, en la misma pantalla, **suscribe el campo `messages`**. Sin eso, Meta
acepta el webhook pero **no manda los mensajes**. Es el paso que más se olvida.

---

## Comprobar que el bot está vivo

```bash
curl -s https://ingeniumquintero.com/wa/salud | python3 -m json.tool
```

Devuelve qué falta, si el modelo responde y si está listo para Meta:

```json
{
  "listo_para_meta": false,
  "variables_que_faltan": ["WA_TOKEN", "WA_PHONE_ID"],
  "modelo_disponible": true
}
```

## Ver qué contestó

```bash
docker exec iqbot-bot-1 cat /app/data/conversaciones.jsonl
```

Cada línea: lo que entró, lo que salió, si se envió, cuántos segundos tardó y
con qué modelo. Eso es lo que se lee para mejorar el prompt.

---

## Decisiones que conviene conocer

**Se le contesta a Meta antes de pensar.** Meta espera un 200 en menos de 5
segundos; si no llega, reintenta el mensaje y el cliente recibe la respuesta dos
veces. Por eso el webhook responde de inmediato y el trabajo va en segundo plano.

**Se verifica la firma de cada mensaje.** Sin eso, cualquiera que descubra la URL
puede hacerle decir lo que quiera al bot y gastar el modelo. Usa `WA_APP_SECRET`.

**Se deduplica por `message_id`.** Si Meta reintenta, no se contesta dos veces.

**El prompt le prohíbe inventar precios.** Es la misma promesa que hace la
landing; si el bot la rompe, la landing miente. Cuando no sabe, pasa a una
persona — que es lo que el cliente quiere oír.

**La memoria es RAM.** Se pierde al reiniciar. Para una prueba está bien, y evita
meter una base de datos antes de saber si el bot sirve.
