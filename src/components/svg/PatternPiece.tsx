// Figma « Pattern piece »: outline, seam allowance, grain line with arrows, marking
// along the grain line. viewBox 400×500.
export type PieceShape = "pocket" | "skirt" | "sleeve" | "bodice";

const SHAPES: Record<PieceShape, { outline: string; grain: [x: number, y1: number, y2: number] }> = {
  pocket: { outline: "M60 60 L340 60 L340 380 L200 460 L60 380 Z", grain: [200, 110, 380] },
  skirt: { outline: "M125 30 L275 30 L372 445 Q200 485 28 445 Z", grain: [200, 90, 400] },
  sleeve: { outline: "M36 190 Q110 28 200 36 Q290 28 364 190 L320 472 L80 472 Z", grain: [200, 110, 420] },
  bodice: {
    outline:
      "M60 40 L165 30 Q200 80 235 30 L340 40 L362 150 Q328 190 340 240 L352 470 L48 470 L60 240 Q72 190 38 150 Z",
    grain: [200, 140, 420],
  },
};

export function PatternPiece({ shape, marking, className }: { shape: PieceShape; marking: string; className?: string }) {
  const { outline, grain } = SHAPES[shape];
  const [x, y1, y2] = grain;
  return (
    <svg viewBox="0 0 400 500" className={className} aria-hidden="true" focusable="false">
      <path d={outline} strokeWidth="2.5" strokeLinejoin="round" className="fill-bg-surface stroke-border-inverse" />
      {/* Seam allowance */}
      <path
        d={outline}
        transform="matrix(.92 0 0 .92 16 20)"
        fill="none"
        strokeWidth="1.6"
        strokeDasharray="9 7"
        className="stroke-border-accent"
      />
      {/* Grain line */}
      <path d={`M${x} ${y1}V${y2}`} strokeWidth="2" className="stroke-border-accent" />
      <path
        d={`M${x - 8} ${y1 + 14}L${x} ${y1}L${x + 8} ${y1 + 14}M${x - 8} ${y2 - 14}L${x} ${y2}L${x + 8} ${y2 - 14}`}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-border-accent"
      />
      <text
        transform={`rotate(90 ${x + 20} ${y1 + 30})`}
        x={x + 20}
        y={y1 + 30}
        fontSize="17"
        letterSpacing="2"
        className="fill-text-accent font-mono"
      >
        {marking}
      </text>
    </svg>
  );
}
