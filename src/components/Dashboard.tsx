import { useEffect, useId, useMemo, useState } from "react";
import { cn } from "../utils/cn";
import { areaFrom, donutArc, scalePoints, smoothPath } from "../lib/chart";
import {
  Bell,
  Bolt,
  Chart,
  Gear,
  Grid,
  Logo,
  Mail,
  Megaphone,
  Search,
  Sparkle,
  Trend,
  Users,
} from "./Icons";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const SERIES: Record<string, { revenue: number[]; pipeline: number[]; label: string }> = {
  "7d": {
    label: "Last 7 days",
    revenue: [38, 44, 41, 58, 52, 71, 84],
    pipeline: [22, 29, 26, 37, 35, 46, 55],
  },
  "30d": {
    label: "Last 30 days",
    revenue: [28, 35, 31, 44, 39, 52, 47, 61, 58, 74, 69, 88],
    pipeline: [18, 23, 20, 29, 26, 34, 31, 41, 38, 49, 47, 61],
  },
  qtd: {
    label: "Quarter to date",
    revenue: [14, 22, 19, 33, 29, 41, 38, 55, 49, 66, 78, 96],
    pipeline: [9, 15, 13, 22, 19, 28, 25, 37, 33, 44, 53, 67],
  },
};

const KPIS = [
  {
    label: "Attributed revenue",
    value: "$4.82M",
    delta: "+31.4%",
    up: true,
    spark: [12, 18, 15, 24, 21, 30, 28, 38, 44],
    tone: "brand",
  },
  {
    label: "Qualified pipeline",
    value: "1,284",
    delta: "+18.9%",
    up: true,
    spark: [20, 17, 24, 22, 29, 27, 35, 33, 41],
    tone: "aqua",
  },
  {
    label: "Cost per MQL",
    value: "$38.40",
    delta: "−22.6%",
    up: true,
    spark: [40, 38, 36, 33, 31, 29, 26, 24, 21],
    tone: "mint",
  },
  {
    label: "Agent hours saved",
    value: "912 hrs",
    delta: "+7.2%",
    up: true,
    spark: [8, 12, 11, 17, 19, 23, 26, 31, 34],
    tone: "amber",
  },
] as const;

const CHANNELS = [
  { name: "Lifecycle email", pct: 0.34, color: "#7c5cff" },
  { name: "Paid social", pct: 0.26, color: "#22d3ee" },
  { name: "Web personalization", pct: 0.21, color: "#34d399" },
  { name: "Outbound sequences", pct: 0.19, color: "#fbbf24" },
];

const CAMPAIGNS = [
  {
    name: "Q3 Enterprise Expansion",
    channel: "Lifecycle",
    status: "Live",
    audience: "18,402",
    ctr: "9.4%",
    lift: 0.82,
    rev: "$1.41M",
  },
  {
    name: "Churn-risk Winback v4",
    channel: "Email + SMS",
    status: "Live",
    audience: "6,118",
    ctr: "12.7%",
    lift: 0.94,
    rev: "$684K",
  },
  {
    name: "PLG Trial → Paid Nudge",
    channel: "In-product",
    status: "Optimizing",
    audience: "24,960",
    ctr: "7.1%",
    lift: 0.61,
    rev: "$512K",
  },
  {
    name: "ABM: Fortune 500 Fin",
    channel: "Paid social",
    status: "Live",
    audience: "2,240",
    ctr: "5.8%",
    lift: 0.48,
    rev: "$1.02M",
  },
  {
    name: "Webinar Reactivation",
    channel: "Lifecycle",
    status: "Draft",
    audience: "11,730",
    ctr: "—",
    lift: 0.18,
    rev: "—",
  },
];

const FEED = [
  { t: "just now", agent: "Optimizer", text: "Shifted $12.4K budget → Paid social (ROAS 4.2x)", tone: "mint" },
  { t: "2m", agent: "Copywriter", text: "Generated 14 subject-line variants for Winback v4", tone: "brand" },
  { t: "9m", agent: "Segmenter", text: "Found 2,108 look-alike accounts in ICP tier A", tone: "aqua" },
  { t: "24m", agent: "Guardrail", text: "Paused 'Promo Blast' — frequency cap exceeded", tone: "amber" },
];

const TONES: Record<string, { text: string; bg: string; ring: string; hex: string }> = {
  brand: { text: "text-brand-300", bg: "bg-brand-500/12", ring: "ring-brand-500/25", hex: "#8f74ff" },
  aqua: { text: "text-aqua", bg: "bg-aqua/12", ring: "ring-aqua/25", hex: "#22d3ee" },
  mint: { text: "text-mint", bg: "bg-mint/12", ring: "ring-mint/25", hex: "#34d399" },
  amber: { text: "text-amber-soft", bg: "bg-amber-soft/12", ring: "ring-amber-soft/25", hex: "#fbbf24" },
};

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const id = useId();
  const pts = scalePoints(data, 100, 30, 3, 3);
  const line = smoothPath(pts);
  return (
    <svg viewBox="0 0 100 30" className="h-8 w-full" preserveAspectRatio="none" aria-hidden focusable="false">
      <defs>
        <linearGradient id={`sp-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.38" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaFrom(line, pts, 30)} fill={`url(#sp-${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Live: "bg-mint/12 text-mint ring-mint/25",
    Optimizing: "bg-aqua/12 text-aqua ring-aqua/25",
    Draft: "bg-white/6 text-slate-400 ring-white/12",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset",
        map[status],
      )}
    >
      {status === "Live" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-mint" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
        </span>
      )}
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Main chart                                                          */
/* ------------------------------------------------------------------ */

function RevenueChart({ rangeKey }: { rangeKey: keyof typeof SERIES }) {
  const id = useId();
  const W = 660;
  const H = 208;
  const s = SERIES[rangeKey];

  const { revLine, revArea, pipeLine, pts } = useMemo(() => {
    const max = Math.max(...s.revenue) * 1.12;
    const p1 = scalePoints(s.revenue, W, H, 14, 26, 0, max);
    const p2 = scalePoints(s.pipeline, W, H, 14, 26, 0, max);
    const l1 = smoothPath(p1);
    return { revLine: l1, revArea: areaFrom(l1, p1, H - 26), pipeLine: smoothPath(p2), pts: p1 };
  }, [s]);

  const [hover, setHover] = useState<number | null>(null);
  const active = hover ?? pts.length - 1;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-44 w-full sm:h-52"
        preserveAspectRatio="none"
        role="img"
        aria-label={`Attributed revenue trend, ${s.label}. Revenue up 31.4 percent versus previous period.`}
      >
        <defs>
          <linearGradient id={`ar-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.42" />
            <stop offset="55%" stopColor="#7c5cff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`ln-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8f74ff" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="0"
            x2={W}
            y1={14 + i * ((H - 40) / 3)}
            y2={14 + i * ((H - 40) / 3)}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
        ))}

        <path d={revArea} fill={`url(#ar-${id})`} />
        <path
          d={pipeLine}
          fill="none"
          stroke="rgba(34,211,238,0.55)"
          strokeWidth="1.6"
          strokeDasharray="5 5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          key={rangeKey}
          d={revLine}
          fill="none"
          stroke={`url(#ln-${id})`}
          strokeWidth="2.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          className="animate-draw"
        />

        {pts[active] && (
          <>
            <line
              x1={pts[active].x}
              x2={pts[active].x}
              y1="8"
              y2={H - 26}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1"
            />
            <circle cx={pts[active].x} cy={pts[active].y} r="9" fill="#7c5cff" opacity="0.18" />
            <circle cx={pts[active].x} cy={pts[active].y} r="4" fill="#0b0e1a" stroke="#a89bff" strokeWidth="2.4" />
          </>
        )}

        {pts.map((p, i) => (
          <rect
            key={i}
            x={p.x - W / pts.length / 2}
            y="0"
            width={W / pts.length}
            height={H}
            fill="transparent"
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
          />
        ))}
      </svg>

      <div className="mt-1 flex justify-between px-0.5 text-[10px] text-slate-500 sm:text-[11px]">
        {(rangeKey === "7d"
          ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          : rangeKey === "30d"
            ? ["Wk 1", "", "Wk 2", "", "Wk 3", "", "Wk 4", "", "Wk 5", "", "Wk 6", "Now"]
            : ["Jul", "", "", "Aug", "", "", "Sep", "", "", "Oct", "", "Now"]
        ).map((l, i) => (
          <span key={i} className="num">
            {l}
          </span>
        ))}
      </div>

      <div
        className="pointer-events-none absolute top-2 right-2 rounded-lg border border-white/10 bg-ink-2/90 px-2.5 py-1.5 text-right shadow-xl backdrop-blur"
        aria-hidden
      >
        <p className="text-[9px] tracking-wide text-slate-400 uppercase">Attributed</p>
        <p className="num text-sm font-semibold text-white">
          ${(SERIES[rangeKey].revenue[active] * 5.2).toFixed(0)}K
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Donut                                                               */
/* ------------------------------------------------------------------ */

function ChannelDonut() {
  let acc = 0;
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-[104px] w-[104px] shrink-0">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-0" role="img" aria-label="Revenue by channel: lifecycle email 34%, paid social 26%, web personalization 21%, outbound 19%.">
          <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="13" />
          {CHANNELS.map((c) => {
            const start = acc;
            acc += c.pct;
            return (
              <path
                key={c.name}
                d={donutArc(60, 60, 46, start + 0.006, acc - 0.006)}
                fill="none"
                stroke={c.color}
                strokeWidth="13"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="num text-lg leading-none font-semibold text-white">4.2x</span>
          <span className="mt-0.5 text-[9px] tracking-wide text-slate-500 uppercase">Blended ROAS</span>
        </div>
      </div>
      <ul className="min-w-0 flex-1 space-y-2">
        {CHANNELS.map((c) => (
          <li key={c.name} className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: c.color }} />
            <span className="truncate text-slate-400">{c.name}</span>
            <span className="num ml-auto font-medium text-slate-200">{Math.round(c.pct * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shell                                                               */
/* ------------------------------------------------------------------ */

const NAV = [
  { icon: Grid, label: "Overview", active: true },
  { icon: Megaphone, label: "Campaigns" },
  { icon: Users, label: "Audiences" },
  { icon: Sparkle, label: "AI Agents", badge: "4" },
  { icon: Mail, label: "Journeys" },
  { icon: Chart, label: "Attribution" },
];

const RANGES: { key: keyof typeof SERIES; label: string }[] = [
  { key: "7d", label: "7D" },
  { key: "30d", label: "30D" },
  { key: "qtd", label: "QTD" },
];

export default function Dashboard({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const [range, setRange] = useState<keyof typeof SERIES>("30d");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (compact) return;
    const id = window.setInterval(() => setTick((t) => (t + 1) % 4), 3200);
    return () => window.clearInterval(id);
  }, [compact]);

  return (
    <div
      className={cn(
        "glass-strong overflow-hidden rounded-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-white/8 bg-white/[0.025] px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-rose-soft/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-soft/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
        </div>
        <div className="mx-auto hidden items-center gap-2 rounded-md border border-white/8 bg-black/30 px-3 py-1 text-[11px] text-slate-500 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden />
          app.nucleus.ai/workspace/acme/overview
        </div>
        <div className="ml-auto flex items-center gap-2 text-slate-500">
          <Search className="h-3.5 w-3.5" />
          <Bell className="h-3.5 w-3.5" />
        </div>
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside className="hidden w-[196px] shrink-0 flex-col border-r border-white/8 bg-black/25 p-3 md:flex">
          <div className="flex items-center gap-2 px-1.5 pt-1 pb-4">
            <Logo className="h-6 w-6" />
            <span className="text-[13px] font-semibold tracking-tight text-white">Nucleus</span>
            <span className="ml-auto rounded border border-white/10 px-1.5 py-px text-[9px] text-slate-400">
              ACME
            </span>
          </div>
          <nav className="space-y-0.5" aria-label="Product demo navigation">
            {NAV.map((n) => (
              <div
                key={n.label}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12.5px] transition-colors",
                  n.active
                    ? "bg-brand-500/14 font-medium text-white ring-1 ring-brand-400/22 ring-inset"
                    : "text-slate-400",
                )}
              >
                <n.icon className={cn("h-4 w-4", n.active ? "text-brand-300" : "text-slate-500")} />
                {n.label}
                {n.badge && (
                  <span className="num ml-auto rounded-full bg-aqua/15 px-1.5 text-[9px] text-aqua">
                    {n.badge}
                  </span>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-auto space-y-0.5 border-t border-white/8 pt-3">
            <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12.5px] text-slate-400">
              <Gear className="h-4 w-4 text-slate-500" />
              Settings
            </div>
            <div className="mt-2 rounded-xl border border-brand-400/20 bg-gradient-to-br from-brand-500/16 to-transparent p-3">
              <p className="text-[11px] font-medium text-white">Agent credits</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-brand-400 to-aqua" />
              </div>
              <p className="num mt-1.5 text-[10px] text-slate-400">68,420 / 100K used</p>
            </div>
          </div>
        </aside>

        {/* main */}
        <div className="min-w-0 flex-1 p-3.5 sm:p-5">
          <header className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] tracking-[0.14em] text-slate-500 uppercase">Workspace overview</p>
              <h2 className="mt-1 text-base font-semibold tracking-tight text-white sm:text-lg">
                Growth performance
              </h2>
            </div>
            <div
              role="group"
              aria-label="Reporting range"
              className="flex rounded-lg border border-white/10 bg-black/30 p-0.5"
            >
              {RANGES.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  aria-pressed={range === r.key}
                  onClick={() => setRange(r.key)}
                  className={cn(
                    "num rounded-[6px] px-2.5 py-1 text-[11px] font-medium transition-colors",
                    range === r.key ? "bg-brand-500/25 text-white" : "text-slate-400 hover:text-slate-200",
                  )}
                >
                  {r.label}
                  <span className="sr-only"> reporting range</span>
                </button>
              ))}
            </div>
          </header>

          {/* KPI row */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {KPIS.map((k) => {
              const t = TONES[k.tone];
              return (
                <div
                  key={k.label}
                  className="group relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.022] p-3 transition-colors hover:border-white/16"
                >
                  <p className="truncate text-[10.5px] text-slate-400">{k.label}</p>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="num text-[17px] leading-none font-semibold text-white sm:text-[19px]">
                      {k.value}
                    </span>
                    <span className={cn("num text-[10px] font-medium", t.text)}>{k.delta}</span>
                  </div>
                  <div className="mt-2 -mb-1">
                    <Sparkline data={[...k.spark]} color={t.hex} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* charts */}
          <div className="mt-3 grid gap-3 lg:grid-cols-5">
            <section className="rounded-xl border border-white/8 bg-white/[0.022] p-3.5 lg:col-span-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <h3 className="text-[13px] font-medium text-white">Attributed revenue</h3>
                <span className="inline-flex items-center gap-1.5 text-[10.5px] text-slate-400">
                  <span className="h-[3px] w-4 rounded-full bg-gradient-to-r from-brand-400 to-aqua" />
                  Closed-won
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10.5px] text-slate-400">
                  <span className="h-[3px] w-4 rounded-full border-t-2 border-dashed border-aqua/70" />
                  Pipeline
                </span>
                <span className="num ml-auto inline-flex items-center gap-1 rounded-md bg-mint/12 px-1.5 py-0.5 text-[10px] font-medium text-mint">
                  <Trend className="h-3 w-3" />
                  +31.4%
                </span>
              </div>
              <RevenueChart rangeKey={range} />
            </section>

            <section className="rounded-xl border border-white/8 bg-white/[0.022] p-3.5 lg:col-span-2">
              <h3 className="mb-3 text-[13px] font-medium text-white">Channel mix</h3>
              <ChannelDonut />
            </section>
          </div>

          {!compact && (
            <div className="mt-3 grid gap-3 lg:grid-cols-5">
              {/* campaign table */}
              <section className="min-w-0 overflow-hidden rounded-xl border border-white/8 bg-white/[0.022] lg:col-span-3">
                <div className="flex items-center justify-between border-b border-white/8 px-3.5 py-2.5">
                  <h3 className="text-[13px] font-medium text-white">Active campaigns</h3>
                  <span className="num text-[10.5px] text-slate-500">5 of 27</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[460px] border-collapse text-left">
                    <caption className="sr-only">
                      Active marketing campaigns with channel, status, audience size, click-through rate and
                      attributed revenue.
                    </caption>
                    <thead>
                      <tr className="text-[10px] tracking-wider text-slate-500 uppercase">
                        <th scope="col" className="px-3.5 py-2 font-medium">Campaign</th>
                        <th scope="col" className="px-2 py-2 font-medium">Status</th>
                        <th scope="col" className="px-2 py-2 text-right font-medium">Audience</th>
                        <th scope="col" className="px-2 py-2 text-right font-medium">CTR</th>
                        <th scope="col" className="px-3.5 py-2 text-right font-medium">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/6">
                      {CAMPAIGNS.map((c) => (
                        <tr key={c.name} className="transition-colors hover:bg-white/[0.03]">
                          <td className="px-3.5 py-2.5">
                            <p className="truncate text-[12.5px] font-medium text-slate-100">{c.name}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-[10px] text-slate-500">{c.channel}</span>
                              <span className="h-1 w-14 overflow-hidden rounded-full bg-white/8">
                                <span
                                  className="block h-full rounded-full bg-gradient-to-r from-brand-400 to-aqua"
                                  style={{ width: `${c.lift * 100}%` }}
                                />
                              </span>
                            </div>
                          </td>
                          <td className="px-2 py-2.5"><StatusPill status={c.status} /></td>
                          <td className="num px-2 py-2.5 text-right text-[12px] text-slate-300">{c.audience}</td>
                          <td className="num px-2 py-2.5 text-right text-[12px] text-slate-300">{c.ctr}</td>
                          <td className="num px-3.5 py-2.5 text-right text-[12px] font-medium text-white">{c.rev}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* agent feed */}
              <section className="rounded-xl border border-white/8 bg-white/[0.022] p-3.5 lg:col-span-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-medium text-white">Agent activity</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/12 px-2 py-0.5 text-[10px] font-medium text-mint">
                    <span className="h-1.5 w-1.5 animate-blink rounded-full bg-mint" aria-hidden />
                    Live
                  </span>
                </div>
                <ul className="mt-3 space-y-2.5">
                  {FEED.map((f, i) => {
                    const t = TONES[f.tone];
                    return (
                      <li
                        key={f.text}
                        className={cn(
                          "flex gap-2.5 rounded-lg border p-2.5 transition-all duration-500",
                          tick === i
                            ? "border-white/14 bg-white/[0.05]"
                            : "border-transparent bg-white/[0.02]",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-md ring-1 ring-inset",
                            t.bg,
                            t.ring,
                          )}
                        >
                          <Bolt className={cn("h-3.5 w-3.5", t.text)} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11.5px] leading-snug text-slate-300">{f.text}</p>
                          <p className="mt-0.5 text-[10px] text-slate-500">
                            <span className={t.text}>{f.agent}</span> · {f.t}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-3 flex items-center justify-between rounded-lg border border-brand-400/20 bg-brand-500/8 px-3 py-2">
                  <p className="text-[11px] text-slate-300">Next optimization run</p>
                  <p className="num text-[11px] font-medium text-brand-200">in 04:12</p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
