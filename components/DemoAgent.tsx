"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/content";
import { whatsappLink } from "@/lib/site";
import { EVENTOS, track } from "@/lib/analytics";
import { ArrowRight, Info, Loader2, Send, ShieldCheck, Sparkles } from "lucide-react";

/**
 * La demo en vivo.
 *
 * Hasta hoy la página *contaba* cómo funciona el agente con una maqueta. Esto
 * es el agente respondiendo de verdad: mismo producto, mismo prompt, en el
 * navegador del visitante. Es la única prueba fuerte que puede mostrar una
 * agencia sin clientes todavía.
 *
 * Si el servidor no tiene modelo conectado, se dice y se manda a WhatsApp: un
 * cuadro de chat que no contesta es peor que no tener demo.
 */

type Burbuja = { rol: "visitante" | "agente" | "aviso"; texto: string };

export const DemoAgent: React.FC = () => {
  const { demo } = content;
  const [burbujas, setBurbujas] = useState<Burbuja[]>([{ rol: "agente", texto: demo.intro }]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [sinModelo, setSinModelo] = useState(false);
  const cajaRef = useRef<HTMLDivElement | null>(null);

  // El mensaje nuevo tiene que quedar a la vista dentro del cuadro de chat.
  useEffect(() => {
    const caja = cajaRef.current;
    if (caja) caja.scrollTop = caja.scrollHeight;
  }, [burbujas, enviando]);

  const enviar = async (mensajeCrudo: string) => {
    const mensaje = mensajeCrudo.trim();
    if (!mensaje || enviando || sinModelo) return;

    const conMiMensaje: Burbuja[] = [...burbujas, { rol: "visitante", texto: mensaje }];
    setBurbujas(conMiMensaje);
    setTexto("");
    setEnviando(true);
    track(EVENTOS.demo, { largo: mensaje.length });

    // Lo que se manda al modelo es solo la conversación, sin los avisos.
    const historial = conMiMensaje
      .filter((b) => b.rol !== "aviso")
      .map((b) => ({ role: b.rol === "visitante" ? "user" : "assistant", content: b.texto }));

    try {
      const respuesta = await fetch("/api/demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mensajes: historial }),
      });
      const datos = (await respuesta.json()) as {
        ok?: boolean;
        configurado?: boolean;
        respuesta?: string;
      };

      if (datos.configurado === false) {
        setSinModelo(true);
        setBurbujas((previas) => [...previas, { rol: "aviso", texto: demo.notConfigured }]);
        return;
      }

      if (!respuesta.ok || !datos.respuesta) {
        setBurbujas((previas) => [
          ...previas,
          { rol: "aviso", texto: respuesta.status === 429 ? demo.limitMsg : demo.errorMsg },
        ]);
        return;
      }

      setBurbujas((previas) => [...previas, { rol: "agente", texto: datos.respuesta as string }]);
    } catch {
      setBurbujas((previas) => [...previas, { rol: "aviso", texto: demo.errorMsg }]);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="demo" className="w-full py-20 sm:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Explicación y guardarraíles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#edeef3] text-[#006d3f] font-label text-xs uppercase tracking-wider mb-3 font-semibold border border-[#b9cbbc]/25">
              {demo.badge}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-[#191c1f] font-bold tracking-tight mb-3">
              <strong>{demo.titleStrong}</strong>
              {demo.titleSuffix}
            </h2>
            <p className="font-body text-base sm:text-lg text-[#3b4a3f] leading-relaxed mb-6">
              {demo.subtitle}
            </p>

            <div className="flex flex-wrap gap-2 mb-7">
              {demo.suggestions.map((sugerencia) => (
                <button
                  key={sugerencia}
                  type="button"
                  onClick={() => enviar(sugerencia)}
                  disabled={enviando || sinModelo}
                  className="px-4 py-2 rounded-full bg-[#f8f9fe] border border-[#b9cbbc]/40 font-body text-xs sm:text-sm text-[#191c1f] hover:border-[#006d3f] hover:bg-white transition-colors disabled:opacity-50"
                >
                  {sugerencia}
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-[#f8f9fe] border border-[#b9cbbc]/25 p-5 mb-6 flex gap-3">
              <ShieldCheck size={18} strokeWidth={1.5} className="text-[#006d3f] shrink-0 mt-0.5" />
              <p className="font-body text-xs sm:text-sm text-[#3b4a3f] leading-relaxed">{demo.guardrails}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={whatsappLink(
                  "Hola Ingenium Quintero, probé el agente de la página y quiero uno así en el WhatsApp de mi negocio."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 h-13 px-7 py-3.5 rounded-full bg-[#26ff9d] text-[#191c1f] font-label text-sm font-bold shadow-[0_4px_20px_-2px_rgba(38,255,157,0.45)] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>{demo.ctaLabel}</span>
                <ArrowRight size={18} strokeWidth={2} />
              </a>
              <p className="flex items-start gap-2 font-body text-[11px] text-[#535d55] leading-relaxed max-w-xs">
                <Info size={13} strokeWidth={1.5} className="shrink-0 mt-0.5" />
                {demo.privacy}
              </p>
            </div>
          </motion.div>

          {/* El chat */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="bg-[#f8f9fe] rounded-3xl border border-[#b9cbbc]/30 shadow-xl p-5 sm:p-6"
          >
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#b9cbbc]/25">
              <div className="w-10 h-10 rounded-2xl bg-[#006d3f] flex items-center justify-center text-[#26ff9d]">
                <Sparkles size={18} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-semibold text-sm text-[#191c1f]">Agente IQ</span>
                <span className="flex items-center gap-1.5 font-label text-[11px] text-[#006d3f]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#26ff9d]" />
                  {sinModelo ? "Demo sin modelo conectado" : "Demo pública en vivo"}
                </span>
              </div>
            </div>

            <div
              ref={cajaRef}
              aria-live="polite"
              className="flex flex-col gap-3 h-[320px] sm:h-[360px] overflow-y-auto pr-1"
            >
              {burbujas.map((burbuja, indice) => (
                <div
                  key={`${indice}-${burbuja.rol}`}
                  className={`flex ${burbuja.rol === "visitante" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`font-body text-sm leading-relaxed px-4 py-3 max-w-[85%] whitespace-pre-wrap ${
                      burbuja.rol === "visitante"
                        ? "bg-[#006d3f] text-white rounded-2xl rounded-br-sm"
                        : burbuja.rol === "aviso"
                          ? "bg-[#ffdad6]/60 text-[#93000a] rounded-2xl border border-[#ba1a1a]/20"
                          : "bg-white text-[#191c1f] rounded-2xl rounded-bl-sm border border-[#b9cbbc]/30"
                    }`}
                  >
                    {burbuja.texto}
                  </p>
                </div>
              ))}

              {enviando && (
                <div className="flex justify-start">
                  <span className="inline-flex items-center gap-2 bg-white text-[#535d55] rounded-2xl rounded-bl-sm border border-[#b9cbbc]/30 px-4 py-3 font-body text-sm">
                    <Loader2 size={14} strokeWidth={2} className="animate-spin" />
                    {demo.thinking}
                  </span>
                </div>
              )}
            </div>

            <form
              className="flex items-center gap-2 mt-4"
              onSubmit={(evento) => {
                evento.preventDefault();
                enviar(texto);
              }}
            >
              <label htmlFor="demo-mensaje" className="sr-only">
                {demo.placeholder}
              </label>
              <input
                id="demo-mensaje"
                type="text"
                value={texto}
                onChange={(evento) => setTexto(evento.target.value)}
                placeholder={demo.placeholder}
                maxLength={600}
                disabled={enviando || sinModelo}
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-[#b9cbbc]/40 text-sm text-[#191c1f] placeholder:text-[#535d55]/60 focus:outline-none focus:ring-2 focus:ring-[#006d3f] focus:border-transparent disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={enviando || sinModelo || texto.trim().length === 0}
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-[#26ff9d] text-[#191c1f] font-label text-sm font-bold hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer"
              >
                <Send size={16} strokeWidth={1.5} />
                <span className="hidden sm:inline">{demo.sendLabel}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
