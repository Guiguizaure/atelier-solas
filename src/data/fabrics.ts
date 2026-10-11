// The six fabrics shown on the site (twelve in the fictional swatch book).
export type FabricId =
  | "washed-linen"
  | "cotton-gingham"
  | "silk-crepe"
  | "linen-canvas"
  | "cotton-voile"
  | "boiled-wool";

export interface Fabric {
  id: FabricId;
  name: string;
  colour: string;
  /** g/m² */
  weight: number;
  /** cm */
  width: number;
  goodFor: string;
  /** Number in the 12-swatch book */
  swatchNo: string;
}

export const FABRICS: Fabric[] = [
  { id: "washed-linen", name: "Washed linen", colour: "Terracotta", weight: 185, width: 140, goodFor: "The wrap dress, the camp shirt", swatchNo: "01" },
  { id: "cotton-gingham", name: "Cotton gingham", colour: "Violet", weight: 120, width: 145, goodFor: "The A-line skirt, the camp shirt", swatchNo: "03" },
  { id: "silk-crepe", name: "Silk crêpe", colour: "Fuchsia", weight: 90, width: 135, goodFor: "The camp shirt, the slip top", swatchNo: "05" },
  { id: "linen-canvas", name: "Linen canvas", colour: "Saffron", weight: 240, width: 140, goodFor: "The wide trousers", swatchNo: "08" },
  { id: "cotton-voile", name: "Cotton voile", colour: "Rosewater", weight: 70, width: 150, goodFor: "The slip top", swatchNo: "11" },
  { id: "boiled-wool", name: "Boiled wool", colour: "Charcoal", weight: 420, width: 150, goodFor: "The atelier coat", swatchNo: "12" },
];

export const fabricPatternId = (id: FabricId) => `fabric-${id}`;
export const fabricFill = (id: FabricId) => `url(#${fabricPatternId(id)})`;
