import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { useReveal } from "../hooks/useReveal";
import { ArrowRight, Bolt, Check, Layers, Sparkle, Target } from "./Icons";

const STEPS = [
  {
    n: "01",
    icon: Layers,
    title: "Connect your stack",
    body: "One-click sync for Salesforce, HubSpot, Snowflake, Segment, Meta, LinkedIn and 90+ more. Nucleus builds a unified account graph in under an hour.",
    meta: ["Reverse-ETL", "No-code mappings", "SCIM + SSO"],
  },
  {
    n: "02",
    icon: Target,
    title: "Describe the outcome",
    body: "Write a goal in plain language. Agents propose the segment, the channel mix, the creative and a statistically valid holdout before anything ships.",
    meta: ["Natural language", "Auto holdouts", "Human approval gate"],
  },
  {
    n: "03",
    icon: Bolt,
    title: "Let the loop run",
    body: "Every 15 minutes the optimizer re-scores variants and reallocates budget. You get a weekly narrative report tied to closed-won revenue.",
    meta: ["Marginal ROAS", "Incrementality", "Revenue attribution"],
  },
];

const GENERATED = [
  { label: "Segment", value: "Tier-A accounts, 60d no-touch", delay: 0 },
  { label: "Channel", value: "Lifecycle email → LinkedIn retarget", delay: 500 },
  { label: "Creative", value: "4 variants, ROI-proof angle", delay: 1000 },
  { label: "Holdout", value: "8% control · 95% power", delay: 1500 },
  { label: "Guardrail", value: "Max 2 touches / 7 days", delay: 2000 },
];

function PromptPanel() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.25);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timers = GENERATED.map((_, i) =>
      window.setTimeout(() => setShown((s) => Math.max(s, i + 1)), 420 + i * 420),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [visible]);

  return (
    <div ref={ref} className={cn("reveal", visible && "is-visible")}>
      <div className="glass-strong overflow-hidden rounded-2xl">
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
          <Sparkle className="h-4 w-4 text-brand-300" />
          <span className="text-[12.5px] font-medium text-white">Journey composer</span>
          <span className="num ml-auto rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
            gpt-nucleus-4o
          </span>
        </div>

        <div className="p-4">
          <label htmlFor="wf-prompt" className="sr-only">
            Example prompt given to the Nucleus journey composer
          </label>
          <div className="rounded-xl border border-brand-400/22 bg-brand-500/[0.06] p-3.5">
            <p id="wf-prompt" className="text-[13.5px] leading-relaxed text-slate-200">
              <span className="text-brand-300">&gt;</span> Win back enterprise accounts that stalled after a
              security review. Keep it consultative, cap at two touches a week, and prove incremental lift.
              <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink bg-brand-300 align-middle" />
            </p>
          </div>

          <p className="mt-4 mb-2 text-[10.5px] tracking-[0.14em] text-slate-500 uppercase">
            Generated plan
          </p>
          <ul className="space-y-2">
            {GENERATED.map((g, i) => (
              <li
                key={g.label}
                className={cn(
                  "flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.025] px-3 py-2.5 transition-all duration-500",
                  i < shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                )}
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint/15">
                  <Check className="h-3 w-3 text-mint" />
                </span>
                <span className="w-[70px] shrink-0 text-[11px] text-slate-500">{g.label}</span>
                <span className="min-w-0 flex-1 truncate text-[12.5px] text-slate-200">{g.value}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-2.5 border-t border-white/8 pt-4">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-b from-brand-400 to-brand-600 px-3 py-1.5 text-[12px] font-semibold text-white">
              Approve & launch
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="rounded-lg border border-white/10 px-3 py-1.5 text-[12px] text-slate-300">
              Edit plan
            </span>
            <span className="num ml-auto text-[11px] text-slate-500">est. 4.2× ROAS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Workflow() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);

  return (
    <section id="workflow" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="dot-bg mask-fade-b absolute inset-0 opacity-25" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div ref={ref} className={cn("reveal mx-auto max-w-2xl text-center", visible && "is-visible")}>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-aqua uppercase">
            How it works
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-[2.6rem] sm:leading-[1.1]">
            From connected data to compounding revenue in{" "}
            <span className="text-gradient-brand">three moves</span>
          </h2>
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <ol className="relative space-y-10">
            <span
              className="absolute top-3 bottom-3 left-[23px] w-px bg-gradient-to-b from-brand-500/60 via-aqua/35 to-transparent"
              aria-hidden
            />
            {STEPS.map((s, i) => (
              <Step key={s.n} s={s} i={i} />
            ))}
          </ol>

          <div className="lg:sticky lg:top-28">
            <PromptPanel />
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ s, i }: { s: (typeof STEPS)[number]; i: number }) {
  const { ref, visible } = useReveal<HTMLLIElement>(0.3);
  return (
    <li
      ref={ref}
      className={cn("reveal relative flex gap-5", visible && "is-visible")}
      style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
    >
      <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-ink-2 shadow-lg">
        <s.icon className="h-5 w-5 text-brand-300" />
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="num text-[11px] tracking-[0.18em] text-brand-400">STEP {s.n}</p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-white">{s.title}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-slate-400">{s.body}</p>
        <ul className="mt-3.5 flex flex-wrap gap-2">
          {s.meta.map((m) => (
            <li
              key={m}
              className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[11.5px] text-slate-400"
            >
              {m}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
