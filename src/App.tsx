import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Platform from "./components/Platform";
import Workflow from "./components/Workflow";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import { Cta, Faq, Footer } from "./components/Closing";

export default function App() {
  return (
    <div className="relative min-h-screen bg-void text-slate-200 antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to main content
      </a>

      <Nav />

      <main id="main">
        <Hero />

        {/* soft divider between hero and body */}
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" aria-hidden />

        <Features />
        <Platform />
        <Workflow />
        <Pricing />
        <Testimonials />
        <Faq />
        <Cta />
      </main>

      <Footer />
    </div>
  );
}
