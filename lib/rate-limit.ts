/**
 * Limitador en memoria, por proceso.
 *
 * No es un WAF. Con varias réplicas del contenedor cada una lleva su propia
 * cuenta; para lo que importa aquí —que un curioso no queme el modelo ni llene
 * el archivo de leads con un bucle abierto— alcanza y sobra, y no obliga a
 * montar Redis para una landing.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Limpieza perezosa: sin esto el Map crece con cada IP que pase por la página. */
function purgar(ahora: number) {
  if (buckets.size < 500) return;
  for (const [clave, bucket] of buckets) {
    if (ahora > bucket.resetAt) buckets.delete(clave);
  }
}

export function rateLimit(
  clave: string,
  limite: number,
  ventanaMs: number
): { ok: boolean; restantes: number; resetAt: number } {
  const ahora = Date.now();
  purgar(ahora);

  const bucket = buckets.get(clave);
  if (!bucket || ahora > bucket.resetAt) {
    const resetAt = ahora + ventanaMs;
    buckets.set(clave, { count: 1, resetAt });
    return { ok: true, restantes: limite - 1, resetAt };
  }

  if (bucket.count >= limite) {
    return { ok: false, restantes: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return { ok: true, restantes: limite - bucket.count, resetAt: bucket.resetAt };
}

/**
 * IP del visitante. Detrás de Traefik llega en `x-forwarded-for` (el primero de
 * la lista es el cliente, el resto son proxies). Si no hay cabecera —desarrollo
 * local— se usa un marcador fijo: agrupa a todos, que es lo conservador.
 */
export function clientIp(req: Request): string {
  // X-Forwarded-For es una cadena que cada proxy va alargando: el visitante
  // puede escribir la suya, y Traefik añade la real AL FINAL. Quedarse con la
  // primera —lo que hacía antes— es creerse lo que dice el visitante: bastaba
  // cambiar la cabecera en cada petición para saltarse el límite por IP, y con
  // él la contención del gasto en la demo.
  // La última entrada de la cadena la pone nuestro propio proxy, así que no se
  // puede falsear. Si no hay cadena, se usa X-Real-Ip, que también fija Traefik.
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const partes = forwarded
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    const ultima = partes[partes.length - 1];
    if (ultima) return ultima;
  }
  return req.headers.get("x-real-ip")?.trim() || "sin-ip";
}
