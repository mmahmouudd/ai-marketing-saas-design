import { useRef, useState } from "react";
import { cn } from "../utils/cn";
import { useReveal } from "../hooks/useReveal";
import { scalePoints, smoothPath, areaFrom } from "../lib/chart";
import { Bolt, Check, Flow, Mail, Megaphone, Target, Trend, Users } from "./Icons";

/* ----------------------------- Journey canvas ----------------------------- */

const CANVAS_W = 780;
const CANVAS_H = 340;
const NODE_W = 154;
const NODE_H = 66;

function JourneyCanvas() {
  const nodes = [
    { id: "trigger", x: 16, y: 137, label: "Trial started", sub: "Entry trigger", tone: "brand", icon: Bolt },
    { id: "score", x: 206, y: 137, label: "ICP score ≥ 78", sub: "Decision split", tone: "aqua", icon: Target },
    { id: "email", x: 400, y: 42, label: "Value email", sub: "4 AI variants", tone: "mint", icon: Mail },
    { id: "ads", x: 400, y: 232, label: "Retarget ads", sub: "LinkedIn + Meta", tone: "amber", icon: Megaphone },
    { id: "sdr", x: 594, y: 137, label: "Route to SDR", sub: "If 2+ opens", tone: "brand", icon: Users },
  ];
  const tone: Record<string, string> = {
    brand: "#8f74ff",
    aqua: "#22d3ee",
    mint: "#34d399",
    amber: "#fbbf24",
  };
  const edges: [string, string][] = [
    ["trigger", "score"],
    ["score", "email"],
    ["score", "ads"],
    ["email", "sdr"],
    ["ads", "sdr"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div
      className="relative overflow-x-auto overflow-y-hidden rounded-xl border border-white/8 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(124,92,255,0.10),transparent_60%)]"
      tabIndex={0}
      role="group"
      aria-label="Example customer journey: trial started, ICP score split into value email or retargeting ads, then routed to an SDR."
    >
      <div className="relative" style={{ width: CANVAS_W, height: CANVAS_H }}>
        <div className="dot-bg absolute inset-0 opacity-40" aria-hidden />

        <svg
          className="absolute inset-0"
          width={CANVAS_W}
          height={CANVAS_H}
          aria-hidden
          focusable="false"
        >
          <defs>
            <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          {edges.map(([a, b], i) => {
            const A = byId[a];
            const B = byId[b];
            const x1 = A.x + NODE_W;
            const y1 = A.y + NODE_H / 2;
            const x2 = B.x;
            const y2 = B.y + NODE_H / 2;
            const mid = (x2 - x1) * 0.55;
            return (
              <g key={i}>
                <path
                  d={`M ${x1} ${y1} C ${x1 + mid} ${y1}, ${x2 - mid} ${y2}, ${x2} ${y2}`}
                  fill="none"
                  stroke="url(#edgeGrad)"
                  strokeWidth="1.8"
                  strokeDasharray="6 6"
                  className="animate-dash"
                  style={{ animationDelay: `${i * 140}ms` }}
                />
                <circle r="2.8" fill="#22d3ee">
                  <animateMotion
                    dur="2.8s"
                    repeatCount="indefinite"
                    begin={`${i * 0.35}s`}
                    path={`M ${x1} ${y1} C ${x1 + mid} ${y1}, ${x2 - mid} ${y2}, ${x2} ${y2}`}
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {nodes.map((n, i) => (
          <div
            key={n.id}
            className="animate-rise absolute rounded-xl border border-white/10 bg-ink-2/95 p-2.5 shadow-xl backdrop-blur transition-transform duration-300 hover:-translate-y-1"
            style={{
              left: n.x,
              top: n.y,
              width: NODE_W,
              height: NODE_H,
              animationDelay: `${i * 110}ms`,
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-md"
                style={{ background: `${tone[n.tone]}22`, color: tone[n.tone] }}
              >
                <n.icon className="h-3.5 w-3.5" />
              </span>
              <p className="truncate text-[12px] font-medium text-white">{n.label}</p>
            </div>
            <p className="mt-1 truncate text-[10.5px] text-slate-500">{n.sub}</p>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full"
                style={{ width: `${60 + i * 8}%`, background: tone[n.tone] }}
              />
            </div>
          </div>
        ))}

        <div className="absolute right-3 bottom-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-mint" aria-hidden />
          <span className="num text-[10.5px] text-slate-300">18,402 in flight</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Audience builder ---------------------------- */

function AudienceBuilder() {
  const rules = [
    { field: "Account tier", op: "is", val: "Enterprise", match: "4,820" },
    { field: "Product usage (30d)", op: "declined by", val: "> 25%", match: "1,940" },
    { field: "Intent topic", op: "includes", val: "“data residency”", match: "812" },
    { field: "Last human touch", op: "older than", val: "60 days", match: "604" },
  ];
  return (
    <div className="grid h-full gap-4 lg:grid-cols-5">
      <div className="space-y-2.5 lg:col-span-3">
        {rules.map((r, i) => (
          <div
            key={r.field}
            className="animate-rise flex flex-wrap items-center gap-2 rounded-xl border border-white/8 bg-white/[0.028] px-3 py-2.5"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span className="num w-8 shrink-0 text-[10px] text-slate-500">
              {i === 0 ? "WHERE" : "AND"}
            </span>
            <span className="rounded-md bg-brand-500/12 px-2 py-1 text-[12px] font-medium text-brand-200 ring-1 ring-brand-400/20 ring-inset">
              {r.field}
            </span>
            <span className="text-[12px] text-slate-500">{r.op}</span>
            <span className="rounded-md border border-white/10 bg-black/25 px-2 py-1 text-[12px] text-slate-200">
              {r.val}
            </span>
            <span className="num ml-auto text-[11px] text-slate-500">{r.match} match</span>
          </div>
        ))}
        <button
          type="button"
          className="w-full rounded-xl border border-dashed border-white/12 px-3 py-2.5 text-[12.5px] text-slate-500 transition-colors hover:border-brand-400/40 hover:text-brand-200"
        >
          + Add condition or let an agent suggest one
        </button>
      </div>

      <div className="rounded-xl border border-white/8 bg-white/[0.028] p-4 lg:col-span-2">
        <p className="text-[11px] tracking-[0.14em] text-slate-500 uppercase">Live estimate</p>
        <p className="num mt-2 text-3xl font-semibold tracking-tight text-white">604</p>
        <p className="mt-1 text-[12px] text-slate-500">accounts · 2,318 contacts</p>

        <dl className="mt-5 space-y-3">
          {[
            ["Avg. ACV", "$84,200", 0.78],
            ["Predicted win rate", "31%", 0.31],
            ["Data completeness", "96%", 0.96],
          ].map(([l, v, w]) => (
            <div key={l as string}>
              <div className="flex justify-between text-[11.5px]">
                <dt className="text-slate-400">{l}</dt>
                <dd className="num font-medium text-white">{v}</dd>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 to-aqua"
                  style={{ width: `${(w as number) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-center gap-2 rounded-lg bg-mint/8 px-3 py-2 ring-1 ring-mint/20 ring-inset">
          <Check className="h-3.5 w-3.5 shrink-0 text-mint" />
          <p className="text-[11px] leading-snug text-mint">Consent verified for all EU contacts</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Attribution ------------------------------ */

function Attribution() {
  const cohorts = [
    { name: "Lifecycle email", vals: [10, 18, 26, 38, 52, 68, 84], color: "#7c5cff" },
    { name: "Paid social", vals: [8, 14, 19, 25, 31, 38, 44], color: "#22d3ee" },
    { name: "Organic + SEO", vals: [4, 9, 13, 18, 22, 27, 33], color: "#34d399" },
  ];
  const W = 520;
  const H = 200;

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="rounded-xl border border-white/8 bg-white/[0.028] p-4 lg:col-span-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-medium text-white">Incremental revenue by cohort</h3>
          <span className="num inline-flex items-center gap-1 rounded-md bg-mint/12 px-1.5 py-0.5 text-[10px] text-mint">
            <Trend className="h-3 w-3" /> +18.2% vs control
          </span>
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mt-3 h-44 w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Incremental revenue by cohort over seven weeks. Lifecycle email leads, followed by paid social and organic."
        >
          <defs>
            <linearGradient id="atGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="0"
              x2={W}
              y1={10 + i * 56}
              y2={10 + i * 56}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="3 6"
            />
          ))}
          {cohorts.map((c, ci) => {
            const pts = scalePoints(c.vals, W, H, 12, 14, 0, 95);
            const line = smoothPath(pts);
            return (
              <g key={c.name}>
                {ci === 0 && <path d={areaFrom(line, pts, H - 14)} fill="url(#atGrad)" />}
                <path
                  d={line}
                  fill="none"
                  stroke={c.color}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  className="animate-draw"
                  style={{ animationDelay: `${ci * 180}ms` }}
                />
              </g>
            );
          })}
        </svg>
        <ul className="mt-2 flex flex-wrap gap-4">
          {cohorts.map((c) => (
            <li key={c.name} className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
              <span className="h-[3px] w-4 rounded-full" style={{ background: c.color }} />
              {c.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3 lg:col-span-2">
        {[
          { l: "Multi-touch", v: "$2.41M", d: "+24%", w: 0.86 },
          { l: "Geo holdout lift", v: "$612K", d: "+11%", w: 0.52 },
          { l: "Self-reported", v: "$389K", d: "+6%", w: 0.34 },
        ].map((m, i) => (
          <div
            key={m.l}
            className="animate-rise rounded-xl border border-white/8 bg-white/[0.028] p-4"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-baseline justify-between">
              <p className="text-[12.5px] text-slate-400">{m.l}</p>
              <p className="num text-[11px] text-mint">{m.d}</p>
            </div>
            <p className="num mt-1 text-xl font-semibold text-white">{m.v}</p>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-aqua"
                style={{ width: `${m.w * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- Shell --------------------------------- */

const TABS = [
  { id: "journey", label: "Journey canvas", icon: Flow, blurb: "Branching flows your agents build, test and prune automatically." },
  { id: "audience", label: "Audience builder", icon: Users, blurb: "Warehouse-backed segments that stay fresh to the minute." },
  { id: "attribution", label: "Attribution", icon: Trend, blurb: "Incrementality you can defend in a board meeting." },
] as const;

export default function Platform() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("journey");
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const next =
      e.key === "Home" ? 0
      : e.key === "End" ? TABS.length - 1
      : (i + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    btns.current[next]?.focus();
  };

  const activeTab = TABS.find((t) => t.id === tab)!;

  return (
    <section id="platform" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div ref={ref} className={cn("reveal", visible && "is-visible")}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-mint uppercase">
                The platform
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-[2.6rem] sm:leading-[1.1]">
                Built for operators who <span className="text-gradient">live in the tool</span>
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-slate-400">
              {activeTab.blurb}
            </p>
          </div>

          <div className="glass mt-10 overflow-hidden rounded-2xl p-3 sm:p-4">
            <div
              role="tablist"
              aria-label="Platform surfaces"
              className="flex flex-wrap gap-1.5 rounded-xl border border-white/8 bg-black/25 p-1.5"
            >
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  ref={(el) => {
                    btns.current[i] = el;
                  }}
                  id={`tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={tab === t.id}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={tab === t.id ? 0 : -1}
                  onKeyDown={(e) => onKey(e, i)}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-medium whitespace-nowrap transition-all duration-300",
                    tab === t.id
                      ? "bg-gradient-to-b from-brand-500/35 to-brand-600/20 text-white ring-1 ring-brand-400/30 ring-inset"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
                  )}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-3 min-h-[380px] rounded-xl border border-white/8 bg-ink/70 p-3 sm:p-5">
              {TABS.map((t) => (
                <div
                  key={t.id}
                  id={`panel-${t.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${t.id}`}
                  hidden={tab !== t.id}
                  tabIndex={0}
                >
                  {tab === t.id && (
                    <>
                      {t.id === "journey" && <JourneyCanvas />}
                      {t.id === "audience" && <AudienceBuilder />}
                      {t.id === "attribution" && <Attribution />}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
