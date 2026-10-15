import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/* Antes daba 404. La landing es una sola página, así que el mapa es una sola
   entrada — pero existe, y eso es lo que permite que Google la rastree y la
   indexe sin adivinar. Es el pendiente #9: la auditoría SEO con la que se
   empieza a vender necesita esto para poder reportar algo. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
