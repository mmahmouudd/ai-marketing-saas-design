import { cn } from "../utils/cn";
import { useReveal } from "../hooks/useReveal";
import { Star } from "./Icons";

type Q = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  grad: string;
  stat?: { value: string; label: string };
};

const QUOTES: Q[] = [
  {
    quote:
      "We cut campaign production time from nine days to under four hours. The agents don't just draft — they run the holdout maths our analysts used to fight over.",
    name: "Priya Raghunathan",
    role: "VP Demand Generation",
    company: "Northwind Systems",
    initials: "PR",
    grad: "from-brand-500 to-brand-700",
    stat: { value: "−94%", label: "campaign build time" },
  },
  {
    quote:
      "The budget optimizer paid for the contract in five weeks. It found spend leaking into a channel our last-click model had been praising for a year.",
    name: "Marcus Feld",
    role: "Head of Growth",
    company: "Vertexa",
    initials: "MF",
    grad: "from-aqua to-brand-500",
    stat: { value: "4.6×", label: "blended ROAS" },
  },
  {
    quote:
      "Security signed off in a week because everything runs against our Snowflake instance. That never happens with a marketing tool.",
    name: "Dana Okonkwo",
    role: "Director, MarTech",
    company: "Bridgepoint Financial",
    initials: "DO",
    grad: "from-mint to-aqua",
  },
  {
    quote:
      "Our lifecycle team of three now outperforms the twelve-person org we had before. Nucleus is the only headcount multiplier that actually multiplied.",
    name: "Elias Vogt",
    role: "CMO",
    company: "Heliograph",
    initials: "EV",
    grad: "from-amber-soft to-rose-soft",
    stat: { value: "+31%", label: "qualified pipeline" },
  },
  {
    quote:
      "The guardrail agent caught a consent misconfiguration before a 400K-person send. That single catch was worth the year.",
    name: "Sofia Marchetti",
    role: "Marketing Ops Lead",
    company: "Solaris Health",
    initials: "SM",
    grad: "from-brand-400 to-aqua",
  },
  {
    quote:
      "Attribution finally matches what finance sees. Board decks take an afternoon instead of a fortnight.",
    name: "Tom Bergström",
    role: "SVP Revenue Ops",
    company: "Atlas/Ops",
    initials: "TB",
    grad: "from-rose-soft to-brand-600",
  },
];

function Quote({ q, i }: { q: Q; i: number }) {
  const { ref, visible } = useReveal<HTMLElement>(0.12);
  return (
    <figure
      ref={ref}
      className={cn(
        "reveal edge-glow group mb-4 break-inside-avoid rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.045] to-white/[0.012] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/16",
        visible && "is-visible",
      )}
      style={{ ["--reveal-delay" as string]: `${(i % 3) * 100}ms` }}
    >
      <div className="flex gap-0.5" aria-label="Rated 5 out of 5">
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} className="h-3.5 w-3.5 text-amber-soft" />
        ))}
      </div>
      <blockquote className="mt-4 text-[14.5px] leading-relaxed text-slate-300">
        “{q.quote}”
      </blockquote>

      {q.stat && (
        <div className="mt-5 flex items-baseline gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-2.5">
          <span className="num text-xl font-semibold text-white">{q.stat.value}</span>
          <span className="text-[11.5px] text-slate-500">{q.stat.label}</span>
        </div>
      )}

      <figcaption className="mt-5 flex items-center gap-3 border-t border-white/8 pt-5">
        <span
          className={cn(
            "num grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[13px] font-semibold text-white",
            q.grad,
          )}
          aria-hidden
        >
          {q.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-medium text-white">{q.name}</p>
          <p className="truncate text-[12px] text-slate-500">
            {q.role} · {q.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  return (
    <section id="customers" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-aqua/8 blur-[120px]" />
        <div className="absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-brand-600/12 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div ref={ref} className={cn("reveal mx-auto max-w-2xl text-center", visible && "is-visible")}>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-amber-soft uppercase">
            Customers
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-[2.6rem] sm:leading-[1.1]">
            2,400 teams stopped babysitting campaigns
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-slate-400">
            Median payback period is 38 days. Here's what that looks like from the inside.
          </p>
        </div>

        <div className="mt-14 gap-4 sm:columns-2 lg:columns-3">
          {QUOTES.map((q, i) => (
            <Quote key={q.name} q={q} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
