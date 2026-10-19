# Ingenium Quintero — Landing

Landing de la agencia **Ingenium Quintero (IQ)**: bots de WhatsApp con IA, asistentes sobre documentos, automatización de procesos y webs.

## Stack
- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 — **sin `tailwind.config.ts`**: el tema vive en `app/globals.css` (`@theme`, variables `--color-*`)
- framer-motion (animaciones) · lucide-react (íconos)

## Desarrollo
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Docker
```bash
docker build -t ingenium-quintero \
  --build-arg NEXT_PUBLIC_SITE_URL=https://iq.elingesmartgrids.cloud .
docker run -p 3000:3000 -v iq-leads:/app/data ingenium-quintero
```
Ojo con dos cosas que no se ven:
- Las `NEXT_PUBLIC_*` (dominio y analítica) se **incrustan al construir**. Van como
  `--build-arg`, no basta con pasarlas en `docker run`.
- El volumen en `/app/data` es donde quedan los leads. Sin él, cada `--build`
  borra los que llegaron.

## Dónde editar
| Qué | Archivo |
| --- | --- |
| Todos los textos | `content/es.ts` |
| Número de WhatsApp, dominio | `lib/site.ts` |
| Colores, tipografía, tokens | `app/globals.css` |
| Redes sociales y correo | `content/es.ts` → `footer` (`socials`: vacío = no se muestran) |
| Precios y oferta de cupos | `content/es.ts` → `pricing` |
| Textos de la demo en vivo | `content/es.ts` → `demo` |
| Lo que el agente de la demo NO puede decir | `lib/demo.ts` → `PROMPT_DEMO` |
| Imágenes | `public/` |

## Piezas que no son solo diseño

- **`/api/lead`** — guarda cada lead del formulario (una línea JSON por lead en
  `LEAD_STORE_PATH`) y, si hay `LEAD_WEBHOOK_URL`, lo reenvía. El navegador guarda
  **antes** de abrir WhatsApp: si el visitante no llega a enviar el mensaje, el
  caso queda registrado igual. Tope de tamaño, límite por IP y campo trampa.
- **`/api/demo`** — el agente de la demo pública. Habla con cualquier endpoint
  compatible con OpenAI. Sin `DEMO_LLM_BASE_URL`/`DEMO_LLM_MODEL` responde
  `configurado: false` y el widget manda a WhatsApp, en vez de quedarse mudo.
  Ojo: la calidad del modelo es la calidad de la demo; un 3B contesta flojo.
- **`components/Analytics.tsx`** — carga Umami **solo si está configurado** y
  manda el evento `whatsapp_click` con la sección de origen y el gancho del
  mensaje (`fuga`, `cupos` o `diagnostico`), que es como se mide la campaña.

## Añadir inglés
1. Copiar `content/es.ts` a `content/en.ts` y traducir (mismo tipo `Dictionary`).
2. Registrarlo en `content/index.ts`.
3. Crear la ruta `app/[locale]/` o usar subdominio, y pasar `getDictionary(locale)` a los componentes (ya reciben `t` por props).

## Variables de entorno
Ninguna es obligatoria: sin variables la página funciona, sin analítica, con la
demo declarada apagada y con el dominio de respaldo. La lista con explicaciones
está en **`.env.example`**.

| Variable | Cuándo se lee | Para qué |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | al construir | canonical, og:url, og:image, sitemap |
| `NEXT_PUBLIC_UMAMI_SRC`, `NEXT_PUBLIC_UMAMI_ID` | al construir | analítica (Umami) |
| `DEMO_LLM_BASE_URL`, `DEMO_LLM_MODEL`, `DEMO_LLM_API_KEY` | en ejecución | la demo en vivo |
| `LEAD_STORE_PATH`, `LEAD_WEBHOOK_URL` | en ejecución | dónde quedan los leads |

No hay secretos ni claves en el repositorio.
