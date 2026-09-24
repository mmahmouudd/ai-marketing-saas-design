import type { ComponentType, SVGProps } from "react";
import { cn } from "../utils/cn";
import { useReveal, useSpotlight } from "../hooks/useReveal";
import { Bolt, Brain, Flow, Layers, Shield, Target } from "./Icons";

type Feature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
  tone: keyof typeof TONE;
  span?: string;
  visual?: "waves" | "nodes" | "bars" | "shield" | null;
};

const TONE = {
  brand: { fg: "text-brand-300", bg: "bg-brand-500/12", ring: "ring-brand-400/25", hex: "#8f74ff" },
  aqua: { fg: "text-aqua", bg: "bg-aqua/12", ring: "ring-aqua/25", hex: "#22d3ee" },
  mint: { fg: "text-mint", bg: "bg-mint/12", ring: "ring-mint/25", hex: "#34d399" },
  amber: { fg: "text-amber-soft", bg: "bg-amber-soft/12", ring: "ring-amber-soft/25", hex: "#fbbf24" },
  rose: { fg: "text-rose-soft", bg: "bg-rose-soft/12", ring: "ring-rose-soft/25", hex: "#fb7185" },
} as const;

const FEATURES: Feature[] = [
  {
    icon: Brain,
    title: "Agentic campaign brain",
    body: "Six specialised agents — Segmenter, Copywriter, Optimizer, Guardrail, Analyst and Scheduler — collaborate on a shared memory graph of every account you own.",
    tone: "brand",
    span: "lg:col-span-2 lg:row-span-2",
    visual: "nodes",
  },
  {
    icon: Target,
    title: "Predictive ICP scoring",
    body: "Rank every account on 140+ intent, firmographic and product-usage signals refreshed hourly.",
    tone: "aqua",
    visual: "bars",
  },
  {
    icon: Bolt,
    title: "Self-optimising spend",
    body: "Budget shifts across channels every 15 minutes based on marginal ROAS — not last-click.",
    tone: "mint",
    visual: "waves",
  },
  {
    icon: Flow,
    title: "Journeys that write themselves",
    body: "Describe an outcome in plain English; Nucleus assembles the branches, copy, timing and holdout groups — then keeps tuning them.",
    tone: "amber",
    span: "lg:col-span-2",
    visual: null,
  },
  {
    icon: Layers,
    title: "Warehouse-native",
    body: "Reverse-ETL into Snowflake, BigQuery or Databricks. Your data never leaves your perimeter.",
    tone: "rose",
    visual: null,
  },
  {
    icon: Shield,
    title: "Brand & compliance guardrails",
    body: "Tone-of-voice models, frequency caps, region-aware consent and a full audit trail on every agent action.",
    tone: "brand",
    visual: "shield",
  },
];

/* --------------------------- micro visuals --------------------------- */

function Nodes({ hex }: { hex: string }) {
  const nodes = [
    { x: 18, y: 52 }, { x: 62, y: 22 }, { x: 62, y: 82 },
    { x: 112, y: 38 }, { x: 112, y: 70 }, { x: 158, y: 52 },
  ];
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [1, 4]];
  return (
    <svg viewBox="0 0 176 104" className="h-full w-full" aria-hidden focusable="false">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke={hex} strokeOpacity="0.38" strokeWidth="1.2"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          className="animate-draw"
          style={{ animationDelay: `${i * 90}ms` }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i} className="animate-rise" style={{ animationDelay: `${300 + i * 80}ms` }}>
          <circle cx={n.x} cy={n.y} r="9" fill={hex} opacity="0.12">
            <animate
              attributeName="r"
              values="8;11;8"
              dur="3.2s"
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={n.x} cy={n.y} r="3.4" fill={hex} />
        </g>
      ))}
    </svg>
  );
}

function Bars({ hex }: { hex: string }) {
  const vals = [38, 62, 46, 84, 58, 96, 72];
  return (
    <div className="flex h-full items-end gap-1.5" aria-hidden>
      {vals.map((v, i) => (
        <span
          key={i}
          className="animate-grow flex-1 rounded-t-[3px] origin-bottom"
          style={{
            height: `${v}%`,
            background: `linear-gradient(180deg, ${hex}, ${hex}22)`,
            animationDelay: `${i * 70}ms`,
          }}
        />
      ))}
    </div>
  );
}

function Waves({ hex }: { hex: string }) {
  return (
    <svg viewBox="0 0 176 72" className="h-full w-full" aria-hidden focusable="false">
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M0 ${44 + i * 6} C 30 ${20 + i * 8}, 58 ${60 - i * 4}, 88 ${36 + i * 3} S 146 ${12 + i * 10}, 176 ${30 + i * 5}`}
          fill="none"
          stroke={hex}
          strokeOpacity={0.7 - i * 0.22}
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          className="animate-draw"
          style={{ animationDelay: `${i * 200}ms` }}
        />
      ))}
    </svg>
  );
}

function ShieldViz({ hex }: { hex: string }) {
  return (
    <div className="flex h-full flex-col justify-end gap-1.5" aria-hidden>
      {["Tone-of-voice check", "Frequency cap", "Consent region: EU"].map((t, i) => (
        <div
          key={t}
          className="flex items-center gap-2 rounded-md border border-white/8 bg-white/[0.03] px-2 py-1.5 text-[10.5px] text-slate-400"
          style={{ animationDelay: `${i * 120}ms` }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: hex }} />
          {t}
          <span className="ml-auto text-[9px] tracking-wide" style={{ color: hex }}>PASS</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------- card ------------------------------- */

function Card({ f, index }: { f: Feature; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);
  const spot = useSpotlight<HTMLDivElement>();
  const t = TONE[f.tone];
  const big = Boolean(f.span?.includes("row-span-2"));

  return (
    <article
      ref={ref}
      className={cn("reveal", visible && "is-visible", f.span)}
      style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
    >
      <div
        ref={spot}
        className="edge-glow spotlight group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.045] to-white/[0.012] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/14 hover:shadow-[0_30px_70px_-32px_rgba(124,92,255,0.7)] sm:p-7"
      >
        <div className="relative z-[2] flex h-full flex-col">
          <span
            className={cn(
              "inline-grid h-11 w-11 place-items-center rounded-xl ring-1 transition-transform duration-500 ring-inset group-hover:scale-110 group-hover:-rotate-6",
              t.bg,
              t.ring,
            )}
          >
            <f.icon className={cn("h-5 w-5", t.fg)} />
          </span>

          <h3
            className={cn(
              "mt-5 font-semibold tracking-tight text-white",
              big ? "text-xl sm:text-2xl" : "text-[17px]",
            )}
          >
            {f.title}
          </h3>
          <p className={cn("mt-2.5 leading-relaxed text-slate-400", big ? "text-[15px]" : "text-[13.5px]")}>
            {f.body}
          </p>

          {f.visual && (
            <div className={cn("mt-6", big ? "h-32 sm:h-44" : "h-[72px]")}>
              {f.visual === "nodes" && <Nodes hex={t.hex} />}
              {f.visual === "bars" && <Bars hex={t.hex} />}
              {f.visual === "waves" && <Waves hex={t.hex} />}
              {f.visual === "shield" && <ShieldViz hex={t.hex} />}
            </div>
          )}

          {big && (
            <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-white/8 pt-5">
              {[
                ["6", "agents"], ["140+", "signals"], ["15m", "loop"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="num block text-lg font-semibold text-white">{v}</span>
                    <span className="text-[11px] text-slate-500">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Features() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);

  return (
    <section id="features" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute top-1/4 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-brand-700/14 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div ref={ref} className={cn("reveal max-w-2xl", visible && "is-visible")}>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-brand-200 uppercase">
            Capabilities
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-[2.75rem] sm:leading-[1.08]">
            An operating system for{" "}
            <span className="text-gradient">revenue marketing</span>
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-slate-400">
            Everything your growth team wires together with six tools and a spreadsheet — replaced by one
            closed loop that learns from every send, click and closed-won deal.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Card key={f.title} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
