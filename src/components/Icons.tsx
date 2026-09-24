import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const Logo = (p: P) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden focusable="false" {...p}>
    <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#lg1)" />
    <rect x="1" y="1" width="30" height="30" rx="9" stroke="url(#lg2)" strokeOpacity="0.6" />
    <path
      d="M10 22V10.5l12 11V10"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="22" cy="10" r="2.6" fill="#22d3ee" />
    <defs>
      <linearGradient id="lg1" x1="0" y1="0" x2="32" y2="32">
        <stop stopColor="#7c5cff" />
        <stop offset="1" stopColor="#3b1fa8" />
      </linearGradient>
      <linearGradient id="lg2" x1="0" y1="0" x2="32" y2="32">
        <stop stopColor="#fff" stopOpacity="0.8" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export const Sparkle = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
  </svg>
);

export const Bolt = (p: P) => (
  <svg {...base} {...p}>
    <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />
  </svg>
);

export const Target = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.6" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const Flow = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="3" width="7" height="5" rx="1.6" />
    <rect x="14.5" y="16" width="7" height="5" rx="1.6" />
    <rect x="14.5" y="3" width="7" height="5" rx="1.6" />
    <path d="M6 8v6a4 4 0 004 4h4.5M18 8v8" />
  </svg>
);

export const Shield = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2.8l7.2 2.9v5.6c0 4.4-3 8.2-7.2 9.9-4.2-1.7-7.2-5.5-7.2-9.9V5.7L12 2.8z" />
    <path d="M9 12.2l2.1 2.1L15.4 10" />
  </svg>
);

export const Brain = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9.5 4.5A3 3 0 004 6.3a3 3 0 00-.9 4.4A3.2 3.2 0 004 16a3 3 0 004.6 2.6A2.6 2.6 0 0012 20V4.9a2.4 2.4 0 00-2.5-.4z" />
    <path d="M14.5 4.5A3 3 0 0120 6.3a3 3 0 01.9 4.4A3.2 3.2 0 0120 16a3 3 0 01-4.6 2.6A2.6 2.6 0 0112 20" />
  </svg>
);

export const Layers = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3l8.5 4.5L12 12 3.5 7.5 12 3z" />
    <path d="M3.5 12L12 16.5 20.5 12M3.5 16.5L12 21l8.5-4.5" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);

export const Minus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 12h12" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} strokeWidth={1.9} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ChevronDown = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M6 9.5l6 6 6-6" />
  </svg>
);

export const Menu = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </svg>
);

export const Close = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Play = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
    <path d="M8.5 6.2v11.6a.8.8 0 001.22.68l9.1-5.8a.8.8 0 000-1.36l-9.1-5.8a.8.8 0 00-1.22.68z" />
  </svg>
);

export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
    <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.44 6.19 20.5 7.3 14.03 2.6 9.45l6.5-.95L12 2.6z" />
  </svg>
);

/* --- dashboard nav icons --- */
export const Grid = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
  </svg>
);

export const Megaphone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.5 10v4a1.5 1.5 0 001.5 1.5h1.5l1 4h2.5l-1-4L19 20V4L9 8.5H5A1.5 1.5 0 003.5 10z" />
  </svg>
);

export const Users = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.4" />
    <path d="M2.8 20a6.2 6.2 0 0112.4 0M16.5 5.2a3.4 3.4 0 010 6.6M18 20a6.3 6.3 0 00-2-4.6" />
  </svg>
);

export const Chart = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />
  </svg>
);

export const Gear = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 14a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-2.7 1.1v.2a2 2 0 11-4 0v-.1a1.6 1.6 0 00-2.8-1.1l-.1.1a2 2 0 11-2.8-2.8l.1-.1A1.6 1.6 0 003.7 14H3.5a2 2 0 110-4h.1A1.6 1.6 0 005 7.3L4.9 7.2a2 2 0 112.8-2.8l.1.1A1.6 1.6 0 0010.5 3.6V3.5a2 2 0 114 0v.1a1.6 1.6 0 002.7 1.1l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 001.1 2.7h.2a2 2 0 110 4h-.1a1.6 1.6 0 00-1.8 1.1z" />
  </svg>
);

export const Search = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
);

export const Bell = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 9a6 6 0 1112 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9z" />
    <path d="M10.2 18.5a2 2 0 003.6 0" />
  </svg>
);

export const Mail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" />
    <path d="M3.4 7l8.6 6 8.6-6" />
  </svg>
);

export const Trend = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M3.5 16.5l5.5-6 4 3.5L20.5 6" />
    <path d="M15.5 6h5v5" />
  </svg>
);
