# CÓMO TRABAJAMOS — IQ / elInge

> **Este archivo es el contrato entre las máquinas.**
> Si algo de aquí se cambia, se cambia AQUÍ, se commitea, y los dos lo leemos.
> No hay otro canal: no nos hablamos, leemos el repo.

---

## 1) LOS DOS AGENTES, Y SUS PAPELES

| | **Mac mini M4** *(en casa de Edwin)* | **VPS Hostinger** *(este sigue)* |
|---|---|---|
| **Apodo** | «el constructor» | «el desplegador» |
| **Qué hace** | **CONSTRUYE.** Escribe código, crea aplicaciones, monta todo | **DESPLIEGA.** Pone en producción y verifica |
| **Para qué tiene la máquina** | GPU (modelos locales), siempre encendido, silencioso | IP pública, Docker, Traefik, los dominios |
| **Lo que NUNCA hace** | **Desplegar en producción** | **Escribir el código de la aplicación** |

**Edwin es el puente.** Ninguno de los dos le habla al otro. Todo pasa por el repo.

---

## 2) EL CANAL: GIT, Y SOLO GIT

```
Mac mini  ──push──►  GitHub (samu1606)  ──pull──►  VPS
VPS       ──push──►  GitHub (samu1606)  ──pull──►  Mac mini
```

- **El repo es la memoria compartida.** Lo que no está commiteado, para el otro no existe.
- **Nunca se escribe en el repo del otro por SSH.** Se commitea, y el otro hace `pull`.
- Los mensajes entre agentes van **en el commit**: qué hice, qué verifiqué, qué falta.
  Un commit que dice «cambié cosas» no sirve. Uno que dice «corregí X porque Y, verificado
  con Z» sí.

### Estados de una tarea (etiquetas en el commit o en el PR)

```
[CONSTRUIDO]  → el Mac terminó y subió. NO está en producción.
[REVISAR]     → Edwin tiene que mirarlo o decidir algo. NADIE despliega aquí.
[DEPLOY]      → autorizado para que el VPS lo ponga en producción.
[DESPLEGADO]  → el VPS lo hizo y VERIFICÓ (con la evidencia).
[BLOQUEADO]   → no se puede seguir; dice por qué.
```

---

## 3) LA FRONTERA: CÓDIGO SÍ, SECRETOS NO

```
✅ VA AL REPO                        ❌ NUNCA VA AL REPO
  código, componentes, configuración    .env  (las claves)
  tests, documentación, este archivo    tokens, llaves SSH
  el archivo de ejemplo .env.example    credenciales de Supabase, Wompi
```

**Por qué importa:** si el Mac escribe el `.env` en un archivo versionado, **las credenciales
de producción quedan en GitHub para siempre** — incluso si las borra después, siguen en el
historial. Eso no se arregla: se rota la clave.

**El `.env` vive SOLO en el VPS** (`/root/work/elinge/.env`, modo 600).
El Mac nunca lo necesita: para construir no hacen falta las claves reales.

---

## 4) LA REGLA QUE EVITA EL ACCIDENTE CARO

```
elInge  tiene DOS ramas, y no son la misma cosa:

  auditoria/motor-calculo  →  la rama de TRABAJO. Aquí se construye y se experimenta.
  master                   →  PRODUCCIÓN. Lo que corre en el VPS.

  El Mac construye y prueba en la rama de trabajo.
  NADA llega a master sin que Edwin lo apruebe.
```

**Y de aquí sale la regla de oro:**

> **Un agente desatendido PREPARA, NO DESPLIEGA.**
> Deja la rama lista, el informe escrito, la evidencia — y **Edwin decide**.
> Es la metodología que ya está acordada: **propone → aprueba → ejecuta.**

Porque Edwin no está mirando cuando esto corre de noche. Un despliegue automático a las 3 de
la mañana, sin nadie despierto, es la forma más rápida de tumbar el sitio de un cliente.

---

## 5) EL FLUJO, PASO A PASO

```
1. Edwin pide algo                         (a cualquiera de los dos, o lo anota)
2. EL MAC CONSTRUYE
     · rama nueva desde la de trabajo
     · escribe el código
     · LO PRUEBA (el build y las pruebas tienen que pasar)
     · commit con el mensaje que explica el porqué
     · push  →  etiqueta [CONSTRUIDO]
3. EDWIN MIRA y decide
     · si algo hay que cambiar → vuelve al paso 2
     · si está bien → etiqueta [DEPLOY]
4. EL VPS DESPLIEGA
     · pull
     · respaldo ANTES de desplegar
     · despliega
     · VERIFICA: ¿el healthcheck responde? ¿la web da 200? ¿la API también?
     · si algo falla → revierte y reporta
     · commit/aviso con la evidencia → [DESPLEGADO]
5. SIEMPRE se dice QUÉ se verificó, no que «quedó listo».
```

---

## 6) ANTES DE TOCAR PRODUCCIÓN

- ✅ **Respaldo primero.** `git` limpio y sin cambios sin commitear, y las reglas de red
  guardadas antes de tocarlas.
- ✅ **Un cambio a la vez.** Si algo se rompe, hay que saber QUÉ lo rompió.
- ✅ **Verificar desde FUERA.** Una petición desde la propia máquina hacia su propia IP
  pública **no prueba nada**: sale por loopback y no toca las reglas de red.
  Se verifica desde otra máquina o con un servicio externo.
- ✅ **Anotar cómo deshacerlo.** Si no hay vuelta atrás escrita, no se empieza.

---

## 7) LO QUE NO SE TOCA SIN PREGUNTAR

| Cosa | Por qué |
|---|---|
| **El `.env` y las credenciales** | Si se filtran, hay que rotar todo |
| **`master` / producción** | Es lo que ven los clientes |
| **El socket de Docker** | Si se toca, **se rompe Dokploy** |
| **Los puertos 80 y 443** | Ahí vive el sitio por Traefik |
| **La base de Supabase** | Datos de usuarios reales |
| **El gateway de Hermes** | Es el canal de Edwin con su agente |

---

## 8) LA NORMA NO SE INVENTA *(regla de este proyecto)*

En elInge se calcula contra normativa. **Una cifra que no se puede verificar NO se calcula:
se rechaza y se dice por qué.** Ya pasó: aparecieron seis citas normativas falsas, dos
resoluciones derogadas y límites fijos que no salían de la norma.

- **Cada cita se comprueba contra el texto oficial** (los PDF en `elinge/docs/retie_40284/`).
- **Si la app decide que algo no aplica**, no se escribe «según RETIE»: se escribe
  *«la aplicación no lo considera aplicable a este tipo; el diseñador debe confirmarlo»*.
- **No se le atribuye a la norma una decisión propia.**

---

## 9) LOS PROTAGONISTAS

- **Edwin Quintero** — ingeniero electricista. Decide, aprueba, y es el puente. Está en
  LUTEC de 7 am a 4 pm, así que **el trabajo tiene que avanzar sin él y estar listo para
  revisar cuando llegue.**
- **elInge** — cálculos eléctricos, memoria RETIE y presupuestos. **En producción.**
- **IQ (Ingenium Quintero)** — la agencia. Bot de WhatsApp, asistentes sobre documentos,
  automatización; la web como puerta de entrada.

---

## 10) DÓNDE ESTÁ CADA COSA

```
VPS   /root/work/elinge        → elInge (producción)
VPS   /root/work/iq            → la landing de IQ
VPS   /root/work/agencia       → PENDIENTES.md — el plan y las reglas del negocio
VPS   elinge/docs/retie_40284/ → los 6 PDFs de la Resolución 40284 (el corpus)

GitHub  samu1606/elIngeSmartGrids
GitHub  samu1606/iq
```

**Lee `PENDIENTES.md` antes de proponer algo.** Ahí están los 17 pendientes, los precios, la
escalera de venta, los costos de IA y las decisiones que ya se tomaron. **No propongas lo que
ya está decidido en contra.**
