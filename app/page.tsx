import { Landing } from "@/components/Landing";
import { site } from "@/lib/site";

/**
 * Datos estructurados para Google.
 *
 * OJO: aquí solo va lo que es CIERTO. La versión que generó AI Studio traía
 * un teléfono enmascarado («+573****5920») y se había inventado las
 * ubicaciones («Madrid / Ciudad de México / Remoto Global»), además de un
 * rango de precios y un horario que nadie declaró. En datos estructurados
 * eso es peor que no poner nada: Google lo lee como hecho.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ingenium Quintero",
  url: site.url,
  logo: `${site.url}/logo-iq.png`,
  image: `${site.url}/og-image.jpg`,
  description:
    "Páginas web, bots de WhatsApp con IA y automatización para cualquier tipo de negocio. " +
    "Atiende 24/7, consulta tus documentos y elimina el trabajo repetitivo.",
  areaServed: "Worldwide",
  telephone: `+${site.whatsappNumber}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogotá",
    addressCountry: "CO",
  },
  knowsAbout: [
    "Inteligencia Artificial",
    "Automatización de Procesos",
    "Bots de WhatsApp con IA",
    "Sistemas RAG para Documentos",
    "Desarrollo Web Moderno",
  ],
};

export default function Home() {
  return (
    <>
      <Landing />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
