import {
  SHIRT,
  drawShirt,
  drawStatic,
  finishedGap,
  fullOpenGap,
  layoutShirt,
  shirtTargets,
  type ShirtElements,
  type ShirtGeometry,
} from "./shirt-geometry";

/** Smoothing per 60 Hz frame (prototype values), made frame-rate independent in `tick` */
const K_BUTTON = 0.16;
const K_OPEN = 0.075;

/**
 * Animation loop of the shirt, outside React: each frame eases the 7 gaps towards their
 * targets and writes the SVG attributes directly.
 */
export class ShirtMotion {
  private geo: ShirtGeometry | null = null;
  private cur = [0, 0, 0, 0, 0, 0, 0];
  private target = [0, 0, 0, 0, 0, 0, 0];
  private undone: boolean[] = SHIRT.ROWS.map(() => false);
  private fullOpen = false;
  private frame = 0;
  private last = 0;

  constructor(
    private els: ShirtElements,
    private reduce: boolean,
    private onFinished: () => void,
  ) {}

  /** Recompute everything for the current viewport; snaps if nothing is moving. */
  layout(W: number, H: number) {
    this.geo = layoutShirt(W, H, SHIRT);
    drawStatic(this.els, this.geo);
    this.target = this.targets();
    if (!this.frame) {
      this.cur = this.target.slice();
      drawShirt(this.els, this.geo, this.cur, SHIRT);
    }
    return this.geo;
  }

  setUndone(undone: boolean[]) {
    this.undone = undone;
    this.retarget();
  }

  openFully() {
    this.fullOpen = true;
    this.retarget();
  }

  /** « Button it back up »: panels start off screen and close in. */
  closeFromOpen() {
    if (!this.geo) return;
    this.cur = this.cur.map(() => fullOpenGap(this.geo!.W));
    drawShirt(this.els, this.geo, this.cur, SHIRT);
    this.retarget();
  }

  destroy() {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  private targets() {
    if (!this.geo) return this.target;
    const W = this.geo.W;
    return this.fullOpen ? this.target.map(() => fullOpenGap(W)) : shirtTargets(this.undone, this.geo, SHIRT);
  }

  private retarget() {
    this.target = this.targets();
    if (!this.frame) {
      this.last = 0;
      this.frame = requestAnimationFrame(this.tick);
    }
  }

  private tick = (now: number) => {
    const geo = this.geo;
    if (!geo) return;
    const dt = Math.min(64, this.last ? now - this.last : 16.7);
    this.last = now;
    const k = 1 - Math.pow(1 - (this.fullOpen ? K_OPEN : K_BUTTON), dt / 16.7);
    let moving = false;
    for (let j = 0; j < this.cur.length; j++) {
      const d = this.target[j] - this.cur[j];
      if (Math.abs(d) > 0.4 && !this.reduce) {
        this.cur[j] += d * k;
        moving = true;
      } else {
        this.cur[j] = this.target[j];
      }
    }
    drawShirt(this.els, geo, this.cur, SHIRT);
    if (this.fullOpen && (!moving || this.cur[6] > finishedGap(geo.W))) {
      this.frame = 0;
      this.onFinished();
      return;
    }
    this.frame = moving ? requestAnimationFrame(this.tick) : 0;
  };
}
