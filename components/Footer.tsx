"use client";

import React from "react";
import { content } from "@/content";

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
            <a
              href={`mailto:${content.footer.email}`}
              className="font-display text-lg sm:text-xl font-bold text-[#191c1f] hover:text-[#006d3f] transition-colors"
            >
              {content.footer.email}
            </a>
            <span className="font-body text-sm text-[#3b4a3f]">
              {content.footer.locations}
            </span>
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
        <div className="pt-8 border-t border-[#edeef3] flex flex-col sm:flex-row items-center justify-between gap-4 font-label text-xs text-[#535d55]">
          <p>{content.footer.copyright}</p>
          <div className="flex items-center gap-6">
            {content.footer.legalLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-[#191c1f] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
