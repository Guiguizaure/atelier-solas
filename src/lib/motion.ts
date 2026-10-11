/** Read at the moment of the animation, so a change of the OS setting applies right away. */
export const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
