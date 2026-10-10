import {
  Utensils,
  Store,
  Hotel,
  Stethoscope,
  Scale,
  Building2,
  HardHat,
  GraduationCap,
  Briefcase,
  Workflow,
  type LucideIcon,
  CheckCircle2,
} from "lucide-react";
import type { Dictionary } from "@/content";
import type { NicheIcon } from "@/content/es";
import { Reveal, RevealItem } from "./Reveal";

const iconMap: Record<NicheIcon, { icon: LucideIcon; colorClass: string; bgClass: string }> = {
  utensils: { icon: Utensils, colorClass: "text-mint-400", bgClass: "group-hover:bg-mint-400/15 group-hover:border-mint-400/40" },
  store: { icon: Store, colorClass: "text-cyan-400", bgClass: "group-hover:bg-cyan-400/15 group-hover:border-cyan-400/40" },
  hotel: { icon: Hotel, colorClass: "text-amber-400", bgClass: "group-hover:bg-amber-400/15 group-hover:border-amber-400/40" },
  stethoscope: { icon: Stethoscope, colorClass: "text-mint-400", bgClass: "group-hover:bg-mint-400/15 group-hover:border-mint-400/40" },
  scale: { icon: Scale, colorClass: "text-cyan-400", bgClass: "group-hover:bg-cyan-400/15 group-hover:border-cyan-400/40" },
  building: { icon: Building2, colorClass: "text-amber-400", bgClass: "group-hover:bg-amber-400/15 group-hover:border-amber-400/40" },
  hardHat: { icon: HardHat, colorClass: "text-mint-400", bgClass: "group-hover:bg-mint-400/15 group-hover:border-mint-400/40" },
  graduationCap: { icon: GraduationCap, colorClass: "text-cyan-400", bgClass: "group-hover:bg-cyan-400/15 group-hover:border-cyan-400/40" },
  briefcase: { icon: Briefcase, colorClass: "text-amber-400", bgClass: "group-hover:bg-amber-400/15 group-hover:border-amber-400/40" },
  workflow: { icon: Workflow, colorClass: "text-mint-400", bgClass: "group-hover:bg-mint-400/15 group-hover:border-mint-400/40" },
};

export function Niches({ t }: { t: Dictionary }) {
  const n = t.niches;
  return (
    <section id="para-quien" className="section relative border-t border-white/10 bg-ink-900/40">
      <div className="container-iq relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{n.eyebrow}</p>
          <h2 className="heading-lg mt-4 text-balance">{n.title}</h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:mt-16">
          {n.items.map((item, i) => {
            const itemStyle = iconMap[item.icon];
            const Icon = itemStyle.icon;
            return (
              <RevealItem
                key={item.sector}
                delay={(i % 5) * 0.06}
                className="card group flex flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-ink-800 transition-all duration-300 ${itemStyle.bgClass}`}>
                    <Icon className={`h-6 w-6 ${itemStyle.colorClass}`} aria-hidden />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-fg group-hover:text-mint-300 transition-colors">
                    {item.sector}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {item.pain}
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs font-semibold text-mint-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Solución lista</span>
                </div>
              </RevealItem>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
