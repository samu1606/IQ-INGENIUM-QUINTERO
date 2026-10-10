"use client";

import { motion, useReducedMotion } from "framer-motion";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/** Botón flotante de WhatsApp, siempre visible. */
export function WhatsAppFab({ label, message }: { label: string; message: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={reduce ? false : { opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-mint-400 p-4 text-ink-950 shadow-[0_12px_40px_-8px_rgba(61,255,168,0.6)] transition-colors hover:bg-mint-300 md:bottom-8 md:right-8 md:px-5 md:py-3.5"
    >
      <span aria-hidden className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-mint-400" />
      <WhatsAppIcon className="h-7 w-7 md:h-5 md:w-5" />
      <span className="hidden text-sm font-semibold md:inline">{label}</span>
    </motion.a>
  );
}
