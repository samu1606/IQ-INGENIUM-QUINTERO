"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { content } from "@/content";
import {
  ArrowRight,
  Bot,
  Sparkles,
  FileText,
  CheckCircle2,
  MoreVertical,
} from "lucide-react";

interface HeroProps {
  onOpenLeadForm?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLeadForm }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Subtle, expensive slow float for the cards
  const yCard1 = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#eaf4ff] via-[#f2f7fc] to-[#f8f9fe] pt-14 pb-20 sm:pb-28">
        {/* Ambient luminous glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-white/90 via-[#26ff9d]/10 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-[#83f3ff]/20 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 flex flex-col items-center text-center">
          {/* Top Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xs border border-[#b9cbbc]/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#26ff9d] shadow-[0_0_8px_#26ff9d]" />
            <span className="font-label text-xs uppercase tracking-wider text-[#191c1f] font-semibold">
              {content.hero.statusPill}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-display text-3xl sm:text-5xl md:text-[68px] md:leading-[1.1] text-[#191c1f] font-bold tracking-tight max-w-4xl mx-auto mb-5"
          >
            {content.hero.titlePrefix}
            <span className="text-[#006d3f] font-bold">{content.hero.titleHighlight}</span>
            {content.hero.titleSuffix}
          </motion.h1>

          {/* Clean Editorial Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="font-body text-base sm:text-lg md:text-xl text-[#3b4a3f] max-w-2xl mx-auto mb-9 leading-relaxed"
          >
            {content.hero.subtitle}
          </motion.p>

          {/* CTA Buttons Group */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 sm:mb-20 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={() => {
                if (onOpenLeadForm) onOpenLeadForm();
                scrollToSection("contacto");
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-[#26ff9d] text-[#191c1f] font-label text-sm font-bold shadow-[0_4px_20px_-2px_rgba(38,255,157,0.45)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-2px_rgba(38,255,157,0.6)] active:translate-y-0 transition-all cursor-pointer"
            >
              <span>{content.hero.ctaPrimary}</span>
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("servicios")}
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-[#191c1f] font-label text-sm font-semibold shadow-xs hover:bg-[#f2f3f8] border border-[#b9cbbc]/25 transition-all cursor-pointer"
            >
              {content.hero.ctaSecondary}
            </button>
          </motion.div>

          {/* FLOATING CARDS SHOWCASE */}
          <div className="w-full max-w-[1180px] grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch relative mt-2">
            {/* Tarjeta 1: WhatsApp AI Bot Simulation */}
            <motion.div
              style={{ y: yCard1 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-7 shadow-[0_12px_36px_-8px_rgba(16,24,40,0.08)] border border-[#b9cbbc]/25 text-left transform md:-rotate-1 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between"
            >
              <div>
                {/* WhatsApp header bar */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#edeef3]">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full bg-[#edeef3] flex items-center justify-center text-[#006d3f]">
                      <Bot size={20} strokeWidth={1.5} />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#26ff9d] rounded-full ring-2 ring-white" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-[#191c1f] leading-tight">
                        {content.hero.card1.botName}
                      </p>
                      <p className="font-label text-xs text-[#006d3f] flex items-center gap-1.5 font-medium mt-0.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#26ff9d] animate-pulse" />
                        {content.hero.card1.onlineStatus}
                      </p>
                    </div>
                  </div>
                  <MoreVertical size={18} strokeWidth={1.5} className="text-[#6b7b6e]" />
                </div>

                {/* Chat bubble user */}
                <div className="flex flex-col items-end mb-3">
                  <div className="bg-[#f2f3f8] rounded-2xl rounded-tr-xs px-4 py-2.5 max-w-[85%] text-left">
                    <p className="font-body text-sm text-[#191c1f]">
                      {content.hero.card1.userMessage}
                    </p>
                    <span className="font-label text-[10px] text-[#535d55] text-right block mt-1">
                      {content.hero.card1.userTime}
                    </span>
                  </div>
                </div>

                {/* Chat bubble AI */}
                <div className="flex flex-col items-start mb-4">
                  <div className="bg-[#e7fbf2] border border-[#26ff9d]/30 rounded-2xl rounded-tl-xs px-4 py-2.5 max-w-[95%] text-left shadow-2xs">
                    <div className="flex items-center gap-1.5 text-[#006d3f] font-label text-xs font-semibold mb-1">
                      <Sparkles size={13} strokeWidth={1.5} />
                      <span>{content.hero.card1.engineTag}</span>
                    </div>
                    <p className="font-body text-sm text-[#191c1f] leading-snug">
                      {content.hero.card1.botResponsePrefix}
                      <strong>{content.hero.card1.botResponseHighlight}</strong>
                      {content.hero.card1.botResponseSuffix}
                    </p>
                    <span className="font-label text-[10px] text-[#535d55] block mt-1">
                      {content.hero.card1.botMeta}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badge tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f2f3f8] text-[#191c1f] font-label text-xs font-medium border border-[#b9cbbc]/20 self-start">
                <span className="w-2 h-2 rounded-full bg-[#26ff9d]" />
                {content.hero.card1.badgeTag}
              </div>
            </motion.div>

            {/* Tarjeta 2: Performance Telemetry Metric */}
            <motion.div
              style={{ y: yCard2 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
              className="md:col-span-3 bg-white rounded-3xl p-6 sm:p-7 shadow-[0_12px_36px_-8px_rgba(16,24,40,0.08)] border border-[#b9cbbc]/25 text-left flex flex-col justify-between transform md:translate-y-4 hover:translate-y-2 transition-transform duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label text-xs uppercase tracking-wider text-[#535d55] font-semibold">
                    {content.hero.card2.label}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#26ff9d]/25 text-[#191c1f] font-display text-xs font-semibold">
                    {content.hero.card2.status}
                  </span>
                </div>
                <p className="font-display text-4xl sm:text-5xl text-[#191c1f] font-bold tracking-tight">
                  {content.hero.card2.metric}
                </p>
                <p className="font-body text-sm text-[#535d55] mt-2 leading-snug">
                  {content.hero.card2.caption}
                </p>
              </div>

              <div className="pt-6">
                {/* Inline Mini Bar Visualization */}
                <div className="flex items-end gap-1.5 h-16 pt-2 mb-3">
                  <div className="flex-1 bg-[#edeef3] rounded-t-sm h-[40%]" />
                  <div className="flex-1 bg-[#edeef3] rounded-t-sm h-[65%]" />
                  <div className="flex-1 bg-[#edeef3] rounded-t-sm h-[50%]" />
                  <div className="flex-1 bg-[#edeef3] rounded-t-sm h-[80%]" />
                  <div className="flex-1 bg-[#006d3f] rounded-t-sm h-[95%]" />
                  <div className="flex-1 bg-[#26ff9d] rounded-t-sm h-[100%] shadow-[0_0_12px_#26ff9d]" />
                </div>
                <div className="flex justify-between items-center text-[#191c1f] font-display text-[11px]">
                  <span className="text-[#535d55]">{content.hero.card2.stat1}</span>
                  <span className="text-[#006d3f] font-semibold">{content.hero.card2.stat2}</span>
                </div>
              </div>
            </motion.div>

            {/* Tarjeta 3: Document Intelligence Card */}
            <motion.div
              style={{ y: yCard3 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
              className="md:col-span-4 bg-white rounded-3xl p-6 sm:p-7 shadow-[0_12px_36px_-8px_rgba(16,24,40,0.08)] border border-[#b9cbbc]/25 text-left transform md:rotate-1 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={20} strokeWidth={1.5} className="text-[#006971]" />
                  <span className="font-display text-xs font-semibold text-[#191c1f] truncate">
                    {content.hero.card3.fileName}
                  </span>
                </div>

                <div className="bg-[#f2f3f8] rounded-2xl p-4 mb-4 border border-[#b9cbbc]/20">
                  <span className="font-label text-[11px] uppercase tracking-wider text-[#535d55] block mb-1 font-semibold">
                    {content.hero.card3.citationLabel}
                  </span>
                  <p className="font-body text-sm text-[#191c1f] italic leading-relaxed">
                    {content.hero.card3.quote}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#83f3ff]/30 text-[#002023] font-label text-xs font-semibold">
                  <CheckCircle2 size={13} strokeWidth={1.5} className="text-[#006971]" />
                  {content.hero.card3.verifiedTag}
                </span>
                <span className="font-label text-xs text-[#535d55] font-medium">
                  {content.hero.card3.safetyTag}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTOR RECOGNITION STRIP */}
      <section className="w-full bg-white border-y border-[#edeef3] py-8 sm:py-10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 text-center">
          <p className="font-label text-xs uppercase tracking-widest text-[#535d55] mb-5 font-semibold">
            {content.sectors.title}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            {content.sectors.items.map((sector) => (
              <span
                key={sector}
                className="px-4 py-2 rounded-full bg-[#edeef3]/80 text-[#191c1f] font-body text-sm font-medium hover:bg-[#e7e8ed] transition-colors border border-[#b9cbbc]/20"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
