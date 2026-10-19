# syntax=docker/dockerfile:1

# ---------- deps ----------
FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# ---------- build ----------
FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Las variables NEXT_PUBLIC_* y las de metadata se incrustan en el bundle AL
# CONSTRUIR: no basta con ponerlas en `environment:` del compose, el navegador
# nunca las vería. Por eso entran como argumentos de build.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_UMAMI_SRC
ARG NEXT_PUBLIC_UMAMI_ID
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_UMAMI_SRC=$NEXT_PUBLIC_UMAMI_SRC \
    NEXT_PUBLIC_UMAMI_ID=$NEXT_PUBLIC_UMAMI_ID

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- runtime ----------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/next.config.ts ./next.config.ts

# La carpeta de los leads tiene que existir y ser del usuario que corre la app:
# un volumen nombrado recién creado hereda el dueño del directorio de la imagen.
# Sin esto, `nextjs` no puede escribir y cada lead se pierde con un EACCES.
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
