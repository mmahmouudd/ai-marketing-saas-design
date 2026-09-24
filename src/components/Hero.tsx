import { useEffect, useRef, useState } from "react";
import Dashboard from "./Dashboard";
import { ArrowRight, Play, Sparkle, Star } from "./Icons";
import { useCountUp, useReveal } from "../hooks/useReveal";
import { cn } from "../utils/cn";

const ROTATING = ["campaign ops", "lifecycle email", "ABM plays", "paid budgets", "web journeys"];

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2400);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="relative -mb-[0.14em] inline-grid overflow-hidden pb-[0.14em] align-bottom">
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden>
        web personalization
      </span>
      {ROTATING.map((w, idx) => (
        <span
          key={w}
          aria-hidden={i !== idx}
          className={cn(
            "text-gradient-brand col-start-1 row-start-1 whitespace-nowrap transition-all duration-500",
            i === idx ? "translate-y-0 opacity-100 blur-0" : "translate-y-full opacity-0 blur-sm",
          )}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

function Metric({ to, suffix, prefix, label, decimals = 0 }: {
  to: number; suffix?: string; prefix?: string; label: string; decimals?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.4);
  const v = useCountUp(to, visible, 1700);
  return (
    <div ref={ref} className="min-w-0">
      <p className="num text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {prefix}
        {v.toFixed(decimals)}
        {suffix}
      </p>
      <p className="mt-0.5 text-[11.5px] leading-tight text-slate-500">{label}</p>
    </div>
  );
}

const LOGOS = [
  "NORTHWIND", "Vertexa", "HELIOGRAPH", "Quantly", "BRIDGEPOINT", "Solaris", "ATLAS/OPS", "Fernweh",
];

/** Decorative wireframe of dashboard panels sitting *behind* the hero copy. */
function BackdropUI() {
  const panels = [
    { x: 2, y: 14, w: 21, h: 30, kind: "bars" },
    { x: 2, y: 48, w: 21, h: 22, kind: "list" },
    { x: 77, y: 10, w: 21, h: 24, kind: "line" },
    { x: 77, y: 38, w: 21, h: 34, kind: "bars" },
    { x: 26, y: 6, w: 16, h: 12, kind: "kpi" },
    { x: 58, y: 6, w: 16, h: 12, kind: "kpi" },
  ] as const;

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.42] [mask-image:radial-gradient(78%_62%_at_50%_34%,transparent_0%,transparent_34%,#000_72%)]"
      viewBox="0 0 100 80"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="bdStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8f74ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      {panels.map((p, i) => (
        <g key={i} className="animate-float-slow" style={{ animationDelay: `${i * 900}ms` }}>
          <rect
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            rx="1.4"
            fill="rgba(255,255,255,0.022)"
            stroke="url(#bdStroke)"
            strokeWidth="0.18"
          />
          {p.kind === "bars" &&
            [0, 1, 2, 3, 4, 5].map((b) => (
              <rect
                key={b}
                x={p.x + 2 + b * ((p.w - 4) / 6)}
                y={p.y + p.h - 3 - ((b % 3) + 1) * (p.h / 9)}
                width={(p.w - 4) / 9}
                height={((b % 3) + 1) * (p.h / 9)}
                rx="0.4"
                fill="#7c5cff"
                fillOpacity="0.3"
              />
            ))}
          {p.kind === "line" && (
            <path
              d={`M ${p.x + 2} ${p.y + p.h - 5} L ${p.x + p.w * 0.3} ${p.y + p.h * 0.55} L ${p.x + p.w * 0.55} ${p.y + p.h * 0.7} L ${p.x + p.w - 2} ${p.y + 5}`}
              fill="none"
              stroke="#22d3ee"
              strokeOpacity="0.5"
              strokeWidth="0.35"
              strokeLinecap="round"
            />
          )}
          {(p.kind === "list" || p.kind === "kpi") &&
            [0, 1, 2].map((r) => (
              <rect
                key={r}
                x={p.x + 2}
                y={p.y + 3 + r * (p.h / 4)}
                width={(p.w - 4) * (r === 0 ? 0.85 : r === 1 ? 0.6 : 0.42)}
                height="1"
                rx="0.5"
                fill="#ffffff"
                fillOpacity="0.12"
              />
            ))}
        </g>
      ))}
    </svg>
  );
}

export default function Hero() {
  const shotRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTilt(0);
      return;
    }
    const onScroll = () => {
      const el = shotRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(Math.max(1 - r.top / window.innerHeight, 0), 1);
      setTilt(Math.max(0, 13 - p * 16));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-0 sm:pt-32">
      {/* ---------- ambient background ---------- */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#1a1140_0%,#0a0b18_45%,#04050a_100%)]" />
        <div className="grid-bg mask-fade-b absolute inset-0 opacity-70" />
        <div className="absolute inset-x-0 top-0 hidden h-[720px] md:block">
          <BackdropUI />
        </div>
        <div className="animate-drift absolute -top-40 left-1/2 h-[560px] w-[880px] -translate-x-1/2 rounded-full bg-brand-600/28 blur-[130px]" />
        <div className="animate-float-slow absolute top-24 -left-24 h-[380px] w-[380px] rounded-full bg-aqua/12 blur-[110px]" />
        <div className="animate-float-mid absolute top-40 -right-16 h-[340px] w-[340px] rounded-full bg-brand-400/16 blur-[100px]" />
        <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ---------- copy ---------- */}
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="#features"
            className="animate-rise group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pr-3 pl-1.5 text-[12.5px] text-slate-300 backdrop-blur transition-colors hover:border-brand-400/40 hover:text-white"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-2 py-0.5 text-[10.5px] font-semibold tracking-wide text-white uppercase">
              <Sparkle className="h-3 w-3" />
              New
            </span>
            Autonomous Agents v3 — now in GA
            <ArrowRight className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1
            className="animate-rise mt-6 text-[2.6rem] leading-[1.03] font-semibold tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.4rem]"
            style={{ animationDelay: "70ms" }}
          >
            Put your <Rotator />
            <br className="hidden sm:block" /> on{" "}
            <span className="relative whitespace-nowrap">
              autopilot
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-brand-500/70"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 8.5C60 3 120 2.4 180 4.6c40 1.5 80 3.4 118 5.1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p
            className="animate-rise mx-auto mt-7 max-w-xl text-[16.5px] leading-relaxed text-slate-400 sm:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            Nucleus deploys a team of AI agents that segment your accounts, write the creative, run the
            experiments and reallocate spend — measured against revenue, not clicks.
          </p>

          <div
            className="animate-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "210ms" }}
          >
            <a
              href="#cta"
              className="shine group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-brand-400 to-brand-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_40px_-12px_rgba(124,92,255,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_-12px_rgba(124,92,255,1)] sm:w-auto"
            >
              Start free 14-day trial
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#platform"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.04] px-6 py-3.5 text-[15px] font-medium text-slate-200 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.08] sm:w-auto"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10">
                <Play className="h-2.5 w-2.5 translate-x-px" />
              </span>
              Watch 2-min tour
            </a>
          </div>

          <div
            className="animate-rise mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-slate-500"
            style={{ animationDelay: "280ms" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="flex" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-amber-soft" />
                ))}
              </span>
              4.9/5 on G2 · 480+ reviews
            </span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" aria-hidden />
            <span>No credit card required</span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" aria-hidden />
            <span>SOC 2 Type II · GDPR</span>
          </div>
        </div>

        {/* ---------- dashboard hero shot ---------- */}
        <div
          ref={shotRef}
          className="relative mx-auto mt-14 max-w-6xl sm:mt-20"
          style={{ perspective: "2200px" }}
        >
          {/* glow bed */}
          <div className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10" aria-hidden>
            <div className="absolute inset-x-10 top-8 h-64 rounded-[999px] bg-brand-500/25 blur-[90px]" />
            <div className="absolute inset-x-32 top-24 h-64 rounded-[999px] bg-aqua/12 blur-[100px]" />
          </div>

          {/* floating callouts */}
          <div
            className="animate-float-mid glass absolute -top-6 -left-2 z-20 hidden items-center gap-2.5 rounded-xl px-3 py-2 shadow-2xl lg:flex"
            aria-hidden
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-mint/15 text-mint">
              <Sparkle className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-medium text-white">Budget reallocated</p>
              <p className="num text-[10px] text-mint">+$42K pipeline · auto</p>
            </div>
          </div>
          <div
            className="animate-float-slow glass absolute top-28 -right-4 z-20 hidden w-44 rounded-xl px-3 py-2.5 shadow-2xl xl:block"
            aria-hidden
          >
            <p className="text-[10px] tracking-wide text-slate-400 uppercase">Agent consensus</p>
            <p className="mt-1 text-[11.5px] leading-snug text-slate-200">
              “Shift 18% of paid budget to lifecycle — 3.1× higher LTV.”
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="animate-sweep h-full w-1/2 rounded-full bg-gradient-to-r from-brand-400 to-aqua" />
            </div>
          </div>

          <div
            className="transition-transform duration-300 ease-out will-change-transform"
            style={{ transform: `rotateX(${tilt}deg) scale(${1 - tilt * 0.004})`, transformOrigin: "top center" }}
          >
            <Dashboard />
          </div>

          {/* reflection fade */}
          <div
            className="pointer-events-none absolute inset-x-0 -bottom-1 h-28 bg-gradient-to-t from-void to-transparent"
            aria-hidden
          />
        </div>

        {/* ---------- metrics strip ---------- */}
        <div className="relative z-10 mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-y-7 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-7 backdrop-blur sm:grid-cols-4 sm:gap-x-6">
          <Metric to={31.4} decimals={1} suffix="%" label="Avg. lift in qualified pipeline" />
          <Metric to={68} suffix="%" label="Less manual campaign ops" />
          <Metric to={4.2} decimals={1} suffix="×" label="Blended return on ad spend" />
          <Metric to={11} suffix=" days" label="Median time to first value" />
        </div>

        {/* ---------- logo marquee ---------- */}
        <div className="mt-14 pb-16">
          <p className="text-center text-[11px] font-medium tracking-[0.2em] text-slate-500 uppercase">
            Trusted by revenue teams at 2,400+ companies
          </p>
          <div className="mask-fade-x relative mt-6 overflow-hidden">
            <ul className="animate-marquee flex w-max items-center gap-14 pr-14">
              {[...LOGOS, ...LOGOS].map((l, i) => (
                <li
                  key={`${l}-${i}`}
                  aria-hidden={i >= LOGOS.length}
                  className="text-lg font-semibold tracking-tight whitespace-nowrap text-slate-500 transition-colors hover:text-slate-300 sm:text-xl"
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
