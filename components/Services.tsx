import Image from "next/image";
import { Bot, FileSearch, Workflow, Globe, Check, ArrowUpRight, Sparkles, Shield, Cpu } from "lucide-react";
import type { Dictionary } from "@/content";
import type { ServiceId } from "@/content/es";
import { whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./icons";

const icons: Record<ServiceId, typeof Bot> = {
  bot: Bot,
  docs: FileSearch,
  automation: Workflow,
  web: Globe,
};

const serviceStyles: Record<
  ServiceId,
  {
    badgeClass: string;
    borderHoverClass: string;
    iconBgClass: string;
    iconColorClass: string;
    glowBgClass: string;
    btnClass: string;
  }
> = {
  bot: {
    badgeClass: "border-mint-400/30 bg-mint-400/10 text-mint-300",
    borderHoverClass: "hover:border-mint-400/50 hover:shadow-[0_0_40px_-10px_rgba(38,255,157,0.3)]",
    iconBgClass: "bg-mint-400/15 border-mint-400/30",
    iconColorClass: "text-mint-400",
    glowBgClass: "bg-mint-400/10",
    btnClass: "btn-primary",
  },
  docs: {
    badgeClass: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
    borderHoverClass: "hover:border-cyan-400/50 hover:shadow-[0_0_40px_-10px_rgba(0,240,255,0.3)]",
    iconBgClass: "bg-cyan-400/15 border-cyan-400/30",
    iconColorClass: "text-cyan-400",
    glowBgClass: "bg-cyan-400/10",
    btnClass: "btn-ghost border-cyan-400/40 hover:bg-cyan-400/15 text-cyan-300 hover:text-white",
  },
  automation: {
    badgeClass: "border-mint-400/30 bg-mint-400/10 text-mint-300",
    borderHoverClass: "hover:border-mint-400/50 hover:shadow-[0_0_40px_-10px_rgba(38,255,157,0.3)]",
    iconBgClass: "bg-mint-400/15 border-mint-400/30",
    iconColorClass: "text-mint-400",
    glowBgClass: "bg-mint-400/10",
    btnClass: "btn-ghost border-mint-400/40 hover:bg-mint-400/15 text-mint-300 hover:text-white",
  },
  web: {
    badgeClass: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    borderHoverClass: "hover:border-amber-400/50 hover:shadow-[0_0_40px_-10px_rgba(255,184,51,0.3)]",
    iconBgClass: "bg-amber-400/15 border-amber-400/30",
    iconColorClass: "text-amber-400",
    glowBgClass: "bg-amber-400/10",
    btnClass: "btn-primary !from-amber-300 !to-amber-400 !bg-amber-400 !text-ink-950 hover:!bg-amber-300",
  },
};

export function Services({ t }: { t: Dictionary }) {
  const s = t.services;
  return (
    <section id="servicios" className="section relative overflow-hidden">
      {/* Fondo de resplandor ambiental */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-0 h-[45rem] w-[30rem] -translate-x-1/2 rounded-full bg-mint-400/10 blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-0 h-[45rem] w-[30rem] translate-x-1/2 rounded-full bg-cyan-400/10 blur-[150px]"
      />

      <div className="container-iq relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{s.eyebrow}</p>
          <h2 className="heading-lg mt-4 text-balance">{s.title}</h2>
          <p className="mt-5 text-lg text-fg-muted leading-relaxed">{s.subtitle}</p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-10 md:mt-20 md:gap-14">
          {s.items.map((item, i) => {
            const Icon = icons[item.id];
            const style = serviceStyles[item.id];
            const reversed = i % 2 === 1;

            return (
              <Reveal key={item.id} y={35}>
                <article
                  aria-labelledby={`servicio-${item.id}`}
                  className={`card group relative grid overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/80 transition-all duration-500 lg:grid-cols-12 ${style.borderHoverClass}`}
                >
                  {/* Columna de Imagen */}
                  <div
                    className={`relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[32rem] ${
                      reversed ? "lg:order-2 lg:col-span-6" : "lg:col-span-6"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 42rem, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className={`absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent lg:bg-gradient-to-r ${
                        reversed ? "lg:from-transparent lg:to-ink-950/80" : "lg:from-ink-950/80 lg:to-transparent"
                      }`}
                    />
                    
                    {/* Badge con número de servicio */}
                    <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-ink-950/80 font-display text-sm font-bold text-fg backdrop-blur-md">
                      0{i + 1}
                    </div>
                  </div>

                  {/* Columna de Contenido */}
                  <div className={`flex flex-col p-7 sm:p-10 lg:p-12 lg:col-span-6 ${reversed ? "lg:order-1" : ""}`}>
                    <div>
                      <span
                        className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-xs font-semibold backdrop-blur-md ${style.badgeClass}`}
                      >
                        <span className={`flex h-6 w-6 items-center justify-center rounded-lg border ${style.iconBgClass}`}>
                          <Icon className={`h-3.5 w-3.5 ${style.iconColorClass}`} aria-hidden />
                        </span>
                        {item.tag}
                      </span>

                      <h3
                        id={`servicio-${item.id}`}
                        className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl text-fg"
                      >
                        {item.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-6">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-fg-subtle">
                        {s.includesLabel}
                      </p>
                      <ul className="mt-4 grid gap-3.5 sm:grid-cols-2">
                        {item.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-3 text-[0.95rem] text-fg font-medium">
                            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${style.iconBgClass}`}>
                              <Check className={`h-3.5 w-3.5 ${style.iconColorClass}`} aria-hidden />
                            </span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-10 pt-2">
                      <a
                        href={whatsappLink(item.whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn ${style.btnClass} w-full sm:w-auto shadow-lg`}
                      >
                        <WhatsAppIcon className="h-5 w-5" />
                        <span>{item.cta}</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
