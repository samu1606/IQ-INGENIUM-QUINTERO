import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/* Antes daba 404: un buscador que llega a /robots.txt no encontraba nada.
   Al declararlo aquí, Next lo genera como archivo estático en el build. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
