"use client";

import { useState, type FormEvent } from "react";
import { Send, Sparkles, CheckCircle2 } from "lucide-react";
import type { Dictionary } from "@/content";
import { whatsappLink } from "@/lib/site";

/** Captura de leads: arma el mensaje con nombre + número y abre WhatsApp. */
export function LeadForm({ t }: { t: Dictionary["finalCta"]["form"] }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cleanName = name.trim();
    const digits = phone.replace(/[^\d]/g, "");
    const next: typeof errors = {};
    if (cleanName.length < 2) next.name = t.errorName;
    if (digits.length < 8 || digits.length > 15) next.phone = t.errorPhone;
    setErrors(next);
    if (Object.keys(next).length) return;

    const message = t.messageTemplate
      .replace("{name}", cleanName)
      .replace("{phone}", phone.trim());
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  const inputBase =
    "mt-2 block w-full rounded-xl border bg-ink-950/80 px-4 py-3.5 text-base text-fg placeholder:text-fg-subtle transition-all duration-200 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400/20";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="card relative overflow-hidden rounded-[2rem] border border-white/15 bg-ink-900/90 p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      aria-labelledby="form-leads-titulo"
    >
      <div className="flex items-center gap-2 text-mint-400 font-semibold text-xs uppercase tracking-wider">
        <Sparkles className="h-4 w-4" />
        <span>Atención rápida</span>
      </div>

      <h3 id="form-leads-titulo" className="mt-2 font-display text-2xl font-bold text-fg">
        {t.title}
      </h3>

      <div className="mt-6">
        <label htmlFor="lead-name" className="text-sm font-semibold text-fg-muted">
          {t.nameLabel}
        </label>
        <input
          id="lead-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "lead-name-error" : undefined}
          className={`${inputBase} ${errors.name ? "border-amber-400" : "border-white/10"}`}
        />
        {errors.name && (
          <p id="lead-name-error" role="alert" className="mt-2 text-sm font-medium text-amber-400">
            {errors.name}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="lead-phone" className="text-sm font-semibold text-fg-muted">
          {t.phoneLabel}
        </label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t.phonePlaceholder}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "lead-phone-error" : "lead-note"}
          className={`${inputBase} ${errors.phone ? "border-amber-400" : "border-white/10"}`}
        />
        {errors.phone && (
          <p id="lead-phone-error" role="alert" className="mt-2 text-sm font-medium text-amber-400">
            {errors.phone}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-primary mt-8 w-full text-base font-bold shadow-glow">
        <Send className="h-4 w-4" aria-hidden />
        <span>{t.submit}</span>
      </button>

      <p id="lead-note" className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-fg-subtle">
        <CheckCircle2 className="h-3.5 w-3.5 text-mint-400 shrink-0" />
        <span>{t.note}</span>
      </p>
    </form>
  );
}
