import { getDictionary } from "@/content";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Niches } from "@/components/Niches";
import { Process } from "@/components/Process";
import { Comparison } from "@/components/Comparison";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function Home() {
  const t = getDictionary("es");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: t.brand.name,
    url: site.url,
    logo: `${site.url}/logo-iq.png`,
    image: `${site.url}/og-image.jpg`,
    description: t.meta.description,
    areaServed: "Worldwide",
    telephone: `+${site.whatsappNumber}`,
  };

  return (
    <>
      <Header t={t} />
      <main id="contenido">
        <Hero t={t} />
        <Services t={t} />
        <Niches t={t} />
        <Process t={t} />
        <Comparison t={t} />
        <FinalCta t={t} />
      </main>
      <Footer t={t} />
      <WhatsAppFab label={t.whatsapp.floatingLabel} message={t.whatsapp.defaultMessage} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
