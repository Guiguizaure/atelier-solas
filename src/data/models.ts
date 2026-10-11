import type { FabricId } from "./fabrics";

/** Which pattern the configurator drafts, and so which measurements it asks for. */
export type PatternFamily = "bodice" | "skirt" | "trousers";

export type ModelId = "wrap-dress" | "a-line-skirt" | "atelier-coat" | "camp-shirt" | "wide-trousers" | "slip-top";

export interface Model {
  id: ModelId;
  name: string;
  /** Number in the atelier's catalogue */
  number: string;
  family: PatternFamily;
  /** Fabric of the sample on the rail */
  sample: FabricId;
  fittings: number;
  leadWeeks: number;
  /** Starting price, euros */
  priceFrom: number;
}

// In rail order
export const MODELS: Model[] = [
  { id: "wrap-dress", name: "The wrap dress", number: "02", family: "bodice", sample: "washed-linen", fittings: 3, leadWeeks: 6, priceFrom: 420 },
  { id: "a-line-skirt", name: "The A-line skirt", number: "05", family: "skirt", sample: "cotton-gingham", fittings: 2, leadWeeks: 4, priceFrom: 260 },
  { id: "atelier-coat", name: "The atelier coat", number: "04", family: "bodice", sample: "boiled-wool", fittings: 4, leadWeeks: 8, priceFrom: 690 },
  { id: "camp-shirt", name: "The camp shirt", number: "01", family: "bodice", sample: "silk-crepe", fittings: 2, leadWeeks: 4, priceFrom: 240 },
  { id: "wide-trousers", name: "The wide trousers", number: "03", family: "trousers", sample: "linen-canvas", fittings: 2, leadWeeks: 5, priceFrom: 310 },
  { id: "slip-top", name: "The slip top", number: "06", family: "bodice", sample: "cotton-voile", fittings: 2, leadWeeks: 3, priceFrom: 180 },
];

export const formatPrice = (euros: number) => `€${euros}`;
