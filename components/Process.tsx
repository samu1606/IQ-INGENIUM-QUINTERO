import { MessageCircle, FileSignature, Hammer, LifeBuoy } from "lucide-react";
import type { Dictionary } from "@/content";
import { Reveal, RevealItem } from "./Reveal";

const stepIcons = [MessageCircle, FileSignature, Hammer, LifeBuoy];
const stepGlows = [
  "border-mint-400/40 bg-mint-400/15 text-mint-400 shadow-[0_0_20px_-3px_rgba(38,255,157,0.3)]",
  "border-cyan-400/40 bg-cyan-400/15 text-cyan-400 shadow-[0_0_20px_-3px_rgba(0,240,255,0.3)]",
  "border-amber-400/40 bg-amber-400/15 text-amber-400 shadow-[0_0_20px_-3px_rgba(255,184,51,0.3)]",
  "border-mint-400/40 bg-mint-400/15 text-mint-400 shadow-[0_0_20px_-3px_rgba(38,255,157,0.3)]",
];

export function Process({ t }: { t: Dictionary }) {
  const p = t.process;
  return (
    <section id="como-trabajamos" className="section relative overflow-hidden">
      <div className="container-iq relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{p.eyebrow}</p>
          <h2 className="heading-lg mt-4 text-balance">{p.title}</h2>
        </Reveal>

        <div className="relative mt-14 md:mt-20">
          {/* Línea conectora animada en pantallas grandes */}
          <div
            aria-hidden
            className="absolute left-6 right-6 top-[2.5rem] hidden h-0.5 bg-gradient-to-r from-mint-400 via-cyan-400 to-amber-400 opacity-30 lg:block"
          />

          <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {p.steps.map((step, i) => {
              const Icon = stepIcons[i];
              const glowClass = stepGlows[i];

              return (
                <RevealItem key={step.title} delay={i * 0.1} y={24} className="relative">
                  <div className="card group h-full p-7 transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border ${glowClass}`}>
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <span className="font-display text-4xl font-bold tracking-tight text-white/10 group-hover:text-mint-400/30 transition-colors" aria-hidden>
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-bold text-fg group-hover:text-mint-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                      {step.description}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
