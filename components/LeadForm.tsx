"use client";

import React, { useState } from "react";
import { content } from "@/content";
import { whatsappLink } from "@/lib/site";
import { EVENTOS, track } from "@/lib/analytics";
import { Send, CheckCircle2, Shield, AlertCircle } from "lucide-react";

interface LeadFormProps {
  onSuccess?: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Campo trampa: invisible para una persona, irresistible para un bot. Si
  // llega lleno, el servidor responde «ok» y no guarda nada.
  const [trampa, setTrampa] = useState("");

  /**
   * El orden importa: PRIMERO se guarda el lead en /api/lead, DESPUÉS se abre
   * WhatsApp.
   *
   * Antes solo se abría WhatsApp, así que si el visitante no llegaba a pulsar
   * «enviar» en la app —o el navegador le bloqueaba la ventana emergente—, ese
   * caso no quedaba en ninguna parte. Y estaba el `setTimeout` de 400 ms que
   * empeoraba justo eso: cuanto más se tarde en abrir, más fácil es que el
   * navegador lo considere una ventana emergente no pedida.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !business.trim() || !details.trim()) {
      setError(content.leadForm.errorValidation);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const message = `Hola Ingenium Quintero, me gustaría solicitar un diagnóstico gratuito:

• Nombre: ${name.trim()}
• Negocio / Sector: ${business.trim()}
• Qué quiero automatizar: ${details.trim()}`;

    const link = whatsappLink(message);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nombre: name.trim(),
          negocio: business.trim(),
          detalle: details.trim(),
          origen: "formulario",
          trampa,
        }),
        // Si el servidor se demora, el visitante no se queda mirando la pantalla.
        signal: AbortSignal.timeout(4000),
      });
    } catch {
      // Que no se guarde no puede impedir que el cliente siga: WhatsApp abre igual.
    }

    track(EVENTOS.formulario, { detalleLargo: details.trim().length });

    // Abrir WhatsApp. Ojo con el detalle que cuesta una tarde: `window.open`
    // con «noopener» entre las features devuelve SIEMPRE null (lo dice la
    // especificación), así que con eso puesto no se puede distinguir «lo
    // bloqueó» de «abrió bien». Se abre sin features y se corta el `opener` a
    // mano —mismo efecto de seguridad— para que el null signifique de verdad
    // que el navegador lo bloqueó; ahí se navega en la misma pestaña, que es
    // imposible de bloquear y en móvil abre la app.
    const ventana = window.open(link, "_blank");
    if (ventana) {
      ventana.opener = null;
    } else {
      window.location.href = link;
    }

    setIsSubmitting(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#b9cbbc]/25 text-left">
      <div className="mb-6">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#191c1f] mb-2 tracking-tight">
          {content.leadForm.heading}
        </h3>
        <p className="font-body text-xs sm:text-sm text-[#3b4a3f] leading-relaxed">
          {content.leadForm.subheading}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 p-3.5 rounded-2xl bg-[#ffdad6]/50 border border-[#ba1a1a]/20 flex items-center gap-2.5 text-xs text-[#93000a] font-body font-medium"
        >
          <AlertCircle size={16} strokeWidth={1.5} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Nombre */}
        <div>
          <label
            htmlFor="lead-name"
            className="block font-label text-xs uppercase tracking-wider text-[#191c1f] font-semibold mb-1.5"
          >
            {content.leadForm.nameLabel} <span className="text-[#006d3f]">*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={content.leadForm.namePlaceholder}
            className="w-full px-4 py-3 rounded-xl bg-[#f8f9fe] border border-[#b9cbbc]/30 text-sm text-[#191c1f] placeholder:text-[#535d55]/60 focus:outline-none focus:ring-2 focus:ring-[#006d3f] focus:border-transparent transition-all"
          />
        </div>

        {/* Negocio */}
        <div>
          <label
            htmlFor="lead-business"
            className="block font-label text-xs uppercase tracking-wider text-[#191c1f] font-semibold mb-1.5"
          >
            {content.leadForm.businessLabel} <span className="text-[#006d3f]">*</span>
          </label>
          <input
            id="lead-business"
            type="text"
            required
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder={content.leadForm.businessPlaceholder}
            className="w-full px-4 py-3 rounded-xl bg-[#f8f9fe] border border-[#b9cbbc]/30 text-sm text-[#191c1f] placeholder:text-[#535d55]/60 focus:outline-none focus:ring-2 focus:ring-[#006d3f] focus:border-transparent transition-all"
          />
        </div>

        {/* Detalles */}
        <div>
          <label
            htmlFor="lead-details"
            className="block font-label text-xs uppercase tracking-wider text-[#191c1f] font-semibold mb-1.5"
          >
            {content.leadForm.detailsLabel} <span className="text-[#006d3f]">*</span>
          </label>
          <textarea
            id="lead-details"
            required
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={content.leadForm.detailsPlaceholder}
            className="w-full px-4 py-3 rounded-xl bg-[#f8f9fe] border border-[#b9cbbc]/30 text-sm text-[#191c1f] placeholder:text-[#535d55]/60 focus:outline-none focus:ring-2 focus:ring-[#006d3f] focus:border-transparent transition-all resize-y"
          />
        </div>

        {/* Trampa para bots: fuera del flujo visual y del orden de tabulación. */}
        <input
          type="text"
          name="trampa"
          value={trampa}
          onChange={(e) => setTrampa(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 h-13 px-6 rounded-full bg-[#26ff9d] text-[#191c1f] font-label text-sm font-bold shadow-[0_4px_20px_-2px_rgba(38,255,157,0.45)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-2px_rgba(38,255,157,0.6)] active:translate-y-0 disabled:opacity-60 transition-all cursor-pointer mt-2"
        >
          <span>{isSubmitting ? content.leadForm.submitting : content.leadForm.submitButton}</span>
          <Send size={16} strokeWidth={1.5} />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-center text-[#535d55] font-label text-[11px] mt-1">
          <Shield size={13} strokeWidth={1.5} className="text-[#006d3f] shrink-0" />
          <span>{content.leadForm.privacyNote}</span>
        </div>
      </form>
    </div>
  );
};
