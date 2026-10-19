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
WA_AVISO_A=573106055920
EOF
chmod 600 bot/.env
```

**Este `.env` no se commitea.** Está en el `.gitignore`.

Ojo con dónde se ejecuta el compose: lee el `.env` de su directorio de proyecto, no
del directorio actual. Si lo lanzas desde `/root/work/iq`, pásale el archivo a
mano (`--env-file bot/.env`) o entra primero a `bot/`.

| Variable | Para qué | Si falta |
|---|---|---|
| `WA_VERIFY_TOKEN` | el handshake de Meta y la clave de `/wa/probar` | el webhook rechaza toda verificación |
| `WA_TOKEN` | enviar mensajes por la Cloud API | piensa pero no envía (queda en el registro) |
| `WA_PHONE_ID` | lo mismo | lo mismo |
| `WA_APP_SECRET` | verificar la firma de Meta | **se descartan todos los mensajes** (falla cerrado) |
| `WA_AVISO_A` | a qué WhatsApp llega el aviso de «pasa a humano» | se anota el pase, pero nadie se entera |
| `LLM_MODEL` | el modelo (por defecto `qwen2.5:3b`) | — |
| `MAX_CARACTERES` | tope de largo por mensaje del cliente (por defecto 1200) | — |

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

**Se verifica la firma de cada mensaje, y si no se puede verificar, se descarta.**
Sin firma, cualquiera que descubra la URL puede hacerle decir lo que quiera al bot
y gastar el modelo. Usa `WA_APP_SECRET`.

> **Esto no era así al principio, y costó caro:** la primera versión devolvía
> «válido» cuando faltaba el `APP_SECRET` («para no estorbar en la prueba»). Con
> el bot ya desplegado y sin ese dato, se comprobó desde fuera que un `POST`
> fabricado, sin firma, entraba con **200** y gastaba una llamada al modelo.
> Ahora falla cerrado: sin `WA_APP_SECRET` el mensaje se descarta y queda dicho
> en el log.

**Se deduplica por `message_id`.** Si Meta reintenta, no se contesta dos veces.

**El prompt le prohíbe inventar precios.** Es la misma promesa que hace la
landing; si el bot la rompe, la landing miente. Cuando no sabe, pasa a una
persona — que es lo que el cliente quiere oír.

**Dos guardarraíles que NO viven en el prompt, sino en el código.** Un modelo de
3B ignora instrucciones largas cuando la pregunta es insistente, así que lo que
protege al negocio se comprueba con código:

- **Consejo médico:** si el mensaje pide qué tomar, si duele algo, dosis o
  diagnósticos, no se le pregunta al modelo: se contesta un texto fijo que
  rechaza y redirige. Medido con el 3B: a «me duele una muela, ¿qué me recomiendas
  tomar?» había recetado **paracetamol e ibuprofeno** con la instrucción de no dar
  conceptos médicos delante. Un negocio que vende bots no puede tener al bot
  recetando.
- **Salida trabada:** si el modelo repite la misma palabra o se queda sin
  variedad, se contesta un respaldo y se pasa a humano. Medido: ante «¿eres un bot
  o una persona?» llegó a repetir «soy» más de sesenta veces.

**La marca `[[PASE]]` no la ve el cliente.** Cuando hace falta una persona, el
modelo termina la respuesta con esa marca; el bot la borra antes de enviar y
avisa por WhatsApp a `WA_AVISO_A` con lo que escribió el cliente y lo que
contestó el bot. Antes prometía «te responde un compañero del equipo» y **no le
avisaba a nadie**: eso es peor que un bot que no promete nada.

**La memoria es RAM.** Se pierde al reiniciar. Para una prueba está bien, y evita
meter una base de datos antes de saber si el bot sirve.

**El registro (`conversaciones.jsonl`) lleva datos de clientes.** Cada línea trae
lo que entró, lo que salió, si se envió, cuántos segundos tardó, el modelo, si
hubo guardarraíl y si se pasó a humano. Es lo que se lee para mejorar el prompt;
no se comparte fuera del equipo.

## Revisión: por qué Ollama no debería escuchar en la red

El bot tal como está levantado habla con el Ollama **del host**, que para eso
quedó escuchando en todas las interfaces, con un `iptables` que tira los paquetes
que entran por `eth0`. Comprobado desde fuera: el puerto 11434 **no responde**
desde internet, así que la mitigación funciona hoy. Pero es frágil por dos
motivos, y conviene decirlos:

1. **Las reglas de `iptables` no sobreviven a un reinicio** salvo que estén
   guardadas (`iptables-save` + `netfilter-persistent`). Si el VPS se reinicia y
   Ollama arranca escuchando en todas las interfaces sin la regla, queda un modelo
   abierto a internet: cualquiera puede usar la CPU del servidor a coste de IQ.
2. La exposición existe en primer lugar por comodidad: una regla de firewall
   protegiendo un servicio que **no necesita** estar expuesto.

La forma limpia es que Ollama viva **en la misma red de Docker** y el bot lo llame
por nombre, sin tocar el host: se va la exposición y se va el firewall. Añadir al
`bot/docker-compose.yml`:

```yaml
  ollama:
    image: ollama/ollama:latest
    restart: unless-stopped
    volumes:
      - iqbot-ollama:/root/.ollama
    networks:
      - dokploy-network        # sin etiquetas de Traefik: no sale a internet
```

y en el servicio `bot`, `OLLAMA_URL=http://ollama:11434`. El modelo se baja una
vez con `docker exec -it <contenedor> ollama pull qwen2.5:3b`. Queda para
VPSHermes, que es quien manda en el servidor; en el Mac no se puede probar tal
cual.
