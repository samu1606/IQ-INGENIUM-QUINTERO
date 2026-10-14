"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/content";
import { User, Menu, X, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  onOpenLeadForm?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLeadForm }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["servicios", "como-trabajamos", "por-que-nosotros", "contacto"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${sectionId}`);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onOpenLeadForm) {
      onOpenLeadForm();
    }
    const target = document.getElementById("contacto");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#ffffff]/90 backdrop-blur-xl border-b border-[#b9cbbc]/30 shadow-[0_4px_24px_-4px_rgba(16,24,40,0.06)]"
          : "bg-[#ffffff]/80 backdrop-blur-md border-b border-[#b9cbbc]/20 shadow-[0_2px_12px_-2px_rgba(16,24,40,0.03)]"
      }`}
    >
      <div className="h-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 flex items-center justify-between gap-6">
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-3 shrink-0 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="h-9 w-9 rounded-xl bg-[#006d3f] flex items-center justify-center text-white shadow-sm font-display font-bold text-base tracking-tighter">
            <span className="text-[#26ff9d]">I</span>Q
          </div>
          <span className="font-display font-semibold text-lg text-[#191c1f] tracking-tight group-hover:text-[#006d3f] transition-colors">
            {content.header.brand}
          </span>
        </a>

        {/* Desktop Navigation Capsule */}
        <nav
          className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#f2f3f8]/80 border border-[#b9cbbc]/20"
          aria-label="Principal"
        >
          {content.header.nav.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-1.5 rounded-full font-label text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-[#e7e8ed] text-[#191c1f] shadow-xs"
                    : "text-[#3b4a3f] hover:text-[#191c1f] hover:bg-white/50"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contacto"
            onClick={handleCtaClick}
            className="hidden sm:inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#26ff9d] text-[#191c1f] font-label text-sm font-bold shadow-[0_4px_16px_-2px_rgba(38,255,157,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-2px_rgba(38,255,157,0.5)] active:translate-y-0 transition-all cursor-pointer"
          >
            {content.header.cta}
          </a>

          <div
            className="w-8 h-8 rounded-full bg-[#006d3f] hidden sm:flex items-center justify-center text-white shadow-xs"
            aria-hidden="true"
          >
            <User size={16} strokeWidth={1.5} className="text-[#ffffff]" />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#f2f3f8] text-[#191c1f] hover:bg-[#e7e8ed] transition-colors focus:outline-none focus:ring-2 focus:ring-[#006d3f]"
            aria-label={mobileMenuOpen ? content.header.mobileMenuClose : content.header.mobileMenuOpen}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-b border-[#b9cbbc]/30 bg-white/95 backdrop-blur-xl shadow-lg"
          >
            <div className="px-5 py-6 flex flex-col gap-3">
              <nav className="flex flex-col gap-2">
                {content.header.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-[#191c1f] font-display text-base font-medium hover:bg-[#f2f3f8] transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={16} strokeWidth={1.5} className="text-[#6b7b6e]" />
                  </a>
                ))}
              </nav>

              <div className="pt-2">
                <a
                  href="#contacto"
                  onClick={handleCtaClick}
                  className="w-full inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#26ff9d] text-[#191c1f] font-label text-sm font-bold shadow-[0_4px_16px_-2px_rgba(38,255,157,0.35)] transition-all cursor-pointer"
                >
                  {content.header.cta}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
