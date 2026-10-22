import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /**
   * Cabeceras de seguridad.
   *
   * Una landing que se va a mostrar a un gerente no puede ir sin ellas: el
   * navegador se las pide y, si no están, cualquiera puede meter esta página
   * dentro de un iframe ajeno y hacer pasar sus botones por los nuestros
   * (clickjacking), o el navegador puede adivinar el tipo de un archivo y
   * ejecutarlo.
   *
   * La CSP se deja en 'self' con 'unsafe-inline' para scripts y estilos porque
   * Next inyecta su propio JavaScript en línea en cada página; sin eso la web
   * se queda en blanco. No hay ningún recurso de terceros cargándose hoy: si
   * algún día se configura Umami (lib/analytics.ts), hay que añadir su dominio
   * a script-src y connect-src o la analítica no cargará.
   */
  async headers() {
    const seguridad = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self' data:",
          "connect-src 'self'",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join("; "),
      },
    ];

    return [{ source: "/:path*", headers: seguridad }];
  },
};

export default nextConfig;
