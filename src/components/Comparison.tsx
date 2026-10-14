import React from "react";
import { motion } from "framer-motion";
import { content } from "../content/es.ts";
import { CheckCircle2, XCircle } from "lucide-react";

export const Comparison: React.FC = () => {
  return (
    <section className="w-full py-20 sm:py-28 bg-[#f8f9fe]" id="por-que-nosotros">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#edeef3] text-[#006d3f] font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-wider mb-3 font-semibold border border-[#b9cbbc]/25">
            {content.comparison.badge}
          </span>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl md:text-5xl text-[#191c1f] font-bold tracking-tight">
            <strong>{content.comparison.titleStrong}</strong>
            {content.comparison.titleSuffix}
          </h2>
          <p className="font-['Inter'] text-base sm:text-lg text-[#3b4a3f] mt-3 leading-relaxed">
            {content.comparison.subtitle}
          </p>
        </motion.div>

        {/* Comparison Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          {/* Left Card: Con Ingenium Quintero (White, Mint highlights) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-3xl p-7 sm:p-9 shadow-lg border border-[#26ff9d]/40 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#26ff9d]/15 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#edeef3]">
                <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl text-[#191c1f] font-bold">
                  {content.comparison.us.title}
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#26ff9d] text-[#191c1f] font-['Plus_Jakarta_Sans'] text-xs font-semibold shadow-xs">
                  {content.comparison.us.tag}
                </span>
              </div>

              <ul className="flex flex-col gap-4">
                {content.comparison.us.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      strokeWidth={1.5}
                      className="text-[#006d3f] shrink-0 mt-0.5"
                    />
                    <span className="font-['Inter'] text-sm sm:text-base text-[#191c1f] font-medium leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#edeef3]">
              <span className="font-['Space_Grotesk'] text-xs text-[#006d3f] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#26ff9d] shadow-[0_0_8px_#26ff9d]" />
                {content.comparison.us.footer}
              </span>
            </div>
          </motion.div>

          {/* Right Card: Otras alternativas (Subtle Gray, Cross marks) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#edeef3]/70 rounded-3xl p-7 sm:p-9 border border-[#b9cbbc]/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#b9cbbc]/20">
                <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl text-[#535d55] font-semibold">
                  {content.comparison.others.title}
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#e7e8ed] text-[#535d55] font-['Plus_Jakarta_Sans'] text-xs font-medium">
                  {content.comparison.others.tag}
                </span>
              </div>

              <ul className="flex flex-col gap-4">
                {content.comparison.others.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <XCircle
                      size={20}
                      strokeWidth={1.5}
                      className="text-[#6b7b6e] shrink-0 mt-0.5"
                    />
                    <span className="font-['Inter'] text-sm sm:text-base text-[#535d55] leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#b9cbbc]/20">
              <span className="font-['Space_Grotesk'] text-xs text-[#535d55]">
                {content.comparison.others.footer}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
