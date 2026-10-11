import type { SVGProps } from "react";

// Line icons drawn on a 16px grid, stroke follows the text color. Always decorative:
// the control that carries them has its own text or aria-label.
type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;

function Icon({ d, ...props }: IconProps & { d: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={d} />
    </svg>
  );
}

export const ArrowRight = (props: IconProps) => <Icon d="M2.5 8h11M9.5 4l4 4-4 4" {...props} />;
export const ArrowLeft = (props: IconProps) => <Icon d="M13.5 8h-11M6.5 4l-4 4 4 4" {...props} />;
export const ArrowDown = (props: IconProps) => <Icon d="M8 2.5v11M4 9.5l4 4 4-4" {...props} />;
export const Replay = (props: IconProps) => (
  <Icon d="M3 8a5 5 0 1 0 1.6-3.7M3 2v3.2h3.2" {...props} />
);
