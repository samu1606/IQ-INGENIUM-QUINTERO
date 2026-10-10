import { Check, X, Sparkles } from "lucide-react";
import type { Dictionary } from "@/content";
import { Reveal } from "./Reveal";

type Cell = { ok: boolean; text: string };

function Mark({ cell, highlight = false }: { cell: Cell; highlight?: boolean }) {
  return (
    <span className="flex items-start gap-2.5">
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          cell.ok
            ? "bg-mint-400/20 text-mint-400 border border-mint-400/30"
            : "bg-white/5 text-fg-subtle border border-white/10"
        }`}
      >
        {cell.ok ? <Check className="h-3.5 w-3.5" aria-hidden /> : <X className="h-3.5 w-3.5" aria-hidden />}
      </span>
      <span className={highlight ? "font-semibold text-fg" : "text-fg-muted"}>
        <span className="sr-only">{cell.ok ? "Sí: " : "No: "}</span>
        {cell.text}
      </span>
    </span>
  );
}

export function Comparison({ t }: { t: Dictionary }) {
  const c = t.comparison;
  return (
    <section id="por-que" className="section relative border-t border-white/10 bg-ink-900/40">
      <div className="container-iq relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="heading-lg mt-4 text-balance">{c.title}</h2>
        </Reveal>

        {/* Tabla en Escritorio / Tablet */}
        <Reveal className="mt-12 hidden md:block md:mt-16" y={30}>
          <div className="card overflow-hidden rounded-[2rem] border border-white/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
            <table className="w-full border-collapse text-left text-[0.95rem]">
              <caption className="sr-only">{c.title}</caption>
              <thead>
                <tr className="border-b border-white/10 bg-ink-850">
                  <th scope="col" className="p-6 text-xs font-bold uppercase tracking-[0.16em] text-fg-subtle">
                    {c.columns.feature}
                  </th>
                  <th scope="col" className="relative bg-mint-400/10 p-6 font-display text-lg font-bold text-mint-300">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-mint-300 to-mint-400" />
                    <span className="inline-flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-mint-400" />
                      {c.columns.us}
                    </span>
                  </th>
                  <th scope="col" className="p-6 font-display text-base font-semibold text-fg-muted">
                    {c.columns.agency}
                  </th>
                  <th scope="col" className="p-6 font-display text-base font-semibold text-fg-muted">
                    {c.columns.diy}
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02]">
                    <th scope="row" className="p-6 font-display font-bold text-fg">
                      {row.feature}
                    </th>
                    <td className="bg-mint-400/[0.06] p-6">
                      <Mark cell={row.us} highlight />
                    </td>
                    <td className="p-6">
                      <Mark cell={row.agency} />
                    </td>
                    <td className="p-6">
                      <Mark cell={row.diy} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Tarjetas en Móvil */}
        <ul className="mt-10 flex flex-col gap-4 md:hidden">
          {c.rows.map((row) => (
            <li key={row.feature} className="card p-6 rounded-2xl">
              <h3 className="font-display text-lg font-bold text-fg">{row.feature}</h3>
              <dl className="mt-4 space-y-3.5 text-sm">
                <div className="rounded-xl border border-mint-400/30 bg-mint-400/10 p-4 shadow-[0_0_20px_-5px_rgba(38,255,157,0.2)]">
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-mint-300 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-mint-400" />
                    {c.columns.us}
                  </dt>
                  <dd className="mt-2">
                    <Mark cell={row.us} highlight />
                  </dd>
                </div>
                <div className="px-2">
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-fg-subtle">{c.columns.agency}</dt>
                  <dd className="mt-1.5">
                    <Mark cell={row.agency} />
                  </dd>
                </div>
                <div className="px-2">
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-fg-subtle">{c.columns.diy}</dt>
                  <dd className="mt-1.5">
                    <Mark cell={row.diy} />
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
