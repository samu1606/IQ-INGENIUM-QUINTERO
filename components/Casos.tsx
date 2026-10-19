"use client";

import React from "react";
import { motion } from "framer-motion";
import { content } from "@/content";
import { whatsappLink } from "@/lib/site";
import {
  ArrowUpRight,
  BarChart3,
  BookOpenCheck,
  CreditCard,
  ExternalLink,
  FileText,
  ScanLine,
} from "lucide-react";

/**
 * Casos.
 *
 * Hoy hay UN caso, y es propio: elInge Smart Grids, en producción en
 * elingesmartgrids.cloud. La sección está construida para que TODA cifra que
 * publique sea comprobable por quien la lea:
 *
 *  · 438 pruebas → se corren con un comando (heredado del repo del producto).
 *  · 22 cálculos  → son las rutas POST de backend/app/routers/calculos.py.
 *  · 24 literales → ITEMS_DISENO_DETALLADO del Art. 3.3.1.1 (Res. 40284/2026).
 *  · La respuesta del motor es una petición REAL a la API de producción,
 *    copiada tal cual (45 kW · 208 V · 40 m → 2/0 AWG).
 *
 * Por eso la sección se llama «trabajo que se puede comprobar» y enseña la
 * petición: un prospecto que no nos conoce no tiene por qué creernos, y este
 * es el único argumento que no depende de que nos crea. Si un dato deja de
 * ser cierto, se quita de `content/es.ts` — no se maquilla.
 */

const highlightIcons = [BookOpenCheck, FileText, ScanLine, CreditCard];

export const Casos: React.FC = () => {
  const { casos } = content;
  const { evidence } = casos;

  return (
    <section id="casos" className="w-full py-20 sm:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#edeef3] text-[#006d3f] font-label text-xs uppercase tracking-wider mb-3 font-semibold border border-[#b9cbbc]/25">
            {casos.badge}
          </span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-[#191c1f] font-bold tracking-tight">
            <strong>{casos.titleStrong}</strong>
            {casos.titleSuffix}
          </h2>
          <p className="font-body text-base sm:text-lg text-[#3b4a3f] mt-3 max-w-2xl mx-auto leading-relaxed">
            {casos.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* El caso */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 bg-[#f8f9fe] rounded-3xl p-7 sm:p-9 border border-[#b9cbbc]/25 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#26ff9d] text-[#191c1f] font-label text-xs font-semibold mb-5">
                <span className="w-2 h-2 rounded-full bg-[#191c1f]" />
                {casos.caseTag}
              </span>

              <h3 className="font-display text-2xl sm:text-3xl text-[#191c1f] font-bold tracking-tight mb-2">
                {casos.caseTitle}
              </h3>
              <p className="font-label text-sm sm:text-base text-[#006d3f] font-semibold mb-5">
                {casos.caseSubtitle}
              </p>
              <p className="font-body text-sm sm:text-base text-[#3b4a3f] leading-relaxed mb-8">
                {casos.description}
              </p>

              {/* Qué tiene por dentro */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {casos.highlights.map((item, indice) => {
                  const Icon = highlightIcons[indice] ?? BookOpenCheck;
                  return (
                    <div
                      key={item.title}
                      className="bg-white rounded-2xl p-4 border border-[#edeef3]"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon size={17} strokeWidth={1.6} className="text-[#006d3f] shrink-0" />
                        <h4 className="font-display text-sm text-[#191c1f] font-bold leading-snug">
                          {item.title}
                        </h4>
                      </div>
                      <p className="font-body text-xs text-[#535d55] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enlaces: el producto en vivo y la conversación */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8">
              <a
                href={casos.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#006d3f] text-white font-label text-sm font-bold hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,109,63,0.45)] active:translate-y-0 transition-all"
              >
                {casos.siteLabel}
                <ExternalLink size={16} strokeWidth={2} />
              </a>
              <a
                href={whatsappLink(casos.ctaMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white text-[#191c1f] font-label text-sm font-bold border border-[#b9cbbc]/40 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(16,24,40,0.18)] active:translate-y-0 transition-all"
              >
                {casos.ctaLabel}
                <ArrowUpRight size={16} strokeWidth={2} className="text-[#006d3f]" />
              </a>
            </div>
          </motion.div>

          {/* Las cifras, cada una con su fuente */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="lg:col-span-5 bg-[#0f2a20] rounded-3xl p-7 sm:p-9 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 mb-7">
              <BarChart3 size={18} strokeWidth={1.6} className="text-[#26ff9d]" />
              <span className="font-label text-xs uppercase tracking-wider font-bold text-[#26ff9d]">
                Lo que se puede medir
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-7">
              {casos.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl sm:text-4xl text-white font-bold tracking-tight leading-none mb-1.5">
                    {stat.value}
                  </p>
                  <p className="font-label text-xs sm:text-sm text-[#c8d6ce] font-semibold leading-snug">
                    {stat.label}
                  </p>
                  {/* La fuente no es decorativa: es lo que hace la cifra
                      verificable en vez de publicitaria. */}
                  <p className="font-mono text-[10px] sm:text-[11px] text-[#8fa79b] mt-1 break-words">
                    {stat.source}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-body text-xs text-[#8fa79b] leading-relaxed mt-7 pt-5 border-t border-white/10">
              {evidence.verifiedOn}
            </p>
          </motion.div>
        </div>

        {/* La comprobación: la petición real y la respuesta del motor */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-5 sm:mt-6 rounded-3xl bg-[#0f2a20] p-7 sm:p-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#26ff9d] text-[#191c1f] font-label text-xs uppercase tracking-wider font-bold mb-4">
                {evidence.badge}
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-white font-bold tracking-tight">
                {evidence.title}
              </h3>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#c8d6ce] leading-relaxed max-w-md">
              {evidence.note}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {/* Petición */}
            <div>
              <p className="font-label text-xs uppercase tracking-wider font-bold text-[#8fa79b] mb-2.5">
                {evidence.requestLabel}
              </p>
              <pre className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-5 font-mono text-[11px] sm:text-xs text-[#c8d6ce] leading-relaxed overflow-x-auto whitespace-pre-wrap break-words">
                {evidence.request}
              </pre>
            </div>

            {/* Respuesta */}
            <div>
              <p className="font-label text-xs uppercase tracking-wider font-bold text-[#8fa79b] mb-2.5">
                {evidence.responseLabel}
              </p>
              <dl className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-5">
                {evidence.response.map((linea) => (
                  <div
                    key={linea.key}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-1.5 border-b border-white/[0.07] last:border-0"
                  >
                    <dt className="font-mono text-[11px] sm:text-xs text-[#8fa79b]">
                      {linea.key}:
                    </dt>
                    <dd className="font-mono text-[11px] sm:text-xs text-white">
                      {linea.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Las pruebas */}
          <div className="mt-5 sm:mt-6">
            <p className="font-label text-xs uppercase tracking-wider font-bold text-[#8fa79b] mb-2.5">
              {evidence.testLabel}
            </p>
            <pre className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-5 font-mono text-[11px] sm:text-xs text-[#26ff9d] leading-relaxed overflow-x-auto whitespace-pre-wrap break-words">
              {evidence.test}
            </pre>
          </div>
        </motion.div>

        {/* La línea honesta: por qué solo hay un caso */}
        <p className="font-body text-xs sm:text-sm text-[#3b4a3f] leading-relaxed text-center max-w-3xl mx-auto mt-8">
          {casos.honesty}
        </p>
      </div>
    </section>
  );
};
