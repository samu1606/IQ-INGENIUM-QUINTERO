import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import { defaultLocale } from "@/content";
import { site } from "@/lib/site";
import "./globals.css";

/* Las tres fuentes del diseño, auto-alojadas por Next: sin pedidos a Google
   en tiempo de ejecución y sin salto de layout. Quedan como variables CSS
   (--font-inter, --font-grotesk, --font-jakarta) y globals.css las usa por
   esos nombres. Declararlas por nombre ('Inter') NO funcionaría. */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["500", "600", "700"],
  display: "swap",
});

const TITULO = "Ingenium Quintero | Automatización de Negocios e Inteligencia Artificial";
const DESCRIPCION =
  "Páginas web, bots de WhatsApp con IA y automatización para cualquier tipo de negocio. " +
  "Atiende 24/7, consulta tus documentos y elimina el trabajo repetitivo.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: TITULO,
  description: DESCRIPCION,
  applicationName: "Ingenium Quintero",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Ingenium Quintero",
    title: TITULO,
    description: DESCRIPCION,
    locale: "es_CO",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Ingenium Quintero" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f8f9fe",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={defaultLocale}
      className={`${inter.variable} ${grotesk.variable} ${jakarta.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
