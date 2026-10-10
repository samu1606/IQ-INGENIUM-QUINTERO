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
docker build -t ingenium-quintero .
docker run -p 3000:3000 ingenium-quintero
```

## Dónde editar
| Qué | Archivo |
| --- | --- |
| Todos los textos | `content/es.ts` |
| Número de WhatsApp, dominio | `lib/site.ts` |
| Colores, tipografía, tokens | `app/globals.css` |
| Redes sociales y correo | `content/es.ts` → `footer` |
| Imágenes | `public/` |

## Añadir inglés
1. Copiar `content/es.ts` a `content/en.ts` y traducir (mismo tipo `Dictionary`).
2. Registrarlo en `content/index.ts`.
3. Crear la ruta `app/[locale]/` o usar subdominio, y pasar `getDictionary(locale)` a los componentes (ya reciben `t` por props).

## Variables de entorno (opcionales)
- `NEXT_PUBLIC_SITE_URL` — por defecto `https://ingeniumquintero.com`.

No hay secretos ni claves en el repositorio.
