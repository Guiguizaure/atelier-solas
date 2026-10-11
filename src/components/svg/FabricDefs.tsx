import type { ReactNode } from "react";
import { fabricPatternId, type FabricId } from "@/data/fabrics";

// One SVG <pattern> per fabric, shared by garments, swatches and the configurator.
// Mounted once per page; reference with `fill={fabricFill(id)}`.
const PATTERNS: Record<FabricId, { size: number; body: ReactNode }> = {
  "washed-linen": {
    size: 12,
    body: (
      <>
        <rect width="12" height="12" className="fill-illustration-rust" />
        <rect width="3" height="12" className="fill-illustration-blush" />
      </>
    ),
  },
  "cotton-gingham": {
    size: 16,
    body: (
      <>
        <rect width="16" height="16" className="fill-cream" />
        <rect width="8" height="16" fillOpacity=".45" className="fill-illustration-violet" />
        <rect width="16" height="8" fillOpacity=".45" className="fill-illustration-violet" />
      </>
    ),
  },
  "silk-crepe": {
    size: 14,
    body: (
      <>
        <rect width="14" height="14" className="fill-illustration-magenta" />
        <circle cx="7" cy="7" r="1.8" className="fill-illustration-blush" />
      </>
    ),
  },
  "linen-canvas": {
    size: 5,
    body: (
      <>
        <rect width="5" height="5" className="fill-illustration-orange" />
        <rect width="5" height="1" className="fill-fabric-saffron-weft" />
      </>
    ),
  },
  "cotton-voile": {
    size: 6,
    body: (
      <>
        <rect width="6" height="6" className="fill-illustration-blush" />
        <rect width="1" height="6" fillOpacity=".45" className="fill-white" />
      </>
    ),
  },
  "boiled-wool": {
    size: 8,
    body: (
      <>
        <rect width="8" height="8" className="fill-fabric-charcoal" />
        <path
          d="M0 8L8 0M-2 2L2 -2M6 10L10 6"
          strokeWidth="2"
          className="stroke-fabric-charcoal-twill"
        />
      </>
    ),
  },
};

export function FabricDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        {(Object.keys(PATTERNS) as FabricId[]).map((id) => (
          <pattern
            key={id}
            id={fabricPatternId(id)}
            width={PATTERNS[id].size}
            height={PATTERNS[id].size}
            patternUnits="userSpaceOnUse"
          >
            {PATTERNS[id].body}
          </pattern>
        ))}
      </defs>
    </svg>
  );
}
