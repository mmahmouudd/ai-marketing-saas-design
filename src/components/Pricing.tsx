import { useId, useState } from "react";
import { cn } from "../utils/cn";
import { useReveal } from "../hooks/useReveal";
import { ArrowRight, Check, Minus, Sparkle } from "./Icons";

type Tier = {
  name: string;
  tagline: string;
  monthly: number | null;
  annual: number | null;
  cta: string;
  highlight?: boolean;
  seats: string;
  contacts: string;
  features: { label: string; included: boolean }[];
};

const TIERS: Tier[] = [
  {
    name: "Launch",
    tagline: "For lean teams proving the motion.",
    monthly: 490,
    annual: 392,
    cta: "Start free trial",
    seats: "5 seats included",
    contacts: "Up to 25K tracked contacts",
    features: [
      { label: "2 AI agents (Copywriter, Segmenter)", included: true },
      { label: "Lifecycle email + web personalization", included: true },
      { label: "Standard attribution models", included: true },
      { label: "12-month data retention", included: true },
      { label: "Autonomous budget optimizer", included: false },
      { label: "Warehouse-native sync", included: false },
    ],
  },
  {
    name: "Scale",
    tagline: "For growth teams running the full loop.",
    monthly: 1890,
    annual: 1512,
    cta: "Start free trial",
    highlight: true,
    seats: "25 seats included",
    contacts: "Up to 250K tracked contacts",
    features: [
      { label: "All 6 AI agents + custom agents", included: true },
      { label: "Every channel: email, SMS, paid, in-product", included: true },
      { label: "Autonomous budget optimizer (15-min loop)", included: true },
      { label: "Incrementality testing & holdouts", included: true },
      { label: "Warehouse-native sync (Snowflake, BigQuery)", included: true },
      { label: "Dedicated success architect", included: false },
    ],
  },
  {
    name: "Enterprise",
    tagline: "For multi-brand orgs with real compliance needs.",
    monthly: null,
    annual: null,
    cta: "Talk to sales",
    seats: "Unlimited seats",
    contacts: "Unlimited contacts",
    features: [
      { label: "Everything in Scale", included: true },
      { label: "Private VPC or BYO-cloud deployment", included: true },
      { label: "Custom model fine-tuning on your brand", included: true },
      { label: "SOC 2 Type II, HIPAA & DPA support", included: true },
      { label: "99.99% uptime SLA + 24/7 on-call", included: true },
      { label: "Dedicated success architect", included: true },
    ],
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const { ref, visible } = useReveal<HTMLDivElement>(0.18);
  const switchId = useId();

  return (
    <section id="pricing" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute top-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-brand-600/12 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div ref={ref} className={cn("reveal mx-auto max-w-2xl text-center", visible && "is-visible")}>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-brand-200 uppercase">
            Pricing
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-[2.75rem] sm:leading-[1.08]">
            Priced on outcomes, <span className="text-gradient">not seats you don't use</span>
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-slate-400">
            Every plan includes unlimited campaigns, unlimited workspaces and the full analytics suite.
            Cancel any time.
          </p>

          {/* billing toggle */}
          <div className="mt-9 inline-flex items-center gap-3.5">
            <span
              id={`${switchId}-m`}
              className={cn("text-[13.5px] font-medium transition-colors", !annual ? "text-white" : "text-slate-500")}
            >
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              aria-labelledby={`${switchId}-m ${switchId}-a`}
              onClick={() => setAnnual((a) => !a)}
              className={cn(
                "relative h-7 w-[54px] rounded-full border transition-colors duration-300",
                annual ? "border-brand-400/50 bg-brand-500/35" : "border-white/12 bg-white/8",
              )}
            >
              <span className="sr-only">Toggle annual billing</span>
              <span
                className={cn(
                  "absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition-transform duration-300",
                  annual ? "translate-x-[29px]" : "translate-x-[3px]",
                )}
              />
            </button>
            <span
              id={`${switchId}-a`}
              className={cn("text-[13.5px] font-medium transition-colors", annual ? "text-white" : "text-slate-500")}
            >
              Annual
            </span>
            <span className="rounded-full bg-mint/12 px-2.5 py-1 text-[11px] font-semibold text-mint ring-1 ring-mint/25 ring-inset">
              Save 20%
            </span>
          </div>
        </div>

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <TierCard key={t.name} t={t} i={i} annual={annual} />
          ))}
        </div>

        <p className="mt-9 text-center text-[13px] text-slate-500">
          Prices in USD, excl. tax. Need a nonprofit or startup discount?{" "}
          <a href="#cta" className="text-brand-300 underline underline-offset-4 hover:text-brand-200">
            Ask us — we say yes a lot.
          </a>
        </p>
      </div>
    </section>
  );
}

function TierCard({ t, i, annual }: { t: Tier; i: number; annual: boolean }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);
  const price = annual ? t.annual : t.monthly;

  return (
    <div
      ref={ref}
      className={cn("reveal h-full", visible && "is-visible")}
      style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
    >
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 sm:p-7",
          t.highlight
            ? "border border-brand-400/35 bg-gradient-to-b from-brand-600/18 via-ink-2 to-ink-2 shadow-[0_40px_100px_-40px_rgba(124,92,255,0.9)] lg:-my-3 lg:py-10"
            : "edge-glow border border-white/9 bg-white/[0.025] hover:-translate-y-1 hover:border-white/16",
        )}
      >
        {t.highlight && (
          <>
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-brand-500/30 blur-[70px]"
              aria-hidden
            />
            <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold tracking-wide text-white uppercase ring-1 ring-white/20 ring-inset">
              <Sparkle className="h-3 w-3 text-brand-200" />
              Most popular
            </span>
          </>
        )}

        <div className="relative">
          <h3 className="text-lg font-semibold tracking-tight text-white">{t.name}</h3>
          <p className="mt-1.5 min-h-[40px] text-[13.5px] leading-snug text-slate-400">{t.tagline}</p>

          <div className="mt-6 flex items-end gap-1.5">
            {price === null ? (
              <span className="text-[2.4rem] leading-none font-semibold tracking-tight text-white">
                Custom
              </span>
            ) : (
              <>
                <span className="num text-[2.6rem] leading-none font-semibold tracking-tight text-white tabular-nums">
                  ${price.toLocaleString()}
                </span>
                <span className="pb-1 text-[13px] text-slate-500">/mo</span>
              </>
            )}
          </div>
          <p className="mt-2 text-[12px] text-slate-500">
            {price === null
              ? "Volume-based, billed annually"
              : annual
                ? "Billed annually · 20% saved"
                : "Billed monthly"}
          </p>

          <a
            href="#cta"
            className={cn(
              "group mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14.5px] font-semibold transition-all duration-300",
              t.highlight
                ? "shine bg-gradient-to-b from-brand-400 to-brand-600 text-white shadow-[0_14px_36px_-14px_rgba(124,92,255,0.9)] hover:-translate-y-0.5"
                : "border border-white/12 bg-white/[0.05] text-white hover:border-white/25 hover:bg-white/10",
            )}
          >
            {t.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <div className="mt-6 space-y-1 border-y border-white/8 py-4 text-[12.5px] text-slate-400">
            <p>{t.seats}</p>
            <p>{t.contacts}</p>
          </div>

          <ul className="mt-5 space-y-3">
            {t.features.map((f) => (
              <li key={f.label} className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "mt-px grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full",
                    f.included ? "bg-mint/15" : "bg-white/6",
                  )}
                  aria-hidden
                >
                  {f.included ? (
                    <Check className="h-2.5 w-2.5 text-mint" />
                  ) : (
                    <Minus className="h-2.5 w-2.5 text-slate-600" />
                  )}
                </span>
                <span className={cn("text-[13.5px] leading-snug", f.included ? "text-slate-300" : "text-slate-500")}>
                  {f.label}
                  <span className="sr-only">{f.included ? " — included" : " — not included"}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
