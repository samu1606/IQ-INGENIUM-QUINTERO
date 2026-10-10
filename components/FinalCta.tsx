import { Clock, ShieldCheck, Sparkles } from "lucide-react";
import type { Dictionary } from "@/content";
import { whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";
import { LeadForm } from "./LeadForm";
import { WhatsAppIcon } from "./icons";

export function FinalCta({ t }: { t: Dictionary }) {
  const f = t.finalCta;
  return (
    <section id="contacto" className="section relative overflow-hidden">
      {/* Luz ambiental vibrante */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[45rem] w-[65rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-400/15 blur-[160px] animate-glow-pulse"
      />
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-70" />

      <div className="container-iq relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal y={24}>
          <span className="inline-flex items-center gap-2 rounded-full border border-mint-400/30 bg-mint-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-mint-300">
            <Sparkles className="h-3.5 w-3.5 text-mint-400" />
            {f.eyebrow}
          </span>

          <h2 className="heading-lg mt-5 text-balance text-fg md:!text-[3.5rem] lg:!text-[3.85rem]">
            {f.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-fg-muted leading-relaxed">{f.subtitle}</p>

          <div className="mt-10 flex flex-col items-start gap-4">
            <a
              href={whatsappLink(f.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full !min-h-16 !px-9 text-lg font-bold sm:w-auto shadow-glow"
            >
              <WhatsAppIcon className="h-6 w-6" />
              <span>{f.button}</span>
            </a>
            
            <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-fg-muted">
              <Clock className="h-4 w-4 text-mint-400" aria-hidden />
              <span>{f.note}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} y={30}>
          <LeadForm t={f.form} />
        </Reveal>
      </div>
    </section>
  );
}
