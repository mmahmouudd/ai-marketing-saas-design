import { useState, type FormEvent } from "react";
import { cn } from "../utils/cn";
import { useReveal } from "../hooks/useReveal";
import { ArrowRight, Check, ChevronDown, Logo, Shield, Sparkle } from "./Icons";

/* ---------------------------------- FAQ ---------------------------------- */

const FAQS = [
  {
    q: "How is Nucleus different from the AI features already in my CRM?",
    a: "Bolt-on AI summarises what already happened. Nucleus runs a closed loop: it proposes the segment, writes and tests the creative, reallocates budget against marginal ROAS every 15 minutes, and reports incrementality against a real holdout. Agents act inside guardrails you define, and every action is reversible and audited.",
  },
  {
    q: "Where does my data live?",
    a: "Nucleus is warehouse-native. We read from and write back to Snowflake, BigQuery, Databricks or Redshift, and can run entirely inside your VPC on the Enterprise plan. We never train shared models on your first-party data — full stop.",
  },
  {
    q: "How long does implementation take?",
    a: "Median time to first value is 11 days. Most teams connect their CRM and warehouse on day one, run a supervised campaign in week one, and hand the optimizer the keys in week three. A solutions architect is included from the Scale plan up.",
  },
  {
    q: "Can I keep a human in the loop?",
    a: "Always. Every agent has an approval mode, a confidence threshold and a spend ceiling. You can require sign-off on creative, on audience changes, on budget shifts above a limit — or on nothing at all once you trust the loop.",
  },
  {
    q: "What happens to my existing campaigns?",
    a: "They keep running. Nucleus imports them as-is, benchmarks them against a control for two weeks, and only suggests changes once it has statistically meaningful evidence. Nothing is rewritten behind your back.",
  },
  {
    q: "What does pricing scale with?",
    a: "Tracked contacts and agent credits — not seats. Invite your whole revenue org on any plan. If your contact volume is seasonal, we'll true-up annually rather than charge overages mid-quarter.",
  },
];

function FaqItem({ item, i }: { item: (typeof FAQS)[number]; i: number }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border transition-colors duration-300",
        open ? "border-brand-400/25 bg-brand-500/[0.05]" : "border-white/8 bg-white/[0.022] hover:border-white/16",
      )}
    >
      <h3>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={`faq-panel-${i}`}
          id={`faq-btn-${i}`}
          className="flex w-full items-center gap-4 px-5 py-4 text-left"
        >
          <span className="flex-1 text-[15px] font-medium text-white">{item.q}</span>
          <span
            className={cn(
              "grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 transition-all duration-300",
              open ? "rotate-180 bg-brand-500/25 text-brand-200" : "text-slate-400",
            )}
            aria-hidden
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </span>
        </button>
      </h3>
      <div
        id={`faq-panel-${i}`}
        role="region"
        aria-labelledby={`faq-btn-${i}`}
        hidden={!open}
        className="px-5 pb-5"
      >
        <p className="max-w-2xl text-[14px] leading-relaxed text-slate-400">{item.a}</p>
      </div>
    </div>
  );
}

function Faq() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div ref={ref} className={cn("reveal grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16", visible && "is-visible")}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-brand-200 uppercase">
              FAQ
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-[2.4rem] sm:leading-[1.12]">
              Questions your security team will ask
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-slate-400">
              Still unsure? Talk to a solutions architect — not a chatbot, not an SDR reading a script.
            </p>
            <a
              href="#cta"
              className="group mt-6 inline-flex items-center gap-2 text-[14.5px] font-medium text-brand-300 transition-colors hover:text-brand-200"
            >
              Book a technical deep-dive
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} item={f} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- CTA ---------------------------------- */

function Cta() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
  };

  return (
    <section id="cta" className="relative scroll-mt-24 px-4 pb-24 sm:px-6 sm:pb-32">
      <div
        ref={ref}
        className={cn("reveal relative mx-auto max-w-6xl overflow-hidden rounded-3xl", visible && "is-visible")}
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_50%_-20%,#2c1d6b_0%,#150f33_45%,#0a0b18_100%)]" aria-hidden />
        <div className="grid-bg absolute inset-0 -z-10 opacity-40" aria-hidden />
        <div className="animate-drift absolute -top-28 left-1/2 -z-10 h-72 w-[720px] -translate-x-1/2 rounded-full bg-brand-500/35 blur-[110px]" aria-hidden />
        <div className="absolute inset-0 -z-10 rounded-3xl ring-1 ring-white/10 ring-inset" aria-hidden />

        <div className="px-6 py-16 text-center sm:px-12 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11.5px] font-medium text-brand-100 backdrop-blur">
            <Sparkle className="h-3.5 w-3.5" />
            14-day trial · full platform · no card
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.035em] text-white sm:text-[3.2rem]">
            Give your campaigns a <span className="text-gradient">brain</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-slate-300">
            Connect your stack this afternoon. Watch the first optimization land before your next standup.
          </p>

          {sent ? (
            <div
              role="status"
              className="mx-auto mt-9 flex max-w-md items-center gap-3 rounded-2xl border border-mint/30 bg-mint/10 px-5 py-4 text-left"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mint/20">
                <Check className="h-4 w-4 text-mint" />
              </span>
              <p className="text-[14px] text-mint">
                You're in. Check <span className="font-semibold">{email}</span> for your workspace link.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mx-auto mt-9 flex max-w-md flex-col gap-2.5 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="cta-email" className="sr-only">
                  Work email address
                </label>
                <input
                  id="cta-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-[52px] w-full rounded-xl border border-white/15 bg-black/35 px-4 text-[15px] text-white placeholder:text-slate-500 focus:border-brand-400/60 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="shine group inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-100"
              >
                Start free
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          )}

          <ul className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-slate-400">
            {["Live in 11 days (median)", "Migration support included", "Cancel any time"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-mint" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer -------------------------------- */

const FOOTER = [
  {
    title: "Product",
    links: ["Platform overview", "AI agents", "Journey canvas", "Attribution", "Integrations", "Changelog"],
  },
  { title: "Solutions", links: ["B2B SaaS", "Fintech", "Healthcare", "PLG motions", "ABM teams", "Agencies"] },
  { title: "Resources", links: ["Documentation", "API reference", "Benchmark report", "Customer stories", "Webinars", "Community"] },
  { title: "Company", links: ["About", "Careers", "Security", "Trust centre", "Press kit", "Contact"] },
];

function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-ink/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-2.5" aria-label="Nucleus home">
              <Logo className="h-9 w-9" />
              <span className="text-lg font-semibold tracking-tight text-white">
                Nucleus<span className="text-brand-400">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-slate-500">
              The autonomous marketing layer for B2B revenue teams. Built in Berlin & Toronto.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["SOC 2 Type II", "GDPR", "ISO 27001"].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-slate-400"
                >
                  <Shield className="h-3.5 w-3.5 text-mint" />
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-7 flex gap-2">
              {[
                { label: "LinkedIn", d: "M4.98 3.5A2.5 2.5 0 112.5 6 2.5 2.5 0 014.98 3.5zM3 8.98h4V21H3zM9.5 8.98h3.83v1.64h.05a4.2 4.2 0 013.78-2.08C21.1 8.54 22 11 22 14.2V21h-4v-6c0-1.43-.03-3.28-2-3.28s-2.3 1.56-2.3 3.17V21h-4z" },
                { label: "X", d: "M17.53 3H20l-5.9 6.74L21 21h-5.4l-4.24-5.54L6.5 21H4l6.3-7.2L3.3 3h5.54l3.83 5.06zm-.95 16h1.5L7.5 4.5H5.9z" },
                { label: "GitHub", d: "M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={`Nucleus on ${s.label}`}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/8 bg-white/[0.03] text-slate-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden focusable="false">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER.map((col) => (
              <div key={col.title}>
                <h2 className="text-[12px] font-semibold tracking-[0.12em] text-white uppercase">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="text-[13.5px] text-slate-500 transition-colors hover:text-slate-200"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-7 sm:flex-row">
          <p className="text-[12.5px] text-slate-500">
            © {new Date().getFullYear()} Nucleus Labs GmbH. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {["Privacy", "Terms", "DPA", "Cookie settings", "Status"].map((l) => (
              <li key={l}>
                <a href="#top" className="text-[12.5px] text-slate-500 transition-colors hover:text-slate-300">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export { Faq, Cta, Footer };
