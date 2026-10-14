import React, { useState } from "react";
import { content } from "../content/es.ts";
import { whatsappLink } from "../lib/site.ts";
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

  const handleSubmit = (e: React.FormEvent) => {
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

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(link, "_blank", "noopener,noreferrer");
      if (onSuccess) {
        onSuccess();
      }
    }, 400);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#b9cbbc]/25 text-left">
      <div className="mb-6">
        <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#191c1f] mb-2 tracking-tight">
          {content.leadForm.heading}
        </h3>
        <p className="font-['Inter'] text-xs sm:text-sm text-[#3b4a3f] leading-relaxed">
          {content.leadForm.subheading}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 p-3.5 rounded-2xl bg-[#ffdad6]/50 border border-[#ba1a1a]/20 flex items-center gap-2.5 text-xs text-[#93000a] font-['Inter'] font-medium"
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
            className="block font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-wider text-[#191c1f] font-semibold mb-1.5"
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
            className="block font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-wider text-[#191c1f] font-semibold mb-1.5"
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
            className="block font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-wider text-[#191c1f] font-semibold mb-1.5"
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 h-13 px-6 rounded-full bg-[#26ff9d] text-[#191c1f] font-['Plus_Jakarta_Sans'] text-sm font-bold shadow-[0_4px_20px_-2px_rgba(38,255,157,0.45)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-2px_rgba(38,255,157,0.6)] active:translate-y-0 disabled:opacity-60 transition-all cursor-pointer mt-2"
        >
          <span>{isSubmitting ? content.leadForm.submitting : content.leadForm.submitButton}</span>
          <Send size={16} strokeWidth={1.5} />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-center text-[#535d55] font-['Plus_Jakarta_Sans'] text-[11px] mt-1">
          <Shield size={13} strokeWidth={1.5} className="text-[#006d3f] shrink-0" />
          <span>{content.leadForm.privacyNote}</span>
        </div>
      </form>
    </div>
  );
};
