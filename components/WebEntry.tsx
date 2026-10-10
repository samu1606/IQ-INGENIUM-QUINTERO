import { Globe, ArrowUpRight, Code, Layout, Sparkles } from "lucide-react";
import type { Dictionary } from "@/content";
import { whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";

export function WebEntry({ t }: { t: Dictionary }) {
  const w = t.web;
  return (
    <section aria-labelledby="web-titulo" className="pb-20 md:pb-28">
      <div className="container-iq">
        <Reveal y={24}>
          <div className="relative overflow-hidden rounded-[2rem] border border-amber-400/30 bg-gradient-to-r from-ink-900 via-ink-850 to-ink-900 p-7 sm:p-10 shadow-[0_0_50px_-15px_rgba(255,184,51,0.2)]">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-mint-400/10 blur-3xl"
            />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-400/15 text-amber-400 shadow-[0_0_20px_-3px_rgba(255,184,51,0.4)]">
                  <Globe className="h-7 w-7" aria-hidden />
                </span>
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
                    <Sparkles className="h-3 w-3 text-amber-400" />
                    {w.eyebrow}
                  </div>
                  <h2 id="web-titulo" className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl text-fg">
                    {w.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-fg-muted">{w.description}</p>
                  
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {w.points.map((p) => (
                      <span key={p} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-fg">
                        <Layout className="h-3.5 w-3.5 text-amber-400" />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 pt-2 lg:pt-0">
                <a
                  href={whatsappLink(w.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost !border-amber-400/40 hover:!bg-amber-400/15 hover:!text-amber-300 w-full sm:w-auto text-amber-300"
                >
                  <span>{w.cta}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
