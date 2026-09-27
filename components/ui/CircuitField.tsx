// Signature visual: PCB-style traces on the left resolving into a neural-node
// mesh on the right — a literal rendering of the hardware -> AI throughline.
// Static SVG with no interactivity, so this renders as a server component
// (the Phase 4 3D upgrade will lazy-load its own client component alongside
// this as a static/reduced-motion fallback).
export function CircuitField() {
  return (
    <svg
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="traceGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0F5B66" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#E06D53" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="nodeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F5B66" />
          <stop offset="100%" stopColor="#E06D53" />
        </linearGradient>
      </defs>

      {/* PCB traces (left side) */}
      <g stroke="url(#traceGrad)" strokeWidth="1.5">
        <path d="M0 120 H180 V220 H340 V160 H520" />
        <path d="M0 300 H120 V380 H260 V300 H460 V420" />
        <path d="M0 500 H200 V560 H380" />
        <path d="M0 650 H150 V580 H320 V680 H520" />
        <path d="M40 0 V80 H220 V180" />
        <path d="M300 0 V60 H420 V140" />
      </g>
      <g fill="#0F5B66">
        <circle cx="180" cy="120" r="3" />
        <circle cx="340" cy="220" r="3" />
        <circle cx="120" cy="300" r="3" />
        <circle cx="260" cy="380" r="3" />
        <circle cx="200" cy="500" r="3" />
        <circle cx="150" cy="650" r="3" />
        <circle cx="320" cy="680" r="3" />
      </g>

      {/* Transitional connecting lines */}
      <g stroke="url(#traceGrad)" strokeWidth="1" opacity="0.6">
        <path d="M520 160 L660 220" />
        <path d="M460 420 L640 400" />
        <path d="M380 560 L600 520" />
        <path d="M520 680 L680 620" />
      </g>

      {/* Neural node mesh (right side) */}
      <g stroke="#0F5B66" strokeOpacity="0.35" strokeWidth="1">
        <line x1="660" y1="220" x2="820" y2="160" />
        <line x1="660" y1="220" x2="800" y2="320" />
        <line x1="640" y1="400" x2="800" y2="320" />
        <line x1="640" y1="400" x2="810" y2="460" />
        <line x1="600" y1="520" x2="810" y2="460" />
        <line x1="600" y1="520" x2="780" y2="600" />
        <line x1="680" y1="620" x2="780" y2="600" />
        <line x1="820" y1="160" x2="980" y2="240" />
        <line x1="800" y1="320" x2="980" y2="240" />
        <line x1="800" y1="320" x2="990" y2="400" />
        <line x1="810" y1="460" x2="990" y2="400" />
        <line x1="810" y1="460" x2="970" y2="540" />
        <line x1="780" y1="600" x2="970" y2="540" />
        <line x1="980" y1="240" x2="1150" y2="200" />
        <line x1="990" y1="400" x2="1150" y2="380" />
        <line x1="970" y1="540" x2="1150" y2="560" />
      </g>
      <g fill="url(#nodeGrad)">
        <circle cx="660" cy="220" r="4" />
        <circle cx="640" cy="400" r="4" />
        <circle cx="600" cy="520" r="4" />
        <circle cx="680" cy="620" r="4" />
        <circle cx="820" cy="160" r="5" />
        <circle cx="800" cy="320" r="5" />
        <circle cx="810" cy="460" r="5" />
        <circle cx="780" cy="600" r="5" />
        <circle cx="980" cy="240" r="6" />
        <circle cx="990" cy="400" r="6" />
        <circle cx="970" cy="540" r="6" />
        <circle cx="1150" cy="200" r="4" />
        <circle cx="1150" cy="380" r="4" />
        <circle cx="1150" cy="560" r="4" />
      </g>
    </svg>
  );
}
