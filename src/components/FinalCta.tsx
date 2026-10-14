import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../content/es.ts";
import { whatsappLink } from "../lib/site.ts";
import { CalendarPlus, CheckCircle2, FileEdit, ChevronUp } from "lucide-react";
import { LeadForm } from "./LeadForm.tsx";

interface FinalCtaProps {
  showFormInitial?: boolean;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ showFormInitial = false }) => {
  const [showForm, setShowForm] = useState(showFormInitial);

  const handleDirectWhatsApp = () => {
    const link = whatsappLink(content.whatsappFab.defaultMessage);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full py-20 sm:py-28 bg-[#f8f9fe]" id="contacto">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        {/* Container with luminous sky gradient inspired by reference */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full rounded-3xl bg-gradient-to-b from-[#eaf4ff] via-white to-white p-8 sm:p-14 md:p-16 shadow-xl border border-[#b9cbbc]/25 overflow-hidden text-center flex flex-col items-center"
        >
          {/* Atmospheric luminous circle */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#26ff9d]/20 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-block px-4 py-1.5 rounded-full bg-white text-[#006d3f] font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-wider mb-4 font-semibold shadow-xs border border-[#b9cbbc]/20">
            {content.finalCta.badge}
          </span>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-6xl text-[#191c1f] font-bold tracking-tight max-w-3xl mb-4">
            {content.finalCta.title}
          </h2>

          <p className="font-['Inter'] text-base sm:text-lg md:text-xl text-[#3b4a3f] max-w-xl mx-auto mb-8 leading-relaxed">
            {content.finalCta.subtitle}
          </p>

          {/* Interactive Form or Direct Button Toggle */}
          <div className="w-full max-w-xl flex flex-col items-center gap-4">
            {!showForm ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-full bg-[#26ff9d] text-[#191c1f] font-['Plus_Jakarta_Sans'] text-base font-bold shadow-[0_6px_24px_-2px_rgba(38,255,157,0.45)] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_-2px_rgba(38,255,157,0.6)] active:translate-y-0 transition-all cursor-pointer"
                >
                  <span>{content.finalCta.buttonText}</span>
                  <CalendarPlus size={20} strokeWidth={1.5} />
                </button>

                <div className="flex items-center gap-2 text-[#535d55] font-['Plus_Jakarta_Sans'] text-xs">
                  <CheckCircle2 size={16} strokeWidth={1.5} className="text-[#006d3f]" />
                  <span>{content.finalCta.guarantee}</span>
                </div>

                {/* Form Toggle Trigger */}
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="mt-4 text-xs font-['Plus_Jakarta_Sans'] font-semibold text-[#006d3f] hover:text-[#191c1f] underline underline-offset-4 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileEdit size={14} strokeWidth={1.5} />
                  <span>{content.finalCta.openFormPrompt}</span>
                </button>
              </div>
            ) : (
              <div className="w-full">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LeadForm onSuccess={() => {}} />

                    <div className="text-center mt-4">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="text-xs font-['Plus_Jakarta_Sans'] font-medium text-[#535d55] hover:text-[#191c1f] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronUp size={14} strokeWidth={1.5} />
                        <span>{content.finalCta.closeFormPrompt}</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
