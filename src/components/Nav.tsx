import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { ArrowRight, Close, Logo, Menu } from "./Icons";

const LINKS = [
  { href: "#platform", label: "Platform" },
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-3.5",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center gap-3 rounded-2xl px-3 py-2 transition-all duration-500 sm:px-4",
            scrolled
              ? "glass-strong shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)]"
              : "border border-transparent",
          )}
        >
          <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="Nucleus home">
            <Logo className="h-8 w-8" />
            <span className="text-[15px] font-semibold tracking-tight text-white">
              Nucleus<span className="text-brand-400">.</span>
            </span>
          </a>

          <ul className="mx-auto hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <a
              href="#pricing"
              className="hidden rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-300 transition-colors hover:text-white sm:block"
            >
              Sign in
            </a>
            <a
              href="#cta"
              className="group inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[13.5px] font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-100"
            >
              Book a demo
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
            >
              {open ? <Close className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          hidden={!open}
          className="glass-strong mt-2 overflow-hidden rounded-2xl p-2 lg:hidden"
        >
          <ul className="space-y-0.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                  <ArrowRight className="h-4 w-4 text-slate-600" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
