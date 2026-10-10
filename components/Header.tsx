"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/content";
import { whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./icons";

export function Header({ t }: { t: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-mint-400 focus:px-3 focus:py-2 focus:text-ink-950"
      >
        {t.nav.skip}
      </a>
      <div className="container-iq flex h-16 items-center justify-between md:h-[4.5rem]">
        <a href="#inicio" aria-label={t.brand.name} className="rounded-lg">
          <Logo name={t.brand.name} alt={t.brand.logoAlt} size={34} />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm text-fg-muted">
            {t.nav.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink(t.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden !min-h-10 !px-4 !py-2 text-sm sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t.nav.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-fg lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-movil"
            aria-label="Móvil"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="container-iq flex flex-col py-4">
              {t.nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-lg text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
