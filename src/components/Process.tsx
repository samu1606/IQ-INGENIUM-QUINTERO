import React from "react";
import { motion } from "framer-motion";
import { content } from "../content/es.ts";

export const Process: React.FC = () => {
  return (
    <section className="w-full py-20 sm:py-28 bg-[#f8f9fe]" id="como-trabajamos">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#edeef3] text-[#006d3f] font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-wider mb-3 font-semibold border border-[#b9cbbc]/25">
            {content.process.badge}
          </span>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl md:text-5xl text-[#191c1f] font-bold tracking-tight">
            {content.process.titlePrefix}
            <strong>{content.process.titleStrong}</strong>
          </h2>
          <p className="font-['Inter'] text-base sm:text-lg text-[#3b4a3f] mt-3 leading-relaxed">
            {content.process.subtitle}
          </p>
        </motion.div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 relative">
          {content.process.steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow border border-[#b9cbbc]/25 flex flex-col justify-between"
            >
              <div>
                <span className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#006d3f] block mb-4">
                  {step.number}
                </span>
                <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-[#191c1f] mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="font-['Inter'] text-xs sm:text-sm text-[#3b4a3f] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#b9cbbc]/20 text-[#535d55] font-['Space_Grotesk'] text-xs font-medium">
                {step.phase}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
