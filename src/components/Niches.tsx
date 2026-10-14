import React from "react";
import { motion } from "framer-motion";
import { content } from "../content/es.ts";
import {
  HeartPulse,
  Scale,
  Building2,
  ShoppingBag,
  GraduationCap,
  Briefcase,
  UtensilsCrossed,
  Headphones,
} from "lucide-react";

export const Niches: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "medical":
        return <HeartPulse size={26} strokeWidth={1.5} className="text-[#006d3f]" />;
      case "legal":
        return <Scale size={26} strokeWidth={1.5} className="text-[#006d3f]" />;
      case "real_estate":
        return <Building2 size={26} strokeWidth={1.5} className="text-[#006d3f]" />;
      case "retail":
        return <ShoppingBag size={26} strokeWidth={1.5} className="text-[#006d3f]" />;
      case "education":
        return <GraduationCap size={26} strokeWidth={1.5} className="text-[#006d3f]" />;
      case "b2b":
        return <Briefcase size={26} strokeWidth={1.5} className="text-[#006d3f]" />;
      case "food":
        return <UtensilsCrossed size={26} strokeWidth={1.5} className="text-[#006d3f]" />;
      case "support":
      default:
        return <Headphones size={26} strokeWidth={1.5} className="text-[#006d3f]" />;
    }
  };

  return (
    <section className="w-full py-20 sm:py-28 bg-[#f2f3f8]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[#3b4a3f] font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-wider mb-3 font-semibold shadow-xs border border-[#b9cbbc]/20">
            {content.niches.badge}
          </span>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl md:text-5xl text-[#191c1f] tracking-tight">
            {content.niches.titlePrefix}
            <strong>{content.niches.titleStrong}</strong>
            {content.niches.titleSuffix}
          </h2>
        </motion.div>

        {/* Niches 8-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto text-left">
          {content.niches.items.map((niche, idx) => (
            <motion.div
              key={niche.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
              className="bg-white p-6 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-[#b9cbbc]/20 flex flex-col justify-between"
            >
              <div>
                <div className="mb-3">{getIcon(niche.iconType)}</div>
                <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#191c1f] mb-1.5 leading-snug">
                  {niche.title}
                </h3>
                <p className="font-['Inter'] text-xs sm:text-sm text-[#535d55] leading-relaxed">
                  {niche.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
