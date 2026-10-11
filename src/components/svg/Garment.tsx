import { fabricFill } from "@/data/fabrics";
import type { Model, ModelId } from "@/data/models";

// Figma « Garment » front: silhouettes on a 200×300 hanger. Needs <FabricDefs /> on the page.
const SILHOUETTES: Record<ModelId, string> = {
  "wrap-dress": "M72 56L128 56L150 92L138 102L140 132L174 290L26 290L60 132L62 102L50 92Z",
  "a-line-skirt": "M64 64L136 64L174 290L26 290Z",
  "atelier-coat": "M62 56L138 56L178 84L184 240L160 242L156 128L152 290L48 290L44 128L40 242L16 240L22 84Z",
  "camp-shirt": "M66 56L134 56L176 80L184 186L164 188L158 116L156 250L44 250L42 116L36 188L16 186L24 80Z",
  "wide-trousers": "M60 62L140 62L154 290L112 290L100 132L88 290L46 290Z",
  "slip-top": "M76 58L124 58L140 104L148 222L52 222L60 104Z",
};

const HANGER = "M100 8c7 0 10 4 10 9 0 6-5 8-10 11L38 58h124L100 28";

export function GarmentOnHanger({ model, className }: { model: Model; className?: string }) {
  const d = SILHOUETTES[model.id];
  return (
    <svg viewBox="0 0 200 300" className={className} aria-hidden="true" focusable="false">
      <path
        d={HANGER}
        fill="none"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-illustration-ink"
      />
      <path d={d} fill={fabricFill(model.sample)} strokeWidth="2" strokeLinejoin="round" className="stroke-illustration-ink" />
      {/* Topstitching */}
      <path
        d={d}
        fill="none"
        strokeOpacity=".6"
        strokeWidth="1"
        strokeDasharray="4 4"
        transform="matrix(.94 0 0 .97 6 6)"
        className="stroke-bg-surface"
      />
    </svg>
  );
}
