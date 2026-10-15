"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/content";
import { whatsappLink } from "@/lib/site";
import { MessageSquareText } from "lucide-react";

/**
 * El botón flotante de WhatsApp es un ANCLA real, no un botón con
 * `window.open`. Dos razones, y las dos importan:
 *  1. Los bloqueadores de ventanas emergentes matan `window.open` cuando no
 *     va pegado al gesto del usuario.
 *  2. Un `<a href="https://wa.me/...">` es rastreable y funciona aunque el
 *     JavaScript no haya cargado.
 */
export const WhatsAppFab: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="hidden sm:block px-3.5 py-1.5 rounded-full bg-[#191c1f] text-white text-xs font-label font-semibold shadow-lg whitespace-nowrap pointer-events-none"
          >
            {content.whatsappFab.tooltip}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappLink(content.whatsappFab.defaultMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={content.whatsappFab.ariaLabel}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="w-14 h-14 rounded-full bg-[#26ff9d] text-[#191c1f] flex items-center justify-center shadow-[0_6px_24px_-2px_rgba(38,255,157,0.55)] border-2 border-white cursor-pointer relative group focus:outline-none focus:ring-3 focus:ring-[#006d3f]"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#006d3f] rounded-full border-2 border-white flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-[#26ff9d] rounded-full animate-ping" />
        </span>
        <MessageSquareText size={26} strokeWidth={1.5} className="text-[#191c1f]" />
      </motion.a>
    </div>
  );
};
