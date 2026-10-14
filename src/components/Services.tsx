import React from "react";
import { motion } from "framer-motion";
import { content } from "../content/es.ts";
import {
  MessageSquare,
  Zap,
  Filter,
  Calendar,
  FileSearch,
  ShieldCheck,
  Repeat,
  MonitorSmartphone,
  ArrowUpRight,
} from "lucide-react";

export const Services: React.FC = () => {
  return (
    <section className="w-full py-20 sm:py-28 bg-[#f8f9fe]" id="servicios">
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
            {content.services.badge}
          </span>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl md:text-5xl text-[#191c1f] font-bold tracking-tight">
            <strong>{content.services.titleStrong}</strong>
            {content.services.titleSuffix}
          </h2>
          <p className="font-['Inter'] text-base sm:text-lg text-[#3b4a3f] mt-3 max-w-2xl mx-auto leading-relaxed">
            {content.services.subtitle}
          </p>
        </motion.div>

        {/* Bento Grid (1 Col Mobile, Asymmetric 12-Col Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Card 1: WhatsApp Bot Flagship (Spans 8 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-8 bg-white rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#b9cbbc]/25 flex flex-col justify-between group"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#006d3f]/10 flex items-center justify-center text-[#006d3f] group-hover:bg-[#26ff9d]/30 transition-colors">
                  <MessageSquare size={24} strokeWidth={1.5} />
                </div>
                <div className="flex items-center self-start sm:self-auto">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#26ff9d] text-[#191c1f] font-['Plus_Jakarta_Sans'] text-xs font-semibold shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#191c1f]" />
                    {content.services.card1.tag}
                  </span>
                </div>
              </div>

              <div className="mb-7">
                <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl md:text-3xl text-[#191c1f] font-bold mb-3 tracking-tight">
                  {content.services.card1.title}
                </h3>
                <p className="font-['Inter'] text-sm sm:text-base text-[#3b4a3f] leading-relaxed max-w-2xl">
                  {content.services.card1.description}
                </p>
              </div>
            </div>

            {/* Mini Pipeline UI inside the card */}
            <div className="bg-[#f2f3f8] rounded-2xl p-4 sm:p-5 border border-[#b9cbbc]/20 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                {content.services.card1.pipeline.map((step, idx) => (
                  <div key={step.title} className="bg-white p-3.5 rounded-xl shadow-xs border border-[#edeef3]">
                    <div className="flex items-center gap-2 text-[#006d3f] font-['Plus_Jakarta_Sans'] text-xs font-semibold mb-1">
                      {idx === 0 && <Zap size={15} strokeWidth={1.5} className="text-[#006d3f]" />}
                      {idx === 1 && <Filter size={15} strokeWidth={1.5} className="text-[#006971]" />}
                      {idx === 2 && <Calendar size={15} strokeWidth={1.5} className="text-[#191c1f]" />}
                      <span>{step.title}</span>
                    </div>
                    <p className="font-['Inter'] text-xs text-[#535d55] leading-snug">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Pregúntale a tus documentos (Spans 4 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-4 bg-white rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#b9cbbc]/25 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#006971]/10 flex items-center justify-center text-[#006971] mb-6">
                <FileSearch size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-[#191c1f] font-bold mb-3 tracking-tight">
                {content.services.card2.title}
              </h3>
              <p className="font-['Inter'] text-sm sm:text-base text-[#3b4a3f] leading-relaxed mb-6">
                {content.services.card2.description}
              </p>
            </div>

            <div className="bg-[#edeef3] rounded-2xl p-4 border border-[#b9cbbc]/20">
              <div className="flex items-center gap-2 text-[#191c1f] font-['Plus_Jakarta_Sans'] text-xs font-semibold mb-1">
                <ShieldCheck size={16} strokeWidth={1.5} className="text-[#006d3f]" />
                {content.services.card2.badgeTitle}
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#535d55]">
                {content.services.card2.badgeSubtitle}
              </p>
            </div>
          </motion.div>

          {/* Card 3: Que la máquina haga el trabajo repetitivo (Spans 6 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="md:col-span-6 bg-white rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#b9cbbc]/25 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#edeef3] flex items-center justify-center text-[#191c1f] mb-6">
                <Repeat size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-[#191c1f] font-bold mb-3 tracking-tight">
                {content.services.card3.title}
              </h3>
              <p className="font-['Inter'] text-sm sm:text-base text-[#3b4a3f] leading-relaxed mb-6">
                {content.services.card3.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {content.services.card3.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full bg-[#f2f3f8] text-[#191c1f] font-['Space_Grotesk'] text-xs font-medium border border-[#b9cbbc]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Páginas web y tiendas (Spans 6 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="md:col-span-6 bg-white rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#b9cbbc]/25 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#26ff9d]/30 flex items-center justify-center text-[#006d3f] mb-6">
                <MonitorSmartphone size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-[#191c1f] font-bold mb-3 tracking-tight">
                {content.services.card4.title}
              </h3>
              <p className="font-['Inter'] text-sm sm:text-base text-[#3b4a3f] leading-relaxed mb-6">
                {content.services.card4.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#edeef3] pt-4 mt-2">
              <span className="font-['Space_Grotesk'] text-xs text-[#535d55] font-medium">
                {content.services.card4.score}
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#006d3f] font-bold flex items-center gap-1">
                {content.services.card4.badge}
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
