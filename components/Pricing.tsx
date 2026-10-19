"use client";

import React from "react";
import { motion } from "framer-motion";
import { content } from "@/content";
import { whatsappLink } from "@/lib/site";
import { ArrowRight, Check, Gift } from "lucide-react";

/**
 * Cómo se cobra.
 *
 * Los tres renglones —instalación, mensualidad y consumo— y la oferta de
 * cupos, pero SIN cifras: Edwin pidió quitar los números de la página, así que
 * el precio viaja en la propuesta (y en la campaña, que sí lo publica). Aquí
 * queda lo que el prospecto necesita para no desconfiar: cómo se cobra, quién
 * paga el consumo y que el alcance va por escrito.
 */
export const Pricing: React.FC = () => {
  const { pricing } = content;
  const mensajeCupo =
    "Hola Ingenium Quintero, quiero uno de los 3 cupos de lanzamiento para automatizar el WhatsApp de mi negocio.";

  return (
    <section id="precios" className="w-full py-20 sm:py-28 bg-[#f8f9fe]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        {/* Encabezado de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#edeef3] text-[#006d3f] font-label text-xs uppercase tracking-wider mb-3 font-semibold border border-[#b9cbbc]/25">
            {pricing.badge}
          </span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-[#191c1f] font-bold tracking-tight">
            <strong>{pricing.titleStrong}</strong>
            {pricing.titleSuffix}
          </h2>
          <p className="font-body text-base sm:text-lg text-[#3b4a3f] mt-3 max-w-2xl mx-auto leading-relaxed">
            {pricing.subtitle}
          </p>
        </motion.div>

        {/* Los tres renglones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-6">
          {pricing.lines.map((linea, indice) => (
            <motion.div
              key={linea.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: indice * 0.08, ease: "easeOut" }}
              className="bg-white rounded-3xl p-7 sm:p-8 shadow-sm border border-[#b9cbbc]/25 flex flex-col"
            >
              <span className="self-start inline-block px-3 py-1 rounded-full bg-[#f2f3f8] text-[#3b4a3f] font-label text-[11px] uppercase tracking-wider font-semibold mb-5 border border-[#b9cbbc]/20">
                {linea.tag}
              </span>
              <h3 className="font-display text-lg text-[#3b4a3f] font-semibold mb-1">{linea.label}</h3>
              {/* Sin cifras a propósito: el número va en la propuesta. Por eso
                  ya no es un precio en tipografía grande sino el encabezado de
                  un renglón. */}
              <p className="font-display text-lg sm:text-xl text-[#191c1f] font-bold tracking-tight mb-4">
                {linea.headline}
              </p>
              <p className="font-body text-sm text-[#3b4a3f] leading-relaxed">{linea.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Oferta de lanzamiento */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl bg-[#0f2a20] p-8 sm:p-12 text-center flex flex-col items-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#26ff9d] text-[#191c1f] font-label text-xs uppercase tracking-wider font-bold mb-5">
            <Gift size={14} strokeWidth={2} />
            {pricing.offer.badge}
          </span>
          <h3 className="font-display text-2xl sm:text-4xl text-white font-bold tracking-tight mb-4 max-w-2xl">
            {pricing.offer.title}
          </h3>
          <p className="font-body text-sm sm:text-base text-[#c8d6ce] leading-relaxed max-w-xl mb-7">
            {pricing.offer.detail}
          </p>

          <a
            href={whatsappLink(mensajeCupo)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-14 px-9 rounded-full bg-[#26ff9d] text-[#191c1f] font-label text-base font-bold shadow-[0_6px_24px_-2px_rgba(38,255,157,0.45)] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_-2px_rgba(38,255,157,0.6)] active:translate-y-0 transition-all cursor-pointer"
          >
            <span>{pricing.cta}</span>
            <ArrowRight size={20} strokeWidth={2} />
          </a>

          <p className="font-label text-xs text-[#8fa79b] mt-4">{pricing.offer.footnote}</p>
        </motion.div>

        {/* Lo que sí se puede prometer: cómo se cobra */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {pricing.notes.map((nota) => (
            <li
              key={nota}
              className="flex items-start gap-2.5 font-body text-xs sm:text-sm text-[#3b4a3f] leading-relaxed"
            >
              <Check size={16} strokeWidth={2} className="text-[#006d3f] shrink-0 mt-0.5" />
              <span>{nota}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
