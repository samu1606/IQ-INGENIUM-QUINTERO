"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, CalendarCheck, Check, Sparkles, Zap, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/content";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero({ t }: { t: Dictionary }) {
  const h = t.hero;

  return (
    <section id="inicio" className="noise relative overflow-hidden pt-28 md:pt-36 pb-20 md:pb-32">
      {/* Fondo técnico con cuadrícula y esferas de luz vibrantes */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-80" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-[38rem] w-[50rem] -translate-x-1/2 rounded-full bg-mint-400/15 blur-[140px] animate-glow-pulse"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 right-10 h-[30rem] w-[35rem] rounded-full bg-cyan-400/10 blur-[130px] animate-glow-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-[24rem] w-[40rem] rounded-full bg-amber-400/10 blur-[120px]"
      />

      <div className="container-iq relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        {/* Columna Izquierda: Copys y CTAs */}
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-mint-400/30 bg-mint-400/10 px-4 py-2 text-xs font-semibold text-mint-300 shadow-[0_0_20px_-3px_rgba(38,255,157,0.3)] backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-mint-400" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint-400" />
            </span>
            <Sparkles className="h-3.5 w-3.5 text-mint-400" aria-hidden />
            <span>{h.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="heading-xl mt-6 text-balance text-fg"
          >
            {h.titleStart}{" "}
            <span className="relative inline-block text-gradient-mint">
              {h.titleAccent}
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                className="absolute -bottom-2 left-0 h-3 w-full text-mint-400/70"
                preserveAspectRatio="none"
              >
                <path d="M2 9 C 50 2, 150 2, 198 8" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted md:text-xl"
          >
            {h.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center w-full sm:w-auto"
          >
            <a
              href={whatsappLink(t.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-base w-full sm:w-auto shadow-glow"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {h.whatsappCta}
            </a>
            <a href="#servicios" className="btn btn-ghost text-base w-full sm:w-auto">
              {h.primaryCta}
              <ArrowDown className="h-4 w-4 text-mint-400" aria-hidden />
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-fg-muted"
          >
            {h.proof.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-1.5 border border-white/5">
                <Check className="h-4 w-4 text-mint-400" aria-hidden />
                <span className="font-medium text-fg">{p}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Columna Derecha: Imagen del Hero e widgets flotantes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative mt-4 lg:mt-0"
        >
          {/* Resplandor trasero de la tarjeta principal */}
          <div aria-hidden className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-mint-400/30 via-cyan-400/20 to-amber-400/30 blur-2xl opacity-60" />

          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/15 bg-ink-900 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] lg:aspect-[5/4]">
            <Image
              src="/hero.jpg"
              alt={h.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent opacity-80" />

            {/* Insignia superior en la imagen */}
            <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full border border-white/20 bg-ink-950/80 px-3.5 py-1.5 text-xs font-semibold text-fg backdrop-blur-md">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>Respuesta Inmediata</span>
            </div>
          </div>

          {/* Tarjeta flotante 1: Notificación inferior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
            className="absolute -bottom-6 left-3 sm:-left-6 flex items-center gap-3.5 rounded-2xl border border-mint-400/30 bg-ink-900/95 p-4 pr-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-float"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint-400/20 text-mint-400 border border-mint-400/30">
              <CalendarCheck className="h-5.5 w-5.5" aria-hidden />
            </span>
            <div>
              <span className="block text-sm font-bold text-fg">{h.floatingCard.title}</span>
              <span className="block text-xs font-medium text-mint-400">{h.floatingCard.subtitle}</span>
            </div>
          </motion.div>

          {/* Tarjeta flotante 2: Garantía de privacidad */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease }}
            className="hidden sm:flex absolute -top-5 -left-6 items-center gap-3 rounded-xl border border-cyan-400/30 bg-ink-900/90 px-4 py-2.5 shadow-lg backdrop-blur-md animate-float-slow"
          >
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
            <span className="text-xs font-semibold text-fg">100% Datos Privados</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
