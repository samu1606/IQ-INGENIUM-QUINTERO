"use client";

import React from "react";
import Link from "next/link";
import { content } from "@/content";
import { site, whatsappLink } from "@/lib/site";

export const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="w-full bg-white border-t border-[#b9cbbc]/30 py-16 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 mb-14">
          {/* Brand & Purpose */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-[#006d3f] flex items-center justify-center text-white shadow-xs font-display font-bold text-sm tracking-tighter">
                <span className="text-[#26ff9d]">I</span>Q
              </div>
              <span className="font-display font-semibold text-lg text-[#191c1f]">
                {content.footer.brand}
              </span>
            </div>

            <p className="font-body text-sm text-[#3b4a3f] max-w-sm leading-relaxed">
              {content.footer.brandDescription}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2f3f8] text-[#191c1f] font-display text-xs font-medium border border-[#b9cbbc]/20 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#26ff9d] animate-pulse shadow-[0_0_8px_#26ff9d]" />
              <span>{content.footer.statusBadge}</span>
            </div>
          </div>

          {/* Contacto Directo */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="font-label text-xs uppercase tracking-wider text-[#535d55] font-semibold">
              {content.footer.contactHeading}
            </span>
            {/* WhatsApp primero: es el canal por el que llegan los clientes. Antes
                solo había un correo, y ese correo vivía en un dominio sin registrar. */}
            <a
              href={whatsappLink(content.whatsappFab.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-lg sm:text-xl font-bold text-[#191c1f] hover:text-[#006d3f] transition-colors"
            >
              {site.whatsappDisplay}
            </a>
            {/* El número también marcable: hay clientes que prefieren llamar, y
                sin un enlace `tel:` en móvil no se puede. */}
            <a
              href={`tel:+${site.whatsappNumber}`}
              className="font-body text-sm text-[#3b4a3f] hover:text-[#191c1f] transition-colors"
            >
              Llamar: {site.whatsappDisplay}
            </a>
            <a
              href={`mailto:${content.footer.email}`}
              className="font-body text-sm text-[#3b4a3f] hover:text-[#006d3f] transition-colors break-all"
            >
              {content.footer.email}
            </a>
            <span className="font-body text-sm text-[#3b4a3f]">
              {content.footer.locations}
            </span>

            {content.footer.socials.length > 0 && (
              <div className="flex flex-col gap-2 mt-3">
                <span className="font-label text-xs uppercase tracking-wider text-[#535d55] font-semibold">
                  {content.footer.socialHeading}
                </span>
                <div className="flex flex-wrap gap-2">
                  {content.footer.socials.map((red) => (
                    <a
                      key={red.label}
                      href={red.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full bg-[#f2f3f8] border border-[#b9cbbc]/25 font-label text-xs text-[#191c1f] hover:border-[#006d3f] transition-colors"
                    >
                      {red.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navegación */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-label text-xs uppercase tracking-wider text-[#535d55] font-semibold">
              {content.footer.navHeading}
            </span>
            <div className="flex flex-col gap-2 font-body text-sm">
              {content.footer.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[#3b4a3f] hover:text-[#191c1f] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#edeef3] flex flex-col sm:flex-row items-center justify-between gap-3 font-label text-xs text-[#535d55]">
          <p>{content.footer.copyright}</p>
          {/* Páginas legales: Meta las exige para publicar la app de WhatsApp,
              y un cliente que va a firmar también las busca. */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacidad" className="hover:text-[#006d3f] transition-colors">
              Política de privacidad
            </Link>
            <Link href="/terminos" className="hover:text-[#006d3f] transition-colors">
              Condiciones del servicio
            </Link>
            <Link href="/eliminacion-de-datos" className="hover:text-[#006d3f] transition-colors">
              Eliminación de datos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
